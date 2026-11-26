// Shoot StatMalaysia screenshots over CDP (JPEG, quality 80, under 256 KiB).
// Usage: node shoot-natstats.mjs
// Chrome must already run with --remote-debugging-port=9223.
// Shots: 1-cover.jpg overview 1280x800, 2-economy.jpg economy 1280x800,
// 3-population-phone.jpg population 390x844, 4-trade.jpg trade 1280x800.
import { writeFileSync } from 'node:fs';

const SHOTS = [
  { file: 'screenshots/1-cover.jpg', path: '#/', width: 1280, height: 800 },
  { file: 'screenshots/2-economy.jpg', path: '#/economy', width: 1280, height: 800 },
  { file: 'screenshots/3-population-phone.jpg', path: '#/population', width: 390, height: 844 },
  { file: 'screenshots/4-trade.jpg', path: '#/trade', width: 1280, height: 800 },
];

async function getJson(path, method = 'GET') {
  const r = await fetch(`http://localhost:9223${path}`, { method });
  if (!r.ok) throw new Error(`${path} -> ${r.status}`);
  return r.json();
}

for (const shot of SHOTS) {
  const url = `file:///home/hatch/workspace/goals/make-fun/natstats/app/index.html${shot.path}`;
  const target = await getJson(`/json/new?url=${encodeURIComponent(url)}`, 'PUT');
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });
  let id = 0;
  const pending = new Map();
  const errors = [];
  ws.onmessage = (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
    else if (msg.method === 'Runtime.exceptionThrown') errors.push(msg.params.exceptionDetails.text);
    else if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') {
      errors.push(msg.params.args.map((a) => a.value ?? a.description ?? '').join(' '));
    }
  };
  const send = (method, params = {}) => new Promise((resolve) => {
    const mid = ++id; pending.set(mid, resolve);
    ws.send(JSON.stringify({ id: mid, method, params }));
  });
  await send('Page.enable');
  await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', {
    width: shot.width, height: shot.height, deviceScaleFactor: 1, mobile: shot.width < 500,
  });
  const nav = await send('Page.navigate', { url });
  if (nav.error) { console.log('NAVIGATE FAILED', shot.file, JSON.stringify(nav)); process.exit(1); }
  await new Promise((r) => setTimeout(r, 2500));
  const cap = await send('Page.captureScreenshot', { format: 'jpeg', quality: 80 });
  if (!cap.result?.data) { console.log('NO SHOT DATA', shot.file); process.exit(1); }
  writeFileSync(shot.file, Buffer.from(cap.result.data, 'base64'));
  const probe = await send('Runtime.evaluate', {
    expression: 'document.title + " | app children: " + document.getElementById("app").children.length + " | text: " + document.getElementById("app").innerText.slice(0,60)',
    returnByValue: true,
  });
  console.log('saved', shot.file, '|', probe.result?.result?.value, '| js errors:', errors.length ? errors.join(' ;; ') : 'none');
  ws.close();
}
process.exit(0);

// charts.js — hand-rolled SVG charts. No library, no network: every chart is
// built from plain numbers and drawn as inline SVG.

function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function niceMax(max) {
  if (max <= 0) return 1;
  const step = 10 ** Math.floor(Math.log10(max));
  const scaled = max / step;
  const nice = scaled <= 1 ? 1 : scaled <= 2 ? 2 : scaled <= 2.5 ? 2.5 : scaled <= 5 ? 5 : 10;
  return nice * step;
}

// Vertical bar chart. series: [{label, value}] — value may be negative.
export function barChart(series, opts = {}) {
  const width = opts.width ?? 640;
  const height = opts.height ?? 300;
  const padL = 52, padR = 12, padT = 14, padB = 34;
  const unit = opts.unit ?? '';
  const color = opts.color ?? '#0e7c7b';
  const negColor = opts.negColor ?? '#c2503a';
  const values = series.map((d) => d.value);
  const lo = Math.min(0, ...values);
  const hi = Math.max(0, ...values);
  const span = hi - lo || 1;
  const top = niceMax(hi);
  const bottom = lo < 0 ? -niceMax(-lo) : 0;
  const range = top - bottom || 1;
  const plotH = height - padT - padB;
  const plotW = width - padL - padR;
  const y = (v) => padT + ((top - v) / range) * plotH;
  const slot = plotW / series.length;
  const barW = Math.min(46, slot * 0.62);
  let svg = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(opts.aria ?? 'Bar chart')}" class="chart">`;
  // Gridlines at 0, mid and top.
  for (const gv of [bottom, (bottom + top) / 2, top]) {
    const gy = y(gv);
    svg += `<line x1="${padL}" y1="${gy}" x2="${width - padR}" y2="${gy}" class="grid"/>`;
    svg += `<text x="${padL - 6}" y="${gy + 4}" class="axis" text-anchor="end">${gv}${unit}</text>`;
  }
  svg += `<line x1="${padL}" y1="${y(0)}" x2="${width - padR}" y2="${y(0)}" class="zero"/>`;
  series.forEach((d, i) => {
    const cx = padL + slot * i + slot / 2;
    const y0 = y(Math.max(0, d.value));
    const y1 = y(Math.min(0, d.value));
    const fill = d.value < 0 ? negColor : color;
    svg += `<rect x="${(cx - barW / 2).toFixed(1)}" y="${y0.toFixed(1)}" width="${barW}" height="${Math.max(1, y1 - y0).toFixed(1)}" rx="3" fill="${fill}"/>`;
    const labelY = d.value < 0 ? y1 + 15 : y0 - 6;
    svg += `<text x="${cx}" y="${labelY.toFixed(1)}" class="val" text-anchor="middle">${d.value}${unit}</text>`;
    svg += `<text x="${cx}" y="${height - 12}" class="axis" text-anchor="middle">${esc(d.label)}</text>`;
  });
  svg += '</svg>';
  return svg;
}

// Grouped bar chart for two series sharing the same labels.
export function groupedBarChart(labels, a, b, opts = {}) {
  const width = opts.width ?? 640;
  const height = opts.height ?? 300;
  const padL = 52, padR = 12, padT = 36, padB = 34;
  const unit = opts.unit ?? '';
  const all = [...a.map((d) => d.value), ...b.map((d) => d.value)];
  const top = niceMax(Math.max(...all));
  const plotH = height - padT - padB;
  const plotW = width - padL - padR;
  const y = (v) => padT + ((top - v) / top) * plotH;
  const slot = plotW / labels.length;
  const barW = Math.min(34, slot * 0.3);
  let svg = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(opts.aria ?? 'Grouped bar chart')}" class="chart">`;
  for (const gv of [0, top / 2, top]) {
    const gy = y(gv);
    svg += `<line x1="${padL}" y1="${gy}" x2="${width - padR}" y2="${gy}" class="grid"/>`;
    svg += `<text x="${padL - 6}" y="${gy + 4}" class="axis" text-anchor="end">${gv}${unit}</text>`;
  }
  labels.forEach((label, i) => {
    const cx = padL + slot * i + slot / 2;
    const av = a[i].value, bv = b[i].value;
    svg += `<rect x="${(cx - barW - 3).toFixed(1)}" y="${y(av).toFixed(1)}" width="${barW}" height="${(y(0) - y(av)).toFixed(1)}" rx="3" fill="#0e7c7b"/>`;
    svg += `<rect x="${(cx + 3).toFixed(1)}" y="${y(bv).toFixed(1)}" width="${barW}" height="${(y(0) - y(bv)).toFixed(1)}" rx="3" fill="#e0a458"/>`;
    svg += `<text x="${cx - barW / 2 - 3}" y="${y(av) - 6}" class="val" text-anchor="middle">${av}</text>`;
    svg += `<text x="${cx + barW / 2 + 3}" y="${y(bv) - 6}" class="val" text-anchor="middle">${bv}</text>`;
    svg += `<text x="${cx}" y="${height - 12}" class="axis" text-anchor="middle">${esc(label)}</text>`;
  });
  svg += `<g class="legend"><rect x="${padL}" y="2" width="10" height="10" fill="#0e7c7b"/><text x="${padL + 15}" y="11" class="axis">${esc(a[0].name)}</text><rect x="${padL + 130}" y="2" width="10" height="10" fill="#e0a458"/><text x="${padL + 145}" y="11" class="axis">${esc(b[0].name)}</text></g>`;
  svg += '</svg>';
  return svg;
}

// Line chart with dots. series: [{label, value}]
export function lineChart(series, opts = {}) {
  const width = opts.width ?? 640;
  const height = opts.height ?? 300;
  const padL = 52, padR = 18, padT = 18, padB = 34;
  const unit = opts.unit ?? '';
  const color = opts.color ?? '#0e7c7b';
  const values = series.map((d) => d.value);
  const lo = Math.min(...values);
  const hi = Math.max(...values);
  const pad = (hi - lo) * 0.15 || 1;
  const top = hi + pad;
  const bottom = lo - pad;
  const range = top - bottom;
  const plotH = height - padT - padB;
  const plotW = width - padL - padR;
  const x = (i) => padL + (i / (series.length - 1)) * plotW;
  const y = (v) => padT + ((top - v) / range) * plotH;
  let svg = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(opts.aria ?? 'Line chart')}" class="chart">`;
  for (const gv of [bottom + range * 0.25, bottom + range * 0.5, bottom + range * 0.75]) {
    const gy = y(gv);
    svg += `<line x1="${padL}" y1="${gy}" x2="${width - padR}" y2="${gy}" class="grid"/>`;
    svg += `<text x="${padL - 6}" y="${gy + 4}" class="axis" text-anchor="end">${gv.toFixed(1)}${unit}</text>`;
  }
  const points = series.map((d, i) => `${x(i).toFixed(1)},${y(d.value).toFixed(1)}`).join(' ');
  svg += `<polyline points="${points}" fill="none" stroke="${color}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>`;
  series.forEach((d, i) => {
    svg += `<circle cx="${x(i).toFixed(1)}" cy="${y(d.value).toFixed(1)}" r="5" fill="#fff" stroke="${color}" stroke-width="3"/>`;
    svg += `<text x="${x(i).toFixed(1)}" y="${(y(d.value) - 11).toFixed(1)}" class="val" text-anchor="middle">${d.value}${unit}</text>`;
    svg += `<text x="${x(i).toFixed(1)}" y="${height - 12}" class="axis" text-anchor="middle">${esc(d.label)}</text>`;
  });
  svg += '</svg>';
  return svg;
}

// Horizontal bar list (share bars), e.g. age groups or ethnic shares.
export function shareBars(rows, opts = {}) {
  const unit = opts.unit ?? '%';
  return rows.map((r) => {
    const pct = Math.max(0, Math.min(100, r.share));
    return `<div class="share-row"><span class="share-label">${esc(r.group)}</span>`
      + `<span class="share-track"><span class="share-fill" style="width:${pct}%"></span></span>`
      + `<span class="share-val">${r.share}${unit}${r.value !== undefined ? ` · ${r.value} million` : ''}</span></div>`;
  }).join('');
}

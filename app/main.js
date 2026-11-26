// main.js — router and page behaviour for StatMalaysia.
// Hash routes: #/ #/population #/economy #/labour #/prices #/trade
// #/health #/education. All controls are wired here after each render.

import { YEARBOOK, GDP_GROWTH, GDP_NOMINAL_USD } from './data.js';
import { barChart, lineChart } from './charts.js';
import {
  viewOverview, viewPopulation, viewEconomy, viewLabour,
  viewPrices, viewTrade, viewHealth, viewEducation,
} from './views.js';

const app = document.getElementById('app');
const nav = document.querySelector('nav.main-nav');

const ROUTES = {
  '': viewOverview,
  population: viewPopulation,
  economy: viewEconomy,
  labour: viewLabour,
  prices: viewPrices,
  trade: viewTrade,
  health: viewHealth,
  education: viewEducation,
};

const TITLES = {
  '': 'Malaysia in Numbers',
  population: 'Population · Malaysia in Numbers',
  economy: 'Economy · Malaysia in Numbers',
  labour: 'Labour & Income · Malaysia in Numbers',
  prices: 'Prices · Malaysia in Numbers',
  trade: 'Trade · Malaysia in Numbers',
  health: 'Health · Malaysia in Numbers',
  education: 'Education · Malaysia in Numbers',
};

function routeFromHash() {
  const hash = window.location.hash.replace(/^#\/?/, '').split('?')[0];
  return ROUTES[hash] ? hash : '';
}

function renderYearSummary(year) {
  const box = document.getElementById('year-summary');
  if (!box) return;
  const y = YEARBOOK[year];
  if (!y) { box.innerHTML = '<p>No data for that year.</p>'; return; }
  const fmt = (v, suffix = '') => (v === null || v === undefined ? '—' : `${v}${suffix}`);
  box.innerHTML = `<div class="cards">
    <div class="card"><h3>Population</h3><div class="big">${fmt(y.population, ' <small>million</small>')}</div><div class="src">DOSM, Current Population Estimates</div></div>
    <div class="card"><h3>Real GDP growth</h3><div class="big">${fmt(y.gdpGrowth, '<small>%</small>')}</div><div class="src">World Bank WDI / DOSM${year === 2025 ? ' (advance est.)' : ''}</div></div>
    <div class="card"><h3>CPI inflation</h3><div class="big">${fmt(y.cpi, '<small>%</small>')}</div><div class="src">DOSM, Consumer Price Index</div></div>
    <div class="card"><h3>Exports</h3><div class="big">${fmt(y.exports, ' <small>RM bn</small>')}</div><div class="src">DOSM, External Trade Statistics</div></div>
  </div>`;
}

function renderEconomyChart(which) {
  const box = document.getElementById('economy-chart');
  if (!box) return;
  if (which === 'nominal') {
    box.innerHTML = `<div class="chart-wrap">${lineChart(
      GDP_NOMINAL_USD.map((d) => ({ label: String(d.year), value: d.value })),
      { aria: 'Nominal GDP 2020 to 2024 in US dollars billion', unit: '' })}</div>`;
  } else {
    box.innerHTML = `<div class="chart-wrap">${barChart(
      GDP_GROWTH.map((d) => ({ label: String(d.year), value: d.value })),
      { aria: 'Real GDP growth 2020 to 2025 in percent', unit: '%' })}</div>`;
  }
}

function wireSortableTables() {
  document.querySelectorAll('table.data').forEach((table) => {
    const body = table.querySelector('tbody');
    if (!body) return;
    table.querySelectorAll('th button[data-sort]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const col = Number(btn.dataset.sort);
        const numeric = table.querySelectorAll('th')[col].classList.contains('num');
        const rows = [...body.querySelectorAll('tr')];
        const ascending = btn.dataset.dir !== 'asc';
        rows.sort((a, b) => {
          const av = a.cells[col].textContent.trim();
          const bv = b.cells[col].textContent.trim();
          if (numeric) return (parseFloat(av) - parseFloat(bv)) * (ascending ? 1 : -1);
          return av.localeCompare(bv) * (ascending ? 1 : -1);
        });
        btn.dataset.dir = ascending ? 'asc' : 'desc';
        rows.forEach((r) => body.appendChild(r));
      });
    });
  });
}

function wirePage(route) {
  // Year picker on the overview.
  const yearPick = document.getElementById('year-pick');
  if (yearPick) {
    renderYearSummary(Number(yearPick.value));
    yearPick.addEventListener('change', () => renderYearSummary(Number(yearPick.value)));
  }

  // Indicator tabs on the economy page.
  const econTabs = document.querySelectorAll('[data-indicator]');
  if (econTabs.length) {
    renderEconomyChart('growth');
    econTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        econTabs.forEach((t) => t.setAttribute('aria-pressed', String(t === tab)));
        renderEconomyChart(tab.dataset.indicator);
      });
    });
  }

  // State filter on the population page.
  const filter = document.getElementById('state-filter');
  const stateTable = document.getElementById('state-table');
  if (filter && stateTable) {
    filter.addEventListener('input', () => {
      const q = filter.value.trim().toLowerCase();
      stateTable.querySelectorAll('tbody tr').forEach((row) => {
        row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
      });
    });
  }

  wireSortableTables();
  window.scrollTo(0, 0);
}

function render() {
  const route = routeFromHash();
  app.innerHTML = ROUTES[route]();
  document.title = TITLES[route];
  nav.querySelectorAll('a').forEach((a) => {
    a.classList.toggle('active', a.dataset.route === route);
  });
  wirePage(route);
}

function runSearch() {
  const input = document.getElementById('site-search');
  if (!input) return;
  const q = input.value.trim().toLowerCase();
  if (!q) return;
  // Search the indicator names on every page: jump to the best match.
  const pages = [
    ['population', ['population', 'people', 'citizens', 'states', 'selangor', 'age', 'ethnic']],
    ['economy', ['gdp', 'economy', 'growth', 'debt', 'income per person']],
    ['labour', ['labour', 'jobs', 'unemployment', 'income', 'poverty', 'wages', 'work']],
    ['prices', ['prices', 'inflation', 'cpi', 'cost of living']],
    ['trade', ['trade', 'exports', 'imports', 'surplus', 'china', 'asean']],
    ['health', ['health', 'life expectancy', 'doctor', 'hospital']],
    ['education', ['education', 'literacy', 'schools', 'enrolment', 'students']],
    ['', ['overview', 'malaysia', 'numbers', 'dashboard']],
  ];
  const hit = pages.find(([, keys]) => keys.some((k) => k.includes(q) || q.includes(k)));
  window.location.hash = `#/${hit ? hit[0] : ''}`;
  if (!hit) {
    const note = document.createElement('p');
    note.className = 'note';
    note.textContent = `No page matched “${input.value.trim()}”. Try population, economy, prices or trade.`;
    app.prepend(note);
  }
}

document.getElementById('search-btn').addEventListener('click', runSearch);
document.getElementById('site-search').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') runSearch();
});

window.addEventListener('hashchange', render);
render();

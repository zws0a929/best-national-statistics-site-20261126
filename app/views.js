// views.js — one renderer per hash route. Each page is built from the
// verified figures in data.js; every figure is shown with its source + year.

import {
  COUNTRY, POPULATION, POPULATION_SERIES, AGE_GROUPS_2025, ETHNIC_2020,
  STATES_2025, GDP_GROWTH, GDP_NOMINAL_USD, ECONOMY, CPI_SERIES, PRICES,
  TRADE_SERIES, TRADE, LABOUR, HEALTH, EDUCATION, YEARBOOK,
} from './data.js';
import { barChart, groupedBarChart, lineChart, shareBars } from './charts.js';

function card(title, big, sub, source) {
  return `<div class="card"><h3>${title}</h3><div class="big">${big}</div>`
    + `<div class="sub">${sub}</div><div class="src">${source}</div></div>`;
}

function srcLine(text) {
  return `<p class="src-line">Source: ${text}</p>`;
}

function yearOptions(selected) {
  return Object.keys(YEARBOOK).map((y) =>
    `<option value="${y}"${Number(y) === selected ? ' selected' : ''}>${y}</option>`).join('');
}

function stateRows(states) {
  return states.map((s) => `<tr><td>${s.state}</td><td class="num">${s.pop.toFixed(1)}</td>`
    + `<td class="num">${s.growth.toFixed(1)}%</td></tr>`).join('');
}

// ---------------- overview ----------------

export function viewOverview() {
  return `
  <div class="page-head">
    <div class="breadcrumb">Malaysia · Overview</div>
    <h1>Malaysia in Numbers</h1>
    <p class="lede">The headline statistics for Malaysia — population, economy, jobs,
    prices, trade, health and education — each with its source and year, drawn
    from the Department of Statistics Malaysia and the World Bank.</p>
  </div>

  <div class="cards">
    ${card('Population', '34.2 <small>million</small>', '2025 · +0.5% on 2024', POPULATION.total2025.source)}
    ${card('GDP', 'RM 1.93 <small>trillion</small>', '2024 · real growth 5.1%', ECONOMY.gdpRm2024.source)}
    ${card('GDP per person', 'US$ 12,619', '2024 · IMF estimate', ECONOMY.gdpPerCapitaUsd2024.source)}
    ${card('Unemployment', '3.8<small>%</small>', '2024 · ILO modelled', LABOUR.unemployment2024.source)}
    ${card('Inflation (CPI)', '1.8<small>%</small>', '2024 annual average', PRICES.cpi2024.source)}
    ${card('Exports', 'RM 1.51 <small>trillion</small>', '2024 · +5.8% on 2023', TRADE.exports2024.source)}
    ${card('Life expectancy', '74.9 <small>years</small>', '2024 · DOSM', HEALTH.lifeExpectancyDosm2024.source)}
    ${card('Adult literacy', '95.8<small>%</small>', '2022 · World Bank', EDUCATION.adultLiteracy2022.source)}
  </div>

  <section class="panel">
    <h2>Year in review</h2>
    <p class="note">Pick a year to see the headline numbers for that year. A dash means the
    figure is not published for that year in the sources used here.</p>
    <div class="controls">
      <label for="year-pick">Year</label>
      <select id="year-pick">${yearOptions(2024)}</select>
    </div>
    <div id="year-summary"></div>
  </section>

  <section class="panel">
    <h2>Population growth, 2020–2025</h2>
    <div class="chart-wrap">${lineChart(
      POPULATION_SERIES.map((d) => ({ label: String(d.year), value: d.value })),
      { aria: 'Population of Malaysia 2020 to 2025 in millions', unit: 'm' })}</div>
    ${srcLine('Department of Statistics Malaysia, Current Population Estimates 2024–2025.')}
    <p><a href="#/population">Explore population →</a></p>
  </section>

  <section class="panel">
    <h2>Real GDP growth, 2020–2025</h2>
    <div class="chart-wrap">${barChart(
      GDP_GROWTH.map((d) => ({ label: String(d.year), value: d.value })),
      { aria: 'Real GDP growth 2020 to 2025 in percent', unit: '%' })}</div>
    ${srcLine('World Bank WDI / DOSM. 2025 is the DOSM advance estimate (4.9%). The 2020 dip is the COVID-19 recession; 2022 was the post-pandemic rebound.')}
    <p><a href="#/economy">Explore the economy →</a></p>
  </section>

  <section class="panel">
    <h2>At a glance</h2>
    <ul class="keypoints">
      <li><strong>Capital:</strong> ${COUNTRY.capital}</li>
      <li><strong>Currency:</strong> ${COUNTRY.currency}</li>
      <li><strong>Land area:</strong> 330,803 km²</li>
      <li><strong>States &amp; territories:</strong> 13 states, 3 federal territories</li>
      <li><strong>Median age:</strong> 30.4 years (2022, DOSM)</li>
      <li><strong>Urban population:</strong> 76.9% (2024, World Bank)</li>
      <li><strong>Trade surplus:</strong> 27 straight years since 1998 (DOSM, 2024)</li>
      <li><strong>Absolute poverty:</strong> 5.1% (2024, DOSM)</li>
    </ul>
    ${srcLine('DOSM, My Local Stats Malaysia 2024; World Bank WDI.')}
  </section>`;
}

// ---------------- population ----------------

export function viewPopulation() {
  return `
  <div class="page-head">
    <div class="breadcrumb"><a href="#/">Malaysia</a> · Population</div>
    <h1>Population</h1>
    <p class="lede">34.2 million people in 2025, growing slowly at 0.5% a year. Nine in ten
    residents are citizens, and Selangor alone holds more than one in five Malaysians.</p>
  </div>

  <div class="cards">
    ${card('Total population', '34.2 <small>million</small>', '2025 · +0.5% on 2024', POPULATION.total2025.source)}
    ${card('Citizens', '30.9 <small>million</small>', '90.2% of the population, 2025', POPULATION.citizens2025.source)}
    ${card('Non-citizens', '3.3 <small>million</small>', '9.8% of the population, 2025', POPULATION.nonCitizens2025.source)}
    ${card('Sex ratio', '111', 'males per 100 females, 2024', POPULATION.sexRatio2024.source)}
  </div>

  <section class="panel">
    <h2>Population, 2020–2025</h2>
    <div class="chart-wrap">${lineChart(
      POPULATION_SERIES.map((d) => ({ label: String(d.year), value: d.value })),
      { aria: 'Population of Malaysia 2020 to 2025 in millions', unit: 'm' })}</div>
    ${srcLine('DOSM, Current Population Estimates 2024 and 2025 (mid-year estimates, Census 2020 base).')}
  </section>

  <section class="panel">
    <h2>Age structure, 2025</h2>
    ${shareBars(AGE_GROUPS_2025)}
    ${srcLine('DOSM, Current Population Estimates 2026 infographic. 15–64 is the working-age group.')}
    <h3>By ethnic group (citizens)</h3>
    ${shareBars(ETHNIC_2020)}
    ${srcLine('DOSM, Population and Housing Census Malaysia 2020.')}
  </section>

  <section class="panel">
    <h2>Population by state, 2025</h2>
    <p class="note">Type to filter the table. Click a column heading to sort it.</p>
    <div class="controls">
      <label for="state-filter">Filter states</label>
      <input type="search" id="state-filter" placeholder="e.g. Selangor" aria-label="Filter states">
    </div>
    <div class="table-scroll">
      <table class="data" id="state-table">
        <thead><tr>
          <th><button type="button" data-sort="0">State</button></th>
          <th class="num"><button type="button" data-sort="1">Population (million)</button></th>
          <th class="num"><button type="button" data-sort="2">Growth (%)</button></th>
        </tr></thead>
        <tbody>${stateRows(STATES_2025)}</tbody>
      </table>
    </div>
    ${srcLine('DOSM, Current Population Estimates 2026 release, Table 1. Totals may not sum exactly due to rounding.')}
  </section>

  <section class="panel">
    <h2>What the numbers mean</h2>
    <ul class="tight">
      <li>Growth has slowed from 2.1% (2023) to 0.5% (2025) as non-citizen numbers fell.</li>
      <li>Median age was 30.4 years in 2022 (DOSM) — a young country, but ageing: 8.0% are 65 or older.</li>
      <li>76.9% of people live in urban areas (World Bank, 2024).</li>
    </ul>
  </section>`;
}

// ---------------- economy ----------------

export function viewEconomy() {
  return `
  <div class="page-head">
    <div class="breadcrumb"><a href="#/">Malaysia</a> · Economy</div>
    <h1>Economy</h1>
    <p class="lede">A US$422 billion economy in 2024 that grew 5.1% in real terms — the
    rebound from the pandemic is complete, and growth stayed near 5% in 2025.</p>
  </div>

  <div class="cards">
    ${card('GDP (nominal)', 'RM 1.93 <small>trillion</small>', '2024 · US$422.4 billion', ECONOMY.gdpRm2024.source)}
    ${card('Real GDP growth', '5.1<small>%</small>', '2024 · 4.9% in 2025 (advance est.)', ECONOMY.growth2024.source)}
    ${card('GDP per person', 'US$ 12,619', '2024 · US$34,100 PPP', ECONOMY.gdpPerCapitaUsd2024.source)}
    ${card('GNI per person', 'RM 54,793', '2024 · up from RM 52,942 in 2023', ECONOMY.gniPerCapitaRm2024.source)}
  </div>

  <section class="panel">
    <h2>Growth and size</h2>
    <div class="tabs" role="group" aria-label="Choose indicator">
      <button type="button" data-indicator="growth" aria-pressed="true">Real GDP growth (%)</button>
      <button type="button" data-indicator="nominal" aria-pressed="false">Nominal GDP (US$ bn)</button>
    </div>
    <div id="economy-chart"></div>
    ${srcLine('Growth: World Bank WDI (2020–2024) and DOSM advance estimate (2025). Nominal GDP: World Bank WDI, current US$.')}
  </section>

  <section class="panel">
    <h2>GDP by year</h2>
    <div class="table-scroll">
      <table class="data">
        <thead><tr>
          <th><button type="button" data-sort="0">Year</button></th>
          <th class="num"><button type="button" data-sort="1">Real growth (%)</button></th>
          <th class="num"><button type="button" data-sort="2">Nominal GDP (US$ bn)</button></th>
        </tr></thead>
        <tbody>
          ${GDP_GROWTH.map((g) => {
            const n = GDP_NOMINAL_USD.find((d) => d.year === g.year);
            return `<tr><td>${g.year}${g.note ? ' *' : ''}</td><td class="num">${g.value.toFixed(1)}</td>`
              + `<td class="num">${n ? n.value.toFixed(1) : '—'}</td></tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>
    <p class="note">* 2025 real growth is the DOSM advance estimate.</p>
    ${srcLine('World Bank WDI; DOSM, Gross Domestic Product 2024; DOSM Advance GDP Estimates Q4 2025.')}
    <div class="callout"><strong>Government debt</strong> stood at 64.6% of GDP in 2024
    (World Bank WDI). The current-account balance was a surplus of about 1.6% of GDP in 2025 (World Bank).</div>
  </section>`;
}

// ---------------- labour ----------------

export function viewLabour() {
  return `
  <div class="page-head">
    <div class="breadcrumb"><a href="#/">Malaysia</a> · Labour &amp; income</div>
    <h1>Labour &amp; Income</h1>
    <p class="lede">A record 70.6% of working-age Malaysians were in the labour force in 2024.
    Unemployment was 3.8%, and the average household earned RM 9,155 a month.</p>
  </div>

  <div class="cards">
    ${card('Labour force', '16.9 <small>million</small>', '2024 · +3.3% on 2023', LABOUR.labourForce2024.source)}
    ${card('Participation rate', '70.6<small>%</small>', '2024 · record high', LABOUR.lfpr2024.source)}
    ${card('Unemployment', '3.8<small>%</small>', '2024 · ILO modelled', LABOUR.unemployment2024.source)}
    ${card('Mean household income', 'RM 9,155<small>/mo</small>', '2024 · median RM 6,338 (2022)', LABOUR.meanIncome2024.source)}
  </div>

  <section class="panel">
    <h2>Who works</h2>
    <p>Labour-force participation differs sharply by sex:</p>
    ${shareBars([
      { group: 'Men', share: LABOUR.maleLfpr2024.value },
      { group: 'Women', share: LABOUR.femaleLfpr2024.value },
      { group: 'Overall', share: LABOUR.lfpr2024.value },
    ])}
    ${srcLine('World Bank WDI (2024, ILO modelled) for men and women; DOSM, My Local Stats 2024 for the overall rate.')}
  </section>

  <section class="panel">
    <h2>Income and poverty</h2>
    <ul class="tight">
      <li><strong>Mean monthly household income:</strong> RM 9,155 in 2024 (DOSM HIES 2024).</li>
      <li><strong>Median monthly household income:</strong> RM 6,338 in 2022 (DOSM HIES 2022) — the latest published median.</li>
      <li><strong>Absolute poverty:</strong> 5.1% in 2024, down from 6.2% in 2022 (DOSM).</li>
      <li><strong>Inequality:</strong> Gini index 40.7 in 2021 (World Bank).</li>
    </ul>
    ${srcLine('DOSM, Household Income & Basic Amenities Survey; DOSM, My Local Stats Malaysia 2024; World Bank WDI.')}
    <div class="callout">The mean sits well above the median because a small share of
    high-income households pulls the average up — the median is the better guide to a typical household.</div>
  </section>`;
}

// ---------------- prices ----------------

export function viewPrices() {
  return `
  <div class="page-head">
    <div class="breadcrumb"><a href="#/">Malaysia</a> · Prices</div>
    <h1>Prices</h1>
    <p class="lede">Consumer prices rose 1.8% in 2024 — the slowest inflation since the
    pandemic, after 3.3% in 2022.</p>
  </div>

  <div class="cards">
    ${card('CPI inflation', '1.8<small>%</small>', '2024 annual average', PRICES.cpi2024.source)}
    ${card('2022 peak', '3.3<small>%</small>', 'Highest in the 2020–2024 window', PRICES.cpi2024.source)}
    ${card('2020', '−1.2<small>%</small>', 'Prices fell in the pandemic year', PRICES.cpi2024.source)}
    ${card('Policy rate', '3.00<small>%</small>', 'Overnight policy rate, end-2024', 'Bank Negara Malaysia, 2024')}
  </div>

  <section class="panel">
    <h2>CPI inflation, 2020–2024</h2>
    <div class="chart-wrap">${barChart(
      CPI_SERIES.map((d) => ({ label: String(d.year), value: d.value })),
      { aria: 'CPI inflation 2020 to 2024 in percent', unit: '%' })}</div>
    ${srcLine('DOSM, Consumer Price Index, annual average change.')}
    <p>${PRICES.foodInflationNote}</p>
  </section>

  <section class="panel">
    <h2>What 1.8% means</h2>
    <ul class="tight">
      <li>A basket that cost RM 100 in 2023 cost about RM 101.80 in 2024.</li>
      <li>Inflation was below 2% in two of the last five years — 2020 (−1.2%) and 2024 (1.8%). The 2022 spike to 3.3% was driven by food and fuel.</li>
      <li>Bank Negara Malaysia held its overnight policy rate at 3.00% at the end of 2024.</li>
    </ul>
  </section>`;
}

// ---------------- trade ----------------

export function viewTrade() {
  return `
  <div class="page-head">
    <div class="breadcrumb"><a href="#/">Malaysia</a> · Trade</div>
    <h1>Trade</h1>
    <p class="lede">Malaysia traded a record RM 2.88 trillion of goods in 2024 — exports of
    RM 1.51 trillion against imports of RM 1.37 trillion, a surplus for the 27th year running.</p>
  </div>

  <div class="cards">
    ${card('Total trade', 'RM 2.88 <small>trillion</small>', '2024 · +9.2% on 2023', TRADE.totalTrade2024.source)}
    ${card('Exports', 'RM 1,509 <small>billion</small>', '2024 · +5.8% on 2023', TRADE.exports2024.source)}
    ${card('Imports', 'RM 1,370 <small>billion</small>', '2024 · +13.1% on 2023', TRADE.imports2024.source)}
    ${card('Trade surplus', 'RM 139 <small>billion</small>', '2024 · 27th straight year', TRADE.surplus2024.source)}
  </div>

  <section class="panel">
    <h2>Exports vs imports</h2>
    <div class="chart-wrap">${groupedBarChart(
      TRADE_SERIES.map((d) => String(d.year)),
      TRADE_SERIES.map((d) => ({ name: 'Exports', value: d.exports })),
      TRADE_SERIES.map((d) => ({ name: 'Imports', value: d.imports })),
      { aria: 'Exports and imports 2023 and 2024 in RM billion', unit: '' })}</div>
    ${srcLine('DOSM, External Trade Statistics Malaysia 2024. Values in RM billion.')}
  </section>

  <section class="panel">
    <h2>Trade by year</h2>
    <div class="table-scroll">
      <table class="data">
        <thead><tr>
          <th><button type="button" data-sort="0">Year</button></th>
          <th class="num"><button type="button" data-sort="1">Exports (RM bn)</button></th>
          <th class="num"><button type="button" data-sort="2">Imports (RM bn)</button></th>
          <th class="num"><button type="button" data-sort="3">Surplus (RM bn)</button></th>
        </tr></thead>
        <tbody>
          ${TRADE_SERIES.map((d) => `<tr><td>${d.year}</td><td class="num">${d.exports.toLocaleString('en-MY', { minimumFractionDigits: 1 })}</td><td class="num">${d.imports.toLocaleString('en-MY', { minimumFractionDigits: 1 })}</td><td class="num">${d.surplus.toLocaleString('en-MY', { minimumFractionDigits: 1 })}</td></tr>`).join('')}
        </tbody>
      </table>
    </div>
    ${srcLine('DOSM, External Trade Statistics Malaysia 2024.')}
    <h3>Partners and products</h3>
    <ul class="tight">
      <li><strong>${TRADE.topPartner}.</strong></li>
      <li><strong>ASEAN</strong> took 26.5% of Malaysia's total trade in 2024 (DOSM).</li>
      <li><strong>Manufactured goods</strong> were 85.5% of exports — RM 1.29 trillion — led by electrical &amp; electronics products (DOSM, 2024).</li>
    </ul>
  </section>`;
}

// ---------------- health ----------------

export function viewHealth() {
  return `
  <div class="page-head">
    <div class="breadcrumb"><a href="#/">Malaysia</a> · Health</div>
    <h1>Health</h1>
    <p class="lede">Malaysians live 74.9 years on average (DOSM, 2024). One doctor serves
    404 people, and nearly every household is online.</p>
  </div>

  <div class="cards">
    ${card('Life expectancy', '74.9 <small>years</small>', '2024 · DOSM (World Bank: 76.8)', HEALTH.lifeExpectancyDosm2024.source)}
    ${card('Population per doctor', '404', '2024 · improved from 406 in 2023', HEALTH.doctorRatio2024.source)}
    ${card('Internet at home', '96.8<small>%</small>', 'of households, 2024', HEALTH.internetHouseholds2024.source)}
    ${card('Health spending', '4.0<small>%</small>', 'of GDP, 2023', HEALTH.healthSpending2023.source)}
  </div>

  <section class="panel">
    <h2>Two measures of life expectancy</h2>
    <p>DOSM's national estimate for 2024 is <strong>74.9 years</strong>. The World Bank's
    harmonised series puts it at <strong>76.8 years</strong> for the same year. The gap comes
    from different methods, not different facts — both are shown so you can compare.</p>
    ${srcLine('DOSM, My Local Stats Malaysia 2024; World Bank WDI.')}
  </section>

  <section class="panel">
    <h2>Access and connectivity</h2>
    <ul class="tight">
      <li><strong>Mobile phone ownership:</strong> 99.5% of households (2024, DOSM).</li>
      <li><strong>Internet access:</strong> 96.8% of households (2024, DOSM).</li>
      <li><strong>Computer ownership:</strong> 92.2% of households (2024, DOSM).</li>
      <li><strong>Health spending:</strong> 4.0% of GDP in 2023 (World Bank) — low by high-income standards, typical for the region.</li>
    </ul>
    ${srcLine('DOSM, My Local Stats Malaysia 2024; World Bank WDI.')}
  </section>`;
}

// ---------------- education ----------------

export function viewEducation() {
  return `
  <div class="page-head">
    <div class="breadcrumb"><a href="#/">Malaysia</a> · Education</div>
    <h1>Education</h1>
    <p class="lede">Nearly every young Malaysian can read and write — youth literacy is 98.8%.
    Enrolment is near-universal in primary school, and 38.5% go on to tertiary education.</p>
  </div>

  <div class="cards">
    ${card('Adult literacy', '95.8<small>%</small>', '2022 · youth literacy 98.8%', EDUCATION.adultLiteracy2022.source)}
    ${card('Primary enrolment', '90.4<small>%</small>', 'net, 2024', EDUCATION.primaryEnrolment2024.source)}
    ${card('Secondary enrolment', '80.3<small>%</small>', 'net, 2024', EDUCATION.secondaryEnrolment2024.source)}
    ${card('Tertiary enrolment', '38.5<small>%</small>', 'gross, 2024', EDUCATION.tertiaryEnrolment2024.source)}
  </div>

  <section class="panel">
    <h2>Enrolment by level, 2024</h2>
    ${shareBars([
      { group: 'Primary (net)', share: EDUCATION.primaryEnrolment2024.value },
      { group: 'Secondary (net)', share: EDUCATION.secondaryEnrolment2024.value },
      { group: 'Tertiary (gross)', share: EDUCATION.tertiaryEnrolment2024.value },
    ])}
    ${srcLine('World Bank WDI, 2024. Net enrolment counts children of the official age for the level; gross tertiary enrolment can exceed 100% in principle, here it is 38.5%.')}
  </section>

  <section class="panel">
    <h2>Schools and spending</h2>
    <ul class="tight">
      <li><strong>Schools:</strong> 10,233 government and government-aided schools in 2024 (DOSM).</li>
      <li><strong>Education spending:</strong> 3.5% of GDP in 2023 (World Bank).</li>
      <li><strong>Youth literacy (ages 15–24):</strong> 98.8% in 2022 (World Bank).</li>
      <li><strong>Adult literacy:</strong> 95.8% in 2022, up from about 93% a decade earlier (World Bank).</li>
    </ul>
    ${srcLine('DOSM, My Local Stats Malaysia 2024; World Bank WDI.')}
  </section>`;
}

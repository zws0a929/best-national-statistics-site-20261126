// StatMalaysia data: every figure carries its source and year.
// All figures were checked against the Department of Statistics Malaysia
// (DOSM), the World Bank (WDI) and the IMF before being written here.
// Where a series was revised by DOSM, the latest vintage is used and the
// vintage is named in the source line shown on the page.

export const SOURCES = {
  dosmPop2025: 'Department of Statistics Malaysia (DOSM), Current Population Estimates 2025',
  dosmPop2026: 'DOSM, Current Population Estimates 2026 (infographic)',
  dosmLocal2024: 'DOSM, My Local Stats Malaysia 2024',
  dosmGdp2024: 'DOSM, Gross Domestic Product 2024',
  dosmTrade2024: 'DOSM, External Trade Statistics Malaysia 2024',
  dosmCpi: 'DOSM, Consumer Price Index (annual average)',
  dosmHies: 'DOSM, Household Income & Basic Amenities Survey (HIES)',
  dosmLfs: 'DOSM, Labour Force Survey',
  dosmCensus2020: 'DOSM, Population and Housing Census Malaysia 2020',
  wbWdi: 'World Bank, World Development Indicators (WDI)',
  imfWeo: 'IMF, World Economic Outlook',
};

export const COUNTRY = {
  name: 'Malaysia',
  capital: 'Kuala Lumpur (administrative capital: Putrajaya)',
  currency: 'Ringgit (MYR, RM)',
  landAreaKm2: 330803,
  landAreaSource: 'DOSM / World Bank WDI, 2024',
  independence: '31 August 1957',
  states: 13,
  federalTerritories: 3,
};

// Population (millions), DOSM Current Population Estimates, mid-year.
export const POPULATION_SERIES = [
  { year: 2020, value: 32.45 },
  { year: 2021, value: 32.58 },
  { year: 2022, value: 32.70 },
  { year: 2023, value: 33.40 },
  { year: 2024, value: 34.06 },
  { year: 2025, value: 34.20 },
];

export const POPULATION = {
  total2025: { value: 34.2, unit: 'million', year: 2025, source: SOURCES.dosmPop2025 },
  growth2025: { value: 0.5, unit: '%', year: 2025, source: SOURCES.dosmPop2025 },
  citizens2025: { value: 30.9, unit: 'million', year: 2025, source: SOURCES.dosmPop2025 },
  nonCitizens2025: { value: 3.3, unit: 'million', year: 2025, source: SOURCES.dosmPop2025 },
  male2025: { value: 17.9, unit: 'million', year: 2025, source: SOURCES.dosmPop2025 },
  female2025: { value: 16.3, unit: 'million', year: 2025, source: SOURCES.dosmPop2025 },
  sexRatio2024: { value: 111, unit: 'males per 100 females', year: 2024, source: SOURCES.dosmLocal2024 },
  medianAge2022: { value: 30.4, unit: 'years', year: 2022, source: SOURCES.dosmPop2025 },
  urbanShare2024: { value: 76.9, unit: '%', year: 2024, source: SOURCES.wbWdi },
  density2024: { value: 106.9, unit: 'people per km²', year: 2024, source: SOURCES.wbWdi },
};

// Age structure 2025, DOSM Current Population Estimates 2026 infographic.
export const AGE_GROUPS_2025 = [
  { group: '0–14 years', value: 7.4, share: 21.6 },
  { group: '15–64 years', value: 24.1, share: 70.4 },
  { group: '65+ years', value: 2.7, share: 8.0 },
];

// Citizens by ethnic group, Census 2020.
export const ETHNIC_2020 = [
  { group: 'Bumiputera', share: 69.4 },
  { group: 'Chinese', share: 23.2 },
  { group: 'Indian', share: 6.7 },
  { group: 'Others', share: 0.7 },
];

// Population by state, 2025, DOSM Current Population Estimates 2026 release.
export const STATES_2025 = [
  { state: 'Selangor', pop: 7.4, growth: 0.6 },
  { state: 'Johor', pop: 4.2, growth: 0.5 },
  { state: 'Sabah', pop: 3.8, growth: 0.3 },
  { state: 'Perak', pop: 2.6, growth: 0.2 },
  { state: 'Sarawak', pop: 2.5, growth: 0.5 },
  { state: 'Kedah', pop: 2.2, growth: 0.4 },
  { state: 'W.P. Kuala Lumpur', pop: 2.1, growth: 0.4 },
  { state: 'Kelantan', pop: 1.9, growth: 1.0 },
  { state: 'Pulau Pinang', pop: 1.8, growth: 0.2 },
  { state: 'Pahang', pop: 1.7, growth: 0.5 },
  { state: 'Terengganu', pop: 1.2, growth: 1.2 },
  { state: 'Negeri Sembilan', pop: 1.2, growth: 0.4 },
  { state: 'Melaka', pop: 1.1, growth: 0.5 },
  { state: 'Perlis', pop: 0.3, growth: 0.1 },
  { state: 'W.P. Labuan', pop: 0.1, growth: 0.1 },
  { state: 'W.P. Putrajaya', pop: 0.1, growth: 0.4 },
];

// Real GDP growth (%), World Bank WDI / DOSM.
export const GDP_GROWTH = [
  { year: 2020, value: -5.5 },
  { year: 2021, value: 3.3 },
  { year: 2022, value: 9.0 },
  { year: 2023, value: 3.5 },
  { year: 2024, value: 5.1 },
  { year: 2025, value: 4.9, note: 'advance estimate' },
];

// Nominal GDP, current US$ billion, World Bank WDI.
export const GDP_NOMINAL_USD = [
  { year: 2020, value: 337.5 },
  { year: 2021, value: 373.8 },
  { year: 2022, value: 407.8 },
  { year: 2023, value: 400.2 },
  { year: 2024, value: 422.4 },
];

export const ECONOMY = {
  gdpRm2024: { value: 1.93, unit: 'RM trillion', year: 2024, source: SOURCES.dosmGdp2024 },
  gdpUsd2024: { value: 422.4, unit: 'US$ billion', year: 2024, source: SOURCES.wbWdi },
  gdpPerCapitaUsd2024: { value: 12619, unit: 'US$', year: 2024, source: SOURCES.imfWeo },
  gdpPerCapitaPpp2024: { value: 34100, unit: 'US$ (PPP)', year: 2024, source: SOURCES.imfWeo },
  gniPerCapitaRm2024: { value: 54793, unit: 'RM', year: 2024, source: SOURCES.dosmGdp2024 },
  growth2024: { value: 5.1, unit: '%', year: 2024, source: SOURCES.dosmGdp2024 },
  growth2025: { value: 4.9, unit: '% (advance estimate)', year: 2025, source: 'DOSM, Advance GDP Estimates Q4 2025' },
  govDebt2024: { value: 64.6, unit: '% of GDP', year: 2024, source: SOURCES.wbWdi },
};

// CPI inflation, annual average (%), DOSM.
export const CPI_SERIES = [
  { year: 2020, value: -1.2 },
  { year: 2021, value: 2.5 },
  { year: 2022, value: 3.3 },
  { year: 2023, value: 2.5 },
  { year: 2024, value: 1.8 },
];

export const PRICES = {
  cpi2024: { value: 1.8, unit: '%', year: 2024, source: SOURCES.dosmCpi },
  foodInflationNote: 'Food & non-alcoholic beverages is the largest CPI weight; DOSM publishes the full basket breakdown in its monthly CPI release.',
};

// External trade, RM billion, DOSM External Trade Statistics 2024.
export const TRADE_SERIES = [
  { year: 2023, exports: 1426.2, imports: 1211.0, surplus: 215.2 },
  { year: 2024, exports: 1509.3, imports: 1370.2, surplus: 139.1 },
];

export const TRADE = {
  totalTrade2024: { value: 2.88, unit: 'RM trillion', year: 2024, source: SOURCES.dosmTrade2024 },
  exports2024: { value: 1509.3, unit: 'RM billion', year: 2024, source: SOURCES.dosmTrade2024 },
  imports2024: { value: 1370.2, unit: 'RM billion', year: 2024, source: SOURCES.dosmTrade2024 },
  surplus2024: { value: 139.1, unit: 'RM billion', year: 2024, source: SOURCES.dosmTrade2024 },
  surplusStreak: { value: 27, unit: 'consecutive years since 1998', year: 2024, source: SOURCES.dosmTrade2024 },
  topPartner: 'China — largest trading partner for the 16th consecutive year (2024, DOSM)',
  aseanShare: { value: 26.5, unit: '% of total trade', year: 2024, source: SOURCES.dosmTrade2024 },
  manufacturedShare: { value: 85.5, unit: '% of exports', year: 2024, source: SOURCES.dosmTrade2024 },
};

export const LABOUR = {
  labourForce2024: { value: 16.9, unit: 'million', year: 2024, source: SOURCES.dosmLocal2024 },
  lfpr2024: { value: 70.6, unit: '%', year: 2024, source: SOURCES.dosmLocal2024 },
  unemployment2024: { value: 3.8, unit: '%', year: 2024, source: SOURCES.wbWdi + ' (ILO modelled)' },
  femaleLfpr2024: { value: 51.6, unit: '%', year: 2024, source: SOURCES.wbWdi },
  maleLfpr2024: { value: 79.2, unit: '%', year: 2024, source: SOURCES.wbWdi },
  meanIncome2024: { value: 9155, unit: 'RM per month', year: 2024, source: SOURCES.dosmHies + ' 2024' },
  medianIncome2022: { value: 6338, unit: 'RM per month', year: 2022, source: SOURCES.dosmHies + ' 2022' },
  poverty2024: { value: 5.1, unit: '%', year: 2024, source: SOURCES.dosmLocal2024 },
  gini2021: { value: 40.7, unit: 'Gini index (0–100)', year: 2021, source: SOURCES.wbWdi },
};

export const HEALTH = {
  lifeExpectancyDosm2024: { value: 74.9, unit: 'years', year: 2024, source: SOURCES.dosmLocal2024 },
  lifeExpectancyWb2024: { value: 76.8, unit: 'years', year: 2024, source: SOURCES.wbWdi },
  doctorRatio2024: { value: '1 : 404', unit: 'population per doctor', year: 2024, source: SOURCES.dosmLocal2024 },
  internetHouseholds2024: { value: 96.8, unit: '% of households', year: 2024, source: SOURCES.dosmLocal2024 },
  mobileHouseholds2024: { value: 99.5, unit: '% of households', year: 2024, source: SOURCES.dosmLocal2024 },
  healthSpending2023: { value: 4.0, unit: '% of GDP', year: 2023, source: SOURCES.wbWdi },
};

export const EDUCATION = {
  adultLiteracy2022: { value: 95.8, unit: '%', year: 2022, source: SOURCES.wbWdi },
  youthLiteracy2022: { value: 98.8, unit: '%', year: 2022, source: SOURCES.wbWdi },
  primaryEnrolment2024: { value: 90.4, unit: '% (net)', year: 2024, source: SOURCES.wbWdi },
  secondaryEnrolment2024: { value: 80.3, unit: '% (net)', year: 2024, source: SOURCES.wbWdi },
  tertiaryEnrolment2024: { value: 38.5, unit: '% (gross)', year: 2024, source: SOURCES.wbWdi },
  spending2023: { value: 3.5, unit: '% of GDP', year: 2023, source: SOURCES.wbWdi },
  schools2024: { value: 10233, unit: 'government & government-aided schools', year: 2024, source: SOURCES.dosmLocal2024 },
};

// Year-by-year headline table used by the overview's "year in review" picker.
export const YEARBOOK = {
  2020: { population: 32.45, gdpGrowth: -5.5, cpi: -1.2, exports: null, imports: null },
  2021: { population: 32.58, gdpGrowth: 3.3, cpi: 2.5, exports: null, imports: null },
  2022: { population: 32.70, gdpGrowth: 9.0, cpi: 3.3, exports: null, imports: null },
  2023: { population: 33.40, gdpGrowth: 3.5, cpi: 2.5, exports: 1426.2, imports: 1211.0 },
  2024: { population: 34.06, gdpGrowth: 5.1, cpi: 1.8, exports: 1509.3, imports: 1370.2 },
  2025: { population: 34.20, gdpGrowth: 4.9, cpi: null, exports: null, imports: null },
};

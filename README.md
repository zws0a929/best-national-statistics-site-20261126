# StatMalaysia — Malaysia in Numbers

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/zws0a929/best-national-statistics-site-20261126/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/zws0a929/best-national-statistics-site-20261126/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

StatMalaysia is an offline national statistics site for Malaysia: an overview
dashboard plus dedicated pages for population, economy, labour, prices, trade,
health and education. Every figure carries its source and year — headline
numbers were checked against the Department of Statistics Malaysia (DOSM) and
the World Bank — and every control works: a year picker, indicator tabs,
sortable tables, a state filter and site search. Charts are hand-drawn SVG;
there is no build step, no framework and no network request at all. Built by an AI agent for make.fun's "Make the best national statistics site" bounty, $50 in USDC.

## Run it

```sh
node serve.ts
```

Then open http://localhost:8080 — the overview dashboard loads first, and each
section is a hash route (`#/population`, `#/economy`, `#/labour`, `#/prices`,
`#/trade`, `#/health`, `#/education`). The layout works on a phone (390px) as
well as on desktop.

To hand the site in, run `mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts`,
which copies `app/` and `screenshots/` into the output directory and writes
`dossier.json`.

---
<sub>Entered on [make.fun](https://make.fun/?ref=81228bnq&utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539) · AI agents build software for cash rewards</sub>

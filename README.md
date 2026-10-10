# Gulf Box

**Fit every gift into one baggage allowance.**

Built overnight at [LAYOVER 2026](https://tinkerhub.github.io/layover/) ·
TinkerSpace Calicut · 10–11 Oct 2026 · theme: travel · solo, 12 hours.

<img src="gulf-box/public/icon.svg" width="64" alt="">

## The problem

Flying Dubai → Kerala means carrying gifts home: dates for Amma, perfume for
the cousin, a rice cooker for the uncle. The list always exceeds the 30 kg
allowance. At the check-in counter you have seconds to decide whose gift gets
dropped — and you pay per kg if you decide badly.

Existing packing apps are checklists with pictures. Nobody shows you the bag,
nobody optimises, nobody tells you what to cut.

## What it does

1. **Photograph** each gift, enter its weight, set how important it is (★1–5).
2. **Pack** — a knapsack algorithm picks the highest-value set that fits your
   airline's allowance (8 presets or your own number).
3. **Watch the bag** — packed items appear as luggage tags you can rearrange;
   the weight bar tracks the total live.
4. **See what got cut** — with one practical suggestion each.
5. **Override the packer** — "Put in bag" pins anything the algorithm left out,
   showing what it would evict. Unpin hands it back.

Installable, works offline, photos never leave your device.

## Quick start

```sh
cd gulf-box
npm install
npm run dev          # http://localhost:5173
```

To demo the built app (what judges see):

```sh
npm run build
npm run preview -- --port 4173
```

## Stack

Vite + TypeScript, vanilla (no framework), one dependency family
(`vite-plugin-pwa`). No runtime network calls, no webfonts, no accounts.
Knapsack is a 0/1 DP over 100 g units — ~40 lines in `src/knapsack.ts`.

## Docs

| File | What it is |
|------|------------|
| [docs/PRD.md](docs/PRD.md) | problem, users, features, rubric strategy |
| [docs/SPEC.md](docs/SPEC.md) | architecture, algorithm, design tokens |
| [docs/test-checklist.md](docs/test-checklist.md) | 65-case feature matrix |
| [docs/demo-script.md](docs/demo-script.md) | the 60-second booth run |
| [docs/TASKS.md](docs/TASKS.md) | build milestones |
| [AGENTS.md](AGENTS.md) | workflow + tooling notes for coding agents |

## Status

Feature-complete and tested (~70 cases green across 4 sweeps, layout audited at 7 widths). Remaining: phone install check,
final rehearsal, and the judging rounds. Licence: MIT.
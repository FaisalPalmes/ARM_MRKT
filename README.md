# Armenian Taverna — marketing & content

Internal working repo for the Armenian Taverna marketing operation (studioPalmes). One client, one job. Private.

Start with `HANDOVER-armenian-marketing.md` (the full brief), then `CLAUDE.md`, then `context/business.md` and `context/voice.md`.

## What lives where
| Path | What | Who writes it |
|---|---|---|
| `context/` | Facts, voice, pillars, decisions log, status tracker | Faisal + the session |
| `calendar/YYYY-MM.md` | What goes out when — the source of truth for slots | producer |
| `content/{posts,ads,email}/` | One file per piece; frontmatter carries status and approval | producer drafts, Faisal approves |
| `assets/index.json` | Every usable photo and video. Binaries are not committed; the store path is in `.env`. | the session, at ingest |
| `performance/weekly/` | One JSON per week; null means unknown | intel |
| `research/` | Seasonal dates, competitor scans, dated findings | intel |
| `feed/` | Builds `content.json` for the owner portal; `PORTAL_FEED_CONTRACT.md` governs it | build script |
| `hub/` | Builds the one-screen internal hub | build script |
| `scripts/` | `new-post.sh`, `new-email.sh`, `weekly.sh` | — |

Two things are **generated and never hand-edited**: `hub/dist/` and `feed/dist/`. Edit the data, rebuild.

## Run it
No dependencies. Node 18+.

```sh
node hub/build.js          # → hub/dist/index.html   (open it in a browser)
node feed/build-feed.js    # → feed/dist/content.json
bash scripts/weekly.sh     # the Sunday rhythm: both builds plus the checklist
npm run check              # syntax-check every script
```

## The hub on Vercel
Import this repo into Vercel; `vercel.json` already sets the build (`node hub/build.js`) and output (`hub/dist`). Then, in the project's settings, turn on **Deployment Protection → Vercel Authentication** so only your login can open it. The page also carries `noindex`. It is Faisal's tool only — nothing in it is client-safe.

## Publishing to the portal
`feed/publish.sh` copies `feed/dist/content.json` into your local clone of the portal repo, shows you the JSON, waits for you to type `yes`, then commits and pushes with a plain dated message. Set `PORTAL_REPO_PATH` and `PORTAL_FEED_PATH` in `.env` (see `.env.example`). It refuses to run under a non-personal git identity.

## Rules that never bend
See `CLAUDE.md`. In short: nothing about how content is made reaches Arman; nothing fabricated; no secrets in the repo; nothing publishes without Faisal; money is Arman's; nothing during NeroPay hours.

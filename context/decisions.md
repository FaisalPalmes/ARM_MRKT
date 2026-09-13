# Decisions — append-only

Newest at the bottom. Never edit an old entry; add a new one that supersedes it. Date every entry.

## 2026-09-13 — repo set up from the handover
- Repo created from `HANDOVER-armenian-marketing.md` (Cowork marketing session, 13 Sept 2026). The handover is the brief; a copy lives at `context/handover.md`.
- The open list from handover §14 is tracked in `context/tracker.json`. The status doc `arman-status-13-sept.md` is still to import; when it lands, its open list is reconciled against the tracker and logged under a heading of the form `## YYYY-MM-DD — arman-status-13-sept imported` (the hub looks for that heading).
- Shoot binaries are **not committed**. `assets/files/` is gitignored. `assets/index.json` is the record; the originals live wherever Faisal keeps them (to confirm when the shoot is ingested).
- `context/tracker.json` added beyond the handover's tree: the structured status the hub and feed read — commercial flags, access, milestones, open items. `decisions.md` stays prose.
- `lib/data.js` added: one shared reader for the hub build and the feed build, so the two never parse the same file two ways.
- Generated output (`hub/dist/`, `feed/dist/`) is not committed. Vercel builds the hub from `hub/build.js` (`vercel.json`).
- Content status vocabulary: `draft` → `awaiting-approval` → `approved` → `scheduled` → `published`, or `rejected` (with `rejection_reason`). Only `approved`, `scheduled`, `published` cross to the portal, as `planned`, `scheduled`, `published`.
- Every content file carries a `blurb` — the one client-safe line that crosses to the portal. Captions and bodies never cross.
- In the hub, "This week" means the next 7 days from today and "Next two weeks" means days 8–21. No calendar-week ambiguity, and it reads the same on a Sunday-evening review as on a Wednesday.
- A milestone without a firm date (e.g. "late Sept — Meta ads live") does not cross to the portal until it has one. Never over-promise a date to Arman.
- `feed/publish.sh` commits into the portal repo with a plain dated message and refuses to run if that repo's git identity is not a personal one. Nothing about how content is made surfaces there.
- Asset `consent` is one of `n/a` (nobody identifiable), `recorded — who, date, where filed`, or `MISSING`. The hub flags `MISSING`; the producer never uses such an asset.

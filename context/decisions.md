# Decisions — append-only

Newest at the bottom. Never edit an old entry; add a new one that supersedes it. Date every entry.

## 2026-09-13 — Arman status catch-up (arman-status-13-sept imported)

*The Cowork session's status doc of 13 September, imported whole. Its open list is reconciled into `context/tracker.json`, which is what the hub reads.*

*Catch-up brief. Last session was 20 August — nothing has been logged in this project since, so everything below marked "unknown" needs Faisal to confirm.*

---

### WHERE THE CALENDAR SAYS WE ARE

**Today is Sunday 13 September — the last of the four shoot days.**

| Date | What was planned |
|---|---|
| 22 or 23 Aug | Planning visit — brief staff, get Google/Meta access, set up Brevo |
| 26–30 Aug | Paris |
| 5, 6, 12, 13 Sept | Shoot, four days across two weekends |
| w/c 14 Sept | Editing + rooms section switched on |
| w/c 21 Sept | Website live |
| Late Sept | Ads live |
| **1 Oct** | **Retainer starts — 18 days away** |

---

### WHAT I CAN VERIFY RIGHT NOW

**The new site has not gone live.** `armeniantaverna.co.uk` is still the old WordPress site — nav is Home / Restaurant / Discover / Menu / Articles / Contact. The new build is still on the Vercel preview, which is now correctly robots-blocked.

**Chef Yianni Pelekanos is still named on the live site.** Still described as cooking for 20+ years, USA and Canada, fish specialism. He is gone. This is live, public and wrong, and it has been since August.

**The owner portal is up but reads as essentially empty** — title, "Your marketing", nav, no dates, no status items, no action list. Either the content patch was never applied or the page isn't rendering its content.

---

### WHAT WAS IN FLIGHT ON 20 AUGUST

### Delivered to the build session — status unknown

| Prompt | Covers |
|---|---|
| `armenian-website-copy-rehaul.md` | Full copy + section rehaul, all pages, Our Story rebuilt |
| `prompt-our-story-rebuild.md` | Sticky stack + four-elements section merged |
| `prompt-global-type-and-colour.md` | Newsreader + Karla, olive/cream palette, sitewide |
| `prompt-homepage-space-and-rooms.md` | "How to eat here" replacing The Space; rooms gallery behind a flag |
| `prompt-triptych-and-tiled-reveal.md` | Banquet triptych on Menu; tiled bar section on homepage; price removal |
| `prompt-global-typography.md` | **SUPERSEDED — Prata. Delete this one.** |

### Reference specs, not prompts

`editorial-hero-pattern-spec.md` · `kitchen-hero-pattern-spec.md` · `four-elements-section-spec.md` · `armenian-shot-list.md` · `google-profile-action-plan.md`

---

### STILL OPEN — the list that hasn't moved since August

**Credibility / risk**

1. **Yianni Pelekanos on the live site.** Verified still there today. Remove from the old site as well as the new one, plus meta descriptions, alt text and JSON-LD.
2. **"Zara Serobyan, WSET"** — named wine curator with a professional credential who has never been confirmed by Arman. Highest-risk item on the site. Still unresolved.
3. **Outdoor seating** — appeared as a label on the homepage attached to a photo of khachapuri. Never confirmed the restaurant has any.
4. **Hard-coded "4.5 from 1,560+ Google reviews"** — Google now shows 1.6K. Already drifting.
5. **Opening hours published as "12am–11pm"** — midnight to eleven at night. Feeds the schema, so it's propagating to Google.
6. **Princes vs Princess Street, M2 4DF vs 4DN** — still unsettled. Must be identical across site, schema and Google.

**Commercial**

7. **Staged payment confirmation from Arman** — ~£900 / £550 / £150, and the 1 October retainer start. Never confirmed. **18 days to the first retainer invoice.**
8. **No written contract.** Proposal only. Parties, 30-day notice, ad spend on his card, IP on full payment, photography and staff consent, UK GDPR Art. 28 processor clause for the email list, liability cap, no guarantee of results.
9. **NeroPay conflict of interest** — Arman is a NeroPay account Faisal owns as CRO, and Faisal is invoicing him personally. Employment contract never checked.

**Access and tooling**

10. **Google Business Profile manager access** — blocks the whole GBP overhaul, which is roughly two hours of text-and-settings work that needs no photography.
11. **Meta Business Suite admin** — blocks the ads, which are due live in ~2 weeks.
12. **Brevo account** — Arman creates it, invites Faisal. Email capture is built but gated behind `EMAIL_CAPTURE_ENABLED` and cannot ship without it.

**Build**

13. **Mobile has never been tested.** Not once, on any page. It was the highest-weighted item in the original brief and it is where nearly all traffic is. Twenty minutes on a real phone across all pages, both PDFs and the booking flow.
14. **Footer email sign-up is a bare `<div>`** that silently discards every address entered.
15. **Zero `tel:` and zero `mailto:` links** on the entire site.
16. **The 10%-off popup** was specced and does not exist.
17. **Wine page placeholder prices** — the wine list PDF is a scan, so the price table was never built.

---

### THE THREE THINGS THAT ACTUALLY MATTER THIS WEEK

**1. Get the payment confirmation from Arman.** The first retainer invoice is due in 18 days and he has never confirmed either the staged payments or the 1 October start. Everything else is work; this is whether the work gets paid for. If he's been in the restaurant across four shoot days, the relationship is warm — this is the moment to ask.

**2. Remove Yianni Pelekanos from the live site today.** It costs minutes, it's a real credibility problem, and it has been sitting there for a month.

**3. Settle Zara Serobyan before the site goes live.** A fabricated named person with a fabricated qualification is the single worst thing that could ship, and go-live is eight days out.

---

### WHAT I NEED TO KNOW TO BE USEFUL

- Did the shoot happen on all four days? What's in the can?
- Did the 22nd/23rd visit happen, and did the access asks land — Google, Meta, Brevo?
- How many of the six prompts did the build session actually action?
- Has Arman confirmed the staged payments and the 1 October start?
- Is the website still on track for w/c 21 September?

---

## 2026-09-13 — repo set up from the handover
- Repo created from `HANDOVER-armenian-marketing.md` at the repo root. The handover is the brief.
- The open list from handover §14 and the status doc above is tracked in `context/tracker.json`. Close an item there by setting `status: done`; never delete it.
- Shoot binaries are **not committed**. Media extensions are gitignored. `assets/index.json` is the record; the originals live in the asset store whose path is in `.env` (`ASSET_STORE_PATH`), never committed.
- `context/tracker.json` added beyond the handover's tree: the structured status the hub and feed read — commercial flags, access, milestones, open items. This file stays prose.
- `lib/data.js` added: one shared reader for the hub build and the feed build, so the two never parse the same file two ways.
- Generated output (`hub/dist/`, `feed/dist/`) is not committed. Vercel builds the hub from `hub/build.js` (`vercel.json`).
- Content status vocabulary: `draft` → `awaiting-approval` → `approved` → `scheduled` → `published`, or `rejected` (with `rejection_reason`). Only `approved`, `scheduled`, `published` cross to the portal, as `planned`, `scheduled`, `published`.
- Every content file carries a `blurb` — the one client-safe line that crosses to the portal. Captions and bodies never cross.
- In the hub, "This week" means the next 7 days from today and "Next two weeks" means days 8–21. No calendar-week ambiguity, and it reads the same on a Sunday-evening review as on a Wednesday.
- A milestone without a firm date (e.g. "late Sept — Meta ads live") does not cross to the portal until it has one. Never over-promise a date to Arman.
- `feed/publish.sh` commits into the portal repo with a plain dated message and refuses to run if that repo's git identity is not a personal one. Nothing about how content is made surfaces there.
- Asset `consent` is one of `n/a` (nobody identifiable), `recorded — who, date, where filed`, or `MISSING`. The hub flags `MISSING`; the producer never uses such an asset.

## 2026-09-13 — starter bundle merged
- Faisal supplied `ARM_MRKT-starter.zip` from the Cowork session: a newer handover, the seven context docs, and revised `CLAUDE.md`, agents and feed contract. Those replace the first-pass versions verbatim.
- Pillars are the six named in the August strategy and the client plan: **Fire · Table · 58 Years · Cellar · Calendar · Room**. Frontmatter keys `fire` `table` `58-years` `cellar` `calendar` `room`. The first-pass names (grill, dishes, story, bar, offers, occasions) are gone; nothing was written against them.
- Performance schema is the starter's (`portal.*` crosses, `internal.*` never does, plus `internal.gbp` for calls and direction requests). The hub and feed read that shape.
- Portal `schedule[].channel` uses the raw channel key (`instagram`, `facebook`, `meta-ads`, `email`), matching the contract's example.
- 24 April (Genocide Remembrance Day) is commemorative only: no offers, no CTA, no ad spend within a week of it. Early Bird is not promoted 15 Nov – 1 Jan.
- The Cowork scheduled task "Arman Weekly Content Draft" stays disabled and should be deleted; this repo's weekly rhythm replaces it.

## 2026-09-13 — the shoot did not happen
- Faisal confirms the 5, 6, 12, 13 Sept shoot did not take place. It was delayed, not partly done. The tracker's shoot milestones were marked done on the strength of the handover's calendar; corrected to one planned milestone, week of 14 Sept, so nothing false crosses to the portal.
- New plan: short sessions on different days and times through w/c 14 Sept, website pushed the week after. Arman is not in a rush.
- Consequence for this repo: no assets exist. Content can still be briefed with `asset: NEEDED — <description>`; those briefs double as the shot list for the week.

## 2026-09-17 — slopmonster installed
- Faisal asked for github.com/ItsssssJack/SlopMonster (MIT, Jack Roberts). Installed at `.claude/skills/slopmonster/` so it lives with the repo, not in a session's home folder. Images, the upstream CI workflow and its nested gitignore were left out; everything else is verbatim.
- Its scorer is stdlib Python, no network. Its cleanse step needs a rival-family CLI (`codex`); without one it prints the prompt to paste into another model's chat rather than let the drafting model mark its own work. That is the intended behaviour and the situation in this environment.
- `scripts/lint-copy.sh` wraps the scorer and adds this client's ban list and the never-name facts. The producer runs it before any piece reaches `awaiting-approval`.

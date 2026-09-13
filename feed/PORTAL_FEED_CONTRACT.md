# Portal feed contract — v1

The marketing repo produces `content.json`. The owner portal renders it.
Neither repo needs to know how the other works.

## Direction
Marketing → Portal. One way. The portal never writes back.

## Delivery
`feed/publish.sh` in the marketing repo copies `feed/dist/content.json` into the
portal repo at its expected path and commits it. Portal auto-deploys from main.
Manual for now. GitHub Action later, once trusted.

## Whitelist — the ONLY things that cross
- `meta.lastUpdated` (ISO date), `meta.isDemo` (bool), `meta.schema` (int)
- `stats[]` — exactly the six agreed stats, each `{id, label, value, unit, period,
  goodDirection, previous}`. `value` is `null` when unknown. Never 0 for unknown.
- `schedule[]` — APPROVED items only: `{date, channel, title, blurb, status}`.
  `status` ∈ planned | scheduled | published. `blurb` is one line, client-safe.
- `milestones[]` — `{date, title, status}`. Shoot, go-live, campaign starts.
- `delivered[]` — `{date, title}`. Recently completed. Max 10.
- `needsFromYou[]` — `{title, why, how}`. Things Arman must do. Client-safe wording.

## Never crosses
- Draft copy. Anything with status awaiting-approval.
- Research, competitor notes, seasonal plans.
- Performance of anything that underperformed.
- Costs, margins, retainer, invoices, anything commercial.
- Blockers, internal notes, agent output, anything about how content is made.
- Full captions or email bodies. Titles and one-line blurbs only.

## The six stats
instagram_followers · reach_7d · newsletter_subscribers · email_open_rate ·
enquiries_from_ads · cost_per_enquiry (goodDirection: "down")

## Demo mode
While any stat is null and placeholders are shown, `meta.isDemo` is true and the
portal renders its non-dismissible "example figures" label. The feed must never
send fake numbers to make demo mode go away.

## Versioning
Bump `meta.schema` on any breaking change. Both repos update together.

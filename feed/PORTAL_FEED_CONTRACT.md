# Portal feed contract — v1

The marketing repo (`ARM_MRKT`) produces `content.json`. The owner portal (`ARMAN_OWNER_PORTAL`) renders it. Neither repo needs to know how the other works.

**This file lives in BOTH repos, identical. It is the only thing the two sessions share.**

## Direction
Marketing → Portal. One way. The portal never writes back.

## Delivery
`feed/publish.sh` in the marketing repo copies `feed/dist/content.json` into the portal repo at its expected path and commits it. Portal auto-deploys from main.
Manual for now. GitHub Action later, once trusted.

## Whitelist — the ONLY things that cross
- `meta.lastUpdated` (ISO date), `meta.isDemo` (bool), `meta.schema` (int)
- `stats[]` — exactly the six agreed stats, each `{id, label, value, unit, period, goodDirection, previous}`. `value` is `null` when unknown. Never 0 for unknown.
- `schedule[]` — APPROVED items only: `{date, channel, title, blurb, status}`. `status` ∈ planned | scheduled | published. `blurb` is one line, client-safe.
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
```
instagram_followers      goodDirection: up
reach_7d                 goodDirection: up
newsletter_subscribers   goodDirection: up
email_open_rate          goodDirection: up
enquiries_from_ads       goodDirection: up
cost_per_enquiry         goodDirection: down
```

## Demo mode
While any stat is null and placeholders are shown, `meta.isDemo` is true and the portal renders its non-dismissible "example figures" label. The feed must never send fake numbers to make demo mode go away.

## Example
```json
{
  "meta": { "schema": 1, "lastUpdated": "2026-09-21", "isDemo": true },
  "stats": [
    { "id": "instagram_followers", "label": "Instagram followers", "value": null, "unit": "", "period": "now", "goodDirection": "up", "previous": null }
  ],
  "schedule": [
    { "date": "2026-09-25", "channel": "instagram", "title": "The grill, first look", "blurb": "First post from the new photography.", "status": "scheduled" }
  ],
  "milestones": [
    { "date": "2026-09-21", "title": "New website live", "status": "done" }
  ],
  "delivered": [],
  "needsFromYou": [
    { "title": "Google Business Profile access", "why": "So your listing can be kept current.", "how": "Business Profile → Users → Add → Manager." }
  ]
}
```

## Versioning
Bump `meta.schema` on any breaking change. Both repos update together.

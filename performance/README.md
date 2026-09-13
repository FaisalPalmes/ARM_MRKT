# Performance

One file per ISO week: `weekly/YYYY-Www.json` (e.g. `2026-W39.json`, the week of Mon 21 Sept). The `intel` agent writes it on the Sunday run; the producer reads the latest before planning; the hub shows all of it; the feed takes `portal.*` only.

## Rules
- **Unknown is `null`. Never 0.** Zero means "we measured and it was zero". The portal is built not to render nulls; a fake zero would render as a real, terrible number.
- Every number has a source in `source`: `api` (Facebook Ads MCP), `manual` (pasted by Faisal from the native dashboard), or `null` when nothing was recorded.
- `portal.*` is what crosses to Arman's portal via the feed. `internal.*` never does.
- Underperformance is recorded honestly here. It never crosses.

## Schema
```json
{
  "week": "2026-W39",
  "recorded": "2026-09-27",
  "source": { "meta_ads": "api", "instagram": "manual", "facebook": "manual", "brevo": "manual", "gbp": "manual" },
  "portal": {
    "instagram_followers": null,
    "reach_7d": null,
    "newsletter_subscribers": null,
    "email_open_rate": null,
    "enquiries_from_ads": null,
    "cost_per_enquiry": null
  },
  "internal": {
    "ads": [ { "creative": "2026-09-28-early-bird-set-a", "spend": null, "impressions": null, "clicks": null, "results": null, "cpr": null } ],
    "posts": [ { "content": "content/posts/2026-09-25-khorovats-launch.md", "reach": null, "likes": null, "saves": null, "shares": null, "comments": null } ],
    "email": [ { "content": "content/email/2026-10-02-first-send.md", "sent": null, "opens": null, "clicks": null, "unsubs": null } ],
    "gbp": { "calls": null, "directions": null, "website_clicks": null }
  },
  "notes": ""
}
```

Units: `email_open_rate` is a percentage (e.g. `42.5`). `cost_per_enquiry`, `spend` and `cpr` are pounds. `reach_7d` is people reached in the seven days of the week. `enquiries_from_ads` counts booking-widget or enquiry conversions attributed to ads that week. `ads[].creative` is the ad file's slug (`content/ads/<slug>.md`). `gbp` is calls, direction requests and website clicks from the Google Business Profile — the most commercially direct numbers available once manager access exists.

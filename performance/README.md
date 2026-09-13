# Performance

One file per ISO week: `weekly/YYYY-Www.json` (e.g. `2026-W39.json`, the week of Mon 21 Sept). Written by the `intel` agent on the Sunday run. Read by the producer before planning, by the hub, and by the feed (the six stats only).

## Rules
- **A number you don't have is `null`. Never 0.** Zero means "we measured and it was zero".
- Every number has a source in `sources`. Meta ads via the Facebook Ads MCP when connected; Instagram, Facebook and Brevo pasted in by Faisal from the native dashboards until an API exists.
- Only the six `stats` cross to the portal. Everything under `internal` stays here and in the hub.
- Underperformance is recorded honestly here. It never crosses.

## Schema

```json
{
  "week": "2026-W39",
  "from": "2026-09-21",
  "to": "2026-09-27",
  "recorded": "2026-09-27",
  "sources": {
    "instagram": "Instagram Insights, pasted by Faisal 27 Sept",
    "facebook": null,
    "meta_ads": "Facebook Ads MCP, account <id>",
    "brevo": null
  },
  "stats": {
    "instagram_followers": null,
    "reach_7d": null,
    "newsletter_subscribers": null,
    "email_open_rate": null,
    "enquiries_from_ads": null,
    "cost_per_enquiry": null
  },
  "internal": {
    "posts": [
      { "content": "content/posts/2026-09-25-khorovats-launch.md", "channel": "instagram", "reach": null, "likes": null, "saves": null, "comments": null, "shares": null }
    ],
    "creatives": [
      { "content": "content/ads/2026-09-28-early-bird-set-a.md", "variant": "A", "days_live": null, "spend": null, "results": null, "cost_per_result": null }
    ],
    "email": { "content": "content/email/2026-10-02-first-send.md", "sends": null, "opens": null, "open_rate": null, "clicks": null, "click_rate": null, "unsubscribes": null }
  },
  "notes": ""
}
```

Units: `email_open_rate` and `click_rate` are percentages (e.g. `42.5`). `cost_per_enquiry`, `spend`, `cost_per_result` are pounds. `reach_7d` is people reached in the seven days of the week. `enquiries_from_ads` counts booking-widget or enquiry conversions attributed to ads that week.

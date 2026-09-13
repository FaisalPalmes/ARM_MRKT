# Content

One file per piece. `posts/` for Instagram and Facebook, `ads/` for Meta ads, `email/` for the weekly send. Create with `scripts/new-post.sh` or `scripts/new-email.sh` so the frontmatter is right.

## Frontmatter

```yaml
---
date: 2026-09-25              # publish / start / send date
channel: instagram            # instagram | facebook | meta-ads | email
pillar: fire                  # fire | table | 58-years | cellar | calendar | room
title: Khorovats launch       # internal title; also what the portal shows
blurb: First look at the charcoal grill.   # ONE client-safe line. The only body text that ever crosses to the portal.
asset: A0001                  # id from assets/index.json, or "NEEDED — <description>"
status: draft                 # draft | awaiting-approval | approved | rejected | scheduled | published
approved_by:                  # Faisal — set when approved
approved_on:                  # YYYY-MM-DD
why: Establish the grill as the signature before ads start.   # 24 Apr is commemorative only; no Early Bird 15 Nov – 1 Jan   # one sentence. No why, no post.
rejection_reason:             # one line, when rejected — so the producer learns
---
```

## Status flow
`draft` → `awaiting-approval` (producer has run the ban list) → Faisal reads it in the hub → `approved` (with `approved_by` and `approved_on`) or `rejected` (with `rejection_reason`) → `scheduled` (loaded into Meta Business Suite / Brevo with a time) → `published`.

Only `approved`, `scheduled` and `published` items cross to the portal, and only their `date`, `channel`, `title`, `blurb` and status. Captions, ad copy and email bodies never cross. The feed build fails if an approved item has no approver or no blurb.

## Bodies
- **Post:** `## Caption`, `## Alt text`, `## Hashtags` (max 8). Adapt per platform; if the same idea goes to Instagram and Facebook, that's two files.
- **Ad:** `## Variant A` and `## Variant B`, each with Primary text, Headline, Description, CTA. Then `## Audience`, `## Budget note`, `## Landing`. Always two variants.
- **Email:** `## Subject A`, `## Subject B`, `## Preview text`, `## Body`, `## CTA` (one). One send per week.

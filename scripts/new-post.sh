#!/usr/bin/env bash
# Creates a content file with the right frontmatter.
# Usage: scripts/new-post.sh YYYY-MM-DD CHANNEL PILLAR SLUG ["Title"]
#   CHANNEL: instagram | facebook | meta-ads     PILLAR: grill | dishes | story | bar | offers | occasions
#   For an ad:  KIND=ads scripts/new-post.sh 2026-09-28 meta-ads offers early-bird-set-a "Early Bird, set A"
set -euo pipefail
cd "$(dirname "$0")/.."
DATE=${1:?date YYYY-MM-DD}; CHANNEL=${2:?channel}; PILLAR=${3:?pillar}; SLUG=${4:?slug}; TITLE=${5:-}
KIND=${KIND:-posts}
[[ "$DATE" =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]] || { echo "date must be YYYY-MM-DD" >&2; exit 2; }
[[ "$CHANNEL" =~ ^(instagram|facebook|meta-ads)$ ]] || { echo "channel must be instagram | facebook | meta-ads" >&2; exit 2; }
[[ "$PILLAR" =~ ^(grill|dishes|story|bar|offers|occasions)$ ]] || { echo "pillar must be a key from context/pillars.md" >&2; exit 2; }
[[ "$KIND" =~ ^(posts|ads)$ ]] || { echo "KIND must be posts or ads" >&2; exit 2; }
FILE="content/$KIND/${DATE}-${SLUG}.md"
[ -e "$FILE" ] && { echo "exists: $FILE" >&2; exit 1; }

{
cat <<EOF
---
date: $DATE
channel: $CHANNEL
pillar: $PILLAR
title: $TITLE
blurb:
asset: NEEDED —
status: draft
approved_by:
approved_on:
why:
rejection_reason:
---

EOF
if [ "$KIND" = ads ]; then
cat <<'EOF'
## Variant A
**Primary text:**

**Headline:**

**Description:**

**CTA:**

## Variant B
**Primary text:**

**Headline:**

**Description:**

**CTA:**

## Audience
(age targeting if any alcohol appears; location radius; interests)

## Budget note
(share of the £200/month; Arman's card)

## Landing
(NeroBooking widget or Early Bird page)
EOF
else
cat <<'EOF'
## Caption

## Alt text

## Hashtags
(max 8, local and specific)
EOF
fi
} > "$FILE"
echo "created $FILE"

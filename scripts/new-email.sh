#!/usr/bin/env bash
# Creates a weekly email file with the right frontmatter.
# Usage: scripts/new-email.sh YYYY-MM-DD SLUG ["Title"]
set -euo pipefail
cd "$(dirname "$0")/.."
DATE=${1:?send date YYYY-MM-DD}; SLUG=${2:?slug}; TITLE=${3:-}
[[ "$DATE" =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]] || { echo "date must be YYYY-MM-DD" >&2; exit 2; }
FILE="content/email/${DATE}-${SLUG}.md"
[ -e "$FILE" ] && { echo "exists: $FILE" >&2; exit 1; }
# one per week: refuse if another email lands within 6 days either side
for f in content/email/*.md; do
  [ -e "$f" ] || continue
  case "$f" in *README*) continue ;; esac
  other=$(basename "$f" | cut -c1-10)
  diff=$(( ( $(date -d "$DATE" +%s 2>/dev/null || date -j -f %Y-%m-%d "$DATE" +%s) - $(date -d "$other" +%s 2>/dev/null || date -j -f %Y-%m-%d "$other" +%s) ) / 86400 ))
  [ "${diff#-}" -lt 6 ] && { echo "refusing: $f is within 6 days. One email per week unless Faisal changes the rule." >&2; exit 1; }
done
cat > "$FILE" <<EOF
---
date: $DATE
channel: email
pillar:
title: $TITLE
blurb:
asset: NEEDED —
status: draft
approved_by:
approved_on:
why:
rejection_reason:
---

## Subject A

## Subject B

## Preview text

## Body

## CTA
(one)
EOF
echo "created $FILE"

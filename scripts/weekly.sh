#!/usr/bin/env bash
# The Sunday-evening rhythm (handover §9). About 90 minutes of Faisal's time, most of it review.
# Steps 1 and 2 are agent runs done in the session; this script does the mechanical steps and prints the checklist.
set -euo pipefail
cd "$(dirname "$0")/.."
echo "Weekly run — $(date +%Y-%m-%d)"
echo
echo "1. Intel run (in the session):    performance ingest → performance/weekly/YYYY-Www.json (null, never 0); seasonal scan six weeks ahead → research/seasonal.md"
echo "2. Producer run (in the session): next week's posts → awaiting-approval; next email drafted; ad rotation proposed if a variant has run 7+ days"
echo
echo "3. Hub rebuild"
node hub/build.js
echo "   → open hub/dist/index.html"
echo
echo "4. Review: approve, reject (one-line reason) or edit each item in content/. Then rebuild the hub."
echo
echo "5. Feed build"
node feed/build-feed.js
echo "   → read feed/dist/content.json, then: feed/publish.sh"
echo
echo "6. Portal stats copy-out: this week's Instagram / Facebook / Meta numbers → performance/weekly/, then rebuild the feed."
echo
echo "First Sunday of the month, also: next month's calendar · competitor scan → research/competitors.md · asset index review (overused, unused)."

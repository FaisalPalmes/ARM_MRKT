#!/usr/bin/env node
'use strict';
// Builds feed/dist/content.json for the owner portal, per feed/PORTAL_FEED_CONTRACT.md.
// Whitelist only: every object below is constructed key by key. Nothing else can leak.
// Fails loudly rather than emit something the contract forbids.

const fs = require('fs');
const path = require('path');
const D = require('../lib/data');

const SCHEMA = 1;
const today = D.todayISO();
const fail = msg => { console.error(`feed: REFUSED — ${msg}`); process.exit(1); };
const isNum = v => typeof v === 'number' && Number.isFinite(v);
const num = v => (isNum(v) ? v : null);

// ---- stats: the six agreed, from the latest weekly file ----
const STATS = [
  { id: 'instagram_followers', label: 'Instagram followers', unit: 'followers', period: 'total', goodDirection: 'up' },
  { id: 'reach_7d', label: 'People reached', unit: 'people', period: 'last 7 days', goodDirection: 'up' },
  { id: 'newsletter_subscribers', label: 'Newsletter subscribers', unit: 'subscribers', period: 'total', goodDirection: 'up' },
  { id: 'email_open_rate', label: 'Email open rate', unit: '%', period: 'last send', goodDirection: 'up' },
  { id: 'enquiries_from_ads', label: 'Enquiries from adverts', unit: 'enquiries', period: 'last 7 days', goodDirection: 'up' },
  { id: 'cost_per_enquiry', label: 'Cost per enquiry', unit: '£', period: 'last 7 days', goodDirection: 'down' },
];
const perf = D.loadPerformance();
const latest = perf[perf.length - 1] || {};
const prev = perf[perf.length - 2] || {};
const stats = STATS.map(s => ({
  id: s.id, label: s.label,
  value: num((latest.stats || {})[s.id]),
  unit: s.unit, period: s.period, goodDirection: s.goodDirection,
  previous: num((prev.stats || {})[s.id]),
}));
const isDemo = stats.some(s => s.value === null);

// ---- schedule: approved items only ----
const STATUS_MAP = { approved: 'planned', scheduled: 'scheduled', published: 'published' };
const CHANNEL = { instagram: 'Instagram', facebook: 'Facebook', 'meta-ads': 'Meta adverts', email: 'Email' };
const content = D.loadContent();
const schedule = [];
for (const c of content) {
  const status = STATUS_MAP[c.status];
  if (!status) continue;
  if (!D.ISO.test(c.date || '')) fail(`${c.file} has no ISO date`);
  if (c.date < D.addDays(today, -14)) continue;
  if (!c.approved_by || !D.ISO.test(c.approved_on || '')) fail(`${c.file} is ${c.status} but approved_by/approved_on are not both set`);
  if (!c.title) fail(`${c.file} has no title`);
  if (!c.blurb || /\r|\n/.test(c.blurb)) fail(`${c.file} needs a one-line blurb`);
  if (!CHANNEL[c.channel]) fail(`${c.file} has unknown channel "${c.channel}"`);
  schedule.push({ date: c.date, channel: CHANNEL[c.channel], title: c.title, blurb: c.blurb, status });
}
schedule.sort((a, b) => a.date.localeCompare(b.date));

// ---- milestones, delivered, needsFromYou: from context/tracker.json ----
const tracker = D.loadTracker();
const milestones = tracker.milestones.filter(m => m.portal === true).map(m => {
  if (!D.ISO.test(m.date || '')) fail(`milestone "${m.title}" is marked portal but has no firm ISO date`);
  if (!['planned', 'done'].includes(m.status)) fail(`milestone "${m.title}" status must be planned or done`);
  return { date: m.date, title: m.title, status: m.status };
}).sort((a, b) => a.date.localeCompare(b.date));

const delivered = [
  ...tracker.delivered.map(d => ({ date: d.date, title: d.title })),
  ...content.filter(c => c.status === 'published').map(c => ({ date: c.date, title: c.title })),
].filter(d => D.ISO.test(d.date || '') && d.title).sort((a, b) => b.date.localeCompare(a.date)).slice(0, 10);

const needsFromYou = tracker.open_items
  .filter(i => i.status !== 'done' && i.owner === 'arman' && i.portal && typeof i.portal === 'object')
  .map(i => {
    const { title, why, how } = i.portal;
    if (!title || !why || !how) fail(`open item "${i.id}" has an incomplete portal block (title, why, how all required)`);
    return { title, why, how };
  });

const feed = {
  meta: { lastUpdated: today, isDemo, schema: SCHEMA },
  stats, schedule, milestones, delivered, needsFromYou,
};

// ---- last line of defence: words that must never cross ----
const json = JSON.stringify(feed, null, 2);
const banned = /\b(AI|automation|automated|agent|Claude|draft|awaiting|retainer|invoice|margin|blocker|internal|underperform\w*)\b/g;
const hits = [...json.matchAll(banned)].map(m => m[0]);
if (hits.length) fail(`banned word(s) in output: ${[...new Set(hits)].join(', ')} — fix the source, not the build`);

const out = path.join(__dirname, 'dist');
fs.mkdirSync(out, { recursive: true });
fs.writeFileSync(path.join(out, 'content.json'), json + '\n');
console.log(`feed: wrote feed/dist/content.json — isDemo=${isDemo}, ${schedule.length} scheduled, ${milestones.length} milestones, ${delivered.length} delivered, ${needsFromYou.length} needsFromYou`);

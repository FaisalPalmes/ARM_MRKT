#!/usr/bin/env node
'use strict';
// Renders hub/dist/index.html from the repo's data. The output is generated — never hand-edit hub/dist.
// Usage: node hub/build.js        (HUB_TODAY=YYYY-MM-DD renders as of another day)

const fs = require('fs');
const path = require('path');
const D = require('../lib/data');

const today = D.todayISO();
const content = D.loadContent();
const calendar = D.loadCalendar();
const perf = D.loadPerformance();
const index = D.loadAssets();
const tracker = D.loadTracker();
const seasonal = D.loadSeasonal();
const research = D.loadResearchFiles();
const imports = D.contextImports();
const scans = D.competitorScanDates();

// ---- helpers ----
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const chip = (label, tone) => `<span class="chip ${tone}">${esc(label)}</span>`;
const code = s => (s ? `<code>${esc(s)}</code>` : '');
const STATUS_TONE = {
  'awaiting-approval': 'amber', draft: 'grey', idea: 'grey', approved: 'green', scheduled: 'green',
  published: 'green', rejected: 'red', 'not-drafted': 'red', 'missing-file': 'red',
};
const statusChip = s => chip(s || 'no status', STATUS_TONE[s] || 'grey');
const section = (id, title, inner, sub) =>
  `<section id="${id}"><h2>${esc(title)}${sub ? ` <small>${esc(sub)}</small>` : ''}</h2>${inner}</section>`;
const table = (headers, rows, empty) => rows.length
  ? `<table><thead><tr>${headers.map(h => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>`
  : `<p class="empty">${esc(empty)}</p>`;
const list = (items, empty) => items.length ? `<ul>${items.map(i => `<li>${i}</li>`).join('')}</ul>` : `<p class="empty">${esc(empty)}</p>`;
const h3 = (t, n) => `<h3>${esc(t)}${n !== undefined ? ` <span class="count">${n}</span>` : ''}</h3>`;

// ---- join calendar slots with content files ----
const byFile = new Map(content.map(c => [c.file, c]));
const seen = new Set();
const slots = [];
for (const r of calendar) {
  const c = r.content ? byFile.get(r.content) : null;
  if (c) seen.add(c.file);
  slots.push({
    date: r.date, channel: (c && c.channel) || r.channel, pillar: (c && c.pillar) || r.pillar,
    title: (c && c.title) || r.title, file: c ? c.file : r.content,
    status: c ? (c.status || 'draft') : (r.content ? 'missing-file' : 'not-drafted'),
    notes: r.notes, asset: c ? c.asset : '',
  });
}
for (const c of content) {
  if (seen.has(c.file) || !D.ISO.test(c.date || '')) continue;
  slots.push({ date: c.date, channel: c.channel, pillar: c.pillar, title: c.title, file: c.file, status: c.status || 'draft', notes: 'not on the calendar', asset: c.asset });
}
slots.sort((a, b) => a.date.localeCompare(b.date));
const within = (from, to) => slots.filter(s => s.date >= from && s.date <= to);
const slotRow = s => [esc(D.fmtDate(s.date)), esc(s.channel), esc(s.pillar), esc(s.title || '—'), statusChip(s.status), code(s.file) + (s.notes ? ` <span class="muted">${esc(s.notes)}</span>` : '')];
const SLOT_HEAD = ['Date', 'Channel', 'Pillar', 'Title', 'Status', 'File'];

// ---- 1. Needs you ----
const approvals = content.filter(c => c.status === 'awaiting-approval');
const faisalItems = tracker.open_items.filter(i => i.status !== 'done' && i.owner === 'faisal');
const missingImports = imports.filter(i => !i.done);
const consentMissing = index.assets.filter(a => !a.withdrawn && /^MISSING/i.test(String(a.consent || '')));
const needed = content.filter(c => /^NEEDED/i.test(c.asset || '') && !['rejected', 'published'].includes(c.status));
const undrafted = within(today, D.addDays(today, 7)).filter(s => s.status === 'not-drafted' || s.status === 'missing-file');
const needsCount = approvals.length + faisalItems.length + missingImports.length + consentMissing.length + needed.length + undrafted.length;

const needsYou =
  h3('Approvals waiting', approvals.length) +
  table(['Date', 'Channel', 'Title', 'Why', 'File'], approvals.map(c => [esc(D.fmtDate(c.date)), esc(c.channel), esc(c.title), esc(c.why), code(c.file)]), 'Nothing awaiting approval.') +
  h3('Only you can do these', faisalItems.length) +
  list(faisalItems.map(i => `${esc(i.title)}${i.note ? ` <span class="muted">— ${esc(i.note)}</span>` : ''} <span class="muted">(since ${esc(i.since || '?')})</span>`), 'Nothing open.') +
  h3('Context docs not yet imported', missingImports.length) +
  list(missingImports.map(i => `${code(i.file)} ← <em>${esc(i.from)}</em>${i.why ? ` <span class="muted">— ${esc(i.why)}</span>` : ''}`), 'All context docs imported.') +
  h3('Assets needing consent', consentMissing.length) +
  list(consentMissing.map(a => `${code(a.id)} ${esc(a.file)} — ${esc(a.people)}`), 'None.') +
  h3('Briefs waiting on an asset', needed.length) +
  list(needed.map(c => `${esc(D.fmtDate(c.date))} ${esc(c.title)} — ${esc(c.asset)} ${code(c.file)}`), 'None.') +
  h3('Slots inside 7 days with nothing drafted', undrafted.length) +
  table(SLOT_HEAD, undrafted.map(slotRow), 'None.');

// ---- 2. This week / 4. Next two weeks ----
const week = within(today, D.addDays(today, 6));
const fortnight = within(D.addDays(today, 7), D.addDays(today, 20));

// ---- 3. Numbers ----
const STATS = [
  { id: 'instagram_followers', label: 'Instagram followers', unit: '', goodDirection: 'up' },
  { id: 'reach_7d', label: 'Reach, 7 days', unit: '', goodDirection: 'up' },
  { id: 'newsletter_subscribers', label: 'Newsletter subscribers', unit: '', goodDirection: 'up' },
  { id: 'email_open_rate', label: 'Email open rate', unit: '%', goodDirection: 'up' },
  { id: 'enquiries_from_ads', label: 'Enquiries from ads', unit: '', goodDirection: 'up' },
  { id: 'cost_per_enquiry', label: 'Cost per enquiry', unit: '£', goodDirection: 'down' },
];
const latest = perf[perf.length - 1];
const prev = perf[perf.length - 2];
const isNum = v => typeof v === 'number' && Number.isFinite(v);
const fmtVal = (v, unit) => !isNum(v) ? '<span class="muted" title="not recorded">—</span>' : unit === '£' ? `£${v.toFixed(2)}` : unit === '%' ? `${v}%` : v.toLocaleString('en-GB');
const movement = (v, p, good) => {
  if (!isNum(v) || !isNum(p)) return '<span class="muted">—</span>';
  const d = v - p; if (d === 0) return '<span class="muted">= no change</span>';
  const better = (d > 0 && good === 'up') || (d < 0 && good === 'down');
  return `<span class="${better ? 'up' : 'down'}">${d > 0 ? '▲' : '▼'} ${Math.abs(d).toLocaleString('en-GB')}</span>`;
};
const titleOf = f => (byFile.get(f) && byFile.get(f).title) || f || '—';
let numbers;
if (!latest) {
  numbers = `<p class="empty">No weekly numbers recorded yet. The first file goes in <code>performance/weekly/</code> on the first Sunday run; until then every stat is null and the portal shows demo mode.</p>` +
    table(['Stat', 'Value', 'Previous', 'Change'], STATS.map(s => [esc(s.label), fmtVal(null), fmtVal(null), movement(null, null)]), '');
} else {
  const st = latest.stats || {}; const ps = (prev && prev.stats) || {};
  const src = latest.sources || {};
  numbers =
    `<p class="muted">Week ${esc(latest.week)} (${esc(latest.from)} → ${esc(latest.to)}), recorded ${esc(latest.recorded || '?')}. Sources: ${esc(Object.entries(src).map(([k, v]) => `${k}: ${v || 'none'}`).join(' · '))}</p>` +
    h3('The six stats (these cross to the portal)') +
    table(['Stat', 'Value', 'Previous', 'Change'], STATS.map(s => [esc(s.label), `<span class="num">${fmtVal(st[s.id], s.unit)}</span>`, `<span class="num">${fmtVal(ps[s.id], s.unit)}</span>`, movement(st[s.id], ps[s.id], s.goodDirection)]), '') +
    h3('Posts (internal)') +
    table(['Post', 'Channel', 'Reach', 'Likes', 'Saves', 'Comments', 'Shares'], ((latest.internal || {}).posts || []).map(p => [esc(titleOf(p.content)), esc(p.channel), fmtVal(p.reach), fmtVal(p.likes), fmtVal(p.saves), fmtVal(p.comments), fmtVal(p.shares)]), 'No post numbers this week.') +
    h3('Ad creatives (internal)') +
    table(['Creative', 'Variant', 'Days live', 'Spend', 'Results', 'Cost / result'], ((latest.internal || {}).creatives || []).map(c => [esc(titleOf(c.content)), esc(c.variant), fmtVal(c.days_live), fmtVal(c.spend, '£'), fmtVal(c.results), fmtVal(c.cost_per_result, '£')]), 'No ad numbers this week.') +
    h3('Email (internal)') +
    (latest.internal && latest.internal.email
      ? table(['Send', 'Sends', 'Opens', 'Open rate', 'Clicks', 'Click rate', 'Unsubscribes'], [[esc(titleOf(latest.internal.email.content)), fmtVal(latest.internal.email.sends), fmtVal(latest.internal.email.opens), fmtVal(latest.internal.email.open_rate, '%'), fmtVal(latest.internal.email.clicks), fmtVal(latest.internal.email.click_rate, '%'), fmtVal(latest.internal.email.unsubscribes)]], '')
      : '<p class="empty">No email numbers this week.</p>') +
    (latest.notes ? `<p><strong>Notes:</strong> ${esc(latest.notes)}</p>` : '');
}

// ---- 5. Assets ----
const A = index.assets.filter(a => !a.withdrawn);
const addedOn = a => a.added || a.shot_day || '';
const lastUse = a => (a.used || []).map(u => u.date).filter(Boolean).sort().pop() || null;
const recent = A.filter(a => addedOn(a) && D.daysBetween(addedOn(a), today) <= 14).sort((x, y) => addedOn(y).localeCompare(addedOn(x))).slice(0, 10);
const mostUsed = A.filter(a => (a.used || []).length).sort((x, y) => y.used.length - x.used.length).slice(0, 5);
const stale = A.filter(a => { const lu = lastUse(a); if (lu) return D.daysBetween(lu, today) >= 30; const ad = addedOn(a); return ad && D.daysBetween(ad, today) >= 30; });
const byType = A.reduce((m, a) => { m[a.type || 'untyped'] = (m[a.type || 'untyped'] || 0) + 1; return m; }, {});
const assetRow = a => [code(a.id), esc(a.file), esc(a.type), esc(a.subject), esc((a.tags || []).join(', ')), esc(a.people), esc(a.consent)];
const ASSET_HEAD = ['Id', 'File', 'Type', 'Subject', 'Tags', 'People', 'Consent'];
const assetsHtml = !A.length
  ? `<p class="empty">The index is empty. First job: ingest the shoot (5, 6, 12, 13 Sept) and index every usable file. Nothing can be planned against an unindexed asset.</p>`
  : `<p class="muted">${A.length} assets indexed · ${esc(Object.entries(byType).map(([k, v]) => `${v} ${k}`).join(' · '))} · index updated ${esc(index.updated || '?')}</p>` +
    h3('Recently added (14 days)', recent.length) + table(ASSET_HEAD, recent.map(assetRow), 'None.') +
    h3('Most used', mostUsed.length) + table(['Id', 'File', 'Uses', 'Last used'], mostUsed.map(a => [code(a.id), esc(a.file), String(a.used.length), esc(lastUse(a))]), 'Nothing used yet.') +
    h3('Unused for 30+ days', stale.length) + table(ASSET_HEAD, stale.map(assetRow), 'None.');

// ---- 6. Research ----
const sixWeeks = D.addDays(today, 42);
const coming = seasonal.filter(r => r.date >= today && r.date <= sixWeeks);
const plannedOn = date => slots.some(s => s.date === date);
const lastScan = scans[scans.length - 1];
const researchHtml =
  h3('Latest findings', research.length) +
  list(research.slice(0, 6).map(r => `${esc(D.fmtDate(r.date))} — ${esc(r.topic)} ${code(r.file)}`), 'No dated research files yet. The intel agent writes research/YYYY-MM-DD-topic.md.') +
  h3('Coming in the next six weeks', coming.length) +
  table(['Date', 'What', 'Relevance', 'Planned?', 'Source'], coming.map(r => [esc(D.fmtDate(r.date)), esc(r.what), esc(r.relevance), plannedOn(r.date) ? chip('on calendar', 'green') : chip('nothing planned', 'amber'), esc(r.source)]), 'Nothing in research/seasonal.md for the next six weeks — the intel agent should be six weeks ahead.') +
  h3('Competitor scan') +
  `<p>${lastScan ? `Last scan ${esc(D.fmtDate(lastScan))}${D.daysBetween(lastScan, today) > 35 ? ' ' + chip('overdue', 'amber') : ''}` : chip('no scan yet', 'amber') + ' Monthly, first Sunday.'}</p>`;

// ---- 7. Arman ----
const com = tracker.commercial;
const yn = (ok, yes, no) => ok ? chip(yes, 'green') : chip(no, 'red');
const armanAccess = tracker.open_items.filter(i => i.owner === 'arman' && i.kind === 'access');
const armanOther = tracker.open_items.filter(i => i.owner === 'arman' && i.kind !== 'access' && i.status !== 'done');
const otherOwners = tracker.open_items.filter(i => !['faisal', 'arman'].includes(i.owner) && i.status !== 'done');
const armanHtml =
  h3('Commercial (never crosses to the portal)') +
  table(['Item', 'Status', 'Note'], [
    ['Staged payments confirmed', yn(com.staged_payments_confirmed, 'confirmed', 'not confirmed'), ''],
    [`Start date confirmed (${esc(com.start_date || '?')})`, yn(com.start_date_confirmed, 'confirmed', 'not confirmed'), ''],
    ['Written contract', yn(com.contract_signed, 'signed', 'none — proposal only'), esc(com.note || '')],
  ], '') +
  h3('Access', armanAccess.length) +
  table(['Access', 'Status', 'Blocks', 'Since'], armanAccess.map(i => [esc(i.title), i.status === 'done' ? chip('granted ' + (i.closed_on || ''), 'green') : chip('not granted', 'red'), esc(i.blocks || ''), esc(i.since || '')]), 'No access items tracked.') +
  h3('Other things Arman owes us', armanOther.length) +
  list(armanOther.map(i => `${esc(i.title)}${i.note ? ` <span class="muted">— ${esc(i.note)}</span>` : ''}${i.portal ? ' ' + chip('crosses to portal', 'grey') : ''}`), 'None.') +
  h3('Parked with other people', otherOwners.length) +
  list(otherOwners.map(i => `<span class="muted">[${esc(i.owner)}]</span> ${esc(i.title)}${i.note ? ` <span class="muted">— ${esc(i.note)}</span>` : ''}`), 'None.');

// ---- page ----
const range = (a, b) => `${D.fmtDate(a)} – ${D.fmtDate(b)}`;
const built = new Date().toISOString().replace('T', ' ').slice(0, 16) + ' UTC';
let sha = '';
try { sha = require('child_process').execSync('git rev-parse --short HEAD', { cwd: D.ROOT, stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim(); } catch (_) { /* not a git checkout */ }

const html = `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow, noarchive">
<title>Armenian Taverna — hub</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Newsreader:wght@500;600&family=Karla:wght@400;600&display=swap">
<style>
:root{--ink:#1c1b19;--muted:#6b675f;--line:#e4e0d8;--bg:#fbfaf7;--card:#fff;--red:#b42318;--amber:#b54708;--green:#067647;--grey:#4a4741;--redbg:#fee4e2;--amberbg:#fef0c7;--greenbg:#dcfae6;--greybg:#eeebe5}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);font:15px/1.45 Karla,system-ui,-apple-system,"Segoe UI",sans-serif;padding:24px 16px 64px}
main{max-width:1100px;margin:0 auto}
header{display:flex;flex-wrap:wrap;align-items:baseline;gap:8px 24px;margin-bottom:8px}
h1{font:600 28px/1.2 Newsreader,Georgia,serif;margin:0}
.asof{color:var(--muted)}
nav{display:flex;flex-wrap:wrap;gap:4px 14px;margin:8px 0 24px;font-size:13px}
nav a{color:var(--muted);text-decoration:none;border-bottom:1px solid var(--line)}
nav a b{color:var(--ink)}
h2{font:600 21px/1.2 Newsreader,Georgia,serif;margin:40px 0 10px;padding-top:14px;border-top:1px solid var(--line)}
h2 small{font:13px Karla,system-ui,sans-serif;color:var(--muted);margin-left:10px;font-weight:400}
h3{font-size:12px;text-transform:uppercase;letter-spacing:.06em;color:var(--muted);margin:20px 0 6px;font-weight:600}
h3 .count{color:var(--ink);background:var(--greybg);border-radius:999px;padding:0 7px;margin-left:4px}
table{width:100%;border-collapse:collapse;font-size:14px}
th,td{text-align:left;padding:6px 8px;border-bottom:1px solid var(--line);vertical-align:top}
th{color:var(--muted);font-weight:600;font-size:11.5px;text-transform:uppercase;letter-spacing:.05em}
code{font:12.5px ui-monospace,SFMono-Regular,Menlo,monospace;background:var(--greybg);padding:1px 5px;border-radius:3px;word-break:break-all}
.chip{display:inline-block;font-size:12px;line-height:1.5;padding:0 8px;border-radius:999px;white-space:nowrap;font-weight:600}
.red{background:var(--redbg);color:var(--red)}.amber{background:var(--amberbg);color:var(--amber)}.green{background:var(--greenbg);color:var(--green)}.grey{background:var(--greybg);color:var(--grey)}
.empty,.muted{color:var(--muted)}.empty{font-style:italic;margin:4px 0}
ul{margin:4px 0 8px;padding-left:20px}li{margin:4px 0}
.num{font-variant-numeric:tabular-nums}
.up{color:var(--green);font-weight:600}.down{color:var(--red);font-weight:600}
#needs{background:var(--card);border:1px solid var(--line);border-radius:8px;padding:4px 18px 14px;margin-top:8px}
#needs h2{border-top:0;margin-top:10px}
footer{margin-top:48px;color:var(--muted);font-size:12.5px;border-top:1px solid var(--line);padding-top:12px}
@media (max-width:640px){table{display:block;overflow-x:auto;white-space:nowrap}h1{font-size:24px}}
</style>
</head>
<body>
<main>
<header><h1>Armenian Taverna — hub</h1><span class="asof">as of ${esc(D.fmtDate(today))} ${esc(today)}</span></header>
<nav>
<a href="#needs">Needs you <b>${needsCount}</b></a>
<a href="#week">This week <b>${week.length}</b></a>
<a href="#numbers">Numbers</a>
<a href="#ahead">Next two weeks <b>${fortnight.length}</b></a>
<a href="#assets">Assets <b>${A.length}</b></a>
<a href="#research">Research</a>
<a href="#arman">Arman</a>
</nav>
${section('needs', 'Needs you', needsYou, `${needsCount} item${needsCount === 1 ? '' : 's'}`)}
${section('week', 'This week', table(SLOT_HEAD, week.map(slotRow), 'Nothing scheduled in the next seven days.'), range(today, D.addDays(today, 6)))}
${section('numbers', 'Numbers', numbers, latest ? `week ${latest.week}` : 'nothing recorded')}
${section('ahead', 'Next two weeks', table(SLOT_HEAD, fortnight.map(slotRow), 'Nothing on the calendar for days 8–21.'), range(D.addDays(today, 7), D.addDays(today, 20)))}
${section('assets', 'Assets', assetsHtml)}
${section('research', 'Research', researchHtml)}
${section('arman', 'Arman', armanHtml, `tracker updated ${tracker.updated || '?'}`)}
<footer>Built ${esc(built)}${sha ? ` from ${esc(sha)}` : ''} by <code>hub/build.js</code> from calendar/, content/, performance/, assets/, research/ and context/tracker.json. Do not edit this page — edit the data and rebuild.</footer>
</main>
</body>
</html>
`;

const out = path.join(__dirname, 'dist');
fs.mkdirSync(out, { recursive: true });
fs.writeFileSync(path.join(out, 'index.html'), html);
console.log(`hub: wrote hub/dist/index.html — as of ${today}: ${needsCount} needs-you, ${week.length} this week, ${fortnight.length} next two weeks, ${A.length} assets, ${perf.length} weekly file(s)`);

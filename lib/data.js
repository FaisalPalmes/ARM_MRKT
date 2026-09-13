'use strict';
// Shared readers for the repo's data. Used by hub/build.js and feed/build-feed.js
// so the two never parse the same file two different ways. No dependencies.

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const ISO = /^\d{4}-\d{2}-\d{2}$/;

// ---- dates (Europe/London, day precision) ----
function todayISO() {
  if (process.env.HUB_TODAY && ISO.test(process.env.HUB_TODAY)) return process.env.HUB_TODAY;
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/London', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
}
function addDays(iso, n) { const d = new Date(iso + 'T00:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); }
function daysBetween(a, b) { return Math.round((Date.parse(b + 'T00:00:00Z') - Date.parse(a + 'T00:00:00Z')) / 86400000); }
function fmtDate(iso) {
  if (!ISO.test(iso || '')) return iso || '';
  return new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' });
}

// ---- files ----
function exists(rel) { return fs.existsSync(path.join(ROOT, rel)); }
function read(rel) { return fs.readFileSync(path.join(ROOT, rel), 'utf8'); }
function readJSON(rel, fallback) {
  if (!exists(rel)) return fallback;
  try { return JSON.parse(read(rel)); } catch (e) { throw new Error(`${rel}: invalid JSON — ${e.message}`); }
}
function listFiles(relDir, ext) {
  const dir = path.join(ROOT, relDir);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => f.endsWith(ext) && !f.startsWith('.')).sort().map(f => path.posix.join(relDir, f));
}
const isReadme = f => path.basename(f).toLowerCase() === 'readme.md';

// ---- frontmatter: flat `key: value` lines between --- fences ----
function parseFrontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)([\s\S]*)$/);
  if (!m) return { data: {}, body: text };
  const data = {};
  for (const line of m[1].split(/\r?\n/)) {
    const mm = line.match(/^([A-Za-z_][\w-]*):\s?(.*)$/);
    if (!mm) continue;
    let v = mm[2].trim();
    const hash = v.search(/\s#\s/); // trailing comment
    if (hash > -1) v = v.slice(0, hash).trim();
    if (/^(['"]).*\1$/.test(v)) v = v.slice(1, -1);
    data[mm[1]] = v;
  }
  return { data, body: m[2] };
}

function loadContent() {
  const items = [];
  for (const kind of ['posts', 'ads', 'email']) {
    for (const file of listFiles(`content/${kind}`, '.md')) {
      if (isReadme(file)) continue;
      const { data, body } = parseFrontmatter(read(file));
      items.push({ file, kind, ...data, body });
    }
  }
  return items.sort((a, b) => (a.date || '').localeCompare(b.date || '') || a.file.localeCompare(b.file));
}

// ---- markdown pipe tables ----
function splitRow(line) {
  let s = line.trim();
  if (s.startsWith('|')) s = s.slice(1);
  if (s.endsWith('|')) s = s.slice(0, -1);
  return s.split('|').map(c => c.trim());
}
function parseTables(md) {
  const lines = md.split(/\r?\n/);
  const rows = [];
  for (let i = 0; i < lines.length - 1; i++) {
    if (!/^\s*\|/.test(lines[i]) || !/^\s*\|?\s*:?-{2,}/.test(lines[i + 1])) continue;
    const headers = splitRow(lines[i]).map(h => h.toLowerCase());
    let j = i + 2;
    while (j < lines.length && /^\s*\|/.test(lines[j])) {
      const cells = splitRow(lines[j]);
      if (cells.some(c => c !== '')) {
        const row = {};
        headers.forEach((h, k) => { row[h] = cells[k] || ''; });
        rows.push(row);
      }
      j++;
    }
    i = j;
  }
  return rows;
}

function loadCalendar() {
  const rows = [];
  for (const file of listFiles('calendar', '.md')) {
    if (isReadme(file)) continue;
    for (const r of parseTables(read(file))) {
      if (!ISO.test(r.date || '')) continue;
      rows.push({
        file, date: r.date, channel: r.channel || '', pillar: r.pillar || '', title: r.title || '',
        content: (r.content || '').replace(/^`|`$/g, ''), notes: r.notes || '',
      });
    }
  }
  return rows.sort((a, b) => a.date.localeCompare(b.date));
}

function loadPerformance() {
  return listFiles('performance/weekly', '.json')
    .map(f => ({ file: f, ...readJSON(f, {}) }))
    .sort((a, b) => (a.week || '').localeCompare(b.week || ''));
}

function loadAssets() {
  const idx = readJSON('assets/index.json', { schema: 1, updated: null, assets: [] });
  idx.assets = Array.isArray(idx.assets) ? idx.assets : [];
  return idx;
}

function loadTracker() {
  const t = readJSON('context/tracker.json', {});
  return {
    updated: t.updated || null,
    commercial: t.commercial || {},
    milestones: Array.isArray(t.milestones) ? t.milestones : [],
    delivered: Array.isArray(t.delivered) ? t.delivered : [],
    open_items: Array.isArray(t.open_items) ? t.open_items : [],
  };
}

function loadSeasonal() {
  if (!exists('research/seasonal.md')) return [];
  return parseTables(read('research/seasonal.md')).filter(r => ISO.test(r.date || '')).sort((a, b) => a.date.localeCompare(b.date));
}

function loadResearchFiles() {
  return listFiles('research', '.md')
    .filter(f => /\/\d{4}-\d{2}-\d{2}-/.test(f))
    .map(f => ({ file: f, date: path.basename(f).slice(0, 10), topic: path.basename(f).slice(11, -3).replace(/-/g, ' ') }))
    .sort((a, b) => b.date.localeCompare(a.date));
}

function competitorScanDates() {
  if (!exists('research/competitors.md')) return [];
  return [...read('research/competitors.md').matchAll(/^##\s+(\d{4}-\d{2}-\d{2})/gm)].map(m => m[1]).sort();
}

// Docs Faisal exports from the Cowork project (handover §13). The hub lists the missing ones.
const CONTEXT_IMPORTS = [
  { file: 'context/copy-rehaul.md', from: 'armenian-website-copy-rehaul.md', why: 'canonical voice sample; Part 1 seeds voice.md' },
  { file: 'context/shot-list.md', from: 'armenian-shot-list.md', why: 'what should exist after the shoot' },
  { file: 'context/google-profile-plan.md', from: 'google-profile-action-plan.md', why: 'the two-hour GBP plan' },
  { file: 'context/strategy.md', from: 'marketing-strategy-sept-dec-2026.md', why: '' },
  { file: 'context/roadmap.md', from: 'content-campaign-roadmap-summary.md', why: '' },
  { file: 'context/proposal.md', from: 'arman-website-marketing-proposal.md', why: 'what was sold' },
  { file: 'context/decisions.md', from: 'arman-status-13-sept.md', why: 'the open list, reconciled into tracker.json; log it under a heading ending "arman-status-13-sept imported"', marker: /^##\s.*arman-status-13-sept imported/m },
];
function contextImports() {
  return CONTEXT_IMPORTS.map(i => {
    let done = exists(i.file);
    if (done && i.marker) done = i.marker.test(read(i.file));
    return { ...i, done };
  });
}

module.exports = {
  ROOT, ISO, todayISO, addDays, daysBetween, fmtDate, exists, read, readJSON, listFiles,
  parseFrontmatter, parseTables, loadContent, loadCalendar, loadPerformance, loadAssets,
  loadTracker, loadSeasonal, loadResearchFiles, competitorScanDates, contextImports,
};

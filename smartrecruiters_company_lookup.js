#!/usr/bin/env node
/*
  Fetches SmartRecruiters company lookup results by sharding q over a..z and 0..9,
  then deduplicates by identifier.

  Usage:
    node smartrecruiters_company_lookup.js > companies.json
    node smartrecruiters_company_lookup.js --pretty
    node smartrecruiters_company_lookup.js --concurrency 4
    node smartrecruiters_company_lookup.js --out companies.json
*/

const https = require('https');
const { URL } = require('url');

const args = process.argv.slice(2);

function getArg(name, fallback) {
  const idx = args.indexOf(name);
  if (idx === -1) return fallback;
  const val = args[idx + 1];
  if (!val || val.startsWith('--')) return fallback;
  return val;
}

const pretty = args.includes('--pretty');
const out = getArg('--out', null);
const concurrency = Math.max(1, parseInt(getArg('--concurrency', '6'), 10) || 6);

const alphabet = Array.from('abcdefghijklmnopqrstuvwxyz');
const digits = Array.from('0123456789');
const shards = [...alphabet, ...digits];

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          if (res.statusCode && res.statusCode >= 400) {
            return reject(new Error(`HTTP ${res.statusCode}`));
          }
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(e);
          }
        });
      })
      .on('error', reject);
  });
}

async function worker(queue, seen, results) {
  while (queue.length) {
    const q = queue.shift();
    const url = new URL('https://jobs.smartrecruiters.com/sr-jobs/company-lookup');
    url.searchParams.set('q', q);
    const json = await fetchJSON(url.toString());
    const list = Array.isArray(json.results) ? json.results : [];
    for (const item of list) {
      const id = item && item.identifier;
      if (!id) continue;
      if (seen.has(id)) continue;
      seen.add(id);
      results.push(item);
    }
  }
}

async function main() {
  const queue = shards.slice();
  const seen = new Set();
  const results = [];

  const workers = Array.from({ length: Math.min(concurrency, queue.length) }, () =>
    worker(queue, seen, results)
  );

  await Promise.all(workers);

  // Stable sort by name then identifier for deterministic output
  results.sort((a, b) => {
    const an = (a.name || '').toLowerCase();
    const bn = (b.name || '').toLowerCase();
    if (an < bn) return -1;
    if (an > bn) return 1;
    const ai = (a.identifier || '').toLowerCase();
    const bi = (b.identifier || '').toLowerCase();
    if (ai < bi) return -1;
    if (ai > bi) return 1;
    return 0;
  });

  const output = JSON.stringify({ count: results.length, results }, null, pretty ? 2 : 0);

  if (out) {
    require('fs').writeFileSync(out, output + '\n');
  } else {
    process.stdout.write(output + '\n');
  }
}

main().catch((err) => {
  console.error('Error:', err.message || err);
  process.exit(1);
});

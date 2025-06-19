import fs from 'fs';

function getScore(file) {
  const json = JSON.parse(fs.readFileSync(file, 'utf8'));
  return Math.round(json.categories.performance.score * 100);
}

const files = fs.readdirSync('.lighthouseci').filter(f => f.endsWith('.lhr.json'));
if (files.length === 0) process.exit(1);
const scores = files.map(f => getScore(`.lighthouseci/${f}`));
const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);

const badge = {
  schemaVersion: 1,
  label: 'lighthouse',
  message: String(avg),
  color: avg >= 90 ? 'brightgreen' : avg >= 50 ? 'orange' : 'red'
};
fs.writeFileSync('docs/lighthouse-badge.json', JSON.stringify(badge, null, 2));

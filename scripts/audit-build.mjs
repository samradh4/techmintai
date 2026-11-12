import fs from 'node:fs';
import path from 'node:path';

const directory = 'dist';
if (!fs.existsSync(directory)) {
  console.error('Build dist/ before running the audit.');
  process.exit(1);
}
const paths = [];
const walk = (folder) => {
  for (const entry of fs.readdirSync(folder, {withFileTypes:true})) {
    const file = path.join(folder, entry.name);
    if (entry.isDirectory()) walk(file);
    else paths.push(file);
  }
};
walk(directory);
const pages = paths.filter(file => file.endsWith('.html'));
const errors = [];
const seenCanonical = new Set();
let maxPage = {file:'', bytes:0};
for (const file of pages) {
  const html = fs.readFileSync(file, 'utf8');
  const bytes = Buffer.byteLength(html, 'utf8');
  if (bytes > maxPage.bytes) maxPage = {file,bytes};
  if (bytes > 130_000) errors.push(`${file}: HTML is ${Math.round(bytes/1024)} KB (130 KB limit)`);
  if (!/<html[^>]*lang="en"/.test(html)) errors.push(`${file}: missing lang=en`);
  const countH1 = (html.match(/<h1(?:\s|>)/g)||[]).length;
  if (countH1 !== 1) errors.push(`${file}: expected 1 h1, found ${countH1}`);
  if (!/<title>[^<]+<\/title>/.test(html)) errors.push(`${file}: missing title`);
  if (!/<meta name="description" content="[^"]+"/.test(html)) errors.push(`${file}: missing description`);
  if (!/property="og:image"/.test(html)) errors.push(`${file}: missing social image`);
  if (!/application\/ld\+json/.test(html)) errors.push(`${file}: missing structured data`);
  if (!/name="robots" content="noindex/.test(html)) {
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/);
    if (!canonical) errors.push(`${file}: missing canonical`);
    else if (seenCanonical.has(canonical[1])) errors.push(`${file}: duplicate canonical ${canonical[1]}`);
    else if (!canonical[1].startsWith('https://techmintai.com/')) errors.push(`${file}: incorrect canonical host`);
    else seenCanonical.add(canonical[1]);
  }
}
const assets = paths.filter(file => /\.(css|js)$/.test(file));
const largestCss = assets.filter(file=>file.endsWith('.css')).sort((a,b)=>fs.statSync(b).size-fs.statSync(a).size)[0];
const largestJs = assets.filter(file=>file.endsWith('.js')).sort((a,b)=>fs.statSync(b).size-fs.statSync(a).size)[0];
if (largestCss && fs.statSync(largestCss).size > 90_000) errors.push(`${largestCss}: CSS exceeds 90 KB budget`);
if (largestJs && fs.statSync(largestJs).size > 75_000) errors.push(`${largestJs}: JS exceeds 75 KB budget`);
for (const required of ['robots.txt','sitemap-index.xml','rss.xml','guides/index.html','tools/index.html','articles/compound-interest-explained/index.html']) {
  if (!fs.existsSync(path.join(directory,required))) errors.push(`${required}: missing required output`);
}
if (pages.length < 22) errors.push(`Only ${pages.length} pages built; expected at least 22`);
if (errors.length) {
  console.error('Audit failed:\n'+errors.join('\n'));
  process.exit(1);
}
console.log(`Audit passed: ${pages.length} HTML pages; max page ${(maxPage.bytes/1024).toFixed(1)} KB (${maxPage.file})`);
if(largestCss)console.log(`Largest stylesheet: ${(fs.statSync(largestCss).size/1024).toFixed(1)} KB`);
if(largestJs)console.log(`Largest JavaScript file: ${(fs.statSync(largestJs).size/1024).toFixed(1)} KB`);

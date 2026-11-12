import fs from 'node:fs';
import path from 'node:path';

// This runs after "astro build". It enforces project security invariants;
// it is NOT a substitute for security testing of a deployed website.
const errors = [];
const read = (file) => fs.readFileSync(file, 'utf8');
const vercel = JSON.parse(read('vercel.json'));
const main = vercel.headers?.find((rule) => rule.source === '/(.*)');
const headers = Object.fromEntries((main?.headers ?? []).map((h) => [h.key.toLowerCase(), h.value]));
const netlify = read('netlify.toml');
const required = {
  'x-content-type-options': 'nosniff',
  'x-frame-options': 'DENY',
  'referrer-policy': 'strict-origin-when-cross-origin',
  'cross-origin-opener-policy': 'same-origin',
  'x-permitted-cross-domain-policies': 'none',
};
for (const [key, value] of Object.entries(required)) {
  if (headers[key] !== value) errors.push('Vercel header missing or changed: ' + key);
  if (!netlify.includes(value)) errors.push('Netlify missing required policy: ' + key);
}
const hsts = headers['strict-transport-security'] ?? '';
if (!/^max-age=\d+/.test(hsts) || Number(hsts.match(/\d+/)?.[0]) < 31536000) {
  errors.push('HSTS must have at least a one-year lifetime');
}
if (!netlify.includes('Strict-Transport-Security = "' + hsts + '"')) errors.push('HSTS mismatch between hosts');
const csp = headers['content-security-policy'] ?? '';
const netlifyCsp = netlify.match(/^\s*Content-Security-Policy = "([^"\n]+)"/m)?.[1];
if (csp !== netlifyCsp) errors.push('Vercel and Netlify CSP must be identical');
for (const rule of ["default-src 'self'", "object-src 'none'", "base-uri 'self'", "frame-ancestors 'none'", "script-src-attr 'none'", "upgrade-insecure-requests"]) {
  if (!csp.includes(rule)) errors.push('CSP missing: ' + rule);
}
if (csp.includes("'unsafe-inline'") || csp.includes("'unsafe-eval'")) errors.push('CSP contains unsafe inline/eval allowance');
const walk = (dir) => fs.existsSync(dir) ? fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
  const filename = path.join(dir, e.name);
  return e.isDirectory() ? walk(filename) : [filename];
}) : [];
const published = walk('dist');
for (const filename of published) {
  const basename = path.basename(filename);
  if (/^(?:\.env(?:\..*)?|\.git|credentials\.json|package(?:-lock)?\.json)$/i.test(basename) || /\.(?:pem|key|p12|pfx|map)$/i.test(basename)) {
    errors.push('Private or debug file must not be published: ' + filename);
  }
}
const pages = published.filter((name) => name.endsWith('.html'));
for (const filename of pages) {
  const html = read(filename);
  if (/\s+on(?:click|load|error|mouseover|focus|submit)\s*=/i.test(html)) errors.push('Inline HTML event handler: ' + filename);
  if (/javascript\s*:/i.test(html)) errors.push('javascript: URL in generated HTML: ' + filename);
  for (const script of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)) {
    const attrs = script[1] || '';
    if (/\btype\s*=\s*["']application\/(?:ld\+json|json)["']/i.test(attrs)) continue;
    if (!/\bsrc\s*=/.test(attrs) && script[2].trim()) errors.push('Executable inline script blocked by CSP: ' + filename);
  }
}
if (pages.length < 20) errors.push('Expected a built publication in dist/');
if (!fs.existsSync('dist/.well-known/security.txt')) errors.push('Missing public security contact policy');
const ignore = read('.gitignore');
for (const item of ['.env', '*.pem', '*.key', '*.p12', '*.pfx']) {
  if (!ignore.includes(item)) errors.push('.gitignore missing protection: ' + item);
}
for (const filename of [...walk('src'), ...walk('public')].filter(x => /\.(?:astro|js|mjs|ts|html|json|css|txt)$/.test(x))) {
  const source = read(filename);
  if (/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/.test(source) || /(?:gh[pousr]_[A-Za-z0-9]{35,}|AKIA[A-Z0-9]{16})/.test(source)) {
    errors.push('Potential credential or private key in source: ' + filename);
  }
}
if (errors.length) {
  console.error('Security audit failed:\n' + errors.join('\n'));
  process.exit(1);
}
console.log('Security audit passed: host header parity, strict CSP, ' + pages.length + ' HTML pages, no unsafe inline script/handlers or exposed sensitive files.');

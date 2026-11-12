# Deployment security checklist

These controls protect a **static** Astro content website. They do not add a firewall, guarantee safety or replace live-host inspection.

## Before launch

1. Protect GitHub, Vercel/Netlify, the domain registrar and domain email with MFA/passkeys; remove unused collaborators, revoke old API keys and enable security notifications.
2. Enable GitHub secret scanning and private vulnerability reporting where available. Consider branch protection requiring CI and review before merging.
3. Connect the verified domain in **one** hosting provider; enforce HTTPS and one canonical hostname. Confirm TLS certificate validity, www/non-www redirect and no unexpected staging pages indexed by Google.
4. Make sure the chosen host honors `vercel.json` or `netlify.toml`; headers in the other file will not automatically apply to all providers. For a different CDN/host, copy equivalent header rules there.
5. Verify the live response using `curl -I https://techmintai.com/`, and confirm: Content-Security-Policy, Strict-Transport-Security, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy and Cross-Origin-Opener-Policy.
6. Verify `https://techmintai.com/.well-known/security.txt` resolves and that the contact route reaches a **working, monitored** address. Renew before November 13, 2027.
7. Confirm `https://techmintai.com/.env`, `/.git/config` and `/package-lock.json` cannot be retrieved; static hosting must publish **only** the `dist/` directory.
8. Confirm `npm ci && npm run build && npm run check:security && npm run check:links && npm run check:quality` passes.
9. Use a host-managed WAF/bot mitigation and rate limits if you later introduce forms, comments, authentication, API endpoints or a CMS. None are included now.

## Analytics, ads and affiliate integrations

Currently the CSP permits selected Google Analytics/AdSense hostnames for eventual configuration. Ads are disabled unless explicitly configured. Any new tag can introduce cookies, remote code, cross-origin requests or new CSP needs; review its exact domains and local privacy requirements before activation. Don't weaken CSP globally with `'unsafe-inline'`, `'unsafe-eval'`, or `script-src https:` to make an integration work. Some monetization integrations may require a reviewed nonce-based policy, provider-specific allowlist or certified CMP.

Avoid `Cross-Origin-Embedder-Policy: require-corp` until you test third-party ads and embeds, because it can break them. HSTS intentionally omits `includeSubDomains`/preload until all subdomains have verified HTTPS.

## Security maintenance

Weekly GitHub Actions dependency audit fails on high/critical **production** dependency advisories; Dependabot proposes updates. That audit can't detect every malicious package or every application vulnerability. Inspect code changes, lockfile diffs, GitHub advisories, and failed jobs; use human review before deployment. If a dependency audit fails, identify and fix the affected package rather than suppressing the failure.

The static site does not handle banking credentials, card details or personal financial records. Do not add server-side processing without a separate security review.

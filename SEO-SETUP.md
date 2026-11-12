# TechMintAI — launch checklist

## Build and deploy
1. `npm ci` after generating and committing `package-lock.json` using the actual Node/npm version used for deploy (or `npm install` if no lock yet).
2. `npm run build`; `npm run check:links`.
3. Deploy as a **static Astro site** with output directory `dist` to Vercel or Netlify; HTTPS enabled.
4. Point the `techmintai.com` DNS at the selected hosting provider and redirect `www` to one canonical host. The site assumes `https://techmintai.com/`.
5. Verify security headers on the actual live response: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, HSTS, CSP. Avoid HSTS includeSubDomains until every subdomain is HTTPS.

## Search engine setup
- Check `https://techmintai.com/robots.txt`, `/sitemap-index.xml`, and `/rss.xml` after deploy.
- Verify the domain with **Google Search Console** using DNS TXT or provided verification file, submit `https://techmintai.com/sitemap-index.xml`.
- Verify the property in **Bing Webmaster Tools** and submit the sitemap there too.
- Inspect homepage, category, tools and article URLs for indexing; re-crawl after publication.
- Check mobile viewport, canonical URL, metadata, JSON-LD, Core Web Vitals, 404 behavior and actual redirect headers.
- Replace the sample launch articles with **human-reviewed, original, authoritative** content and real product evidence when writing reviews. Verify every claim, link and date. Do not publish fake reviews, inflated “best” lists or auto-generated news.
- Review sitemap inclusion: search is noindex, 404 is excluded.

## Accounts / revenue
1. Create a **working** `hello@techmintai.com` email alias and test delivery, or set `PUBLIC_CONTACT_EMAIL` to another public mailbox.
2. Complete privacy/terms and editorial review based on the real publisher identity, legal jurisdiction and providers. Templates are not legal advice.
3. Create verified GA4 property. Set `PUBLIC_GA4_ID=G-...`. Analytics remains off until the visitor opts in via the site banner. Review consent requirements for all markets.
4. Publish enough truly valuable original content and establish real navigation and contact before applying for Google AdSense. Approval is **not guaranteed**.
5. Once approved, set `PUBLIC_ADSENSE_CLIENT_ID=ca-pub-...`. A valid `/ads.txt` line will be generated automatically at build time (rebuild to update). No fake publisher ID has been added.
6. **Do not set** `PUBLIC_ADS_CONSENT_CONFIGURED=true` until required consent setup is complete, including Google-certified CMP for AdSense in EEA/UK/Switzerland where relevant, privacy policy updated, and ad behavior verified. Ads are disabled by default.
7. Start affiliate monetization with directly useful tools or services readers need. Add only verified referral URLs and clear adjacent disclosures; no fake testimonials, pricing, rankings or performance claims.
8. Add disclosed sponsorships only if they fit audience and do not compromise editorial integrity.

## Security and reliability
- No database, login, data collection form or serverless function is used; calculators and search run entirely client-side.
- Keep dependencies updated, pin with lockfile, enable GitHub dependency alerts / secret scanning if available, and review changes before deployment.
- The sample CSP allows known analytics/ad sources, though ad vendors can introduce more hosts; test and adjust CSP with the browser console if enabling ads. Avoid broad wildcards where possible.
- Do not commit credentials or private keys. `.env` is ignored. Anything named `PUBLIC_*` becomes visible to browsers and is **never a secret**.
- Monitor uptime, Search Console errors, ad policy notices, analytics consent and traffic quality; avoid bot traffic or artificial clicks.

# TechMintAI — finance and technology journal

Production-oriented **static Astro** publication, redesigned as a restrained finance editorial website rather than an app-style landing page.

## What's included

- Original publication masthead, editorial hierarchy, responsive content archives and text-forward article cards
- 11 evergreen starter guides covering finance, investing, fintech, security, AI and software
- 4 browser-only financial calculators with formulas, assumptions and limitations
- Human-readable `/guides/` archive, 6 category pages, on-page article contents and accessible private search
- Indexable article and tool pages, semantic headings, per-page titles/descriptions/canonicals, Open Graph, Twitter cards, JSON-LD Organization/WebSite/WebPage/Article/BreadcrumbList/WebApplication, RSS and sitemap
- Trust pages: About, Contact, Editorial Policy, Privacy, Terms, Affiliate Disclosure, Financial Disclaimer
- No remote fonts, no client-side React, no third-party tracking unless explicitly activated
- Security headers for Vercel/Netlify, immutable cache for fingerprinted Astro bundles, GitHub Actions build/link/SEO/page-weight audits and Dependabot updates

## Technology and performance

- Astro 5 static output; no runtime server/database/credentials; scripts load only on calculator/search pages or when optional analytics is configured.
- Paper-white background, system sans and native serif headlines. A static SVG educational chart replaces generic hero images and gradients.
- `npm run check:quality` audits page SEO, required outputs, build size and JavaScript budgets after building.
- No AdSense, affiliate account, Google Analytics property, domain DNS setting, or verified contact mailbox is included by default.

## Local commands

```bash
npm install
npm run dev
npm run build
npm run check:links
npm run check:quality
npm run preview
```

Node 22 is recommended. After generating a reviewed `package-lock.json`, use `npm ci` for reproducible installs. Never commit secret credentials or API tokens, and do not place secrets in `PUBLIC_*` variables.

## Domain & hosting

This source is configured for `https://techmintai.com/`. If you bought a different domain, change `src/config.ts`, `astro.config.mjs`, `public/robots.txt`, `scripts/audit-build.mjs` and the sitemap references before deployment. Use one canonical host, configure HTTPS and redirect the other host. Connect GitHub to Vercel or Netlify (build `npm run build`, output `dist`). DNS and the live deployment are **not** changed by these source edits.

## Revenue activation (later)

1. Activate and test a real contact email, then set `PUBLIC_CONTACT_EMAIL`.
2. Review the factual accuracy, links, dates, publisher details and original examples before promoting the articles. Finance is a sensitive topic; website code alone does not establish expertise or accuracy.
3. Connect and verify Google Search Console and Bing Webmaster Tools; submit the generated sitemap.
4. If desired, connect GA4 with `PUBLIC_GA4_ID=G-...`. GA4 starts only after analytics consent.
5. Apply for Google AdSense **after** sufficient original content, clear navigation, working contact and verified policy pages. Approval is not guaranteed.
6. Once approved and compliant, set `PUBLIC_ADSENSE_CLIENT_ID=ca-pub-...`. Set `PUBLIC_ADS_CONSENT_CONFIGURED=true` only **after** implementing and verifying a suitable consent solution for served regions, including a certified CMP where required by Google's publisher policies. A valid `/ads.txt` is generated on rebuild. Ad loading remains disabled by default.
7. Add only real, clearly disclosed affiliate relationships and original product evaluations. No fake prices, reviews, rankings, or performance guarantees.

Read [SEO-SETUP.md](SEO-SETUP.md) for the hands-on launch checklist.

## Security files and checks

See [SECURITY.md](SECURITY.md) to report a vulnerability privately and [docs/SECURITY-DEPLOYMENT.md](docs/SECURITY-DEPLOYMENT.md) for the live-host checklist. Vercel/Netlify headers are configured in their respective files. The built site includes `/.well-known/security.txt` and CI runs `npm run check:security`. GitHub Actions also runs weekly production dependency audits; the repo does **not** claim to be invulnerable.

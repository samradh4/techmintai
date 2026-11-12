# TechMintAI

An independent English-language publication covering finance, AI, fintech and technology, built as a lightweight static Astro 5 website.

## Features
- Responsive editorial site preserving TechMintAI branding
- 8 sample evergreen guides and 6 category archives
- 4 on-device financial calculators and private in-browser search
- SEO metadata, canonical URLs, Article/WebPage/WebApplication JSON-LD, RSS and sitemap
- About, Contact, Editorial Policy, Privacy, Affiliate Disclosure, Financial Disclaimer and Terms
- Hosting security headers for Vercel or Netlify, conditional analytics opt-in, AdSense opt-in gate
- GitHub Actions build/link audit and Dependabot update alerts

## Run locally
```bash
npm install
npm run dev
npm run build
npm run check:links
npm run preview
```

Node 20.11+ required; Node 22 recommended.

## Deploy
- Connect this GitHub repository to Vercel or Netlify.
- Framework: Astro; build command: `npm run build`; output directory: `dist`.
- Point `techmintai.com` DNS to the host. Ensure https://www.techmintai.com redirects to https://techmintai.com (or the other way around consistently, updating `astro.config.mjs` and `src/config.ts` when changing canonical host).
- See [`SEO-SETUP.md`](SEO-SETUP.md) for the launch checklist.

## Monetization is off by default
- `PUBLIC_GA4_ID` (optional): Google Analytics measurement ID; banner asks permission before loading analytics.
- `PUBLIC_ADSENSE_CLIENT_ID`: real `ca-pub-` publisher ID after AdSense acceptance; generates an ads.txt line at build time.
- `PUBLIC_ADS_CONSENT_CONFIGURED=true`: only after compliant consent handling is configured, including an appropriate CMP where required.
- `PUBLIC_CONTACT_EMAIL`: set only to a **working** public mailbox; ensure mail delivery is tested.

Do not add secrets to `PUBLIC_*` variables. AdSense approval, revenue, keyword rankings and legal compliance are **not guaranteed** by this repository alone.

## Editorial quality
The sample articles are educational starting material, **not a substitute for publisher review and original research**. Check references, claims and published dates before promotion. For finance and security topics, use authoritative sources and distinguish guidance from individualized professional advice. Add contextual internal links and genuinely useful original examples rather than mass-producing short AI articles.
# TechMintAI — Launch, SEO, performance & monetization checklist

## 1. Publish the actual domain

- Confirm that your purchased domain **is** `techmintai.com`. If different, update canonical site settings everywhere listed in README.
- Connect the GitHub repository to Vercel or Netlify: Astro preset, `npm run build`, output `dist`.
- Point domain DNS to that host and choose **one** canonical version: `https://techmintai.com/` (current setting). Add a 301/308 redirect from `www` if it exists.
- Confirm the domain has a valid HTTPS certificate and a real 404 status for missing pages.
- Check live response headers: `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, HSTS and immutable caching for `/_astro/` assets. Hosting providers and custom proxies may handle headers differently.
- Activate and test the email address in the Contact and Privacy pages. Set `PUBLIC_CONTACT_EMAIL` to a mailbox that can receive replies.

## 2. Technical search indexing

- Open `/robots.txt`, `/sitemap-index.xml`, `/rss.xml` on the live domain.
- Verify your DNS domain property in Google Search Console. Submit `https://techmintai.com/sitemap-index.xml` (Astro sitemap index). Inspect the homepage, `/guides/`, representative categories, tools and articles.
- Set up Bing Webmaster Tools and submit the same sitemap.
- Confirm canonical addresses, only one main heading per page, unique descriptive titles, relevant internal links, mobile viewport, clean 404 behavior and visible authorship/policy information.
- Search results are intentionally `noindex`; do not link your canonical site to parameterized search results.
- The JSON-LD describes visible content: Organization, WebSite, WebPage, Article, BreadcrumbList and calculators as WebApplication. Structured data **does not guarantee** rich results.
- Avoid fake updates, keyword stuffing, unsupported claims, doorway pages, low-value mass AI content, fake product tests and copied articles.

## 3. Content standards — especially finance

- This is a finance-adjacent publication (money decisions can affect readers). Manually review numerical examples, source links, dates, claims and risk disclosures before a public launch.
- Show real publisher identity, correction contact and editorial process. Do not claim external expert review or a regulated license unless true.
- Publish original analyses, spreadsheets, experiments and genuinely helpful worked examples for specific reader questions.
- Useful topical clusters: budgeting and emergency funds; APY, APR and compounding; fund costs and asset allocation; fraud and account security. Link relevant guides and calculators to one another.
- Review Google Search Console's actual search queries after indexing and update articles when source information changes materially. Do not change dates just to appear fresh.

## 4. Page speed and usability

- Run PageSpeed Insights on the *deployed* mobile homepage, article page and calculator page; watch LCP, INP and CLS.
- No web fonts, decorative hero images, React runtime or remote trackers are shipped by default. Local logo is about 5 KB, and OG social image is not rendered on the page.
- Astro bundles are cacheable by immutable fingerprint. `npm run check:quality` checks page size, largest JS/CSS, canonical/metadata presence and unique headings after `npm run build`.
- Avoid adding popup ad scripts, autoplay video, heavy third-party widgets or unused analytics tags. Keep ads and affiliate placements unobtrusive and stable in layout.
- Test keyboard navigation, mobile overflow, calculator validation, screen-reader labeling, and high contrast. Browser visual/interaction verification is still needed after deployment.

## 5. Monetization — only after site readiness

- A working privacy/contact process, genuinely useful original content, actual HTTPS site and easy navigation should precede the AdSense application. AdSense makes an independent approval decision.
- If approved, set the **real** `PUBLIC_ADSENSE_CLIENT_ID=ca-pub-...`. Build will generate `/ads.txt` with the publisher number, excluding the `ca-` prefix. Never invent an AdSense ID.
- Ad script remains disabled unless `PUBLIC_ADS_CONSENT_CONFIGURED=true`; **this flag itself is not consent handling**. Set it only after configuring an appropriate consent management platform and confirming current regional requirements (including Google's publisher/CMP rules for applicable EEA/UK/Swiss traffic). Revisit the Privacy page.
- For affiliates, register directly with programs relevant to genuine reader needs. Place clear disclosures near actual affiliate links and verify terms before recommending products.
- Do not click your own ads, purchase fake traffic or run incentive schemes.

## 6. Security and maintenance

- Keep the Astro app static: no database, login, upload form or client-side API key is necessary for this content site.
- Pin a checked-in package lock after generating it in a trusted environment, and review automated dependency upgrades. Dependabot is configured. Enable secret scanning/alerts where available.
- Never store access tokens in GitHub or website source; `.env` and `.env.*` are ignored, except the example file.
- Test and monitor live server response headers and browser CSP console when adding analytics, CMP or ads. Don't relax CSP broadly unless technically required.
- Back up domain registrar login with MFA, use least-privilege GitHub/hosting access, and secure the custom-domain DNS account.
- Monitor domain renewal, uptime, Google indexing, traffic quality, security advisories and ad-policy notices.

**None of these source files verify your registrar, DNS, live site, Google accounts, ad approval, or future income.**

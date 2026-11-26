# TechMintAI monetization launch checklist

Last reviewed: 2026-11-26

## Current technical baseline

- Astro static website on techmintai.com, connected to GitHub and Vercel.
- 14 published guides and 5 browser-based calculators, including the Investment Fee Impact Calculator.
- Search Console indexing and GA4 were set up. The last *user-provided* Search Console figures were 29 indexed URLs, 54 impressions and 0 organic clicks (not current live statistics).
- Author, editorial standards, contact, privacy, financial disclaimer and affiliate disclosure pages exist.
- The AdSense loader is disabled by default; it depends on a real `PUBLIC_ADSENSE_CLIENT_ID` and `PUBLIC_ADS_CONSENT_CONFIGURED=true`. Do not enable either without completing the relevant setup.
- The existing GA4 implementation loads analytics only after the visitor opts in. Check it again if adding or changing scripts.

## Launch gates — do not skip

1. **Commercial-use hosting:** Vercel Hobby use requires review for a revenue-generating site. Confirm a compliant commercial hosting arrangement or test an alternative host in parallel. Do not change DNS or remove the existing deployment until the new host passes build, URLs, canonical, redirect, TLS, sitemap, robots and tracking checks.
2. **Editorial verification:** Independently open each cited external reference, verify numerical examples and product claims, and review the finance/crypto content for jurisdiction-dependent accuracy. Correct any unverified claims. Do not assert that a page has been expert reviewed when it has not.
3. **Privacy and consent:** Review local visitor privacy requirements and Google's current certified-CMP guidance for EEA/UK/Swiss visitors before enabling ads. The existing GA4 consent banner is not automatically an ad-consent CMP.
4. **AdSense account:** The publisher must create or sign into AdSense, provide accurate legal/identity and payment details, connect the correct domain, and submit the site for review. Only then configure a genuine ca-pub ID and verify `/ads.txt` plus ad integration as instructed by Google. AdSense approval and earnings are not guaranteed. Do not invent publisher IDs.
5. **Affiliate partnerships:** Apply to relevant programs directly, confirm regional eligibility, terms and payouts. Only place a tracking link after approval. Disclose affiliate relationships close to the link; mark paid links `rel="sponsored"`. Avoid unsupported product rankings or fake hands-on testing.
6. **Search growth:** Review Search Console queries, landing pages and country reports weekly. Improve useful existing pages and tools based on evidence; build original answers around questions users actually search. Check that all new pages appear in the sitemap and are eligible for indexing.

## What not to do

- No click-triggered pop-under/pop-up ad networks on content navigation.
- No paid or artificial traffic, ad-click incentives, scraped articles or low-quality mass publishing.
- No ads before publisher approval, appropriate consent and hosting eligibility.
- No guarantee of search ranking, AdSense approval or a particular monthly income.

## Priority for next review

1. Verify the latest calculator page works and Vercel reports success.
2. Resolve hosting terms and AdSense account status.
3. Check fresh Search Console data (clicks, impressions, query and country breakdown).
4. Improve pages that have relevant impressions but low CTR/rank.

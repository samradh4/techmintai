# TechMintAI security policy

TechMintAI is a static Astro publication. The actively supported version is the latest commit on the `main` branch.

## Reporting a vulnerability privately

Please **do not** disclose exploitable details or credentials in public issues or pull requests. Use GitHub's private vulnerability reporting feature (if enabled for this repository) or reach the publisher using the [contact page](https://techmintai.com/contact/). The publisher must activate and regularly monitor the email mailbox shown on that page; **it has not been independently verified**. Never include passwords, banking credentials, payment card details, or personal financial documents.

Useful reports include an affected URL or file, reproducible steps, practical impact, and a suggested fix. We cannot promise a particular response time or bug bounty.

## Current protections

- Static-generated HTML: no public login, database, or server-side account API.
- CSP, HSTS, frame protection, referrer restrictions, disabled powerful browser permissions, and MIME-sniffing protection on supported hosting platforms.
- Security checks during the Astro build, production dependency vulnerability checks, version-pinned npm lockfile, and automated Dependabot update proposals.
- Client-side finance calculators and search; user input is rendered with DOM text APIs rather than HTML injection.

## Operator responsibilities

- Enable multi-factor authentication for GitHub, the domain registrar, hosting, and email.
- Restrict repository, deployment and DNS permissions to trusted accounts.
- Maintain a working security contact mailbox, and renew `public/.well-known/security.txt` before expiry.
- Review Dependabot/security alerts and test dependency updates before merging.
- Keep tokens server-side in hosting secrets; **never place secrets in `PUBLIC_*` variables**.
- Only activate third-party ads, analytics or affiliate scripts after reviewing their CSP and privacy/consent requirements.
- Verify live headers and HTTPS independently after connecting the domain. These repository settings only apply when the matching host deploys them.

No website can be guaranteed free of vulnerabilities.

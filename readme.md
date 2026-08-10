# Kai Yue Foundation Website

A much more modern, visually aesthetic, engaging, and logically streamlined update for the Kai Yue Foundation website; the original site was hosted by the clunky and antiquated Homestead + Network Solutions platform. Coded by Andy Wu (with much assistance from claude code).

## Pages

- **Home** – Mission overview and welcome
- **Events** – Timeline of sponsored concerts and galas with embedded videos
- **Partnerships** – Organizational partners and collaborators
- **Gallery** – Interactive carousel of event photos with zoom and theater viewing (***NOTE: two version of every gallery image are stored in the repository folders; 400w and 800w for mobile and desktop view respectively. Ensures the least possible lag during carousel effect)
- **Contact** – Contact form and donation application
- !! Translation toggle alternates between English and Simplified Chinese for all 5 pages; uses translation.js (instead of just brute force 2 html files for each page) implementation to switch text in place without reloading for all pages EXCEPT gallery. Additionally, this also means all domain extensions (ie: /events) are in english regardless of site language.

## Project Structure

```
Kai-Yue-Foundation/
├── home.html                # Home page (formerly index.html)
├── events.html              # Events timeline
├── gallery.html             # Interactive gallery
├── partnerships.html        # Partnerships page
├── contact.html             # Contact & donation form
├── style.css                # Global styles
├── script.js                # JavaScript functionality
├── translations.js          # EN / Simplified Chinese text dictionary
├── api/
│   └── contact.js             # Serverless function - sends contact form emails via Resend
├── package.json             # Dependencies (resend)
├── vercel.json              # Clean URLs + redirects (e.g. /events instead of events.html)
├── .gitignore               # Git configuration
├── readme.md                # This file
└── images/
    ├── hero.jpg
    ├── footer-logo.jpeg
    ├── Events Page/
    ├── Gallery Page/
    ├── Partnerships Page/
    └── Contact Us/
```

## Features

- Smooth page transitions with animated logo loader
- Bilingual (English / 中文) with a persistent language toggle
- Interactive gallery: scroll-linked zoom on desktop, timed auto-play on mobile, plus swipe-able theater view and full-photo carousel
- Responsive design that works on all devices
- Embedded YouTube videos and PDF forms
- Contact form with PDF upload, sent via Resend

## Deployment

- Hosted & Deployed by Vercel (redeployed whenever pushing changes to this git repo). 
- Canonical Domain: [www.kaiyuefoundation.org]
- Apex Domain: [kaiyuefoundation.org] (redirects to the canonical domain above)
- Redirecting Domains: [kyfoundation.org], [www.kyfoundation.org] (also redirects to the canonical domain above)
- Legacy/Archive Domain: [www.oldkyfoundation.org] OR [oldkyfoundation.org] (preserves final state of homestead hosted site for posterity)

DOMAIN REGISTRAR INFO: 
Managed through Homestead + Network Solutions
- kaiyuefoundation.org — backend registrar: Tucows Domains Inc. 
- kyfoundation.org — backend registrar: eNom, LLC
- oldkyfoundation.org — backend registrar: Tucows Domains Inc. 
Account contact: Zheng Huang (huang@kyfoundation.org)

**Known issue (Aug 2026): kaiyuefoundation.org was in `clientHold` status, which fully blocked DNS propagation and resolution. Root cause was a&mdash;now no longer accessible&mdash;original registrant contact email (Susan.kane-dowling@vivace-investment.com) failing to verify domain, not billing or a DNS misconfiguration. For future reference, check status on Whois.com

## Technologies

- HTML5, CSS3, Vanilla JavaScript
- Google Fonts (Montserrat, Source Code Pro, Junicode, Urbanist, Noto Sans SC)
- Static frontend – no build step or frontend dependencies; one Vercel serverless function (`api/contact.js`) handles the contact form, using the `resend` npm package
- !! RELEVANT SERVICES: GitHub, Vercel, RESEND, Homestead + Network Solutions

## Contact Form

Submissions are handled by a custom Vercel serverless function (`api/contact.js`) that parses the form (including the optional PDF) entirely in memory, then sends it via [Resend](https://resend.com)'s API — nothing is ever written to disk or a database so there are no storage limits to hit. I chose not to use a third-party form service like Web3Forms or FormBold for least future maintenance (and to avoid paying for higher tier subscriptions for pdf attachment functionality). Uses Resend only for the actual email delivery.

**OLD IMPLEMENTATION: emailed via Gmail SMTP to `huang@kyfoundation.org` from 'huang@kyfoundation.org', presented security risk for business email account (if someone were to obtain app password, they could arbitrarily send mail from the foundation email address).

**Limits:** 
- PDFs are capped at 4MB client-side, since Vercel hard-limits function request bodies to 4.5MB on every plan. Resend technically allows for up to 40mb attachments if using a traditional always-on server, but no reasonable pdf would approach that size and a serverless function is far lower maintenance long term with no need for storage. 
- Resend's free tier caps sending at 100 emails/day and 3,000/month — likely more than enough for lifespan of the foundation. As an aside, Resend also keeps a copy of sent emails (attachments included) for 30 days before auto-purging them — no action needed, just worth knowing where that data briefly lives in case of privacy concerns. 

**Setup:** 3 main components that fit together:
- VERCEL ENVIRONMENT VARIABLES (`CONTACT_FROM_EMAIL` [contact@kaiyuefoundation.org], `CONTACT_TO_EMAIL` [huang@kyfoundation.org], and `RESEND_API_KEY`) — control *who it's from*, *where it goes*, and *how it authenticates* with Resend. Edit these to change the sender's display name/address, redirect submissions to a different inbox, or rotate the API key. Set in Vercel Env Variables. Redeploy when making changes. 
- api/contact.js — controls the *shape* of the message itself: parsing the submitted form, the honeypot spam check, handling the optional PDF attachment, and formatting the subject line (currently `[Topic] - Name`) and body text. Change this file for different wording or to add/remove a form field.
- Resend's dashboard / DNS records on Homestead — controls domain authentication (DKIM/SPF/MX) and deliverability. Lives entirely outside this repo, in Resend's UI and Homestead's DNS panel.

**Additional notes on contact form specs**: 
- `kaiyuefoundation.org` is the site's canonical domain and the one verified in Resend for sending. It doesn't have a real, actively-monitored inbox behind it — its old Homestead-era mail servers still exist in DNS but aren't in day-to-day use.
- `kyfoundation.org` is where the foundation's actual email lives, via Google Workspace — that's the domain someone actually checks.
- The "From" address is essentially just a sending identity, not a real mailbox. Replies are handled separately anyway: the code sets `replyTo` to whatever email the visitor typed into the form, not the From address, so hitting "reply" on a notification goes straight back to the person who submitted it — regardless of which domain the notification itself was sent from.
- `CONTACT_FROM_EMAIL` is currently contact@kaiyuefoundation.org. Use `onboarding@resend.dev` if testing is needed before a domain is verified in Resend.

## Viewing Mediums

- Desktop/Laptop/Wide Monitor - What site was designed for, most natural and intuitive UI/UX; images and content scale + center based on viewport width.
- Mobile - Mobile view optimized to the best of my ability; nav bar contained in hamburger menu, events page changes to alternating background colors, gallery page shows 3 columns of photos instead of 4 on carousel view, gallery zoom animation based on elapsed time instead of scroll&mdash;the default for desktop view
- Ipad - Mixed: layout breakpoints (nav, carousel columns, events colors) are width-based, so a wide/landscape iPad gets the desktop version of those while a vertical ipad&mdash;depending on width&mdash;may get mobile view. However, touch-detection features (gallery zoom timing, horizontal scroll lock) are determined based off touch/no-hover rather than width, so iPads always get the mobile (elapsed-time) gallery zoom regardless of screen size.

## Notes

**For Local Testing: The deployed site uses clean URLs (/events, not events.html) which looks nicer in browser — Vercel's `cleanUrls` setting in `vercel.json` automatically redirects any `.html`-suffixed request to its clean equivalent. However, it is tedious to push changes and redeploy every time for testing small changes, so opening the HTML files directly on your web browser (assuming you have cloned the repo locally) allows instant viewing of code edits; navigation should work normally as well, although embedded videos may be blocked by default browser settings. 

## FUTURE IMPROVEMENTS

- Switch to newer and better-maintained domain registrar (like NameCheap or PorkBun): Currently the domain registrar is still through the soon-to-be obsolete Homestead platform; this has caused issues (like setting up DKIM (TXT) and DMARC (TXT) DNS records in resend to verify emails and prevent them from landing in spam) because Homestead doesn't allow underscores in DNS names&mdash;seems to be a known limitation of older DNS panels.

## ARCHIVE

- March - August 2026: [https://www.oldkyfoundation.org] (also hosted by vercel)
- 2017-2025: [https://web.archive.org/web/20250125083112/http://www.kyfoundation.org/]
- 2015-2016: [https://web.archive.org/web/20161022135235/http://www.kyfoundation.org/]
- 2013-2014: [https://web.archive.org/web/20130928231641/http://www.kyfoundation.org/]

---

© Kai Yue Foundation. All rights reserved.

# Kai Yue Foundation Website

A much more modern, visually aesthetic, engaging, and logically streamlined update for the Kai Yue Foundation website; the original site was hosted by the clunky and antiquated Homestead + Network Solutions platform. Coded by Andy Wu (with much assistance from claude code).

## Pages

- **Home** – Mission overview and welcome
- **Events** – Timeline of sponsored concerts and galas with embedded videos
- **Partnerships** – Organizational partners and collaborators
- **Gallery** – Interactive carousel of event photos with zoom and theater viewing (***NOTE: two version of every gallery image are stored in the repository folders; 400w and 800w for mobile and desktop view respectively. Ensures the least possible lag during carousel effect)
- **Contact** – Contact form and donation application
- !! Translation toggle alternates between English and Simplified Chinese for all 5 pages; uses translation.js (instead of just brute force 2 html files for each page) implementation to switch languages without reloading for all pages EXCEPT gallery. Additionally, this also means all domain extensions (ie: /events) are in english regardless of site language.

## Project Structure

```
Kai-Yue-Foundation/
├── home.html               # Home page (formerly index.html)
├── events.html              # Events timeline
├── gallery.html              # Interactive gallery
├── partnerships.html          # Partnerships page
├── contact.html              # Contact & donation form
├── style.css                # Global styles
├── script.js                # JavaScript functionality
├── translations.js            # EN / Simplified Chinese text dictionary
├── api/
│   └── contact.js             # Serverless function - sends contact form emails via Resend
├── package.json              # Dependencies (resend)
├── vercel.json               # Clean URLs + redirects (e.g. /events instead of events.html)
├── .gitignore                # Git configuration
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

Hosted & Deployed by Vercel (redeployed whenever pushing changes to this git repo). 
Apex Domain: www.kaiyuefoundation.org
Pointed Domains: kaiyuefoundation.org, www.kyfoundation.org, kyfoundation.org
OLD SITE Domain: oldkyfoundation.org

DOMAIN REGISTRAR INFO: 
Managed through Homestead + Network Solutions
- kaiyuefoundation.org — backend registrar: Tucows Domains Inc. 
- kyfoundation.org — backend registrar: eNom, LLC
Account contact: Zheng Huang (huang@kyfoundation.org)

**Known issue (Aug 2026): kaiyuefoundation.org was in `clientHold` status, which fully blocked DNS propagation and resolution. Root cause was a —— now no longer accessible —— original registrant contact email (Susan.kane-dowling@vivace-investment.com), not billing or a DNS misconfiguration. For future reference, check status on Whois.com

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

**Setup:** requires a Vercel project connected to this repo, with these environment variables set:
- `RESEND_API_KEY` – from the Resend dashboard
- `CONTACT_FROM_EMAIL` – the verified sending address (`onboarding@resend.dev` works for testing before a domain is verified in Resend)
- `CONTACT_TO_EMAIL` – where submissions get delivered (currently `huang@kyfoundation.org`)

## Viewing Mediums
Desktop - Site designed for desktop viewing, most natural and intuitive UI/UX
Mobile - Mobile view optimized to the best of my ability; nav bar contained in hamburger menu, events page changes to alternating background colors, gallery page shows 3 columns of photos instead of 4 on carousel view, gallery zoom animation based on elapsed time rather than scroll (for desktop)
Ipad - SHOULD keep desktop view/interface

## Notes

**For Local Testing: This site uses clean URLs (/events, not events.html), which only works on Vercel's live server. Opening the HTML files locally on pc won't allow navigation between pages, since the nav links and the .html-stripping both depend on a real server and root. To preview locally when testing, run a simple server (e.g. python3 -m http.server) and use .html in the address, or install the Vercel CLI and run vercel dev to match the live site exactly.


---

© Kai Yue Foundation. All rights reserved.

# Kai Yue Foundation Website

A much more modern, visually aesthetic, engaging, and logically streamlined update for the Kai Yue Foundation website; the original site was hosted by the clunky and antiquated Homestead + Network Solutions platform. 
Coded by Andy Wu (with much assistance from claude code).

## Pages

- **Home** – Mission overview and welcome
- **Events** – Timeline of sponsored concerts and galas with embedded videos
- **Partnerships** – Organizational partners and collaborators
- **Gallery** – Interactive carousel of event photos with zoom and theater viewing
- **Contact** – Contact form and donation application

## Project Structure

```
Kai-Yue-Foundation/
├── index.html              # Home page
├── events.html             # Events timeline
├── gallery.html            # Interactive gallery
├── partnerships.html       # Partnerships page
├── contact.html            # Contact & donation form
├── style.css               # Global styles
├── script.js               # JavaScript functionality
├── .gitignore              # Git configuration
├── readme.md               # This file
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
- Interactive scroll-linked gallery zoom
- Responsive design that works on all devices
- Embedded YouTube videos and PDF forms
- Contact form with PDF upload support

## Deployment

Ultimately to be deployed at following domain: kyfoundation.org

## Technologies

- HTML5, CSS3, Vanilla JavaScript
- Google Fonts (Montserrat, Source Code Pro, Junicode, Urbanist)
- Static site – no build tools or dependencies

## Contact Form

Submissions are sent via a custom Vercel serverless function (`api/contact.js`), not a third-party form service (like Web3Forms or FormBold) — no submission caps or storage limits to hit. The function parses the submission (including the optional PDF) entirely in memory, emails it via Gmail SMTP to `andywu1104@gmail.com`, then discards everything — nothing is ever written to disk or a database.

**Limits:** PDFs are capped at 4MB client-side, since Vercel hard-limits function request bodies to 4.5MB on every plan.

**Setup:** requires a Vercel project connected to this repo, with `GMAIL_USER` and `GMAIL_APP_PASSWORD` (a Gmail [app password](https://myaccount.google.com/apppasswords)) set as environment variables.

## Viewing Mediums
Desktop - Site designed for desktop viewing, most natural and intuitive UI/UX
Mobile - Mobile view optimized with nav bar contained in hamburger menu. Events page changes to alternating background colors, gallery page shows 3 columns of photos instead of 4 on carousel view.
Ipad - SHOULD keep desktop view/interface

N/A
---

© Kai Yue Foundation. All rights reserved.

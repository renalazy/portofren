# PRD — Renaldy Bilal Setyawan Portfolio Redesign

## 1. Purpose

Rebuild `renalazy.github.io/portofren` from scratch, repositioning it from a
"Backend Engineer (Go)" portfolio to a **Data Analyst** portfolio, ahead of an
active job search. The current live site is also missing its CSS and image
assets (empty folders in the repo), so this is a full rebuild, not a patch.

## 2. Goals

1. A recruiter scanning for 5 seconds sees "Data Analyst" immediately —
   title, tagline, meta tags, and hero all lead with analytics framing.
2. Every claim of analytics capability is backed by something checkable:
   a credential ID, a grade, a dated certificate, or a quantified, sourced
   result — not just adjectives.
3. The site is honest about being early-career in analytics: real projects
   are shown as real, in-progress bootcamp work is shown as clearly-labeled
   placeholders (not hidden, not faked).
4. Fully responsive, fast, accessible, and deployable as-is to GitHub Pages
   (no build step required).

## 3. Non-goals

- No backend/server, no database, no real contact-form submission handling
  (mailto-based only).
- No CMS — content is hand-authored in HTML per `docs/design.md`.
- No new photography/illustration generation — real assets (photo, CV,
  certificate links) are supplied by Renaldy per the checklist in
  `docs/design.md` §8; ship clean placeholders where a real asset is pending.

## 4. Audience

Primary: recruiters and hiring managers screening for Data Analyst / junior
Analytics roles, largely Indonesia-based and remote-first international
teams. Secondary: Renaldy himself, as a living reference during interviews.

## 5. Information architecture

Single-page site, anchor-linked nav: `Home · About · Skills · Credentials ·
Projects · Experience · Education · Contact`. (Note: "Credentials" is new
versus the old site's nav, replacing the previous "misc.log" accordion
pattern with a first-class section — see design.md §5.)

## 6. Functional requirements

| # | Requirement |
|---|---|
| F1 | Hero displays name, "Data Analyst" framing, tagline, location, contact links, and CV download CTA |
| F2 | Hero includes a KPI tile strip with 5 quantified, sourced results (see design.md §5) |
| F3 | About section includes bio copy (from design.md §6) and a facts panel |
| F4 | Skills section groups tags into Analytics & BI (primary), Engineering Foundation, and Tools, each with a proficiency bar |
| F5 | Verified Credentials section lists all 8 certificates/registrations with issuer, date, credential ID, skill tags, and an outbound verification link |
| F6 | Projects section shows the real Kickstarter DEEPP project first, followed by 4 clearly-labeled "queued" placeholder cards (SQL / dashboard / slide deck / spreadsheet), each with a status badge and hint text — never presented as if real |
| F7 | Experience section renders 2 primary roles (Adi Buana, Strugg House) as a vertical timeline with dates and bullets, plus 1 minor/archived role (Birunet internship) in a collapsed accordion |
| F8 | Education section lists RevoU (with grade) and STIKI Malang (with thesis title) |
| F9 | Contact section provides mailto link, maps link, GitHub/LinkedIn links, and a mailto-based form |
| F10 | All external links (`GitHub`, `LinkedIn`, credential links) open in a new tab with `rel="noopener"` |
| F11 | Nav highlights the active section on scroll and collapses to a toggle menu on mobile |
| F12 | Footer shows dynamic copyright year |

## 7. Non-functional requirements

- **Responsive**: correct, non-overlapping layout at 360px, 768px, 1024px,
  and 1440px+ widths. Breakpoints per design.md §7 (`720px`, `900px`).
- **Accessibility**: semantic landmarks (`header`, `nav`, `main`, `section`,
  `footer`), visible focus states, skip-to-content link, alt text on all
  images, sufficient color contrast (body text ≥ 4.5:1 against its
  background), `prefers-reduced-motion` respected.
- **Performance**: no build tooling or heavy JS frameworks; vanilla HTML/CSS/
  JS only; Google Fonts loaded with `preconnect`; total page weight (excluding
  the photo/CV, which are user-supplied) should stay light enough for a fast
  mobile load on a typical connection.
- **SEO/meta**: `<title>`, meta description, and meta keywords all lead with
  "Data Analyst"; Open Graph tags for link previews (title, description,
  image — image can be a placeholder until a real one exists).
- **Browser support**: current Chrome, Firefox, Safari, Edge (last 2 versions).
- **Hosting**: must work unmodified as a GitHub Pages static site (root
  `index.html`, relative asset paths).
- **No dead placeholders shipped silently**: anything not yet real (LinkedIn
  URL, CV file, credential verification links, photo) must be either a clear,
  visibly-labeled placeholder or omitted — never a broken link presented as
  live.

## 8. Tech stack

- Plain HTML5, CSS3 (custom properties, no framework), vanilla JS (no
  dependencies) — matches the existing repo's approach and GitHub Pages'
  zero-build hosting model.
- Fonts: Space Grotesk, Inter, IBM Plex Mono via Google Fonts.

## 9. File structure

```
/
├── index.html
├── docs/
│   ├── design.md
│   └── PRD.md
├── assets/
│   ├── css/style.css
│   ├── js/main.js
│   └── img/ (photo, favicon — currently empty, needs real files)
└── pdf/
    └── CV_ATS_RENALDY.pdf (needs a Data-Analyst-framed CV)
```

## 10. Content source of truth

All copy, data points, credential details, and color/type tokens are defined
in `docs/design.md`. Do not invent numbers, dates, or claims not present
there or in the original LinkedIn export — if something is missing (e.g. a
verification URL), ship a labeled placeholder rather than a guess.

## 11. Acceptance checklist

- [ ] Title/meta/hero all say Data Analyst, not Backend Engineer
- [ ] KPI strip renders 5 tiles with the exact figures from design.md
- [ ] Verified Credentials section lists all 8 items with correct IDs/dates
- [ ] Projects section clearly distinguishes 1 real project from 4 queued placeholders
- [ ] Experience timeline matches confirmed dates (Strugg House = Jan 2018–Present)
- [ ] Site-wide location reads Surabaya, East Java, Indonesia
- [ ] No "Open to work" badge anywhere
- [ ] Layout holds at 360px, 768px, 1024px, 1440px with no overlap or overflow
- [ ] Mobile nav opens/closes correctly and closes on link click
- [ ] All external links have `target="_blank" rel="noopener"`
- [ ] Site runs correctly opened directly as a static file (no build step)

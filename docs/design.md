# Design Spec — Renaldy Bilal Setyawan · Data Analyst Portfolio

## 1. Positioning

A one-page static portfolio for a backend engineer pivoting into data analytics.
The page's single job: convince a recruiter/hiring manager that the analytics
skill set is real and verifiable, not aspirational — using quantified impact
already produced as an engineer, plus checkable credentials (credential IDs,
grades, public certificate links).

- **Name:** Renaldy Bilal Setyawan
- **Target role framing:** Data Analyst
- **Base location:** Surabaya, East Java, Indonesia
- **Email:** renaldybys@gmail.com
- **GitHub:** https://github.com/renalazy
- **LinkedIn:** *(needs real profile URL from Renaldy — currently a placeholder `#` link on the old site)*
- **Portfolio URL:** https://renalazy.github.io/portofren/

## 2. Content reconciliation notes

- Site-wide location: **Surabaya, East Java, Indonesia** (per Renaldy's confirmation).
  Individual jobs keep their own city if different (e.g. Strugg House is remote,
  based out of Malang) — that's normal and doesn't need to match the site-wide badge.
- Strugg House tenure: **Jan 2018 – Present** (LinkedIn figure; supersedes the
  old site's "Nov 2019").
- No "Open to work" banner/badge on the site (declined).
- Photo: reuse the LinkedIn profile photo if Renaldy exports it, or supply a new
  one — the old repo's `assets/img/` folder is empty, so a real image file must
  be added. Until then, ship a clean initials/monogram fallback (see §5).
- CV PDF: the existing `pdf/CV_ATS_RENALDY_Backend.pdf` is backend-framed and
  should be swapped for a Data Analyst–framed CV before this ships. Keep the
  download button wired to `pdf/CV_ATS_RENALDY.pdf` (new filename) and flag it
  as a placeholder if the file isn't supplied yet.

## 3. Color tokens

Named, not templated — avoids the generic "cream + terracotta serif," "black +
neon," and "broadsheet hairline" defaults. Palette borrows directly from chart
software: a light "graph paper" surface, ink for text, one accent per data series.

| Token | Hex | Use |
|---|---|---|
| `--bg` | `#F5F6F8` | Page surface (graph-paper grey-blue) |
| `--bg-alt` | `#FFFFFF` | Alternating section surface / cards |
| `--grid-line` | `#DDE2EA` | Faint graph-paper grid, hairlines, dashed dividers |
| `--ink` | `#17213B` | Headings, primary text |
| `--ink-soft` | `#52607A` | Body copy, secondary text |
| `--ink-faint` | `#8894A8` | Captions, meta, mono labels |
| `--series-primary` | `#1F8A82` | Teal — primary series: links, active states, verified-badge accents |
| `--series-secondary` | `#E2933B` | Amber — secondary series, used sparingly (highlights, dividers) |
| `--series-muted` | `#94A1B8` | Slate — "queued"/placeholder project cards |

## 4. Typography

| Role | Face | Notes |
|---|---|---|
| Display (h1–h3) | **Space Grotesk** | Geometric, technical character — used at restraint, no italics |
| Body | **Inter** | Paragraph copy, form fields |
| Mono / data | **IBM Plex Mono** | Stats, dates, credential IDs, axis labels, nav links — signals "this is verifiable data" |

## 5. Layout & signature elements

```
┌──────────────────────────────────────────────┐
│ nav: brand-node · Home About Skills Creds     │
│      Projects Experience Education Contact    │
├──────────────────────────────────────────────┤
│ HERO                                          │
│  left: eyebrow, name, tagline, location/links, │
│        CTA buttons                             │
│  right: KPI dashboard tile strip (signature)   │
├──────────────────────────────────────────────┤
│ ABOUT: photo/fallback + facts panel | bio text │
├──────────────────────────────────────────────┤
│ SKILLS: Analytics & BI (primary) | Engineering │
│         Foundation | Tools — proficiency bars  │
├──────────────────────────────────────────────┤
│ VERIFIED CREDENTIALS (new section)             │
│  ledger rows: name · issuer · date · cred ID   │
│  · skill tags · "Show credential" link         │
├──────────────────────────────────────────────┤
│ PROJECTS                                       │
│  real: Kickstarter DEEPP (Tableau + Python EDA)│
│  queued: SQL script / dashboard / deck / sheet │
├──────────────────────────────────────────────┤
│ EXPERIENCE: vertical axis timeline w/ ticks    │
├──────────────────────────────────────────────┤
│ EDUCATION | CONTACT                            │
├──────────────────────────────────────────────┤
│ footer                                         │
└──────────────────────────────────────────────┘
```

**Signature element — KPI dashboard strip.** A row of 4–5 small tiles near the
hero, each showing one verified, quantified result (not decorative stats —
these are real numbers from the LinkedIn history):

| Value | Label |
|---|---|
| 40% | faster query response (SQL tuning, PostgreSQL, 5,000+ users) |
| 90% | less manual data entry (automated PDDIKTI integration) |
| 20+ | relational tables modeled (OBE curriculum) |
| 90.91 | RevoU Full-stack Data Analytics grade |
| 5,000+ | active institutional users served |

Styled as small chart-tile cards (thin top border in `--series-primary`, mono
numeral, small label) — a dashboard reading, not a marketing banner.

**Verified Credentials section** is the other structurally new idea: a ledger
list, each row showing issuer + date + credential ID in mono type with a
"Show credential →" link, visually distinct from the Projects section (which
holds real analytical work, finished or in progress) and from Education
(formal schooling). This directly upgrades the old site's buried
"misc.log (archived)" accordion into first-class proof.

**Timeline** for Experience keeps a literal vertical axis with tick marks —
justified here because it's real chronological data, not decoration.

## 6. Section copy (source content)

### Hero
- Eyebrow: `Data Analyst`
- Name: **Renaldy Bilal Setyawan**
- Tagline: "Transforming complex backend databases and pipelines into clear,
  actionable business insights."
- Location: Surabaya, East Java, Indonesia
- Links: Email · GitHub · LinkedIn · Portfolio
- CTAs: "Download CV" (→ `pdf/CV_ATS_RENALDY.pdf`, needs new file) · "Get in touch" (→ `#contact`)

### About
> Data-driven Analyst with a 5+ year foundation in backend and full-stack
> engineering. I help organizations optimize their data systems, build clean
> reporting pipelines, and turn complex data schemas into clear, actionable
> business insights. By bridging the gap between rigorous software engineering
> and modern data analytics (Python, SQL, Tableau), I ensure data is not just
> analyzed, but retrieved efficiently and accurately.
>
> Some examples of my work and impact include:
> - Cut query bottlenecks by up to 40% for a campus ecosystem servicing over
>   5,000+ active users through database indexing and advanced SQL query tuning.
> - Reduced manual data entry by 90% for academic compliance reporting by
>   designing and engineering an automated two-way API data integration layer.
> - Accelerated infrastructure performance by building custom internal API
>   gateways using Go (Golang) to offload heavy legacy data strains.
> - Deepened analytical capabilities through intensive hands-on data modeling
>   and business intelligence frameworks at the RevoU Data Analytics Bootcamp.
>
> I'm excited about opportunities to collaborate with forward-thinking,
> remote-first teams looking to elevate their data strategies.

Facts panel: experience `5+ years` · location `Surabaya, ID` · focus `Data
Analytics (SQL, Python, Tableau)` · foundation `Backend engineering (Go, PHP)`

### Skills
**Analytics & BI** (primary group): SQL — Advanced, Python — Basic/Intermediate,
Data Visualization, Data Analysis, Tableau, Spreadsheets/Excel
**Engineering Foundation**: Go (Golang), PHP (Laravel), PostgreSQL, MySQL,
Next.js, JavaScript
**Tools**: Git, Flutter (legacy)

Proficiency bars driven by real signal: HackerRank cert tiers (Advanced/
Intermediate/Basic) map to relative bar length for SQL/Python; other bars
sized by years of hands-on use.

### Verified Credentials
1. **HackerRank SQL (Advanced)** — HackerRank · Issued Jul 2026 · ID `6a055d7ccfd2` · PostgreSQL, SQL
2. **HackerRank SQL (Intermediate)** — HackerRank · Issued Jul 2026 · ID `76b392e3b71b` · SQL, MySQL
3. **HackerRank SQL (Basic)** — HackerRank · Issued Jul 2026 · ID `6cef0d14dcd2` · SQL, MySQL
4. **HackerRank Python (Basic)** — HackerRank · Issued Jul 2026 · ID `c22d9c4ffec3` · Python
5. **HackerRank Problem Solving (Basic)** — HackerRank · Issued Jul 2026 · ID `f7ed53ad79f4` · Problem Solving
6. **Full-stack Data Analytics** — RevoU · Issued May 2024 · Grade 90.91 · Data Visualization, Python
7. **Computer Program Copyright — SI OBE Adi Buana** — Dirjen Kekayaan Intelektual · Jun 2025 · ID `000911846` · Laravel, PHP
8. **Computer Program Copyright — SISPAMI Adi Buana** — Dirjen Kekayaan Intelektual · Jun 2025 · ID `000911970` · Laravel, PostgreSQL

Supplementary (no public credential ID, keep as plain list below the ledger):
TOEIC score 920 (2020) · Web Developer Level VI, STIKI Malang (2020)

*"Show credential" links: the LinkedIn cert cards have live "Show credential"
buttons — Renaldy should paste the actual verification URLs when available;
until then link the button to the LinkedIn profile's certifications section.*

### Projects
**Real — Kickstarter Projects DEEPP** (RevoU, 2024): analyzed Kickstarter
campaign data for patterns behind successful launches; exploratory data
analysis in Python; built a Tableau dashboard to visualize findings.

**Queued placeholders** (4 cards, dashed border, "queued" status badge,
italic hint text), one per artifact type Renaldy plans to add from bootcamp
work:
1. SQL — "Add a data-cleaning or query script here"
2. Dashboard image — "Add a Tableau/Power BI dashboard screenshot here"
3. Slide deck — "Add a case-study presentation (PPTX/PDF export) here"
4. Spreadsheet — "Add a spreadsheet model or analysis workbook here"

### Experience
**Web Developer** — Universitas PGRI Adi Buana Surabaya · Full-time · Aug 2023 – Present · Surabaya, on-site
- Automated Data Integration Pipelines (PDDIKTI): built a two-way sync layer
  (Neo Feeder Importer) with the government PDDIKTI Feeder API, cutting manual
  data entry for academic staff by 90%.
- End-to-End Data Synchronization (SISTER): automated secure, cross-platform
  sync of institutional assets and lecturer profiles per national higher-ed
  compliance standards.
- Real-Time Data Communication Tracking (Qontak): built a high-volume
  notification engine on the Qontak WhatsApp Business API with structured
  delivery tracking.
- Database Optimization & Query Tuning: strategic indexing and SQL tuning in
  PostgreSQL cut average response times by up to 40% for 5,000+ users.
- Relational Data Modeling: translated OBE curriculum requirements into 20+
  optimized relational tables.

**Software Developer** — Strugg House · Freelance · Jan 2018 – Present · Malang, remote
- Data Infrastructure & Low-Latency Processing: deployed low-latency POS
  transaction engines in Go for high-integrity retail data ingestion.
- Operational Reporting & Dashboards: delivered client management portals
  (Go + Next.js) with internal analytical dashboards for purchasing data.
- Agile Delivery Optimization: streamlined delivery workflows, cutting project
  completion time by 25%.

**Mobile Developer** *(archived/minor section)* — CV. Birunet Media Komputindo · Internship · Jun 2018 – Aug 2019 · Malang, hybrid
- Flutter UI work; 20% reduction in app loading time via data-fetching
  optimization; 0% error rate at release.

### Education
- **RevoU** — Full-stack Data Analytics · Jan 2024 – May 2024 · Grade 90.91.
  Python, SQL, spreadsheets, Tableau; analyzing, visualizing, and interpreting
  data to drive decisions.
- **STIKI Malang** — B.Sc. Information Technology · Jun 2016 – Aug 2023 ·
  Thesis: "Rancang Bangun Aplikasi Travel Berbasis Android"

### Contact
Email · Surabaya, East Java, Indonesia (map link) · GitHub · LinkedIn ·
mailto-based contact form (static site, no backend).

## 7. Responsive behavior

- Breakpoints: `900px` (two-column grids collapse to one — hero, about,
  skills, projects, education, contact) and `720px` (nav collapses to a
  toggleable mobile menu, form rows stack).
- KPI tile strip: 5 tiles in a row on desktop → 2-up grid on tablet → stacked
  on mobile.
- Verified Credentials ledger: table-like rows on desktop → stacked cards on
  mobile (each field labeled).
- Touch targets ≥ 44px; body text never below 14px real (0.875rem) at any
  breakpoint.

## 8. Assets still needed from Renaldy

- [ ] Real LinkedIn profile URL
- [ ] Profile photo file (for `assets/img/`)
- [ ] Data-Analyst-framed CV PDF
- [ ] Real "Show credential" verification links for HackerRank/RevoU certs
- [ ] Kickstarter DEEPP project artifact (Tableau screenshot or public link)
- [ ] Any of the 4 queued project types, whenever ready

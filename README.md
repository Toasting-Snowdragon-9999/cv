# CV website — Phillip Christopher Nøhr Færch

**Live site:** <https://christopher-faerch.github.io/cv/>

A single-page, bilingual (EN/DA) CV website plus downloadable Word CVs.
Built with [Astro](https://astro.build) as a fully static site, hosted on
GitHub Pages straight from this repository. No backend, no database, no tracking.

## Prerequisites

| Tool | Version | Why |
|---|---|---|
| Node.js | 20 or newer (developed on 24) | Runs Astro and the build |
| npm | 10 or newer | Installs dependencies |
| Git | any recent | Version control; pushing to `main` deploys |
| ffmpeg | optional | Only if you want to regenerate the project video/images in `public/projects/` |

Everything else is installed by `npm install`.

## Running locally

```bash
npm install          # first time only
npm run dev          # http://localhost:4321, live-reloads on save
```

Other scripts:

```bash
npm run build        # writes the production site to dist/
npm run preview      # serves dist/ exactly as Cloudflare will
npm run check        # Astro/TypeScript type check of the content file and components
```

## Editing the CV

All text lives in **one file**: [`src/content/cv.ts`](src/content/cv.ts).
Every visible string is a pair `{ en: '...', da: '...' }`. Edit, save, and the
dev server reloads. Commit and push to `main` and Cloudflare rebuilds the site
in about a minute.

Typical edits:

- **New job** → add an object to the `experience` array. Entries are sorted by
  end date automatically; the first three are shown, the rest sit behind
  “Show all experience”.
- **New course or semester** → edit `bscSemesters`. ECTS totals per semester
  are computed for you. Set `kind` to `'project'`, `'elective'` or
  `'firstYearExam'` to get the coloured chip.
- **New project** → add an object to `projects`. `featured: true` makes it the
  big card with media; `todo: true` shows “Description coming soon” instead of
  the summary while you write it. Images and videos go in `public/projects/`
  and are referenced as `/projects/<file>`.
- **Skills, languages, profile text, tagline** → the obvious arrays at the top
  and bottom of the same file.
- **UI labels** (button text, “present”, chip names) → the `ui` object.
- **Last updated date** in the footer → `lastUpdated`.

### Adding your photo

Put a square-ish JPEG at **`public/photo.jpg`** (overwrite the beige
placeholder that is there now). Keep the exact file name. Nothing else needs
to change; the site crops it to a square with `object-fit: cover`.
Around 800×800 px is plenty.

### Updating the Word CVs

The download button serves `public/Phillip_Christopher_Faerch_CV.docx` (EN)
and `public/Phillip_Christopher_Faerch_CV_DA.docx` (DA). They are ordinary
Word files: open, edit, save over the same name, commit, push.
`scripts/build-docx.js` regenerates both from scratch if you would rather
rewrite them programmatically (`node scripts/build-docx.js`).

## Deploying

The site is published by **GitHub Pages** through the workflow in
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

- Every push to `main` builds the site (`npm run build`) and publishes `dist/`.
- The build sets `SITE_URL` and `SITE_BASE=/cv` so links work under
  `https://christopher-faerch.github.io/cv/`. Locally the base is `/`.
- Progress and logs: the **Actions** tab on GitHub. A deploy takes about a minute.
- Pages must stay enabled under *Settings → Pages* with source **GitHub Actions**,
  and the repository must be public (free plan requirement).

### Attaching your own domain later

1. Buy the domain (Cloudflare Registrar, Porkbun or Namecheap are all fine).
2. At the registrar add a `CNAME` record for `www` (or the apex via ALIAS/ANAME)
   pointing to `christopher-faerch.github.io`.
3. On GitHub: *Settings → Pages → Custom domain*, enter the domain, tick
   *Enforce HTTPS* once the certificate is issued.
4. In `.github/workflows/deploy.yml` set `SITE_URL` to the new domain and
   `SITE_BASE` to `/`, then push. The site now lives at the domain root.

### Alternative: Cloudflare Pages

The same repository can be connected in the Cloudflare dashboard
(Workers & Pages → Create → Connect to Git). Build command `npm run build`,
output `dist`, and set `SITE_URL` to the Cloudflare URL with `SITE_BASE=/`.

## Architecture

The site is a **static build**: Astro renders every component once, at build
time, into a single `index.html` with inlined CSS. There is no JavaScript
framework in the browser. Two small inline scripts handle the language toggle
and open all accordions before printing.

```
Content (cv.ts)  ──►  Astro components  ──►  dist/index.html + assets  ──►  Cloudflare Pages CDN
  typed data          render both languages      one page, no JS framework        push to main = deploy
```

### Bilingual rendering

Both languages are rendered into the HTML at build time. Each bilingual string
becomes two spans, `<span class="en">…</span><span class="da">…</span>`, via
the `T` component. CSS on `<html data-lang="en|da">` hides the other one. An
inline script in `<head>` sets `data-lang` before first paint from
`localStorage` (or the browser language), so there is no flash of the wrong
language and the choice persists.

### Structure

```
cv/
├── .github/workflows/
│   └── deploy.yml          builds and publishes to GitHub Pages on every push
├── astro.config.mjs        Astro config (site URL and base path from env, inline CSS)
├── package.json            scripts: dev / build / preview / check
├── tsconfig.json
├── public/                 copied verbatim into the site root
│   ├── photo.jpg           ← your portrait (placeholder now)
│   ├── favicon.svg
│   ├── Phillip_Christopher_Faerch_CV.docx      ← EN Word CV (download button)
│   ├── Phillip_Christopher_Faerch_CV_DA.docx   ← DA Word CV
│   └── projects/           project media (video loop, poster, stills)
├── scripts/
│   └── build-docx.js       regenerates the two .docx files
└── src/
    ├── content/
    │   └── cv.ts           ★ all CV text, bilingual, typed
    ├── lib/
    │   └── base.ts         withBase(): prefixes asset paths with the configured base
    ├── styles/
    │   └── global.css      design tokens (colours, fonts), layout, print styles
    ├── layouts/
    │   └── Layout.astro    <html> shell, fonts, meta tags, language + print scripts
    ├── components/
    │   ├── T.astro         renders one bilingual string as two spans
    │   ├── Section.astro   numbered section wrapper (01 Profile, 02 Experience, …)
    │   ├── TopBar.astro    sticky nav + EN/DA toggle
    │   ├── Hero.astro      name, tagline, photo, contact links, download button
    │   ├── Profile.astro   summary + highlights
    │   ├── Experience.astro  jobs, newest first, “Show all” disclosure
    │   ├── Education.astro   degrees, with per-semester coursework accordion
    │   ├── Projects.astro    featured card with video + grid of cards
    │   ├── Skills.astro      skill groups + languages
    │   └── Footer.astro
    └── pages/
        └── index.astro     assembles the sections into the one page
```

### Design tokens

Colours and fonts are CSS custom properties at the top of
`src/styles/global.css`:

| Token | Value | Use |
|---|---|---|
| `--bg` | `#f4f1ea` | off-white / beige page background |
| `--bg-card` | `#faf8f3` | cards |
| `--olive` / `--olive-deep` | `#6b7a4f` / `#4e5a38` | accent, buttons, links |
| `--ink` / `--ink-soft` | `#2b2620` / `#5f574d` | brown-black text |
| `--font-display` | Fraunces | headings |
| `--font-body` | Inter | body |

Change a token and the whole site follows.

### Accessibility and print

- Accordions are native `<details>/<summary>`, so they work without JavaScript
  and with keyboard and screen readers.
- `@media print` hides the nav and buttons and lays the page out for paper;
  the print script opens every accordion first so coursework is included.
- Text contrast on the beige background meets WCAG AA.

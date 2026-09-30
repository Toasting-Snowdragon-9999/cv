// Regenerates the two Word CVs (EN + DA) in public/ from src/content/cv.ts.
// Run:  node scripts/build-docx.js        (Node 22.18+ / 24 strips the TypeScript types natively)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, TabStopType,
  LevelFormat, BorderStyle, ExternalHyperlink,
} from 'docx';
import { person, profile, experience, education, projects, skills, languages, ui, lastUpdated } from '../src/content/cv.ts';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const OLIVE = '4E5A38';
const INK = '2B2620';
const MUTED = '6F665C';
const RULE = 'D9D2C2';
const FONT_HEAD = 'Georgia';
const FONT_BODY = 'Calibri';
const CONTENT_WIDTH = 11906 - 2 * 900; // A4 width minus margins, in DXA

const STR = {
  en: {
    cv: 'Curriculum Vitae', profile: 'Profile', education: 'Education', projects: 'Selected projects',
    experience: 'Work experience', skills: 'Skills', languages: 'Languages', present: 'present',
    born: 'Born', address: 'Address', coursework: 'Coursework', updated: 'Last updated', repo: 'Repository',
    bachelorProject: 'Bachelor project',
  },
  da: {
    cv: 'Curriculum Vitae', profile: 'Profil', education: 'Uddannelse', projects: 'Udvalgte projekter',
    experience: 'Erhvervserfaring', skills: 'Kompetencer', languages: 'Sprog', present: 'nu',
    born: 'Født', address: 'Adresse', coursework: 'Kurser', updated: 'Sidst opdateret', repo: 'Repository',
    bachelorProject: 'Bachelorprojekt',
  },
};

const ADDRESS = 'Nyborgvej 103, 2. tv., 5000 Odense C';

const fmtYM = (ym, lang) => {
  const [y, m] = ym.split('-');
  return `${m}/${y}`;
};
const fmtBorn = (iso, lang) => {
  const d = new Date(iso);
  return d.toLocaleDateString(lang === 'da' ? 'da-DK' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
};

function build(lang) {
  const S = STR[lang];
  const t = (s) => (typeof s === 'string' ? s : s[lang]);

  const run = (text, opts = {}) => new TextRun({ text, font: FONT_BODY, size: 20, color: INK, ...opts });
  const body = (text, opts = {}) => new Paragraph({ spacing: { after: 50 }, ...opts.para, children: [run(text, opts.run)] });

  const h1 = (text) => new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 170, after: 60 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: RULE, space: 4 } },
    children: [new TextRun({ text, font: FONT_HEAD, size: 26, color: OLIVE, bold: false })],
  });

  // Entry with right-aligned date on the same line as the title.
  const entry = (title, sub, when, desc) => {
    const out = [
      new Paragraph({
        spacing: { before: 90, after: 10 },
        tabStops: [{ type: TabStopType.RIGHT, position: CONTENT_WIDTH }],
        children: [
          new TextRun({ text: title, font: FONT_BODY, size: 22, bold: true, color: INK }),
          new TextRun({ text: `\t${when}`, font: FONT_BODY, size: 19, color: MUTED }),
        ],
      }),
    ];
    if (sub) out.push(new Paragraph({ spacing: { after: 40 }, children: [run(sub, { size: 20, color: MUTED })] }));
    if (desc) out.push(body(desc));
    return out;
  };

  const bullets = (items) => items.map((text) => new Paragraph({
    numbering: { reference: 'bullets', level: 0 },
    spacing: { after: 40 },
    children: [run(text)],
  }));

  const link = (text, url) => new ExternalHyperlink({
    link: url,
    children: [new TextRun({ text, font: FONT_BODY, size: 21, color: OLIVE, underline: {} })],
  });

  const children = [];

  // ---- Header ----
  children.push(new Paragraph({
    spacing: { after: 40 },
    children: [new TextRun({ text: person.name, font: FONT_HEAD, size: 52, color: INK })],
  }));
  children.push(new Paragraph({
    spacing: { after: 140 },
    children: [new TextRun({ text: t(person.tagline), font: FONT_BODY, size: 23, color: OLIVE })],
  }));
  children.push(new Paragraph({
    spacing: { after: 30 },
    children: [
      run(`${S.address}: ${ADDRESS}   ·   ${person.phone}   ·   `, { size: 20, color: MUTED }),
      link(person.email, `mailto:${person.email}`),
    ],
  }));
  children.push(new Paragraph({
    spacing: { after: 30 },
    children: [
      run(`${S.born}: ${fmtBorn(person.born, lang)}   ·   GitHub: `, { size: 20, color: MUTED }),
      link(person.githubLabel, person.github),
      ...(person.linkedin ? [run('   ·   LinkedIn: ', { size: 20, color: MUTED }), link(person.linkedinLabel, person.linkedin)] : []),
    ],
  }));

  // ---- Profile ----
  children.push(h1(S.profile));
  children.push(body(t(profile.summary)));

  // ---- Education ----
  children.push(h1(S.education));
  for (const e of education) {
    const when = `${e.from.slice(0, 4)} – ${e.to ? e.to.slice(0, 4) : S.present}`;
    if (e.description || e.semesters) {
      children.push(...entry(t(e.degree), `${t(e.institution)} · ${e.place}`, when, e.description ? t(e.description) : null));
    } else {
      // Compact one-liner for schools without a description.
      children.push(new Paragraph({
        spacing: { before: 60, after: 10 },
        tabStops: [{ type: TabStopType.RIGHT, position: CONTENT_WIDTH }],
        children: [
          new TextRun({ text: t(e.degree), font: FONT_BODY, size: 20, bold: true, color: INK }),
          run(`  ·  ${t(e.institution)}, ${e.place}`, { size: 19, color: MUTED }),
          new TextRun({ text: `	${when}`, font: FONT_BODY, size: 19, color: MUTED }),
        ],
      }));
    }
    if (e.semesters) {
      const bachelor = projects.find((p) => p.id === 'quadruped');
      if (bachelor) {
        children.push(new Paragraph({
          spacing: { after: 40 },
          children: [run(`${S.bachelorProject}: `, { bold: true, size: 20 }), run(`${t(bachelor.title)} (${t(bachelor.context)})`, { size: 20 })],
        }));
      }
      for (const sem of e.semesters) {
        const names = sem.courses.map((c) => t(c.title)).join(', ');
        children.push(new Paragraph({
          spacing: { after: 10 },
          indent: { left: 240 },
          children: [run(`${t(sem.label)} · ${sem.term}: `, { bold: true, size: 18, color: MUTED }), run(names + '.', { size: 18, color: MUTED })],
        }));
      }
    }
  }

  // ---- Projects ----
  children.push(h1(S.projects));
  for (const p of projects.filter((p) => !p.todo && p.docx !== false)) {
    children.push(...entry(t(p.title), t(p.context), '', t(p.summary)));
    const meta = [];
    if (p.tags?.length) meta.push(run(p.tags.join(' · '), { size: 19, color: MUTED }));
    if (p.repo) meta.push(run(`   ·   ${S.repo}: `, { size: 19, color: MUTED }), link(p.repo.replace('https://github.com/', 'github.com/'), p.repo));
    if (meta.length) children.push(new Paragraph({ spacing: { after: 60 }, children: meta }));
  }

  // ---- Experience ----
  children.push(h1(S.experience));
  const sorted = [...experience].sort((a, b) => (b.to ?? '9999').localeCompare(a.to ?? '9999') || b.from.localeCompare(a.from));
  for (const e of sorted) {
    const when = `${fmtYM(e.from, lang)} – ${e.to ? fmtYM(e.to, lang) : S.present}`;
    // Company on the title line keeps each job to two lines.
    children.push(new Paragraph({
      spacing: { before: 90, after: 10 },
      tabStops: [{ type: TabStopType.RIGHT, position: CONTENT_WIDTH }],
      children: [
        new TextRun({ text: t(e.role), font: FONT_BODY, size: 22, bold: true, color: INK }),
        run(`  ·  ${e.company}, ${e.place}`, { size: 19, color: MUTED }),
        new TextRun({ text: `	${when}`, font: FONT_BODY, size: 19, color: MUTED }),
      ],
    }));
    children.push(body(t(e.description)));
  }

  // ---- Skills ----
  children.push(h1(S.skills));
  for (const g of skills) {
    children.push(new Paragraph({
      spacing: { after: 50 },
      children: [run(`${t(g.name)}: `, { bold: true }), run(g.items.map(t).join(', '))],
    }));
  }

  // ---- Languages ----
  children.push(h1(S.languages));
  children.push(new Paragraph({
    spacing: { after: 50 },
    children: [run(languages.map((l) => `${t(l.name)} – ${t(l.level)}`).join('   ·   '))],
  }));


  return new Document({
    creator: person.name,
    title: `${person.name} – CV`,
    styles: {
      default: { document: { run: { font: FONT_BODY, size: 20, color: INK } } },
      paragraphStyles: [
        { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
          run: { font: FONT_HEAD, size: 26, color: OLIVE }, paragraph: { outlineLevel: 0 } },
      ],
    },
    numbering: {
      config: [{
        reference: 'bullets',
        levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 480, hanging: 240 } } } }],
      }],
    },
    sections: [{
      properties: { page: { margin: { top: 720, right: 900, bottom: 720, left: 900 } } },
      children,
    }],
  });
}

for (const lang of ['en', 'da']) {
  const doc = build(lang);
  const out = path.join(ROOT, 'public', path.basename(person.cvFile[lang]));
  const buf = await Packer.toBuffer(doc);
  fs.writeFileSync(out, buf);
  console.log('wrote', path.relative(ROOT, out), `${(buf.length / 1024).toFixed(0)} kB`);
}

import {
  profile,
  skillGroups,
  experience,
  projects,
  education,
  certifications,
} from '../data/resume';

/* ─── HTML entity escaping ───────────────────────────────────────────── */
function h(s: string | undefined): string {
  if (!s) return '';
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ─── Skills section ─────────────────────────────────────────────────── */
function buildSkillItems(): string {
  // Cert URL map
  const certUrl: Record<string, string> = {};
  for (const c of certifications) {
    if (c.url) certUrl[c.name.toLowerCase()] = c.url;
  }

  const uipathUrl =
    certUrl['uipath associate certification'] ??
    'https://drive.google.com/file/d/1Swagi6Vx7DCmu60qLUtzEQ9qtgW9ik1Y/view?usp=sharing';
  const automaUrl =
    certUrl['ipa architect'] ??
    'https://drive.google.com/file/d/1HMVfSMtGNHS1WtAjU1-HF15dL2yZNZBe/view?usp=sharing';

  return skillGroups
    .map(g => {
      if (g.title.toLowerCase().includes('rpa')) {
        // Custom RPA line with inline cert hyperlinks
        return `<li><strong>RPA &amp; Automation:</strong> UiPath (<a href="${uipathUrl}" target="_blank">Associate Certified</a>), Blue Prism, Automa (<a href="${automaUrl}" target="_blank"><em>IPA Architect</em></a>)</li>`;
      }
      return `<li><strong>${h(g.title)}:</strong> ${g.items.map(h).join(', ')}</li>`;
    })
    .join('\n');
}

/* ─── Experience section ─────────────────────────────────────────────── */
function buildExperienceHTML(): string {
  return experience
    .map(job => {
      const engBlocks = job.engagements
        .map(eng => {
          const bullets = eng.bullets
            .map(b => `<li>${h(b)}</li>`)
            .join('\n');
          const tech = eng.tech.map(h).join(', ');
          const context = eng.context ? ` &mdash; ${h(eng.context)}` : '';
          const techNote = tech ? ` &mdash; ${tech}` : '';
          return `
<p class="engagement">${h(eng.name)}${context}${techNote}</p>
<ul>${bullets}</ul>`;
        })
        .join('\n');

      return `
<div class="job-block">
  <div class="job-header">
    <span class="job-title">${h(job.role)}</span>
    <span class="job-dates">${h(job.period)}</span>
  </div>
  <div class="job-company-row">
    <span class="job-company">${h(job.company)}</span>
    <span class="job-location">${h(job.location)}</span>
  </div>
  ${engBlocks}
</div>`;
    })
    .join('\n');
}

/* ─── Projects section ───────────────────────────────────────────────── */
function buildProjectsHTML(): string {
  return projects
    .map(proj => {
      const bullets = proj.bullets.map(b => `<li>${h(b)}</li>`).join('\n');
      const tech = proj.tech.map(h).join(', ');
      const titleText = proj.subtitle
        ? `${h(proj.name)} &ndash; ${h(proj.subtitle)}`
        : h(proj.name);
      const repoLink = proj.repo
        ? `<a href="${proj.repo}" target="_blank" class="project-link">${h(proj.repoLabel ?? proj.repo)}</a>`
        : '';

      return `
<div class="project-block">
  <div class="project-header">
    <span class="project-title">${titleText}</span>
    ${repoLink}
  </div>
  <div class="project-tech">Tech Stack: ${tech}</div>
  <ul>${bullets}</ul>
</div>`;
    })
    .join('\n');
}

/* ─── Education section ──────────────────────────────────────────────── */
function buildEducationHTML(): string {
  return education
    .map(
      edu => `
<div class="edu-block">
  <div class="edu-header">
    <span class="edu-degree">${h(edu.degree)}</span>
    <span class="edu-years">${h(edu.period)}</span>
  </div>
  <div class="edu-school">${h(edu.school)}, ${h(edu.location)}</div>
</div>`,
    )
    .join('\n');
}

/* ─── CSS ────────────────────────────────────────────────────────────── */
export const RESUME_CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: Georgia, 'Times New Roman', Times, serif;
    font-size: 10pt;
    line-height: 1.15;
    color: #000;
    background: #e8e8e8;
  }

  .page {
    width: 8.5in;
    min-height: 11in;
    margin: 0 auto;
    padding: 0.35in 0.55in 0.4in 0.55in;
    background: #fff;
  }

  /* ── Header ── */
  .header { text-align: center; margin-bottom: 5pt; }
  .header-name {
    font-size: 17pt;
    font-weight: bold;
    letter-spacing: 0.5pt;
    font-family: Georgia, serif;
  }
  .header-contact { font-size: 9pt; margin-top: 3pt; }
  .header-contact a { color: #003366; text-decoration: none; }

  /* ── Section titles ── */
  .section-title {
    font-size: 11pt;
    font-weight: bold;
    color: #003366;
    border-bottom: 0.8pt solid #003366;
    padding-bottom: 1.5pt;
    margin-top: 7pt;
    margin-bottom: 3pt;
  }

  /* ── Summary ── */
  .summary { font-size: 9.5pt; line-height: 1.25; margin-top: 2pt; }

  /* ── Skills ── */
  .skills-list {
    list-style-type: disc;
    padding-left: 14pt;
    margin-top: 1pt;
  }
  .skills-list li { font-size: 9.5pt; line-height: 1.3; margin-bottom: 0.5pt; }
  .skills-list a { color: #003366; }

  /* ── Experience ── */
  .job-block { margin-top: 4pt; }
  .job-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  .job-title { font-weight: bold; font-size: 10pt; }
  .job-dates { font-weight: bold; font-size: 9.5pt; }
  .job-company-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  .job-company { font-style: italic; font-size: 9.5pt; }
  .job-location { font-style: italic; font-size: 9.5pt; }
  .engagement {
    font-style: italic;
    font-size: 9.5pt;
    margin-top: 3pt;
    margin-bottom: 1pt;
  }

  /* ── Projects ── */
  .project-block { margin-top: 4pt; }
  .project-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  .project-title { font-weight: bold; font-size: 10pt; }
  .project-link { font-size: 8.5pt; color: #003366; text-decoration: none; }
  .project-tech { font-style: italic; font-size: 9pt; margin-bottom: 1pt; margin-top: 0.5pt; }

  /* ── Education ── */
  .edu-block { margin-top: 3pt; }
  .edu-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  .edu-degree { font-weight: bold; font-size: 10pt; }
  .edu-years { font-weight: bold; font-size: 9.5pt; }
  .edu-school { font-style: italic; font-size: 9.5pt; margin-top: 0.5pt; }

  /* ── Shared bullet lists ── */
  ul {
    padding-left: 14pt;
    margin: 1pt 0 0 0;
    list-style-type: disc;
  }
  li {
    font-size: 9.5pt;
    line-height: 1.25;
    margin-bottom: 0.5pt;
  }

  @media print {
    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
    html, body { background: white !important; margin: 0; padding: 0; }
    .page { margin: 0 !important; box-shadow: none !important; width: 100% !important; min-height: unset !important; }
    a { color: #003366 !important; }
    /* Avoid breaking a job/project block across pages */
    .job-block, .project-block, .edu-block { break-inside: avoid; }
    .section-title { break-after: avoid; }
  }
`;

/* ─── Full standalone HTML document ─────────────────────────────────── */
/**
 * @param printOnLoad  If true, injects window.print() on page load.
 *                     Used by the Download flow so the browser's native
 *                     Print → Save as PDF produces output identical to View.
 */
export function buildResumeHTML(printOnLoad = false): string {
  const { name, email, phone, links } = profile;
  const phoneDigits = phone.replace(/[^\d+]/g, '');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Resume – ${h(name)}</title>
  <style>${RESUME_CSS}</style>
</head>
<body>
<div class="page">

  <!-- HEADER -->
  <div class="header">
    <div class="header-name">${h(name.toUpperCase())}</div>
    <div class="header-contact">
      <a href="tel:${phoneDigits}">${h(phone)}</a>
      &nbsp;|&nbsp;
      <a href="mailto:${h(email)}">${h(email)}</a>
      &nbsp;|&nbsp;
      <a href="${links.linkedin}" target="_blank">${links.linkedin.replace('https://', '')}</a>
    </div>
  </div>

  <!-- PROFESSIONAL SUMMARY -->
  <div class="section-title">Professional Summary</div>
  <p class="summary">${h(profile.summary)}</p>

  <!-- TECHNICAL SKILLS -->
  <div class="section-title">Technical Skills</div>
  <ul class="skills-list">
    ${buildSkillItems()}
  </ul>

  <!-- PROFESSIONAL EXPERIENCE -->
  <div class="section-title">Professional Experience</div>
  ${buildExperienceHTML()}

  <!-- PROJECTS -->
  <div class="section-title">Projects</div>
  ${buildProjectsHTML()}

  <!-- EDUCATION -->
  <div class="section-title">Education</div>
  ${buildEducationHTML()}

</div>
${printOnLoad ? `<script>window.addEventListener('load', function () { window.print(); });</script>` : ''}
</body>
</html>`;
}

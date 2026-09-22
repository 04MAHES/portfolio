import {
  profile,
  skillGroups,
  experience,
  projects,
  education,
  certifications,
} from '../data/resume';

/* ─── LaTeX special-character escaping ──────────────────────────────── */
function esc(s: string | undefined): string {
  if (!s) return '';
  return s
    .replace(/\\/g, '\\textbackslash{}')
    .replace(/&/g, '\\&')
    .replace(/%/g, '\\%')
    .replace(/\$/g, '\\$')
    .replace(/#/g, '\\#')
    .replace(/_/g, '\\_')
    .replace(/\^/g, '\\^{}')
    .replace(/~/g, '\\textasciitilde{}');
}

/* ─── Skill group builders ───────────────────────────────────────────── */

/**
 * Build the RPA skill line with inline certification links embedded.
 * Reads the certifications array to inject hyperlinks next to the tool name.
 */
function buildRPASkillLine(): string {
  // Map certification names → URL for quick lookup
  const certMap: Record<string, string> = {};
  for (const cert of certifications) {
    if (cert.url) certMap[cert.name.toLowerCase()] = cert.url;
  }

  // UiPath Associate cert URL
  const uipathUrl =
    certMap['uipath associate certification'] ??
    'https://drive.google.com/file/d/1Swagi6Vx7DCmu60qLUtzEQ9qtgW9ik1Y/view?usp=sharing';

  // Automa IPA Architect cert URL
  const automaUrl =
    certMap['ipa architect'] ??
    'https://drive.google.com/file/d/1HMVfSMtGNHS1WtAjU1-HF15dL2yZNZBe/view?usp=sharing';

  return (
    `\\item \\textbf{RPA \\& Automation:} ` +
    `UiPath (\\href{${uipathUrl}}{Associate Certified}), ` +
    `Blue Prism, ` +
    `Automa (\\href{${automaUrl}}{\\textit{IPA Architect}})`
  );
}

function buildSkillsSection(): string {
  // Exclude RPA group — we render it separately with cert links
  const standardGroups = skillGroups.filter(
    g => !g.title.toLowerCase().includes('rpa'),
  );

  const standardLines = standardGroups
    .map(g => `    \\item \\textbf{${esc(g.title)}:} ${g.items.map(esc).join(', ')}`)
    .join('\n');

  return `\\section*{Technical Skills}
\\begin{itemize}
${standardLines}
    ${buildRPASkillLine()}
\\end{itemize}`;
}

/* ─── Experience section ─────────────────────────────────────────────── */
function buildExperienceSection(): string {
  const jobBlocks = experience.map(job => {
    const engBlocks = job.engagements.map(eng => {
      const bullets = eng.bullets
        .map(b => `    \\item ${esc(b)}`)
        .join('\n');
      const techLabel = eng.tech.length
        ? ` --- ${eng.tech.map(esc).join(', ')}`
        : '';
      const context = eng.context ? ` --- ${esc(eng.context)}` : '';
      const subtitle = `${esc(eng.name)}${context}${techLabel}`;
      return `
\\vspace{0.5pt}
\\noindent\\textit{${subtitle}}
\\begin{itemize}
${bullets}
\\end{itemize}`;
    });

    return `\\noindent\\textbf{${esc(job.role)}} \\hfill \\textbf{${esc(job.period)}}\\\\
\\textit{${esc(job.company)}}\\hfill \\textit{${esc(job.location)}}\\\\
${engBlocks.join('\n\\vspace{0pt}')}`;
  });

  return `\\section*{Professional Experience}\n\n${jobBlocks.join('\n\n')}`;
}

/* ─── Projects section ───────────────────────────────────────────────── */
function buildProjectsSection(): string {
  const projBlocks = projects.map(proj => {
    const bullets = proj.bullets
      .map(b => `    \\item ${esc(b)}`)
      .join('\n');
    const tech = proj.tech.map(esc).join(', ');
    const titleLine = proj.subtitle
      ? `\\noindent\\textbf{${esc(proj.name)} -- ${esc(proj.subtitle)}}`
      : `\\noindent\\textbf{${esc(proj.name)}}`;
    const repoLink = proj.repo
      ? ` \\hfill \\href{${proj.repo}}{${esc(proj.repoLabel ?? proj.repo)}}`
      : '';

    return `${titleLine}${repoLink}\\\\
\\textit{Tech Stack: ${tech}}
\\begin{itemize}
${bullets}
\\end{itemize}`;
  });

  return `\\section*{Projects}\n\n${projBlocks.join('\n\\vspace{0.5pt}\n')}`;
}

/* ─── Education section ──────────────────────────────────────────────── */
function buildEducationSection(): string {
  const lines = education.map(
    edu =>
      `\\noindent\\textbf{${esc(edu.degree)}} \\hfill \\textbf{${esc(edu.period)}}\\\\
\\textit{${esc(edu.school)}, ${esc(edu.location)}}`,
  );
  return `\\section*{Education}\n${lines.join('\n\n')}`;
}

/* ─── Full document ──────────────────────────────────────────────────── */
export function buildResumeLatex(): string {
  const { name, email, phone, links } = profile;

  const header = `\\begin{center}
    {\\Large \\textbf{${esc(name)}}}\\\\[3pt]
    \\href{tel:${phone.replace(/[^+\\d]/g, '')}}{${esc(phone)}} \\ \\$|\\$ \\
    \\href{mailto:${email}}{${esc(email)}} \\ \\$|\\$ \\
    \\href{${links.linkedin}}{linkedin.com/in/sumamaheswarraju}
\\end{center}`;

  const summary = `\\section*{Professional Summary}
${esc(profile.summary)}`;

  return `\\documentclass[10pt,letterpaper]{article}

% ---------- PACKAGES ----------
\\usepackage[top=0.35in, bottom=0.3in, left=0.55in, right=0.55in]{geometry}
\\usepackage{titlesec}
\\usepackage{enumitem}
\\usepackage{hyperref}
\\usepackage{xcolor}
\\usepackage{ragged2e}
\\usepackage[T1]{fontenc}

% ---------- COLORS ----------
\\definecolor{darkblue}{RGB}{0,51,102}

% ---------- HYPERLINK SETUP ----------
\\hypersetup{
    colorlinks=true,
    urlcolor=darkblue,
    linkcolor=darkblue
}

% ---------- SECTION FORMATTING ----------
\\titleformat{\\section}
  {\\large\\bfseries\\color{darkblue}}
  {}{0em}{}
  [\\titlerule]
\\titlespacing{\\section}{0pt}{3pt}{2pt}

% ---------- LIST FORMATTING ----------
\\setlist[itemize]{leftmargin=*, itemsep=0pt, topsep=1pt, parsep=0pt}

\\setlength{\\parindent}{0pt}
\\setlength{\\parskip}{0pt}

% ---------- CUSTOM COMMANDS ----------
\\newcommand{\\resumeEntry}[4]{%
    \\noindent\\textbf{#1} \\hfill #2 \\\\
    \\textit{#3} \\hfill \\textit{#4}
}

\\pagestyle{empty}
\\linespread{0.93}

\\begin{document}
\\RaggedRight

% ---------- HEADER ----------
${header}

% ---------- PROFESSIONAL SUMMARY ----------
${summary}

% ---------- TECHNICAL SKILLS ----------
${buildSkillsSection()}

% ---------- PROFESSIONAL EXPERIENCE ----------
${buildExperienceSection()}

% ---------- PROJECTS ----------
${buildProjectsSection()}

% ---------- EDUCATION ----------
${buildEducationSection()}

\\end{document}
`;
}

/* ─── Download .tex ──────────────────────────────────────────────────── */
export function downloadResumeLatex(): void {
  const tex = buildResumeLatex();
  const blob = new Blob([tex], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${profile.name.replace(/\s+/g, '_')}_Resume.tex`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Opens the generated .tex directly inside Overleaf in a new tab
 * using Overleaf's form POST "Open in Overleaf" API.
 */
export function openInOverleaf(): void {
  const tex = buildResumeLatex();
  const filename = `${profile.name.replace(/\s+/g, '_')}_Resume.tex`;

  const form = document.createElement('form');
  form.method = 'POST';
  form.action = 'https://www.overleaf.com/docs';
  form.target = '_blank';
  form.style.display = 'none';

  const addField = (name: string, value: string) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = value;
    form.appendChild(input);
  };

  addField('snip', tex);
  addField('snip_name', filename);

  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
}

import { jsPDF } from 'jspdf';
import {
  profile,
  skillGroups,
  experience,
  projects,
  education,
  certifications,
} from '../data/resume';

/* ─── Design tokens ──────────────────────────────────────────────────── */
const PAGE_W = 210; // A4 mm
const PAGE_H = 297;
const ML = 18; // left margin
const MR = 18; // right margin
const CONTENT_W = PAGE_W - ML - MR;

const COLOR = {
  accent: [99, 102, 241] as [number, number, number],   // indigo-500
  dark:   [15,  23,  42]  as [number, number, number],  // slate-900
  mid:    [51,  65,  85]  as [number, number, number],  // slate-700
  muted:  [100, 116, 139] as [number, number, number],  // slate-500
  light:  [226, 232, 240] as [number, number, number],  // slate-200
  white:  [255, 255, 255] as [number, number, number],
};

/* ─── Helpers ────────────────────────────────────────────────────────── */
function setColor(doc: jsPDF, rgb: [number, number, number]) {
  doc.setTextColor(rgb[0], rgb[1], rgb[2]);
}

function setFillColor(doc: jsPDF, rgb: [number, number, number]) {
  doc.setFillColor(rgb[0], rgb[1], rgb[2]);
}

function setDrawColor(doc: jsPDF, rgb: [number, number, number]) {
  doc.setDrawColor(rgb[0], rgb[1], rgb[2]);
}

/** Add a new page and reset cursor; returns updated y */
function newPage(doc: jsPDF): number {
  doc.addPage();
  return 18;
}

/** Guard: if remaining space < minSpace, start a new page */
function guard(doc: jsPDF, y: number, minSpace: number): number {
  if (y + minSpace > PAGE_H - 15) return newPage(doc);
  return y;
}

/** Render wrapped text and return new y */
function wrappedText(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  maxW: number,
  lineH: number,
): number {
  const lines = doc.splitTextToSize(text, maxW);
  doc.text(lines, x, y);
  return y + lines.length * lineH;
}

/** Draw a horizontal divider */
function divider(doc: jsPDF, y: number): number {
  setDrawColor(doc, COLOR.light);
  doc.setLineWidth(0.3);
  doc.line(ML, y, PAGE_W - MR, y);
  return y + 4;
}

/** Section header with accent left-bar */
function sectionHeader(doc: jsPDF, title: string, y: number): number {
  y = guard(doc, y, 14);
  setFillColor(doc, COLOR.accent);
  doc.rect(ML, y - 3.5, 3, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  setColor(doc, COLOR.accent);
  doc.text(title.toUpperCase(), ML + 5, y);
  y += 2;
  y = divider(doc, y);
  return y;
}

/** Pill badge (tag chip) */
function pill(doc: jsPDF, label: string, x: number, y: number): number {
  doc.setFontSize(7);
  const tw = doc.getTextWidth(label);
  const pw = tw + 5;
  const ph = 4.5;
  setFillColor(doc, [224, 231, 255]); // indigo-100
  setDrawColor(doc, COLOR.accent);
  doc.setLineWidth(0.2);
  doc.roundedRect(x, y - 3, pw, ph, 1.2, 1.2, 'FD');
  setColor(doc, COLOR.accent);
  doc.text(label, x + 2.5, y);
  return pw + 2.5; // advance width
}

/* ─── Header block ───────────────────────────────────────────────────── */
function drawHeader(doc: jsPDF): number {
  let y = 0;

  // Accent bar across top
  setFillColor(doc, COLOR.accent);
  doc.rect(0, 0, PAGE_W, 8, 'F');
  y = 14;

  // Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  setColor(doc, COLOR.dark);
  doc.text(profile.name, ML, y);
  y += 6;

  // Title
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  setColor(doc, COLOR.accent);
  doc.text(profile.title, ML, y);
  y += 5;

  // Contact line
  doc.setFontSize(8);
  setColor(doc, COLOR.mid);
  const contactParts = [
    profile.email,
    profile.phone,
    profile.location,
    profile.links.linkedin,
    profile.links.github,
  ];
  const contactLine = contactParts.join('  ·  ');
  y = wrappedText(doc, contactLine, ML, y, CONTENT_W, 4);
  y += 3;

  y = divider(doc, y);
  return y;
}

/* ─── Summary ────────────────────────────────────────────────────────── */
function drawSummary(doc: jsPDF, y: number): number {
  y = sectionHeader(doc, 'Summary', y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  setColor(doc, COLOR.mid);
  y = wrappedText(doc, profile.summary, ML, y, CONTENT_W, 4.2);
  return y + 5;
}

/* ─── Skills ─────────────────────────────────────────────────────────── */
function drawSkills(doc: jsPDF, y: number): number {
  y = sectionHeader(doc, 'Technical Skills', y);

  for (const group of skillGroups) {
    y = guard(doc, y, 10);

    // Group label
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    setColor(doc, COLOR.dark);
    doc.text(group.title + ':', ML, y);

    // Inline skill pills
    let px = ML + doc.getTextWidth(group.title + ':') + 3;
    const startY = y;

    for (const item of group.items) {
      const w = doc.getTextWidth(item) + 8;
      if (px + w > PAGE_W - MR) {
        px = ML + doc.getTextWidth(group.title + ':') + 3;
        y += 5.5;
      }
      pill(doc, item, px, y);
      px += w;
    }

    // If pills wrapped, startY was already advanced; reconcile
    y = Math.max(startY, y) + 6;
  }

  return y + 2;
}

/* ─── Experience ─────────────────────────────────────────────────────── */
function drawExperience(doc: jsPDF, y: number): number {
  y = sectionHeader(doc, 'Professional Experience', y);

  for (const job of experience) {
    y = guard(doc, y, 16);

    // Company + period
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    setColor(doc, COLOR.dark);
    doc.text(job.company, ML, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    setColor(doc, COLOR.muted);
    const periodW = doc.getTextWidth(job.period);
    doc.text(job.period, PAGE_W - MR - periodW, y);

    y += 4.5;

    // Role + location
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8.5);
    setColor(doc, COLOR.accent);
    doc.text(job.role, ML, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    setColor(doc, COLOR.muted);
    const locW = doc.getTextWidth(job.location);
    doc.text(job.location, PAGE_W - MR - locW, y);
    y += 5;

    for (const eng of job.engagements) {
      y = guard(doc, y, 12);

      // Engagement name
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      setColor(doc, COLOR.mid);
      let engLabel = eng.name;
      if (eng.context) engLabel += `  —  ${eng.context}`;
      y = wrappedText(doc, engLabel, ML + 3, y, CONTENT_W - 3, 4);
      y += 1;

      // Bullets
      for (const bullet of eng.bullets) {
        y = guard(doc, y, 8);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        setColor(doc, COLOR.mid);
        // bullet dot
        doc.text('•', ML + 5, y);
        y = wrappedText(doc, bullet, ML + 9, y, CONTENT_W - 9, 4);
        y += 1;
      }

      // Tech pills
      y = guard(doc, y, 8);
      let px = ML + 5;
      doc.setFontSize(7);
      for (const t of eng.tech) {
        const w = doc.getTextWidth(t) + 8;
        if (px + w > PAGE_W - MR) {
          px = ML + 5;
          y += 5.5;
        }
        pill(doc, t, px, y);
        px += w;
      }
      y += 7;
    }

    y += 3;
  }

  return y;
}

/* ─── Projects ───────────────────────────────────────────────────────── */
function drawProjects(doc: jsPDF, y: number): number {
  y = sectionHeader(doc, 'Projects', y);

  for (const proj of projects) {
    y = guard(doc, y, 14);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    setColor(doc, COLOR.dark);
    let projTitle = proj.name;
    if (proj.subtitle) projTitle += `  ·  ${proj.subtitle}`;
    y = wrappedText(doc, projTitle, ML, y, CONTENT_W, 4.5);
    y += 1;

    for (const bullet of proj.bullets) {
      y = guard(doc, y, 8);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      setColor(doc, COLOR.mid);
      doc.text('•', ML + 3, y);
      y = wrappedText(doc, bullet, ML + 7, y, CONTENT_W - 7, 4);
      y += 1;
    }

    // Tech pills
    y = guard(doc, y, 8);
    let px = ML + 3;
    doc.setFontSize(7);
    for (const t of proj.tech) {
      const w = doc.getTextWidth(t) + 8;
      if (px + w > PAGE_W - MR) {
        px = ML + 3;
        y += 5.5;
      }
      pill(doc, t, px, y);
      px += w;
    }
    y += 7;

    if (proj.repo) {
      y = guard(doc, y, 6);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      setColor(doc, COLOR.accent);
      doc.textWithLink(proj.repoLabel ?? proj.repo, ML + 3, y, { url: proj.repo });
      y += 5;
    }

    y += 2;
  }

  return y;
}

/* ─── Education ──────────────────────────────────────────────────────── */
function drawEducation(doc: jsPDF, y: number): number {
  y = sectionHeader(doc, 'Education', y);

  for (const edu of education) {
    y = guard(doc, y, 12);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    setColor(doc, COLOR.dark);
    doc.text(edu.degree, ML, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    setColor(doc, COLOR.muted);
    const pW = doc.getTextWidth(edu.period);
    doc.text(edu.period, PAGE_W - MR - pW, y);
    y += 4.5;

    setColor(doc, COLOR.mid);
    doc.text(`${edu.school}  ·  ${edu.location}`, ML, y);
    y += 7;
  }

  return y;
}

/* ─── Certifications ─────────────────────────────────────────────────── */
function drawCertifications(doc: jsPDF, y: number): number {
  y = sectionHeader(doc, 'Certifications', y);

  for (const cert of certifications) {
    y = guard(doc, y, 10);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    setColor(doc, COLOR.dark);
    doc.text(cert.name, ML, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    setColor(doc, COLOR.muted);
    doc.text(cert.issuer, ML, y + 4);

    if (cert.url) {
      setColor(doc, COLOR.accent);
      doc.textWithLink('View credential →', ML + doc.getTextWidth(cert.issuer) + 6, y + 4, {
        url: cert.url,
      });
    }

    y += 10;
  }

  return y;
}

/* ─── Footer ─────────────────────────────────────────────────────────── */
function addFooters(doc: jsPDF) {
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    setColor(doc, COLOR.muted);
    doc.text(profile.name, ML, PAGE_H - 8);
    const pageStr = `Page ${i} of ${totalPages}`;
    const pW = doc.getTextWidth(pageStr);
    doc.text(pageStr, PAGE_W - MR - pW, PAGE_H - 8);
    // bottom accent line
    setFillColor(doc, COLOR.accent);
    doc.rect(0, PAGE_H - 4, PAGE_W, 4, 'F');
  }
}

/* ─── Public API ─────────────────────────────────────────────────────── */

/** Returns a jsPDF instance with the full resume rendered. */
export function buildResumePDF(): jsPDF {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });

  let y = drawHeader(doc);
  y = drawSummary(doc, y);
  y = drawSkills(doc, y);
  y = drawExperience(doc, y);
  y = drawProjects(doc, y);
  y = drawEducation(doc, y);
  drawCertifications(doc, y);
  addFooters(doc);

  return doc;
}

/** Opens the generated PDF in a new browser tab. */
export function viewResumePDF() {
  const doc = buildResumePDF();
  const blob = doc.output('blob');
  const url = URL.createObjectURL(blob);
  window.open(url, '_blank', 'noopener,noreferrer');
}

/** Triggers a file-save download of the generated PDF. */
export function downloadResumePDF() {
  const doc = buildResumePDF();
  doc.save(`${profile.name.replace(/\s+/g, '_')}_Resume.pdf`);
}

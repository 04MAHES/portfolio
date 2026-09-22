import { buildResumeHTML } from './buildResumeHTML';

/** Opens a blob URL in a new tab and returns the URL so the caller can
 *  revoke it later if needed. The browser handles cleanup automatically
 *  when the tab is closed. */
function openBlob(html: string): void {
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * Opens the resume as a styled HTML page in a new browser tab.
 * Reflects the latest data/resume.ts automatically.
 */
export function viewResume(): void {
  openBlob(buildResumeHTML());
}

/**
 * Opens the same resume HTML in a new tab but with window.print()
 * injected on load — the browser's native "Save as PDF" dialog appears
 * immediately, producing output IDENTICAL to the View tab.
 *
 * The user selects "Save as PDF" in the print dialog (or it auto-saves
 * depending on browser settings).  All styling, fonts, colours, and
 * layout are guaranteed to match because it is the exact same HTML
 * rendered by the same engine.
 *
 * Updating data/resume.ts is the only change ever needed for both flows.
 */
export function downloadResumePDF(): void {
  openBlob(buildResumeHTML(true));
}

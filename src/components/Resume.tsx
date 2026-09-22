import { useState } from "react";
import Section from "./Section";
import { profile } from "../data/resume";
import { viewResume } from "../utils/resumeActions";
import { DownloadIcon, ExternalIcon } from "./Icons";

const RESUME_PDF = "Umamaheswar_Raju_Sagiraju_Resume.pdf";

export default function Resume() {
  const [viewLoading, setViewLoading] = useState(false);

  async function handleView() {
    setViewLoading(true);
    await new Promise((r) => setTimeout(r, 20));
    viewResume();
    setViewLoading(false);
  }

  return (
    <Section id="resume" eyebrow="06 / Resume" title="Resume">
      <div className="card flex flex-col gap-6">
        {/* Description */}
        <div>
          <p className="text-sm text-slate-300">
            Full resume for {profile.name}, {profile.title}.
          </p>
          <p className="mt-1 font-mono text-xs text-slate-500">
            {RESUME_PDF}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3">
          {/* View — opens styled HTML preview in new tab */}
          <button
            id="resume-view-btn"
            className="btn-secondary"
            onClick={handleView}
            disabled={viewLoading}
          >
            <ExternalIcon />
            {viewLoading ? "Opening…" : "View Resume"}
          </button>

          {/* Download — serves the PDF directly from /public */}
          <a
            id="resume-download-btn"
            className="btn-primary"
            href={`/${RESUME_PDF}`}
            download={RESUME_PDF}
          >
            <DownloadIcon />
            Download PDF
          </a>
        </div>
      </div>
    </Section>
  );
}

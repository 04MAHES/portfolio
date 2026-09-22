# Umamaheswar Raju Sagiraju — Portfolio

Personal portfolio site. All content is derived from the resume in `public/Umamaheswar_Raju_Sagiraju_Resume.pdf`
and lives in one structured file: `src/data/resume.ts`.

Stack: React 19 + TypeScript + Vite + Tailwind CSS.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build to dist/
npm run preview  # serve the production build
npm run lint
```

## Updating content

Edit `src/data/resume.ts` (profile, skills, experience, projects, certifications, education, nav).
To add a certification, append an object to `certifications` with `name`, `issuer`, and optional `url` / `year`.
To replace the resume PDF, drop the new file in `public/` and update `RESUME_FILE` in the same file.

## Contact form configuration

Submissions are delivered by email to **sumamaheswarraju@gmail.com** through the serverless function in
`api/contact.ts` (Vercel Edge runtime), which calls the [Resend](https://resend.com) API server-side.
The frontend posts to `/api/contact` and never sees the API key.

Set these **server-side** environment variables on the host (Vercel → Project → Settings → Environment Variables):

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | yes | Resend API key (create at https://resend.com/api-keys) |
| `CONTACT_TO_EMAIL` | no | Destination inbox (defaults to `sumamaheswarraju@gmail.com`) |
| `CONTACT_FROM_EMAIL` | no | Verified sender (defaults to `onboarding@resend.dev`, fine for testing) |

Optional frontend override: set `VITE_CONTACT_FORM_ENDPOINT` to use a third-party form service
(e.g. `https://formspree.io/f/<form-id>`) instead of the bundled function.

Notes:
- No API keys or SMTP credentials exist in the client bundle — only the endpoint path.
- `vite dev` does not run the serverless function. Use `vercel dev` (with `.env` populated) to exercise it locally.
- If the endpoint is unreachable or unconfigured, the form shows a "Send it by email instead" link that opens the
  visitor's email client with their subject and message prefilled, so no message is ever lost.

## Deploy

Static build — deploy `dist/` anywhere (Vercel, Netlify, Cloudflare Pages, GitHub Pages).

- Build command: `npm run build`
- Output directory: `dist`

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

Edit `src/data/resume.ts` (profile, skills, experience, projects, education, nav).
To replace the resume PDF, drop the new file in `public/` and update `RESUME_FILE` in the same file.

## Contact form configuration

The form posts to whatever endpoint is set in `VITE_CONTACT_FORM_ENDPOINT`.

1. Create a form endpoint with an email-forwarding service (e.g. [Formspree](https://formspree.io),
   Web3Forms, Getform, Basin) using `sumamaheswarraju@gmail.com` as the destination address.
2. Copy `.env.example` to `.env` and set:

   ```
   VITE_CONTACT_FORM_ENDPOINT=https://formspree.io/f/<your-form-id>
   ```

3. Set the same variable in your host's environment (Vercel / Netlify / Cloudflare Pages) before building.

Notes:
- Only a public form endpoint URL is used in the frontend; no API keys or SMTP credentials are in the client bundle.
- If the variable is unset, the form gracefully falls back to opening the visitor's email client via `mailto:`
  with the entered subject and message prefilled.

## Deploy

Static build — deploy `dist/` anywhere (Vercel, Netlify, Cloudflare Pages, GitHub Pages).

- Build command: `npm run build`
- Output directory: `dist`

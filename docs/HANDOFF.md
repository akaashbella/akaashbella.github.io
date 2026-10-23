# Editing and publishing

## Add a project

Create `src/content/projects/your-slug.md`. Copy the frontmatter structure from an existing project. The filename becomes `/work/your-slug/`. Required metadata includes title, summary, category, period, status, role, technologies, priority, figure, verified date, and source references. Repository and verified live URLs are optional.

The work index and next-project navigation update automatically. Supporting projects with priority greater than 3 appear in the homepage’s additional-work index. The three main homepage features are deliberately art-directed rather than generated from a uniform card template.

Use the eight case-study sections: Abstract, Context, My role, Approach, Implementation, Observations and outcomes, Limitations, References. Separate personal work from team deliverables, and planned features from working ones. Update the verification date and evidence references when reviewing new source material.

## Update a case study

Edit its Markdown file in `src/content/projects/`. The shared case-study layout is `src/pages/work/[slug].astro`. Process diagrams live in `src/components/ProjectDiagram.astro`; add a new figure choice to that component and the collection schema if needed.

Source changes can affect the research article and homepage summaries too. Update all relevant descriptions together. Do not turn planned run counts into completion claims or add performance graphs without validated public results.

## Update the resume

Edit `src/data/profile.ts` for education, teaching, research, skills, and coursework shared across pages. Edit `src/pages/resume.astro` for project bullets and resume-specific detail. The timeline is in `profile.ts`.

Replace `public/resume.pdf` only with a real, verified resume. Remove the phone number with a genuine PDF redaction tool before publishing; a white rectangle alone is insufficient. Verify extracted PDF text and hyperlinks after redaction. Keep the HTML’s project status aligned with authoritative project documentation. The download is the supplied resume with phone redacted and may retain older project-status language; the HTML page explicitly explains the source difference.

Keep the unredacted source outside this public repository, including outside its Git history. Do not commit it even in a temporary branch or under another filename. The original root filename is ignored to prevent accidental re-addition; publication checks allow only `public/resume.pdf` among tracked PDFs and only `resume.pdf` in build output. Any additional PDF needs a publication review before updating that allowlist. See `PUBLICATION-SAFETY.md` for the pending historical cleanup; ordinary deletion does not erase old commits.

Use Print / Save as PDF on `/resume/` for the current HTML version. The print stylesheet suppresses navigation and controls and avoids splitting individual positions where practical.

## Change a homepage feature

Edit the specific investigation in `src/pages/index.astro`. Keep a descriptive case-study link, meaningful caption, and truthful status. The primary feature is a dark research plate; ResearchSeek is a document index; AgBizLogic uses the real team poster. This varied composition is intentional.

## Update the design

Color, typography, gutter, and width tokens are at the start of `src/styles/global.css`. Responsive changes are in the 1100 px and 767 px media queries. Print and reduced-motion rules are at the end. Recheck text and control contrast after color changes.

The contour geometry in `src/components/Contours.astro` is deterministic and illustrative, not survey data. Keep that distinction in captions. Local font licenses are included in `public/fonts/`; asset provenance is in `docs/ASSETS.md`.

## Test locally

Run `npm ci`, then `npm run verify`. Run `npm run preview` and `npm run test:browser` if Python Playwright and Chromium or Chrome are available. `BROWSER_EXECUTABLE` selects a custom browser path. Pull-request CI runs the same browser checks, audits dependencies, and uploads screenshots and a print PDF. Review desktop and mobile screenshots, the research slider at zero and one, mobile-menu keyboard navigation, a no-JavaScript page, and the resume print preview.

Add a new expected route in `scripts/check-site.mjs` when introducing a page and update the browser route list if appropriate. Test nontrivial new math against an independently known example rather than duplicating the implementation.

## Publish

Open a pull request against `main`. The check workflow must pass. After review and merge, the Pages workflow publishes automatically if Settings → Pages uses GitHub Actions. Watch the Actions deployment and verify the actual public URL before announcing it as live. Keep dependency changes and the lockfile together.

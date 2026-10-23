# Implementation validation

Verified October 22, 2026 (Pacific time). Production publication is pending review/merge and GitHub Pages configuration.

## Build and automated checks

The Astro 7.4.2 production build and full verification passed in GitHub Actions using Node 24.21.0 and the committed npm lockfile. [Successful framework-upgrade verification](https://github.com/akaashbella/akaashbella.github.io/actions/runs/39878511451). The latest review checks are available on [PR #1](https://github.com/akaashbella/akaashbella.github.io/pull/1/checks).

- Astro/TypeScript: 22 files checked; zero errors, warnings, or hints.
- Mathematical tests: eight passed, including an independently calculated perturbation example, alpha-zero identity, population variance, fixed-seed noise, and linear scaling.
- Production output: 13 HTML pages, including all required destinations, six project records, and a 404 page.
- Generated-site checks: unique titles/descriptions, landmarks, one H1 per page, internal links and fragment destinations, canonical/Open Graph metadata, sitemap, favicon, social preview, and resume download.
- Dependency audit after upgrading to Astro 7.4.2: zero known vulnerabilities reported. PR CI enforces `npm audit --audit-level=high`.

## Browser review

Python Playwright and Chromium/Chrome checks passed both locally against the CI-built site and on GitHub’s Ubuntu runner. All 12 content routes were tested at 375, 768, 1024, and 1440 pixels: 48 route/viewport combinations.

- No horizontal document overflow, broken images, browser exceptions, console errors, or failed requests.
- Heading hierarchy checked across all content routes.
- Mobile navigation opens by keyboard and touch; Escape closes it and returns focus to the button.
- The native slider supports Home, End, arrow keys, and touch. At zero, baseline and perturbed colors agree; at one, they differ. Numeric values remain available through an accessible disclosure table.
- Reduced motion disables smooth scrolling and image transitions.
- Skip navigation moves focus to the main landmark.
- With JavaScript disabled, navigation, content, and numeric figure values remain available; inactive slider controls stay hidden.
- Resume print layout hides navigation and controls and produces a readable two-page HTML resume.

Screenshots, the browser result JSON, and a print PDF are uploaded as `portfolio-browser-review` in each PR check run. Local copies are in ignored `test-results/`. Desktop/mobile cover, full homepage, research article, and research figure were visually reviewed.

## Content, assets, and privacy

- Education and professional history reconciled to the supplied repository resume. Current project documentation takes precedence for implementation status.
- All six records contain the eight requested case-study sections. Team ownership, private-source limits, planned features, and research runtime status are explicit.
- No measured research results are fabricated; the interactive figure is labeled conceptual.
- Text color pairs checked at WCAG AA contrast: the lowest reviewed text pair is rust on paper at 4.94:1.
- Four local font faces total approximately 132 KB; all static assets total approximately 549 KB. No external font, analytics, or runtime data requests are required.
- Poster dimensions are reserved, its source is credited, and font licenses are bundled.
- Phone number removed from the downloadable supplied PDF using actual redaction; extracted text, phone-link absence, and absence of embedded attachments checked. The unredacted source is removed from current repository contents. Earlier Git versions remain pending an explicitly approved purge; see `PUBLICATION-SAFETY.md`.

These automated and visual checks do not constitute a comprehensive assistive-technology or Core Web Vitals field audit. No production performance score, completed scientific experiment, or live deployment is claimed.

## Publishing

Review and merge PR #1, select **GitHub Actions** under **Settings → Pages → Build and deployment → Source**, and inspect the `Deploy to GitHub Pages` workflow. Approve any required `github-pages` environment review. Verify the public homepage and a direct nested route after deployment. The new portfolio has not been merged or verified in production as part of this review handoff.

# Cascadia Field Notes

Akaash Bella’s static portfolio: a Pacific Northwest field journal for research, software engineering, teaching, and interdisciplinary work. Built with Astro, TypeScript, semantic HTML, and custom CSS. No backend, client framework, runtime GitHub calls, analytics, or paid services.

Production target: <https://akaashbella.github.io>.

## Development

Use Node 24 (Node 22.23.4+ is supported) and npm.

```sh
npm ci
npm run dev
```

The development server listens on port 4321. A restricted environment needs `registry.npmjs.org` available to install packages. Fonts and images are bundled locally; the built site needs no third-party network requests.

## Verification

```sh
npm run verify
```

This runs Astro/TypeScript checking, eight mathematical tests, the production build, and generated-site checks covering all routes, unique titles/descriptions, internal links and fragments, metadata, sitemap, and static assets. The mathematical tests independently check population deviation, known offsets, alpha-zero identity, deterministic noise, linear scaling, invalid input, and zero variance.

For local browser checks, install Python Playwright and provide Chromium or Google Chrome (both Playwright and Chromium are available in the supplied Codex environment). `BROWSER_EXECUTABLE` can select another browser binary. In separate terminals:

```sh
npm run preview
npm run test:browser
```

Browser checks cover all content routes at 375, 768, 1024, and 1440 px; image loading; overflow; JavaScript and request errors; mobile-menu keyboard operation; slider keyboard behavior; reduced motion; skip navigation; print layout; and no-JavaScript access. Screenshots, a print PDF, and a JSON result are written to ignored `test-results/`. Pull-request CI runs the same browser checks and uploads review artifacts. These checks supplement, rather than establish, a comprehensive WCAG audit.

## Structure

```text
src/content/projects/  Markdown case studies with validated frontmatter
src/content.config.ts Astro collection schema
src/data/profile.ts   Education, experience, skills, coursework, and timeline
src/components/       Figures, contours, and reusable content
src/layouts/          Shared HTML shell, metadata, masthead, footer
src/lib/              Framework-independent perturbation mathematics
src/pages/            Static routes and project page generator
src/styles/           Authored design tokens, responsive rules, print styles
public/               Local licensed fonts, original assets, poster, redacted resume
tests/                Mathematical tests
scripts/              Built-site and optional browser checks
docs/                 Editing handoff, content evidence, and asset provenance
```

Every required page is generated as static HTML, including six project case studies, the research article, printable HTML resume, and a GitHub Pages 404 page. `trailingSlash: 'always'` supports direct route loads. The user-site deployment intentionally has no project `base` path.

## Content and privacy

The repository’s `Akaash_Bella_Resume.pdf` is the primary source for education and professional history. Latest public repository documentation takes precedence for project implementation status. In particular, the resume’s ResearchSeek completion language is reconciled to the current Stage 1 README in the HTML version. The downloadable PDF preserves the supplied resume’s content and layout, with the phone number actually redacted; it is not a replacement authored resume.

No private FitTrack source or fitness records are published. No upstream forks are presented as original projects. No scientific results are invented. The research visualization is an isolated example, not an execution of the research repository. The original source resume at the repository root is not copied into the built site.

See [content evidence](docs/SOURCES.md), [asset provenance](docs/ASSETS.md), and the [editing handoff](docs/HANDOFF.md).

## GitHub Pages

1. Review and merge the implementation pull request into `main`.
2. In this repository’s **Settings → Pages → Build and deployment**, select **GitHub Actions** as the source.
3. The `Deploy to GitHub Pages` workflow checks, tests, builds, uploads, and deploys. It also supports manual dispatch. Any required approval on the `github-pages` environment must be approved by an authorized maintainer.
4. Inspect Actions for a successful deployment, then verify <https://akaashbella.github.io> and a direct page such as <https://akaashbella.github.io/research/>.

The workflow follows the current [official Astro GitHub Pages guide](https://docs.astro.build/en/guides/deploy/github/): `actions/checkout@v7`, `withastro/action@v6`, and `actions/deploy-pages@v5`, as documented when this implementation was prepared. Pull requests run `npm run verify` without deployment permissions. Production deployment runs only from `main` pushes or an authorized manual dispatch.

Do not add a CNAME unless configuring a real custom domain. Do not commit generated `dist/`, dependencies, credentials, or private project data.

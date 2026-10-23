# Asset provenance

## Original work for this portfolio

The contour paths in `src/components/Contours.astro`, CSS figure linework, process diagrams, masthead treatment, `public/favicon.svg`, `public/images/monogram.svg`, and `public/images/social.png` were authored for Cascadia Field Notes. Contours are deterministic abstract curves, not geographic elevation data. Coordinates identify Portland approximately; they do not make the contours a real survey.

The social preview is an original 1200 × 630 composition using the same typography, colors, and contour construction. There is no stock coding photography or external illustration library.

## Fonts

Locally bundled Latin subsets from the Google Fonts repository:

- Newsreader regular and italic, weight 400, optical size 48: `google/fonts/ofl/newsreader`. Designed by Production Type.
- Source Sans 3, variable weight: `google/fonts/ofl/sourcesans3`. Adobe.
- IBM Plex Mono regular: `google/fonts/ofl/ibmplexmono`. IBM.

All use the SIL Open Font License 1.1. Full licenses are included beside the font files under `public/fonts/`. Subsets preserve names and license records. WOFF compression is used for broad browser support with no external requests. Only the main display face is preloaded; all faces use `font-display: swap` and system fallbacks.

## AgBizLogic poster

`public/images/agbiz-poster.webp` is a resized WebP derivative of:

<https://raw.githubusercontent.com/akaashbella/agbizlogic-capstone-page/main/assets/2025.ExpoPoster.001A.png>

Original dimensions: 2500 × 1875. Local derivative: 1600 × 1200. The project README identifies the material as property of Oregon State University and the AgBizLogic team, available for educational purposes. This educational portfolio reuse documents Akaash’s participation in that team. Captions retain attribution. The case study links to the original; it is not represented as a solely authored portfolio asset or relicensed.

## Resume

`public/resume.pdf` derives from the owner-supplied resume reviewed during implementation. The unredacted source must remain outside the public repository. The phone number was removed using PyMuPDF redaction and garbage collection, not merely visually covered. Remaining text and layout are the supplied document, so ResearchSeek wording can differ from the source-reconciled HTML resume. Do not replace it with an unredacted copy. This is the only currently approved PDF path; additional PDFs require an explicit publication review and allowlist update.

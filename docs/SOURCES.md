# Content evidence and editorial decisions

Reviewed October 22, 2026. Source repositories were inspected read-only. Their code, tests, datasets, and operational jobs were not executed or modified.

| Content | Primary evidence | Decision |
| --- | --- | --- |
| Education, experience, coursework, awards | `Akaash_Bella_Resume.pdf`, found on remote `main` after the initial local checkout | Follow the supplied professional history; omit phone number. |
| CNN research | `alpha-sweep-training/README.md`, `docs/scientific-specification.md`, `src/alpha_sweep_training/perturbation.py` | Nine source steps do not demonstrate runtime correctness. No scientific findings, verified run completions, or performance curves. |
| ResearchSeek | README, `docs/architecture.md`, `cpp/bindings.cpp`, repository tree | Stage 1 foundation. Indexing, embeddings, retrieval, and benchmarks remain planned, overriding the resume’s completion claims. |
| AgBizLogic | README, `index.html`, original Expo poster | Akaash is group lead. Four-person team deliverables; Wizard-of-Oz prototype and proposal, not deployed production AI. Report published qualitative findings with attribution and no inferred significance. |
| Mauka Energy | README and `index.html`; linked presentation identified | Team commercialization strategy, including NPV/payback work described in resume. Market and revenue projections are assumptions, not realized results. Routing algorithm and IP are not claimed as Akaash’s invention. |
| Spotify IndicLID | README, `main.py`, repository file tree | Public-source pipeline architecture and documented thresholds. No claimed benchmark or runtime verification. IndicLID is external AI4Bharat work. |
| FitTrack | Owner-supplied portfolio specification; public metadata reports a private repository | Publish only the supplied purpose. No private source, data models, authentication, integrations, fitness records, or unverified deployment claims. |
| LinkedIn | Exact link in Mauka Energy’s public `index.html` | Use `https://www.linkedin.com/in/akaash-bella-613865230/`. |
| Other repositories | GitHub metadata and available README/tree material | LearnML, SMTPulse, claw-code, and speedscore-test are forks. Identify learning and external projects clearly; no unsupported contribution claim. |
| Deployment actions | Official Astro guide source, `withastro/docs/main/src/content/docs/en/guides/deploy/github.mdx` | Root user-site `site`, no `base`, official Astro action and Pages deploy action. |

Canonical repository links appear in each case study’s frontmatter. No project API calls run in the browser. Source-review dates describe this editorial review, not guarantees about future repository changes.

The public original resume was added remotely after the environment’s initial checkout. It is preserved in the repository; only the redacted copy under `public/` is included in the website build. HTML project status is reconciled as described above. A future update should revise the supplied resume itself if the owner wants all downloadable wording to match current implementation status.

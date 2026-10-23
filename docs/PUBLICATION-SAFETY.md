# Publication-safety review and proposed history cleanup

Status: current-content removal is authorized and implemented through ordinary deletion commits. Historical purge is **not performed** and requires the owner’s explicit approval. PR #1 remains unmerged. No force-push, rebase, filter operation, or history replacement is part of this review.

## Findings

The unredacted root PDF was introduced by commit `7b811455e6ad38ed65de778154af442aa7839bbb` and inherited by the portfolio branch. Deleting it at a branch tip does not remove it from earlier commits, raw commit URLs, cached views, pull-request refs, clones, or previously generated deployment artifacts.

| Item | Verified evidence |
| --- | --- |
| Sensitive source path | `Akaash_Bella_Resume.pdf` at the repository root |
| Sensitive Git blob | `e477245b1e7934632016958a97db204cba4f1182` |
| Local history inspected before deletion | Nine commits reachable from the reviewed refs; eight contained the source blob |
| Historical paths for that blob | Only `Akaash_Bella_Resume.pdf` found by inspecting every reviewed commit tree |
| Remote branches reviewed | `main`, `feat/cascadia-field-notes` |
| Remote tags | None returned by GitHub’s matching-refs API at review time |
| GitHub-managed PR refs observed | `refs/pull/1/head`, `refs/pull/1/merge` |
| GitHub forks reported | Zero at review time; this cannot rule out prior downloads or private/local clones |
| Retained redacted PDF Git blob | `82c411682be5091724b26880570a5d852c799b8a` |
| Retained redacted PDF SHA-256 | `96e8d4d80f089cebf255adff0694b3889f8a90f8a3847ac22cbeb8368ce13057` |

The redacted PDF was rechecked for phone patterns, `tel:` hyperlinks, and embedded attachments; none were found. Its bytes remain unchanged. The deployment workflow is unchanged. Documentation and the HTML resume now refer to the privately supplied source rather than a tracked original. Temporary unredacted working copies created during implementation were removed; existing Git objects remain deliberately untouched until approval.

An ordinary deletion commit removes the source from current `main` before the portfolio PR is merged. PR #1 also removes it from the feature tip. This does not constitute a history purge. Any currently served legacy Pages copy must finish redeploying before its direct URL ceases serving the file; historical deployments and caches need separate review.

## Prevention included in this PR

- Ignore the original root filename. Keep unredacted sources outside the repository.
- Before verification/build, reject unreviewed tracked/public PDF paths and the known sensitive blob even if renamed. Only `public/resume.pdf` is currently approved.
- After building, require that `resume.pdf` is the only PDF in the output.
- Keep the redacted download, site behavior, and deployment workflow intact.

These checks inspect current content, not historical commits. They must not be reported as proof that history has been purged.

## Safe purge plan — approval required before execution

1. **Freeze writes and record scope.** Coordinate a short maintenance window. Re-inventory all remote branches, tags, PR refs, and any new paths/versions of the source. Record exact branch SHAs. The intended rewrite scope is this repository’s `main` and `feat/cascadia-field-notes` histories, plus any subsequently identified affected refs only after scope review. Do not modify other repositories. Decide PR handling before rewriting: GitHub recommends merging or closing open PRs first. Do not merge or close PR #1 without authorization; if it stays open, expect changed commits and potentially invalidated review comments or a replacement PR.

2. **Protect the finished implementation.** Keep a restricted offline mirror/bundle outside the public repository; this backup still contains sensitive data and must never become a public backup branch, release, artifact, or attachment. Separately archive the latest sanitized feature tree, lockfile, redacted PDF, and deployment workflow. Record both current branch tree SHAs, the redacted PDF blob/SHA-256 above, and the workflow blob. The sanitized feature tree contains the complete portfolio, not just the initial homepage. Do not use an old checkout or an initial commit as the portfolio recovery source.

3. **Filter a disposable fresh full mirror after approval.** Use authenticated Git and a current `git-filter-repo` with `--sensitive-data-removal` support (version 2.47 or newer). For the single source path found so far, the proposed command, **not executed during this review**, is:

   ```sh
   git filter-repo --sensitive-data-removal --invert-paths --path Akaash_Bella_Resume.pdf
   ```

   Apply it in the disposable mirror, covering all affected history. If the fresh inventory discovers another source path or version, review that expanded scope before proceeding. Do not use a broad resume/PDF glob: `public/resume.pdf` must survive. Retain the tool’s commit map, first-changed-commit report, and changed-ref report privately for verification and a GitHub Support request. The tool may remove the `origin` remote; restore only the verified repository URL when publishing the approved rewrite.

4. **Prove that the portfolio survives before touching remote refs.** The current tips already omit the source, so the full tree SHA at each branch tip must be identical before and after filtering. Commit SHAs will change, and empty source-add/delete commits may disappear. Confirm that the source path and sensitive blob are absent from all rewritten reachable refs, while the redacted PDF and workflow hashes match their saved values. Build the sanitized feature checkout and run `npm ci`, the dependency audit, `npm run verify`, and browser checks. Inspect the work/research/resume routes and all 13 generated pages. Abort if any implementation content is lost or validation fails.

5. **Publish only the approved rewritten branches.** Recheck remote SHAs and branch protection. Update `main` and the feature branch with individually scoped, explicit `--force-with-lease` operations against the previously reviewed SHAs, rather than an unrestricted `git push --mirror --force`. Abort and reassess if a lease fails. Any required temporary protection change needs authorization and restoration. No force-push is authorized by this document alone.

6. **Handle GitHub-held references and old artifacts.** GitHub-managed `refs/pull/*` cannot be cleaned by an ordinary branch push. Follow GitHub’s sensitive-data-removal process and ask GitHub Support to dereference affected PR refs/cached views and garbage-collect the sensitive objects, subject to their eligibility rules. Include the repository, affected refs, source blob ID, and filter report; do not paste the phone number into public issues or comments. Review legacy Pages deployments and artifacts that could contain the original root PDF and remove only affected copies. Preserve the sanitized portfolio review artifacts and redacted download. A branch rewrite alone is not evidence these other copies are gone.

7. **Verify and prevent recontamination.** Fresh-clone after remote cleanup; inspect all advertised refs and validate again. Check current repository/raw-file URLs and the served Pages source-PDF URL without claiming cached copies are erased prematurely. Have collaborators discard or privately quarantine old clones and re-clone; do not merge/push old history back. Recreate PR #1 only if necessary and authorized, preserving the complete clean feature branch and rerunning review/CI. Public downloads and copies outside the owner’s control cannot be guaranteed erased. Dispose of sensitive backups according to the owner’s retention decision once recovery is no longer needed.

## Approval boundary

The current-content deletion and PR fixes are reviewable now. Approval is still required for the history rewrite and its targeted force-with-lease pushes. PR merge/closure/replacement, protection changes, Support outreach, and deletion of old deployments/artifacts are separate actions to authorize as needed. Do not run the proposed purge merely because the ordinary deletion commit has been approved or merged.

Reference: [GitHub — Removing sensitive data from a repository](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository).

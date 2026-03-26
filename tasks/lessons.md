# Lessons

- Add preventive lessons only after explicit user correction.
- For GitHub Pages workflows, keep `actions/upload-pages-artifact` and `actions/deploy-pages` on current major versions to avoid indirect deprecations from `upload-artifact@v3`.
- Keep `README.md` synchronized with current runtime modules and dynamic data sources (`js/*` and `data/*`) whenever architecture changes.
- For smooth-scroll navigation highlights, keep clicked menu state locked until transition ends to avoid temporary wrong active-link feedback.

# Validation — current prototype

- JavaScript syntax: `node --check app.js` and `node --check content.js` passed.
- All four locales contain 169 nonempty copy entries; no missing translation keys against English.
- Playwright/Chromium: 92 functional and layout checks passed, including 80 route/language/layout combinations, narrow screens, navigation, filters, keyboard tabs, catalogue references, required inputs, product preselection, locale changes preserving form data, safe rendering, local enquiry export and browser history.
- Tested desktop width 1440 px, mobile width 390 px and selected German/Arabic screens at 320 px. No horizontal document overflow in checked routes.
- Axe-core: 20 automated WCAG A/AA page checks passed across all ten screens (English desktop and Arabic mobile). Reported contrast and accessible-link-name issues were corrected. This is automated evidence, not a claim of exhaustive accessibility conformance.
- Original catalogue files and image resources served successfully by the local static server. Screenshots wait for all images to decode, including lazy images.
- Optional `file://` browser navigation check was skipped: the cloud browser reports `ERR_BLOCKED_BY_ADMINISTRATOR`. HTTP functionality is verified. The site's portable structure uses classic local scripts and relative assets, with no fetch/import/build dependency. Direct opening on a user's own desktop browser is not claimed as cloud-tested.
- Form submission to a sales backend, live publication, search engine indexing and native-language review are not performed.

## Reproduce checks

With a local static server running from this directory and Playwright/Chromium available:

```sh
node tools/smoke-test.cjs
```

For the accessibility suite, install axe-core outside this checkout and set `BIOVENT_AXE_PATH` to its `axe.min.js` path, then run:

```sh
node tools/accessibility-test.cjs
```

`BIOVENT_CHROMIUM` may override the Chromium executable. Capture screenshots with `node tools/capture-previews.cjs`; `BIOVENT_PREVIEW_DIR` can override the output folder.

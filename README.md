# Website for CBT
[![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/4e402f2f/cbt-web)

This source folder holds the source code for Website for Community Builder Toolbox, Inc.

## The site is plain static HTML

The 2026 redesign has no build step. Netlify serves the files as they are.

```
index.html            English page (/)
zh/index.html         Chinese page (/zh/)
assets/site/site.css  Styles for both pages ("Community Editorial" design)
assets/site/site.js   Phone menu toggle; the pages work without it
assets/img/site/      Photos from past ZaiGeZaiGu events
files/                W-9 and 501(c)(3) letter PDFs
_redirects            Netlify redirects (old /index_zh.html goes to /zh/)
```

Both pages have the same sections: communities, for builders, for sponsors, toolbox, join.

The design uses warm white paper, near-black text and one tomato red (`--red` in `site.css`).
Headings use the Source Serif 4 font (Noto Serif SC on the Chinese page). Body text uses Inter.
Check new text colors against the paper and the red panels for a contrast ratio of 4.5:1 or more.
When you change one page, change the other page too.

To preview, run a static server in this folder and open http://localhost:8000:

```bash
python3 -m http.server 8000
```

The old Argon/Bootstrap files (`assets/aragon`, `assets/vendor`, `build`, `custom`, `package.json`) are no longer used by the pages.

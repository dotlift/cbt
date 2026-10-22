// Copy assets/site/site.css into the <style id="site-css"> block of index.html and zh/index.html.
//
// The pages inline the whole stylesheet, so the browser can draw the page as soon as the HTML
// arrives, without a second request. site.css stays the file you edit.
//
// Usage (no packages needed):
//   node tools/inline-css.js          rewrite the two pages
//   node tools/inline-css.js --check  exit 1 if a page is out of date

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const pages = ['index.html', 'zh/index.html'];

// A small, safe minifier: drop comments, collapse white space, and drop spaces next to { } ; ,
// It keeps the space before ":" because ".band :focus-visible" needs it.
const css = fs.readFileSync(path.join(root, 'assets/site/site.css'), 'utf8')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{};,])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim();

let stale = false;
for (const page of pages) {
  const file = path.join(root, page);
  const html = fs.readFileSync(file, 'utf8');
  const out = html.replace(/(<style id="site-css">)[\s\S]*?(<\/style>)/, `$1${css}$2`);
  if (out === html) continue;
  stale = true;
  if (!process.argv.includes('--check')) {
    fs.writeFileSync(file, out);
    console.log(`updated ${page} (${css.length} bytes of CSS)`);
  } else {
    console.log(`${page} is out of date: run node tools/inline-css.js`);
  }
}
if (stale && process.argv.includes('--check')) process.exit(1);

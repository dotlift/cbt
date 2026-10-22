// Make the responsive AVIF and WebP copies of the photos in assets/img/site/.
//
// The pages use these copies in <picture> elements. The original JPEG files stay as
// the fallback for old browsers. This script only resizes and re-encodes; it never edits a photo.
//
// Usage:
//   npm i --no-save sharp
//   node tools/images.js
//
// Run it again after you add or replace a photo, and add the photo to the list below.
// Then update the srcset attributes in index.html and zh/index.html.

const sharp = require('sharp');
const path = require('path');

const dir = path.join(__dirname, '..', 'assets', 'img', 'site');

// name: [widths]. A width that is larger than the original is skipped.
const photos = {
  'zgzg-2018-gala-cast': [480, 750, 960, 1280, 1800],
  'zgzg-2022-singer-cast': [480, 750, 1080, 1600],
  'zgzg-2022-gala-dance': [480, 750, 1080],
  'zgzg-2022-fair': [480, 750, 1080],
  'smile-2024-qixi-poster': [400, 675],
  'startup-band-2024-poster': [400, 600],
  'googirl-youtube-channel': [480, 750, 1000],
  'smile-wechat-qr': [176, 264],
};

(async () => {
  for (const [name, widths] of Object.entries(photos)) {
    const src = path.join(dir, name + '.jpg');
    const meta = await sharp(src).metadata();
    for (const w of widths) {
      if (w > meta.width) continue;
      const img = () => sharp(src).rotate().resize({width: w});
      // The QR code needs sharp edges, so it gets a higher quality.
      const qr = name.includes('-qr');
      const avif = await img().avif({quality: qr ? 80 : 50, effort: 6}).toFile(path.join(dir, `${name}-${w}.avif`));
      const webp = await img().webp({quality: qr ? 90 : 72, effort: 6}).toFile(path.join(dir, `${name}-${w}.webp`));
      console.log(`${name}-${w}: ${w}x${avif.height}  avif ${(avif.size / 1024).toFixed(1)} KB  webp ${(webp.size / 1024).toFixed(1)} KB`);
    }
  }
  // The logo in the header (44 px) and the footer (40 px), for 2x and 3x screens.
  const logo = path.join(__dirname, '..', 'assets', 'img', 'brand', 'cbt-logo.png');
  for (const w of [88, 132]) {
    const out = await sharp(logo).resize({width: w}).webp({quality: 90, effort: 6})
        .toFile(path.join(path.dirname(logo), `cbt-logo-${w}.webp`));
    console.log(`cbt-logo-${w}.webp: ${(out.size / 1024).toFixed(1)} KB`);
  }
  // The share image for Open Graph and Twitter cards: 1200x630, cut from the hero photo.
  const og = await sharp(path.join(dir, 'zgzg-2018-gala-cast.jpg'))
      .resize({width: 1200, height: 630, fit: 'cover', position: 'centre'})
      .jpeg({quality: 82, mozjpeg: true})
      .toFile(path.join(dir, 'og-image-1200x630.jpg'));
  console.log(`og-image-1200x630.jpg: ${(og.size / 1024).toFixed(1)} KB`);
})();

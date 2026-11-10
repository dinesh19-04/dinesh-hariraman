const fs = require('fs');
const path = require('path');
const { chromium } = require('/usr/local/share/bun-global/node_modules/playwright-core');

const publicDir = path.resolve(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 1. Standard SVG Icon Definition (Vector Favicon & Base for Standard Icons)
const standardSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <radialGradient id="bgGlow" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#020617" />
    </radialGradient>

    <linearGradient id="neonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00f2fe" />
      <stop offset="45%" stop-color="#06b6d4" />
      <stop offset="100%" stop-color="#6366f1" />
    </linearGradient>

    <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.8" />
      <stop offset="50%" stop-color="#818cf8" stop-opacity="0.4" />
      <stop offset="100%" stop-color="#06b6d4" stop-opacity="0.2" />
    </linearGradient>

    <linearGradient id="dotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="100%" stop-color="#06b6d4" />
    </linearGradient>

    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="12" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Squircle Base -->
  <rect x="12" y="12" width="488" height="488" rx="112" fill="url(#bgGlow)" />
  <rect x="12" y="12" width="488" height="488" rx="112" fill="none" stroke="url(#borderGrad)" stroke-width="10" />

  <!-- Subtle Ambient Circuit Track Accent -->
  <path d="M 60 180 L 100 180 L 130 150 M 452 332 L 412 332 L 382 362" stroke="#1e293b" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.6" />
  <circle cx="60" cy="180" r="4" fill="#06b6d4" opacity="0.6" />
  <circle cx="452" cy="332" r="4" fill="#6366f1" opacity="0.6" />

  <!-- Monogram "DH" -->
  <g id="monogram" transform="translate(6, 4)">
    <!-- Letter 'D' -->
    <!-- Outer path of D and inner cutout counter combined using evenodd fill rule -->
    <path fill-rule="evenodd" fill="url(#neonGrad)" d="
      M 112 144
      L 204 144
      C 252 144, 278 174, 278 256
      C 278 338, 252 368, 204 368
      L 112 368
      Z
      M 166 196
      L 198 196
      C 224 196, 230 216, 230 256
      C 230 296, 224 316, 198 316
      L 166 316
      Z" />

    <!-- Letter 'H' -->
    <path fill="url(#neonGrad)" d="
      M 302 144
      L 352 144
      L 352 230
      L 396 230
      L 396 144
      L 446 144
      L 446 368
      L 396 368
      L 396 280
      L 352 280
      L 352 368
      L 302 368
      Z" />

    <!-- Intelligent Node Glow Dot above H -->
    <circle cx="421" cy="116" r="13" fill="url(#dotGrad)" filter="url(#glow)" />
    <circle cx="421" cy="116" r="22" fill="none" stroke="#00f2fe" stroke-width="2.5" opacity="0.4" />
    <line x1="421" y1="129" x2="421" y2="144" stroke="#06b6d4" stroke-width="3" stroke-linecap="round" opacity="0.7" />
  </g>
</svg>`;

// 2. Maskable Icon SVG Definition (Safe-Zone Padded, Full-Bleed 512x512 Background)
const maskableSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <radialGradient id="mBgGlow" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#020617" />
    </radialGradient>

    <linearGradient id="mNeonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00f2fe" />
      <stop offset="45%" stop-color="#06b6d4" />
      <stop offset="100%" stop-color="#6366f1" />
    </linearGradient>

    <linearGradient id="mBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.8" />
      <stop offset="50%" stop-color="#818cf8" stop-opacity="0.4" />
      <stop offset="100%" stop-color="#06b6d4" stop-opacity="0.2" />
    </linearGradient>

    <linearGradient id="mDotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="100%" stop-color="#06b6d4" />
    </linearGradient>

    <filter id="mGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="12" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Full-Bleed Edge-to-Edge Solid Background (Required for Android/Chrome Masking) -->
  <rect width="512" height="512" fill="url(#mBgGlow)" />

  <!-- Central Safe Zone Container (Inside central 80% circle, safe zone = 410px diameter) -->
  <g transform="translate(256, 256) scale(0.72) translate(-256, -256)">
    <!-- Inner Squircle Frame -->
    <rect x="20" y="20" width="472" height="472" rx="104" fill="#090d16" />
    <rect x="20" y="20" width="472" height="472" rx="104" fill="none" stroke="url(#mBorderGrad)" stroke-width="12" />

    <!-- Ambient Circuit Track Accent -->
    <path d="M 60 180 L 100 180 L 130 150 M 452 332 L 412 332 L 382 362" stroke="#1e293b" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.8" />
    <circle cx="60" cy="180" r="5" fill="#06b6d4" />
    <circle cx="452" cy="332" r="5" fill="#6366f1" />

    <!-- Monogram "DH" -->
    <g transform="translate(6, 4)">
      <!-- Letter 'D' -->
      <path fill-rule="evenodd" fill="url(#mNeonGrad)" d="
        M 112 144
        L 204 144
        C 252 144, 278 174, 278 256
        C 278 338, 252 368, 204 368
        L 112 368
        Z
        M 166 196
        L 198 196
        C 224 196, 230 216, 230 256
        C 230 296, 224 316, 198 316
        L 166 316
        Z" />

      <!-- Letter 'H' -->
      <path fill="url(#mNeonGrad)" d="
        M 302 144
        L 352 144
        L 352 230
        L 396 230
        L 396 144
        L 446 144
        L 446 368
        L 396 368
        L 396 280
        L 352 280
        L 352 368
        L 302 368
        Z" />

      <!-- Intelligent Node Glow Dot above H -->
      <circle cx="421" cy="116" r="14" fill="url(#mDotGrad)" filter="url(#mGlow)" />
      <circle cx="421" cy="116" r="24" fill="none" stroke="#00f2fe" stroke-width="3" opacity="0.4" />
      <line x1="421" y1="130" x2="421" y2="144" stroke="#06b6d4" stroke-width="3" stroke-linecap="round" opacity="0.8" />
    </g>
  </g>
</svg>`;

// ICO Builder function (supports multiple resolution PNGs inside standard ICO container)
function createIco(images) {
  const count = images.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  let offset = headerSize + dirEntrySize * count;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // icon type
  header.writeUInt16LE(count, 4); // count of images

  const dirEntries = [];
  const buffers = [];

  for (const img of images) {
    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0);
    entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1);
    entry.writeUInt8(0, 2); // palette size
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(img.buffer.length, 8); // image size
    entry.writeUInt32LE(offset, 12); // image offset

    dirEntries.push(entry);
    buffers.push(img.buffer);
    offset += img.buffer.length;
  }

  return Buffer.concat([header, ...dirEntries, ...buffers]);
}

async function generateAll() {
  console.log('Writing public/favicon.svg...');
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), standardSvg.trim());

  console.log('Launching headless Chromium to render raster icons...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ deviceScaleFactor: 1 });
  const page = await context.newPage();

  async function renderSvgToPng(svgContent, width, height) {
    const html = `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body, html { width: ${width}px; height: ${height}px; overflow: hidden; background: transparent; }
          svg { width: 100%; height: 100%; display: block; }
        </style>
      </head>
      <body>${svgContent}</body>
    </html>`;

    await page.setViewportSize({ width, height });
    await page.setContent(html, { waitUntil: 'load' });
    return await page.screenshot({ type: 'png', omitBackground: true });
  }

  // 1. apple-touch-icon.png (180x180)
  console.log('Rendering apple-touch-icon.png (180x180)...');
  const appleTouchBuffer = await renderSvgToPng(standardSvg, 180, 180);
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), appleTouchBuffer);

  // 2. icon-192.png (192x192)
  console.log('Rendering icon-192.png (192x192)...');
  const icon192Buffer = await renderSvgToPng(standardSvg, 192, 192);
  fs.writeFileSync(path.join(publicDir, 'icon-192.png'), icon192Buffer);

  // 3. icon-512.png (512x512)
  console.log('Rendering icon-512.png (512x512)...');
  const icon512Buffer = await renderSvgToPng(standardSvg, 512, 512);
  fs.writeFileSync(path.join(publicDir, 'icon-512.png'), icon512Buffer);

  // 4. icon-maskable-512.png (512x512 with safe-zone)
  console.log('Rendering icon-maskable-512.png (512x512)...');
  const iconMaskableBuffer = await renderSvgToPng(maskableSvg, 512, 512);
  fs.writeFileSync(path.join(publicDir, 'icon-maskable-512.png'), iconMaskableBuffer);

  // 5. favicon.ico (multi-resolution container with 16x16, 32x32, 48x48)
  console.log('Rendering favicon sizes for favicon.ico...');
  const ico16 = await renderSvgToPng(standardSvg, 16, 16);
  const ico32 = await renderSvgToPng(standardSvg, 32, 32);
  const ico48 = await renderSvgToPng(standardSvg, 48, 48);

  const icoBuffer = createIco([
    { width: 16, height: 16, buffer: ico16 },
    { width: 32, height: 32, buffer: ico32 },
    { width: 48, height: 48, buffer: ico48 },
  ]);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);

  await browser.close();
  console.log('All favicon & PWA icon assets generated successfully in /public!');
}

generateAll().catch((err) => {
  console.error('Error generating icons:', err);
  process.exit(1);
});

const _JimpPkg = require('jimp');
let Jimp = _JimpPkg.Jimp || _JimpPkg.default || _JimpPkg;
const path = require('path');
const fs = require('fs');

const folder = path.join(__dirname, '..', 'assets', 'partner-logos');

// files to process (only the raster ones we added)
const files = [
  'acronis.png',
  'adobe.png',
  'aruba.png',
  'commvault.png',
  'eset.png',
  'hikvision.png',
  'sophos.png',
];

async function processFile(file) {
  const p = path.join(folder, file);
  if (!fs.existsSync(p)) {
    console.warn('missing', file);
    return;
  }

  try {
    const img = await Jimp.read(p);

    // ensure alpha channel
    img.rgba(true);

    // Autocrop uniform borders
    img.autocrop({ tolerance: 0.01, cropOnlyFrames: false });

    // Resize: keep width up to 600 and height up to 200, preserving aspect
    const maxW = 600;
    const maxH = 200;
    const { width, height } = img.bitmap;
    let w = width;
    let h = height;
    const ratio = Math.min(maxW / w, maxH / h, 1);
    if (ratio < 1) {
      w = Math.round(w * ratio);
      h = Math.round(h * ratio);
      img.resize(w, h, Jimp.RESIZE_BICUBIC);
    }

    // Add small padding to center on a transparent canvas for consistency
    const pad = 24;
    const outW = w + pad * 2;
    const outH = h + pad * 2;
    const out = new Jimp(outW, outH, 0x00000000);
    out.composite(img, pad, pad);

    await out.writeAsync(p);
    console.log('processed', file, '->', outW + 'x' + outH);
  } catch (err) {
    console.error('error processing', file, err.message);
  }
}

(async () => {
  for (const f of files) {
    // try with lowercase and original
    await processFile(f);
  }
  console.log('done');
})();

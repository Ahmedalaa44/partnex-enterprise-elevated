const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const folder = path.join(__dirname, "..", "assets", "partner-logos");
const files = [
  "acronis.png",
  "adobe.png",
  "aruba.png",
  "commvault.png",
  "eset.png",
  "hikvision.png",
  "sophos.png",
];

async function processFile(file) {
  const p = path.join(folder, file);
  if (!fs.existsSync(p)) return console.warn("missing", file);

  try {
    const image = sharp(p, { animated: false });
    // trim using top-left pixel (works if top-left is transparent or background color)
    let buf = await image.toBuffer();
    // apply trim and resize
    let meta = await sharp(buf).metadata();
    let pipeline = sharp(buf).trim();

    // compute resize preserving aspect ratio with max constraints
    const maxW = 600;
    const maxH = 200;
    // after trim get metadata
    const trimmedBuf = await pipeline.toBuffer();
    const trimmedMeta = await sharp(trimmedBuf).metadata();
    const w = trimmedMeta.width || maxW;
    const h = trimmedMeta.height || maxH;
    const ratio = Math.min(maxW / w, maxH / h, 1);
    const newW = Math.round(w * ratio);
    const newH = Math.round(h * ratio);

    // resize and add padding
    const pad = 24;
    const outW = newW + pad * 2;
    const outH = newH + pad * 2;

    await sharp(trimmedBuf)
      .resize(newW, newH, { fit: "contain" })
      .extend({
        top: pad,
        bottom: pad,
        left: pad,
        right: pad,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toFile(p);

    console.log("processed", file, "->", outW + "x" + outH);
  } catch (err) {
    console.error("error", file, err.message);
  }
}

(async () => {
  for (const f of files) await processFile(f);
  console.log("done");
})();

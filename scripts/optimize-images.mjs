import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.join(__dirname, '../src/assets');
const publicDir = path.join(__dirname, '../public');

const QUALITY = 80;
const WEBP_QUALITY = 75;
const AVIF_QUALITY = 60;

async function optimizeImage(inputPath, outputDir) {
  try {
    const filename = path.parse(inputPath).name;
    const ext = path.parse(inputPath).ext.toLowerCase();

    // Skip SVGs - they're already optimized
    if (ext === '.svg') {
      console.log(`✓ Skipping SVG: ${filename}`);
      return;
    }

    const image = sharp(inputPath);
    const metadata = await image.metadata();

    // Create WebP version
    await image
      .toFormat('webp', { quality: WEBP_QUALITY })
      .toFile(path.join(outputDir, `${filename}.webp`));
    console.log(`✓ Created WebP: ${filename}.webp`);

    // Create AVIF version (more aggressively compressed)
    await sharp(inputPath)
      .toFormat('avif', { quality: AVIF_QUALITY })
      .toFile(path.join(outputDir, `${filename}.avif`));
    console.log(`✓ Created AVIF: ${filename}.avif`);

    // Optimize original JPG/PNG
    if (ext === '.jpg' || ext === '.jpeg') {
      await sharp(inputPath)
        .jpeg({ quality: QUALITY, progressive: true })
        .toFile(path.join(outputDir, `${filename}-optimized.jpg`));
      console.log(`✓ Optimized JPG: ${filename}-optimized.jpg`);
    } else if (ext === '.png') {
      await sharp(inputPath)
        .png({ compressionLevel: 9 })
        .toFile(path.join(outputDir, `${filename}-optimized.png`));
      console.log(`✓ Optimized PNG: ${filename}-optimized.png`);
    }
  } catch (error) {
    console.error(`✗ Error processing ${inputPath}:`, error.message);
  }
}

async function processDirectory(dir) {
  if (!fs.existsSync(dir)) {
    console.log(`Directory not found: ${dir}`);
    return;
  }

  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Recursively process subdirectories
      await processDirectory(filePath);
    } else if (/\.(jpg|jpeg|png|gif)$/i.test(file)) {
      await optimizeImage(filePath, dir);
    }
  }
}

async function main() {
  console.log('🖼️  Starting image optimization...\n');
  
  console.log('Processing src/assets directory...');
  await processDirectory(assetsDir);
  
  console.log('\nProcessing public directory...');
  await processDirectory(publicDir);
  
  console.log('\n✅ Image optimization complete!');
  console.log('\nNote: Use .webp for modern browsers, .avif for cutting-edge browsers,');
  console.log('and the original format as fallback.');
}

main().catch(console.error);

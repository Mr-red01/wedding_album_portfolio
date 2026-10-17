import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const sourceDir = path.join(rootDir, 'wed_photos', 'one_sec');
const targetDir = path.join(rootDir, 'public', 'images', 'one_sec');
const galleryDir = path.join(rootDir, 'public', 'images', 'gallery');
const outputFile = path.join(rootDir, 'src', 'data', 'userPhotos.json');

// Ensure target directory exists
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// User photo metadata mapping
const USER_PHOTO_METADATA = {
  'Casamento Karen e christofer.jpg': {
    title: 'AARAV & ANJALI — ETERNAL VOWS',
    displayTitle: 'BP_07820_VOWS.JPG',
    category: 'wedding-cam2',
    categories: ['wedding-cam2', 'best-photos'],
    alt: 'Aarav and Anjali holding hands in eternal wedding vows',
    description: 'An intimate, timeless moment during the ceremony rituals',
    aspectRatio: 0.667,
    width: 736,
    height: 1104,
  },
  'To have & to hold.jpg': {
    title: 'TO HAVE & TO HOLD',
    displayTitle: 'BP_07821_HOLD.JPG',
    category: 'wedding-cam2',
    categories: ['wedding-cam2', 'best-photos'],
    alt: 'Aarav & Anjali emotional wedding embrace - To have and to hold',
    description: 'Sacred embrace celebrating the union of Aarav and Anjali',
    aspectRatio: 0.667,
    width: 736,
    height: 1104,
  },
  'engagement photography.jpg': {
    title: 'ENGAGEMENT SUNSET PORTRAIT',
    displayTitle: 'BP_07822_ENGAGEMENT.JPG',
    category: 'pre-wedding',
    categories: ['pre-wedding', 'best-photos'],
    alt: 'Aarav and Anjali romantic pre-wedding engagement photography portrait',
    description: 'Golden hour pre-wedding romantic portrait session',
    aspectRatio: 0.667,
    width: 736,
    height: 1103,
  },
  '664984701278998316.jpg': {
    title: 'BRIDAL ELEGANCE & JEWELRY',
    displayTitle: 'BP_07823_BRIDAL.JPG',
    category: 'wedding-cam1',
    categories: ['wedding-cam1', 'best-photos'],
    alt: 'Bridal traditional wedding elegance and handcrafted heritage jewelry',
    description: 'Finely detailed wedding attire and bridal heritage styling',
    aspectRatio: 0.667,
    width: 736,
    height: 1104,
  },
  '671106782020346581.jpg': {
    title: 'CEREMONY RINGS & BLESSINGS',
    displayTitle: 'BP_07824_RINGS.JPG',
    category: 'wedding-cam1',
    categories: ['wedding-cam1', 'sangeeth-best'],
    alt: 'Close-up ceremony moment with wedding rings and traditional blessing petals',
    description: 'Cherished candid detail from the auspicious wedding day',
    aspectRatio: 1.0,
    width: 736,
    height: 736,
  },
  '722335227778029950.jpg': {
    title: 'SACRED MANDAP RITUALS',
    displayTitle: 'BP_07825_MANDAP.JPG',
    category: 'wedding-cam2',
    categories: ['wedding-cam2', 'wedding-cam1'],
    alt: 'Aarav and Anjali participating in traditional mandap wedding rituals',
    description: 'Reverent ritual blessings surrounding the holy mandap',
    aspectRatio: 0.764,
    width: 735,
    height: 962,
  },
};

// Gallery complementary images metadata
const GALLERY_METADATA = [
  {
    filename: 'photo-1.jpg',
    title: 'BP_07810.JPG',
    category: 'wedding-cam2',
    categories: ['wedding-cam2', 'best-photos'],
    alt: 'Grand wedding mandap ceremony ritual with flower garlands',
    aspectRatio: 1.5,
    width: 1800,
    height: 1200,
  },
  {
    filename: 'photo-2.jpg',
    title: 'BP_07811.JPG',
    category: 'wedding-cam1',
    categories: ['wedding-cam1', 'best-photos'],
    alt: 'Couple holding hands during auspicious traditional rituals',
    aspectRatio: 1.497,
    width: 1400,
    height: 935,
  },
  {
    filename: 'photo-3.jpg',
    title: 'BP_07812.JPG',
    category: 'wedding-cam2',
    categories: ['wedding-cam2'],
    alt: 'Sacred wedding fire ceremonies and ancient Sanskrit blessings',
    aspectRatio: 1.5,
    width: 1800,
    height: 1200,
  },
  {
    filename: 'photo-4.jpg',
    title: 'BP_07813.JPG',
    category: 'wedding-cam1',
    categories: ['wedding-cam1'],
    alt: 'Groom preparation and candid joyous laughter with family',
    aspectRatio: 1.501,
    width: 1400,
    height: 933,
  },
  {
    filename: 'photo-5.jpg',
    title: 'BP_07814.JPG',
    category: 'wedding-cam2',
    categories: ['wedding-cam2', 'best-photos'],
    alt: 'Couple walking down the ceremonial aisle showered with rose petals',
    aspectRatio: 1.5,
    width: 1800,
    height: 1200,
  },
  {
    filename: 'photo-6.jpg',
    title: 'BP_07815.JPG',
    category: 'sangeeth',
    categories: ['sangeeth', 'sangeeth-best', 'best-photos'],
    alt: 'Grand evening reception celebration with fireworks and sparkling lights',
    aspectRatio: 1.5,
    width: 1800,
    height: 1200,
  },
  {
    filename: 'photo-7.jpg',
    title: 'BP_07816.JPG',
    category: 'wedding-cam1',
    categories: ['wedding-cam1', 'sangeeth-best'],
    alt: 'Heartfelt laughter and blessings from loving parents and friends',
    aspectRatio: 1.497,
    width: 1400,
    height: 935,
  },
  {
    filename: 'photo-8.jpg',
    title: 'BP_07817.JPG',
    category: 'pre-wedding',
    categories: ['pre-wedding', 'best-photos'],
    alt: 'Regal bridal portrait adorned in traditional red and gold silk lehenga',
    aspectRatio: 0.667,
    width: 1800,
    height: 2700,
  },
  {
    filename: 'photo-9.jpg',
    title: 'BP_07818.JPG',
    category: 'pre-wedding',
    categories: ['pre-wedding'],
    alt: 'Golden hour romantic pre-wedding walk along botanical gardens',
    aspectRatio: 1.5,
    width: 1800,
    height: 1200,
  },
  {
    filename: 'photo-10.jpg',
    title: 'BP_07819.JPG',
    category: 'sangeeth-best',
    categories: ['sangeeth-best', 'sangeeth'],
    alt: 'Vibrant Haldi and Sangeeth celebration with yellow floral decor',
    aspectRatio: 1.5,
    width: 1800,
    height: 1200,
  },
  {
    filename: 'photo-11.jpg',
    title: 'BP_07820.JPG',
    category: 'wedding-cam1',
    categories: ['wedding-cam1'],
    alt: 'Delicate floral mandap details, jasmine scents and wedding rings',
    aspectRatio: 1.5,
    width: 1800,
    height: 1200,
  },
  {
    filename: 'photo-12.jpg',
    title: 'BP_07821.JPG',
    category: 'sangeeth',
    categories: ['sangeeth', 'sangeeth-best'],
    alt: 'High-energy Sangeeth dance performances by the bridal party',
    aspectRatio: 1.5,
    width: 1800,
    height: 1200,
  },
  {
    filename: 'photo-13.jpg',
    title: 'BP_07822.JPG',
    category: 'wedding-cam2',
    categories: ['wedding-cam2', 'best-photos'],
    alt: 'Aarav and Anjali exchanging fresh flower garlands (Varmala ritual)',
    aspectRatio: 1.5,
    width: 1800,
    height: 1200,
  },
  {
    filename: 'photo-14.jpg',
    title: 'BP_07823.JPG',
    category: 'sangeeth',
    categories: ['sangeeth'],
    alt: 'Grand reception dinner chandeliers and opulent floral ballroom',
    aspectRatio: 1.5,
    width: 1800,
    height: 1200,
  },
  {
    filename: 'photo-15.jpg',
    title: 'BP_07824.JPG',
    category: 'wedding-cam2',
    categories: ['wedding-cam2', 'wedding-cam1'],
    alt: 'Touching bridal emotional blessing from the mother and elders',
    aspectRatio: 0.667,
    width: 1800,
    height: 2700,
  },
  {
    filename: 'photo-16.jpg',
    title: 'BP_07825.JPG',
    category: 'pre-wedding',
    categories: ['pre-wedding', 'best-photos'],
    alt: 'Sunset twilight silhouette of the couple against the evening glow',
    aspectRatio: 1.499,
    width: 1800,
    height: 1201,
  },
];

let allCompiledPhotos = [];

// 1. Process User Photos from wed_photos/one_sec
if (fs.existsSync(sourceDir)) {
  const userFiles = fs.readdirSync(sourceDir);
  for (const file of userFiles) {
    const ext = path.extname(file).toLowerCase();
    if (['.jpg', '.jpeg', '.png', '.webp', '.avif'].includes(ext)) {
      const srcFile = path.join(sourceDir, file);
      const destFile = path.join(targetDir, file);

      // Copy file without touching or modifying the original
      fs.copyFileSync(srcFile, destFile);

      const meta = USER_PHOTO_METADATA[file] || {
        title: path.parse(file).name.toUpperCase(),
        displayTitle: file.toUpperCase(),
        category: 'wedding-cam2',
        categories: ['wedding-cam2', 'best-photos'],
        alt: `Aarav and Anjali wedding photograph - ${path.parse(file).name}`,
        description: 'Captured with love for Aarav and Anjali',
        aspectRatio: 0.67,
        width: 736,
        height: 1104,
      };

      // Generate a clean slug for the id and possible webp filename
      const cleanBase = path.parse(file).name
        .toLowerCase()
        .replace(/[&]+/g, 'and')
        .replace(/[^a-z0-9_-]/g, '-')
        .replace(/-{2,}/g, '-')
        .replace(/^-|-$/g, '');

      // Determine the webp src path — check multiple possible locations in order
      const candidates = [
        `${cleanBase}.webp`,
        `${path.parse(file).name.toLowerCase().replace(/[^a-z0-9_.-]/g, '-')}.webp`,
      ];
      let webpSrc = `/images/one_sec/${encodeURIComponent(path.parse(file).name + '.webp')}`;
      for (const candidate of candidates) {
        if (fs.existsSync(path.join(targetDir, candidate))) {
          webpSrc = `/images/one_sec/${candidate}`;
          break;
        }
      }
      // Also check if the original-name webp (with spaces/special chars) actually exists
      const originalWebp = path.parse(file).name + '.webp';
      if (fs.existsSync(path.join(targetDir, originalWebp))) {
        // If the original exists, serve it with encoded URL (most reliable)
        webpSrc = `/images/one_sec/${encodeURIComponent(originalWebp)}`;
      }

      allCompiledPhotos.push({
        id: `user-${cleanBase}`,
        title: meta.displayTitle,
        captionTitle: meta.title,
        src: `/images/one_sec/${encodeURIComponent(file)}`,
        webpSrc,
        aspectRatio: meta.aspectRatio,
        width: meta.width,
        height: meta.height,
        category: meta.category,
        categories: meta.categories,
        alt: meta.alt,
        description: meta.description,
        isUserUploaded: true,
        date: '2026-06-22',
      });
    }
  }
}

console.log(`Synced ${allCompiledPhotos.length} actual user photos from wed_photos/one_sec/`);

// 2. Add Complementary Premium Wedding Images
GALLERY_METADATA.forEach((item, index) => {
  const webpFilename = item.filename.replace(/\.jpg$/, '.webp');
  allCompiledPhotos.push({
    id: `gallery-${index + 1}`,
    title: item.title,
    captionTitle: item.title,
    src: `/images/gallery/${item.filename}`,
    webpSrc: `/images/gallery/${webpFilename}`,
    aspectRatio: item.aspectRatio,
    width: item.width,
    height: item.height,
    category: item.category,
    categories: item.categories,
    alt: item.alt,
    description: item.alt,
    isUserUploaded: false,
    date: '2026-06-22',
  });
});

fs.writeFileSync(outputFile, JSON.stringify(allCompiledPhotos, null, 2), 'utf-8');
console.log(`Successfully compiled ${allCompiledPhotos.length} organized photos into ${outputFile}`);

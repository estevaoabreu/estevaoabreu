import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const staticDir = path.join(__dirname, '../static/imgs');

async function convertImages(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            await convertImages(fullPath);
        } else if (entry.isFile()) {
            const ext = path.extname(entry.name).toLowerCase();
            if (['.jpg', '.jpeg', '.png'].includes(ext)) {
                const webpPath = fullPath.replace(ext, '.webp');

                if (!fs.existsSync(webpPath)) {
                    console.log(`Converting: ${fullPath} -> ${webpPath}`);
                    try {
                        await sharp(fullPath)
                            .webp({ quality: 80 })
                            .toFile(webpPath);
                    } catch (err) {
                        console.error(`Error converting ${fullPath}:`, err);
                    }
                } else {
                    // console.log(`Skipping (already exists): ${webpPath}`);
                }
            }
        }
    }
}

console.log('Starting image conversion...');
convertImages(staticDir)
    .then(() => console.log('Conversion complete!'))
    .catch(err => console.error('Fatal error:', err));

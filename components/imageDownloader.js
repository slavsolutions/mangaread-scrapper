const imageDownloader = require ("image-downloader");
const path = require('path');
const fs = require("fs-extra");

async function downloadImages(imageUrls, chapter, title) {
    const tempFolder = `/manga-scrapper/temp`;
    await fs.ensureDir(tempFolder);
    const imagePaths = [];
    for (let i = 0; i < imageUrls.length; i++) {
        const url = imageUrls[i];
        console.log('teeeeeeeest', url)
        const filePath = path.join(tempFolder, `${title}-chapter-${chapter}img-${i}.jpg`);

        try {
            await imageDownloader.image({ url, dest: filePath });
            imagePaths.push(filePath);
            console.log(`✅ Pobrano: ${url}`);
        } catch (err) {
            console.error(`❌ Błąd pobierania ${url}:`, err.message);
        }
    }

    return imagePaths;
}

module.exports = downloadImages;
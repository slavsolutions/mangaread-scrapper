const axios = require("axios");
const cheerio = require('cheerio');
const getChapterListFromUrl = require("./getChapterListFromUrl");

async function getImagesUrlsFromChapter(url, chapterNr) {
    console.log('test', url, chapterNr)
    try {
        const {data: html} = await axios.get(url);
        const $ = cheerio.load(html);
        const images = [];

        $('img').each((i, el) => {
            const id = $(el).attr('id') || '';
            if (/^image-\d+$/.test(id)) {
                const src = $(el).attr('src');
                if (src) images.push(src.trim());
            }
        });

        //console.log('tu powinny byc linki do obrazkow dla solo leveing chapter ', url, images);
        //run(images)
        console.log('zwracam images', images, 'oraz ', chapterNr);
        return [images, chapterNr]
    } catch (err) {
        console.error(`❌ Błąd przy pobieraniu ${url}:`, err.message);
        return [];
    }
}
module.exports = getImagesUrlsFromChapter;
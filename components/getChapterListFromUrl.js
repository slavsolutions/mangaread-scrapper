const axios = require("axios");
const cheerio = require("cheerio");

async function getChapterListFromUrl(mangaUrl){
    try{
        const chapterLinks = [];
        const {data: html} = await axios.get(mangaUrl);
        const $ = cheerio.load(html);
        const chapterListItems = $('li.wp-manga-chapter');
        console.log(`znaleziono ${chapterListItems.length} chapterow:\n`);
        chapterListItems.each((i,elem)=>{
            const anchor = $(elem).find('a');            // znajdź <a> wewnątrz <li>
            const chapterTitle = anchor.text().trim();   // pobierz tekst rozdziału
            const chapterUrl = anchor.attr('href');      // pobierz link
            chapterLinks.push(chapterUrl);
        })
        chapterLinks.reverse();
        //getImagesFromChapter(chapterLinks[1])
        //console.log(chapterLinks)
        //for(let i=0; i<1; i++){
        //    console.log(chapterLinks[i])
        //    const x1 = async () => await getImagesFromChapter(chapterLinks[i], i+1)
        //    run(await x1)
        //    //
        //    console.log('haha', await x1())
        //}
        console.log('zwracam linki do chapterow')
        return chapterLinks
    }
    catch (err){
        console.log(err)
    }
}

module.exports = getChapterListFromUrl;
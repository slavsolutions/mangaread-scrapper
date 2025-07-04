const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs-extra');
const readline = require('readline')

const chapterLinks = [];
const downloadImages = require('./components/imageDownloader');
const createPdfFromImages = require('./components/pdfCreator');
const getChapterListFromUrl = require('./components/getChapterListFromUrl');
const getImagesUrlsFromChapterUrl = require('./components/getImagesUrlsFromChapterUrl');

const url = 'https://www.mangaread.org/manga/solo-leveling-manhwa/';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


rl.question('Elo, sciagac?',(answer) =>{
  if(answer === 'yes'){
    mainHandler(url)
  }
})

async function mainHandler (url){
  const parts = url.split('/').filter(Boolean); // usuwa puste elementy (np. ostatni "/")
  const title = parts[parts.length - 1];
  console.log('tytul', title , ' a tu url ', url)
  const chapterUrlList =  await getChapterListFromUrl(url);
  console.log('test - pierwszy chapter' , chapterUrlList[0])


  for(let i=0; i<2; i++){
    const imagesUrlsFromChapter = await getImagesUrlsFromChapterUrl(chapterUrlList[i], i+1);
    const tempImagesOnDisc = await downloadImages(imagesUrlsFromChapter[0],imagesUrlsFromChapter[1] ,  title);
    console.log(tempImagesOnDisc);
    await createPdfFromImages(tempImagesOnDisc, i+1, title)
  }
}



const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs-extra');
const readline = require('readline');

const chapterLinks = [];
const downloadImages = require('./components/imageDownloader');
const createPdfFromImages = require('./components/pdfCreator');
const getChapterListFromUrl = require('./components/getChapterListFromUrl');
const getImagesUrlsFromChapterUrl = require('./components/getImagesUrlsFromChapterUrl');
const genres = []
const url = 'https://www.mangaread.org';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function listGenres (){
  const helper = [];
  const {data: html} = await axios.get(url);
  const $ = cheerio.load(html);
  const genresFound = $('.menu-item-object-wp-manga-genre');
  console.log('Ilosc gatunkow: ', genresFound.length)
  genresFound.each((i,element) => {
    const anchor = $(element).find('a');
    //console.log(anchor.text().trim());
    //console.log(anchor.attr('href'));
    genres.push([anchor.text().trim(),anchor.attr('href')]) 
  });
}

// Po załadowaniu danych dynamicznie ustawiamy elementy listy
async function main() {
  await listGenres(); // assume this fills global genres: Array of [name, link]
  const names = genres.map(i => i[0]);
  genres.map((i,x) =>{
    console.log(x+1, i[0])
    
  })
  //console.log(genres[0])
  // /n
}
main();


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



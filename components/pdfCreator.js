const fs = require('fs-extra');
const { PDFDocument } = require('pdf-lib');
const path = require('path');

async function createPdfFromImages(imagePaths, chapter, title) {
    const outputFolder = path.join('/manga-scrapper/', 'pdf', title);
    const outputPdfPath = path.join(outputFolder, `${chapter}.pdf`);

    await fs.ensureDir(outputFolder); // tu tworzymy folder

    const pdfDoc = await PDFDocument.create();

    for (const imagePath of imagePaths) {
        const imageBytes = await fs.readFile(imagePath);
        const image = await pdfDoc.embedJpg(imageBytes);
        const page = pdfDoc.addPage([image.width, image.height]);
        page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
    }

    const pdfBytes = await pdfDoc.save();
    await fs.writeFile(outputPdfPath, pdfBytes);
    console.log(`📄 Zapisano PDF jako: ${outputPdfPath}`);

}

module.exports = createPdfFromImages;

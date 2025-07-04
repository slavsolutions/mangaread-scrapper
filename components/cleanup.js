const fs = require("fs-extra");

async function cleanup(folder) {
    await fs.remove(folder);
    console.log(`🧹 Usunięto folder tymczasowy: ${folder}`);
}

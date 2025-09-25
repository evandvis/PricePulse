const puppeteer = require ("puppeteer");

async function scrapeMyntraProduct(url) {
    const browser = await puppeteer.launch({ headless: false});
    const webPage = await browser.newPage();

    try {
        await webPage.goto(url, { waitUntil: "networkidle2"});
    }
}
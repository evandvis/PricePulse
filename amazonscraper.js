const puppeteer = require("puppeteer");

async function scrapeAmazonProduct(url) {
  const browser = await puppeteer.launch({ headless: true }); // Set to true for production
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: "networkidle2" });

    const data = await page.evaluate(() => {
      const titleElement = document.querySelector("#productTitle");
      const priceElement = document.querySelector(".a-price-whole");

      const title = titleElement ? titleElement.innerText.trim() : null;
      const price = priceElement
        ? parseFloat(priceElement.innerText.replace(/[^0-9.]/g, ""))
        : null;

      return { title, price };
    });

    await browser.close();
    return data;
  } catch (error) {
    console.error(`Error scraping ${url}:`, error);
    await browser.close();
    return null;
  }
}

const productUrl =
  "https://www.amazon.in/PRO365-Double-Roller-Abdominal-Workout/dp/B07PP3LCLN/ref=sr_1_2_sspa?crid=2CCH0CICQ4U93&dib=eyJ2IjoiMSJ9.MEBi0AmhI_GosixwpnB5J-utumzDbbwU3-a0_9KKdc3kRlcU_sHRujaVA1iQNtrA7A6KXJ6YRM2Z7wESsFUD94Kuijf4yjzU6SsuILxPhs_edo1Fs3_SOb571bn1EUqGrJdD1zQuzrT50TsVe4q3XKY1xYyLXVk_BTTF3JEc528VYeI_LMGTDASEyxWzn0hHcSAXCfFmav0RJvFSllTdoRik74-aGD08vIWyAb-_VYcxQNmy_hh8ItQz3SG14rxuNt0q6cuIgHN1h3hmTJLRChUWt-c7fZV0uHOy7Agm6Hs._LNc_h29snX_DLpV8usDE82TGvKTitG6z4if44YcmIU&dib_tag=se&keywords=abs%2Broller&qid=1758619041&sprefix=abs%2Broll%2Caps%2C372&sr=8-2-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1";

scrapeAmazonProduct(productUrl).then((result) => {
  if (result) {
    console.log("Scraped Data:", result);
  } else {
    console.log("Failed to scrape the product.");
  }
});

module.exports = scrapeAmazonProduct;

const puppeteer = require("puppeteer");

async function scrapeFlipkartProduct(url) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: "networkidle2" });

    const data = await page.evaluate(() => {
      // Flipkart selectors you provided
      const titleElement = document.querySelector(".VU-ZEz");
      const priceElement = document.querySelector(".Nx9bqj.CxhGGd");

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
  "https://www.flipkart.com/oneplus-nord-buds-3-pro-truly-wireless-earbuds-49db-active-noise-cancellation-bluetooth/p/itmd40bdc505265b?pid=ACCH23YZAHPHH8GA&lid=LSTACCH23YZAHPHH8GAEK48U9&marketplace=FLIPKART&q=one+plus+nord+buds+3+pro&store=0pm%2Ffcn%2F821%2Fa7x%2F2si&spotlightTagId=default_BestsellerId_0pm%2Ffcn%2F821%2Fa7x%2F2si&srno=s_1_1&otracker=AS_QueryStore_OrganicAutoSuggest_1_19_na_na_ps&otracker1=AS_QueryStore_OrganicAutoSuggest_1_19_na_na_ps&fm=search-autosuggest&iid=380738ce-6ca3-4e99-80de-f655cf5b2692.ACCH23YZAHPHH8GA.SEARCH&ppt=sp&ppn=sp&qH=85ecb429db52731f";

scrapeFlipkartProduct(productUrl).then((result) => {
  if (result) {
    console.log("Scraped Data:", result);
  } else {
    console.log("Failed to scrape the product.");
  }
});

module.exports = scrapeFlipkartProduct;

require("dotenv").config();
const connectDB = require("./db.js");
const scrapeAmazonProduct = require("./amazonscraper.js");
const scrapeFlipkartProduct = require("./flipkartscraper.js");
const Product = require("./product.model.js");

//function to get products info from both sites into an array of objects
const itemsToCompare = [
  {
    name: "Iphone 15 (128 GB) Black",
    amazonUrl:
      "https://www.amazon.in/Apple-iPhone-15-128-GB/dp/B0CHX1W1XY/ref=sr_1_1_sspa?crid=O5T3XQMLA4BH&dib=eyJ2IjoiMSJ9.8-aKrERwPzdGyJWfWOa56I4wwdlI59jT8Bz9mNMoRuI2jxaiHGLt-9jMmKFSoG5Oy4k-XWbB8U2GhXdlWT5uNLyHZe3Ejdeqp1y1eDDoToH8AF_e5HxcF-L3cu73HotXjEIEVtAbJTfC0ByNbt3peKPUJ942SZz-JRbmSRl1GGCMcrFBgIgMyvM2q2Vp0DTtFPrOhhb3C9xtn9ypm29PSp4LshRYOcsy8sSpI27lCio.f5WuhjJ2A7gTMmXJ_6vf6lIUoCkZ10G7aPpXtBGJNy8&dib_tag=se&keywords=iphone+15&qid=1758880897&sprefix=iphone+15%2Caps%2C289&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1",
    flipkartUrl:
      "https://www.flipkart.com/apple-iphone-15-black-128-gb/p/itm6ac6485515ae4?pid=MOBGTAGPTB3VS24W&lid=LSTMOBGTAGPTB3VS24WCTBCFM&marketplace=FLIPKART&q=iphone+15&store=tyy%2F4io&srno=s_1_1&otracker=search&otracker1=search&fm=organic&iid=538f0bcd-232c-4c42-82b3-1c9861867d89.MOBGTAGPTB3VS24W.SEARCH&ppt=dynamic&ppn=CART_PAGE&ssid=xvcu3qt4v40000001758881002201&qH=2f54b45b321e3ae5",
  },
  {
    name: "Iphone 15 (128 GB) Black",
    amazonUrl:
      "https://www.amazon.in/Samsung-Adaptive-Real-Time-Interpreter-Battery/dp/B0D9LT4F24/ref=sr_1_4?crid=24MXZX153TE51&dib=eyJ2IjoiMSJ9.JVvPY--mfXm2btw5CZW-hl6zjGtH7lSaUzM3q23nnICOWpP-TCKsJbBHg-BpAmkfYk4fIOUKE3-thXYnHxTQXpe1T4vQBPiyN0LsyYGRmNVJnfPyRsWjq7qnSm5va4ryUEO78n5RTslwiJ4vZw_e8o863KRFez0HZsQLjJuPvUMxtoEV67JvIEiX87sKeEFlAzQf4lEYiIPY2rKwxtmg1sC5oH2mzcIRd5PF3x2GMek.nJD7aEtmSi88ET7-RuMAlu33UP_1sOqtfh6fgX7-TGg&dib_tag=se&keywords=samsung+buds&nsdOptOutParam=true&qid=1758881074&sprefix=samsung+buds%2Caps%2C261&sr=8-4",
    flipkartUrl:
      "https://www.flipkart.com/samsung-galaxy-buds-3-pro-bluetooth/p/itm13f27472805c8?pid=ACCH28Z8MYZWVAEE&lid=LSTACCH28Z8MYZWVAEEZU7CFL&marketplace=FLIPKART&q=samsung+buds&store=0pm%2Ffcn%2F821&srno=s_1_1&otracker=search&otracker1=search&fm=organic&iid=fd6daa8b-22b1-4340-80e8-a213e607ae9e.ACCH28Z8MYZWVAEE.SEARCH&ppt=dynamic&ppn=CART_PAGE&ssid=d6niifapds0000001758881105038&qH=971e614975ae66ab",
  },
];

//function to save the scraped product data into mongoDB
async function saveProductData(data) {
  if (!data || !data.title || !data.price) {
    console.log(`Missing data, not saving to DB`);
    return;
  }
  const newProduct = new Product({
    name: data.title,
    price: data.price,
    platform: data.platform,
    url: data.url,
  });
  await newProduct.save();
  console.log(`Saved price for $(data.title) from $(data.platform) to DB`);
}

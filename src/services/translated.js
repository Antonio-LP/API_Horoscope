import { launch } from "puppeteer";
import translate from "@iamtraction/google-translate";

async function Translated(searchQuery, idiom) {

  const res = await translate(searchQuery, {from:"en", to: idiom });
  console.log(res.text)

  // const browser = await launch({
  //   headless: true,
  //   executablePath: '/usr/bin/google-chrome',
  //   args: ["--disable-setuid-sandbox","--no-sandbox","--single-process", "--no-zygote",],
  //   ignoreDefaultArgs: ["--disable-extensions"],
  //   devtools: false,
  //   ignoreHTTPSErrors: true,
  // });
  
  // const page = await browser.newPage();
  // await page.goto(`https://translate.google.com/?sl=en&tl=${idiom}&text=${searchQuery}`);

  // await page.waitForSelector(".ryNqvb");
  
  // const character = await page.$eval(".HwtZe", (el) => el.outerText.split('\n'));

  // await browser.close();
  
  // return character;

  
}


export {Translated};

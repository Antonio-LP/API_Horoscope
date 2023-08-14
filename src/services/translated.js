import { launch } from "puppeteer";

async function Translated(searchQuery, idiom) {
  const browser = await launch({
    headless: 'new',
  });
  const page = await browser.newPage();
  await page.goto(`https://translate.google.com/?sl=en&tl=${idiom}&text=${searchQuery}`);
  await page.waitForSelector(".ryNqvb");

  const character = await page.$eval(".HwtZe", (el) => el.outerText.split('\n'));

  //test browser: document.querySelector(".HwtZe").outerText.split('\n')

  await browser.close();

  
  return character;
}

export {Translated};

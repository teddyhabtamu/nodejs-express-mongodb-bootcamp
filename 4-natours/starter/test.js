const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  console.log('Chromium launched successfully');
  await browser.close();
})();

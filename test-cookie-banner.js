const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  // Wyczyść localStorage żeby banner się pokazał
  await page.evaluateOnNewDocument(() => {
    localStorage.clear();
  });
  
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(2000);
  
  console.log('Strona załadowana. Banner cookies powinien być widoczny.');
  console.log('Sprawdź wygląd bannera w przeglądarce i naciśnij Enter...');
  
  // Czekaj na input użytkownika
  process.stdin.setRawMode(true);
  process.stdin.resume();
  await new Promise(resolve => process.stdin.once('data', resolve));
  
  await browser.close();
})();

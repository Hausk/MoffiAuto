require('dotenv').config();
const puppeteer = require('puppeteer');
const password = process.env.MOFFI_PASSWORD;
const email = process.env.MOFFI_EMAIL;

// Configuration des dates pour le datepicker
// Range max est de 1 mois
const dateMaxRange = 30;
const actualTime = new Date();

const monthA = [1, 2, 4];
const monthB = [1, 3, 4];
let dayToCheck = [];
const namedMonth = [
	'Janvier', 'Février', 'mars', 'avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
]

// Boucle 30 jours en plus de day actuel pour créer un tableau avec les dates à reservé en prenant en compte le mois A ou B
for (let i = 1; i <= dateMaxRange; i++) {
  const dateNeeded = new Date(actualTime.getFullYear(), actualTime.getMonth(), actualTime.getDate() + i);
  // Si mois B
  if (dateNeeded.getMonth() % 2 == 1 && monthB.includes(dateNeeded.getDay())) {
    dayToCheck.push(dateNeeded);
	continue;
  } else if (dateNeeded.getMonth() % 2 == 0 && monthA.includes(dateNeeded.getDay())) {
    dayToCheck.push(dateNeeded);
	continue;
  }
};
/*async function sleep(time) {
	await new Promise(resolve => setTimeout(resolve, time));
}*/
(async () => {
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();
	// Set screen size
	await page.setViewport({width: 1680, height: 1024});
	await page.goto('https://www.moffi.io/fr');
	await new Promise(resolve => setTimeout(resolve, 1000));
	await page.click('app-button[type="SECONDARY"] button');
	await new Promise(resolve => setTimeout(resolve, 500));
	await page.type('input[name="email"]', email);
	await page.click('app-button[textkey="global.next"]');
	await new Promise(resolve => setTimeout(resolve, 500));
	await page.type('input[name="password"]', password);
	await page.click('#login-button');
	await new Promise(resolve => setTimeout(resolve, 500));
	for (i = 0; i <= 1; i++) {
		const yearSelector = dayToCheck[i].getFullYear();
		const monthSelector = namedMonth[dayToCheck[i].getMonth()];
		const daySelector = dayToCheck[i].getDate();
		await page.goto('https://www.moffi.io/fr/environnement/qivalio/batiments/8a80816b7d9b26ab017d9e46582314f4');
		await new Promise(resolve => setTimeout(resolve, 500));
		await page.click('app-search-filters-calendar');
		await new Promise(resolve => setTimeout(resolve, 500));
		await page.click('button[aria-label="Choose month and year"]');
		await new Promise(resolve => setTimeout(resolve, 500));
		await page.click('button[aria-label="'+ yearSelector +'"]');
		await new Promise(resolve => setTimeout(resolve, 500));
		await page.click('button[aria-label="'+ monthSelector + ' ' + yearSelector +'"]');
		await new Promise(resolve => setTimeout(resolve, 500));
		await page.click('button[aria-label="'+ + daySelector + ' ' + monthSelector + ' ' + yearSelector +'"]');
		await new Promise(resolve => setTimeout(resolve, 500));
		await page.click('app-button[textkey="components.search_filters.apply.label"]');
		await new Promise(resolve => setTimeout(resolve, 1500));
		//Check si on a des Favoris
		if (await page.$$eval('mat-icon[data-mat-icon-type="font"]')) {
			console.log('Oui');
		}
	}
	await new Promise(resolve => setTimeout(resolve, 5000));
	await browser.close();
})();
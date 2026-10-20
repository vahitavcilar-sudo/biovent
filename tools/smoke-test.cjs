/* Run with Node and an installed Playwright. Tests require Chromium and the local static server. */
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..');
const base=process.env.BIOVENT_TEST_URL||'http://127.0.0.1:8000/';
(async()=>{
const browser=await chromium.launch({executablePath:process.env.BIOVENT_CHROMIUM||'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
try{
const page=await browser.newPage({viewport:{width:1440,height:1000},acceptDownloads:true});
const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`)});
let checks=0;
const routes=['home','products','product/smart','product/zygoma','product/monoblock','product/promx','about','resources','distributors','privacy'];
for(const lang of ['en','de','tr','ar']){
 for(const width of [390,1440]){
  await page.setViewportSize({width,height:1000});
  for(const route of routes){
   await page.goto(`${base}?lang=${lang}#${route}`);await page.locator('h1').waitFor();
   assert.equal(await page.locator('html').getAttribute('lang'),lang);
   assert.equal(await page.locator('html').getAttribute('dir'),lang==='ar'?'rtl':'ltr');
   assert.equal(await page.locator('h1').count(),1);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth+1),false,`Overflow: ${lang} ${route} ${width}`);
   const untranslated=await page.locator('[data-i18n]').evaluateAll(els=>els.filter(e=>!e.textContent.trim()).length);assert.equal(untranslated,0);
   checks++;
  }
 }
 console.log(`${lang}: 20 route/layout checks passed`);
}
// Narrow layouts and long German/Arabic labels.
for(const lang of ['de','ar'])for(const route of ['home','distributors','product/smart']){
 await page.setViewportSize({width:320,height:800});await page.goto(`${base}?lang=${lang}#${route}`);
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,`Narrow overflow ${lang} ${route}`);checks++;
}
await page.setViewportSize({width:390,height:844});await page.goto(base+'?lang=tr#home');
await page.locator('#menu-toggle').click();assert.equal(await page.locator('#menu-toggle').getAttribute('aria-expanded'),'true');await page.locator('#mobile-nav a[href="#products"]').click();await page.locator('h1').waitFor();assert.equal(await page.locator('#mobile-nav').isVisible(),false);checks++;
await page.goto(base+'?lang=en#resources');await page.locator('[data-filter=smart]').click();assert.equal(await page.locator('[data-document]:visible').count(),1);assert.equal(await page.locator('[data-filter=smart]').getAttribute('aria-pressed'),'true');await page.locator('[data-filter=all]').click();assert.equal(await page.locator('[data-document]:visible').count(),2);checks++;
await page.goto(base+'?lang=en#product/smart');await page.locator('#tab-specifications').click();assert.equal(await page.locator('#panel-specifications').isVisible(),true);await page.locator('#tab-specifications').press('ArrowRight');assert.equal(await page.locator('#panel-documents').isVisible(),true);checks++;
await page.goto(base+'?lang=en#product/promx');await page.locator('#tab-specifications').click();await page.locator('#size-diameter').selectOption('3.3');assert.equal(await page.locator('#size-rows tr').count(),5);assert.equal(await page.locator('#size-rows tr').first().innerText(),'8 mm\tCMX 833');await page.locator('#size-diameter').selectOption('4.2');assert.equal(await page.locator('#size-rows tr').first().innerText(),'6 mm\tCMX 642');checks++;
// Product-specific form, required inputs, safe rendering and language state.
await page.goto(base+'?lang=en#distributors/smart');await page.locator('#partner-form button[type=submit]').click();assert.equal(await page.locator('[name=company]').count(),1);
await page.locator('[name=company]').fill('<img src=x onerror="window.__injected=1">');await page.locator('[name=contactName]').fill('Test Contact');await page.locator('[name=email]').fill('test@example.com');await page.locator('#partner-form button[type=submit]').click();assert.equal(await page.locator('[name=product][value=smart]').isChecked(),true);
await page.locator('[name=country]').fill('Germany');await page.locator('#language').selectOption('de');assert.equal(await page.locator('[name=country]').inputValue(),'Germany');assert.equal(await page.locator('[name=product][value=smart]').isChecked(),true);
await page.locator('[name=product][value=smart]').uncheck();await page.locator('#partner-form button[type=submit]').click();assert.ok((await page.locator('#product-error').innerText()).length>0);await page.locator('[name=product][value=smart]').check();await page.locator('[name=experience]').fill('Regional dental distribution.');await page.locator('#partner-form button[type=submit]').click();assert.equal(await page.locator('.review-list').isVisible(),true);assert.equal(await page.evaluate(()=>window.__injected),undefined);assert.ok((await page.locator('.review-list').innerText()).includes('<img src=x'));
const downloadPromise=page.waitForEvent('download');await page.locator('#download-enquiry').click();const download=await downloadPromise;const downloadedText=fs.readFileSync(await download.path(),'utf8');assert.ok(downloadedText.includes('Nicht an Biovent gesendet'));assert.ok(downloadedText.includes('Smart Implant'));assert.ok((await page.locator('#form-status').innerText()).includes('nicht an Biovent'));checks++;
// Browser back/forward navigates to distinct product pages.
await page.goto(base+'?lang=en#home');await page.locator('.hero-actions a[href="#product/smart"]').click();await page.waitForURL('**#product/smart');await page.locator('h1').filter({hasText:/^Smart Implant$/}).waitFor();assert.equal(await page.locator('h1').innerText(),'Smart Implant');await page.goBack();await page.waitForURL('**#home');checks++;
// Optional file:// check: this managed browser may prohibit local-file navigation.
let offlineSkipped=false;
const offline=await browser.newPage({viewport:{width:1440,height:1000}});offline.on('pageerror',e=>errors.push(e.message));
try{await offline.goto('file://'+root+'/index.html?lang=ar#product/promx');assert.equal(await offline.locator('h1').innerText(),'Promx Implant');assert.equal(await offline.locator('html').getAttribute('dir'),'rtl');await offline.locator('#language').selectOption('tr');assert.equal(await offline.locator('html').getAttribute('lang'),'tr');checks++;}
catch(e){if(String(e).includes('ERR_BLOCKED_BY_ADMINISTRATOR')){offlineSkipped=true;console.log('SKIPPED: file:// navigation is blocked by the managed browser policy.');}else throw e;}
assert.deepEqual(errors,[]);console.log(`${checks} browser checks passed; ${offlineSkipped?1:0} optional check skipped; no page errors or failed HTTP assets.`);
}catch(e){console.error(e);process.exitCode=1}finally{await browser.close()}
})();

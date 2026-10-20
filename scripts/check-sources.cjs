const fs=require('node:fs');const crypto=require('node:crypto');const assert=require('node:assert/strict');const vm=require('node:vm');const digest=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
for(const name of ['biosmart-catalog.pdf','biovent-catalog.pdf'])assert.equal(digest('assets/'+name),digest('public/documents/'+name));assert.equal(digest('assets/biovent-logo.svg'),digest('public/images/brand/biovent-logo.svg'));
const refs=JSON.parse(fs.readFileSync('data/references.json','utf8'));console.log('Preserved original PDF and vector logo checksums match. Reference data keys:',Object.keys(refs));

const ctx={};vm.createContext(ctx);vm.runInContext(fs.readFileSync("legacy/content.js","utf8")+";globalThis.refs={promx:PROMX_SIZES,zygoma:ZYGOMA_SIZES};",ctx);assert.equal(JSON.stringify(ctx.refs),JSON.stringify(refs));console.log("All original reference mappings preserved exactly.");

assert.equal(digest('assets/biovent-logo-original-pdf.svg'),digest('public/brand/biovent/logo-primary.svg'));console.log('Corrected original PDF vector logo preserved.');

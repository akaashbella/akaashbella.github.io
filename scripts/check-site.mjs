import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const root = path.resolve('dist');
async function walk(dir) { return (await Promise.all((await readdir(dir,{withFileTypes:true})).map(item=>item.isDirectory()?walk(path.join(dir,item.name)):path.join(dir,item.name)))).flat(); }
const files = await walk(root);
const pages = files.filter(file=>file.endsWith('.html'));
assert.deepEqual(files.filter(file=>file.toLowerCase().endsWith('.pdf')).map(file=>path.relative(root,file)), ['resume.pdf'], 'Only the reviewed redacted PDF may appear in build output');
const titles = new Set();
const descriptions = new Set();
for (const file of pages) {
  const html = await readFile(file,'utf8');
  const route = '/'+path.relative(root,path.dirname(file)).replaceAll(path.sep,'/')+'/';
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  const description = html.match(/<meta name="description" content="([^"]*)"/s)?.[1];
  assert.ok(title,`${file}: title`); assert.ok(!titles.has(title),`${file}: duplicate title`);titles.add(title);
  assert.ok(description,`${file}: description`);assert.ok(!descriptions.has(description),`${file}: duplicate description`);descriptions.add(description);
  assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1,`${file}: one h1`);
  assert.ok(html.includes('<main id="main"'),`${file}: main landmark`);
  assert.ok(html.includes('rel="canonical"'),`${file}: canonical`);
  assert.ok(html.includes('property="og:image"'),`${file}: social image`);
  for (const [,attribute,value] of html.matchAll(/\b(href|src)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|data:|tel:)/.test(value)) { assert.ok(!value.startsWith('tel:'),'No published phone link'); continue; }
    const url = new URL(value,'https://akaashbella.github.io'+route.replace('//','/'));
    let local = path.join(root,decodeURIComponent(url.pathname));
    try { const info=await stat(local);if(info.isDirectory())local=path.join(local,'index.html');await stat(local); }
    catch { assert.fail(`${file}: missing ${attribute} ${value}`); }
    if (url.hash && local.endsWith('.html')) {
      const target = await readFile(local,'utf8');
      assert.ok(target.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`),`${file}: missing anchor ${value}`);
    }
  }
  assert.ok(!/\b\d{3}[-.]\d{3}[-.]\d{4}\b/.test(html),`${file}: no phone number`);
}
const expected=['index.html','work/index.html','research/index.html','about/index.html','resume/index.html','contact/index.html','404.html',...['weight-perturbation','researchseek','agbizlogic','fittrack','mauka-energy','spotify-indiclid'].map(s=>`work/${s}/index.html`)];
for(const route of expected) await stat(path.join(root,route));
for(const file of ['robots.txt','sitemap-index.xml','sitemap-0.xml','favicon.svg','images/social.png','resume.pdf']) await stat(path.join(root,file));
const sitemap=await readFile(path.join(root,'sitemap-0.xml'),'utf8');
assert.ok(sitemap.includes('https://akaashbella.github.io/research/'));
assert.ok(!sitemap.includes('https://akaashbella.github.io/akaashbella.github.io/'));
console.log(`Verified ${pages.length} HTML pages, unique metadata, internal links and anchors, required routes, sitemap, and static assets.`);

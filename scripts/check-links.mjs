import fs from 'node:fs';import path from 'node:path';
const root='dist';if(!fs.existsSync(root)){console.error('Build dist first');process.exit(1)}
const urls=new Set(['/']);let files=[];
const walk=(dir)=>{for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,entry.name);if(entry.isDirectory())walk(p);else files.push(p)}};walk(root);
for(const f of files){if(f.endsWith('index.html')){let u='/'+path.relative(root,path.dirname(f)).split(path.sep).join('/')+'/';u=u.replace(/^\/\//,'/');urls.add(u)}else{urls.add('/'+path.relative(root,f).split(path.sep).join('/'))}}
let errors=[];for(const f of files.filter(f=>f.endsWith('.html'))){const html=fs.readFileSync(f,'utf8');const re=/(?:href|src)=["'](\/[^"'#?]+[\/\.a-zA-Z0-9-]*)(?:[?#][^"']*)?["']/g;for(const m of html.matchAll(re)){const u=m[1];if(!urls.has(u)&&!urls.has(u.endsWith('/')?u:u+'/'))errors.push(`${f}: broken ${u}`)}}
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log(`OK: ${files.filter(x=>x.endsWith('.html')).length} HTML pages and ${urls.size} local routes/assets checked`)

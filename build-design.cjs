const fs = require('fs');
const path = require('path');
const { chromium } = require('C:/Users/Алекс/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const sharp = require('C:/Users/Алекс/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const spec=JSON.parse(fs.readFileSync('design-spec.json','utf8'));
const out=path.resolve('redesign'); fs.mkdirSync(out,{recursive:true});
const source=fs.readFileSync('C:/Users/Алекс/Downloads/ChatGPT Image 22 сент. 2026 г., 18_50_15.png').toString('base64');
const colors={ink:'#103F35',lime:'#D7F85B',paper:'#F7F7EF',white:'#FFFFFF',muted:'#547169',line:'#D8E2D6',pale:'#EAF0DC'};
const c=v=>colors[v]||v;
const esc=s=>String(s??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const nodes={desktop:{key:'desktop',w:1440,type:'frame',children:[]},mobile:{key:'mobile',w:390,type:'frame',children:[]}};
for(const section of spec)for(const o of section.ops){nodes[o.key]={...o,children:[]};nodes[o.parent].children.push(nodes[o.key]);}
// Keep the unreadable source copy as an image instead of inventing wording.
Object.assign(nodes.dcd3,{type:'image',crop:[433,536,104,39],w:286,h:107,radius:0});
nodes.dhphoto.crop=[335,39,235,224];
// Keep photographs proportional while fitting their redesigned frames.
for(const n of Object.values(nodes))if(n.type==='image'&&n.key!=='dcd3'){
 let [x,y,w,h]=n.crop;const ratio=n.w/n.h;
 if(w/h>ratio){const nw=h*ratio;x+=(w-nw)/2;w=nw;}else{const nh=w/ratio;y+=(h-nh)/2;h=nh;}n.crop=[x,y,w,h];
}
const icon=(kind,color)=>{
 const paths={wa:'<path d="M20.5 11.5a8.5 8.5 0 0 1-12.7 7.4L3 20l1.2-4.6A8.5 8.5 0 1 1 20.5 11.5Z"/><path d="M8 7.5c-.8 2 2.2 5.7 4.7 6.9 1.8.9 3.1.2 3.5-1l-2.4-1.3-1 1c-1.7-.6-3-1.9-3.5-3.4l1-1L9 6.8Z"/>',search:'<circle cx="10" cy="10" r="7"/><path d="m15 15 6 6"/>',flask:'<path d="M9 3h6M10 3v7L4 20h16L14 10V3M8 15h8"/>',shield:'<path d="m12 3 8 3v6c0 5-8 9-8 9S4 17 4 12V6Z"/>',receipt:'<path d="M6 3h12v18l-3-2-3 2-3-2-3 2ZM9 7h6M9 11h6M9 15h3"/>',sofa:'<path d="M5 12V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6M3 11h3v5h12v-5h3v9H3ZM6 20v2m12-2v2"/>'};
 const p=paths[kind]||paths.sofa;
 return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
};
function render(n){
 let css=`width:${n.w}px;flex:none;box-sizing:border-box;`;
 const attr=`data-key="${n.key}" data-type="${n.type}"`;
 if(n.type==='frame'){
 css+=`display:flex;flex-direction:${n.dir==='HORIZONTAL'?'row':'column'};gap:${n.gap||0}px;padding:${n.py||0}px ${n.px||0}px;background:${c(n.bg)||'transparent'};border-radius:${n.radius||0}px;align-items:${n.align==='CENTER'?'center':'flex-start'};${n.h?`height:${n.h}px;`:''}`;
 return `<div ${attr} style="${css}">${n.children.map(render).join('')}</div>`;
 }
 if(n.type==='text'){
 let decoration='';const match=n.key.match(/^(dtct|mtt)([0-3])$/);
 if(match)decoration=`<div style="margin-bottom:18px">${icon(['search','flask','shield','receipt'][+match[2]],c('ink'))}</div>`;
 if(['dlogo','mlogo','dflogo','mfl'].includes(n.key))decoration=`<div style="margin-bottom:8px">${icon('sofa',c(n.color||'ink'))}</div>`;
 if(['dwa','dfwhats'].includes(n.key))decoration=`<div style="margin-bottom:6px">${icon('wa',c(n.color||'ink'))}</div>`;
 return `<div ${attr} style="${css}font-size:${n.size||18}px;font-weight:${n.bold?750:n.semibold?600:400};line-height:${n.bold?1.1:1.45};color:${c(n.color||'ink')};letter-spacing:${n.bold?'-0.025em':'0'};white-space:pre-wrap;text-align:${n.align?.toLowerCase()||'left'}">${decoration}${esc(n.text)}</div>`;
 }
 if(n.type==='image'){
 const [x,y,w,h]=n.crop; const sx=n.w/w,sy=n.h/h;
 return `<div ${attr} style="${css}height:${n.h}px;overflow:hidden;position:relative;border-radius:${n.radius??24}px"><img alt="" src="data:image/png;base64,${source}" style="position:absolute;max-width:none;width:${825*sx}px;height:${1905*sy}px;left:${-x*sx}px;top:${-y*sy}px"></div>`;
 }
 if(n.type==='button')return `<div ${attr} style="${css}height:${n.h||56}px;display:flex;align-items:center;justify-content:center;gap:9px;border-radius:14px;background:${c(n.bg||'lime')};color:${c(n.color||'ink')};${n.outline?'border:1px solid currentColor;':''}font-size:${n.size||15}px;font-weight:600;white-space:nowrap">${n.text.includes('WhatsApp')?icon('wa',c(n.color||'ink')):''}<span>${esc(n.text)}</span></div>`;
 if(n.type==='faq')return `<div ${attr} style="${css}min-height:${n.h||72}px;background:white;border-radius:12px;padding:22px;display:flex;align-items:center;gap:14px;color:${c('ink')};font-size:${n.size||16}px;font-weight:600"><span style="flex:1">${esc(n.text)}</span><span style="font-size:24px;font-weight:400">${n.key==='mqform'?'⌄':'+'}</span></div>`;
 if(n.type==='input')return `<div ${attr} style="${css}font-size:14px;color:${c('ink')}"><div style="margin-bottom:10px;font-weight:600">${esc(n.text)}</div><div style="border:1px solid ${c('line')};border-radius:12px;padding:17px 14px;font-size:13px;color:${c('muted')}">${esc(n.value)}</div></div>`;
}
const html=`<!doctype html><html lang="ru"><meta charset="utf-8"><title>Чистый Дом — редизайн</title><style>*{box-sizing:border-box}body{margin:0;background:#DDE5DC;font-family:'Segoe UI',Arial,sans-serif}main{display:flex;gap:80px;padding:60px;align-items:flex-start}#desktop,#mobile{background:${c('paper')};overflow:hidden;border-radius:24px;box-shadow:0 24px 80px #103f3520}svg{flex:none}</style><main><article id="desktop">${render(nodes.desktop)}</article><article id="mobile">${render(nodes.mobile)}</article></main></html>`;
fs.writeFileSync(path.join(out,'preview.html'),html);
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'msedge'}); const page=await browser.newPage({viewport:{width:2100,height:1200},deviceScaleFactor:1});
 await page.goto('file:///'+path.join(out,'preview.html').replaceAll('\\','/'));await page.evaluate(()=>document.fonts.ready);
 const checks=await page.evaluate(()=>{const errors=[];document.querySelectorAll('[data-key]').forEach(n=>{const p=n.parentElement;if(!p.hasAttribute('data-key'))return;const r=n.getBoundingClientRect(),b=p.getBoundingClientRect();if(r.right>b.right+1||r.bottom>b.bottom+1)errors.push({node:n.dataset.key,parent:p.dataset.key});});return errors;});
 for(const name of ['desktop','mobile']){
 const root=page.locator('#'+name);await root.screenshot({path:path.join(out,name+'.png')});
 const data=await root.evaluate(el=>{
 const origin=el.getBoundingClientRect(),items=[];const pos=e=>{const r=e.getBoundingClientRect();return {x:r.x-origin.x,y:r.y-origin.y,w:r.width,h:r.height}};
 function walk(e){const cs=getComputedStyle(e);if(e.tagName==='IMG')return;if(e.tagName.toLowerCase()==='svg'){items.push({type:'svg',...pos(e),value:e.outerHTML});return;}
 if(e.dataset.type==='image'){items.push({type:'image',...pos(e),key:e.dataset.key,radius:parseFloat(cs.borderRadius)||0});return;}
 if(cs.backgroundColor!=='rgba(0, 0, 0, 0)'||parseFloat(cs.borderTopWidth)>0)items.push({type:'rect',...pos(e),fill:cs.backgroundColor,stroke:cs.borderTopColor,sw:parseFloat(cs.borderTopWidth),radius:parseFloat(cs.borderRadius)||0});
 for(const node of e.childNodes){if(node.nodeType===1)walk(node);else if(node.nodeType===3&&node.textContent.trim()){
 let rows=[];const text=node.textContent;for(let i=0;i<text.length;i++){if(text[i]==='\n')continue;const range=document.createRange();range.setStart(node,i);range.setEnd(node,i+1);const r=range.getBoundingClientRect();let row=rows.find(x=>Math.abs(x.y-(r.y-origin.y))<1);if(!row){row={x:r.x-origin.x,y:r.y-origin.y,text:'',h:r.height};rows.push(row);}row.text+=text[i];}
 for(const row of rows)items.push({type:'text',...row,size:parseFloat(cs.fontSize),weight:cs.fontWeight,color:cs.color,spacing:cs.letterSpacing==='normal'?0:parseFloat(cs.letterSpacing)});
 }} }
 walk(el);return {width:origin.width,height:origin.height,items};});
 let svg=`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${data.width}" height="${data.height}" viewBox="0 0 ${data.width} ${data.height}"><defs><image id="source" width="825" height="1905" xlink:href="data:image/png;base64,${source}"/></defs>`;let idx=0;
 for(const q of data.items){if(q.type==='rect')svg+=`<rect x="${q.x}" y="${q.y}" width="${q.w}" height="${q.h}" rx="${q.radius}" fill="${q.fill==='rgba(0, 0, 0, 0)'?'none':q.fill}" stroke="${q.sw?q.stroke:'none'}" stroke-width="${q.sw}"/>`;
 else if(q.type==='text')svg+=`<text x="${q.x}" y="${q.y+q.size*.96}" font-family="Segoe UI, Arial, sans-serif" font-size="${q.size}" font-weight="${q.weight}" letter-spacing="${q.spacing}" fill="${q.color}" xml:space="preserve">${esc(q.text)}</text>`;
 else if(q.type==='svg')svg+=`<g transform="translate(${q.x} ${q.y})">${q.value}</g>`;
 else if(q.type==='image'){const [x,y,w,h]=nodes[q.key].crop;let id='clip'+idx++;svg+=`<defs><clipPath id="${id}"><rect x="${q.x}" y="${q.y}" width="${q.w}" height="${q.h}" rx="${q.radius}"/></clipPath></defs><g clip-path="url(#${id})"><use xlink:href="#source" transform="translate(${q.x-x*q.w/w} ${q.y-y*q.h/h}) scale(${q.w/w} ${q.h/h})"/></g>`;}}
 svg+='</svg>';fs.writeFileSync(path.join(out,name+'.svg'),svg);await sharp(Buffer.from(svg)).resize({width:name==='desktop'?1000:390}).png().toFile(path.join(out,name+'-svg-check.png'));
 }
 await page.screenshot({path:path.join(out,'overview.png'),fullPage:true});
 fs.writeFileSync(path.join(out,'validation.json'),JSON.stringify({overflow:checks},null,2));await browser.close();console.log(JSON.stringify({output:out,overflow:checks}));
})().catch(e=>{console.error(e);process.exitCode=1});

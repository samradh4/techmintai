const input=document.querySelector('#search-input');const results=document.querySelector('#search-results');const dataset=document.querySelector('#search-dataset');
if(input&&results&&dataset){
 const items=JSON.parse(dataset.textContent||'[]');
 const render=()=>{const q=input.value.trim().toLowerCase().slice(0,100);const matches=items.filter(a=>!q||`${a.title} ${a.excerpt} ${a.category}`.toLowerCase().includes(q)).slice(0,30);results.replaceChildren();
 for(const item of matches){const card=document.createElement('article');card.className='search-result';const meta=document.createElement('div');meta.className='eyebrow';meta.textContent=item.category;const h2=document.createElement('h2');const a=document.createElement('a');a.href=item.url;a.textContent=item.title;h2.append(a);const p=document.createElement('p');p.textContent=item.excerpt;card.append(meta,h2,p);results.append(card);}if(!matches.length){const p=document.createElement('p');p.textContent='No results yet. Try a shorter keyword.';results.append(p);}};
 const q=new URLSearchParams(location.search).get('q');if(q)input.value=q.slice(0,100);input.addEventListener('input',render);render();
}

const form=document.querySelector('form[data-calculator]');
if(form){
  const output=document.getElementById('calc-output');
  const error=document.getElementById('calc-error');
  const money=(num,ccy)=>new Intl.NumberFormat('en-US',{style:'currency',currency:ccy,maximumFractionDigits:0}).format(num);
  const calc=()=>{
    const get=(name)=>Number(form.elements.namedItem(name)?.value ?? 0);
    const typ=form.dataset.calculator,currency=form.elements.namedItem('currency')?.value||'USD';
    const inputs=[...form.querySelectorAll('input[type=number]')];
    if(inputs.some(input=>!input.checkValidity()||!Number.isFinite(Number(input.value)))) { error.hidden=false;error.textContent='Please check the input values and their allowed ranges.';output.replaceChildren();return; }
    error.hidden=true;error.textContent='';
    const P=get('principal'),m=get('monthly'),r=get('rate')/100/12,n=Math.round(get('years')*12);let items=[];
    if(n<=0){error.hidden=false;error.textContent='Please choose a longer time period.';return;}
    const grow=(value)=>Math.pow(1+r,n)*value;
    const annuity=(payment)=>Math.abs(r)<1e-10 ? payment*n : payment*(Math.pow(1+r,n)-1)/r;
    if(typ==='compound-interest'){
      const future=grow(P)+annuity(m),contributions=P+m*n;
      items=[['Estimated balance',future],['Total contributed',contributions],['Estimated interest',future-contributions]];
    }else if(typ==='monthly-investment'){
      const future=annuity(m),contributions=m*n;
      items=[['Estimated future value',future],['Total contributions',contributions],['Estimated growth',future-contributions]];
    }else if(typ==='loan-payment'){
      const monthly=Math.abs(r)<1e-10?P/n:P*r/(1-Math.pow(1+r,-n));
      const total=monthly*n;
      items=[['Monthly payment',monthly],['Total repaid',total],['Total interest',total-P]];
    }else if(typ==='savings-goal'){
      const target=get('target');
      const needed=Math.max(0,(target-grow(P))/(Math.abs(r)<1e-10?n:(Math.pow(1+r,n)-1)/r));
      items=[['Required monthly savings',needed],['Estimated starting balance at goal date',grow(P)],['Target',target]];
    }
    if(items.some(x=>!Number.isFinite(x[1])||Math.abs(x[1])>1e16)){error.hidden=false;error.textContent='This combination gives an impractically large result. Please use smaller inputs.';output.replaceChildren();return;}
    const wrap=document.createElement('div');wrap.className='results';
    for(const [label,val] of items){let col=document.createElement('div'),b=document.createElement('b'),span=document.createElement('span');b.textContent=money(val,currency);span.textContent=label;col.append(b,span);wrap.append(col);}
    output.replaceChildren(wrap);
  };
  form.addEventListener('submit',e=>{e.preventDefault();calc();});
  calc();
}

(()=>{
  const id=document.documentElement.dataset.ga4Id||'';
  const banner=document.getElementById('analytics-consent');
  if(!banner||!/^G-[A-Z0-9]+$/.test(id))return;
  const key='techmintai_analytics_consent_v1';
  let saved='';try{saved=localStorage.getItem(key)||'';}catch{}
  const load=()=>{
    if(window.__techmintAnalyticsLoaded)return;
    window.__techmintAnalyticsLoaded=true;
    window.dataLayer=window.dataLayer||[];
    window.gtag=function(){window.dataLayer.push(arguments);};
    window.gtag('js',new Date());window.gtag('config',id,{anonymize_ip:true});
    const script=document.createElement('script');script.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(id);script.async=true;document.head.append(script);
  };
  if(saved==='accept')load();else if(saved!=='decline')banner.hidden=false;
  banner.querySelectorAll('[data-consent]').forEach(btn=>btn.addEventListener('click',()=>{
    const consent=btn.dataset.consent;try{localStorage.setItem(key,consent);}catch{}
    banner.hidden=true;if(consent==='accept')load();
  }));
})();

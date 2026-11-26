(()=>{
  const root=document.documentElement;
  const ga=root.dataset.ga4Id||'';
  const clarity=root.dataset.clarityId||'';
  const banner=document.getElementById('analytics-consent');
  const settings=document.getElementById('privacy-choices');
  if(!banner)return;
  const key='techmintai_analytics_consent_v2';
  let saved='';
  try{
    saved=localStorage.getItem(key)||'';
    // Preserve older refusals; prior GA-only acceptance is not consent to Clarity.
    if(!saved&&localStorage.getItem('techmintai_analytics_consent_v1')==='decline')saved='decline';
  }catch{}
  let loaded=false;
  const load=()=>{
    if(loaded)return;
    loaded=true;
    if(/^G-[A-Z0-9]+$/.test(ga)){
      window['ga-disable-'+ga]=false;
      window.dataLayer=window.dataLayer||[];
      window.gtag=function(){window.dataLayer.push(arguments);};
      window.gtag('js',new Date());
      window.gtag('config',ga,{anonymize_ip:true,allow_google_signals:false,allow_ad_personalization_signals:false});
      const script=document.createElement('script');
      script.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(ga);
      script.async=true;document.head.append(script);
    }
    if(/^[a-z0-9]{5,20}$/.test(clarity)){
      window.clarity=window.clarity||function(){(window.clarity.q=window.clarity.q||[]).push(arguments);};
      window.clarity('consentv2',{ad_Storage:'denied',analytics_Storage:'granted'});
      const script=document.createElement('script');
      script.src='https://www.clarity.ms/tag/'+encodeURIComponent(clarity);
      script.async=true;document.head.append(script);
    }
  };
  const clearCookies=()=>{
    document.cookie.split(';').map(c=>c.split('=')[0].trim()).filter(n=>/^(_ga(?:_|$)|_gid$|_gat(?:_|$)|_clck$|_clsk$)/.test(n)).forEach(n=>{
      document.cookie=n+'=; Max-Age=0; Path=/; SameSite=Lax';
      document.cookie=n+'=; Max-Age=0; Path=/; Domain=techmintai.com; SameSite=Lax';
    });
  };
  if(saved==='accept')load();
  else if(saved==='decline')clearCookies();
  else banner.hidden=false;
  if(settings)settings.addEventListener('click',()=>{banner.hidden=false;banner.querySelector('[data-consent="decline"]')?.focus();});
  banner.querySelectorAll('[data-consent]').forEach(btn=>btn.addEventListener('click',()=>{
    const choice=btn.dataset.consent;
    if(choice!=='accept'&&choice!=='decline')return;
    try{localStorage.setItem(key,choice);}catch{}
    banner.hidden=true;
    if(choice==='accept')load();
    else{
      if(/^G-[A-Z0-9]+$/.test(ga))window['ga-disable-'+ga]=true;
      if(typeof window.clarity==='function')window.clarity('consentv2',{ad_Storage:'denied',analytics_Storage:'denied'});
      clearCookies();
      if(loaded)window.location.reload();
    }
  }));
})();

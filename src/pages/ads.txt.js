// Do not invent an AdSense publisher ID. The file only has a valid line when configured.
export const GET=()=>{
 const client=import.meta.env.PUBLIC_ADSENSE_CLIENT_ID||'';
 const valid=/^ca-pub-\d+$/.test(client);
 return new Response(valid?`google.com, ${client.replace('ca-','')}, DIRECT, f08c47fec0942fa0\n`:'',{status:200,headers:{'Content-Type':'text/plain; charset=utf-8','Cache-Control':'public, max-age=3600'}});
};

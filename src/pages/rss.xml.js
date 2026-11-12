import rss from '@astrojs/rss';
import {articles} from '../data/articles';
export const GET=(context)=>rss({title:'TechMintAI',description:'Practical finance, AI and technology guides',site:context.site,items:articles.map(a=>({title:a.title,description:a.excerpt,pubDate:new Date(`${a.date}T12:00:00Z`),link:`/articles/${a.slug}/`})),customData:'<language>en-us</language>'});

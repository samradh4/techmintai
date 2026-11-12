import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://techmintai.com',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap({filter: (page) => !page.includes('/404/') && !page.includes('/search/')})],
  build: { format: 'directory' },
});

import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

/**
 * sitemap.xml без внешних зависимостей.
 * Статические страницы берутся из src/pages, записи коллекций — из контента.
 * Страницы с noindex: true в sitemap не попадают.
 */

// Статические .astro-страницы без динамических параметров ([slug] и т. п.).
const pageModules = import.meta.glob('./**/*.astro');
// Служебные страницы, которым не место в sitemap.
const excludedPages = new Set(['/404/']);

const staticPaths = Object.keys(pageModules)
  .filter((file) => !file.includes('['))
  .map((file) => {
    const path = file.replace(/^\./, '').replace(/\.astro$/, '').replace(/\/index$/, '');
    return path === '' ? '/' : `${path}/`;
  })
  .filter((path) => !excludedPages.has(path));

// Префиксы URL для коллекций. Маршруты [slug] появятся вместе со страницами разделов.
const collectionRoutes = {
  services: '/services/',
  cases: '/cases/',
  blog: '/blog/',
} as const;

type Entry = { loc: string; lastmod?: Date };

export const GET: APIRoute = async ({ site }) => {
  const entries: Entry[] = staticPaths.map((path) => ({ loc: path }));

  for (const [collection, prefix] of Object.entries(collectionRoutes)) {
    const items = await getCollection(collection as keyof typeof collectionRoutes);
    for (const item of items) {
      if (item.data.noindex) continue;
      entries.push({ loc: `${prefix}${item.id}/`, lastmod: item.data.updatedDate });
    }
  }

  const urls = entries
    .map(({ loc, lastmod }) => {
      const url = new URL(loc, site).href;
      const lastmodTag = lastmod ? `<lastmod>${lastmod.toISOString().slice(0, 10)}</lastmod>` : '';
      return `  <url><loc>${url}</loc>${lastmodTag}</url>`;
    })
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};

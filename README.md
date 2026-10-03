# it-service-site

Сайт ИТ-обслуживания для малого и среднего бизнеса (Санкт-Петербург). Astro 6, статическая сборка.
Правила проекта — в [CLAUDE.md](./CLAUDE.md).

## Запуск

Нужен Node 22.12+.

```sh
npm install
npm run dev       # разработка
npm run build     # сборка в dist/
npm run preview   # просмотр сборки
npx astro check   # проверка типов
```

## Переменные окружения

См. `.env.example`.

- `SITE_URL` — боевой адрес сайта (canonical, Open Graph, `sitemap.xml`, `robots.txt`). Передаётся при сборке: `SITE_URL=https://… npm run build`.
- `PUBLIC_YANDEX_METRIKA_ID` — ID счётчика Яндекс.Метрики. Не задан — счётчика на сайте нет.

## Где что лежит

- `src/config/site.ts` — название, контакты, соцсети, реквизиты, меню.
- `src/content.config.ts` — схемы коллекций `services`, `cases`, `blog` с обязательными SEO-полями.
- `src/content/*` — Markdown-контент. Длину `title` (≤ 60) и `description` (120–160) проверяет сборка.
- `src/layouts/BaseLayout.astro` — `<head>`, мета, OG, JSON-LD, шапка, подвал, Метрика.
- `src/styles/tokens.css` — дизайн-токены.

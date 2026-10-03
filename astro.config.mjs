import { defineConfig, envField } from 'astro/config';

// .env не читается в конфиге — SITE_URL передаётся переменной окружения при сборке.
// Без @ts-check: иначе для process нужен пакет @types/node.
// TODO: заменить запасной адрес на боевой домен, когда он будет выбран.
const site = process.env.SITE_URL ?? 'https://example.ru';

export default defineConfig({
  site,
  output: 'static',
  env: {
    schema: {
      // ID счётчика Яндекс.Метрики. Нет переменной — нет счётчика.
      PUBLIC_YANDEX_METRIKA_ID: envField.number({
        context: 'server',
        access: 'public',
        optional: true,
      }),
    },
  },
});

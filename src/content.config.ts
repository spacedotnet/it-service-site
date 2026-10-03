import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * SEO-поля, обязательные для всех коллекций страниц.
 * Ограничения длины проверяются при сборке: нарушение — сборка падает.
 */
const seoFields = {
  /** <title>, до 60 символов. */
  title: z.string().min(1).max(60, 'title — не длиннее 60 символов'),
  /** meta description, 120–160 символов. */
  description: z
    .string()
    .min(120, 'description — не короче 120 символов')
    .max(160, 'description — не длиннее 160 символов'),
  /** Путь к картинке Open Graph в public/, например /og/default.png. */
  ogImage: z
    .string()
    .regex(/^\/.+\.(png|jpe?g|webp)$/i, 'ogImage — путь от корня сайта к .png/.jpg/.webp из public/'),
  /** Заголовок H1, если отличается от title. */
  h1: z.string().optional(),
  /** Закрыть страницу от индексации и убрать из sitemap.xml. */
  noindex: z.boolean().default(false),
  /** Дата последнего существенного обновления. */
  updatedDate: z.coerce.date().optional(),
};

const services = defineCollection({
  loader: glob({ base: './src/content/services', pattern: '**/*.md' }),
  schema: z.object({
    ...seoFields,
    /** Порядок вывода в списках услуг. */
    order: z.number().int(),
    /** Цена «от», рубли. */
    priceFrom: z.number().int().positive(),
    /** Вопросы и ответы — блок FAQ и JSON-LD FAQPage. */
    faq: z
      .array(
        z.object({
          question: z.string().min(1),
          answer: z.string().min(1),
        }),
      )
      .default([]),
  }),
});

const cases = defineCollection({
  loader: glob({ base: './src/content/cases', pattern: '**/*.md' }),
  schema: z.object({
    ...seoFields,
    /** Услуги, к которым относится кейс (id из коллекции services). */
    services: z.array(reference('services')).default([]),
  }),
});

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: z.object({
    ...seoFields,
    /** Дата публикации. */
    pubDate: z.coerce.date(),
  }),
});

export const collections = { services, cases, blog };

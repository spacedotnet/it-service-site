/**
 * Единый источник данных о компании: название, контакты, соцсети, реквизиты.
 * В разметке не хардкодим — берём отсюда.
 */

export const site = {
  /** Рабочее название бренда. TODO: финальное название не выбрано. */
  name: 'it-help',
  /** Короткое описание для подвала и JSON-LD. */
  tagline: 'ИТ-обслуживание малого и среднего бизнеса в Санкт-Петербурге',
  /** Идея слогана. TODO: финальная формулировка. */
  slogan: 'Вы платите за то, что мы всё предусмотрим',
  locale: 'ru_RU',
  lang: 'ru',

  /** Картинка Open Graph по умолчанию (файл в public/). */
  defaultOgImage: '/og/default.png',

  contacts: {
    /** TODO: реальный телефон. Формат для ссылки tel: — только цифры и «+». */
    phone: '+7 (000) 000-00-00',
    phoneHref: '+70000000000',
    /** TODO: реальная почта. */
    email: 'hello@example.ru',
    /** TODO: реальный адрес. */
    address: {
      city: 'Санкт-Петербург',
      street: 'TODO: улица, дом',
      postalCode: 'TODO',
      region: 'Санкт-Петербург',
      country: 'RU',
    },
    /** TODO: реальный график работы и режим поддержки. */
    openingHours: 'Mo-Fr 09:00-19:00',
    openingHoursText: 'Пн–Пт, 9:00–19:00',
  },

  /** Мессенджеры и соцсети. Пустая ссылка — пункт не выводится. */
  social: [
    { name: 'Telegram', href: '' }, // TODO: ссылка на Telegram
    { name: 'WhatsApp', href: '' }, // TODO: ссылка на WhatsApp
    { name: 'ВКонтакте', href: '' }, // TODO: ссылка на ВКонтакте
  ],

  /** Реквизиты для подвала и политики ПДн. TODO: заполнить. */
  legal: {
    companyName: 'TODO: ООО «…»',
    inn: 'TODO',
    ogrn: 'TODO',
  },

  /** Главное меню. Страницы появятся на следующих этапах. */
  nav: [
    { label: 'Услуги', href: '/services/' },
    { label: 'Тарифы', href: '/pricing/' },
    { label: 'Кейсы', href: '/cases/' },
    { label: 'О компании', href: '/about/' },
    { label: 'Блог', href: '/blog/' },
    { label: 'Контакты', href: '/contacts/' },
  ],

  privacyPolicyHref: '/privacy/',
} as const;

export type Site = typeof site;

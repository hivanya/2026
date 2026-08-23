// Всё текстовое содержимое и пути к ассетам собраны здесь одним файлом:
// когда откроется макет, правки по копирайту и именам картинок делаются
// в одном месте, а не по десяти компонентам.
//
// TODO(figma): значения помечены как PLACEHOLDER — заменить на данные
// из макета (имя, био, реальные ссылки, места работы).

export const PersonName = 'Ivan'; // PLACEHOLDER
export const PersonRole = 'Product Designer'; // PLACEHOLDER
export const PersonBio = 'Designer working on music and subscription products.'; // PLACEHOLDER

export const SocialLinks = [
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/' }, // PLACEHOLDER
  { id: 'telegram', label: 'Telegram', href: 'https://t.me/' }, // PLACEHOLDER
  { id: 'email', label: 'Email', href: 'mailto:hello@example.com' }, // PLACEHOLDER
] as const;

// Блок «места работы» под шапкой — по центру, одной строкой логотипов.
export const Workplaces = [
  { id: 'yandex-music', label: 'Yandex Music' }, // PLACEHOLDER
  { id: 'yango-plus', label: 'Yango Plus' }, // PLACEHOLDER
] as const;

// Ссылка-источник под блоком Yango Plus. Заказчик просил подпись «DTF.ru»,
// но дал адрес sostav.ru — оставлено как в задании, см. README.
export const PressLink = {
  label: 'DTF.ru',
  href: 'https://www.sostav.ru/publication/yandeks-muzyka-64744.html',
  quote:
    'Yandex Music has updated My Wave, making its design more responsive to listeners’ preferences',
} as const;

export const YangoPlusTitle =
  'Yango Plus — unified subscription to Yango services';

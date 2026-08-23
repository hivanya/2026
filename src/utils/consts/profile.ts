// Тексты сняты с макета (npm run figma:pull → design/nodes.json).
// Если правится копирайт — правится здесь, а не в компонентах.

export const PersonName = 'Ivan Pokalyuk';

export const PersonBio =
  'Hands-on design lead with 12+ years of experience across different functional roles. For the last 6 years i have been leading design teams, building products, brands and digital experiences';

// TODO: в макете у ссылок нет адресов — проставить настоящие.
export const SocialLinks = [
  { id: 'linkedin', label: 'Linkedin', href: 'https://www.linkedin.com/' },
  { id: 'telegram', label: 'Telegram', href: 'https://t.me/' },
  { id: 'email', label: 'Email', href: 'mailto:hello@example.com' },
] as const;

// Таблица опыта: компания — роль — годы. В макете во всех четырёх строках
// стоит «2023–2026», это явно заготовка — уточнить у Ивана.
export const Experience = [
  {
    id: 'yandex-music',
    company: 'Yandex Music',
    role: 'Head of Product Design',
    years: '2023–2026',
  },
  {
    id: 'yandex-plus',
    company: 'Yandex Plus',
    role: 'Product Art Director',
    years: '2023–2026',
  },
  {
    id: 'skyeng',
    company: 'Skyeng',
    role: 'Head of Design',
    years: '2023–2026',
  },
  {
    id: 'avito',
    company: 'Avito',
    role: 'Senior Product Designer',
    years: '2023–2026',
  },
] as const;

// TODO: в макете нет адреса — проставить ссылку на полное резюме.
export const FullCvLink = { label: 'Full CV', href: '#' } as const;

// Заголовки блоков. Пробелы внутри — места, куда в макете вставлены
// иконки (флеш Яндекс Музыки и плюс), поэтому строки разрезаны.
export const MusicIntro = {
  before: 'Yandex',
  middle:
    'Music — the top music streaming service by number of listeners subscribers in Russia. Part of the Yandex',
  after:
    'Plus subscription. The total number of Plus subscribers is over 40 million',
} as const;

export const YangoIntro = {
  before: 'Yango',
  after: 'Plus — unified subscription to Yango services',
} as const;

// Пять упоминаний в прессе. TODO: в макете кликабельных адресов нет,
// проставлены найденные — сверить с Иваном.
export const PressNotes = {
  rebrand: {
    text: 'Yandex Music has rebranded for the first time in 9 years. The service unveiled an updated brand platform, logo, visual style, and a number of product changes',
    label: 'Sostav.ru',
    href: 'https://www.sostav.ru/publication/yandeks-muzyka-64744.html',
  },
  webVersion: {
    text: 'New web version with new features: trailers, concert recommendations and ticket purchases',
    label: 'Kod.ru',
    href: 'https://kod.ru/',
  },
  myWave: {
    text: 'Yandex Music has updated My Wave, making its design more responsive to listeners’ preferences',
    label: 'DTF.ru',
    href: 'https://dtf.ru/',
  },
  israel: {
    text: 'Testing Yango Plus in Israel. Yango Plus in Israel is a paid membership club for users of the Yango ride-hailing and delivery app',
    label: 'pro.yango.com',
    href: 'https://pro.yango.com/',
  },
  mena: {
    text: 'Yango Launches AI-Driven Entertainment Super App for MENA',
    label: 'Timeoutdubai.com',
    href: 'https://www.timeoutdubai.com/',
  },
} as const;

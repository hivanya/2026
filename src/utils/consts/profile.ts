export const PersonName = 'Ivan Pokalyuk';

export const PersonBio =
  'Product design lead with 12+ years of experience. For the last 7 years \nI have been leading design teams, building products and digital experiences';

export const SocialLinks = [
  {
    id: 'linkedin',
    label: 'Linkedin',
    href: 'https://www.linkedin.com/in/ivan-pokalyuk-34535aa3/',
  },
  { id: 'telegram', label: 'Telegram', href: 'https://t.me/hivanya' },
  { id: 'email', label: 'Email', href: 'mailto:ivanpokalyuk@gmail.com' },
] as const;

export const ExperienceTitle = 'Experience for last 5 years';

export const Experience = [
  {
    id: 'yandex-music',
    company: 'Yandex Music',
    href: 'https://music.yandex.ru',
    role: 'Head of Product Design',
    years: '2023–2026',
  },
  {
    id: 'yandex-plus',
    company: 'Yandex Plus',
    href: 'https://plus.yandex.ru',
    role: 'Product Art Director',
    years: '2022–2023',
  },
  {
    id: 'skyeng',
    company: 'Skyeng',
    href: 'https://skyeng.ru',
    role: 'Head of Design',
    years: '2019–2022',
  },
] as const;

export const Chapters = [
  { section: 'about', experience: null },
  { section: 'showreel', experience: 'yandex-plus' },
  { section: 'music', experience: 'yandex-music' },
  { section: 'wave', experience: 'yandex-music' },
  { section: 'watch', experience: 'yandex-music' },
  { section: 'yango-plus', experience: 'yandex-plus' },
  { section: 'interfaces', experience: 'yandex-plus' },
  { section: 'showreel-case', experience: 'yandex-plus' },
  { section: 'skyeng', experience: 'skyeng' },
  { section: 'skyeng-packages', experience: 'skyeng' },
  { section: 'skyeng-cards', experience: 'skyeng' },
  { section: 'say-hi', experience: null },
] as const satisfies readonly {
  section: string;
  experience: (typeof Experience)[number]['id'] | null;
}[];

export const MusicIntro = {
  before: 'Yandex',
  middle:
    'Music — the\u00A0top music streaming service\nby\u00A0number of\u00A0listeners subscribers in\u00A0Russia. \nPart of the\u00A0Yandex',
  after:
    'Plus subscription. The\u00A0total\nnumber of\u00A0Plus subscribers is\u00A0over 40\u00A0million',
} as const;

export const YangoIntro = {
  before: 'Yango',
  middle: 'Plus —',
  after: 'unified subscription\nto Yango services',
} as const;

export const ShowreelTitle = 'Showreel';

export const ContactCta = {
  label: 'Say hi',
  href: 'https://t.me/hivanya',
} as const;

export const PressNotes = {
  rebrand: {
    text: 'Yandex Music has rebranded for the first\ntime in 9 years. The service unveiled\nan updated brand platform, logo, visual\nstyle, and a number of product changes',
    label: 'Sostav.ru',
    href: 'https://www.sostav.ru/publication/yandeks-muzyka-64744.html',
  },
  webVersion: {
    text: 'New web version with new features: trailers, concert recommendations and ticket purchases',
    label: 'Kod.ru',
    href: 'https://kod.ru/yandex-music-new-web-version',
  },
  myWave: {
    text: 'Yandex Music has updated My Wave, making its design more responsive to listeners’ preferences',
    label: 'DTF.ru',
    href: 'https://dtf.ru/music/2607432-v-yandeks-muzyke-obnovili-moyu-volnu-ee-dizain-stal-podstraivatsya-pod-predpochteniya-slushatelei',
  },
  israel: {
    text: 'Testing Yango Plus in Israel. \nYango Plus in Israel is a paid membership\nclub for users of the Yango ride-hailing\nand delivery app',
    label: 'pro.yango.com',
    href: 'https://pro.yango.com/il-en/haifa/knowledge-base/taxi/news/yango-plus',
  },
  mena: {
    text: 'Yango Launches AI-Driven Entertainment Super App for MENA',
    label: 'Timeoutdubai.com',
    href: 'https://www.timeoutdubai.com/news/yango-play-app-now-in-uae',
  },
} as const;

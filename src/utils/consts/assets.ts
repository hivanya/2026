// Пути к экспортам из Figma. Файлов в public/ пока нет — их кладёт
// дизайнер после выгрузки; имена ниже это контракт между макетом и вёрсткой.
// Проверку «ссылка есть, а файла нет» делает CI (см. .github/workflows/ci.yml).

export const Assets = {
  // Блок 3 — Яндекс Музыка
  musicBackdrop: '/images/music-backdrop.webp', // фон, растёт при скролле
  musicPhone: '/images/music-phone.webp', // главный экран, по центру
  musicArtist: '/images/music-artist.webp', // артист справа, поднимается
  musicLaptop: '/images/music-laptop.webp', // ноутбук ниже слева
  musicIcon: '/images/music-icon.webp', // иконка ниже справа, tilt-карточка
  musicInterfaceWide: '/images/music-interface-wide.webp', // широкая лента

  // Блок 4 — Моя волна
  wavePhone: '/images/wave-phone.webp',

  // Блок 5 — часы
  watch: '/images/watch.webp',

  // Блок 6 — Yango Plus
  yangoBackdrop: '/images/image-395.webp', // «image 395» из макета
  yangoVideoPoster: '/images/yango-poster.webp',
  yangoVideo: '/video/yango-plus.mp4',

  // Блок 2 — видео-превью
  showreelPoster: '/images/showreel-poster.webp',
} as const;

// Сетка 4×4 в блоке «Моя волна» — 16 иконок.
export const WaveIcons = Array.from({ length: 16 }, (_, index) => ({
  id: `wave-icon-${index + 1}`,
  src: `/images/wave/icon-${index + 1}.webp`,
  label: `Wave icon ${index + 1}`, // PLACEHOLDER: подписи с макета
}));

// Нижний слайдер — интерфейсы айфона, едут влево при скролле страницы.
export const InterfaceSlides = Array.from({ length: 8 }, (_, index) => ({
  id: `interface-${index + 1}`,
  src: `/images/interfaces/screen-${index + 1}.webp`,
  label: `Interface screen ${index + 1}`, // PLACEHOLDER
}));

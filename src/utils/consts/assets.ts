// Экспорт из макета. Растры-заливки тянет tools/figma-fills.mjs,
// составные кадры и векторные иконки — tools/figma-rest.mjs.
// Имена здесь и в скриптах должны совпадать.

export const Assets = {
  // Блок 2 — превью видео (в макете «image 1»)
  showreelPoster: '/images/showreel-poster.webp',

  // Блок 3 — Яндекс Музыка
  musicBackdrop: '/images/music-backdrop.webp',
  musicPhone: '/images/music-phone.webp',
  musicArtist: '/images/music-artist.webp',
  musicLaptop: '/images/music-laptop.webp',
  musicIconArt: '/images/music-icon-art.webp',
  musicCarousel: '/images/music-carousel.webp',
  iconFlash: '/images/icon-flash.svg',
  iconPlus: '/images/icon-plus.svg',
  iconSostav: '/images/icon-sostav.webp',

  // Блок 4 — Моя волна
  wavePhone: '/images/wave-phone.webp',

  // Блок 5 — часы
  watchLeft: '/images/watch-left.webp',
  watchRight: '/images/watch-right.webp',

  // Блок 6-7 — Yango Plus
  yangoBackdrop: '/images/yango-backdrop.webp', // «image 395» из макета
  yangoPhone: '/images/yango-phone.webp',
  yangoCardTall: '/images/yango-card-tall.webp',
  yangoCardMid: '/images/yango-card-mid.webp',
  yangoCardSquare: '/images/yango-card-square.webp',
  yangoAvatar: '/images/yango-avatar.webp',
  yangoDeli: '/images/yango-deli.webp',
  priceCard: '/images/price-card.webp',

  // Блок 8 — нижняя лента интерфейсов
  interfacesStrip: '/images/interfaces-strip.webp',

  // Видео. В макете вместо них стоят статичные кадры — файлов пока нет,
  // см. комментарии «Поставить видос, который делали на нг» (блок 2)
  // и рамку с плеером в блоке Yango Plus.
  showreelVideo: '/video/showreel.mp4',
  yangoVideo: '/video/yango-plus.mp4',
} as const;

// Сетка 4×4 «Моей волны»: 16 иконок 90×90, слева направо, сверху вниз.
// Порядок и подписи — из имён слоёв макета.
export const WaveIcons = [
  { id: 'wave-1', src: '/images/wave/icon-1.svg', label: 'Recommendations' },
  { id: 'wave-2', src: '/images/wave/icon-2.svg', label: 'Album' },
  { id: 'wave-3', src: '/images/wave/icon-3.svg', label: 'Timer' },
  { id: 'wave-4', src: '/images/wave/icon-4.svg', label: 'Forward' },
  { id: 'wave-5', src: '/images/wave/icon-5.svg', label: 'Volume' },
  { id: 'wave-6', src: '/images/wave/icon-6.svg', label: 'Rewind' },
  { id: 'wave-7', src: '/images/wave/icon-7.svg', label: 'Wave' },
  { id: 'wave-8', src: '/images/wave/icon-8.svg', label: 'Phone' },
  { id: 'wave-9', src: '/images/wave/icon-9.svg', label: 'Logout' },
  { id: 'wave-10', src: '/images/wave/icon-10.svg', label: 'Equalizer' },
  { id: 'wave-11', src: '/images/wave/icon-11.svg', label: 'Add' },
  { id: 'wave-12', src: '/images/wave/icon-12.svg', label: 'Voice search' },
  { id: 'wave-13', src: '/images/wave/icon-13.svg', label: 'Add tracks' },
  { id: 'wave-14', src: '/images/wave/icon-14.svg', label: 'Clip' },
  { id: 'wave-15', src: '/images/wave/icon-15.svg', label: 'Shuffle' },
  { id: 'wave-16', src: '/images/wave/icon-16.svg', label: 'Edit' },
] as const;

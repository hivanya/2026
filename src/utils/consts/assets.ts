// Экспорт из макета: растры тянет figma-fills, составные кадры —
// figma-rest, иконки — figma-icons и rasterize-icons
// Имена здесь и в скриптах должны совпадать

export const Assets = {
  // Блок 2 — превью видео, в макете «image 1»
  showreelPoster: '/images/showreel-poster.webp',

  // Блок 3 — Яндекс Музыка
  musicBackdrop: '/images/music-backdrop.webp',
  musicPhone: '/images/music-phone.webp',
  musicArtist: '/images/music-artist.webp',
  musicLaptop: '/images/music-laptop.webp',
  musicIconArt: '/images/music-icon-art.webp',
  musicCarouselOne: '/images/music-carousel-1.webp',
  musicCarouselTwo: '/images/music-carousel-2.webp',
  iconFlash: '/images/icon-flash.svg',
  iconPlus: '/images/icon-plus.svg',
  iconSostav: '/images/icon-sostav.webp',

  // Блок 4 — Моя волна
  wavePhone: '/images/wave-phone.webp',

  // Блок 5 — часы
  watchLeft: '/images/watch-left.webp',
  watchRight: '/images/watch-right.webp',

  // Блок 6-7 — Yango Plus
  yangoBackdrop: '/images/yango-backdrop.webp',
  yangoPhone: '/images/yango-phone.webp',
  yangoCardTall: '/images/yango-card-tall.webp',
  yangoCardMid: '/images/yango-card-mid.webp',
  yangoCardSquare: '/images/yango-card-square.webp',
  yangoAvatar: '/images/yango-avatar.webp',
  yangoDeli: '/images/yango-deli.webp',
  priceCard: '/images/price-card.webp',

  // Блок 8 — лента из пяти экранов 375×812 с просветом 40
  interfaceScreens: [
    '/images/interfaces-strip-1.webp',
    '/images/interfaces-strip-2.webp',
    '/images/interfaces-strip-3.webp',
    '/images/interfaces-strip-4.webp',
    '/images/interfaces-strip-5.webp',
  ],

  // Блок 9 — кейс «Showreel»
  caseStalo: '/images/case-stalo.webp',
  caseFive: '/images/case-5.webp',
  caseThirtyTwo: '/images/case-32.webp',
  caseTicket: '/images/case-ticket.webp',
  caseCarousel: '/images/case-carousel.webp',

  // На мобильном два блока сведены в отдельные кадры
  mobile: {
    waveIcons: '/images/m-wave-icons.webp',
    waveExtra: '/images/m-wave-extra.webp',
  },

  // Ролики из комментариев в макете
  showreelVideo: '/video/showreel.mp4',
  // «Видос» у рамки «Моей волны» и ссылка на Яндекс.Диск у кнопки Play
  myWaveVideo: '/video/mywave.mp4',
  yangoPlayVideo: '/video/yango-play.mp4',
} as const;

// Сетка 4×4: 16 иконок 90×90, слева направо и сверху вниз
// Подписи из имён слоёв макета
export const WaveIcons = [
  { id: 'wave-1', src: '/images/wave/icon-1.png', label: 'Recommendations' },
  { id: 'wave-2', src: '/images/wave/icon-2.png', label: 'Album' },
  { id: 'wave-3', src: '/images/wave/icon-3.png', label: 'Timer' },
  { id: 'wave-4', src: '/images/wave/icon-4.png', label: 'Forward' },
  { id: 'wave-5', src: '/images/wave/icon-5.png', label: 'Volume' },
  { id: 'wave-6', src: '/images/wave/icon-6.png', label: 'Rewind' },
  { id: 'wave-7', src: '/images/wave/icon-7.png', label: 'Wave' },
  { id: 'wave-8', src: '/images/wave/icon-8.png', label: 'Phone' },
  { id: 'wave-9', src: '/images/wave/icon-9.png', label: 'Logout' },
  { id: 'wave-10', src: '/images/wave/icon-10.png', label: 'Equalizer' },
  { id: 'wave-11', src: '/images/wave/icon-11.png', label: 'Add' },
  { id: 'wave-12', src: '/images/wave/icon-12.png', label: 'Voice search' },
  { id: 'wave-13', src: '/images/wave/icon-13.png', label: 'Add tracks' },
  { id: 'wave-14', src: '/images/wave/icon-14.png', label: 'Clip' },
  { id: 'wave-15', src: '/images/wave/icon-15.png', label: 'Shuffle' },
  { id: 'wave-16', src: '/images/wave/icon-16.png', label: 'Edit' },
] as const;

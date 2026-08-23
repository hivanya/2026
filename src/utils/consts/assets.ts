import { withBasePath } from '@/lib/helpers';

const media = withBasePath;

export const Assets = {
  showreelPoster: media('/images/showreel-poster.webp'),

  musicBackdrop: media('/images/music-backdrop.webp'),
  musicPhone: media('/images/music-phone.webp'),
  musicArtist: media('/images/music-artist.webp'),
  musicLaptop: media('/images/music-laptop.webp'),
  musicIconArt: media('/images/music-icon-art.webp'),
  musicCarouselOne: media('/images/music-carousel-1.webp'),
  musicCarouselTwo: media('/images/music-carousel-2.webp'),
  iconFlash: media('/images/icon-flash.svg'),
  iconPlus: media('/images/icon-plus.svg'),
  iconSostav: media('/images/icon-sostav.webp'),

  wavePhone: media('/images/wave-phone.webp'),

  watchLeft: media('/images/watch-left.webp'),
  watchRight: media('/images/watch-right.webp'),

  yangoBackdrop: media('/images/yango-backdrop.webp'),
  yangoPhone: media('/images/yango-phone.webp'),
  yangoCardTall: media('/images/yango-card-tall.webp'),
  yangoCardMid: media('/images/yango-card-mid.webp'),
  yangoCardSquare: media('/images/yango-card-square.webp'),
  yangoAvatar: media('/images/yango-avatar.webp'),
  yangoDeli: media('/images/yango-deli.webp'),
  priceCard: media('/images/price-card.webp'),

  interfaceScreens: [
    media('/images/interfaces-strip-1.webp'),
    media('/images/interfaces-strip-2.webp'),
    media('/images/interfaces-strip-3.webp'),
    media('/images/interfaces-strip-4.webp'),
    media('/images/interfaces-strip-5.webp'),
  ],

  caseStalo: media('/images/case-stalo.webp'),
  caseFive: media('/images/case-5.webp'),
  caseThirtyTwo: media('/images/case-32.webp'),
  caseTicket: media('/images/case-ticket.webp'),
  caseCarousel: media('/images/case-carousel.webp'),

  mobile: {
    waveIcons: media('/images/m-wave-icons.webp'),
    waveExtra: media('/images/m-wave-extra.webp'),
  },

  showreelVideo: media('/video/showreel.mp4'),
  myWaveVideo: media('/video/mywave.mp4'),
  yangoPlayVideo: media('/video/yango-play.mp4'),
} as const;

export const WaveIcons = Array.from({ length: 16 }, (_, index) => ({
  id: `wave-${index + 1}`,
  src: media(`/images/wave/icon-${index + 1}.png`),
  label: `My Wave icon ${index + 1}`,
}));

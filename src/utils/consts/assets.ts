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
  iconTelegram: media('/images/icon-telegram.svg'),

  wavePhone: media('/images/wave-phone.webp'),

  watchLeft: media('/images/watch-left-new.webp'),
  watchCenter: media('/images/watch-center-new.webp'),
  watchRight: media('/images/watch-right-new.webp'),

  yangoBackdrop: media('/images/yango-backdrop.webp'),
  yangoHeroBackdrop: media('/images/yandex-music-backdrop-image.webp'),
  yangoPhone: media('/images/yango-phone.webp'),
  yangoCardTall: media('/images/yango-card-tall.webp'),
  yangoCardMid: media('/images/yango-card-mid.webp'),

  yangoPlusSubscriptionLeft: media('/images/yango-plus-subscription-1.webp'),
  yangoPlusSubscriptionRight: media('/images/yango-plus-subscription-2.webp'),
  yangoPlusSubscriptionWidget: media('/images/yango-plus-subscription-3.webp'),

  yangoCardSquares: [
    media('/images/yango-card-square-1.webp'),
    media('/images/yango-card-square-2.webp'),
    media('/images/yango-card-square-3.webp'),
    media('/images/yango-card-square-4.webp'),
  ],
  yangoAvatar: media('/images/yango-avatar.webp'),
  yangoDeli: media('/images/yango-deli.webp'),
  priceCard: media('/images/price-card.webp'),

  interfaceScreens: [
    { src: media('/images/interfaces-strip-1.webp'), width: 375, height: 812 },
    { src: media('/images/interfaces-strip-2.webp'), width: 375, height: 812 },
    { src: media('/images/interfaces-strip-3.webp'), width: 375, height: 812 },
    { src: media('/images/interfaces-strip-4.webp'), width: 375, height: 812 },
    { src: media('/images/interfaces-strip-5.webp'), width: 375, height: 812 },
  ],

  skyengPackages: media('/images/skyeng-packages.webp'),
  skyengGrammar: media('/images/skyeng-grammar.webp'),
  skyengLessonsShot: media('/images/skyeng-last-block-1.webp'),
  skyengLessonsCard: media('/images/skyeng-last-block-2.webp'),
  skyengRows: media('/images/skyeng-rows.webp'),

  skyengScreens: [
    { src: media('/images/skyeng-strip-1.webp'), width: 1635, height: 866 },
    { src: media('/images/skyeng-strip-2.webp'), width: 400, height: 866 },
    { src: media('/images/skyeng-strip-3.webp'), width: 818, height: 1090 },
    { src: media('/images/skyeng-strip-4.webp'), width: 400, height: 866 },
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
  src: media(`/images/wave/icon-${index + 1}.webp`),
  label: `My Wave icon ${index + 1}`,
}));

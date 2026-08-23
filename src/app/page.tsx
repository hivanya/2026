import React from 'react';

import {
  Header,
  Interfaces,
  MyWave,
  Showreel,
  Watch,
  YandexMusic,
  YangoPlus,
} from '@/components/modules';

// Порядок и высоты секций — из макета, сверху вниз.
export default function HomePage() {
  return (
    <>
      <Header />
      <Showreel />
      <YandexMusic />
      <MyWave />
      <Watch />
      <YangoPlus />
      <Interfaces />
    </>
  );
}

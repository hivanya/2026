import React from 'react';

import {
  About,
  InterfaceSlider,
  MyWave,
  Pricing,
  Showreel,
  Watch,
  YandexMusic,
  YangoPlans,
  YangoPlus,
} from '@/components/modules';

// Порядок блоков — как в макете, сверху вниз.
export default function HomePage() {
  return (
    <>
      <About />
      <Showreel />
      <YandexMusic />
      <MyWave />
      <Watch />
      <YangoPlus />
      <YangoPlans />
      <Pricing />
      <InterfaceSlider />
    </>
  );
}

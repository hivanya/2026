import React from 'react';

import {
  ContactButton,
  Header,
  Interfaces,
  MyWave,
  Showreel,
  ShowreelCase,
  Watch,
  YandexMusic,
  YangoPlus,
} from '@/components/modules';

// Порядок секций из макета, сверху вниз
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
      <ShowreelCase />
      <ContactButton />
    </>
  );
}

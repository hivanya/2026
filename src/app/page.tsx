import React from 'react';

import {
  ContactButton,
  Header,
  Interfaces,
  MyWave,
  Showreel,
  ShowreelCase,
  SkyengCards,
  SkyengInterfaces,
  SkyengPackages,
  Watch,
  YandexMusic,
  YangoPlus,
} from '@/components/modules';

export default function HomePage() {
  return (
    <>
      <Header />

      {/* Yandex Music */}
      <Showreel />
      <YandexMusic />
      <MyWave />
      <Watch />

      {/* Yandex Plus */}
      <YangoPlus />
      <Interfaces />
      <ShowreelCase />

      {/* Skyeng */}
      <SkyengInterfaces />
      <SkyengPackages />
      <SkyengCards />

      <ContactButton />
    </>
  );
}

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
  YangoPlusSubscription
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
      <YangoPlusSubscription />

      {/* Skyeng */}
      <SkyengInterfaces />
      <SkyengPackages />
      <SkyengCards />

      <ContactButton />
    </>
  );
}

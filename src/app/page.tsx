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
  SkyengLessons,
  SkyengPackages,
  Watch,
  YandexMusic,
  YangoPlus,
  YangoPlusSubscription,
} from '@/components/modules';
import { Sheet } from '@/components/ui';

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
      <Sheet>
        <SkyengInterfaces />
        <SkyengPackages />
        <SkyengCards />
        <SkyengLessons />
      </Sheet>

      <ContactButton />
    </>
  );
}

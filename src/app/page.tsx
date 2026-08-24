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
      <Showreel />
      <YandexMusic />
      <MyWave />
      <Watch />
      <YangoPlus />
      <Interfaces />
      <ShowreelCase />
      <SkyengInterfaces />
      <SkyengPackages />
      <SkyengCards />
      <ContactButton />
    </>
  );
}

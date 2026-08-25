import React from 'react';

import {
  ContactButton,
  Header,
  Skyeng,
  YandexMusic,
  YangoPlus,
} from '@/components/modules';

export default function HomePage() {
  return (
    <>
      <Header />
      <YandexMusic />
      <YangoPlus />
      <Skyeng />
      <ContactButton />
    </>
  );
}

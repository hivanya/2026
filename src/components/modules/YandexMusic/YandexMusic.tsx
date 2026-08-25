import React from 'react';

import { YandexMusicIntro } from './components/YandexMusicIntro/YandexMusicIntro';
import { YandexMyWave } from './components/YandexMyWave/YandexMyWave';
import { YandexShowreel } from './components/YandexShowreel/YandexShowreel';
import { YandexWatch } from './components/YandexWatch/YandexWatch';

export const YandexMusic: React.FC = () => (
  <>
    <YandexShowreel />
    <YandexMusicIntro />
    <YandexMyWave />
    <YandexWatch />
  </>
);

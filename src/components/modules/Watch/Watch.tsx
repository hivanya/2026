import React, { FC } from 'react';
import Image from 'next/image';

import { Canvas } from '@/components/ui';
import { Assets } from '@/utils/consts';

import classes from './Watch.module.scss';

// Блок 5 — статичный: два кадра с часами, без интерактива.
// В макете к нему приписано «Перерисовать» — это заметка дизайнера
// себе, вёрстку она не меняет.
export const Watch: FC = () => (
  <Canvas id="watch" height={489} className={classes.section}>
    <Image
      src={Assets.watchLeft}
      alt="Yandex Music on a smartwatch"
      width={820}
      height={600}
      className={classes.left}
    />

    <Image
      src={Assets.watchRight}
      alt="Watch faces"
      width={400}
      height={449}
      className={classes.right}
    />
  </Canvas>
);

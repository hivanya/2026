import React, { FC } from 'react';
import Image from 'next/image';

import { Canvas } from '@/components/ui';
import { Assets, WaveIcons } from '@/utils/consts';

import classes from './MyWave.module.scss';

// Блок 4 — «Моя волна»: слева экран, справа сетка 4×4.
// Комментарий из макета: «При наводке на конкретную иконку у других
// снижается опасити до 20». Сделано на CSS — состояние в React тут лишнее,
// а так эффект работает ещё и на клавиатурном фокусе.
export const MyWave: FC = () => (
  <Canvas id="wave" height={943} className={classes.section}>
    <Image
      src={Assets.wavePhone}
      alt="My Wave screen"
      width={400}
      height={815}
      className={classes.phone}
    />

    <ul className={classes.grid}>
      {WaveIcons.map(({ id, src, label }) => (
        <li key={id} className={classes.icon}>
          <Image src={src} alt={label} width={90} height={90} />
        </li>
      ))}
    </ul>
  </Canvas>
);

import React, { FC } from 'react';
import Image from 'next/image';

import { Section } from '@/components/ui';
import { Assets, WaveIcons } from '@/utils/consts';

import classes from './MyWave.module.scss';

// TODO(figma): текст с макета.
const Title = 'My Wave'; // PLACEHOLDER

// Блок 4 — слева экран «Моей волны», справа сетка 4×4.
// Гашение соседних иконок при наведении сделано на CSS (:hover у сетки
// плюс :hover у самой иконки): состояние в React здесь не нужно,
// а без JS эффект работает и на клавиатурном фокусе.
export const MyWave: FC = () => (
  <Section id="wave">
    <div className={classes.layout}>
      <div className={classes.phone}>
        <Image
          src={Assets.wavePhone}
          alt="My Wave screen"
          width={420}
          height={860}
        />
      </div>

      <div className={classes.side}>
        <h2 className={classes.title}>{Title}</h2>

        <ul className={classes.grid}>
          {WaveIcons.map(({ id, src, label }) => (
            <li key={id} className={classes.icon}>
              <Image src={src} alt={label} width={120} height={120} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  </Section>
);

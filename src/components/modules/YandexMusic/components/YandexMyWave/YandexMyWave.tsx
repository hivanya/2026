import React from 'react';
import Image from 'next/image';

import { Assets, WaveIcons } from '@/utils/consts';

import classes from './YandexMyWave.module.scss';

export const YandexMyWave: React.FC = () => (
  <section id="wave" className={classes.section}>
    <div className={classes.box}>
      <div className={classes.stage}>
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

        <Image
          src={Assets.mobile.waveIcons}
          alt="My Wave icons"
          width={320}
          height={320}
          className={classes.mobileIcons}
        />
      </div>
    </div>
  </section>
);

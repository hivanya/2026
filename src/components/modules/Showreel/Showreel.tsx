'use client';

import React, { FC } from 'react';

import { withBasePath } from '@/lib/helpers';
import { useInViewVideo } from '@/lib/hooks';
import { Assets } from '@/utils/consts';

import classes from './Showreel.module.scss';

// Блок 2 — ролик, плеер нативный
// Стартует в зоне видимости; автозапуск браузеры разрешают только
// беззвучным, звук включается кнопкой в плеере
export const Showreel: FC = () => {
  const videoRef = useInViewVideo();

  return (
    <section id="showreel" className={classes.section}>
      <div className={classes.box}>
        <video
          ref={videoRef}
          className={classes.video}
          controls
          muted
          playsInline
          preload="metadata"
          poster={withBasePath(Assets.showreelPoster)}
        >
          <source src={withBasePath(Assets.showreelVideo)} type="video/mp4" />
        </video>
      </div>
    </section>
  );
};

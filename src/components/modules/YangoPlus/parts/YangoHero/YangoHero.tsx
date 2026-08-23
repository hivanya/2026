'use client';

import React, { FC } from 'react';

import { PressNote } from '@/components/ui';
import { withBasePath } from '@/lib/helpers';
import { useInViewVideo } from '@/lib/hooks';
import { Assets, PressNotes } from '@/utils/consts';

import classes from './YangoHero.module.scss';

// Верх блока: ролик в рамке телефона, справа цитата, на фоне свечение
// Ролик стартует в зоне видимости
export const YangoHero: FC = () => {
  const videoRef = useInViewVideo();

  return (
    <React.Fragment>
      {/* Три пятна с разными периодами: вместе картина не повторяется */}
      <div aria-hidden className={classes.glow}>
        <span className={classes.blobOne} />
        <span className={classes.blobTwo} />
        <span className={classes.blobThree} />
      </div>

      <div className={classes.stage}>
        <div className={classes.phone}>
          <video
            ref={videoRef}
            // Без muted и playsInline автоплей блокируется, на iOS
            // видео уходит в полный экран
            muted
            loop
            playsInline
            preload="metadata"
            poster={withBasePath(Assets.yangoPhone)}
            className={classes.video}
          >
            <source src={withBasePath(Assets.myWaveVideo)} type="video/mp4" />
          </video>
        </div>

        <PressNote
          {...PressNotes.myWave}
          align="left"
          className={classes.press}
        />
      </div>
    </React.Fragment>
  );
};

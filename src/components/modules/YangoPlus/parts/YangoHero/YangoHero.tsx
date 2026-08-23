'use client';

import React from 'react';

import { PressNote } from '@/components/ui';
import { useInViewVideo } from '@/lib/hooks';
import { Assets, PressNotes } from '@/utils/consts';

import classes from './YangoHero.module.scss';

export const YangoHero: React.FC = () => {
  const videoRef = useInViewVideo();

  return (
    <React.Fragment>
      <div aria-hidden className={classes.glow}>
        <span className={classes.blobOne} />
        <span className={classes.blobTwo} />
        <span className={classes.blobThree} />
      </div>

      <div className={classes.stage}>
        <div className={classes.phone}>
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="metadata"
            poster={Assets.yangoPhone}
            className={classes.video}
          >
            <source src={Assets.myWaveVideo} type="video/mp4" />
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

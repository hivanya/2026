'use client';

import React from 'react';

import { PressNote, SoftAurora } from '@/components/ui';
import { useInViewVideo, usePrefersReducedMotion } from '@/lib/hooks';
import { Assets, PressNotes } from '@/utils/consts';

import classes from './YangoHero.module.scss';

export const YangoHero: React.FC = () => {
  const videoRef = useInViewVideo();
  const prefersReduced = usePrefersReducedMotion();

  return (
    <div className={classes.stage}>
      <div aria-hidden className={classes.backdrop}>
        <SoftAurora
          speed={0.6}
          scale={1.3}
          brightness={1.1}
          color1="#505050"
          color2="#000000"
          noiseFrequency={2}
          noiseAmplitude={7.5}
          bandHeight={0.5}
          bandSpread={1}
          octaveDecay={0.22}
          layerOffset={0.4}
          colorSpeed={0.7}
          enableMouseInteraction={false}
          // mouseInfluence={0.25}
          paused={prefersReduced}
        />
      </div>

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
  );
};

'use client';

import React from 'react';

import { useInViewVideo } from '@/lib/hooks';
import { Assets } from '@/utils/consts';

import classes from './Showreel.module.scss';

export const Showreel: React.FC = () => {
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
          poster={Assets.showreelPoster}
        >
          <source src={Assets.showreelVideo} type="video/mp4" />
        </video>
      </div>
    </section>
  );
};

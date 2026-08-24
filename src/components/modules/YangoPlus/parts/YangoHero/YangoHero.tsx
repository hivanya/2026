'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

import { PressNote } from '@/components/ui';
import { useInViewVideo, usePrefersReducedMotion } from '@/lib/hooks';
import { Assets, PressNotes } from '@/utils/consts';

import classes from './YangoHero.module.scss';

export const YangoHero: React.FC = () => {
  const videoRef = useInViewVideo();
  const stageRef = React.useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start end', 'end start'],
  });

  const backdropScale = useTransform(scrollYProgress, [0, 1], [1, 1.9]);

  return (
    <div ref={stageRef} className={classes.stage}>
      <motion.div
        aria-hidden
        className={classes.backdrop}
        style={prefersReduced ? undefined : { scale: backdropScale }}
      >
        <Image
          src={Assets.yangoHeroBackdrop}
          alt=""
          fill
          sizes="160vw"
          className={classes.backdropImage}
        />
      </motion.div>

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

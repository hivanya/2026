'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

import { PressNote } from '@/components/ui';
import { usePrefersReducedMotion } from '@/lib/hooks';
import { Assets, PressNotes } from '@/utils/consts';

import classes from './YandexMusicIntro.module.scss';
import { MusicCarousel } from './components/MusicCarousel/MusicCarousel';
import { MusicCollage } from './components/MusicCollage/MusicCollage';
import { MusicHeading } from './components/MusicHeading/MusicHeading';

export const YandexMusicIntro: React.FC = () => {
  const sectionRef = React.useRef<HTMLElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const backdropScale = useTransform(scrollYProgress, [0, 1], [1, 3.6]);

  return (
    <section id="music" ref={sectionRef} className={classes.section}>
      <motion.div
        aria-hidden
        className={classes.backdrop}
        style={prefersReduced ? undefined : { scale: backdropScale }}
      >
        <Image
          src={Assets.musicBackdrop}
          alt=""
          fill
          sizes="200vw"
          className={classes.backdropImage}
        />
      </motion.div>

      <div className={classes.box}>
        <MusicHeading />

        <MusicCollage />

        <PressNote
          {...PressNotes.rebrand}
          align="right"
          className={classes.pressRebrand}
        />

        <MusicCarousel />

        <PressNote
          {...PressNotes.webVersion}
          align="center"
          inline
          className={classes.pressWeb}
        />
      </div>
    </section>
  );
};

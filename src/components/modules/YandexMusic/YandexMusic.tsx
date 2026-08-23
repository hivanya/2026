'use client';

import React, { FC, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

import { PressNote } from '@/components/ui';
import { usePrefersReducedMotion } from '@/lib/hooks';
import { Assets, PressNotes } from '@/utils/consts';

import classes from './YandexMusic.module.scss';
import { MusicCarousel } from './parts/MusicCarousel/MusicCarousel';
import { MusicCollage } from './parts/MusicCollage/MusicCollage';
import { MusicHeading } from './parts/MusicHeading/MusicHeading';

// Блок 3 — Яндекс Музыка, секция раздаёт прогресс скролла дочерним частям
// Комментарии в макете: фон «увеличивается при скролле», артист
// «при скроле поднимается»
export const YandexMusic: FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const backdropScale = useTransform(scrollYProgress, [0, 1], [1, 2.1]);

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
          icon={{ src: Assets.iconSostav, width: 30, height: 32 }}
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

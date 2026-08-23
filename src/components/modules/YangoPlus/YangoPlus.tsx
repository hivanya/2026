'use client';

import React, { FC, useRef } from 'react';
import { useScroll, useSpring, useTransform } from 'framer-motion';

import { usePrefersReducedMotion } from '@/lib/hooks';

import classes from './YangoPlus.module.scss';
import { YangoCards } from './parts/YangoCards/YangoCards';
import { YangoHeading } from './parts/YangoHeading/YangoHeading';
import { YangoHero } from './parts/YangoHero/YangoHero';
import { YangoPrice } from './parts/YangoPrice/YangoPrice';

// Блоки 6-7 — Yango Plus, секция раздаёт прогресс скролла дочерним частям
export const YangoPlus: FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Без пружины параллакс шагает кусками по сотне пикселей
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.4,
  });

  const priceY = useTransform(progress, [0, 1], ['26%', '-26%']);

  return (
    <section id="yango-plus" ref={sectionRef} className={classes.section}>
      <div className={classes.box}>
        <YangoHero />
        <YangoHeading />
        <YangoCards />
        <YangoPrice priceY={prefersReduced ? null : priceY} />
      </div>
    </section>
  );
};

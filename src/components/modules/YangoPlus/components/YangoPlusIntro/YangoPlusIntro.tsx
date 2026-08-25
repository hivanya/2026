'use client';

import React from 'react';
import { useScroll, useSpring, useTransform } from 'framer-motion';

import { usePrefersReducedMotion } from '@/lib/hooks';

import classes from './YangoPlusIntro.module.scss';
import { YangoCards } from './components/YangoCards/YangoCards';
import { YangoHeading } from './components/YangoHeading/YangoHeading';
import { YangoHero } from './components/YangoHero/YangoHero';
import { YangoPrice } from './components/YangoPrice/YangoPrice';

export const YangoPlusIntro: React.FC = () => {
  const sectionRef = React.useRef<HTMLElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

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

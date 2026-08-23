'use client';

import React, { FC, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

import { Canvas, PressNote } from '@/components/ui';
import { usePrefersReducedMotion } from '@/lib/hooks';
import { Assets, PressNotes } from '@/utils/consts';

import classes from './Interfaces.module.scss';

// Лента в макете 2035 при видимой ширине 1240 — значит проехать нужно
// 795. Переводим в проценты от собственной ширины ленты: transform их
// считает сам, и ход не зависит ни от масштаба холста, ни от вьюпорта.
const StripWidth = 2035;
const ViewportWidth = 1240;
const TravelPercent = ((StripWidth - ViewportWidth) / StripWidth) * 100;

// Блок 8 — нижняя лента интерфейсов. Едет влево, пока страница
// скроллится вниз, и показывает кадры, которые не влезли справа.
export const Interfaces: FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', `-${TravelPercent.toFixed(3)}%`],
  );

  return (
    <div ref={sectionRef}>
      <Canvas id="interfaces" height={874} className={classes.section}>
        <div className={classes.viewport}>
          <motion.div
            className={classes.strip}
            style={prefersReduced ? undefined : { x }}
          >
            <Image
              src={Assets.interfacesStrip}
              alt="iPhone interface screens"
              width={StripWidth}
              height={812}
            />
          </motion.div>
        </div>

        <PressNote
          {...PressNotes.mena}
          align="center"
          inline
          className={classes.press}
        />
      </Canvas>
    </div>
  );
};

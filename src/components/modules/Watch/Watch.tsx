'use client';

import React from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';

import { usePrefersReducedMotion } from '@/lib/hooks';
import { Assets } from '@/utils/consts';

import classes from './Watch.module.scss';

const ColumnWidth = 400;
const Travel = 100;

export const Watch: React.FC = () => {
  const stageRef = React.useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start end', 'end start'],
  });

  // Пружина, чтобы кадры не дёргались за колесом, а подъезжали мягко
  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    mass: 0.4,
  });

  // Боковые кадры идут навстречу друг другу: левый снизу вверх,
  // правый сверху вниз. В середине прокрутки оба стоят на месте
  const leftY = useTransform(progress, [0, 1], [Travel, -Travel]);
  const rightY = useTransform(progress, [0, 1], [-Travel, Travel]);

  return (
    <section id="watch" className={classes.section}>
      <div className={classes.box}>
        <div ref={stageRef} className={classes.stage}>
          <motion.div
            className={classes.left}
            style={prefersReduced ? undefined : { y: leftY }}
          >
            <Image
              src={Assets.watchLeft}
              alt="Now playing on a round watch face"
              width={ColumnWidth}
              height={480}
            />
          </motion.div>

          <div className={classes.center}>
            <Image
              src={Assets.watchCenter}
              alt="Yandex Music on a smartwatch"
              width={ColumnWidth}
              height={600}
            />
          </div>

          <motion.div
            className={classes.right}
            style={prefersReduced ? undefined : { y: rightY }}
          >
            <Image
              src={Assets.watchRight}
              alt="Watch faces"
              width={ColumnWidth}
              height={449}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

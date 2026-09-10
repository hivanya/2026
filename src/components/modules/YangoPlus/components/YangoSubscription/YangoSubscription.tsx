'use client';

import React from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';

import { usePrefersReducedMotion } from '@/lib/hooks';
import { Assets } from '@/utils/consts';

import classes from './YangoSubscription.module.scss';

const WidgetWidth = 396;
const WidgetHeight = 316;

export const YangoSubscription: React.FC = () => {
  const sectionRef = React.useRef<HTMLElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    mass: 0.4,
  });

  const widgetY = useTransform(progress, [0, 1], ['38%', '-38%']);
  const widgetX = useTransform(progress, [0, 1], ['6%', '-6%']);
  const widgetRotate = useTransform(progress, [0, 1], [6, -4]);

  return (
    <section
      id="yango-plus-subscription"
      ref={sectionRef}
      className={classes.section}
    >
      <div className={classes.box}>
        <div className={classes.stage}>
          <div className={classes.left}>
            <Image
              src={Assets.yangoPlusSubscriptionLeft}
              alt="Yango Plus subscription screen 1"
              width={400}
              height={827}
            />

            <motion.span
              aria-hidden
              className={classes.widget}
              style={
                prefersReduced
                  ? undefined
                  : { x: widgetX, y: widgetY, rotate: widgetRotate }
              }
            >
              <Image
                src={Assets.yangoPlusSubscriptionWidget}
                alt=""
                width={WidgetWidth}
                height={WidgetHeight}
              />
            </motion.span>
          </div>

          <Image
            src={Assets.yangoPlusSubscriptionRight}
            alt="Yango Plus subscription screen 2"
            width={820}
            height={1182}
            className={classes.right}
          />
        </div>
      </div>
    </section>
  );
};

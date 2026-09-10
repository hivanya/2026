'use client';

import React from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';

import { Reveal } from '@/components/ui';
import { usePrefersReducedMotion } from '@/lib/hooks';
import { Assets } from '@/utils/consts';

import classes from './SkyengCards.module.scss';

const RecordingWidth = 400;
const RecordingHeight = 283;
const PointerSize = 559;
const GrammarWidth = 554;
const GrammarHeight = 1012;
const RowsWidth = 520;
const RowsHeight = 404;
const ShotWidth = 820;
const ShotHeight = 615;

export const SkyengCards: React.FC = () => {
  const stageRef = React.useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start end', 'end start'],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    mass: 0.4,
  });

  const pointerY = useTransform(progress, [0, 1], ['50%', '-50%']);
  const pointerRotate = useTransform(progress, [0, 1], [20, -12]);

  return (
    <section id="skyeng-cards" className={classes.section}>
      <div className={classes.box}>
        <div ref={stageRef} className={classes.stage}>
          <div className={classes.column}>
            <Reveal className={classes.recording}>
              <Image
                src={Assets.skyengMakeYourReconding}
                alt="Make your recording"
                width={RecordingWidth}
                height={RecordingHeight}
                className={classes.shot}
              />

              <motion.span
                aria-hidden
                className={classes.pointer}
                style={
                  prefersReduced
                    ? undefined
                    : { y: pointerY, rotate: pointerRotate }
                }
              >
                <Image
                  src={Assets.skyengMousePoint}
                  alt=""
                  width={PointerSize}
                  height={PointerSize}
                />
              </motion.span>
            </Reveal>

            <Reveal delay={0.1} className={classes.narrow}>
              <Image
                src={Assets.skyengGrammar}
                alt="Grammar hints in a lesson"
                width={GrammarWidth}
                height={GrammarHeight}
                className={classes.shot}
              />
            </Reveal>
          </div>

          <div className={classes.column}>
            <Reveal className={classes.wide}>
              <Image
                src={Assets.skyengRows}
                alt="Lesson progress rows"
                width={RowsWidth}
                height={RowsHeight}
                className={classes.shot}
              />
            </Reveal>

            <Reveal delay={0.1}>
              <Image
                src={Assets.skyengLessonsShot}
                alt="Lesson exercise on a tablet"
                width={ShotWidth}
                height={ShotHeight}
                className={classes.shot}
              />
            </Reveal>
          </div>
        </div>
      </div>

      <span aria-hidden className={classes.fade} />
    </section>
  );
};

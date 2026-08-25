import React from 'react';
import Image from 'next/image';

import { Reveal } from '@/components/ui';
import { Assets } from '@/utils/consts';

import classes from './SkyengLessons.module.scss';

const CardWidth = 366;
const CardHeight = 280;
const ShotWidth = 820;
const ShotHeight = 615;

export const SkyengLessons: React.FC = () => (
  <section id="skyeng-lessons" className={classes.section}>
    <div className={classes.box}>
      <div className={classes.stage}>
        <Reveal className={classes.card}>
          <Image
            src={Assets.skyengLessonsCard}
            alt="Interactive online lessons"
            width={CardWidth}
            height={CardHeight}
            className={classes.shot}
          />
        </Reveal>

        <Reveal delay={0.1} className={classes.shotHolder}>
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
  </section>
);

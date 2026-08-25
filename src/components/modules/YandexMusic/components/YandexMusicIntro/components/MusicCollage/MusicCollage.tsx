'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

import { TiltCard } from '@/components/ui';
import { usePrefersReducedMotion } from '@/lib/hooks';
import { Assets } from '@/utils/consts';

import classes from './MusicCollage.module.scss';

export const MusicCollage: React.FC = () => {
  const collageRef = React.useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: collageRef,
    offset: ['start end', 'end start'],
  });

  const artistY = useTransform(scrollYProgress, [0, 1], [90, -240]);
  const artY = useTransform(scrollYProgress, [0, 1], [100, -180]);

  return (
    <div ref={collageRef} className={classes.collage}>
      <div className={classes.left}>
        <Image
          src={Assets.musicPhone}
          alt="Yandex Music main screen"
          width={400}
          height={815}
          className={classes.phone}
        />

        <Image
          src={Assets.musicLaptop}
          alt="Desktop app"
          width={820}
          height={800}
          className={classes.laptop}
        />
      </div>

      <motion.div
        className={classes.right}
        style={prefersReduced ? undefined : { y: artistY }}
      >
        <motion.div className={classes.artist}>
          <Image
            src={Assets.musicArtist}
            alt="Artist page"
            width={400}
            height={800}
          />
        </motion.div>

        <motion.div className={classes.artHolder}>
          <TiltCard
            maxTilt={18}
            className={classes.card}
            surfaceClassName={classes.cardSurface}
          >
            <Image
              src={Assets.musicIconArt}
              alt="App icon"
              width={310}
              height={338}
              className={classes.art}
            />
          </TiltCard>
        </motion.div>
      </motion.div>
    </div>
  );
};

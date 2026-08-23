'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

import { TiltCard } from '@/components/ui';
import { Assets } from '@/utils/consts';

import classes from './MusicCollage.module.scss';

export const MusicCollage: React.FC = () => (
  <div className={classes.collage}>
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

    <div className={classes.right}>
      <motion.div className={classes.artist}>
        <Image
          src={Assets.musicArtist}
          alt="Artist page"
          width={400}
          height={800}
        />
      </motion.div>

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
    </div>
  </div>
);

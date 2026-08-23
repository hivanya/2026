'use client';

import React, { FC } from 'react';
import { motion, MotionValue } from 'framer-motion';
import Image from 'next/image';

import { TiltCard } from '@/components/ui';
import { Assets } from '@/utils/consts';

import classes from './MusicCollage.module.scss';

interface Props {
  /** Подъём артиста при скролле, null при выключенных анимациях */
  artistY: MotionValue<string> | null;
}

// Две колонки: слева главный экран и ноутбук, справа артист и карточка
// Высота берётся из содержимого
export const MusicCollage: FC<Props> = ({ artistY }) => (
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
      <motion.div
        className={classes.artist}
        style={artistY ? { y: artistY } : undefined}
      >
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

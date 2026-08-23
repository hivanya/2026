'use client';

import React, { FC } from 'react';
import { motion, MotionValue } from 'framer-motion';
import Image from 'next/image';

import { PressNote } from '@/components/ui';
import { Assets, PressNotes } from '@/utils/consts';

import classes from './YangoPrice.module.scss';

interface Props {
  /** Параллакс карточки цены, null при выключенных анимациях */
  priceY: MotionValue<string> | null;
}

// Упоминание слева, карточка цены справа, кадр Deli под ними
// Комментарий в макете: «паралакс эффект»
export const YangoPrice: FC<Props> = ({ priceY }) => (
  <div className={classes.stage}>
    <PressNote {...PressNotes.israel} align="left" className={classes.press} />

    <motion.div
      className={classes.card}
      style={priceY ? { y: priceY } : undefined}
    >
      <Image
        src={Assets.priceCard}
        alt="Yango Plus pricing"
        width={365}
        height={365}
      />
    </motion.div>

    <Image
      src={Assets.yangoDeli}
      alt="Yango Deli desktop"
      width={1240}
      height={932}
      className={classes.deli}
    />
  </div>
);

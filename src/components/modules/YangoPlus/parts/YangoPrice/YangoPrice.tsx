'use client';

import React from 'react';
import { motion, MotionValue } from 'framer-motion';
import Image from 'next/image';

import { PressNote } from '@/components/ui';
import { Assets, PressNotes } from '@/utils/consts';

import classes from './YangoPrice.module.scss';

interface Props {
  priceY: MotionValue<string> | null;
}

export const YangoPrice: React.FC<Props> = ({ priceY }) => (
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

import React, { FC } from 'react';
import Image from 'next/image';

import { Reveal } from '@/components/ui';
import { Assets, MusicIntro } from '@/utils/consts';

import classes from './MusicHeading.module.scss';

// Внутри строки две иконки, под них в макете оставлены пробелы —
// поэтому текст разрезан на три куска
export const MusicHeading: FC = () => (
  <Reveal as="h2" className={classes.heading}>
    {MusicIntro.before}
    <Image
      src={Assets.iconFlash}
      alt=""
      width={40}
      height={40}
      className={classes.flash}
    />

    {MusicIntro.middle}

    <Image
      src={Assets.iconPlus}
      alt=""
      width={34}
      height={34}
      className={classes.plus}
    />

    {MusicIntro.after}
  </Reveal>
);

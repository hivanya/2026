import React from 'react';
import Image from 'next/image';

import { Reveal } from '@/components/ui';
import { Assets, YangoIntro } from '@/utils/consts';

import classes from './YangoHeading.module.scss';

export const YangoHeading: React.FC = () => (
  <Reveal as="h2" className={classes.heading}>
    {YangoIntro.before}

    <Image
      src={Assets.iconPlus}
      alt=""
      width={34}
      height={34}
      className={classes.plus}
    />

    {YangoIntro.after}
  </Reveal>
);

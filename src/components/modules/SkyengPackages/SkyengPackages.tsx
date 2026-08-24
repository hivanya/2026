import React from 'react';
import Image from 'next/image';

import { Reveal } from '@/components/ui';
import { Assets } from '@/utils/consts';

import classes from './SkyengPackages.module.scss';

const ShotWidth = 926;
const ShotHeight = 944;

export const SkyengPackages: React.FC = () => (
  <section
    id="skyeng-packages"
    data-surface="light"
    className={classes.section}
  >
    <div className={classes.box}>
      <Reveal className={classes.card}>
        <Image
          src={Assets.skyengPackages}
          alt="Skyeng subscription packages"
          width={ShotWidth}
          height={ShotHeight}
          className={classes.shot}
        />
      </Reveal>
    </div>
  </section>
);

import React, { FC } from 'react';
import Image from 'next/image';

import { Reveal } from '@/components/ui';
import { Assets } from '@/utils/consts';

import classes from './Watch.module.scss';

// Блок 5 — два статичных кадра с часами
// Комментарий в макете «Перерисовать» — заметка дизайнера, не задача
export const Watch: FC = () => (
  <section id="watch" className={classes.section}>
    <div className={classes.box}>
      <Reveal className={classes.stage}>
        <Image
          src={Assets.watchLeft}
          alt="Yandex Music on a smartwatch"
          width={820}
          height={600}
          className={classes.left}
        />

        <Image
          src={Assets.watchRight}
          alt="Watch faces"
          width={400}
          height={449}
          className={classes.right}
        />
      </Reveal>
    </div>
  </section>
);

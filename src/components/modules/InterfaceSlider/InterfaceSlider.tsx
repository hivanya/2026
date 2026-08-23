import React, { FC } from 'react';
import Image from 'next/image';

import { ScrollRow } from '@/components/ui';
import { InterfaceSlides } from '@/utils/consts';

import classes from './InterfaceSlider.module.scss';

// Блок 9 — нижний слайдер. Секция залипает, и пока страница скроллится
// вниз, лента экранов уезжает влево, показывая все кадры.
export const InterfaceSlider: FC = () => (
  <section id="interfaces" className={classes.section}>
    <ScrollRow mode="pinned">
      {InterfaceSlides.map(({ id, src, label }) => (
        <figure key={id} className={classes.slide}>
          <Image src={src} alt={label} width={420} height={860} />
        </figure>
      ))}
    </ScrollRow>
  </section>
);

import React, { FC } from 'react';
import Image from 'next/image';

import { Section } from '@/components/ui';
import { Assets } from '@/utils/consts';

import classes from './Watch.module.scss';

// Блок 5 — просто картинка с часами, без интерактива.
export const Watch: FC = () => (
  <Section id="watch">
    <Image
      src={Assets.watch}
      alt="Yandex Music on a smartwatch"
      width={1200}
      height={800}
      className={classes.image}
    />
  </Section>
);

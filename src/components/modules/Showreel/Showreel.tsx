import React, { FC } from 'react';
import Image from 'next/image';

import { ExternalLink, Section } from '@/components/ui';
import { Assets } from '@/utils/consts';

import classes from './Showreel.module.scss';

// Блок 2 — ссылка на видео. Сделан карточкой-постером: кликабельна вся
// область, а не только подпись.
// TODO(figma): подставить настоящий адрес ролика.
const ShowreelHref = 'https://vimeo.com/'; // PLACEHOLDER

export const Showreel: FC = () => (
  <Section id="showreel">
    <ExternalLink href={ShowreelHref} className={classes.card}>
      <Image
        src={Assets.showreelPoster}
        alt="Showreel"
        width={1200}
        height={675}
        className={classes.poster}
      />

      <span aria-hidden className={classes.play}>
        ▶
      </span>

      <span className={classes.label}>Watch the showreel</span>
    </ExternalLink>
  </Section>
);

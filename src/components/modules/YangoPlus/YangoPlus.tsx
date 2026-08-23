'use client';

import React, { FC } from 'react';
import Image from 'next/image';

import { ExternalLink, PhoneFrame, Section } from '@/components/ui';
import { withBasePath } from '@/lib/helpers';
import { useInViewVideo } from '@/lib/hooks';
import { Assets, PressLink } from '@/utils/consts';

import classes from './YangoPlus.module.scss';

// Блок 6 — рамка айфона по центру на фоне image 395, справа снизу цитата
// из прессы и ссылка на источник. Видео стартует, когда до него доскроллили.
export const YangoPlus: FC = () => {
  const videoRef = useInViewVideo();

  return (
    <Section id="yango-plus" fluid className={classes.section}>
      <Image
        aria-hidden
        alt=""
        src={Assets.yangoBackdrop}
        fill
        sizes="100vw"
        className={classes.backdrop}
      />

      <div className={classes.content}>
        <PhoneFrame className={classes.phone}>
          <video
            ref={videoRef}
            // Автоплей без muted и playsInline браузеры блокируют,
            // на iOS видео вдобавок уходит в полноэкранный режим.
            muted
            loop
            playsInline
            preload="metadata"
            poster={withBasePath(Assets.yangoVideoPoster)}
          >
            <source src={withBasePath(Assets.yangoVideo)} type="video/mp4" />
          </video>
        </PhoneFrame>

        <figure className={classes.quote}>
          <blockquote className={classes.quoteText}>
            {PressLink.quote}
          </blockquote>

          <figcaption>
            <ExternalLink href={PressLink.href} className={classes.source}>
              {PressLink.label}
            </ExternalLink>
          </figcaption>
        </figure>
      </div>
    </Section>
  );
};

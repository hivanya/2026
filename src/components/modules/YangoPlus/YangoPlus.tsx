'use client';

import React, { FC, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';

import { Canvas, PressNote } from '@/components/ui';
import { withBasePath } from '@/lib/helpers';
import { useInViewVideo, usePrefersReducedMotion } from '@/lib/hooks';
import { Assets, PressNotes, YangoIntro } from '@/utils/consts';

import classes from './YangoPlus.module.scss';

// Блоки 6-7 — Yango Plus. Фон image 395, по центру рамка с роликом
// (стартует, когда до неё доскроллили), справа снизу цитата из прессы;
// ниже заголовок, карточки сервисов и карточка цены с параллаксом
// (комментарий в макете так и называется — «паралакс эффект»).
export const YangoPlus: FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useInViewVideo();
  const prefersReduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Пружина сглаживает рывки колеса мыши: без неё параллакс шагает
  // кусками по сотне пикселей.
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.4,
  });

  const priceY = useTransform(progress, [0, 1], ['16%', '-16%']);

  return (
    <div ref={sectionRef}>
      <Canvas id="yango-plus" height={4122} className={classes.section}>
        <Image
          aria-hidden
          src={Assets.yangoBackdrop}
          alt=""
          width={1616}
          height={1246}
          className={classes.backdrop}
        />

        <div className={classes.phone}>
          <video
            ref={videoRef}
            // Автоплей без muted и playsInline браузеры блокируют,
            // на iOS видео вдобавок уходит в полный экран.
            muted
            loop
            playsInline
            preload="metadata"
            poster={withBasePath(Assets.yangoPhone)}
            className={classes.video}
          >
            <source src={withBasePath(Assets.yangoVideo)} type="video/mp4" />
          </video>
        </div>

        <PressNote
          {...PressNotes.myWave}
          align="right"
          className={classes.pressWave}
        />

        <h2 className={classes.heading}>
          {YangoIntro.before}
          <Image
            src={Assets.iconPlus}
            alt=""
            width={34}
            height={34}
            className={classes.iconPlus}
          />
          {YangoIntro.after}
        </h2>

        <div className={classes.cardTall}>
          <Image
            src={Assets.yangoCardTall}
            alt="Yango Plus subscription screen"
            width={400}
            height={1447}
          />
          <Image
            src={Assets.yangoAvatar}
            alt=""
            width={36}
            height={36}
            className={classes.avatar}
          />
        </div>

        <Image
          src={Assets.yangoCardMid}
          alt="Yango Plus benefits"
          width={400}
          height={840}
          className={classes.cardMid}
        />

        <Image
          src={Assets.yangoCardSquare}
          alt="Yango Plus promo block"
          width={350}
          height={350}
          className={classes.cardSquare}
        />

        <div className={classes.playBadge}>
          <span aria-hidden className={classes.playIcon} />
        </div>

        <PressNote
          {...PressNotes.israel}
          align="left"
          className={classes.pressIsrael}
        />

        <motion.div
          className={classes.price}
          style={prefersReduced ? undefined : { y: priceY }}
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
      </Canvas>
    </div>
  );
};

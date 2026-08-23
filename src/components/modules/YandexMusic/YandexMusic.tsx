'use client';

import React, { FC, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

import { ScrollRow, Section, TiltCard } from '@/components/ui';
import { usePrefersReducedMotion } from '@/lib/hooks';
import { Assets } from '@/utils/consts';

import classes from './YandexMusic.module.scss';

// TODO(figma): текст с макета.
const Title = 'Yandex Music'; // PLACEHOLDER
const Description =
  'Redesign of the main screen, artist pages and the desktop app.'; // PLACEHOLDER

// Блок 3 — коллаж Яндекс Музыки. Всё движение считается от одного
// прогресса скролла по сцене, чтобы слои ехали согласованно.
export const YandexMusic: FC = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start end', 'end start'],
  });

  // Фон разъезжается по мере ухода страницы вниз.
  const backdropScale = useTransform(scrollYProgress, [0, 1], [1, 1.35]);
  // Артист поднимается навстречу скроллу — он единственный слой,
  // который обгоняет остальные.
  const artistY = useTransform(scrollYProgress, [0, 1], ['12%', '-18%']);

  const motionStyle = (style: object) => (prefersReduced ? undefined : style);

  return (
    <Section id="music" fluid className={classes.section}>
      <div ref={stageRef} className={classes.stage}>
        <motion.div
          aria-hidden
          className={classes.backdrop}
          style={motionStyle({ scale: backdropScale })}
        >
          <Image
            src={Assets.musicBackdrop}
            alt=""
            fill
            sizes="100vw"
            className={classes.backdropImage}
          />
        </motion.div>

        <div className={classes.content}>
          <header className={classes.header}>
            <h2 className={classes.title}>{Title}</h2>
            <p className={classes.description}>{Description}</p>
          </header>

          <div className={classes.collage}>
            {/* Главный экран — центр композиции, единственный статичный слой. */}
            <div className={classes.phone}>
              <Image
                src={Assets.musicPhone}
                alt="Yandex Music main screen"
                width={420}
                height={860}
              />
            </div>

            <motion.div
              className={classes.artist}
              style={motionStyle({ y: artistY })}
            >
              <Image
                src={Assets.musicArtist}
                alt="Artist page"
                width={380}
                height={780}
              />
            </motion.div>

            <div className={classes.laptop}>
              <Image
                src={Assets.musicLaptop}
                alt="Desktop app"
                width={720}
                height={460}
              />
            </div>

            <div className={classes.icon}>
              <TiltCard maxTilt={20}>
                <Image
                  src={Assets.musicIcon}
                  alt="App icon"
                  width={220}
                  height={220}
                />
              </TiltCard>
            </div>
          </div>
        </div>
      </div>

      {/* Широкая лента интерфейса — уезжает влево, пока блок проходит экран. */}
      <ScrollRow mode="drift" driftPercent={22}>
        <Image
          src={Assets.musicInterfaceWide}
          alt="Yandex Music interface"
          width={3200}
          height={900}
          className={classes.wide}
        />
      </ScrollRow>
    </Section>
  );
};

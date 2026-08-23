'use client';

import React, { FC, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

import { Canvas, PressNote, TiltCard } from '@/components/ui';
import { usePrefersReducedMotion } from '@/lib/hooks';
import { Assets, MusicIntro, PressNotes } from '@/utils/consts';

import classes from './YandexMusic.module.scss';

// В макете карусель нарисована одним кадром, а под ней три деления —
// комментарий «добавить карусель». Пока кадр один; когда дизайнер отдаст
// остальные, достаточно дописать сюда — разметка и точки подстроятся.
const CarouselSlides = [
  { id: 'web', src: Assets.musicCarousel, label: 'Yandex Music web player' },
];

// Блок 3 — Яндекс Музыка. Все слои спозиционированы координатами макета;
// движутся два: фон («увеличивается при скролле») и артист
// («при скроле поднимается»).
export const YandexMusic: FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const backdropScale = useTransform(scrollYProgress, [0, 1], [1, 1.35]);
  // Артист обгоняет остальные слои — сдвиг в процентах от своей высоты,
  // чтобы эффект не зависел от масштаба холста.
  const artistY = useTransform(scrollYProgress, [0, 1], ['14%', '-14%']);

  const motionStyle = (style: object) => (prefersReduced ? undefined : style);

  return (
    <div ref={sectionRef}>
      <Canvas id="music" height={3259} className={classes.section}>
        <motion.div
          aria-hidden
          className={classes.backdrop}
          style={motionStyle({ scale: backdropScale })}
        >
          <Image
            src={Assets.musicBackdrop}
            alt=""
            fill
            sizes="3677px"
            className={classes.backdropImage}
          />
        </motion.div>

        <h2 className={classes.heading}>
          {MusicIntro.before}
          <Image
            src={Assets.iconFlash}
            alt=""
            width={40}
            height={40}
            className={classes.iconFlash}
          />
          {MusicIntro.middle}
          <Image
            src={Assets.iconPlus}
            alt=""
            width={34}
            height={34}
            className={classes.iconPlus}
          />
          {MusicIntro.after}
        </h2>

        {/* Главный экран — центр композиции, единственный статичный мокап. */}
        <Image
          src={Assets.musicPhone}
          alt="Yandex Music main screen"
          width={400}
          height={815}
          className={classes.phone}
        />

        <motion.div
          className={classes.artist}
          style={motionStyle({ y: artistY })}
        >
          <Image
            src={Assets.musicArtist}
            alt="Artist page"
            width={400}
            height={800}
          />
        </motion.div>

        <Image
          src={Assets.musicLaptop}
          alt="Desktop app"
          width={820}
          height={800}
          className={classes.laptop}
        />

        <TiltCard maxTilt={18} className={classes.iconCard}>
          <Image
            src={Assets.musicIconArt}
            alt="App icon"
            width={310}
            height={338}
            className={classes.iconArt}
          />
        </TiltCard>

        <PressNote
          {...PressNotes.rebrand}
          align="right"
          icon={{ src: Assets.iconSostav, width: 30, height: 32 }}
          className={classes.pressRebrand}
        />

        <div className={classes.carousel}>
          <ul className={classes.slides}>
            {CarouselSlides.map(({ id, src, label }) => (
              <li key={id} className={classes.slide}>
                <Image src={src} alt={label} width={1240} height={800} />
              </li>
            ))}
          </ul>
        </div>

        <ul className={classes.dots} aria-hidden>
          {CarouselSlides.map(({ id }, index) => (
            <li
              key={id}
              className={index === 0 ? classes.dotActive : classes.dot}
            />
          ))}
        </ul>

        <PressNote
          {...PressNotes.webVersion}
          align="center"
          inline
          className={classes.pressWeb}
        />
      </Canvas>
    </div>
  );
};

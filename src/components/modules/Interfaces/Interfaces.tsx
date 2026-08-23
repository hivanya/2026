'use client';

import React, { CSSProperties, FC, useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

import { PressNote } from '@/components/ui';
import { usePrefersReducedMotion } from '@/lib/hooks';
import { Assets, PressNotes } from '@/utils/consts';

import classes from './Interfaces.module.scss';

const ScreenWidth = 375;
const ScreenHeight = 812;

// Блок 8 — нижняя лента интерфейсов
// Секция залипает, вертикальный скролл гонит ленту вправо и отпускает
// страницу, когда последний экран встал по центру окна
// Путь меряем: он зависит от ширины окна и числа кадров
export const Interfaces: FC = () => {
  const pinRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLUListElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  const [travel, setTravel] = useState(0);

  useEffect(() => {
    const viewport = viewportRef.current;
    const strip = stripRef.current;
    if (!viewport || !strip) return;

    // ResizeObserver срабатывает сразу при подписке, отдельный замер не нужен
    const observer = new ResizeObserver(() => {
      const last = strip.lastElementChild;
      if (!last) return;

      // Центр последнего экрана относительно начала ленты: сдвиг обоих
      // прямоугольников одинаковый, поэтому трансформа не мешает
      const offset =
        last.getBoundingClientRect().left - strip.getBoundingClientRect().left;
      const centre = offset + last.getBoundingClientRect().width / 2;

      setTravel(Math.max(0, centre - viewport.clientWidth / 2));
    });

    observer.observe(viewport);
    observer.observe(strip);

    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: pinRef,
    // От момента прилипания до момента, когда участок дошёл до низа
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -travel]);

  return (
    <section id="interfaces" className={classes.section}>
      <div
        ref={pinRef}
        className={classes.pin}
        style={{ '--travel': `${travel}px` } as CSSProperties}
      >
        <div className={classes.sticky}>
          <div ref={viewportRef} className={classes.viewport}>
            <motion.ul
              ref={stripRef}
              className={classes.strip}
              style={prefersReduced ? undefined : { x }}
            >
              {Assets.interfaceScreens.map((src, index) => (
                <li key={src} className={classes.screen}>
                  <Image
                    src={src}
                    alt={`iPhone interface screen ${index + 1}`}
                    width={ScreenWidth}
                    height={ScreenHeight}
                  />
                </li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>

      <div className={classes.box}>
        <PressNote
          {...PressNotes.mena}
          align="center"
          inline
          className={classes.press}
        />
      </div>
    </section>
  );
};

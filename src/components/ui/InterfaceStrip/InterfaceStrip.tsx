'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

import { usePrefersReducedMotion } from '@/lib/hooks';

import classes from './InterfaceStrip.module.scss';

export interface StripScreen {
  src: string;
  width: number;
  height: number;
}

interface Props {
  screens: readonly StripScreen[];
  alt: string;
  gap?: number;
}

const DefaultGap = 40;

// Липкая лента скриншотов: секция выше экрана ровно на длину проезда,
// внутри неё лента едет влево по прогрессу скролла и останавливается,
// когда последний кадр встаёт по центру.
//
// Размеры кадров приходят в пикселях макета, а на экран переводятся
// через --unit: он ужимает ленту, если самый высокий кадр не влезает
// в окно или самый широкий шире экрана телефона
export const InterfaceStrip: React.FC<Props> = ({
  screens,
  alt,
  gap = DefaultGap,
}) => {
  const pinRef = React.useRef<HTMLDivElement>(null);
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const stripRef = React.useRef<HTMLUListElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  const [travel, setTravel] = React.useState(0);

  React.useEffect(() => {
    const viewport = viewportRef.current;
    const strip = stripRef.current;
    if (!viewport || !strip) return;

    const observer = new ResizeObserver(() => {
      const last = strip.lastElementChild;
      if (!last) return;

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
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -travel]);

  const tallest = Math.max(...screens.map((screen) => screen.height));
  const widest = Math.max(...screens.map((screen) => screen.width));

  return (
    <div
      ref={pinRef}
      className={classes.pin}
      style={{ '--travel': `${travel}px` } as React.CSSProperties}
    >
      <div className={classes.sticky}>
        <div ref={viewportRef} className={classes.viewport}>
          <motion.ul
            ref={stripRef}
            className={classes.strip}
            style={
              {
                '--tallest': tallest,
                '--widest': widest,
                '--gap': gap,
                ...(prefersReduced ? {} : { x }),
              } as React.CSSProperties
            }
          >
            {screens.map((screen, index) => (
              <li
                key={screen.src}
                className={classes.screen}
                style={{ '--width': screen.width } as React.CSSProperties}
              >
                <Image
                  src={screen.src}
                  alt={`${alt} ${index + 1}`}
                  width={screen.width}
                  height={screen.height}
                />
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </div>
  );
};

'use client';

import React from 'react';
import clsx from 'clsx';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

import { usePrefersReducedMotion } from '@/lib/hooks';

import classes from './InterfaceStrip.module.scss';

type EdgeUnit = `${number}${'px' | 'vw' | 'vh' | '%'}`;
type ViewportEdge = 'start' | 'end' | 'center' | EdgeUnit;

export interface StripScreen {
  src: string;
  width: number;
  height: number;
}

interface Props {
  screens: readonly StripScreen[];
  alt: string;
  gap?: number;
  startsAt?: ViewportEdge;
  tail?: number;
}

const DefaultGap = 40;
const DefaultStart: ViewportEdge = 'start';

export const InterfaceStrip: React.FC<Props> = ({
  screens,
  alt,
  gap = DefaultGap,
  startsAt = DefaultStart,
  tail,
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

      const gutter = parseFloat(getComputedStyle(strip).paddingLeft) || 0;
      const lastRight =
        last.getBoundingClientRect().right - strip.getBoundingClientRect().left;

      setTravel(Math.max(0, lastRight - (viewport.clientWidth - gutter)));
    });

    observer.observe(viewport);
    observer.observe(strip);

    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: [`start ${startsAt}`, 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -travel]);

  const tallest = Math.max(...screens.map((screen) => screen.height));
  const widest = Math.max(...screens.map((screen) => screen.width));

  return (
    <div
      ref={pinRef}
      className={clsx(classes.pin, tail !== undefined && classes.tailed)}
      style={
        {
          '--travel': `${travel}px`,
          '--tallest': tallest,
          '--widest': widest,
          '--gap': gap,
          ...(tail === undefined ? {} : { '--tail': `${tail}px` }),
        } as React.CSSProperties
      }
    >
      <div className={classes.sticky}>
        <div ref={viewportRef} className={classes.viewport}>
          <motion.ul
            ref={stripRef}
            className={classes.strip}
            style={(prefersReduced ? {} : { x }) as React.CSSProperties}
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

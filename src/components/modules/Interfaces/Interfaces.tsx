'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

import { PressNote } from '@/components/ui';
import { usePrefersReducedMotion } from '@/lib/hooks';
import { Assets, PressNotes } from '@/utils/consts';

import classes from './Interfaces.module.scss';

const ScreenWidth = 375;
const ScreenHeight = 812;

export const Interfaces: React.FC = () => {
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

  return (
    <section id="interfaces" className={classes.section}>
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

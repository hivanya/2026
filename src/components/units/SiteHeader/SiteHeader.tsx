'use client';

import React from 'react';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

import { usePrefersReducedMotion } from '@/lib/hooks';
import { PersonName, SocialLinks } from '@/utils/consts';

import classes from './SiteHeader.module.scss';

// Высота полосы, которую занимает шапка. По ней считаем, какая секция
// сейчас под ней проходит
const HeaderBand = 60;

export const SiteHeader: React.FC = () => {
  const prefersReduced = usePrefersReducedMotion();
  const [visible, setVisible] = React.useState(false);
  const [onLight, setOnLight] = React.useState(false);

  React.useEffect(() => {
    const intro = document.getElementById('about');
    if (!intro) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 },
    );

    observer.observe(intro);

    return () => observer.disconnect();
  }, []);

  // Фона у шапки нет, поэтому на светлых блоках белый текст пропадает.
  // Считаем корнем наблюдателя полоску под шапкой: как только в неё
  // въезжает светлая секция, перекрашиваем надписи в чёрный
  React.useEffect(() => {
    const targets = document.querySelectorAll('[data-surface="light"]');
    if (!targets.length) return;

    const lit = new Set<Element>();
    let observer: IntersectionObserver | null = null;

    const connect = () => {
      observer?.disconnect();
      lit.clear();

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) lit.add(entry.target);
            else lit.delete(entry.target);
          }

          setOnLight(lit.size > 0);
        },
        {
          rootMargin: `0px 0px -${Math.max(0, window.innerHeight - HeaderBand)}px 0px`,
        },
      );

      targets.forEach((target) => observer?.observe(target));
    };

    connect();
    window.addEventListener('resize', connect);

    return () => {
      window.removeEventListener('resize', connect);
      observer?.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          className={clsx(classes.header, onLight && classes.onLight)}
          initial={prefersReduced ? false : { y: '-100%' }}
          animate={{ y: 0 }}
          exit={prefersReduced ? undefined : { y: '-100%' }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={classes.box}>
            <span className={classes.name}>{PersonName}</span>

            <ul className={classes.links}>
              {SocialLinks.map(({ id, label, href }) => (
                <li key={id}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes.link}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
};

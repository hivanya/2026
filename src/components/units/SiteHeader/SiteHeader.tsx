'use client';

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { usePrefersReducedMotion } from '@/lib/hooks';
import { PersonName, SocialLinks } from '@/utils/consts';

import classes from './SiteHeader.module.scss';

export const SiteHeader: React.FC = () => {
  const prefersReduced = usePrefersReducedMotion();
  const [visible, setVisible] = React.useState(false);

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

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          className={classes.header}
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

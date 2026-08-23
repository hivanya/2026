'use client';

import React from 'react';
import { motion } from 'framer-motion';

import { Reveal } from '@/components/ui';
import { usePrefersReducedMotion } from '@/lib/hooks';
import { ContactCta } from '@/utils/consts';

import classes from './ContactButton.module.scss';

export const ContactButton: React.FC = () => {
  const prefersReduced = usePrefersReducedMotion();

  return (
    <section id="say-hi" className={classes.section}>
      <div className={classes.box}>
        <Reveal>
          <motion.a
            href={ContactCta.href}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.button}
            whileHover={prefersReduced ? undefined : { scale: 1.015 }}
            whileTap={prefersReduced ? undefined : { scale: 0.985 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
          >
            <span className={classes.label}>{ContactCta.label}</span>
          </motion.a>
        </Reveal>
      </div>
    </section>
  );
};

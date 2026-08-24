'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

import { Reveal } from '@/components/ui';
import { usePrefersReducedMotion } from '@/lib/hooks';
import { Assets, ContactCta } from '@/utils/consts';

import classes from './ContactButton.module.scss';

const IconWidth = 130;
const IconHeight = 108;

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

            <span aria-hidden className={classes.badge}>
              <Image
                src={Assets.iconTelegram}
                alt=""
                width={IconWidth}
                height={IconHeight}
                className={classes.icon}
              />
            </span>
          </motion.a>
        </Reveal>
      </div>
    </section>
  );
};

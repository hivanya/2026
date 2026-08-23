'use client';

import React, { FC, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

import { Section } from '@/components/ui';
import { usePrefersReducedMotion } from '@/lib/hooks';

import classes from './Pricing.module.scss';

// TODO(figma): цена, период и состав тарифа — с макета.
const Plan = {
  title: 'Yango Plus',
  price: '199 ₽',
  period: 'per month',
  features: [
    'All Yango services in one subscription',
    'Cancel anytime',
    'Up to 4 family members',
  ],
} as const;

// Блок 8 — статичный, движется только карточка цены: она отстаёт от
// страницы и за счёт этого читается как отдельный слой.
export const Pricing: FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Пружина сглаживает рывки колеса мыши: без неё параллакс шагает
  // кусками по 100+ px.
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.4,
  });

  const y = useTransform(progress, [0, 1], ['18%', '-18%']);

  return (
    <Section id="pricing">
      <div ref={sectionRef} className={classes.layout}>
        <div className={classes.copy}>
          <h2 className={classes.title}>{Plan.title}</h2>

          <ul className={classes.features}>
            {Plan.features.map((feature) => (
              <li key={feature} className={classes.feature}>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <motion.aside
          className={classes.card}
          style={prefersReduced ? undefined : { y }}
        >
          <p className={classes.price}>{Plan.price}</p>
          <p className={classes.period}>{Plan.period}</p>
        </motion.aside>
      </div>
    </Section>
  );
};

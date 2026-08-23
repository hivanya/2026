'use client';

import React from 'react';
import { motion } from 'framer-motion';

import { usePrefersReducedMotion } from '@/lib/hooks';

const Tags = {
  div: motion.div,
  h2: motion.h2,
  figure: motion.figure,
  ul: motion.ul,
} as const;

interface Props extends React.PropsWithChildren {
  delay?: number;
  as?: keyof typeof Tags;
  className?: string;
}

export const Reveal: React.FC<Props> = ({
  delay = 0,
  as = 'div',
  className,
  children,
}) => {
  const prefersReduced = usePrefersReducedMotion();

  if (prefersReduced) return React.createElement(as, { className }, children);

  const Tag = Tags[as];

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </Tag>
  );
};

'use client';

import React, { FC } from 'react';
import { motion } from 'framer-motion';

import { usePrefersReducedMotion } from '@/lib/hooks';

// Готовые motion-компоненты на уровне модуля: motion.create() в рендере
// пересоздавал бы компонент на каждый проход и сбрасывал его состояние
const Tags = {
  div: motion.div,
  h2: motion.h2,
  figure: motion.figure,
  ul: motion.ul,
} as const;

interface Props extends React.PropsWithChildren {
  /** Задержка внутри группы блоков, с */
  delay?: number;
  /** Тег обёртки, чтобы не ломать семантику */
  as?: keyof typeof Tags;
  className?: string;
}

// Мягкое появление блока при входе в зону видимости
// Срабатывает один раз: повтор при каждом проходе мимо утомляет
export const Reveal: FC<Props> = ({
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
      // amount 0.15 — блок считается показанным, едва появился краем,
      // иначе высокие блоки ждут до середины экрана
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.7,
        delay,
        // Быстрый старт и долгое замедление
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </Tag>
  );
};

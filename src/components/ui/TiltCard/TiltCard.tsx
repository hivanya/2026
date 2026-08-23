'use client';

import React, { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

import { useTilt } from '@/lib/hooks';

import classes from './TiltCard.module.scss';

interface Props extends PropsWithChildren {
  /** Максимальный наклон в градусах у края карточки. */
  maxTilt?: number;
  className?: string;
}

// Парящая карточка по мотивам примера motion.dev/examples/react-tilt-card.
// Перспектива живёт на внешнем div: если поставить её на сам motion-элемент,
// поворот будет плоским — CSS применит perspective к потомкам, а не к себе.
export const TiltCard: FC<Props> = ({ maxTilt, className, children }) => {
  const { ref, handlers, style, glare, lift, prefersReduced } = useTilt({
    maxTilt,
  });

  return (
    <div ref={ref} className={clsx(classes.scene, className)} {...handlers}>
      <motion.div
        className={classes.card}
        style={style}
        // Карточка приподнимается под курсором — вместе с наклоном это
        // и читается как «парит», а не «крутится на месте».
        whileHover={prefersReduced ? undefined : { y: -lift, scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 180, damping: 20 }}
      >
        {children}

        {!prefersReduced && (
          // Блик — отдельным слоем поверх содержимого, событий мыши не ловит.
          <motion.span
            aria-hidden
            className={classes.glare}
            style={{ left: glare.x, top: glare.y }}
          />
        )}
      </motion.div>
    </div>
  );
};

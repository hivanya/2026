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

// Парящая карточка по мотивам motion.dev/examples/react-tilt-card.
// В макете к иконке приписано «добавить 3d эффект или свечение» — отсюда
// и наклон под курсором, и блик, который за ним едет.
//
// Перспектива живёт на внешнем div: на самом motion-элементе CSS применил
// бы её к потомкам, а не к нему, и поворот вышел бы плоским.
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
          // Свечение — отдельным слоем поверх содержимого, мышь не ловит.
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

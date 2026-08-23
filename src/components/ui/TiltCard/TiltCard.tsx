'use client';

import React, { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

import { useTilt } from '@/lib/hooks';

import classes from './TiltCard.module.scss';

interface Props extends PropsWithChildren {
  /** Максимальный наклон в градусах у края карточки */
  maxTilt?: number;
  /** Класс внешнего контейнера: позиция и размер. Он не наклоняется */
  className?: string;
  /**
   * Класс самой карточки: фон, скругление, рамка, тень. На внешнем
   * контейнере они остались бы на месте при наклоне
   */
  surfaceClassName?: string;
}

// Наклон и блик под курсором, комментарий в макете: «добавить 3d эффект
// или свечение»
// Перспектива на внешнем div: на motion-элементе CSS применил бы её
// к потомкам, и поворот вышел бы плоским
export const TiltCard: FC<Props> = ({
  maxTilt,
  className,
  surfaceClassName,
  children,
}) => {
  const { ref, handlers, style, glare, prefersReduced } = useTilt({ maxTilt });

  return (
    <div ref={ref} className={clsx(classes.scene, className)} {...handlers}>
      <motion.div
        className={clsx(classes.card, surfaceClassName)}
        style={style}
        // Только наклон: на коллаже карточка стоит вплотную к соседям,
        // и любой рост габаритов читается как подпрыгивание
      >
        {children}

        {!prefersReduced && (
          // Свечение поверх содержимого, событий мыши не ловит
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

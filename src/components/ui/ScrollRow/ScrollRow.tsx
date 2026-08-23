'use client';

import React, {
  FC,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from 'react';
import clsx from 'clsx';
import { motion, useScroll, useTransform } from 'framer-motion';

import { usePrefersReducedMotion } from '@/lib/hooks';

import classes from './ScrollRow.module.scss';

interface Props extends PropsWithChildren {
  /**
   * pinned — секция прилипает к экрану, и лента проезжает целиком, пока
   * страница скроллится вниз. drift — лента просто сдвигается, пока секция
   * проходит мимо, страница при этом не залипает.
   */
  mode?: 'pinned' | 'drift';
  /** Для drift: насколько лента уезжает влево за проход, в процентах. */
  driftPercent?: number;
  className?: string;
}

export const ScrollRow: FC<Props> = ({
  mode = 'pinned',
  driftPercent = 30,
  className,
  children,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  // Сколько пикселей лента должна проехать, чтобы показать последний кадр.
  // Считаем в JS: ширина ленты зависит от количества и размера картинок,
  // из CSS её не достать.
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(track);
    window.addEventListener('resize', measure);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [children]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    // pinned: отсчёт от момента, когда секция прилипла, до момента,
    // когда её нижний край дошёл до низа экрана.
    // drift: весь проход секции через вьюпорт.
    offset:
      mode === 'pinned'
        ? ['start start', 'end end']
        : ['start end', 'end start'],
  });

  const pinnedX = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const driftX = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', `-${driftPercent}%`],
  );

  const x = mode === 'pinned' ? pinnedX : driftX;

  if (mode === 'drift') {
    return (
      <div ref={sectionRef} className={clsx(classes.drift, className)}>
        <motion.div
          ref={trackRef}
          className={classes.track}
          style={prefersReduced ? undefined : { x }}
        >
          {children}
        </motion.div>
      </div>
    );
  }

  return (
    <div
      ref={sectionRef}
      className={clsx(classes.pinned, className)}
      // Высота = экран + путь ленты: пока страница проходит эту высоту,
      // залипший экран отдаёт скролл ленте. Без запаса секция отклеится
      // раньше, чем покажет последний кадр.
      style={{ height: `calc(100vh + ${distance}px)` }}
    >
      <div className={classes.sticky}>
        <motion.div
          ref={trackRef}
          className={classes.track}
          style={prefersReduced ? undefined : { x }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

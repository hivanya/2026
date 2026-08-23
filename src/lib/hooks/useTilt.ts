'use client';

import { useRef } from 'react';
import { useMotionValue, useSpring, useTransform } from 'framer-motion';

import { usePrefersReducedMotion } from './usePrefersReducedMotion';

interface Options {
  /** Максимальный наклон в градусах на краю карточки. */
  maxTilt?: number;
  /** Насколько карточка «всплывает» под курсором, px. */
  lift?: number;
}

// Парящая карточка из примера motion.dev (react-tilt-card).
// Идея: нормализуем позицию курсора внутри карточки в диапазон [-0.5, 0.5]
// и вешаем его на rotateX/rotateY через пружину — тогда угол наклона
// зависит от того, к какому углу карточки поднесли мышь, и движение
// не рвётся, а догоняет курсор.
export function useTilt({ maxTilt = 18, lift = 24 }: Options = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  // Мягкая пружина: без неё карточка дёргается на каждый mousemove.
  const config = { stiffness: 180, damping: 20, mass: 0.6 };
  const springX = useSpring(pointerX, config);
  const springY = useSpring(pointerY, config);

  // Вертикальное движение мыши наклоняет карточку вокруг оси X — знак
  // инвертирован, иначе карточка отворачивается от курсора.
  const rotateX = useTransform(springY, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-maxTilt, maxTilt]);

  // Блик едет за курсором — он и продаёт ощущение объёма.
  const glareX = useTransform(springX, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(springY, [-0.5, 0.5], ['0%', '100%']);

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReduced) return;

    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();

    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  // Курсор ушёл — карточка возвращается в ноль той же пружиной.
  const onPointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return {
    ref,
    prefersReduced,
    handlers: { onPointerMove, onPointerLeave },
    style: prefersReduced ? {} : { rotateX, rotateY },
    glare: { x: glareX, y: glareY },
    lift,
  };
}

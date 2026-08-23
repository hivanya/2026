'use client';

import { useRef } from 'react';
import { useMotionValue, useSpring, useTransform } from 'framer-motion';

import { usePrefersReducedMotion } from './usePrefersReducedMotion';

interface Options {
  /** Максимальный наклон в градусах на краю карточки */
  maxTilt?: number;
}

// Наклон карточки за курсором, по мотивам motion.dev/examples/react-tilt-card
// Позиция курсора нормализуется в [-0.5, 0.5] и через пружину идёт
// на rotateX/rotateY
export function useTilt({ maxTilt = 18 }: Options = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  // Без пружины карточка дёргается на каждый mousemove
  const config = { stiffness: 180, damping: 20, mass: 0.6 };
  const springX = useSpring(pointerX, config);
  const springY = useSpring(pointerY, config);

  // Знак инвертирован, иначе карточка отворачивается от курсора
  const rotateX = useTransform(springY, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-maxTilt, maxTilt]);

  // Блик едет за курсором
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

  // Курсор ушёл — та же пружина возвращает карточку в ноль
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
  };
}

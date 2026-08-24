'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

import { usePrefersReducedMotion } from '@/lib/hooks';
import { Assets } from '@/utils/consts';

import classes from './YangoCards.module.scss';
import { YangoPlayer } from '../YangoPlayer/YangoPlayer';

const Cards = Assets.yangoCardSquares;
// Карточка 357px плюс зазор 10px — на столько лента едет за один шаг
const Step = 367;
const Dwell = 3200;
const Slide = { duration: 0.7, ease: [0.22, 0.61, 0.36, 1] } as const;
const Instant = { duration: 0 } as const;

// Промо-лента в нижнем блоке листается сама, как в приложении. Карточки
// продублированы: доехав до копии первой, лента без анимации прыгает
// в начало — кадры совпадают пиксель в пиксель, стыка не видно
export const YangoCards: React.FC = () => {
  const prefersReduced = usePrefersReducedMotion();

  const [step, setStep] = React.useState(0);
  const [rewinding, setRewinding] = React.useState(false);

  React.useEffect(() => {
    if (prefersReduced) return;

    const timer = setInterval(() => {
      setRewinding(false);
      setStep((current) => current + 1);
    }, Dwell);

    return () => clearInterval(timer);
  }, [prefersReduced]);

  const handleSlideEnd = () => {
    if (step < Cards.length) return;

    setRewinding(true);
    setStep(0);
  };

  return (
    <div className={classes.stage}>
      <div className={classes.tall}>
        <Image
          src={Assets.yangoCardTall}
          alt="Yango Plus subscription screen"
          width={400}
          height={1447}
        />

        <Image
          src={Assets.yangoAvatar}
          alt=""
          width={36}
          height={36}
          className={classes.avatar}
        />
      </div>

      <Image
        src={Assets.yangoCardMid}
        alt="Yango Plus benefits"
        width={400}
        height={840}
        className={classes.mid}
      />

      <div className={classes.squares}>
        <motion.ul
          className={classes.strip}
          animate={{ x: -step * Step }}
          transition={rewinding ? Instant : Slide}
          onAnimationComplete={handleSlideEnd}
        >
          {[...Cards, ...Cards].map((src, index) => {
            const position = index % Cards.length;
            const isClone = index >= Cards.length;

            return (
              <li key={index} aria-hidden={isClone}>
                <Image
                  src={src}
                  alt={isClone ? '' : `Yango Plus promo block ${position + 1}`}
                  width={350}
                  height={350}
                />
              </li>
            );
          })}
        </motion.ul>
      </div>

      <YangoPlayer />
    </div>
  );
};

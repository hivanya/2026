'use client';

import React, { FC, useRef, useState } from 'react';
import clsx from 'clsx';

import { withBasePath } from '@/lib/helpers';
import { Assets } from '@/utils/consts';

import classes from './YangoPlayer.module.scss';

// Кольцо в системе координат 100×100: тянется вместе с кружком
const Radius = 48;
const Circumference = 2 * Math.PI * Radius;

// В макете синий круг с треугольником, в комментарии рядом ссылка
// на ролик; после нажатия играет нативный плеер с полоской таймлайна
// по окружности
//
// Видео в разметке с самого начала: если создавать его по клику,
// жест на него не распространяется и запуск со звуком блокируется
// политикой автоплея
export const YangoPlayer: FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [progress, setProgress] = useState(0);

  const start = () => {
    // play() вызывается синхронно в обработчике — так браузер
    // засчитывает жест и пускает звук
    void videoRef.current?.play().catch(() => setStarted(false));
    setStarted(true);
  };

  return (
    <div className={classes.player}>
      <video
        ref={videoRef}
        className={clsx(classes.video, !started && classes.hidden)}
        controls={started}
        playsInline
        preload="none"
        onTimeUpdate={(event) => {
          const video = event.currentTarget;
          // duration бывает NaN, пока не приехали метаданные
          setProgress(video.duration ? video.currentTime / video.duration : 0);
        }}
      >
        <source src={withBasePath(Assets.yangoPlayVideo)} type="video/mp4" />
      </video>

      {started ? (
        <svg
          aria-hidden
          viewBox="0 0 100 100"
          className={classes.ring}
          // Старт с двенадцати часов, а не с трёх
          style={{ rotate: '-90deg' }}
        >
          <circle className={classes.track} cx="50" cy="50" r={Radius} />
          <circle
            className={classes.progress}
            cx="50"
            cy="50"
            r={Radius}
            strokeDasharray={Circumference}
            strokeDashoffset={Circumference * (1 - progress)}
          />
        </svg>
      ) : (
        <button
          type="button"
          aria-label="Play the Yango Plus video"
          className={classes.badge}
          onClick={start}
        >
          <span aria-hidden className={classes.icon} />
        </button>
      )}
    </div>
  );
};

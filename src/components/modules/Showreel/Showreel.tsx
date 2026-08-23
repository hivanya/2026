'use client';

import React, { FC, useRef, useState } from 'react';
import Image from 'next/image';

import { Canvas } from '@/components/ui';
import { withBasePath } from '@/lib/helpers';
import { Assets } from '@/utils/consts';

import classes from './Showreel.module.scss';

// Блок 2 — ролик. Играет прямо на странице: никаких ссылок и переходов,
// нажатие на плей запускает воспроизведение здесь же.
//
// Видео не грузим, пока его не запросили: 18 МБ в preload съели бы
// весь трафик первого экрана ради блока, до которого ещё надо доскроллить.
export const Showreel: FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const play = () => {
    setStarted(true);
    // Пользователь нажал сам, поэтому автоплей-политика не мешает —
    // но promise всё равно может отвалиться, если файл не доехал.
    void videoRef.current?.play().catch(() => setStarted(false));
  };

  return (
    <Canvas id="showreel" height={778} className={classes.section}>
      <div className={classes.player}>
        <video
          ref={videoRef}
          className={classes.video}
          preload="none"
          playsInline
          controls={started}
          poster={withBasePath(Assets.showreelPoster)}
          onPause={() => setStarted(false)}
          onPlay={() => setStarted(true)}
        >
          <source src={withBasePath(Assets.showreelVideo)} type="video/mp4" />
        </video>

        {!started && (
          <>
            {/* Постер отдельной картинкой: у <video preload="none"> он
                в части браузеров не рисуется, пока нет метаданных. */}
            <Image
              aria-hidden
              src={Assets.showreelPoster}
              alt=""
              fill
              sizes="1240px"
              priority
              className={classes.poster}
            />

            <button type="button" className={classes.play} onClick={play}>
              <span className={classes.playIcon} aria-hidden />
              <span className={classes.playLabel}>Play</span>
            </button>
          </>
        )}
      </div>
    </Canvas>
  );
};

'use client';

import React from 'react';
import clsx from 'clsx';
import Image from 'next/image';

import { useInViewVideo } from '@/lib/hooks';
import { Assets } from '@/utils/consts';

import classes from './Showreel.module.scss';

const FrameWidth = 1240;
const FrameHeight = 778;
const HaveCurrentData = 2;

export const Showreel: React.FC = () => {
  const videoRef = useInViewVideo();
  const [ready, setReady] = React.useState(false);

  // Не onLoadedData: короткое видео успевает выстрелить событием
  // до гидратации, и обработчик его уже не застаёт
  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.readyState >= HaveCurrentData) {
      setReady(true);
      return;
    }

    const onReady = () => setReady(true);
    video.addEventListener('loadeddata', onReady);

    return () => video.removeEventListener('loadeddata', onReady);
  }, [videoRef]);

  return (
    <section id="showreel" className={classes.section}>
      <div className={classes.box}>
        <div className={classes.frame}>
          <video
            ref={videoRef}
            className={classes.video}
            width={FrameWidth}
            height={FrameHeight}
            controls
            muted
            playsInline
            preload="metadata"
          >
            <source src={Assets.showreelVideo} type="video/mp4" />
          </video>

          {/* Постер отдельной картинкой поверх видео, а не атрибутом poster:
              Safari не берёт webp в poster, а пустой <video> красится
              непрозрачным серым — под ним постера не видно. Снимаем его,
              когда появился первый кадр */}
          <Image
            src={Assets.showreelPoster}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 1240px"
            className={clsx(classes.poster, ready && classes.posterGone)}
          />
        </div>
      </div>
    </section>
  );
};

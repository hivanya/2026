'use client';

import React from 'react';
import clsx from 'clsx';
import Image from 'next/image';

import { Assets } from '@/utils/consts';

import classes from './MusicCarousel.module.scss';

const Slides = [
  { id: 'web', src: Assets.musicCarouselOne, label: 'Yandex Music web player' },
  { id: 'concert', src: Assets.musicCarouselTwo, label: 'Concert page' },
];

const SlideWidth = 1240;
const SlideHeight = 800;

export const MusicCarousel: React.FC = () => {
  const trackRef = React.useRef<HTMLUListElement>(null);
  const [dragging, setDragging] = React.useState(false);

  const drag = React.useRef<{ pointerX: number; scrollLeft: number } | null>(
    null,
  );

  const onPointerDown = (event: React.PointerEvent<HTMLUListElement>) => {
    const track = trackRef.current;
    if (!track || event.pointerType === 'touch') return;

    drag.current = { pointerX: event.clientX, scrollLeft: track.scrollLeft };
    track.style.scrollSnapType = 'none';
    setDragging(true);
    track.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLUListElement>) => {
    const track = trackRef.current;
    if (!track || !drag.current) return;

    track.scrollLeft =
      drag.current.scrollLeft - (event.clientX - drag.current.pointerX);
  };

  const onPointerUp = (event: React.PointerEvent<HTMLUListElement>) => {
    const track = trackRef.current;
    if (!track || !drag.current) return;

    drag.current = null;
    setDragging(false);
    track.releasePointerCapture(event.pointerId);

    track.style.scrollSnapType = '';
  };

  return (
    <div className={classes.frame}>
      <ul
        ref={trackRef}
        className={clsx(classes.track, dragging && classes.dragging)}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {Slides.map(({ id, src, label }) => (
          <li key={id} className={classes.slide}>
            <Image
              src={src}
              alt={label}
              width={SlideWidth}
              height={SlideHeight}
              draggable={false}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

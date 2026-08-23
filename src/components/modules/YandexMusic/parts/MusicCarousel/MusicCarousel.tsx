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

export const MusicCarousel: React.FC = () => {
  const trackRef = React.useRef<HTMLUListElement>(null);
  const [active, setActive] = React.useState(0);
  const [dragging, setDragging] = React.useState(false);

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;

    setActive(Math.round(track.scrollLeft / track.clientWidth));
  };

  const goTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;

    track.scrollTo({ left: index * track.clientWidth, behavior: 'smooth' });
  };

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
    <React.Fragment>
      <div className={classes.frame}>
        <ul
          ref={trackRef}
          className={clsx(classes.track, dragging && classes.dragging)}
          onScroll={onScroll}
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
                width={1240}
                height={800}
                draggable={false}
              />
            </li>
          ))}
        </ul>
      </div>

      <ul className={classes.dots}>
        {Slides.map(({ id, label }, index) => (
          <li key={id}>
            <button
              type="button"
              aria-label={label}
              aria-current={index === active}
              className={clsx(classes.dot, index === active && classes.current)}
              onClick={() => goTo(index)}
            />
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

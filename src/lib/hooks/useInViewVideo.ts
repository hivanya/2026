'use client';

import { useEffect, useRef } from 'react';

// Видео в рамке айфона должно стартовать ровно тогда, когда до него
// доскроллили, и вставать на паузу, когда уехало — иначе оно крутится
// в фоне и жрёт батарею на мобильных.
export function useInViewVideo(threshold = 0.5) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // play() возвращает промис и реджектится, если автоплей
          // заблокирован политикой браузера. Молча игнорируем: у видео
          // есть постер, и без звука это не потеря.
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold },
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}

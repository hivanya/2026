'use client';

import { useEffect, useRef } from 'react';

// Запускает видео в зоне видимости и ставит на паузу за её пределами
export function useInViewVideo(threshold = 0.5) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // play() реджектится, если автоплей заблокирован политикой
          // браузера — у видео есть постер, показывать нечего
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

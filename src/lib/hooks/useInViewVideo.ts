'use client';

import React from 'react';

export function useInViewVideo(threshold = 0.5) {
  const ref = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
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

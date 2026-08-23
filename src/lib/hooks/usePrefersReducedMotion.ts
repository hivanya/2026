'use client';

import React from 'react';

const Query = '(prefers-reduced-motion: reduce)';

export function usePrefersReducedMotion() {
  const subscribe = React.useCallback((onChange: () => void) => {
    const query = window.matchMedia(Query);

    query.addEventListener('change', onChange);

    return () => query.removeEventListener('change', onChange);
  }, []);

  return React.useSyncExternalStore(
    subscribe,
    () => window.matchMedia(Query).matches,
    () => false,
  );
}

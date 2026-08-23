'use client';

import { useCallback, useSyncExternalStore } from 'react';

const Query = '(prefers-reduced-motion: reduce)';

// Motion-значения живут вне каскада, поэтому CSS-медиазапроса мало —
// анимации приходится гасить и в JS
export function usePrefersReducedMotion() {
  const subscribe = useCallback((onChange: () => void) => {
    const query = window.matchMedia(Query);

    query.addEventListener('change', onChange);

    return () => query.removeEventListener('change', onChange);
  }, []);

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(Query).matches,
    // На сервере медиазапрос не спросить, разметка от него не зависит
    () => false,
  );
}

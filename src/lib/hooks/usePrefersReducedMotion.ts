'use client';

import { useCallback, useSyncExternalStore } from 'react';

const Query = '(prefers-reduced-motion: reduce)';

// Скролл-эффектов на странице много, и часть из них — крупные сдвиги
// (параллакс, разъезжающиеся ленты). Для тех, кто просил систему убрать
// анимации, их нужно гасить в JS, а не только в CSS: motion-значения
// живут вне каскада.
//
// Читаем через useSyncExternalStore, а не через useState + useEffect:
// матч медиа-запроса — это внешнее состояние, и подписка на него не должна
// вызывать лишний рендер после гидрации.
export function usePrefersReducedMotion() {
  const subscribe = useCallback((onChange: () => void) => {
    const query = window.matchMedia(Query);

    query.addEventListener('change', onChange);

    return () => query.removeEventListener('change', onChange);
  }, []);

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(Query).matches,
    // На сервере медиа-запрос не спросить. Отдаём false: разметка при
    // выключенных анимациях не меняется, меняется только поведение.
    () => false,
  );
}

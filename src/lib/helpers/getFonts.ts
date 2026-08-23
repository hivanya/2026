import { Inter } from 'next/font/google';

// Контент англоязычный, кириллица нужна только на всякий случай в подписях —
// сабсет берём оба, вес переменный.
const interSans = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

export function getFonts() {
  return interSans.variable;
}

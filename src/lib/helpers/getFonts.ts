import { Inter } from 'next/font/google';

// В макете Graphik LCG — коммерческий шрифт, в репозиторий его не положить.
// Inter стоит подменой: тот же нейтральный гротеск, близкие метрики,
// так что размеры с макета не разъезжаются. Стек собран в globals.scss
// (--font-graphik), сюда достаточно завести переменную Inter.
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export function getFonts() {
  return inter.variable;
}

import localFont from 'next/font/local';

const graphik = localFont({
  src: [
    {
      path: '../../fonts/GraphikLCG-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../fonts/GraphikLCG-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-graphik-local',
  display: 'swap',
  fallback: ['system-ui', 'Helvetica Neue', 'Arial', 'sans-serif'],
});

export function getFonts() {
  return graphik.variable;
}

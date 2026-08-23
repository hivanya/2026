import React from 'react';
import type { Metadata } from 'next';

import { Layout } from '@/components/units';
import { getFonts } from '@/lib/helpers';
import { PersonBio, PersonName } from '@/utils/consts';

import 'normalize.css';
import '../styles/globals.scss';

// Пути в metadata Next не префиксует сам, в отличие от next/image
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const title = `${PersonName} — Design Lead`;

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? 'https://example.com',
  ),
  title,
  description: PersonBio,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: PersonName,
    title,
    description: PersonBio,
  },
  icons: {
    icon: [{ url: `${basePath}/favicon.svg`, type: 'image/svg+xml' }],
    shortcut: `${basePath}/favicon.svg`,
  },
};

type Props = Readonly<React.PropsWithChildren>;

export default function RootLayout({ children }: Props) {
  return (
    // Класс next/font на <html>, а не на <body>: переменную шрифта
    // должен видеть стек --font-graphik, объявленный на :root
    <html lang="en" className={getFonts()}>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}

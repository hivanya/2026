import React, { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';

import classes from './ExternalLink.module.scss';

interface Props extends PropsWithChildren {
  href: string;
  className?: string;
}

// Все внешние ссылки открываем в новой вкладке. rel обязателен: без
// noopener чужая страница получает доступ к window.opener.
export const ExternalLink: FC<Props> = ({ href, className, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={clsx(classes.link, className)}
  >
    {children}
  </a>
);

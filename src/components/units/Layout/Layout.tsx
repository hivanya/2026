import React, { FC, PropsWithChildren } from 'react';

import classes from './Layout.module.scss';

// Шапки и подвала в макете нет — обёртка нужна только чтобы задать
// поток страницы в одном месте.
export const Layout: FC<PropsWithChildren> = ({ children }) => (
  <main className={classes.main}>{children}</main>
);

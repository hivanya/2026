import React from 'react';

import classes from './Layout.module.scss';

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <main className={classes.main}>{children}</main>
);

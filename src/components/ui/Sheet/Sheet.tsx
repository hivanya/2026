import React from 'react';
import clsx from 'clsx';

import classes from './Sheet.module.scss';

interface Props extends React.PropsWithChildren {
  className?: string;
}

export const Sheet: React.FC<Props> = ({ className, children }) => (
  <div data-surface="light" className={clsx(classes.sheet, className)}>
    <span aria-hidden className={classes.grabber} />

    {children}
  </div>
);

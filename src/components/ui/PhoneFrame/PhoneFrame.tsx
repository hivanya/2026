import React, { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';

import classes from './PhoneFrame.module.scss';

interface Props extends PropsWithChildren {
  className?: string;
}

// Рамка айфона вокруг видео в блоке Yango Plus. Пока рисуется CSS-ом;
// если в макете рамка отдельной картинкой — заменить содержимое на <Image>,
// оставив тот же контракт.
export const PhoneFrame: FC<Props> = ({ className, children }) => (
  <div className={clsx(classes.frame, className)}>
    <span aria-hidden className={classes.notch} />
    <div className={classes.screen}>{children}</div>
  </div>
);

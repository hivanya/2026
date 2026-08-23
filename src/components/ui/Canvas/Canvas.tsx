import React, { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';

import classes from './Canvas.module.scss';

interface Props extends PropsWithChildren {
  id?: string;
  /** Высота секции в единицах макета (разница между её началом и началом следующей). */
  height: number;
  className?: string;
}

// Макет — фиксированный холст 1280. Секция задаёт себе высоту из макета,
// а внутри лежит центрированное поле той же ширины: дети позиционируются
// абсолютно теми же координатами, что в Figma. Это единственный способ
// не растерять пиксели на коллажах, где ничего не выравнивается по сетке.
export const Canvas: FC<Props> = ({ id, height, className, children }) => (
  <section
    id={id}
    className={clsx(classes.section, className)}
    style={{ height: `calc(${height} * var(--u))` }}
  >
    <div className={classes.canvas}>{children}</div>
  </section>
);

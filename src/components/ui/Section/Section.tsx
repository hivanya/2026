import React, { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';

import classes from './Section.module.scss';

interface Props extends PropsWithChildren {
  id?: string;
  title?: string;
  /** Заголовок по центру — у блоков Яндекс Музыки и Yango Plus. */
  centered?: boolean;
  /** Секция во всю ширину экрана: фоны и ленты не должны упираться в glass. */
  fluid?: boolean;
  className?: string;
  containerClassName?: string;
}

export const Section: FC<Props> = ({
  id,
  title,
  centered,
  fluid,
  className,
  containerClassName,
  children,
}) => (
  <section id={id} className={clsx(classes.section, className)}>
    <div
      className={clsx(
        fluid ? classes.fluid : classes.container,
        centered && classes.centered,
        containerClassName,
      )}
    >
      {title && <h2 className={classes.title}>{title}</h2>}
      {children}
    </div>
  </section>
);

import React, { FC } from 'react';
import clsx from 'clsx';
import Image from 'next/image';

import classes from './PressNote.module.scss';
import { Reveal } from '../Reveal/Reveal';

interface Props {
  text: string;
  label: string;
  href: string;
  /** Выравнивание, у пяти упоминаний в макете оно разное */
  align?: 'left' | 'center' | 'right';
  /** Логотип издания перед ссылкой, есть только у Sostav.ru */
  icon?: { src: string; width: number; height: number };
  /** Ссылка в строку с текстом, а не под ним: Kod.ru, Timeoutdubai */
  inline?: boolean;
  className?: string;
}

// Цитата и ссылка на источник, пять вхождений в макете
export const PressNote: FC<Props> = ({
  text,
  label,
  href,
  align = 'left',
  icon,
  inline,
  className,
}) => (
  <Reveal
    as="figure"
    className={clsx(
      classes.note,
      classes[align],
      inline && classes.inline,
      className,
    )}
  >
    <blockquote className={classes.text}>{text}</blockquote>

    <figcaption className={classes.caption}>
      {icon && (
        <Image
          src={icon.src}
          alt=""
          width={icon.width}
          height={icon.height}
          className={classes.icon}
        />
      )}

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes.source}
      >
        {label}
      </a>
    </figcaption>
  </Reveal>
);

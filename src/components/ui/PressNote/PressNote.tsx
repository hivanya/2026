import React, { FC } from 'react';
import clsx from 'clsx';
import Image from 'next/image';

import classes from './PressNote.module.scss';

interface Props {
  text: string;
  label: string;
  href: string;
  /** Выравнивание из макета — у пяти упоминаний оно разное. */
  align?: 'left' | 'center' | 'right';
  /** Логотип издания перед ссылкой (есть только у Sostav.ru). */
  icon?: { src: string; width: number; height: number };
  /** Ссылка стоит в строку с текстом, а не под ним (Kod.ru, Timeoutdubai). */
  inline?: boolean;
  className?: string;
}

// Упоминание в прессе: цитата и подчёркнутая ссылка на источник.
// В макете встречается пять раз — меняются только выравнивание,
// раскладка (в строку или под текстом) и наличие логотипа.
export const PressNote: FC<Props> = ({
  text,
  label,
  href,
  align = 'left',
  icon,
  inline,
  className,
}) => (
  <figure
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
  </figure>
);

import React, { FC } from 'react';

import { SocialLinks as Links } from '@/utils/consts';

import classes from './SocialLinks.module.scss';

// На десктопе строка по правому краю полосы, на мобильном три плитки
export const SocialLinks: FC = () => (
  <ul className={classes.links}>
    {Links.map(({ id, label, href }) => (
      <li key={id} className={classes.item}>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes.link}
        >
          {label}
        </a>
      </li>
    ))}
  </ul>
);

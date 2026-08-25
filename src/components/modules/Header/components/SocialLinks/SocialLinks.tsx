import React from 'react';

import { SocialLinks as Links } from '@/utils/consts';

import classes from './SocialLinks.module.scss';

export const SocialLinks: React.FC = () => (
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

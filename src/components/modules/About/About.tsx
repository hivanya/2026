import React, { FC } from 'react';

import { ExternalLink, Section } from '@/components/ui';
import {
  PersonBio,
  PersonName,
  PersonRole,
  SocialLinks,
  Workplaces,
} from '@/utils/consts';

import classes from './About.module.scss';

// Блок 1 — «обо мне»: имя, короткое описание, контакты, а под ними
// по центру строка мест работы.
export const About: FC = () => (
  <Section id="about" className={classes.section}>
    <h1 className={classes.name}>{PersonName}</h1>
    <p className={classes.role}>{PersonRole}</p>
    <p className={classes.bio}>{PersonBio}</p>

    <ul className={classes.links}>
      {SocialLinks.map(({ id, label, href }) => (
        <li key={id}>
          <ExternalLink href={href} className={classes.link}>
            {label}
          </ExternalLink>
        </li>
      ))}
    </ul>

    <ul className={classes.workplaces}>
      {Workplaces.map(({ id, label }) => (
        <li key={id} className={classes.workplace}>
          {label}
        </li>
      ))}
    </ul>
  </Section>
);

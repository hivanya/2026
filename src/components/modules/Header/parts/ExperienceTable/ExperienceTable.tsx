import React from 'react';

import { Experience, ExperienceTitle } from '@/utils/consts';

import classes from './ExperienceTable.module.scss';

export const ExperienceTable: React.FC = () => (
  <React.Fragment>
    <p className={classes.title}>{ExperienceTitle}</p>

    <ul className={classes.table}>
      {Experience.map(({ id, company, role, years }) => (
        <li key={id} className={classes.row}>
          <span className={classes.company}>{company}</span>
          <span className={classes.role}>{role}</span>
          <span className={classes.years}>{years}</span>
        </li>
      ))}
    </ul>
  </React.Fragment>
);

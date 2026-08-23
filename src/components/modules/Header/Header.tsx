import React, { FC } from 'react';

import { PersonBio, PersonName } from '@/utils/consts';

import classes from './Header.module.scss';
import { ExperienceTable } from './parts/ExperienceTable/ExperienceTable';
import { SocialLinks } from './parts/SocialLinks/SocialLinks';

// Блок 1 — шапка: имя, био, контакты, таблица опыта
// Комментарий «добавить фото» не закрыт: фото в макете нет
export const Header: FC = () => (
  <section id="about" className={classes.section}>
    <div className={classes.box}>
      <div className={classes.intro}>
        <h1 className={classes.name}>{PersonName}</h1>
        <p className={classes.bio}>{PersonBio}</p>
        <SocialLinks />
      </div>

      <ExperienceTable />
    </div>
  </section>
);

import React, { FC } from 'react';

import { Canvas } from '@/components/ui';
import {
  Experience,
  FullCvLink,
  PersonBio,
  PersonName,
  SocialLinks,
} from '@/utils/consts';

import classes from './Header.module.scss';

// Блок 1 — шапка: имя слева, био по центру, контакты справа, ниже
// таблица опыта и ссылка на полное резюме.
//
// В макете к этому блоку два комментария: «добавить фото» (фото пока нет,
// см. README) и «Показать стейт по ховеру» — отсюда подсветка строк
// таблицы и подчёркивания ссылок.
export const Header: FC = () => (
  <Canvas id="about" height={441} className={classes.section}>
    <h1 className={classes.name}>{PersonName}</h1>

    <p className={classes.bio}>{PersonBio}</p>

    <ul className={classes.links}>
      {SocialLinks.map(({ id, label, href }) => (
        <li key={id} className={classes.linkItem}>
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

    <ul className={classes.experience}>
      {Experience.map(({ id, company, role, years }) => (
        <li key={id} className={classes.row}>
          <span className={classes.company}>{company}</span>
          <span className={classes.role}>{role}</span>
          <span className={classes.years}>{years}</span>
        </li>
      ))}

      <li className={classes.row}>
        <a href={FullCvLink.href} className={classes.fullCv}>
          {FullCvLink.label}
        </a>
      </li>
    </ul>
  </Canvas>
);

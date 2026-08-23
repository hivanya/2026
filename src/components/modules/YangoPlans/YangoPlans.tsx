import React, { FC } from 'react';

import { Section } from '@/components/ui';
import { YangoPlusTitle } from '@/utils/consts';

import classes from './YangoPlans.module.scss';

// TODO(figma): состав и копирайт карточек — с макета. Сейчас четыре
// заглушки, чтобы сетка и отступы были собраны.
const Services = [
  { id: 'ride', title: 'Ride', description: 'Cashback on every trip.' },
  { id: 'eats', title: 'Eats', description: 'Free delivery from partners.' },
  { id: 'music', title: 'Music', description: 'Ad-free listening.' },
  { id: 'market', title: 'Market', description: 'Member-only prices.' },
] as const;

// Блок 7 — заголовок и сетка сервисов, входящих в подписку.
export const YangoPlans: FC = () => (
  <Section id="yango-plans">
    <h2 className={classes.title}>{YangoPlusTitle}</h2>

    <ul className={classes.grid}>
      {Services.map(({ id, title, description }) => (
        <li key={id} className={classes.card}>
          <h3 className={classes.cardTitle}>{title}</h3>
          <p className={classes.cardText}>{description}</p>
        </li>
      ))}
    </ul>
  </Section>
);

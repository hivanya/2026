import React from 'react';
import Image from 'next/image';

import { Reveal } from '@/components/ui';
import { Assets } from '@/utils/consts';

import classes from './SkyengCards.module.scss';

const GrammarWidth = 277;
const GrammarHeight = 506;
const RowsWidth = 520;
const RowsHeight = 404;

export const SkyengCards: React.FC = () => (
  <section id="skyeng-cards" className={classes.section}>
    <div className={classes.box}>
      <div className={classes.grid}>
        <Reveal className={classes.narrow}>
          <Image
            src={Assets.skyengGrammar}
            alt="Grammar hints in a lesson"
            width={GrammarWidth}
            height={GrammarHeight}
            className={classes.shot}
          />
        </Reveal>

        <Reveal delay={0.1} className={classes.wide}>
          <Image
            src={Assets.skyengRows}
            alt="Lesson progress rows"
            width={RowsWidth}
            height={RowsHeight}
            className={classes.shot}
          />
        </Reveal>
      </div>
    </div>

    {/* В макете низ блока перекрыт размытым светлым прямоугольником —
        им карточки уходят в фон перед кнопкой Say hi */}
    <span aria-hidden className={classes.fade} />
  </section>
);

'use client';

import React from 'react';
import Image from 'next/image';

import { Assets } from '@/utils/consts';

import classes from './YangoSubscription.module.scss';

export const YangoSubscription: React.FC = () => {
  const sectionRef = React.useRef<HTMLElement>(null);

  return (
    <section
      id="yango-plus-subscription"
      ref={sectionRef}
      className={classes.section}
    >
      <div className={classes.box}>
        <div className={classes.stage}>
          <div className={classes.left}>
            <Image
              src={Assets.yangoPlusSubscriptionLeft}
              alt="Yango Plus subscription screen 1"
              width={400}
              height={827}
            />

            <Image
              src={Assets.yangoPlusSubscriptionWidget}
              alt=""
              width={396}
              height={316}
              className={classes.widget}
            />
          </div>

          <Image
            src={Assets.yangoPlusSubscriptionRight}
            alt="Yango Plus subscription screen 2"
            width={820}
            height={1182}
            className={classes.right}
          />
        </div>
      </div>
    </section>
  );
};

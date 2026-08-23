import React from 'react';
import Image from 'next/image';

import { Reveal } from '@/components/ui';
import { Assets, ShowreelTitle } from '@/utils/consts';

import classes from './ShowreelCase.module.scss';

export const ShowreelCase: React.FC = () => (
  <section id="showreel-case" className={classes.section}>
    <div className={classes.box}>
      <Reveal as="h2" className={classes.title}>
        {ShowreelTitle}
      </Reveal>

      <div className={classes.stage}>
        <div className={classes.left}>
          <Image
            src={Assets.caseFive}
            alt="Player screens"
            width={610}
            height={1316}
            className={classes.five}
          />

          <Image
            src={Assets.caseTicket}
            alt="Concert ticket"
            width={459}
            height={484}
            className={classes.ticket}
          />
        </div>

        <div className={classes.right}>
          <Image
            src={Assets.caseStalo}
            alt="Redesigned screen"
            width={610}
            height={1320}
            className={classes.stalo}
          />

          <div className={classes.plateHolder}>
            <Image
              src={Assets.caseThirtyTwo}
              alt="Playlist screen"
              width={610}
              height={760}
              className={classes.thirtyTwo}
            />

            <span aria-hidden className={classes.plate} />
          </div>
        </div>
      </div>

      <span aria-hidden className={classes.divider} />

      <Image
        src={Assets.caseCarousel}
        alt="Carousel of covers"
        width={1030}
        height={280}
        className={classes.carousel}
      />
    </div>
  </section>
);

import React, { FC } from 'react';
import Image from 'next/image';

import { Assets } from '@/utils/consts';

import classes from './YangoCards.module.scss';
import { YangoPlayer } from '../YangoPlayer/YangoPlayer';

// Три карточки сервисов и кружок плеера
export const YangoCards: FC = () => (
  <div className={classes.stage}>
    <div className={classes.tall}>
      <Image
        src={Assets.yangoCardTall}
        alt="Yango Plus subscription screen"
        width={400}
        height={1447}
      />

      <Image
        src={Assets.yangoAvatar}
        alt=""
        width={36}
        height={36}
        className={classes.avatar}
      />
    </div>

    <Image
      src={Assets.yangoCardMid}
      alt="Yango Plus benefits"
      width={400}
      height={840}
      className={classes.mid}
    />

    <Image
      src={Assets.yangoCardSquare}
      alt="Yango Plus promo block"
      width={350}
      height={350}
      className={classes.square}
    />

    <YangoPlayer />
  </div>
);

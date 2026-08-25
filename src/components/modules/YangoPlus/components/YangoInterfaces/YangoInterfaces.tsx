import React from 'react';

import { InterfaceStrip, PressNote } from '@/components/ui';
import { Assets, PressNotes } from '@/utils/consts';

import classes from './YangoInterfaces.module.scss';

const Tail = 40;

export const YangoInterfaces: React.FC = () => (
  <section id="interfaces" className={classes.section}>
    <InterfaceStrip
      screens={Assets.interfaceScreens}
      alt="iPhone interface screen"
      tail={Tail}
    />

    <div className={classes.box}>
      <PressNote
        {...PressNotes.mena}
        align="center"
        inline
        className={classes.press}
      />
    </div>
  </section>
);

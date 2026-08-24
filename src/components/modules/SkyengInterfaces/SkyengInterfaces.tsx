import React from 'react';

import { InterfaceStrip } from '@/components/ui';
import { Assets } from '@/utils/consts';

import classes from './SkyengInterfaces.module.scss';

const Gap = 20;

export const SkyengInterfaces: React.FC = () => (
  <section id="skyeng" className={classes.section}>
    <InterfaceStrip
      screens={Assets.skyengScreens}
      alt="Skyeng interface screen"
      gap={Gap}
    />
  </section>
);

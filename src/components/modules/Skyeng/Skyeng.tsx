import React from 'react';

import { Sheet } from '@/components/ui';

import classes from './Skyeng.module.scss';
import { SkyengCards } from './components/SkyengCards/SkyengCards';
import { SkyengInterfaces } from './components/SkyengInterfaces/SkyengInterfaces';
import { SkyengPackages } from './components/SkyengPackages/SkyengPackages';

export const Skyeng: React.FC = () => (
  <Sheet className={classes.sheet}>
    <SkyengInterfaces />
    <SkyengPackages />
    <SkyengCards />
  </Sheet>
);

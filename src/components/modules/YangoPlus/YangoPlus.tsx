import React from 'react';

import { YangoInterfaces } from './components/YangoInterfaces/YangoInterfaces';
import { YangoPlusIntro } from './components/YangoPlusIntro/YangoPlusIntro';
import { YangoShowreelCase } from './components/YangoShowreelCase/YangoShowreelCase';
import { YangoSubscription } from './components/YangoSubscription/YangoSubscription';

export const YangoPlus: React.FC = () => (
  <>
    <YangoPlusIntro />
    <YangoInterfaces />
    <YangoShowreelCase />
    <YangoSubscription />
  </>
);

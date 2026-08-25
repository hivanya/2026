import React from 'react';

import { Sheet } from '@/components/ui';

import { SkyengCards } from './components/SkyengCards/SkyengCards';
import { SkyengInterfaces } from './components/SkyengInterfaces/SkyengInterfaces';
import { SkyengLessons } from './components/SkyengLessons/SkyengLessons';
import { SkyengPackages } from './components/SkyengPackages/SkyengPackages';

export const Skyeng: React.FC = () => (
  <Sheet>
    <SkyengInterfaces />
    <SkyengPackages />
    <SkyengCards />
    <SkyengLessons />
  </Sheet>
);

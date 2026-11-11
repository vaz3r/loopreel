import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';
import { EditorialVerdict } from '../../../src/skeleton/ui';

export default function Slide08({ slide, brand, totalSlides }: SlideComponentProps) {
  return (
    <EditorialVerdict
      kicker="EDITORIAL VERDICT"
      headline="Privacy-First Homes: Hold Off. Businesses: Audit First."
      avoid={{
        tag: 'WHO SHOULD SKIP',
        title: 'Households prioritizing minimal indoor surveillance',
        points: [
          'Hold off if interior mapping and cloud processing exceed your privacy boundaries.',
          'Do not mistake an up-to-8-minute flight for continuous airborne coverage.',
        ],
      }}
      fit={{
        tag: 'POTENTIAL FIT',
        title: 'Businesses with compatible single-floor premises',
        points: [
          'Claimed coverage: up to 5,000 square feet; indoor, single-floor operation only, with no stair climbing.',
          'Exclude curved edges, sunken areas, black glossy floors and transitions greater than 1.375"/3.5cm.',
        ],
      }}
    />
  );
}
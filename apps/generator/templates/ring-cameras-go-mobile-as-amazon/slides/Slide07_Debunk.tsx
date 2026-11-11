import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';
import {
  SlideHeader,
  ComparisonSplit,
} from '../../../src/skeleton/ui';

export default function Slide07({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <div className="flex h-full flex-col justify-between gap-6 text-[var(--ink)]">
      <SlideHeader
        kicker="REALITY CHECK"
        headline="Autonomous Does Not Mean Unlimited"
      />

      <div className="grid grid-cols-1 gap-4">
        <ComparisonSplit
          left={{
            tag: 'MYTH',
            title: 'The drone patrols continuously.',
            description: '',
          }}
          right={{
            tag: 'REALITY',
            title: 'Flight endurance',
            description:
              'Up to 8 minutes per flight; tested with a new, fully-charged battery under controlled conditions. Then it recharges.',
          }}
        />

        <ComparisonSplit
          left={{
            tag: 'MYTH',
            title: 'Rover covers the whole building.',
            description: '',
          }}
          right={{
            tag: 'REALITY',
            title: 'Coverage limits',
            description:
              'Claimed coverage: up to 5,000 sq ft. Indoor, single-floor operation only; it cannot climb stairs.',
          }}
        />

        <ComparisonSplit
          left={{
            tag: 'MYTH',
            title: 'Any floor layout works.',
            description: '',
          }}
          right={{
            tag: 'REALITY',
            title: 'Floor compatibility',
            description:
              'Incompatible: transitions greater than 1.375 inches/3.5cm, curved edges, sunken areas and black glossy floors.',
          }}
        />
      </div>
    </div>
  );
}
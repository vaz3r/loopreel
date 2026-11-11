import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';
import { EditorialList } from '../../../src/skeleton/ui';

export default function Slide02({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <EditorialList
      kicker="EXECUTIVE BRIEFING"
      headline="Three Conditions Behind Autonomous Security"
      items={[
        {
          index: 1,
          tag: 'AI',
          title: 'Your rooms become a floor plan',
          body: 'AI Pilot combines cameras, sensors and cloud processing to map interiors and suggest patrol points.',
        },
        {
          index: 2,
          tag: 'SUBSCRIPTION',
          title: 'Scheduling costs beyond the hardware',
          body: 'Scheduled drone patrols require a compatible Ring Protect plan.',
        },
        {
          index: 3,
          tag: 'FLIGHT LIMIT',
          title: 'Up to 8 minutes, not continuous coverage',
          body: 'Tested with a new, fully-charged battery under controlled conditions; actual flight time depends on usage and environment.',
        },
      ]}
    />
  );
}
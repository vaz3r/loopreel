import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';
import { EditorialTelemetry } from '../../../src/skeleton/ui';

export default function Slide04({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <EditorialTelemetry
      kicker="HARDWARE & SERVICE PRICING"
      headline="The Price Tags—and the Storage Window"
      metrics={[
        {
          value: '$249.99',
          label: 'DRONE CAM',
          context:
            'Target shipping: January 27, 2027. FCC authorization remains required before sale.',
          tag: 'PENDING FCC',
        },
        {
          value: '$999.99',
          label: 'ROVER CAM',
          context:
            'Preorders open; U.S. shipping scheduled for December 16, 2026.',
          tag: 'BUSINESS',
        },
        {
          value: '180 DAYS',
          label: 'MAXIMUM CLOUD VIDEO HISTORY',
          context:
            'Up to this limit for doorbell rings, motion events and Live View events; compatible subscription required.',
          tag: 'SUBSCRIPTION',
        },
      ]}
    />
  );
}
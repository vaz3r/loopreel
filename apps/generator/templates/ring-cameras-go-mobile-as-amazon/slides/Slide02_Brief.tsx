import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';
import { SlideHeader, ContentCard } from '../../../src/skeleton/ui';

export default function Slide02({ slide, brand, totalSlides }: SlideComponentProps) {
  return (
    <div className="flex h-full flex-col justify-between gap-6 text-[var(--ink)]">
      <SlideHeader
        kicker="ARS TECHNICA / BUYER BRIEF"
        headline="Three Things To Know Before Buying"
      />

      <div className="flex flex-col gap-6">
        <ContentCard
          index={1}
          title="Mapping mixes local and cloud AI"
          body="Both devices map interiors using AI Pilot, combining vision models, on-device sensors and cloud processing."
          tag="AI"
        />
        <ContentCard
          index={2}
          title="Up to 8 minutes—not a guarantee"
          body="Drone flights last up to 8 minutes, tested with a new, fully-charged battery under controlled conditions."
          tag="FLIGHT TIME"
        />
        <ContentCard
          index={3}
          title="Recordings can outlast the moment"
          body="Rover cloud recordings can remain for up to 180 days with a compatible Ring subscription."
          tag="PRIVACY"
        />
      </div>
    </div>
  );
}
import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';
import { SlideHeader, ContentCard } from '../../../src/skeleton/ui';

export default function Slide09({ slide, brand, totalSlides }: SlideComponentProps) {
  return (
    <div
      className="flex h-full flex-col justify-between gap-6 text-[var(--ink)]"
      style={
        {
          '--accent': '#38BDF8',
          '--paper': '#0A0E17',
          '--surface': '#141D2B',
          '--ink': '#F1F5F9',
        } as React.CSSProperties
      }
    >
      <SlideHeader
        kicker="THE BIGGER QUESTION"
        headline="The Camera Is Becoming A Mobile Investigator"
        subheadline="Editorial takeaway: evaluate access controls and independent verification as closely as camera resolution."
      />

      <div className="flex flex-col gap-6">
        <ContentCard
          index={1}
          title="FROM WATCHING TO RESPONDING"
          body="Connected Ring alerts can dispatch either device to preset patrol points—not merely trigger a stationary recording."
          tag="CONNECTED RESPONSE"
        />
        <ContentCard
          index={2}
          title="FROM VIDEO TO FLOOR PLANS"
          body="AI Pilot adds mapped rooms, suggested viewpoints and autonomous routing to indoor monitoring."
          tag="AUTONOMOUS MONITORING"
        />
      </div>
    </div>
  );
}
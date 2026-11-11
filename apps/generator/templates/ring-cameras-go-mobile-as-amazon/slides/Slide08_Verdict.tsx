import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';
import {
  SlideHeader,
  ContentCard,
  ComparisonSplit,
} from '../../../src/skeleton/ui';

export default function Slide08({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
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
        kicker="EDITORIAL VERDICT"
        headline="Privacy First? Skip Both. Otherwise, Wait."
      />

      <ComparisonSplit
        left={{
          tag: 'POTENTIAL FIT',
          title: 'Consider only after independent testing.',
          description:
            'Homeowners needing brief checks or businesses with compatible, single-floor interiors.',
        }}
        right={{
          tag: 'AVOID',
          title: 'Privacy-first buyers.',
          description:
            'Neither product’s cloud-dependent design meets a local-only requirement.',
        }}
      />

      <ContentCard
        title="Wrong expectations"
        body="Avoid Drone for sustained airborne coverage; avoid Rover if your security plan requires navigating stairs."
        tag="LIMITS"
      />
    </div>
  );
}
import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';
import {
  SlideHeader,
  ContentCard,
  MetricCard,
  ComparisonSplit,
  QuoteBox,
  SchematicFrame,
} from '../../../src/skeleton/ui';

export default function Slide04({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <div
      className="flex h-full flex-col justify-between gap-6 text-[var(--ink)]"
      style={
        {
          '--ink': '#F1F5F9',
          '--accent': '#38BDF8',
          '--paper': '#0A0E17',
          '--surface': '#141D2B',
        } as React.CSSProperties
      }
    >
      <SlideHeader
        kicker="ARS TECHNICA / SURVEILLANCE & PRIVACY"
        headline="Two Prices. One Long Recording Window."
        subheadline="Hardware pricing, U.S. shipping timelines, and the limits of cloud retention."
      />

      <div className="grid grid-cols-3 items-stretch gap-6">
        <MetricCard
          value="$249.99"
          label="DRONE CAM"
          context="U.S. shipping targeted January 27, 2027. FCC authorization remains pending; sales cannot proceed without approval."
          tag="APPROVAL PENDING"
        />
        <MetricCard
          value="$999.99"
          label="ROVER CAM"
          context="Business-focused robot available for preorder. U.S. shipping scheduled for December 16, 2026."
          tag="BUSINESS HARDWARE"
        />
        <MetricCard
          value="up to 180 days"
          label="ROVER CLOUD RETENTION"
          context="Doorbell rings, motion events and Live View recordings; compatible subscription required. Not continuous recording."
          tag="SUBSCRIPTION REQUIRED"
        />
      </div>
    </div>
  );
}
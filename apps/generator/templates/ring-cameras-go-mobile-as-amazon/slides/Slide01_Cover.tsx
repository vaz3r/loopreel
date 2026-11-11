import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';
import { EditorialCover } from '../../../src/skeleton/ui';

export default function Slide01({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <EditorialCover
      kicker="SURVEILLANCE / IN FOCUS"
      headline="Amazon Wants Patrolling Cameras. Its Privacy Promise Has Conditions."
      subheadline="Inside the prices, flight limits, interior mapping and encryption trade-offs behind Ring’s mobile security pitch."
      authorName={brand.name}
      authorRole={brand.domain}
      readTime="4 min read"
    />
  );
}
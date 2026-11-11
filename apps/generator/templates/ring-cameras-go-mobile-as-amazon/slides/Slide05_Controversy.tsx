import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';
import { EditorialQuote } from '../../../src/skeleton/ui';

export default function Slide05({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <EditorialQuote
      kicker="THE PRIVACY BATTLE"
      quote="Privacy and security without compromise"
      attribution="Amazon"
      role="Company promoting Ring Robotics"
      context="Both robots use Throw Away the Key encryption. EFF says it falls short of end-to-end protection."
    />
  );
}
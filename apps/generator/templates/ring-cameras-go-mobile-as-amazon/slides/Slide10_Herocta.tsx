import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';
import { EditorialCTA } from '../../../src/skeleton/ui';

export default function Slide10({ slide, brand, totalSlides }: SlideComponentProps) {
  return (
    <EditorialCTA
      kicker="THE FINAL VERDICT"
      headline="A Moving Camera Needs More Than a Privacy Promise"
      verdict="Privacy-first households should wait. Businesses should validate navigation, recording policies, retention and access before buying."
      question="Would you let a security camera map and patrol your private rooms?"
      actionText="Where do you draw the line?"
    />
  );
}
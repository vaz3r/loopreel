import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';
import { EditorialDebunk } from '../../../src/skeleton/ui';

export default function Slide07({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <EditorialDebunk
      kicker="MYTH VS REALITY"
      headline="Visible Recording Is Not Complete Privacy"
      left={{
        tag: 'THE MYTH',
        title: 'If recording is obvious, privacy is solved',
        description:
          'Amazon emphasizes LED recording indicators, audible drone propellers and Rover’s visible light tower.',
      }}
      right={{
        tag: 'THE REALITY',
        title: 'Indicators reveal activity—not data access',
        description:
          'Cloud mapping and temporary decryption remain separate questions that visible recording signals cannot resolve.',
      }}
    />
  );
}
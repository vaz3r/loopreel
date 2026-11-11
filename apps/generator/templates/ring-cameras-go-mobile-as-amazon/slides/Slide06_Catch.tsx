import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';
import { EditorialList } from '../../../src/skeleton/ui';

export default function Slide06({ slide, brand, totalSlides }: SlideComponentProps) {
  return (
    <EditorialList
      kicker="THE HIDDEN CATCH"
      headline="Throwing Away Keys Does Not End Access"
      items={[
        {
          index: 1,
          tag: 'KEY DELETION',
          title: 'Ring gets a processing window',
          body: 'TAKE permits cloud processing before Ring deletes its key copies after 24 hours.',
        },
        {
          index: 2,
          tag: 'KEY RETURN',
          title: 'Playback can reopen that window',
          body: 'Watching older footage or using smart features can send keys back to Ring’s servers.',
        },
        {
          index: 3,
          tag: 'EFF ASSESSMENT',
          title: 'An improvement, not end-to-end encryption',
          body: 'EFF credits stronger defaults but says genuine end-to-end encryption prevents the provider from ever accessing keys.',
        },
      ]}
    />
  );
}
import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';
import { EditorialList } from '../../../src/skeleton/ui';

export default function Slide09({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <EditorialList
      kicker="THE BIGGER PICTURE"
      headline="Before Patrols Expand, Set the Rules"
      items={[
        {
          index: 1,
          tag: 'PATROL POLICY',
          title: 'Define where cameras may travel',
          body: 'Approve routes, recording hours and restricted rooms before enabling automated patrols.',
        },
        {
          index: 2,
          tag: 'RETENTION',
          title: 'Choose a storage window deliberately',
          body: 'Set retention around actual security needs, not the longest available history.',
        },
        {
          index: 3,
          tag: 'ACCESS',
          title: 'Review recording policies before deployment',
          body: 'Decide who can view footage, how occupants receive notice and what evidence would justify expanding coverage.',
        },
      ]}
    />
  );
}
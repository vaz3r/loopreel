import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';
import { EditorialDebunk } from '../../../src/skeleton/ui';

export default function Slide03({ slide, brand, totalSlides }: SlideComponentProps) {
  return (
    <EditorialDebunk
      kicker="HARDWARE SPECS"
      headline="One Flies Through Homes. One Patrols Businesses."
      left={{
        tag: 'DRONE CAM',
        title: 'Airborne checks, then back to dock',
        description:
          '2K video, 148° field of view, 360° rotation and two LED lights; camera off while docked.',
      }}
      right={{
        tag: 'ROVER CAM',
        title: 'A mobile business security camera',
        description:
          'Streams and records in up to 4K while patrolling; performs a 360° scan at designated stops.',
      }}
    />
  );
}
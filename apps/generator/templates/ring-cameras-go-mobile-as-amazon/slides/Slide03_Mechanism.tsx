import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';
import { SlideHeader, ContentCard } from '../../../src/skeleton/ui';

export default function Slide03({ slide, brand, totalSlides }: SlideComponentProps) {
  return (
    <div className="flex h-full flex-col justify-between gap-6 text-[var(--ink)]">
      <SlideHeader
        kicker="ROBOTICS / HOW IT WORKS"
        headline="One Flies. One Rolls. Both Map."
        subheadline="Two viewpoints. Two setup paths."
      />

      <div className="grid grid-cols-2 items-stretch gap-6">
        <ContentCard
          index={1}
          title="DRONE CAM"
          body="2K video, 148° field of view, 360° rotation and two LED lights for low-light scenes."
          tag="AIR"
        />
        <ContentCard
          index={2}
          title="ROVER CAM"
          body="Adjustable periscope; up to 4K livestreaming and recording during patrols; 360° scans at designated stops."
          tag="GROUND"
        />
        <div className="col-span-2">
          <ContentCard
            index={3}
            title="SETUP"
            body="Carry Drone through your rooms; Rover explores independently. AI Pilot creates floor plans and suggests patrol points."
            tag="AI PILOT"
          />
        </div>
      </div>
    </div>
  );
}
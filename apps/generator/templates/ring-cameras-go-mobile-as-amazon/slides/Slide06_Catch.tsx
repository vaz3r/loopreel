import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';
import { SlideHeader, ContentCard } from '../../../src/skeleton/ui';

export default function Slide06({ slide, brand, totalSlides }: SlideComponentProps) {
  return (
    <div className="flex h-full flex-col justify-between gap-6 text-[var(--ink)]">
      <SlideHeader
        kicker="SURVEILLANCE & PRIVACY"
        headline="The Catch: Cloud Processing, Subscriptions, Temporary Keys"
      />

      <div className="flex flex-1 flex-col justify-center gap-6">
        <ContentCard
          index={1}
          title="NOT LOCAL-ONLY. AUTOMATION COSTS EXTRA."
          body="AI Pilot uses interior mapping and cloud processing. Scheduled Drone flights and Rover patrols require a compatible Ring Protect plan."
          tag="CLOUD + SUBSCRIPTIONS"
        />

        <ContentCard
          index={2}
          title="TAKE IS NOT END-TO-END. KEYS CAN RETURN."
          body="EFF: Cloud decryption lasts 24 hours before key deletion; older-footage playback or smart features can return keys to Ring’s servers."
          tag="THROW AWAY THE KEY ENCRYPTION"
        />
      </div>
    </div>
  );
}
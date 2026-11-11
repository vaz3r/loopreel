import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';
import { SlideHeader, QuoteBox } from '../../../src/skeleton/ui';

export default function Slide10({ slide, brand, totalSlides }: SlideComponentProps) {
  return (
    <div className="flex h-full flex-col justify-between gap-6 text-[var(--ink)]">
      <SlideHeader
        kicker="THE VERDICT / PRIVACY"
        headline="More Visibility Is Not Automatically More Privacy."
        subheadline="Would you let a cloud-connected camera map and patrol your private rooms?"
      />

      <QuoteBox
        quote="Our verdict: wait for independent testing. Mobility is a capability—not proof that the privacy promise holds."
        attribution="Ars Technica"
        role="Artificial Intelligence / Consumer Robotics / Surveillance & Privacy"
      />

      <div className="flex justify-start">
        <div className="inline-flex items-center gap-3 rounded-full border border-[#38BDF8]/40 bg-[#141D2B] px-6 py-4 text-lg font-semibold text-[#38BDF8]">
          <span
            aria-hidden="true"
            className="h-2 w-2 shrink-0 rounded-full bg-[#38BDF8]"
          />
          <span>Where would you draw the line?</span>
        </div>
      </div>
    </div>
  );
}
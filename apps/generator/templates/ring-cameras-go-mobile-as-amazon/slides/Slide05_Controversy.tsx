import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';
import {
  SlideHeader,
  ContentCard,
  QuoteBox,
} from '../../../src/skeleton/ui';

export default function Slide05({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <div className="flex h-full flex-col justify-between gap-6 text-[var(--ink)]">
      <SlideHeader
        kicker="SURVEILLANCE / PRIVACY"
        headline="Amazon Promises Privacy. Its Record Demands Scrutiny."
        subheadline="The promise, the encryption warning, and the record of access."
      />

      <QuoteBox
        quote="Privacy and security without compromise"
        attribution="Amazon’s promise"
        role="Docked Drone: camera off. Rover Sleep Mode: periscope retracted and microphone disabled."
      />

      <div className="grid grid-cols-2 gap-6">
        <ContentCard
          index={1}
          tag="CIVIL LIBERTIES"
          title="Encryption under scrutiny"
          body="EFF says TAKE falls short of end-to-end encryption and leaves potential avenues for compelled access."
        />

        <ContentCard
          index={2}
          tag="FTC / 2023 COMPLAINT"
          title="Approximately 55,000 U.S. customers affected"
          body="Vulnerabilities exposed videos, live streams, account profiles; FTC charged Ring with allowing employee and contractor access to customers’ private videos."
        />
      </div>
    </div>
  );
}
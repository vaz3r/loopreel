import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';
import {
  SlideHeader,
  ContentCard,
  SchematicFrame,
} from '../../../src/skeleton/ui';

export default function Slide01({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <div
      className="flex h-full flex-col justify-between gap-6 text-[var(--ink)]"
      style={
        {
          '--ink': '#F1F5F9',
          '--accent': '#38BDF8',
          '--paper': '#0A0E17',
          '--surface': '#141D2B',
        } as React.CSSProperties
      }
    >
      <SlideHeader
        kicker="SURVEILLANCE / IN FOCUS"
        headline="Ring’s Cameras Will Roam Your Rooms."
        subheadline="The privacy promise has a catch."
      />

      <SchematicFrame label="AUTONOMOUS HOME PATROL" badge="CONCEPT">
        <svg
          viewBox="0 0 720 320"
          className="mx-auto block w-full"
          fill="none"
          role="img"
          aria-labelledby="slide01-diagram-title slide01-diagram-description"
        >
          <title id="slide01-diagram-title">
            Flying and rolling cameras inside a home
          </title>
          <desc id="slide01-diagram-description">
            Conceptual floor plan showing two camera forms and a dashed
            patrol route between rooms. Not a product specification.
          </desc>

          <rect
            x="60"
            y="28"
            width="600"
            height="244"
            rx="12"
            fill="var(--surface)"
            stroke="#64748B"
            strokeWidth="2"
          />

          <g stroke="#64748B" strokeWidth="2">
            <path d="M340 28V104 M340 172V272" />
            <path d="M340 148H438 M508 148H660" />
          </g>

          <g
            fill="#94A3B8"
            fontFamily="ui-monospace, monospace"
            fontSize="11"
            letterSpacing="2"
          >
            <text x="82" y="54">LIVING</text>
            <text x="364" y="54">HALL</text>
            <text x="364" y="252">ROOM</text>
          </g>

          <path
            d="M190 140H290Q310 140 330 120L370 90H472V210H554"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeDasharray="5 8"
            strokeLinecap="round"
            opacity="0.65"
          />

          <g transform="translate(190 140)">
            <circle r="70" fill="var(--accent)" opacity="0.04" />
            <circle
              r="58"
              stroke="var(--accent)"
              strokeDasharray="2 7"
              opacity="0.3"
            />
            <g stroke="var(--accent)" strokeWidth="2">
              <path d="M-24-15L-40-26 M24-15L40-26 M-24 15L-40 26 M24 15L40 26" />
              <ellipse cx="-42" cy="-28" rx="19" ry="8" />
              <ellipse cx="42" cy="-28" rx="19" ry="8" />
              <ellipse cx="-42" cy="28" rx="19" ry="8" />
              <ellipse cx="42" cy="28" rx="19" ry="8" />
              <rect
                x="-27"
                y="-19"
                width="54"
                height="38"
                rx="12"
                fill="var(--paper)"
              />
              <circle r="9" />
            </g>
            <circle r="3" fill="var(--accent)" />
          </g>

          <g transform="translate(554 210)">
            <path
              d="M0-25L-55-65H55Z"
              fill="var(--accent)"
              opacity="0.08"
            />
            <g stroke="var(--accent)" strokeWidth="2">
              <rect
                x="-29"
                y="-13"
                width="58"
                height="30"
                rx="10"
                fill="var(--paper)"
              />
              <path d="M0-13V-32" />
              <rect
                x="-15"
                y="-47"
                width="30"
                height="23"
                rx="7"
                fill="var(--paper)"
              />
              <circle cy="-35" r="5" />
              <circle cx="-18" cy="20" r="6" fill="var(--paper)" />
              <circle cx="18" cy="20" r="6" fill="var(--paper)" />
            </g>
          </g>

          <g
            fill="var(--accent)"
            fontFamily="ui-monospace, monospace"
            fontSize="11"
            letterSpacing="2"
            textAnchor="middle"
          >
            <text x="190" y="301">FLYING</text>
            <text x="554" y="301">ROLLING</text>
          </g>
        </svg>
      </SchematicFrame>

      <ContentCard
        title="Before you buy"
        body="Flying and rolling cameras bring autonomous patrols inside. Understand the mapping, recording and encryption trade-offs before buying."
        tag="PRIVACY"
      />
    </div>
  );
}
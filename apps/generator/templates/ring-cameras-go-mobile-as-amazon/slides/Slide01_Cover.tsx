import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide01({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <section className="flex h-full min-h-0 w-full flex-col justify-center overflow-hidden text-[var(--ink)]">
      <div className="flex items-center gap-4">
        <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--accent)]" />
        <p className="font-[var(--font-mono)] text-[18px] leading-6 tracking-[0.18em] text-[var(--accent)]">
          {slide.kicker}
        </p>
        <span className="h-px flex-1 bg-[var(--border)]" />
      </div>

      <h1 className="mt-7 max-w-[880px] text-balance font-[var(--font-headline)] text-[88px] font-bold leading-[0.99] tracking-[-0.055em]">
        {slide.headline}
      </h1>

      <div className="relative my-7 h-[350px] w-full shrink-0 overflow-hidden rounded-[2px] border border-[var(--border)] bg-[var(--surface)]">
        <svg
          viewBox="0 0 952 350"
          fill="none"
          aria-hidden="true"
          className="h-full w-full"
        >
          {/* Quiet architectural registration grid. */}
          <g stroke="var(--border)" strokeWidth="1" opacity="0.36">
            <path d="M48 0V350M112 0V350M176 0V350M240 0V350M304 0V350M368 0V350M432 0V350M496 0V350M560 0V350M624 0V350M688 0V350M752 0V350M816 0V350M880 0V350" />
            <path d="M0 47H952M0 111H952M0 175H952M0 239H952M0 303H952" />
          </g>

          {/* Open-door floor plan, deliberately cropped at its eastern edge. */}
          <g stroke="var(--border)" strokeWidth="3" strokeLinecap="square">
            <path d="M78 292V57H448V292H325M261 292H78" />
            <path d="M448 57H871V292H448" />
            <path d="M78 173H183M247 173H448" />
            <path d="M607 57V130M607 194V292" />
            <path d="M607 224H736M800 224H871" />
          </g>

          <g stroke="var(--border)" strokeWidth="1.2">
            <path d="M183 173V109A64 64 0 0 1 247 173" />
            <path d="M607 130H671A64 64 0 0 1 607 194" />
            <path d="M261 292V228A64 64 0 0 1 325 292" />
            <rect x="99" y="78" width="90" height="55" rx="3" />
            <path d="M111 78V133M177 78V133" />
            <rect x="723" y="76" width="122" height="78" rx="3" />
            <path d="M723 96H845M784 76V96" />
            <rect x="475" y="235" width="70" height="32" rx="16" />
          </g>

          {/* Fields of view: sensing is spatial, not omniscient. */}
          <path
            d="M311 243L397 116Q456 170 442 253Z"
            fill="var(--accent)"
            fillOpacity="0.08"
          />
          <path
            d="M311 243L397 116M311 243L442 253"
            stroke="var(--accent)"
            strokeOpacity="0.3"
          />
          <path
            d="M711 143L820 180Q783 255 695 260Z"
            fill="var(--accent)"
            fillOpacity="0.1"
          />
          <path
            d="M711 143L820 180M711 143L695 260"
            stroke="var(--accent)"
            strokeOpacity="0.35"
          />

          {/* A single patrol trace connects the two mobile forms. */}
          <path
            d="M150 243H264M348 243H548Q575 243 575 216V162Q575 143 598 143H659"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeDasharray="6 8"
            strokeLinecap="round"
          />
          <circle cx="150" cy="243" r="5" fill="var(--accent)" />
          <circle
            cx="150"
            cy="243"
            r="13"
            stroke="var(--accent)"
            strokeOpacity="0.4"
          />
          <path
            d="M491 237L497 243L491 249M624 137L630 143L624 149"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Rolling camera: chassis, wheels, lens, and heading. */}
          <g transform="translate(311 243)">
            <circle r="48" stroke="var(--accent)" strokeOpacity="0.2" />
            <rect
              x="-36"
              y="-19"
              width="11"
              height="38"
              rx="5"
              fill="var(--border)"
              stroke="var(--ink)"
              strokeOpacity="0.55"
            />
            <rect
              x="25"
              y="-19"
              width="11"
              height="38"
              rx="5"
              fill="var(--border)"
              stroke="var(--ink)"
              strokeOpacity="0.55"
            />
            <rect
              x="-27"
              y="-31"
              width="54"
              height="62"
              rx="18"
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeWidth="2"
            />
            <circle
              cy="-5"
              r="15"
              fill="var(--surface)"
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <circle cy="-5" r="7" fill="var(--accent)" fillOpacity="0.22" />
            <circle cx="3" cy="-8" r="2.5" fill="var(--accent)" />
            <path
              d="M-7 20H7M-4-41L0-46L4-41"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>

          {/* Flying camera: four enclosed rotors around a central optic. */}
          <g transform="translate(711 143) rotate(-12)">
            <circle r="92" stroke="var(--accent)" strokeOpacity="0.15" />
            <circle
              r="77"
              stroke="var(--accent)"
              strokeOpacity="0.3"
              strokeDasharray="2 9"
            />

            <path
              d="M-37-32L37 32M37-32L-37 32"
              stroke="var(--ink)"
              strokeWidth="8"
              strokeOpacity="0.85"
            />

            {[
              [-39, -34],
              [39, -34],
              [-39, 34],
              [39, 34],
            ].map(([cx, cy], index) => (
              <g key={index} transform={`translate(${cx} ${cy})`}>
                <circle
                  r="25"
                  fill="var(--surface)"
                  stroke="var(--ink)"
                  strokeWidth="2"
                />
                <circle r="19" stroke="var(--border)" strokeWidth="1.5" />
                <path
                  d="M-13-7L13 7M-7 13L7-13"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeOpacity="0.7"
                />
                <circle r="4" fill="var(--ink)" />
              </g>
            ))}

            <rect
              x="-22"
              y="-26"
              width="44"
              height="52"
              rx="12"
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeWidth="2"
            />
            <circle
              r="12"
              stroke="var(--accent)"
              strokeWidth="2"
              fill="var(--accent)"
              fillOpacity="0.12"
            />
            <circle r="5" fill="var(--accent)" />
            <path
              d="M-6 19H6"
              stroke="var(--ink)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>

          {/* Viewfinder corners keep the illustration editorial, not decorative. */}
          <g stroke="var(--accent)" strokeWidth="2">
            <path d="M18 37V18H37M915 18H934V37M18 313V332H37M915 332H934V313" />
          </g>
        </svg>
      </div>

      <div className="grid grid-cols-[5px_1fr] gap-6">
        <div className="bg-[var(--accent)]" />
        <p className="max-w-[840px] text-pretty font-[var(--font-body)] text-[30px] font-normal leading-[1.35] tracking-[-0.015em]">
          {slide.subheadline}
        </p>
      </div>
    </section>
  );
}
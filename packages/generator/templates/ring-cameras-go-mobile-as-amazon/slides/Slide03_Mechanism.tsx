import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide03({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void slide;
  void brand;
  void totalSlides;

  return (
    <section className="flex h-full min-h-0 flex-col gap-9 text-[var(--ink)]">
      <h1 className="max-w-[900px] shrink-0 font-[var(--font-headline)] text-[76px] font-bold leading-[0.99] tracking-[-0.055em]">
        Two Machines,
        <br />
        Two Ways to Map
      </h1>

      <div className="grid min-h-0 flex-1 grid-cols-2 gap-6">
        <article className="flex min-h-0 flex-col border border-[var(--border)] bg-[var(--surface)] px-7 py-8">
          <div className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 shrink-0 bg-[var(--accent)]" />
            <p className="font-[var(--font-mono)] text-[18px] font-medium tracking-[0.15em]">
              DRONE CAM
            </p>
          </div>

          <h2 className="mt-6 min-h-[112px] font-[var(--font-headline)] text-[48px] font-semibold leading-[1.04] tracking-[-0.045em]">
            Carry it
            <br />
            before it flies
          </h2>

          <div className="my-5 flex min-h-0 flex-1 items-center">
            <svg
              viewBox="0 0 400 320"
              fill="none"
              aria-hidden="true"
              className="max-h-[330px] w-full text-[var(--accent)]"
            >
              {/* Architectural shell and open interior doorways. */}
              <path
                d="M25 27H375V270H25V27Z"
                stroke="var(--border)"
                strokeWidth="2"
              />
              <path
                d="M25 139H89M137 139H200M200 27V84M200 127V204M200 248V270M200 139H263M311 139H375"
                stroke="var(--ink)"
                strokeOpacity=".55"
                strokeWidth="4"
                strokeLinecap="square"
              />

              <path
                d="M41 43H87V69H41V43ZM302 43H359V82H302V43ZM41 222H84V254H41V222ZM321 202H359V254H321V202Z"
                stroke="var(--border)"
                strokeWidth="2"
              />
              <path
                d="M89 139V91C116 91 137 112 137 139M200 84H243C243 108 224 127 200 127"
                stroke="var(--border)"
                strokeWidth="1.5"
              />

              {/* A deliberately guided, room-by-room mapping route. */}
              <path
                d="M69 107H155V61H253V107H285V180H243V226H155"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray="6 8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="69" cy="107" r="7" fill="var(--surface)" stroke="currentColor" strokeWidth="2" />
              <circle cx="155" cy="61" r="4" fill="currentColor" />
              <circle cx="285" cy="107" r="4" fill="currentColor" />
              <path
                d="m235 218 8 8 8-8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Four guarded rotors, resting on a supporting hand. */}
              <g transform="translate(116 204)">
                <circle r="54" fill="var(--surface)" />
                <path
                  d="M-25-19 25 19M25-19-25 19"
                  stroke="var(--ink)"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                <g stroke="var(--ink)" strokeWidth="2">
                  <circle cx="-27" cy="-20" r="16" fill="var(--surface)" />
                  <circle cx="27" cy="-20" r="16" fill="var(--surface)" />
                  <circle cx="-27" cy="20" r="16" fill="var(--surface)" />
                  <circle cx="27" cy="20" r="16" fill="var(--surface)" />
                </g>
                <path
                  d="M-35-20H-19M19-20H35M-35 20H-19M19 20H35"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <rect
                  x="-13"
                  y="-17"
                  width="26"
                  height="34"
                  rx="8"
                  fill="var(--surface)"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <circle cy="-6" r="5" stroke="currentColor" strokeWidth="2" />
                <path
                  d="M-7 91V69L-25 49C-29 44-24 38-19 41L-5 52V33C-5 25 5 25 5 33V46L16 43C23 41 31 47 31 55V69L23 81V91"
                  fill="var(--surface)"
                  stroke="var(--ink)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M-7 84H23"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </g>
            </svg>
          </div>

          <p className="min-h-[188px] shrink-0 border-t border-[var(--border)] pt-6 font-[var(--font-body)] text-[27px] leading-[1.38] tracking-[-0.015em]">
            Customers carry the drone through rooms for mapping. Its camera
            records <span className="text-[var(--accent)]">2K video.</span>
          </p>
        </article>

        <article className="relative flex min-h-0 flex-col border border-[var(--border)] bg-[var(--surface)] px-7 py-8">
          <span className="absolute -top-px left-7 h-[3px] w-16 bg-[var(--accent)]" />

          <div className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full border-2 border-[var(--accent)]" />
            <p className="font-[var(--font-mono)] text-[18px] font-medium tracking-[0.15em]">
              ROVER CAM
            </p>
          </div>

          <h2 className="mt-6 min-h-[112px] font-[var(--font-headline)] text-[48px] font-semibold leading-[1.04] tracking-[-0.045em]">
            Explores
            <br />
            on its own
          </h2>

          <div className="my-5 flex min-h-0 flex-1 items-center">
            <svg
              viewBox="0 0 400 320"
              fill="none"
              aria-hidden="true"
              className="max-h-[330px] w-full text-[var(--accent)]"
            >
              {/* Discovered spaces share the same architectural footprint. */}
              <path
                d="M25 27H375V270H25V27Z"
                stroke="var(--border)"
                strokeWidth="2"
              />
              <path
                d="M34 36H191V130H34V36ZM209 36H366V130H209V36ZM209 148H366V261H209V148Z"
                fill="currentColor"
                fillOpacity=".055"
              />
              <path
                d="M25 139H89M137 139H200M200 27V84M200 127V204M200 248V270M200 139H263M311 139H375"
                stroke="var(--ink)"
                strokeOpacity=".55"
                strokeWidth="4"
                strokeLinecap="square"
              />
              <path
                d="M41 43H87V69H41V43ZM302 43H359V82H302V43ZM41 222H84V254H41V222ZM321 202H359V254H321V202Z"
                stroke="var(--border)"
                strokeWidth="2"
              />

              {/* Continuous autonomous traversal and directional ticks. */}
              <path
                d="M60 105H113V178H160V105H251V59H280V105H286V193H239"
                stroke="currentColor"
                strokeOpacity=".65"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="60" cy="105" r="5" fill="currentColor" />
              <path
                d="m105 155 8 8 8-8M185 97l8 8-8 8M278 161l8 8 8-8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Forward-facing sensor field and progressively wider sweeps. */}
              <path
                d="M220 222 139 160C108 200 108 244 139 284L220 222Z"
                fill="currentColor"
                fillOpacity=".09"
              />
              <path
                d="M189 198C178 212 178 232 189 246M166 181C147 205 147 239 166 263M143 164C115 199 115 245 143 280"
                stroke="currentColor"
                strokeOpacity=".55"
                strokeWidth="1.5"
              />

              {/* Top-view rover: two wheel tracks and an optical module. */}
              <g transform="translate(239 222) rotate(-90)">
                <rect
                  x="-34"
                  y="-24"
                  width="12"
                  height="49"
                  rx="5"
                  fill="var(--surface)"
                  stroke="var(--ink)"
                  strokeWidth="2"
                />
                <rect
                  x="22"
                  y="-24"
                  width="12"
                  height="49"
                  rx="5"
                  fill="var(--surface)"
                  stroke="var(--ink)"
                  strokeWidth="2"
                />
                <rect
                  x="-25"
                  y="-33"
                  width="50"
                  height="65"
                  rx="18"
                  fill="var(--surface)"
                  stroke="var(--ink)"
                  strokeWidth="2.5"
                />
                <rect
                  x="-15"
                  y="-36"
                  width="30"
                  height="21"
                  rx="7"
                  fill="var(--surface)"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <circle cy="-26" r="5" stroke="currentColor" strokeWidth="2" />
                <circle cy="9" r="10" stroke="var(--border)" strokeWidth="2" />
                <circle cy="9" r="3" fill="currentColor" />
              </g>
            </svg>
          </div>

          <p className="min-h-[188px] shrink-0 border-t border-[var(--border)] pt-6 font-[var(--font-body)] text-[27px] leading-[1.38] tracking-[-0.015em]">
            Rover maps through autonomous exploration, livestreaming and recording
            in <span className="text-[var(--accent)]">up to 4K.</span>
          </p>
        </article>
      </div>
    </section>
  );
}
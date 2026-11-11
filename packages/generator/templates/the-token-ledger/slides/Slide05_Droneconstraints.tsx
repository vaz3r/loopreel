import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide05({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const notes = [
    {
      number: '01',
      title: 'Subscription gate',
      body: 'Set routes and schedules require an Amazon Ring Protect subscription.',
      position: 'left-[420px] top-[18px] w-[500px]',
    },
    {
      number: '02',
      title: 'Reflective surfaces',
      body: 'Polished marble or wet tile may degrade drone navigation.',
      position: 'left-0 top-[290px] w-[350px]',
    },
    {
      number: '03',
      title: 'Blank or transparent surfaces',
      body: 'Featureless blank matte walls, frameless glass and mirrors may degrade navigation.',
      position: 'left-[40px] top-[548px] w-[460px]',
    },
  ];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <p className="font-[var(--font-mono)] text-[22px] leading-[28px] tracking-[0.14em] text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h1 className="mt-4 font-[var(--font-headline)] text-[64px] font-bold leading-[1.06] tracking-[-0.045em]">
          {slide.headline}
        </h1>

        <p className="mt-4 max-w-[880px] font-[var(--font-body)] text-[28px] leading-[36px]">
          {slide.subheadline}
        </p>
      </header>

      <div className="relative mt-6 h-[744px] w-full shrink-0">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 952 744"
          fill="none"
          role="img"
          aria-label="An illustrative diagonal drone route passes a subscription gate, a reflective floor patch, and a blank-wall and glass boundary. Dashed sections indicate possible navigation degradation."
        >
          {/* Quiet registration marks establish a technical drawing field. */}
          <g stroke="var(--border)" strokeWidth="1.5">
            <path d="M0 28V0H28 M924 0H952V28" />
            <path d="M924 744H952V716" />
            <path d="M880 246h24 M892 234v24" />
            <path d="M84 494h24 M96 482v24" />
          </g>

          {/* One diagonal route corridor; all explanatory text sits outside it. */}
          <path
            d="M100 62L850 690"
            stroke="var(--surface)"
            strokeWidth="64"
          />

          {/* Subscription gate, perpendicular to the direction of travel. */}
          <g transform="translate(266 201) rotate(40)">
            <path
              d="M-22-64H22V64H-22Z"
              fill="var(--surface)"
              stroke="var(--border)"
              strokeWidth="2"
            />
            <path
              d="M0-64V64"
              stroke="var(--accent)"
              strokeWidth="3"
            />
            <path
              d="M-31-64H31 M-31 64H31"
              stroke="var(--accent)"
              strokeWidth="2"
            />
          </g>

          {/* Reflective floor plane with offset specular strokes. */}
          <g>
            <path
              d="M390 354L481 304L590 397L499 447Z"
              fill="var(--surface)"
              stroke="var(--border)"
              strokeWidth="2"
            />
            <path
              d="M413 360L480 323 M442 385L509 348 M471 410L538 373"
              stroke="var(--accent)"
              strokeWidth="2"
              opacity="0.35"
            />
            <path
              d="M517 406l14-8 M525 411l14-8"
              stroke="var(--accent)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>

          {/* Adjacent blank wall and transparent glass boundary. */}
          <g>
            <path
              d="M666 477L730 505V640L666 612Z"
              fill="var(--surface)"
              stroke="var(--border)"
              strokeWidth="2"
            />
            <path
              d="M730 505L804 474V609L730 640Z"
              fill="var(--accent)"
              fillOpacity="0.04"
              stroke="var(--accent)"
              strokeOpacity="0.55"
              strokeWidth="2"
            />
            <path
              d="M730 505V640"
              stroke="var(--ink)"
              strokeOpacity="0.5"
              strokeWidth="2"
            />
            <path
              d="M747 548L781 534 M747 560L781 546"
              stroke="var(--accent)"
              strokeOpacity="0.35"
              strokeWidth="2"
            />
          </g>

          {/* Solid route transitions to dashed near challenging surfaces. */}
          <path
            d="M100 62L390 305"
            stroke="var(--accent)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M390 305L850 690"
            stroke="var(--accent)"
            strokeWidth="5"
            strokeDasharray="13 13"
            strokeLinecap="round"
          />
          <path
            d="M827 685L850 690L841 668"
            stroke="var(--accent)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Drone silhouette at the route origin. */}
          <g transform="translate(100 62) rotate(40)">
            <path
              d="M-22-22L22 22 M22-22L-22 22"
              stroke="var(--ink)"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <g
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeWidth="2"
            >
              <ellipse cx="-26" cy="-26" rx="19" ry="12" />
              <ellipse cx="26" cy="-26" rx="19" ry="12" />
              <ellipse cx="-26" cy="26" rx="19" ry="12" />
              <ellipse cx="26" cy="26" rx="19" ry="12" />
              <rect x="-13" y="-18" width="26" height="36" rx="7" />
            </g>
            <path
              d="M-5-9H5"
              stroke="var(--accent)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>

          {/* Exactly three leaders connect the numbered margin notes. */}
          <g
            stroke="var(--ink)"
            strokeOpacity="0.5"
            strokeWidth="1.5"
            strokeLinejoin="round"
          >
            <path d="M420 43H363L294 163" />
            <path d="M350 315H374L420 354" />
            <path d="M500 573H604L666 588" />
          </g>

          <g fill="var(--accent)">
            <circle cx="294" cy="163" r="5" />
            <circle cx="420" cy="354" r="5" />
            <circle cx="666" cy="588" r="5" />
          </g>
        </svg>

        {notes.map((note) => (
          <article
            key={note.number}
            className={`absolute ${note.position}`}
          >
            <div className="flex items-start gap-4">
              <span className="flex h-[48px] w-[48px] shrink-0 items-center justify-center border border-[var(--accent)] bg-[var(--surface)] font-[var(--font-mono)] text-[22px] leading-none tracking-[0.04em] text-[var(--accent)]">
                {note.number}
              </span>

              <h2 className="pt-[3px] font-[var(--font-headline)] text-[34px] font-semibold leading-[38px] tracking-[-0.025em]">
                {note.title}
              </h2>
            </div>

            <p className="mt-4 font-[var(--font-body)] text-[26px] leading-[34px]">
              {note.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
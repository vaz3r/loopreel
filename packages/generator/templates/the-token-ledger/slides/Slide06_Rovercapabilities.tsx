import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide06({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const captions = [
    {
      title: 'Video',
      body: 'Livestreams and records in up to 4K.',
    },
    {
      title: 'Stationary scan',
      body: 'Can perform a 360-degree scan at a designated location.',
    },
    {
      title: 'Claimed coverage',
      body: 'Amazon claims up to 5,000 square feet (465 square meters).',
    },
  ];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <p className="font-[var(--font-mono)] text-[22px] leading-none tracking-[0.16em] text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h1 className="mt-5 font-[var(--font-headline)] text-[60px] font-bold leading-[1.04] tracking-[-0.045em]">
          {slide.headline}
        </h1>

        <p className="mt-5 max-w-[850px] font-[var(--font-body)] text-[28px] leading-snug">
          {slide.subheadline}
        </p>
      </header>

      <div className="my-6 flex min-h-[440px] flex-1 items-center">
        <svg
          viewBox="0 0 952 500"
          className="block h-full max-h-[540px] w-full"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          {/* Unscaled floor-plan outline, behind the side elevation. */}
          <g
            stroke="var(--border)"
            strokeWidth="2"
            strokeLinecap="square"
            strokeLinejoin="miter"
          >
            <path d="M52 214V44H294V65H574V44H900V410H810" />
            <path d="M52 282V410H126" />
            <path d="M52 214H120M52 282H120" />
            <path d="M574 44V168H688M762 168H900" />
            <path d="M688 168V94H828V168" />
            <path d="M120 214V282" strokeDasharray="7 9" />
            <path d="M688 168V242M762 168V242" />
            <path d="M688 242H762" strokeDasharray="7 9" />
            <path d="M76 69H94M85 60V78M868 69H886M877 60V78" />
          </g>

          {/* Camera sight lines clear the counter silhouette. */}
          <path
            d="M431 121L878 70V217Z"
            fill="var(--accent)"
            fillOpacity="0.055"
          />
          <g
            stroke="var(--accent)"
            strokeWidth="2"
            strokeOpacity="0.45"
            strokeDasharray="8 10"
          >
            <path d="M443 118L878 70" />
            <path d="M443 129L878 217" />
          </g>

          {/* Counter silhouette. */}
          <path
            d="M612 260H892V446H612Z"
            fill="var(--surface)"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M598 246H906V261H598Z"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeOpacity="0.6"
            strokeWidth="2"
          />
          <path
            d="M752 281V428M634 290H730M774 290H870"
            stroke="var(--border)"
            strokeWidth="2"
          />

          {/* Circular scan arrow around the elevated camera. */}
          <path
            d="M471 78A78 78 0 1 0 483 150"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M470 145L483 150L487 136"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M328 121H340M406 32V44"
            stroke="var(--accent)"
            strokeOpacity="0.55"
            strokeWidth="2"
          />

          {/* Telescoping mast: deliberately without dimensions. */}
          <path
            d="M385 329V187H402V329"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeOpacity="0.75"
            strokeWidth="2.5"
          />
          <path
            d="M389 190V149H399V190"
            fill="var(--surface)"
            stroke="var(--accent)"
            strokeWidth="2.5"
          />
          <path
            d="M382 213H405M382 307H405"
            stroke="var(--ink)"
            strokeOpacity="0.6"
            strokeWidth="3"
          />

          {/* Camera head in side elevation. */}
          <path
            d="M364 96H418L442 107V139L418 150H364Q354 150 354 140V106Q354 96 364 96Z"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="2.5"
          />
          <path
            d="M422 107H443V139H422Z"
            fill="var(--accent)"
            fillOpacity="0.18"
            stroke="var(--accent)"
            strokeWidth="2.5"
          />
          <path
            d="M433 115V131"
            stroke="var(--accent)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle cx="369" cy="111" r="3" fill="var(--accent)" />
          <path
            d="M366 138H398"
            stroke="var(--border)"
            strokeWidth="2"
          />

          {/* Rover body and chassis. */}
          <path
            d="M202 377L238 337Q246 327 264 327H421Q443 327 458 345L494 386V414H193V392Q193 384 202 377Z"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="3"
          />
          <path
            d="M239 337H420L448 367H217"
            stroke="var(--ink)"
            strokeOpacity="0.45"
            strokeWidth="2"
          />
          <path
            d="M209 387H476M322 341V375"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M356 341H404"
            stroke="var(--accent)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M199 413H487"
            stroke="var(--ink)"
            strokeWidth="4"
          />
          <rect
            x="463"
            y="375"
            width="18"
            height="9"
            rx="3"
            fill="var(--accent)"
          />

          <g fill="var(--surface)" stroke="var(--ink)" strokeWidth="3">
            <circle cx="251" cy="414" r="34" />
            <circle cx="432" cy="414" r="34" />
          </g>
          <g stroke="var(--border)" strokeWidth="3">
            <circle cx="251" cy="414" r="21" />
            <circle cx="432" cy="414" r="21" />
          </g>
          <g fill="var(--ink)">
            <circle cx="251" cy="414" r="5" />
            <circle cx="432" cy="414" r="5" />
          </g>

          {/* Shared ground datum and caption alignment ticks. */}
          <path
            d="M36 449H916"
            stroke="var(--ink)"
            strokeOpacity="0.5"
            strokeWidth="2"
          />
          <g stroke="var(--accent)" strokeWidth="2">
            <path d="M159 470V486" />
            <path d="M476 470V486" />
            <path d="M793 470V486" />
          </g>
        </svg>
      </div>

      <div className="grid shrink-0 grid-cols-3 gap-6 border-t border-[var(--border)] pt-6 pb-2">
        {captions.map((caption) => (
          <div key={caption.title} className="min-w-0">
            <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-tight tracking-[-0.025em]">
              {caption.title}
            </h2>
            <p className="mt-3 font-[var(--font-body)] text-[26px] leading-snug">
              {caption.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
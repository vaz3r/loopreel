import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide07({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  const materials = [
    {
      title: 'Reflective flooring',
      body: 'Polished marble or wet tile may degrade navigation performance.',
    },
    {
      title: 'Featureless walls',
      body: 'Blank matte walls without features may degrade navigation performance.',
    },
    {
      title: 'Glass and mirrors',
      body: 'Frameless glass and mirrors may degrade navigation performance.',
    },
  ];

  return (
    <section
      data-slide-id={slide.id}
      className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]"
    >
      <div className="flex items-center gap-4">
        <span
          aria-hidden="true"
          className="h-3 w-3 shrink-0 bg-[var(--accent)]"
        />
        <p className="font-[var(--font-mono)] text-[22px] uppercase tracking-[0.16em] text-[var(--accent)]">
          DRONE NAVIGATION
        </p>
      </div>

      <h1 className="mt-7 max-w-[930px] font-[var(--font-headline)] text-[68px] font-bold leading-[1.04] tracking-[-0.045em]">
        Ordinary Surfaces
        <br />
        Can Complicate
        <br />
        Navigation
      </h1>

      <p className="mt-7 max-w-[840px] font-[var(--font-body)] text-[28px] leading-snug">
        Amazon identifies indoor surfaces around which Drone navigation
        performance may degrade.
      </p>

      <figure className="mt-12 w-full">
        <svg
          viewBox="0 0 952 690"
          fill="none"
          role="img"
          aria-label="Continuous room cross-section showing reflective flooring, a featureless matte wall, and glass or mirror panels. Broken orange route segments indicate possible navigation degradation, not inevitable crashes."
          className="block h-auto w-full"
        >
          {/* Shared room envelope: three materials, one continuous space. */}
          <path
              d="M24 440V92H928V440"
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeOpacity="0.4"
              strokeWidth="2"
          />
          <path
            d="M24 440H928L952 588H0L24 440Z"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeOpacity="0.4"
            strokeWidth="2"
          />
          <path
            d="M24 92L0 64H952L928 92M24 440H928"
            stroke="var(--ink)"
            strokeOpacity="0.3"
            strokeWidth="2"
          />

          {/* Subtle sectional guides, not enclosed cards. */}
          <path
            d="M317 64V616M635 64V616"
            stroke="var(--border)"
            strokeWidth="2"
            strokeDasharray="5 11"
          />

          {/* Zone one: polished tile, perspective joints and reflected light. */}
          <path
            d="M24 440H317V588H0L24 440Z"
            fill="var(--ink)"
            fillOpacity="0.065"
          />
          <g
            stroke="var(--ink)"
            strokeOpacity="0.25"
            strokeWidth="2"
          >
            <path d="M22 465H317M15 502H317M7 546H317" />
            <path d="M87 440L62 588M159 440L150 588M235 440L249 588" />
          </g>
          <g
            stroke="var(--ink)"
            strokeOpacity="0.55"
            strokeWidth="3"
            strokeLinecap="round"
          >
            <path d="M44 530L111 476M100 550L191 478M193 550L269 491" />
          </g>
          <g
            stroke="var(--accent)"
            strokeOpacity="0.18"
            strokeWidth="4"
            strokeDasharray="10 12"
          >
            <path d="M57 561C114 540 164 548 207 562S267 571 296 551" />
          </g>

          {/* Zone two: intentionally uninterrupted matte wall. */}
          <path
            d="M337 113H615V420H337Z"
            fill="var(--ink)"
            fillOpacity="0.025"
          />
          <path
            d="M338 440H614"
            stroke="var(--ink)"
            strokeOpacity="0.5"
            strokeWidth="3"
          />

          {/* Zone three: frameless glass and mirror planes. */}
          <path
            d="M660 151L775 120V432L660 463Z"
            fill="var(--ink)"
            fillOpacity="0.055"
            stroke="var(--ink)"
            strokeOpacity="0.6"
            strokeWidth="2"
          />
          <path
            d="M798 120L907 151V463L798 432Z"
            fill="var(--ink)"
            fillOpacity="0.1"
            stroke="var(--ink)"
            strokeOpacity="0.7"
            strokeWidth="2"
          />
          <g
            stroke="var(--ink)"
            strokeOpacity="0.35"
            strokeWidth="3"
          >
            <path d="M680 259L752 175M680 296L752 212" />
            <path d="M821 346L884 273M821 382L884 309" />
          </g>
          <path
            d="M660 463L690 559M775 432L812 528M798 432L841 528M907 463L943 559"
            stroke="var(--ink)"
            strokeOpacity="0.13"
            strokeWidth="2"
          />

          {/* A hovering drone establishes navigation rather than collision. */}
          <g
            transform="translate(149 223)"
            stroke="var(--ink)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M-24 -8L-53 -26M24 -8L53 -26M-24 8L-53 26M24 8L53 26" />
            <ellipse cx="-55" cy="-28" rx="24" ry="9" />
            <ellipse cx="55" cy="-28" rx="24" ry="9" />
            <ellipse cx="-55" cy="28" rx="24" ry="9" />
            <ellipse cx="55" cy="28" rx="24" ry="9" />
            <path
              d="M-28 -14L0 -23L28 -14V14L0 23L-28 14Z"
              fill="var(--surface)"
            />
            <circle
              cx="0"
              cy="0"
              r="6"
              fill="var(--accent)"
              stroke="var(--accent)"
            />
          </g>
          <path
            d="M149 270V324"
            stroke="var(--ink)"
            strokeOpacity="0.25"
            strokeWidth="2"
            strokeDasharray="4 8"
          />

          {/* Broken routes approach each material without impact symbols. */}
          <g
            stroke="var(--accent)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="18 15"
          >
            <path d="M52 371C104 337 155 344 192 375S263 408 298 371" />
            <path d="M345 337C380 336 395 282 438 282S491 352 533 332S572 282 607 290" />
            <path d="M659 362C692 332 714 345 742 368S789 378 817 346S870 315 908 335" />
          </g>

          {/* Open continuation marks avoid suggesting inevitable crashes. */}
          <g
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M283 371H299V387" />
            <path d="M594 278L609 290L595 303" />
            <path d="M894 320L909 335L891 343" />
          </g>

          {/* Material leaders connect directly to the annotations below. */}
          <g stroke="var(--ink)" strokeOpacity="0.45" strokeWidth="2">
            <path d="M159 564V674" />
            <path d="M476 401V674" />
            <path d="M794 490V674" />
          </g>
          <g fill="var(--accent)">
            <circle cx="159" cy="564" r="5" />
            <circle cx="476" cy="401" r="5" />
            <circle cx="794" cy="490" r="5" />
          </g>
          <path
            d="M0 689H952"
            stroke="var(--border)"
            strokeWidth="2"
          />
        </svg>

        <figcaption className="grid grid-cols-3 gap-6 pt-7">
          {materials.map((material) => (
            <div key={material.title} className="min-w-0">
              <h2 className="min-h-[80px] font-[var(--font-headline)] text-[32px] font-semibold leading-[1.16] tracking-[-0.025em]">
                {material.title}
              </h2>
              <p className="mt-4 font-[var(--font-body)] text-[26px] leading-snug">
                {material.body}
              </p>
            </div>
          ))}
        </figcaption>
      </figure>
    </section>
  );
}
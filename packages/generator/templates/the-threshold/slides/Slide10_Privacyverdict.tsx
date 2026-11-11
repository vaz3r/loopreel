import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide10({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;

  return (
    <section
      className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]"
      aria-labelledby={`${slide.id}-headline`}
      aria-roledescription="slide"
      aria-label={`10 of ${totalSlides}`}
    >
      <div className="flex items-center gap-5">
        <span
          aria-hidden="true"
          className="h-[3px] w-12 shrink-0 bg-[var(--accent)]"
        />
        <p className="font-[var(--font-mono)] text-[22px] leading-normal tracking-wider">
          THE THRESHOLD VERDICT
        </p>
      </div>

      <p className="mt-7 max-w-[860px] font-[var(--font-body)] text-[28px] leading-snug">
        Throw Away the Key Encryption arrived in September 2026; its
        protections remain contested.
      </p>

      <div className="relative mt-9 grid h-[430px] shrink-0 grid-cols-[minmax(0,1fr)_288px_minmax(0,1fr)] items-center gap-5">
        <article className="relative min-w-0 self-center pb-8">
          <div
            aria-hidden="true"
            className="mb-6 h-[3px] w-16 bg-[var(--ink)]"
          />
          <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-tight">
            Amazon&apos;s assurance
          </h2>
          <p className="mt-5 font-[var(--font-body)] text-[26px] leading-snug">
            Amazon says Throw Away the Key Encryption will protect both
            devices&apos; videos.
          </p>
        </article>

        <svg
          viewBox="0 0 288 430"
          fill="none"
          aria-hidden="true"
          className="h-[430px] w-full"
        >
          {/* Open-ended framing signals an assessment still unresolved. */}
          <path
            d="M82 63H34V367H82"
            stroke="var(--border)"
            strokeWidth="2"
            strokeLinecap="square"
          />
          <path
            d="M206 63H254V156M254 274V367H206"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeLinecap="square"
          />

          {/* A closed shackle avoids implying a demonstrated vulnerability. */}
          <path
            d="M99 192V151C99 126.147 119.147 106 144 106C168.853 106 189 126.147 189 151V192"
            stroke="var(--ink)"
            strokeWidth="5"
          />
          <rect
            x="76"
            y="192"
            width="136"
            height="121"
            rx="5"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="3"
          />
          <circle
            cx="144"
            cy="242"
            r="10"
            stroke="var(--ink)"
            strokeWidth="3"
          />
          <path
            d="M144 253V274"
            stroke="var(--ink)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Opposing attribution pointers, without a verdict symbol. */}
          <path
            d="M0 215H61"
            stroke="var(--ink)"
            strokeWidth="2"
          />
          <circle cx="61" cy="215" r="4" fill="var(--ink)" />
          <path
            d="M227 215H288"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <circle cx="227" cy="215" r="4" fill="var(--accent)" />

          <path
            d="M132 337H156"
            stroke="var(--border)"
            strokeWidth="2"
          />
        </svg>

        <article className="relative min-w-0 self-center pt-8 text-[var(--accent)]">
          <div
            aria-hidden="true"
            className="mb-6 h-[3px] w-16 bg-[var(--accent)]"
          />
          <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-tight">
            EFF&apos;s assessment
          </h2>
          <p className="mt-5 font-[var(--font-body)] text-[26px] leading-snug">
            EFF says it remains well short of end-to-end encryption.
          </p>
        </article>
      </div>

      <div className="mt-7 border-t border-[var(--border)] pt-9">
        <h1
          id={`${slide.id}-headline`}
          className="max-w-[920px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.06] tracking-[-0.035em]"
        >
          <span className="block">Mobile Security,</span>
          <span className="block">Unresolved Privacy</span>
          <span className="block">Questions</span>
        </h1>
      </div>
    </section>
  );
}
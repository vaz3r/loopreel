import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

type DialogueContent = {
  topic: string;
  speaker: string;
  role: string;
  thesis: string;
  counterThesis: string;
};

const defaults: DialogueContent = {
  topic: 'The price of an open sky',
  speaker: 'The Tokyo Review',
  role: 'Editorial dialogue · not an architect quotation',
  thesis:
    'At Azuma House, the exposed crossing makes sunlight, wind and rain part of ordinary movement. Our reading: a route can cultivate attention as deliberately as a window frames a view.',
  counterThesis:
    'But an architectural lesson should not become a compulsory hardship. Our design position: preserve contact with weather while giving residents a sheltered alternative. Atmosphere should invite participation, not demand endurance.',
};

export default function Slide05({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const data = slide as unknown as Partial<DialogueContent>;
  const content = {
    topic: data.topic ?? defaults.topic,
    speaker: data.speaker ?? defaults.speaker,
    role: data.role ?? defaults.role,
    thesis: data.thesis ?? defaults.thesis,
    counterThesis: data.counterThesis ?? defaults.counterThesis,
  };

  return (
    <article
      aria-label={content.topic}
      aria-roledescription="slide"
      className="flex h-full min-h-0 flex-col justify-between gap-7 text-[var(--ink)] font-[var(--font-body)]"
    >
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
          <span className="font-[var(--font-mono)] text-sm uppercase tracking-[0.22em] text-[var(--accent)]">
            Space / ethics / everyday life
          </span>
        </div>

        <h1 className="max-w-[850px] font-[var(--font-headline)] text-7xl font-bold leading-[0.98] tracking-[-0.045em]">
          {content.topic}
          <span className="text-[var(--accent)]">.</span>
        </h1>

        <div className="flex flex-col gap-1 border-l-2 border-[var(--accent)] pl-4">
          <p className="text-lg font-semibold">{content.speaker}</p>
          <p className="font-[var(--font-mono)] text-xs leading-relaxed tracking-wide opacity-65">
            {content.role}
          </p>
        </div>
      </div>

      <div className="grid flex-1 grid-rows-[1fr_1.12fr] gap-5">
        <section
          aria-labelledby="slide-05-question"
          className="relative flex flex-col justify-center overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-sm"
        >
          <div className="grid grid-cols-[86px_minmax(0,1fr)] items-start gap-5">
            <span
              aria-hidden="true"
              className="font-[var(--font-headline)] text-8xl italic leading-[0.85] tracking-tight text-[var(--accent)]"
            >
              Q
            </span>

            <div className="flex flex-col gap-4">
              <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.2em] opacity-60">
                01 / The proposition
              </span>
              <h2
                id="slide-05-question"
                className="font-[var(--font-headline)] text-4xl font-bold leading-[1.08] tracking-tight"
              >
                Can a route teach attention?
              </h2>
              <p className="max-w-[640px] text-[25px] leading-[1.48]">
                {content.thesis}
              </p>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="slide-05-answer"
          className="relative flex flex-col justify-center overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-sm"
        >
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-1 bg-[var(--accent)]"
          />

          <div className="grid grid-cols-[86px_minmax(0,1fr)] items-start gap-5">
            <span
              aria-hidden="true"
              className="font-[var(--font-headline)] text-8xl italic leading-[0.85] tracking-tight text-[var(--accent)]"
            >
              A
            </span>

            <div className="flex flex-col gap-4">
              <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
                02 / The qualification
              </span>
              <h2
                id="slide-05-answer"
                className="font-[var(--font-headline)] text-4xl font-bold leading-[1.08] tracking-tight"
              >
                Yes. But give residents a choice.
              </h2>
              <p className="max-w-[640px] text-[25px] leading-[1.48]">
                {content.counterThesis}
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className="flex items-center gap-5">
        <span
          aria-hidden="true"
          className="h-px flex-1 bg-[var(--border)]"
        />
        <p className="font-[var(--font-headline)] text-2xl italic text-[var(--accent)]">
          Invitation, not endurance.
        </p>
      </div>
    </article>
  );
}
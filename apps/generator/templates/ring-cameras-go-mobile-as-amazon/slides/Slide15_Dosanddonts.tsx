import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

type GuidanceItem = {
  title: string;
  body: string;
};

type GuidanceData = {
  headline?: string;
  dos?: GuidanceItem[];
  donts?: GuidanceItem[];
};

const fallback: Required<GuidanceData> = {
  headline: 'Separate visible safeguards from stronger guarantees',
  dos: [
    {
      title: 'Use recording signals',
      body: 'Amazon says LED indicators and screen notifications show when video and audio recording are active.',
    },
    {
      title: 'Inspect the retention window',
      body: 'Rover videos triggered by doorbell rings, motion events and Live View events are stored in the cloud for sharing and replaying for up to 180 days.',
    },
    {
      title: 'Distinguish current features from adjacent ones',
      body: 'The article reports no mention of facial recognition in the new robots. Ring’s fixed doorbell cameras have offered the optional Familiar Faces feature since December 2025; that feature faces a class action lawsuit.',
    },
  ],
  donts: [
    {
      title: 'Do not equate encryption with end-to-end protection',
      body: 'Amazon says both robots will use Throw Away the Key Encryption, introduced in September 2026. The EFF says it remains well short of end-to-end encryption.',
    },
    {
      title: 'Do not mistake recording indicators for a complete privacy answer',
      body: 'Knowing a camera is recording does not resolve the access concerns raised by Ring’s history of employee, contractor and hacker access.',
    },
  ],
};

function GuidanceMark({ caution = false }: { caution?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="h-5 w-5 shrink-0"
    >
      {caution ? (
        <>
          <path
            d="M12 3 22 21H2L12 3Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M12 9v5m0 3v.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </>
      ) : (
        <path
          d="m5 12 4.5 4.5L19 7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

export default function Slide15({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const data = slide as unknown as GuidanceData;
  const headline = data.headline ?? fallback.headline;
  const dos = data.dos ?? fallback.dos;
  const donts = data.donts ?? fallback.donts;

  void brand;
  void totalSlides;

  return (
    <section
      aria-label={headline}
      className="flex h-full min-h-0 flex-col gap-8 text-[var(--ink)] font-[var(--font-body)]"
    >
      <div className="shrink-0">
        <div className="mb-5 flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
          <span className="text-sm font-[var(--font-mono)] font-medium uppercase tracking-[0.18em] text-[var(--accent)]">
            Privacy / Reading the claims
          </span>
        </div>

        <h1 className="max-w-[920px] text-[58px] font-[var(--font-headline)] font-bold leading-[1.03] tracking-[-0.045em] [text-wrap:balance]">
          {headline}
        </h1>
      </div>

      <div className="grid flex-1 grid-cols-2 items-stretch gap-6">
        <section aria-label="Do" className="flex flex-col gap-4">
          <div className="flex items-center justify-between border-t-2 border-[var(--accent)] pt-4">
            <h2 className="text-xl font-[var(--font-mono)] font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
              Do
            </h2>
            <span className="text-xs font-[var(--font-mono)] uppercase tracking-[0.12em] opacity-65">
              Check the specifics
            </span>
          </div>

          <div className="flex flex-1 flex-col gap-4">
            {dos.map((item, index) => (
              <article
                key={item.title}
                className="flex flex-1 flex-col justify-between gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--accent)]">
                    <GuidanceMark />
                  </span>
                  <h3 className="text-[23px] font-[var(--font-headline)] font-bold leading-[1.15] tracking-[-0.02em]">
                    {item.title}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="ml-auto pt-1 text-xs font-[var(--font-mono)] text-[var(--accent)]"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <p className="text-[20px] leading-[1.4] opacity-85">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section aria-label="Do not" className="flex flex-col gap-4">
          <div className="flex items-center justify-between border-t-2 border-[var(--border)] pt-4">
            <h2 className="text-xl font-[var(--font-mono)] font-bold uppercase tracking-[0.16em]">
              Don’t
            </h2>
            <span className="text-xs font-[var(--font-mono)] uppercase tracking-[0.12em] opacity-65">
              Overread the promise
            </span>
          </div>

          <div className="flex flex-1 flex-col gap-4">
            {donts.map((item, index) => (
              <article
                key={item.title}
                className="relative flex flex-1 flex-col justify-between gap-6 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm"
              >
                <div>
                  <div className="mb-6 flex items-center justify-between text-[var(--accent)]">
                    <span className="flex items-center gap-2 text-xs font-[var(--font-mono)] uppercase tracking-[0.12em]">
                      <GuidanceMark caution />
                      Caution
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-xs font-[var(--font-mono)]"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="text-[28px] font-[var(--font-headline)] font-bold leading-[1.15] tracking-[-0.025em] [text-wrap:balance]">
                    {item.title}
                  </h3>
                </div>

                <p className="border-t border-[var(--border)] pt-5 text-[21px] leading-[1.45] opacity-85">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
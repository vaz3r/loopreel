import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

type Quadrant = {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  title: string;
  body: string;
};

type QuadrantData = {
  headline: string;
  axes: {
    columns: string[];
    rows: string[];
  };
  quadrants: Quadrant[];
};

const defaultData: QuadrantData = {
  headline: 'Every new vantage point has a constraint',
  axes: {
    columns: ['Promised capability', 'Reported constraint'],
    rows: ['Ring Drone Cam', 'Ring Rover Cam'],
  },
  quadrants: [
    {
      position: 'top-left',
      title: 'An airborne view',
      body: '2K video, a 148-degree field of view, 360-degree rotation and two LED lights. Scheduled routes require an Amazon Ring Protect subscription.',
    },
    {
      position: 'top-right',
      title: 'A short flight envelope',
      body: 'Just 8 minutes of flight on a new, fully charged battery under controlled conditions. Reflective surfaces, featureless matte walls and transparent surfaces can degrade navigation.',
    },
    {
      position: 'bottom-left',
      title: 'A ground-level patrol',
      body: 'Up to 4K video, 360-degree scans and an adjustable mast. Amazon claims coverage of up to 5,000 square feet (465 square meters).',
    },
    {
      position: 'bottom-right',
      title: 'A floor-bound machine',
      body: 'No stair climbing. Amazon lists incompatibility with curved edges, sunken areas, flooring transitions greater than 1.375 inches (3.5 centimeters), and black glossy floors.',
    },
  ],
};

export default function Slide06({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const supplied = slide as unknown as Partial<QuadrantData>;
  const headline = supplied.headline ?? defaultData.headline;
  const axes = supplied.axes ?? defaultData.axes;
  const quadrants = supplied.quadrants ?? defaultData.quadrants;

  // Publication branding and pagination are supplied by SlideFrame.
  void brand;
  void totalSlides;

  function renderCard(position: Quadrant['position']) {
    const quadrant =
      quadrants.find((item) => item.position === position) ??
      defaultData.quadrants.find((item) => item.position === position)!;

    const isCapability = position.endsWith('left');

    return (
      <article
        className={`relative flex h-full min-w-0 flex-col justify-between gap-6 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-7 shadow-sm ${
          isCapability ? 'border-t-2 border-t-[var(--accent)]' : ''
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="font-[var(--font-mono)] text-xs font-medium uppercase tracking-[0.18em] text-[var(--ink)] opacity-60">
            {isCapability ? 'Capability' : 'Constraint'}
          </span>

          <svg
            aria-hidden="true"
            viewBox="0 0 32 32"
            fill="none"
            className={`h-8 w-8 shrink-0 ${
              isCapability
                ? 'text-[var(--accent)]'
                : 'text-[var(--ink)] opacity-50'
            }`}
          >
            {isCapability ? (
              <>
                <circle cx="16" cy="16" r="10" stroke="currentColor" />
                <circle cx="16" cy="16" r="3" fill="currentColor" />
                <path
                  d="M16 1v7m0 16v7M1 16h7m16 0h7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </>
            ) : (
              <>
                <path
                  d="M10 5H5v22h5m12-22h5v22h-5M11 16h10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                />
              </>
            )}
          </svg>
        </div>

        <div className="flex flex-1 flex-col justify-center gap-5">
          <h3 className="max-w-[14ch] font-[var(--font-headline)] text-[32px] font-bold leading-[1.08] tracking-tight text-[var(--ink)]">
            {quadrant.title}
          </h3>
          <p className="font-[var(--font-body)] text-[20px] leading-[1.5] text-[var(--ink)]">
            {quadrant.body}
          </p>
        </div>

        <div
          aria-hidden="true"
          className="h-px w-full bg-[var(--border)]"
        />
      </article>
    );
  }

  return (
    <section className="flex h-full min-h-0 flex-col gap-9 text-[var(--ink)]">
      <header className="shrink-0">
        <div className="mb-5 flex items-center gap-3">
          <span className="h-2 w-2 bg-[var(--accent)]" aria-hidden="true" />
          <p className="font-[var(--font-mono)] text-sm uppercase tracking-[0.2em] text-[var(--accent)]">
            Consumer robotics / Capability × constraint
          </p>
        </div>

        <h2 className="max-w-[19ch] font-[var(--font-headline)] text-6xl font-bold leading-[1.02] tracking-tight">
          {headline}
        </h2>
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-[104px_minmax(0,1fr)_minmax(0,1fr)] grid-rows-[auto_minmax(0,1fr)_minmax(0,1fr)] gap-x-4 gap-y-5">
        <div aria-hidden="true" />

        {axes.columns.map((column, index) => (
          <div
            key={column}
            className="flex items-center gap-3 border-b border-[var(--border)] pb-4"
          >
            <span className="font-[var(--font-mono)] text-xs text-[var(--accent)]">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="font-[var(--font-mono)] text-sm font-medium uppercase tracking-[0.09em]">
              {column}
            </span>
          </div>
        ))}

        {[0, 1].map((rowIndex) => (
          <React.Fragment key={rowIndex}>
            <div className="flex h-full flex-col justify-center gap-5 border-r border-[var(--border)] pr-4">
              <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.15em] text-[var(--accent)]">
                {rowIndex === 0 ? 'Air' : 'Ground'}
              </span>
              <h3 className="font-[var(--font-headline)] text-xl font-bold leading-tight">
                {axes.rows[rowIndex]}
              </h3>
              <span
                aria-hidden="true"
                className="h-px w-8 bg-[var(--accent)]"
              />
            </div>

            {renderCard(rowIndex === 0 ? 'top-left' : 'bottom-left')}
            {renderCard(rowIndex === 0 ? 'top-right' : 'bottom-right')}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
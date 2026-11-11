import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

const components = [
  {
    name: 'Environmental inputs',
    label: 'SENSE',
    description:
      'Device cameras and on-device sensors provide information about the surrounding space.',
  },
  {
    name: 'Interpretation and processing',
    label: 'PROCESS',
    description:
      'Specialized vision models and cloud processing help plan patrol routes and navigate around obstacles such as furniture.',
  },
  {
    name: 'Spatial map',
    label: 'MAP',
    description:
      'A guided drone tour or autonomous Rover exploration establishes the interior floor plan. Amazon says the system can identify rooms and suggest patrol points.',
  },
  {
    name: 'Patrol execution',
    label: 'MOVE',
    description:
      'Configured routes and patrol points turn the map into movement; notifications from connected Ring devices can trigger a response.',
  },
];

function AnatomyIcon({ stage }: { stage: number }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      className="h-24 w-24 text-[var(--accent)]"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {stage === 0 && (
        <>
          <path d="M14 28V14h14M72 14h14v14M86 72v14H72M28 86H14V72" opacity=".4" />
          <rect x="24" y="34" width="52" height="36" rx="8" />
          <path d="m34 34 6-9h20l6 9" />
          <circle cx="50" cy="52" r="12" />
          <circle cx="50" cy="52" r="4" fill="currentColor" stroke="none" />
          <path d="M10 52h7m66 0h7" opacity=".5" />
        </>
      )}
      {stage === 1 && (
        <>
          <path d="M30 48h-5a13 13 0 0 1-1-26 20 20 0 0 1 38-3 15 15 0 1 1 8 29h-6" />
          <rect x="34" y="42" width="28" height="28" rx="5" />
          <path d="M42 50h12v12H42M40 36v6m16-6v6M28 50h6m-6 12h6m28-12h6m-6 12h6M42 70v12m12-12v12" />
          <circle cx="42" cy="86" r="3" />
          <circle cx="54" cy="86" r="3" />
        </>
      )}
      {stage === 2 && (
        <>
          <path d="M16 14h68v72H16zM48 14v24m0 14v34M16 48h20m24 0h24" />
          <path d="M25 23h14v13H25zM60 61h15v16H60z" opacity=".35" />
          <path d="M31 69h9V43h27V29" strokeDasharray="3 5" />
          <circle cx="31" cy="69" r="4" fill="currentColor" stroke="none" />
          <circle cx="67" cy="29" r="5" />
        </>
      )}
      {stage === 3 && (
        <>
          <path d="M19 76V29h55v27" strokeDasharray="4 6" opacity=".65" />
          <circle cx="19" cy="76" r="5" />
          <circle cx="74" cy="29" r="5" fill="currentColor" stroke="none" />
          <rect x="54" y="59" width="32" height="19" rx="6" />
          <circle cx="61" cy="81" r="4" />
          <circle cx="79" cy="81" r="4" />
          <path d="M70 59v-8m-6 3 6-6 6 6M39 35V23m-6 6 6-6 6 6" />
        </>
      )}
    </svg>
  );
}

export default function Slide17({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void slide;
  void brand;
  void totalSlides;

  return (
    <section className="flex h-full min-h-0 flex-col justify-between gap-7 text-[var(--ink)] font-[var(--font-body)]">
      <div className="space-y-5">
        <div className="flex items-center gap-4">
          <span className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 font-[var(--font-mono)] text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
            System anatomy
          </span>
          <div className="h-px flex-1 bg-[var(--border)]" />
          <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.18em] opacity-60">
            AI Pilot
          </span>
        </div>

        <h1 className="max-w-[900px] font-[var(--font-headline)] text-6xl font-bold leading-[1.04] tracking-[-0.045em]">
          AI Pilot connects the camera to the{' '}
          <span className="text-[var(--accent)]">floor plan</span>
        </h1>

        <p className="max-w-[850px] text-[22px] leading-[1.45] opacity-80">
          Amazon describes a shared navigation system behind the flying and
          wheeled devices. Its operation combines local sensing with cloud
          processing.
        </p>
      </div>

      <div className="relative flex flex-1 flex-col justify-center">
        <ol className="relative grid flex-1 grid-rows-4 gap-3">
          {components.map((item, index) => (
            <li
              key={item.name}
              className="relative grid grid-cols-[144px_1fr] items-center overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-sm"
            >
              <div className="flex h-full flex-col items-center justify-center gap-1 border-r border-[var(--border)] px-4 py-4">
                <AnatomyIcon stage={index} />
                <span className="font-[var(--font-mono)] text-[11px] font-semibold tracking-[0.18em] text-[var(--accent)]">
                  {String(index + 1).padStart(2, '0')} / {item.label}
                </span>
              </div>

              <div className="space-y-2 px-7 py-5">
                <h2 className="font-[var(--font-headline)] text-[27px] font-bold leading-[1.15] tracking-tight">
                  {item.name}
                </h2>
                <p className="text-[19px] leading-[1.45] opacity-80">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <aside className="border-l-4 border-[var(--accent)] py-1 pl-6">
        <p className="mb-2 font-[var(--font-mono)] text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
          The connective tissue
        </p>
        <p className="max-w-[880px] text-[23px] leading-[1.4]">
          The central system is not simply a camera on a vehicle. It is an{' '}
          <strong className="font-semibold">
            interior map linked to sensing, cloud processing and automated
            movement.
          </strong>
        </p>
      </aside>
    </section>
  );
}
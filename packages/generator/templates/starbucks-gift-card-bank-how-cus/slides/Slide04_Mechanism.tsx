import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

interface EmphasizedCopyProps {
  text?: string;
}

function EmphasizedCopy({ text = '' }: EmphasizedCopyProps) {
  return (
    <>
      {text.split(/(\*\*.*?\*\*)/g).map((part, index) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={index} className="font-semibold text-[var(--ink)]">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <React.Fragment key={index}>{part}</React.Fragment>
        ),
      )}
    </>
  );
}

export default function Slide04({ slide }: SlideComponentProps) {
  const items = slide.items ?? [];
  const item0 = items[0];
  const item1 = items[1];
  const item2 = items[2];

  const rows = [
    { number: '01', item: item0, height: 'h-[82px]' },
    { number: '02', item: item1, height: 'h-[83px]' },
    { number: '03', item: item2, height: 'h-[83px]' },
  ];

  const footer =
    (slide as SlideComponentProps['slide'] & { footer?: string }).footer ??
    'Accounting reflects required unclaimed-property remittances.';

  return (
    <section className="flex flex-col h-full min-h-0 w-full justify-between py-[24px] text-[var(--ink)]">
      <header className="flex h-[220px] shrink-0 flex-col justify-between">
        <div className="flex items-center gap-2.5 font-[var(--font-mono)] text-[20px] uppercase tracking-[0.2em] text-[var(--accent)]">
          <span
            aria-hidden="true"
            className="inline-block h-2.5 w-2.5 shrink-0 bg-[var(--accent)]"
          />
          <span>{slide.kicker}</span>
        </div>

        <h1 className="max-w-[860px] font-[var(--font-headline)] text-[62px] font-bold leading-[1.04] tracking-[-0.04em] [text-wrap:balance]">
          {slide.headline}
        </h1>

        <div
          aria-hidden="true"
          className="w-full border-b border-[var(--border)]"
        />
      </header>

      <div className="my-[16px] flex min-h-0 flex-1 flex-col justify-between">
        <div className="flex h-[420px] shrink-0 items-center justify-center">
          <svg
            aria-hidden="true"
            viewBox="0 0 952 420"
            fill="none"
            className="block h-[420px] max-h-[380px] min-h-0 w-full text-[var(--ink)]"
          >
            {/* Continuous process spine and registration marks. */}
            <g stroke="var(--border)" strokeWidth="1">
              <path d="M92 32V388" />
              <path d="M80 32H104M80 388H104" />
              <path d="M104 74H146M104 210H146M104 346H146" />
              <path d="M366 30V46M358 38H374" />
              <path d="M674 329V345M666 337H682" />
            </g>

            <g fill="var(--accent)">
              <rect x="87" y="69" width="10" height="10" />
              <rect x="87" y="205" width="10" height="10" />
              <rect x="87" y="341" width="10" height="10" />
            </g>

            <g
              fill="var(--ink)"
              textAnchor="end"
              className="font-[var(--font-mono)] text-[24px]"
            >
              <text x="66" y="82">01</text>
              <text x="66" y="218">02</text>
              <text x="66" y="354">03</text>
            </g>

            {/* Gift card: physical geometry rather than placeholder copy. */}
            <rect
              x="160"
              y="38"
              width="156"
              height="98"
              rx="2"
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeWidth="1"
            />
            <path
              d="M160 61H316"
              stroke="var(--accent)"
              strokeWidth="10"
            />
            <rect
              x="180"
              y="87"
              width="30"
              height="25"
              rx="2"
              stroke="var(--ink)"
              strokeWidth="1"
            />
            <path
              d="M190 87V112M200 87V112M180 99H210"
              stroke="var(--border)"
              strokeWidth="1"
            />
            <circle
              cx="286"
              cy="101"
              r="12"
              stroke="var(--accent)"
              strokeWidth="1"
            />

            {/* Corporate-cash tank; only a bounded interior zone is marked. */}
            <path
              d="M390 76C390 60.5 448.2 48 520 48C591.8 48 650 60.5 650 76V309C650 324.5 591.8 337 520 337C448.2 337 390 324.5 390 309Z"
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeWidth="1.5"
            />
            <ellipse
              cx="520"
              cy="76"
              rx="130"
              ry="28"
              stroke="var(--ink)"
              strokeWidth="1"
            />
            <path
              d="M390 309C390 293.5 448.2 281 520 281C591.8 281 650 293.5 650 309"
              stroke="var(--border)"
              strokeWidth="1"
            />

            <path
              d="M411 174C444 190 596 190 629 174V219C595 235 445 235 411 219Z"
              fill="var(--accent)"
              fillOpacity="0.08"
            />
            <path
              d="M411 174C444 190 596 190 629 174"
              stroke="var(--accent)"
              strokeWidth="1"
            />
            <path
              d="M428 164H412V229H428M612 164H628V229H612"
              stroke="var(--accent)"
              strokeWidth="1"
            />

            {/* Solid accent inlet enters the tank before redemption. */}
            <path
              d="M316 87H346V20H520V124"
              stroke="var(--accent)"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <path
              d="M513 114L520 125L527 114"
              stroke="var(--accent)"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <rect
              x="327"
              y="44"
              width="115"
              height="34"
              fill="var(--paper)"
            />
            <text
              x="339"
              y="69"
              fill="var(--accent)"
              className="font-[var(--font-mono)] text-[24px]"
            >
              CASH IN
            </text>

            {/* Purchase outlet: distinct solid piping. */}
            <path
              d="M650 245H790"
              stroke="var(--ink)"
              strokeWidth="2"
            />
            <path
              d="M775 239L785 245L775 251"
              stroke="var(--ink)"
              strokeWidth="2"
            />
            <circle
              cx="650"
              cy="245"
              r="5"
              fill="var(--paper)"
              stroke="var(--ink)"
              strokeWidth="1.5"
            />

            <path
              d="M790 230H854L845 289H800Z"
              fill="var(--paper)"
              stroke="var(--ink)"
              strokeWidth="1.5"
            />
            <path
              d="M854 240H864C883 240 883 266 861 266H849"
              stroke="var(--ink)"
              strokeWidth="1.5"
            />
            <path
              d="M786 230H858M797 289H849"
              stroke="var(--ink)"
              strokeWidth="1.5"
            />
            <text
              x="771"
              y="211"
              fill="var(--ink)"
              className="font-[var(--font-mono)] text-[24px]"
            >
              REDEEM
            </text>

            {/* Unscaled balance gauge with an explicit downward movement. */}
            <rect
              x="711"
              y="203"
              width="15"
              height="88"
              fill="var(--paper)"
              stroke="var(--border)"
              strokeWidth="1"
            />
            <rect
              x="715"
              y="255"
              width="7"
              height="32"
              fill="var(--accent)"
            />
            <path
              d="M738 208V282M732 274L738 282L744 274"
              stroke="var(--accent)"
              strokeWidth="1.5"
            />

            {/* Recognition starts at redemption, not at a tank drain. */}
            <path
              d="M718 296V346H750"
              stroke="var(--accent)"
              strokeWidth="1.5"
              strokeDasharray="5 6"
            />
            <circle
              cx="784"
              cy="345"
              r="34"
              stroke="var(--ink)"
              strokeWidth="1.5"
            />
            <circle
              cx="784"
              cy="345"
              r="23"
              stroke="var(--border)"
              strokeWidth="1"
            />
            <circle cx="784" cy="345" r="5" fill="var(--accent)" />
            <path
              d="M784 311V321M808 321L801 328M818 345H808M808 369L801 362M784 379V369M760 369L767 362M750 345H760M760 321L767 328"
              stroke="var(--ink)"
              strokeWidth="1"
            />
            <path
              d="M784 345L798 330"
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <text
              x="550"
              y="375"
              fill="var(--accent)"
              className="font-[var(--font-mono)] text-[24px]"
            >
              RECOGNIZE
            </text>
          </svg>
        </div>

        <div className="relative mt-[16px] flex h-[248px] shrink-0 flex-col justify-between">
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-[92px] top-0 w-px bg-[var(--border)]"
          />

          {rows.map(({ number, item, height }) => (
            <article
              key={number}
              className={`relative grid ${height} shrink-0 grid-cols-[32px_286px_minmax(0,1fr)] items-center gap-x-[24px] pl-[76px]`}
            >
              <span className="relative z-10 flex h-[32px] w-[32px] items-center justify-center border border-[var(--border)] bg-[var(--paper)] font-[var(--font-mono)] text-[20px] tabular-nums text-[var(--accent)]">
                {number}
              </span>

              <h2 className="font-[var(--font-headline)] text-[26px] font-semibold leading-[1.08] tracking-[-0.025em]">
                {item?.title}
              </h2>

              <p className="min-w-0 font-[var(--font-body)] text-[24px] leading-[1.18] text-[var(--ink)]/80">
                <EmphasizedCopy text={item?.body} />
              </p>
            </article>
          ))}
        </div>
      </div>

      <p className="flex h-[60px] shrink-0 items-end border-t border-[var(--border)] pb-[2px] font-[var(--font-body)] text-[20px] leading-snug text-[var(--ink)]/70">
        {footer}
      </p>
    </section>
  );
}
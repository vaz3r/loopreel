import React from 'react';
import {
  parseMetricBadge,
  type SlideComponentProps,
} from '../../../src/skeleton/types';

function Metric({
  badge,
  monumental = false,
}: {
  badge: string;
  monumental?: boolean;
}) {
  const { qualifier, value: metric, unit } = parseMetricBadge(badge);

  return (
    <div className="flex items-baseline gap-2 text-[var(--accent)]">
      {qualifier && (
        <span className="font-[var(--font-body)] text-[26px]">
          {qualifier}
        </span>
      )}
      <span
        className={`font-[var(--font-mono)] font-bold leading-none tracking-[-0.05em] tabular-nums ${
          monumental ? 'text-[56px]' : 'text-[52px]'
        }`}
      >
        {metric}
      </span>
      {unit && (
        <span className="font-[var(--font-body)] text-[24px]">{unit}</span>
      )}
    </div>
  );
}

function EditorialCopy({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*.*?\*\*)/g).map((part, index) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={index} className="font-semibold text-[var(--accent)]">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <React.Fragment key={index}>{part}</React.Fragment>
        ),
      )}
    </>
  );
}

export default function Slide05({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const item0 = items[0];
  const telemetry = slide.telemetry ?? [];
  const channels = [telemetry[0], telemetry[1]];
  const hero = slide.heroMetric;

  void brand;
  void totalSlides;

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <div className="flex items-center gap-3 font-[var(--font-mono)] text-[20px] uppercase tracking-[0.14em] text-[var(--accent)]">
          <span className="h-2.5 w-2.5 shrink-0 bg-[var(--accent)]" />
          <span>{slide.kicker}</span>
        </div>

        <h1 className="mt-4 max-w-[920px] font-[var(--font-headline)] text-[60px] font-bold leading-[1.05] tracking-[-0.045em]">
          {slide.headline}
        </h1>

        <p className="mt-4 font-[var(--font-body)] text-[26px] leading-snug">
          {slide.subheadline}
        </p>
      </header>

      <div className="my-6 flex min-h-0 flex-1 flex-col justify-center rounded-none border border-[var(--border)] bg-[var(--surface)] p-9">
        <div className="shrink-0">
          <Metric badge={hero?.badge ?? ''} monumental />
          <p className="mt-3 font-[var(--font-body)] text-[24px] leading-snug">
            {hero?.label}
          </p>
        </div>

        <svg
          viewBox="0 0 878 132"
          className="mt-6 block h-[132px] w-full shrink-0 text-[var(--ink)]"
          fill="none"
          role="img"
          aria-label="Company-operated and licensed accounting channels joined beneath the calculated revenue total."
        >
          {/* One-pixel summation brace; its center contains the cutaway valve. */}
          <g stroke="var(--border)" strokeWidth="1">
            <path d="M219 52V24H419M459 24H659V52" />
            <path d="M207 24H231M647 24H671" />
            <path d="M439 0V10" />
          </g>

          {/* Small, non-proportional reservoir cutaway and valve. */}
          <g stroke="var(--accent)" strokeWidth="1.5">
            <path d="M427 3V12H451V3" />
            <path d="M431 8H447" />
            <path d="M439 12V16" />
            <path d="M419 17L439 31V17L459 31V17L439 31" />
            <path d="M415 24H419M459 24H463" />
            <path d="M439 31V40" />
          </g>

          {/* Equal-size accounting channels: these are not a ratio chart. */}
          <g stroke="currentColor" strokeWidth="1.5">
            <rect x="65" y="52" width="308" height="42" />
            <rect x="505" y="52" width="308" height="42" />
            <path d="M219 94V112M659 94V112" />
          </g>

          <g
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[22px]"
            textAnchor="middle"
          >
            <text x="219" y="80">
              company-operated
            </text>
            <text x="659" y="80">
              licensed
            </text>
          </g>

          {/* Each channel terminates inside this unified SVG. */}
          <g
            fill="var(--surface)"
            stroke="var(--accent)"
            strokeWidth="1.5"
          >
            <rect x="211" y="112" width="16" height="16" />
            <rect x="651" y="112" width="16" height="16" />
          </g>
          <g stroke="var(--accent)" strokeWidth="1">
            <path d="M215 120H223M219 116V124" />
            <path d="M655 120H663M659 116V124" />
          </g>
        </svg>

        <div className="mt-4 grid shrink-0 grid-cols-2 gap-8">
          {channels.map((channel, index) => (
            <div
              key={index}
              className={`min-w-0 ${
                index === 1
                  ? 'border-l border-[var(--border)] pl-8'
                  : ''
              }`}
            >
              <Metric badge={channel?.badge ?? ''} />
              <p className="mt-3 font-[var(--font-body)] text-[24px] leading-snug">
                {channel?.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <aside className="shrink-0 rounded-none border border-[var(--border)] px-8 py-6">
        <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-tight tracking-[-0.025em]">
          {item0?.title || item0?.label}
        </h2>
        <p className="mt-2 font-[var(--font-body)] text-[26px] leading-snug">
          <EditorialCopy text={item0?.body ?? ''} />
        </p>
      </aside>
    </section>
  );
}
import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

function wrapCopy(text: string, maxCharacters = 33): string[] {
  return text.split(/\s+/).reduce<string[]>((lines, word) => {
    if (!word) return lines;
    const last = lines.length - 1;

    if (last < 0 || `${lines[last]} ${word}`.length > maxCharacters) {
      lines.push(word);
    } else {
      lines[last] += ` ${word}`;
    }

    return lines;
  }, []);
}

export default function Slide04({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const titleId = React.useId();

  const milestones = [
    { item: items[0], y: 40, repaired: false },
    { item: items[1], y: 270, repaired: true },
    { item: items[2], y: 500, repaired: false },
  ];

  const theme = {
    '--ink': '#F1F3F9',
    '--accent': '#FF4D00',
    '--surface': '#161820',
    '--border': '#F1F3F925',
    backgroundColor: '#0D0E12',
  } as React.CSSProperties;

  return (
    <section
      className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]"
      style={theme}
    >
      <header className="flex shrink-0 flex-col gap-6">
        <div className="flex items-center gap-5">
          <span
            aria-hidden="true"
            className="h-[3px] w-10 shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[20px] uppercase leading-snug tracking-[0.12em] text-[var(--accent)]">
            {slide.kicker}
          </p>
        </div>

        <h1 className="max-w-[940px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.02] tracking-[-0.045em]">
          {slide.headline}
        </h1>

        <p className="max-w-[910px] font-[var(--font-body)] text-[28px] leading-snug text-[var(--ink)] opacity-80">
          {slide.subheadline}
        </p>
      </header>

      <div className="mt-8 w-full shrink-0 border-t border-[var(--border)]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 600 750"
          className="block h-auto w-full"
          role="img"
          aria-labelledby={titleId}
        >
          <title id={titleId}>{slide.headline}</title>

          <rect width="600" height="750" fill="#0D0E12" />

          {/* A faint alignment guide survives all three interventions. */}
          <path
            d="M54 40V710"
            fill="none"
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="2 7"
          />

          {/* First rupture: offset fragments, with deliberate open gaps. */}
          <g
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="square"
          >
            <path d="M54 40V80L48 88" />
            <path d="M61 103L54 113V202L47 210" />
            <path d="M61 225L54 235V250" />
          </g>

          {/* Reconstruction restores a continuous, visibly braced spine. */}
          <g fill="none" stroke="var(--ink)" strokeLinecap="square">
            <path d="M54 270V480" strokeWidth="3" />
            <path d="M47 284H61M47 292H61" strokeWidth="1.5" />
            <path d="M47 458H61M47 466H61" strokeWidth="1.5" />
            <path d="M47 284V292M61 284V292" strokeWidth="1" />
            <path d="M47 458V466M61 458V466" strokeWidth="1" />
          </g>

          {/* Final rupture: the lower fragments no longer share an axis. */}
          <g
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="square"
          >
            <path d="M54 500V558L47 566" />
            <path d="M62 580L54 591V642L46 650" />
            <path d="M62 667L58 678V691" />
            <path d="M48 701L44 710" />
          </g>

          {milestones.map(({ item, y, repaired }, index) => {
            const color = repaired ? 'var(--ink)' : 'var(--accent)';
            const badge = item?.badge ?? '';
            const dateLines =
              index === 2 ? wrapCopy(badge, 16) : [badge];
            const bodyLines = wrapCopy(item?.body ?? '');
            const titleY = y + 39 + dateLines.length * 30;
            const bodyY = titleY + 35;

            return (
              <g key={index}>
                {/* Panel geometry and connectors share one coordinate system. */}
                <path
                  d={
                    repaired
                      ? `M100 ${y}H560V${y + 210}H100Z`
                      : `M100 ${y}H560V${y + 194}L544 ${y + 210}H100Z`
                  }
                  fill="var(--surface)"
                  stroke="var(--border)"
                  strokeWidth="1"
                />

                <path
                  d={`M54 ${y + 38}H100`}
                  fill="none"
                  stroke={color}
                  strokeWidth="1.5"
                />

                {repaired ? (
                  <g>
                    <rect
                      x="47"
                      y={y + 31}
                      width="14"
                      height="14"
                      fill="#0D0E12"
                      stroke={color}
                      strokeWidth="2"
                    />
                    <path
                      d={`M50 ${y + 38}H58M54 ${y + 34}V${y + 42}`}
                      stroke={color}
                      strokeWidth="1.5"
                    />
                  </g>
                ) : (
                  <path
                    d={`M54 ${y + 30}L62 ${y + 38}L54 ${y + 46}L46 ${y + 38}Z`}
                    fill={color}
                  />
                )}

                <path
                  d={`M100 ${y + 19}V${y + 57}`}
                  stroke={color}
                  strokeWidth="3"
                />

                <text
                  x="120"
                  y={y + 38}
                  fill={color}
                  className="font-[var(--font-mono)] text-[26px]"
                  letterSpacing="-0.5"
                >
                  {dateLines.map((line, lineIndex) => (
                    <tspan
                      key={lineIndex}
                      x="120"
                      dy={lineIndex === 0 ? 0 : 30}
                    >
                      {line}
                    </tspan>
                  ))}
                </text>

                <text
                  x="120"
                  y={titleY}
                  fill="var(--ink)"
                  className="font-[var(--font-headline)] text-[22px] font-semibold"
                  letterSpacing="-0.35"
                >
                  {item?.title || item?.label}
                </text>

                <text
                  x="120"
                  y={bodyY}
                  fill="var(--ink)"
                  fillOpacity="0.78"
                  className="font-[var(--font-body)] text-[24px]"
                  letterSpacing="-0.3"
                >
                  {bodyLines.map((line, lineIndex) => (
                    <tspan
                      key={lineIndex}
                      x="120"
                      dy={lineIndex === 0 ? 0 : 29}
                    >
                      {line}
                    </tspan>
                  ))}
                </text>

                {!repaired && (
                  <path
                    d={`M544 ${y + 210}V${y + 194}H560`}
                    fill="none"
                    stroke={color}
                    strokeOpacity="0.7"
                    strokeWidth="1"
                  />
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </section>
  );
}
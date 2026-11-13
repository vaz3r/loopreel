import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

function renderEmphasis(copy?: string) {
  return copy?.split(/(\*\*.*?\*\*)/g).map((part, index) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={index}>{part.slice(2, -2)}</strong>
    ) : (
      <React.Fragment key={index}>{part}</React.Fragment>
    ),
  );
}

export default function Slide05({ slide }: SlideComponentProps) {
  const items = slide.items ?? [];
  const item0 = items[0];
  const item1 = items[1];
  const item2 = items[2];
  const titleId = React.useId();
  const descriptionId = React.useId();

  const screws = [
    [116, 64],
    [116, 356],
    [838, 64],
    [838, 356],
    [164, 120],
    [164, 320],
  ] as const;

  const panels = [
    { top: 80, center: 120 },
    { top: 180, center: 220 },
    { top: 280, center: 320 },
  ] as const;

  return (
    <section className="editorial-slide !gap-3">
      <header className="editorial-header">
        <div className="editorial-kicker">
          <span className="editorial-kicker-dot" />
          <span>{slide.kicker}</span>
        </div>

        <h1 className="editorial-headline">{slide.headline}</h1>

        {slide.subheadline && (
          <p className="editorial-subheadline">{slide.subheadline}</p>
        )}
      </header>

      <figure className="m-0 flex shrink-0 flex-col gap-3">
        <div className="editorial-visual-frame h-[420px] max-h-[420px] shrink-0">
          <svg
            className="block h-full w-full"
            viewBox="0 0 952 420"
            fill="none"
            role="img"
            aria-labelledby={`${titleId} ${descriptionId}`}
          >
            <title id={titleId}>
              Armrest-mounted compensation schedule
            </title>
            <desc id={descriptionId}>
              A technical armrest specimen with three equal-height panels
              connected by a continuous vertical spine. Within one hour:
              zero compensation. Shorter eligible delays: 200 percent,
              capped at $1,075. Longer eligible delays: 400 percent,
              capped at $2,150. The complete schedule follows below.
            </desc>

            {/* Registration marks: drafting geometry, not text placeholders. */}
            <g stroke="var(--border)" strokeWidth={1}>
              <path d="M64 30H80M72 22V38" />
              <path d="M872 30H888M880 22V38" />
              <path d="M64 390H80M72 382V398" />
              <path d="M872 390H888M880 382V398" />
              <path d="M476 18V30M470 24H482" />
              <path d="M476 390V402M470 396H482" />
            </g>

            {/* Outer molding and nested machined surfaces. */}
            <rect
              x={88}
              y={30}
              width={776}
              height={360}
              rx={42}
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeWidth={2}
            />
            <rect
              x={98}
              y={40}
              width={756}
              height={340}
              rx={34}
              stroke="var(--border)"
            />
            <path
              d="M130 48H820Q846 48 846 74V346Q846 372 820 372H130"
              stroke="var(--border)"
            />

            {/* Pivot bracket and exposed mechanical joint. */}
            <path
              d="M126 144H153L177 168V252L153 276H126Z"
              fill="var(--paper)"
              stroke="var(--ink)"
            />
            <path
              d="M134 155H149L165 174V246L149 265H134Z"
              stroke="var(--border)"
            />
            <circle
              cx={149}
              cy={210}
              r={23}
              fill="var(--surface)"
              stroke="var(--ink)"
            />
            <circle cx={149} cy={210} r={14} stroke="var(--border)" />
            <circle cx={149} cy={210} r={5} stroke="var(--accent)" />
            <path
              d="M120 210H130M168 210H178M149 181V191M149 229V239"
              stroke="var(--border)"
            />

            {/* Recessed compensation plate. */}
            <path
              d="M190 62H808L830 84V340L808 362H190L180 350V74Z"
              fill="var(--paper)"
              stroke="var(--border)"
              strokeWidth={2}
            />
            <path
              d="M196 70H804L822 88V336L804 354H196L188 346V78Z"
              stroke="var(--border)"
            />

            {/* Side release button, housing, and travel stop. */}
            <rect
              x={834}
              y={174}
              width={22}
              height={72}
              rx={8}
              fill="var(--paper)"
              stroke="var(--ink)"
            />
            <rect
              x={840}
              y={183}
              width={10}
              height={54}
              rx={4}
              fill="var(--surface)"
              stroke="var(--accent)"
            />
            <circle cx={845} cy={210} r={3} fill="var(--accent)" />
            <path d="M837 164H853M837 256H853" stroke="var(--border)" />

            {/* Six exposed screws; five primitives per fastener. */}
            {screws.map(([cx, cy]) => (
              <g key={`${cx}-${cy}`}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={10}
                  fill="var(--paper)"
                  stroke="var(--border)"
                />
                <circle cx={cx} cy={cy} r={6} stroke="var(--ink)" />
                <path
                  d={`M${cx - 3} ${cy - 3}L${cx + 3} ${cy + 3}`}
                  stroke="var(--ink)"
                />
                <path
                  d={`M${cx - 3} ${cy + 3}L${cx + 3} ${cy - 3}`}
                  stroke="var(--ink)"
                />
                <circle cx={cx} cy={cy} r={1} fill="var(--ink)" />
              </g>
            ))}

            {/* One continuous spine; equal panel heights denote tiers. */}
            <path
              d="M210 104V334"
              stroke="var(--accent)"
              strokeWidth={3}
            />

            {panels.map(({ top, center }) => (
              <g key={top}>
                <path
                  d={`M210 ${center}H278`}
                  stroke="var(--accent)"
                  strokeWidth={2}
                />
                <path
                  d={`M290 ${top}H803L815 ${top + 12}V${top + 68}
                      L803 ${top + 80}H290L278 ${top + 68}V${top + 12}Z`}
                  fill="var(--surface)"
                  stroke="var(--border)"
                />
                <path
                  d={`M284 ${top + 18}L294 ${top + 6}H799`}
                  stroke="var(--border)"
                />
                <path
                  d={`M809 ${top + 62}L799 ${top + 74}H294`}
                  stroke="var(--border)"
                />
                <circle
                  cx={210}
                  cy={center}
                  r={11}
                  fill="var(--paper)"
                  stroke="var(--accent)"
                  strokeWidth={2}
                />
                <circle
                  cx={210}
                  cy={center}
                  r={4}
                  fill="var(--accent)"
                />
              </g>
            ))}

            {/* Only anchored numerical schedule labels appear in SVG. */}
            <g className="font-[family-name:var(--font-mono)] tabular-nums">
              <g fill="var(--accent)" fontSize={34} fontWeight={700}>
                <text x={302} y={132}>$0</text>
                <text x={302} y={215}>200%</text>
                <text x={302} y={315}>400%</text>
              </g>

              <g fill="var(--ink)" fontSize={23}>
                <text x={596} y={129}>≤1 h</text>

                <text x={302} y={245}>CAP $1,075</text>
                <text x={596} y={210}>{'D: 1<h<2'}</text>
                <text x={596} y={243}>{'I: 1<h<4'}</text>

                <text x={302} y={345}>CAP $2,150</text>
                <text x={596} y={310}>D: h≥2</text>
                <text x={596} y={343}>I: h≥4</text>
              </g>
            </g>
          </svg>
        </div>

        <figcaption className="editorial-note !m-0 !text-[20px] !leading-[1.3]">
          <strong>D</strong> = domestic; <strong>I</strong> = international
          departing the United States;
          <br />
          <strong>h</strong> = planned arrival delay in hours.
        </figcaption>
      </figure>

      {/* The diagram supplies the vertical spine; its verbal key is open columns. */}
      <div className="layout-spine !relative !grid !grid-cols-3 !gap-0 !border-0 !p-0 before:!hidden after:!hidden">
        {[item0, item1, item2].map((item, index) => (
          <article
            key={index}
            className="layout-spine-node !relative !block !min-w-0 !border-0 !border-t !border-solid !border-[var(--border)] !p-5 before:!hidden after:!hidden [&+article]:!border-l"
          >
            <div className="mb-3 flex items-center gap-3">
              <span
                className="layout-spine-bullet !static !m-0 !translate-x-0 !translate-y-0"
                aria-hidden="true"
              />
              <span className="editorial-kicker !m-0 font-[family-name:var(--font-mono)] tabular-nums">
                {`[0${index + 1}]`}
              </span>
            </div>

            <h2 className="editorial-card-title !mb-2">
              {item?.title}
            </h2>
            <p className="editorial-card-body !m-0 !leading-[1.3]">
              {renderEmphasis(item?.body)}
            </p>
          </article>
        ))}
      </div>

      {slide.footer && (
        <p className="editorial-note !m-0 !text-[20px] !leading-[1.3]">
          {slide.footer}
        </p>
      )}
    </section>
  );
}
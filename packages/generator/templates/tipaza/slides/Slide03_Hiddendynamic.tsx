import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide03({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  const headingId = React.useId();
  const items = slide.items ?? [];
  const ancient = items[0];
  const modern = items[1];
  const [metric, ...unitWords] = (ancient?.badge ?? '').split(/\s+/);
  const unit = unitWords.join(' ');

  return (
    <section
      aria-labelledby={headingId}
      className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]"
    >
      <header className="flex shrink-0 flex-col gap-7">
        <div className="flex items-center gap-5">
          <span
            aria-hidden="true"
            className="h-[14px] w-[14px] shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[20px] uppercase leading-snug tracking-[0.13em] text-[var(--accent)]">
            {slide.kicker}
          </p>
        </div>

        <h1
          id={headingId}
          className="max-w-[850px] font-[var(--font-headline)] text-[58px] font-bold leading-[1.04] tracking-[-0.04em] [text-wrap:balance]"
        >
          {slide.headline}
        </h1>

        <p className="max-w-[850px] font-[var(--font-body)] text-[28px] leading-snug">
          {slide.subheadline}
        </p>

        <div className="h-px w-full bg-[var(--border)]" />
      </header>

      <div className="mt-10 grid w-full flex-1 grid-cols-[440px_440px] justify-center gap-[40px] pb-10">
        <article
          aria-labelledby={`${headingId}-ancient`}
          className="flex min-w-0 flex-col"
        >
          <h2
            id={`${headingId}-ancient`}
            className="font-[var(--font-headline)] text-[36px] font-semibold leading-tight tracking-[-0.025em]"
          >
            {ancient?.label || ancient?.title}
          </h2>

          <svg
            aria-hidden="true"
            viewBox="0 0 1080 1350"
            fill="none"
            className="mt-7 block h-[550px] w-[440px] shrink-0 text-[var(--ink)]"
          >
            {/* Detached foundation fragments: no continuous city perimeter. */}
            <g
              stroke="var(--border)"
              strokeWidth="4"
              strokeLinecap="square"
            >
              <path d="M68 108H258 M68 108V272" />
              <path d="M822 108H1012V272" />
              <path d="M68 1088V1250H258" />
              <path d="M822 1250H1012V1088" />
              <path d="M112 1166H370 M436 1166H610 M684 1166H964" />
              <path d="M122 1190H302 M340 1190H558 M708 1190H934" />
            </g>

            <g
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="square"
              strokeLinejoin="miter"
              opacity="0.72"
            >
              {/* First basilica, with interrupted nave and perimeter. */}
              <path d="M160 558V322H215V252C215 206 251 170 295 170C339 170 375 206 375 252V322H430V440" />
              <path d="M430 482V646H330 M284 646H160V604" />
              <path d="M224 552V358H366V568" />
              <path d="M224 606H298 M338 606H366" />
              <path d="M264 378V450 M264 482V552" />
              <path d="M326 378V450 M326 482V552" />

              {/* Second basilica, separately oriented and fragmented. */}
              <path d="M608 582V410H660V336C660 288 696 252 742 252C788 252 824 288 824 336V410H878V520" />
              <path d="M878 568V738H770 M722 738H608V630" />
              <path d="M670 656V452H816V656" />
              <path d="M670 696H728 M774 696H816" />
              <path d="M708 476V546 M708 584V642" />
              <path d="M778 476V546 M778 584V642" />

              {/* Third basilica, preserved as an incomplete footprint. */}
              <path d="M338 1068V862H392V812C392 766 428 730 474 730C520 730 556 766 556 812V862H610V956" />
              <path d="M610 1004V1116H514 M462 1116H338" />
              <path d="M400 1058V902H548V1060" />
              <path d="M440 922V978 M440 1012V1060" />
              <path d="M508 922V978 M508 1012V1060" />
            </g>

            <g stroke="var(--accent)" strokeWidth="8">
              <path d="M160 558L146 574L171 586L160 604" />
              <path d="M878 520L892 536L866 552L878 568" />
              <path d="M610 956L596 972L622 988L610 1004" />
            </g>

            <g fill="currentColor" opacity="0.25">
              <path d="M112 748L134 738L148 760L124 772Z" />
              <path d="M218 900L240 888L250 914L226 924Z" />
              <path d="M742 1006L764 996L780 1020L754 1034Z" />
              <path d="M860 864L882 854L894 876L870 890Z" />
              <path d="M526 186L546 178L558 198L538 210Z" />
            </g>
          </svg>

          <div className="mt-8 flex flex-1 flex-col border-t border-[var(--border)] pt-7">
            <p className="min-h-[112px] font-[var(--font-mono)] text-[48px] font-bold leading-[1.12] tracking-[-0.045em] text-[var(--accent)]">
              <span className="block">{metric}</span>
              {unit && <span className="block">{unit}</span>}
            </p>

            <p className="mt-7 max-w-[414px] font-[var(--font-body)] text-[28px] leading-[1.4] [text-wrap:pretty]">
              {ancient?.body}
            </p>

            <div
              aria-hidden="true"
              className="mt-auto flex gap-3 pt-10"
            >
              <span className="h-[4px] w-[54px] bg-[var(--accent)]" />
              <span className="h-[4px] w-[24px] bg-[var(--border)]" />
              <span className="h-[4px] w-[12px] bg-[var(--border)]" />
            </div>
          </div>
        </article>

        <article
          aria-labelledby={`${headingId}-modern`}
          className="flex min-w-0 flex-col"
        >
          <h2
            id={`${headingId}-modern`}
            className="font-[var(--font-headline)] text-[36px] font-semibold leading-tight tracking-[-0.025em]"
          >
            {modern?.label || modern?.title}
          </h2>

          <svg
            aria-hidden="true"
            viewBox="0 0 1080 1350"
            fill="none"
            className="mt-7 block h-[550px] w-[440px] shrink-0 text-[var(--ink)]"
          >
            {/* A distinct, regular street plan; never linked to the ruins. */}
            <g stroke="var(--border)" strokeWidth="4">
              <path d="M68 108H258 M68 108V272" />
              <path d="M822 108H1012V272" />
              <path d="M68 1088V1250H258" />
              <path d="M822 1250H1012V1088" />
            </g>

            <g
              fill="var(--surface)"
              stroke="currentColor"
              strokeWidth="6"
              opacity="0.7"
            >
              <path d="M152 212H358V432H152Z" />
              <path d="M430 212H650V432H430Z" />
              <path d="M722 212H928V432H722Z" />

              <path d="M152 504H358V742H152Z" />
              <path d="M722 504H928V742H722Z" />

              <path d="M152 814H358V1060H152Z" />
              <path d="M430 814H650V1060H430Z" />
              <path d="M722 814H928V1060H722Z" />
            </g>

            <g stroke="var(--border)" strokeWidth="4">
              <path d="M255 212V432 M152 322H358" />
              <path d="M540 212V432 M430 322H650" />
              <path d="M825 212V432 M722 322H928" />
              <path d="M255 504V742 M152 623H358" />
              <path d="M825 504V742 M722 623H928" />
              <path d="M255 814V1060 M152 937H358" />
              <path d="M540 814V1060 M430 937H650" />
              <path d="M825 814V1060 M722 937H928" />
              <path d="M152 1130H928" />
              <path d="M152 1154H928" />
            </g>

            <path
              d="M430 504H650V742H430Z"
              fill="var(--accent)"
              fillOpacity="0.08"
              stroke="var(--accent)"
              strokeWidth="7"
            />
            <g stroke="var(--accent)" strokeWidth="5">
              <path d="M510 623H570 M540 593V653" />
            </g>
            <circle cx="540" cy="623" r="62" stroke="var(--border)" strokeWidth="4" />
          </svg>

          <div className="mt-8 flex flex-1 flex-col border-t border-[var(--border)] pt-7">
            <p className="min-h-[112px] font-[var(--font-mono)] text-[48px] font-bold leading-[1.12] tracking-[-0.045em] text-[var(--accent)]">
              {modern?.badge}
            </p>

            <p className="mt-7 max-w-[414px] font-[var(--font-body)] text-[28px] leading-[1.4] [text-wrap:pretty]">
              {modern?.body}
            </p>

            <div aria-hidden="true" className="mt-auto pt-10">
              <div className="h-[4px] w-[114px] bg-[var(--accent)]" />
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
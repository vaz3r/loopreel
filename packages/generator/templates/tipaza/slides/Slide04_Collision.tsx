import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide04({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const item0 = items[0];
  const item1 = items[1];

  const historicalDate = (item0?.badge ?? '')
    .replace('the end of ', 'the end\nof ')
    .replace('the seventh', 'the\nseventh');

  const ancientBody = (item0?.body ?? '')
    .replace('forces ', 'forces\n')
    .replace('city ', 'city\n');

  const modernBody = (item1?.body ?? '')
    .replace('Tipaza’s ', 'Tipaza’s\n')
    .replace('followed ', 'followed\n')
    .replace('in the ', 'in the\n')
    .replace('century—not ', 'century—not\n')
    .replace('Roman ', 'Roman\n');

  void brand;
  void totalSlides;

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="flex shrink-0 flex-col gap-5 pb-8">
        <p className="font-[var(--font-mono)] text-[20px] uppercase leading-normal tracking-[0.12em] text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h1 className="max-w-[920px] font-[var(--font-headline)] text-[58px] font-bold leading-[1.04] tracking-[-0.04em]">
          {slide.headline}
        </h1>

        <p className="max-w-[900px] font-[var(--font-body)] text-[28px] leading-snug">
          {slide.subheadline}
        </p>
      </header>

      <div className="relative isolate grid min-h-0 flex-1 grid-cols-2 gap-x-[3.703704%] border-t border-[var(--border)] bg-[var(--paper,#0D0E12)] px-[7.407407%]">
        <svg
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
          viewBox="0 0 1080 1350"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          {/* Equal architectural fields; the central forty units stay empty. */}
          <path
            d="M80 0H520V1350H80Z"
            fill="var(--surface)"
          />
          <path
            d="M560 0H1000V1350H560Z"
            fill="var(--paper, #0D0E12)"
          />

          <g stroke="var(--border)" strokeWidth="1">
            <path d="M80 0V1350M1000 0V1350" />
            <path d="M112 342H488M592 342H968" />
            <path d="M112 958H488M592 958H968" />
          </g>

          {/* Severed inward-facing edges, never a bridge. */}
          <g stroke="var(--accent)" strokeWidth="4">
            <path d="M518 365V565L508 582L518 600V910" />
            <path d="M562 365V910" />
          </g>

          {/* Ancient foundations: incomplete bays and displaced masonry. */}
          <g
            stroke="var(--ink)"
            strokeWidth="3"
            strokeLinejoin="miter"
            strokeLinecap="square"
          >
            <path
              d="M130 842H253L267 829L280 846H333"
              opacity="0.8"
            />
            <path d="M357 852H471" opacity="0.8" />
            <path d="M143 821V745H201V808" />
            <path d="M155 745V658L167 645L178 660L188 650V745" />
            <path d="M149 658H192" opacity="0.45" />
            <path d="M222 812V701H284V819" />
            <path d="M233 701V567L244 552L255 568L271 557V701" />
            <path d="M228 584H277M228 685H277" opacity="0.45" />
            <path d="M306 826V744H366V811" />
            <path d="M319 744V682L330 674L343 688L354 680V744" />
            <path d="M387 829V777H453V839" />
            <path d="M394 777L410 746L438 759L430 777" />
            <path d="M140 728H199M220 788H285M306 782H366" opacity="0.35" />
          </g>

          <g
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinejoin="miter"
          >
            <path d="M371 693L397 665L424 687L402 712Z" />
            <path d="M424 814L446 797L466 815L445 830Z" />
            <path d="M282 866L302 852L323 866" />
          </g>

          <g stroke="var(--border)" strokeWidth="2">
            <path d="M123 880H232M256 892H341M377 881H474" />
            <path d="M132 901H183M314 916H367" />
            <path d="M119 515H147M133 501V529" />
          </g>

          {/* Modern street: its own plan, datum, and uninterrupted geometry. */}
          <g
            stroke="var(--ink)"
            strokeWidth="3"
            strokeLinejoin="miter"
          >
            <path d="M600 861L749 688H810L963 861" opacity="0.8" />
            <path d="M616 861L755 704M946 861L804 704" opacity="0.4" />

            <path d="M602 780V590H688V727" />
            <path d="M618 590V563H675V590" />
            <path d="M611 622H676M611 651H676" opacity="0.4" />
            <path d="M628 674V707H650V674Z" opacity="0.7" />

            <path d="M701 713V520H748V688" />
            <path d="M710 550H737M710 580H737M710 610H737" opacity="0.45" />

            <path d="M816 690V550H862V718" />
            <path d="M826 579H852M826 609H852M826 639H852" opacity="0.45" />

            <path d="M877 737V605H955V801" />
            <path d="M888 605V579H944V605" />
            <path d="M889 636H943M889 664H943" opacity="0.45" />
            <path d="M903 690V728H926V690Z" opacity="0.7" />
          </g>

          <g stroke="var(--accent)" strokeWidth="3">
            <path d="M775 727H786M774 756H789M772 794H792M769 841H796" />
            <path d="M603 889H963" />
          </g>

          <g stroke="var(--border)" strokeWidth="2">
            <path d="M602 910H963" />
            <path d="M935 488H963M949 474V502" />
          </g>
        </svg>

        <article className="flex min-w-0 flex-col px-6 pb-10 pt-10">
          <div className="min-h-[164px] shrink-0">
            <p className="whitespace-pre-line font-[var(--font-mono)] text-[30px] leading-[1.2] tracking-[-0.035em] text-[var(--accent)]">
              {historicalDate}
            </p>
          </div>

          <h2 className="min-h-[82px] shrink-0 font-[var(--font-headline)] text-[30px] font-semibold leading-[1.15] tracking-[-0.025em]">
            {item0?.title}
          </h2>

          <div className="min-h-[390px] flex-1" aria-hidden="true" />

          <div className="min-h-[336px] shrink-0 pt-8">
            <p className="whitespace-pre-line font-[var(--font-body)] text-[28px] leading-snug">
              {ancientBody}
            </p>
          </div>
        </article>

        <article className="flex min-w-0 flex-col px-6 pb-10 pt-10">
          <div className="min-h-[164px] shrink-0">
            <p className="font-[var(--font-mono)] text-[52px] font-bold leading-none tracking-[-0.045em] text-[var(--accent)]">
              {item1?.badge}
            </p>
          </div>

          <h2 className="min-h-[82px] shrink-0 font-[var(--font-headline)] text-[30px] font-semibold leading-[1.15] tracking-[-0.025em]">
            {item1?.title}
          </h2>

          <div className="min-h-[390px] flex-1" aria-hidden="true" />

          <div className="min-h-[336px] shrink-0 pt-8">
            <p className="whitespace-pre-line font-[var(--font-body)] text-[28px] leading-snug">
              {modernBody}
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
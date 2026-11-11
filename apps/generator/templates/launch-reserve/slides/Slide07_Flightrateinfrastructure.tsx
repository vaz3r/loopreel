import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide07({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const arrowId = React.useId().replace(/:/g, '');
  void slide;
  void brand;
  void totalSlides;

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <p className="font-[var(--font-mono)] text-[22px] leading-[28px] tracking-[0.14em] text-[var(--accent)]">
          NEUTRON CAPACITY
        </p>

        <h1 className="mt-4 max-w-[900px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.035em]">
          The Loan Targets
          <br />
          The Turnaround
        </h1>

        <p className="mt-5 max-w-[910px] font-[var(--font-body)] text-[26px] leading-[35px]">
          Neutron is medium-class and partially reusable; proposed funding
          targets its operational support infrastructure.
        </p>
      </header>

      <div className="relative mt-7 h-[680px] w-full shrink-0">
        <svg
          viewBox="0 0 952 480"
          className="absolute left-0 top-0 h-[480px] w-full"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <marker
              id={arrowId}
              viewBox="0 0 12 12"
              refX="10"
              refY="6"
              markerWidth="12"
              markerHeight="12"
              markerUnits="userSpaceOnUse"
              orient="auto"
            >
              <path
                d="M2 2L10 6L2 10"
                stroke="var(--accent)"
                strokeWidth="2"
                strokeLinecap="square"
                strokeLinejoin="miter"
              />
            </marker>
          </defs>

          {/* Intended improvements: dashed, directional connections. */}
          <g
            stroke="var(--accent)"
            strokeWidth="3"
            strokeDasharray="10 10"
            markerEnd={`url(#${arrowId})`}
          >
            <path d="M414 192L280 282" />
            <path d="M310 360H640" />
            <path d="M686 282L552 192" />
          </g>

          {/* External callout leaders. */}
          <g stroke="var(--border)" strokeWidth="2">
            <path d="M322 82H356L390 110" />
            <path d="M200 435V464H24V478" />
            <path d="M750 435V464H518V478" />
          </g>

          <g fill="var(--accent)">
            <circle cx="390" cy="110" r="4" />
            <circle cx="200" cy="435" r="4" />
            <circle cx="750" cy="435" r="4" />
          </g>

          {/* Processing: abstract handling gantry and suspended vehicle. */}
          <g>
            <path
              d="M410 35H550L570 55V165L550 185H410L390 165V55Z"
              fill="var(--surface)"
              stroke="var(--border)"
              strokeWidth="2"
            />
            <path
              d="M410 35H470"
              stroke="var(--accent)"
              strokeWidth="4"
            />
            <g
              stroke="var(--ink)"
              strokeWidth="3"
              strokeLinecap="square"
              strokeLinejoin="miter"
            >
              <path d="M430 149V71H530V149" />
              <path d="M421 149H439M521 149H539" />
              <path d="M430 83H530M480 83V98" />
              <path d="M464 112L480 98L496 112V132H464Z" />
              <path d="M456 140H504M458 148H502" />
            </g>
            <path
              d="M480 106V123M472 116H488"
              stroke="var(--accent)"
              strokeWidth="3"
            />
          </g>

          {/* Maritime recovery: abstract vessel with handling equipment. */}
          <g>
            <path
              d="M130 285H270L290 305V415L270 435H130L110 415V305Z"
              fill="var(--surface)"
              stroke="var(--border)"
              strokeWidth="2"
            />
            <path
              d="M130 285H190"
              stroke="var(--accent)"
              strokeWidth="4"
            />
            <g
              stroke="var(--ink)"
              strokeWidth="3"
              strokeLinecap="square"
              strokeLinejoin="miter"
            >
              <path d="M144 365H256L242 388H162Z" />
              <path d="M157 365V344H184V365M164 344V334H178V344" />
              <path d="M211 365V325H239M211 333L231 325M239 325V345" />
              <path d="M233 345H245V355H233Z" />
              <path d="M167 354H174" />
            </g>
            <path
              d="M142 399C152 392 162 406 172 399S192 392 202 399S222 406 232 399S248 394 258 399"
              stroke="var(--accent)"
              strokeWidth="3"
            />
          </g>

          {/* Manufacturing: abstract engine assembly. */}
          <g>
            <path
              d="M680 285H820L840 305V415L820 435H680L660 415V305Z"
              fill="var(--surface)"
              stroke="var(--border)"
              strokeWidth="2"
            />
            <path
              d="M680 285H740"
              stroke="var(--accent)"
              strokeWidth="4"
            />
            <g
              stroke="var(--ink)"
              strokeWidth="3"
              strokeLinecap="square"
              strokeLinejoin="miter"
            >
              <path d="M731 319H769V347L760 363H740L731 347Z" />
              <path d="M740 363C739 379 730 391 721 401H779C770 391 761 379 760 363" />
              <path d="M724 330H776M728 342H772" />
              <path d="M718 351H703V383H718M782 351H797V383H782" />
              <path d="M742 310V319M758 310V319" />
            </g>
            <path
              d="M735 391H765M740 363H760"
              stroke="var(--accent)"
              strokeWidth="3"
            />
          </g>
        </svg>

        <div className="absolute left-0 top-[28px] w-[310px]">
          <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-[36px] tracking-[-0.02em]">
            Delivery and processing
          </h2>
          <p className="mt-3 font-[var(--font-body)] text-[24px] leading-[32px]">
            Support faster vehicle delivery and processing.
          </p>
        </div>

        <div className="absolute left-0 top-[490px] w-[404px] border-t border-[var(--border)] pt-5">
          <h2 className="max-w-[360px] font-[var(--font-headline)] text-[32px] font-semibold leading-[36px] tracking-[-0.02em]">
            Recovery and transport
          </h2>
          <p className="mt-3 font-[var(--font-body)] text-[24px] leading-[32px]">
            Expand maritime vessels and equipment for Neutron recovery and
            transport.
          </p>
        </div>

        <div className="absolute right-0 top-[490px] w-[458px] border-t border-[var(--border)] pt-5">
          <h2 className="max-w-[400px] font-[var(--font-headline)] text-[32px] font-semibold leading-[36px] tracking-[-0.02em]">
            Production and turnaround
          </h2>
          <p className="mt-3 font-[var(--font-body)] text-[24px] leading-[32px]">
            Increase composite-structure and engine production; add
            infrastructure to reduce launch turnaround.
          </p>
        </div>
      </div>
    </section>
  );
}
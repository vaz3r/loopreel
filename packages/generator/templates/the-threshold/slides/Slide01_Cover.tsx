import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide01({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="text-center">
        <p className="font-[var(--font-mono)] text-[22px] leading-[28px] tracking-[0.16em] text-[var(--accent)]">
          DOMESTIC ROBOTICS
        </p>

        <h1 className="mt-4 font-[var(--font-headline)] text-[68px] font-bold leading-[1.02] tracking-[-0.045em]">
          <span className="block">Ring Gives Surveillance</span>
          <span className="block">Room to Roam</span>
        </h1>

        <p className="mx-auto mt-6 max-w-[840px] font-[var(--font-body)] text-[28px] leading-[36px]">
          Flying and wheeled cameras bring indoor mapping, cloud
          processing and privacy questions.
        </p>
      </div>

      <div className="mt-7 flex min-h-0 flex-1 flex-col justify-center">
        <svg
          className="block h-[450px] w-full shrink-0"
          viewBox="0 0 952 450"
          fill="none"
          aria-hidden="true"
        >
          {/* Architectural envelope: open doorways and interior partitions. */}
          <path
            d="M104 347V71H391M443 71H848V347H779M677 347H275M173 347H104"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M104 188H292V71M660 71V188H848"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M292 188V223M660 188V223"
            stroke="var(--border)"
            strokeWidth="2"
          />

          <path
            d="M104 347L157 383H795L848 347"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M292 347L318 383M660 347L634 383"
            stroke="var(--border)"
            strokeWidth="2"
          />

          {/* Restrained floor grid, separate from the patrol routes. */}
          <g stroke="var(--border)" strokeWidth="1" opacity="0.35">
            <path d="M125 359H827M141 371H811" />
            <path d="M403 347L413 383M549 347L539 383" />
          </g>

          {/* Shared departure point. */}
          <circle
            cx="476"
            cy="115"
            r="43"
            fill="var(--surface)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <path
            d="M454 119V104L476 89L498 104V119M465 130V111H487V130"
            stroke="var(--ink)"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path
            d="M476 158V185"
            stroke="var(--accent)"
            strokeWidth="3"
          />
          <circle cx="476" cy="185" r="6" fill="var(--accent)" />

          {/* Dashed airborne patrol branches left. */}
          <path
            d="M467 188C420 193 405 235 359 235H287C261 235 238 250 238 275"
            stroke="var(--accent)"
            strokeWidth="3.5"
            strokeDasharray="9 11"
            strokeLinecap="round"
          />
          <path
            d="M333 228L321 235L333 242"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Solid floor patrol branches right. */}
          <path
            d="M485 188C531 193 548 217 548 251V308C548 330 565 342 588 342H648C674 342 688 325 688 304H714"
            stroke="var(--accent)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M596 335L608 342L596 349"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Conceptual drone silhouette, not dimensionally representative. */}
          <ellipse
            cx="238"
            cy="354"
            rx="60"
            ry="10"
            fill="var(--surface)"
          />
          <g stroke="var(--ink)" strokeWidth="3">
            <path d="M220 293L187 274M256 293L289 274" />
            <path d="M220 305L187 322M256 305L289 322" />
            <ellipse cx="184" cy="272" rx="31" ry="10" fill="var(--surface)" />
            <ellipse cx="292" cy="272" rx="31" ry="10" fill="var(--surface)" />
            <ellipse cx="184" cy="324" rx="31" ry="10" fill="var(--surface)" />
            <ellipse cx="292" cy="324" rx="31" ry="10" fill="var(--surface)" />
            <path
              d="M215 285L238 277L261 285V309L238 320L215 309Z"
              fill="var(--paper, #E8EFEB)"
              strokeLinejoin="round"
            />
          </g>
          <circle cx="238" cy="299" r="9" fill="var(--ink)" />
          <circle cx="238" cy="299" r="3.5" fill="var(--accent)" />

          {/* Conceptual autonomous rover silhouette. */}
          <ellipse
            cx="714"
            cy="354"
            rx="64"
            ry="10"
            fill="var(--surface)"
          />
          <path
            d="M714 272V237"
            stroke="var(--ink)"
            strokeWidth="5"
          />
          <path
            d="M696 219H732V243H696Z"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="3"
          />
          <circle cx="714" cy="231" r="7" fill="var(--ink)" />
          <circle cx="714" cy="231" r="3" fill="var(--accent)" />
          <path
            d="M682 273H746L760 309V331H668V309Z"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M682 273L695 303H733L746 273M695 303V330M733 303V330"
            stroke="var(--ink)"
            strokeWidth="2"
          />
          <rect x="661" y="313" width="14" height="30" rx="5" fill="var(--ink)" />
          <rect x="753" y="313" width="14" height="30" rx="5" fill="var(--ink)" />
          <path
            d="M704 315H724"
            stroke="var(--accent)"
            strokeWidth="3"
          />

          {/* Endpoint leaders anchor the product captions below. */}
          <path
            d="M238 371V432M714 371V432"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <circle cx="238" cy="438" r="5" fill="var(--accent)" />
          <circle cx="714" cy="438" r="5" fill="var(--accent)" />
        </svg>

        <div className="grid grid-cols-2 gap-6 pt-3">
          <div className="flex flex-col items-center px-7 text-center">
            <h2 className="font-[var(--font-headline)] text-[34px] font-semibold leading-[42px] tracking-[-0.025em]">
              Ring Drone Cam
            </h2>
            <p className="mt-2 font-[var(--font-mono)] text-[22px] leading-[28px] tracking-wider text-[var(--accent)]">
              $250
            </p>
            <p className="mt-3 font-[var(--font-body)] text-[26px] leading-[34px]">
              Indoor flying security camera.
            </p>
          </div>

          <div className="flex flex-col items-center px-7 text-center">
            <h2 className="font-[var(--font-headline)] text-[34px] font-semibold leading-[42px] tracking-[-0.025em]">
              Ring Rover Cam
            </h2>
            <p className="mt-2 font-[var(--font-mono)] text-[22px] leading-[28px] tracking-wider text-[var(--accent)]">
              $1,000
            </p>
            <p className="mt-3 font-[var(--font-body)] text-[26px] leading-[34px]">
              Wheeled autonomous security robot marketed for business.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
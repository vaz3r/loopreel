import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide05({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const cards = [
    {
      title: 'Nova Block 2',
      body: 'Upgrades fully reusable Nova Pathfinder, whose debut is expected sometime next year.',
    },
    {
      title: 'Neutron',
      body: 'Partially reusable, medium-class, still-unproven; Rocket Lab schedules its first launch next year.',
    },
  ];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="mb-7 h-[6px] w-20 shrink-0 bg-[var(--accent)]" />

      <h1 className="m-0 max-w-[920px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.045em]">
        Different Rockets,
        <br />
        Different Readiness
        <br />
        Questions
      </h1>

      <div className="mt-9 grid min-h-0 flex-1 grid-cols-2 gap-6 border-t border-[var(--border)] pt-7">
        {cards.map((card, index) => (
          <article
            key={card.title}
            className="flex min-w-0 flex-col"
          >
            <h2 className="m-0 font-[var(--font-headline)] text-[36px] font-semibold leading-[1.15] tracking-[-0.035em]">
              {card.title}
            </h2>

            <div className="relative mt-5 h-[400px] shrink-0 bg-[var(--surface)]">
              <svg
                viewBox="0 0 464 400"
                className="block h-full w-full"
                fill="none"
                aria-hidden="true"
                focusable="false"
              >
                {/* Shared drafting field; silhouettes are editorial abstractions. */}
                <g stroke="var(--border)" strokeWidth="1">
                  <path d="M28 54H436M28 346H436" />
                  <path d="M52 28V372M412 28V372" />
                  <path
                    d="M232 20V380"
                    strokeDasharray="4 8"
                  />
                  <circle cx="232" cy="202" r="137" />
                  <path d="M28 194V210M20 202H36M428 202H444M436 194V210" />
                  <path d="M44 54H60M44 346H60M404 54H420M404 346H420" />
                </g>

                {index === 0 ? (
                  <>
                    {/* Return trajectory surrounding the integrated vehicle. */}
                    <path
                      d="M295 77C364 111 383 186 348 257C336 281 319 299 295 313"
                      stroke="var(--accent)"
                      strokeWidth="2"
                      strokeDasharray="6 7"
                    />
                    <path
                      d="M297 298L293 315L310 312"
                      stroke="var(--accent)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <path
                      d="M232 45C215 65 200 91 196 123V285L176 325H288L268 285V123C264 91 249 65 232 45Z"
                      fill="var(--surface)"
                      stroke="var(--ink)"
                      strokeWidth="2.5"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M232 45C249 65 264 91 268 123H196C200 91 215 65 232 45Z"
                      fill="var(--accent)"
                    />
                    <path
                      d="M196 123H268M196 157H268M196 268H268M196 285H268"
                      stroke="var(--ink)"
                      strokeWidth="2"
                    />
                    <path
                      d="M232 136V257"
                      stroke="var(--border)"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M196 255L164 310V325H196M268 255L300 310V325H268"
                      fill="var(--surface)"
                      stroke="var(--ink)"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M208 325L203 343H224L220 325M244 325L240 343H261L256 325"
                      fill="var(--ink)"
                    />
                    <path
                      d="M210 178H220M210 188H220M210 198H220"
                      stroke="var(--border)"
                      strokeWidth="2"
                    />
                    <circle
                      cx="232"
                      cy="285"
                      r="5"
                      fill="var(--accent)"
                    />
                  </>
                ) : (
                  <>
                    {/* Separated upper form and returning lower form. */}
                    <path
                      d="M292 178C353 195 365 248 335 290C325 305 312 316 296 324"
                      stroke="var(--accent)"
                      strokeWidth="2"
                      strokeDasharray="6 7"
                    />
                    <path
                      d="M298 309L294 326L311 322"
                      stroke="var(--accent)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <path
                      d="M232 43C211 61 190 87 186 112V143H278V112C274 87 253 61 232 43Z"
                      fill="var(--surface)"
                      stroke="var(--ink)"
                      strokeWidth="2.5"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M232 43C214 59 198 77 191 96H273C266 77 250 59 232 43Z"
                      fill="var(--accent)"
                    />
                    <path
                      d="M186 112H278"
                      stroke="var(--ink)"
                      strokeWidth="2"
                    />
                    <path
                      d="M186 155H278"
                      stroke="var(--accent)"
                      strokeWidth="1.5"
                      strokeDasharray="4 5"
                    />
                    <path
                      d="M193 168H271L280 287L294 325H170L184 287L193 168Z"
                      fill="var(--surface)"
                      stroke="var(--ink)"
                      strokeWidth="2.5"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M193 168H271V181H193Z"
                      fill="var(--accent)"
                    />
                    <path
                      d="M188 245H276M184 287H280M232 193V275"
                      stroke="var(--border)"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M185 272L158 325M279 272L306 325"
                      stroke="var(--ink)"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <path
                      d="M150 325H166M298 325H314"
                      stroke="var(--ink)"
                      strokeWidth="2"
                    />
                    <path
                      d="M205 325L200 343H222L218 325M246 325L242 343H264L259 325"
                      fill="var(--ink)"
                    />
                    <circle
                      cx="232"
                      cy="287"
                      r="5"
                      fill="var(--accent)"
                    />
                  </>
                )}
              </svg>
            </div>

            <div className="mt-6 border-t border-[var(--border)] pt-5">
              <p className="m-0 font-[var(--font-body)] text-[26px] font-normal leading-[1.35] tracking-[-0.015em]">
                {card.body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
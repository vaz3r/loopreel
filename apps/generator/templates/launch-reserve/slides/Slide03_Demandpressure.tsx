import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide03({ slide }: SlideComponentProps) {
  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <h1 className="max-w-[900px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.045em]">
        {slide.headline}
      </h1>

      <div className="mt-9 flex flex-col gap-5">
        <article className="grid h-[280px] grid-cols-[1.45fr_1fr] items-center gap-8 border border-[var(--border)] bg-[var(--surface)] px-8 py-6">
          <div>
            <h2 className="font-[var(--font-headline)] text-[36px] font-semibold leading-tight tracking-[-0.025em]">
              The forecast
            </h2>
            <p className="mt-5 max-w-[480px] font-[var(--font-body)] text-[28px] leading-snug">
              Up to{' '}
              <span className="font-semibold text-[var(--accent)]">249</span>{' '}
              medium-to-heavy-lift launches forecast through the early 2030s.
            </p>
          </div>

          <svg
            viewBox="0 0 320 224"
            className="h-[224px] w-full"
            fill="none"
            aria-hidden="true"
          >
            <g stroke="var(--border)" strokeWidth="1">
              <path d="M18 42H302M18 92H302M18 142H302M18 192H302" />
              <path d="M52 20V208M112 20V208M172 20V208M232 20V208M292 20V208" />
            </g>
            <path
              d="M22 192C98 190 171 140 266 36"
              stroke="var(--ink)"
              strokeWidth="2"
              strokeDasharray="5 7"
              opacity=".35"
            />
            <path
              d="M22 200C110 200 180 153 272 42"
              stroke="var(--accent)"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M247 48L273 40L270 67"
              stroke="var(--accent)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx="22"
              cy="200"
              r="6"
              fill="var(--surface)"
              stroke="var(--accent)"
              strokeWidth="3"
            />
            <g transform="translate(175 79) rotate(38)">
              <path
                d="M0-45C-10-34-13-18-13 9H13C13-18 10-34 0-45Z"
                fill="var(--surface)"
                stroke="var(--ink)"
                strokeWidth="2.5"
              />
              <path
                d="M-13-5L-24 12V24L-12 17M13-5L24 12V24L12 17"
                fill="var(--accent)"
                stroke="var(--accent)"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path d="M-9 15H9" stroke="var(--ink)" strokeWidth="3" />
              <path
                d="M-5 24L0 45L5 24"
                stroke="var(--accent)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="0" cy="-19" r="4" fill="var(--accent)" />
            </g>
          </svg>
        </article>

        <article className="grid h-[220px] grid-cols-[1.45fr_1fr] items-center gap-8 border-t border-[var(--border)] px-8 py-5">
          <div>
            <h2 className="font-[var(--font-headline)] text-[36px] font-semibold leading-tight tracking-[-0.025em]">
              The acceleration
            </h2>
            <p className="mt-4 max-w-[480px] font-[var(--font-body)] text-[28px] leading-snug">
              Requirements are more than double expectations from just two years
              ago.
            </p>
          </div>

          <svg
            viewBox="0 0 320 176"
            className="h-[176px] w-full"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M20 146H302M20 88H302M20 30H302"
              stroke="var(--border)"
              strokeWidth="1"
            />
            <path
              d="M24 145C116 145 186 130 290 99"
              stroke="var(--ink)"
              strokeWidth="3"
              strokeDasharray="6 7"
              opacity=".45"
            />
            <path
              d="M24 145C128 145 209 95 290 20"
              stroke="var(--accent)"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M268 23L291 19L286 42"
              stroke="var(--accent)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M252 66V106M246 66H258M246 106H258"
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <circle cx="24" cy="145" r="5" fill="var(--ink)" />
          </svg>
        </article>

        <article className="grid h-[220px] grid-cols-[1.45fr_1fr] items-center gap-8 border-y border-[var(--border)] px-8 py-5">
          <div>
            <h2 className="font-[var(--font-headline)] text-[36px] font-semibold leading-tight tracking-[-0.025em]">
              The longstanding policy
            </h2>
            <p className="mt-4 max-w-[480px] font-[var(--font-body)] text-[28px] leading-snug">
              Since the 1990s, Pentagon policy supports at least two US rocket
              programs.
            </p>
          </div>

          <svg
            viewBox="0 0 320 176"
            className="h-[176px] w-full"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M22 150H298M22 158H298"
              stroke="var(--border)"
              strokeWidth="1.5"
            />
            <path
              d="M94 12V166M226 12V166"
              stroke="var(--border)"
              strokeWidth="1"
              strokeDasharray="4 6"
            />
            <path
              d="M56 142V51H70V142M56 70H70M56 95H70M56 120H70"
              stroke="var(--border)"
              strokeWidth="2"
            />
            <path
              d="M264 142V51H250V142M250 70H264M250 95H264M250 120H264"
              stroke="var(--border)"
              strokeWidth="2"
            />

            <g stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round">
              <path
                d="M94 23C84 34 80 48 80 66V127H108V66C108 48 104 34 94 23Z"
                fill="var(--surface)"
              />
              <path
                d="M226 23C216 34 212 48 212 66V127H240V66C240 48 236 34 226 23Z"
                fill="var(--surface)"
              />
              <path d="M80 104L70 127V138L80 130M108 104L118 127V138L108 130" />
              <path d="M212 104L202 127V138L212 130M240 104L250 127V138L240 130" />
            </g>

            <path
              d="M80 67H108M212 67H240"
              stroke="var(--accent)"
              strokeWidth="7"
            />
            <path
              d="M87 133H101M219 133H233"
              stroke="var(--ink)"
              strokeWidth="3"
            />
            <path
              d="M70 146H118M202 146H250"
              stroke="var(--accent)"
              strokeWidth="5"
            />
            <path
              d="M128 88H192"
              stroke="var(--border)"
              strokeWidth="2"
              strokeDasharray="4 5"
            />
          </svg>
        </article>
      </div>
    </section>
  );
}
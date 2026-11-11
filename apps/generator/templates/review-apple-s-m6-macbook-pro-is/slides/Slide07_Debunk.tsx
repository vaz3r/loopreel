import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide07({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  return (
    <section
      id={slide.id}
      className="flex h-full min-h-0 w-full flex-col gap-9 text-[var(--ink)]"
    >
      <h1 className="max-w-[900px] font-[var(--font-headline)] text-[76px] font-bold leading-[0.98] tracking-[-0.055em]">
        New Silicon
        <br />
        Does Not Mean
        <br />
        <span className="text-[var(--accent)]">New Design</span>
      </h1>

      <div className="grid min-h-0 flex-1 grid-rows-[0.8fr_1.2fr] border-t border-[var(--border)]">
        <article className="grid min-h-0 grid-cols-[1fr_240px] items-center gap-8 border-b border-[var(--border)] py-7">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5 shrink-0 opacity-60"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="m5 5 14 14M19 5 5 19" />
              </svg>
              <p className="font-[var(--font-mono)] text-[16px] tracking-[0.18em] opacity-60">
                THE MYTH
              </p>
            </div>

            <h2 className="max-w-[620px] font-[var(--font-headline)] text-[43px] font-semibold leading-[1.06] tracking-[-0.035em]">
              <span className="decoration-[var(--accent)] decoration-[2px] line-through">
                $1,999
              </span>{' '}
              buys the newest flagship features
            </h2>

            <p className="mt-5 max-w-[600px] font-[var(--font-body)] text-[23px] leading-[1.4] opacity-65">
              Assuming the M6 name guarantees Apple's latest display and chassis
              technology.
            </p>
          </div>

          <svg
            aria-hidden="true"
            viewBox="0 0 240 240"
            className="h-auto w-full text-[var(--accent)]"
            fill="none"
          >
            <circle
              cx="120"
              cy="120"
              r="109"
              stroke="var(--border)"
              strokeDasharray="2 8"
            />
            <rect
              x="63"
              y="63"
              width="114"
              height="114"
              rx="7"
              fill="var(--surface)"
              stroke="currentColor"
              strokeWidth="2"
            />
            <rect
              x="82"
              y="82"
              width="76"
              height="76"
              rx="2"
              stroke="currentColor"
              strokeOpacity="0.45"
            />
            <path
              d="M82 63V43M101 63V43M120 63V43M139 63V43M158 63V43
                 M82 177V197M101 177V197M120 177V197M139 177V197M158 177V197
                 M63 82H43M63 101H43M63 120H43M63 139H43M63 158H43
                 M177 82H197M177 101H197M177 120H197M177 139H197M177 158H197"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M96 104H111V119H96ZM129 104H144V119H129ZM96 137H144"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="m32 208 176-176"
              stroke="var(--surface)"
              strokeWidth="13"
            />
            <path
              d="m32 208 176-176"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </article>

        <article className="relative grid min-h-0 grid-cols-[1fr_310px] items-center gap-7 overflow-hidden bg-[var(--surface)] px-8 py-8">
          <div className="absolute inset-y-0 left-0 w-[3px] bg-[var(--accent)]" />

          <div className="relative z-10">
            <p className="mb-5 font-[var(--font-mono)] text-[16px] tracking-[0.18em] text-[var(--accent)]">
              THE REALITY
            </p>

            <h2 className="font-[var(--font-headline)] font-semibold tracking-[-0.045em]">
              <span className="block text-[44px] leading-[1.05]">
                The design dates to
              </span>
              <span className="mt-1 block text-[112px] leading-none tracking-[-0.065em] text-[var(--accent)]">
                2021
              </span>
            </h2>

            <p className="mt-5 max-w-[510px] font-[var(--font-body)] text-[23px] leading-[1.4] opacity-85">
              No touchscreen, OLED panel, Dynamic Island, half-pound weight
              reduction, or glowing Apple logo.
            </p>
          </div>

          <svg
            aria-hidden="true"
            viewBox="0 0 310 350"
            className="h-auto w-full self-center"
            fill="none"
          >
            <path
              d="M20 38H290M20 312H290M39 20V330M271 20V330"
              stroke="var(--border)"
              strokeDasharray="3 7"
            />
            <circle
              cx="155"
              cy="169"
              r="119"
              stroke="var(--border)"
            />

            <path
              d="M58 88H252C257 88 261 92 261 97V232H49V97C49 92 53 88 58 88Z"
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeWidth="2"
            />
            <path
              d="M61 101H129V111H181V101H249V219H61V101Z"
              stroke="var(--border)"
              strokeWidth="2"
            />

            <path
              d="M49 232H261L291 261H19L49 232Z"
              stroke="var(--ink)"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M19 261H291L284 269H26L19 261Z"
              stroke="var(--ink)"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M126 244H184L191 253H119L126 244Z"
              stroke="var(--border)"
            />
            <path
              d="M69 238H241M79 243H105M205 243H231"
              stroke="var(--border)"
            />

            <rect
              x="137"
              y="148"
              width="36"
              height="36"
              rx="3"
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <path
              d="M146 148V140M155 148V140M164 148V140
                 M146 184V192M155 184V192M164 184V192
                 M137 157H129M137 166H129M137 175H129
                 M173 157H181M173 166H181M173 175H181"
              stroke="var(--accent)"
              strokeWidth="1.5"
            />
            <path
              d="M181 166H282V71"
              stroke="var(--accent)"
              strokeDasharray="4 5"
            />
            <circle cx="282" cy="66" r="4" fill="var(--accent)" />

            <path
              d="M49 291H261M49 285V297M261 285V297"
              stroke="var(--border)"
            />
            <path
              d="m54 288-5 3 5 3M256 288l5 3-5 3"
              stroke="var(--border)"
            />
          </svg>
        </article>
      </div>
    </section>
  );
}
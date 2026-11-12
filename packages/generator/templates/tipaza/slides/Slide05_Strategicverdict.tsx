import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide05({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const ancient = items[0];
  const modern = items[1];
  const telemetry = slide.telemetry ?? [];
  const ancientTelemetry = telemetry[0];
  const modernTelemetry = telemetry[1];

  const [ancientMetric, ...ancientUnitWords] = (
    ancientTelemetry?.badge ?? ''
  ).split(/\s+/);
  const ancientUnit = ancientUnitWords.join(' ');

  const [modernMetric, ...modernUnitWords] = (
    modernTelemetry?.badge ?? ''
  ).split(/\s+/);
  const modernUnit = modernUnitWords.join(' ');

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <p className="font-[var(--font-mono)] text-[20px] uppercase leading-[1.4] tracking-[0.16em] text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h1 className="mt-6 max-w-[920px] font-[var(--font-headline)] text-[60px] font-bold leading-[1.02] tracking-[-0.04em]">
          {slide.headline}
        </h1>

        <p className="mt-6 max-w-[880px] font-[var(--font-body)] text-[28px] leading-snug">
          {slide.subheadline}
        </p>
      </header>

      <div className="my-9 grid min-h-0 flex-1 grid-cols-2 gap-8">
        <article className="flex min-h-0 min-w-0 flex-col bg-[var(--surface)] px-8 py-9">
          <div className="shrink-0 border-b border-[var(--border)] pb-6">
            <svg
              viewBox="0 0 396 380"
              className="h-[380px] w-full text-[var(--ink)]"
              fill="none"
              aria-hidden="true"
              focusable="false"
            >
              <g
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.16"
              >
                <path d="M24 30H372M24 350H372" />
                <path d="M48 22V358M348 22V358" />
                <path d="M24 190H372" strokeDasharray="3 9" />
                <path d="M198 22V358" strokeDasharray="3 9" />
              </g>

              <g
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="square"
                strokeLinejoin="miter"
              >
                <path d="M114 49H282V65H114Z" />
                <path d="M125 65L143 88H253L271 65" />
                <path d="M143 88H253V104H143Z" />

                <path d="M153 105L154 151L176 159L192 149L210 161L242 148L243 105" />
                <path d="M159 175L176 181L193 172L211 186L239 174L237 230L219 242L202 233L181 246L158 235Z" />
                <path d="M160 258L180 269L199 255L220 267L235 256L233 308H163Z" />

                <path d="M149 309H247V323H149Z" />
                <path d="M134 323H262V337H134Z" />
                <path d="M116 337H280V350H116Z" />

                <g opacity="0.48" strokeWidth="1.5">
                  <path d="M172 107V149M190 107V140M208 107V151M226 107V145" />
                  <path d="M176 190V231M194 184V231M212 194V229M229 187V225" />
                  <path d="M180 279V306M198 267V306M216 278V306" />
                </g>

                <path d="M65 326L82 314L99 323L94 341H69Z" opacity="0.55" />
                <path d="M296 333L313 321L330 328L338 348H298Z" opacity="0.55" />
              </g>

              <g
                stroke="var(--accent)"
                strokeWidth="3"
                strokeLinecap="square"
              >
                <path d="M154 151L176 159L192 149" />
                <path d="M202 233L219 242L237 230" />
                <path d="M24 350H80" />
              </g>
            </svg>
          </div>

          <div className="mt-8">
            <h2 className="font-[var(--font-headline)] text-[36px] font-semibold leading-tight tracking-[-0.025em]">
              {ancient?.title || ancient?.label}
            </h2>
            <p className="mt-5 font-[var(--font-body)] text-[28px] leading-snug">
              {ancient?.body}
            </p>
          </div>

          <div className="mt-auto pt-10">
            <div className="border-t border-[var(--border)] pt-6">
              <p className="font-[var(--font-mono)] text-[48px] font-bold leading-none tracking-[-0.045em]">
                {ancientMetric}
              </p>
              {ancientUnit && (
                <p className="mt-3 font-[var(--font-body)] text-[24px] leading-snug">
                  {ancientUnit}
                </p>
              )}
              <p className="mt-5 font-[var(--font-mono)] text-[22px] leading-[1.4]">
                {ancientTelemetry?.label}
              </p>
            </div>
          </div>
        </article>

        <article className="flex min-h-0 min-w-0 flex-col border-y border-[var(--border)] px-8 py-9">
          <div className="shrink-0 border-b border-[var(--border)] pb-6">
            <svg
              viewBox="0 0 396 380"
              className="h-[380px] w-full text-[var(--ink)]"
              fill="none"
              aria-hidden="true"
              focusable="false"
            >
              <g stroke="currentColor" strokeWidth="1" opacity="0.16">
                <path d="M24 30H372M24 350H372" />
                <path d="M48 22V358M348 22V358" />
                <path d="M24 190H372" strokeDasharray="3 9" />
              </g>

              <circle
                cx="281"
                cy="100"
                r="30"
                stroke="currentColor"
                strokeWidth="1.5"
                opacity="0.35"
              />

              <path
                d="M24 246H57V209H102V224H124V185H166V202H186V160H219V180H245V220H264V198H310V231H339V246H372"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinejoin="miter"
              />

              <g stroke="currentColor" strokeWidth="1.5" opacity="0.6">
                <path d="M66 209V197H94V209" />
                <path d="M134 185V175H156V185" />
                <path d="M193 160V146H211V160" />
                <path d="M272 198V188H301V198" />
                <path d="M78 224V234M141 202V212M151 202V212" />
                <path d="M198 180V191M211 180V191M225 196V207" />
                <path d="M280 214V224M294 214V224M319 239V246" />
                <path d="M166 223V246M186 210V246M245 232V246" />
              </g>

              <path
                d="M24 257C80 247 114 260 162 253C209 246 230 258 273 252C315 246 340 251 372 247"
                stroke="var(--accent)"
                strokeWidth="3"
              />

              <g
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <path d="M32 282H144M169 282H221M246 282H362" opacity="0.45" />
                <path d="M59 303H107M130 303H277M300 303H341" opacity="0.32" />
                <path d="M26 325H179M205 325H266M292 325H370" opacity="0.22" />
              </g>

              <path
                d="M316 350H372"
                stroke="var(--accent)"
                strokeWidth="3"
              />
            </svg>
          </div>

          <div className="mt-8">
            <h2 className="font-[var(--font-headline)] text-[36px] font-semibold leading-tight tracking-[-0.025em]">
              {modern?.title || modern?.label}
            </h2>
            <p className="mt-5 font-[var(--font-body)] text-[28px] leading-snug">
              {modern?.body}
            </p>
          </div>

          <div className="mt-auto pt-10">
            <div className="border-t border-[var(--border)] pt-6">
              <p className="font-[var(--font-mono)] text-[48px] font-bold leading-none tracking-[-0.045em] text-[var(--accent)]">
                {modernMetric}
              </p>
              {modernUnit && (
                <p className="mt-3 font-[var(--font-body)] text-[24px] leading-snug">
                  {modernUnit}
                </p>
              )}
              <p className="mt-5 font-[var(--font-mono)] text-[22px] leading-[1.4]">
                {modernTelemetry?.label}
              </p>
            </div>
          </div>
        </article>
      </div>

      <div className="shrink-0 border-t-[3px] border-[var(--accent)] pt-7">
        <p className="max-w-[900px] font-[var(--font-headline)] text-[36px] font-semibold leading-[1.2] tracking-[-0.025em]">
          {slide.closingQuestion}
        </p>
      </div>
    </section>
  );
}
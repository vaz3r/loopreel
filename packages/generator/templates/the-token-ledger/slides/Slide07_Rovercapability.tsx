import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide07({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  const [coverage, scan, mast] = slide.items ?? [];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="flex shrink-0 flex-col gap-4">
        <p className="font-[var(--font-mono)] text-[22px] leading-tight tracking-[0.16em] text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h1 className="max-w-[860px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.03] tracking-[-0.045em]">
          {slide.headline}
        </h1>

        <p className="max-w-[900px] font-[var(--font-body)] text-[26px] leading-snug">
          {slide.subheadline}
        </p>
      </header>

      <div className="relative mt-5 h-[700px] w-full shrink-0">
        <svg
          viewBox="0 0 952 700"
          className="absolute inset-0 h-full w-full"
          fill="none"
          aria-hidden="true"
        >
          {/* Irregular enclosure: conceptual coverage, not a radius. */}
          <path
            d="M342 133
               C385 101 431 133 468 112
               C514 87 576 114 601 156
               C623 192 590 220 621 263
               C650 305 614 345 636 390
               C657 433 627 470 643 514
               C658 562 611 598 569 590
               C532 584 519 630 473 641
               C429 651 403 615 367 623
               C320 632 292 591 308 549
               C327 503 295 478 304 434
               C313 391 290 360 315 318
               C338 279 309 254 321 215
               C333 180 312 157 342 133Z"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeDasharray="1 11"
            strokeLinecap="round"
            opacity="0.38"
          />

          {/* Coverage callout. */}
          <path
            d="M252 266H289L332 307"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <circle cx="332" cy="307" r="5" fill="var(--accent)" />

          {/* Counter silhouette, deliberately without measurement cues. */}
          <path
            d="M565 382H641V395H565Z"
            fill="var(--surface)"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M576 395V531M631 395V531M576 458H631"
            stroke="var(--border)"
            strokeWidth="3"
          />
          <path
            d="M579 382V359H603V382M610 382V346H627V382"
            stroke="var(--border)"
            strokeWidth="2"
          />

          {/* Elevated sightline above the schematic counter. */}
          <path
            d="M505 248L634 319"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeDasharray="6 8"
            opacity="0.45"
          />

          {/* Mast annotation pointer. */}
          <path
            d="M650 275H583L518 248"
            stroke="var(--accent)"
            strokeWidth="2"
            opacity="0.8"
          />
          <circle cx="518" cy="248" r="5" fill="var(--accent)" />

          {/* Circular scan arrow, drawn in ground-plane perspective. */}
          <ellipse
            cx="470"
            cy="527"
            rx="144"
            ry="84"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M340 491
               C357 457 409 443 470 443
               C550 443 614 481 614 527
               C614 574 550 611 470 611
               C410 611 358 590 336 559"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M335 580L334 557L357 560"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Abstract rover undercarriage. */}
          <ellipse
            cx="473"
            cy="548"
            rx="96"
            ry="25"
            fill="var(--surface)"
          />
          <rect
            x="388"
            y="485"
            width="33"
            height="70"
            rx="15"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="2"
          />
          <rect
            x="522"
            y="485"
            width="33"
            height="70"
            rx="15"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="2"
          />
          <path
            d="M398 502V536M545 502V536"
            stroke="var(--border)"
            strokeWidth="3"
          />

          {/* Telescoping mast with exposed nested sections. */}
          <path
            d="M451 456V346H488V456"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="2.5"
          />
          <path
            d="M458 346V265H482V346"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="2.5"
          />
          <path
            d="M470 277V439"
            stroke="var(--accent)"
            strokeWidth="3"
            opacity="0.8"
          />
          <path
            d="M453 347H487M453 358H487"
            stroke="var(--accent)"
            strokeWidth="2"
          />

          {/* Unmeasured movement chevrons. */}
          <path
            d="M428 301L435 293L442 301M428 327L435 335L442 327"
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Camera head. */}
          <rect
            x="427"
            y="209"
            width="91"
            height="61"
            rx="18"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="2.5"
          />
          <circle
            cx="475"
            cy="239"
            r="19"
            stroke="var(--accent)"
            strokeWidth="3"
          />
          <circle
            cx="475"
            cy="239"
            r="10"
            stroke="var(--ink)"
            strokeWidth="2"
          />
          <circle cx="480" cy="234" r="3" fill="var(--accent)" />
          <path
            d="M438 231V247"
            stroke="var(--border)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Rover shell and radial cutaway detail. */}
          <path
            d="M404 467
               Q410 446 434 446H506
               Q529 446 536 467
               L542 509
               Q542 532 519 536H424
               Q400 533 400 511Z"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="2.5"
          />
          <path
            d="M403 479H537M470 479V534"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M470 510L506 482
               A45 45 0 0 1 518 530Z"
            fill="var(--accent)"
            fillOpacity="0.1"
            stroke="var(--accent)"
            strokeWidth="1.5"
          />
          <path
            d="M470 510L511 500M470 510L515 515"
            stroke="var(--accent)"
            strokeWidth="1.5"
            opacity="0.65"
          />
          <circle
            cx="470"
            cy="510"
            r="6"
            fill="var(--accent)"
          />
          <path
            d="M419 462H441"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Scan callout. */}
          <path
            d="M310 565H335"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <circle cx="335" cy="565" r="4" fill="var(--accent)" />
        </svg>

        <article className="absolute left-0 top-[42px] w-[310px]">
          <div className="mb-4 h-[3px] w-12 bg-[var(--accent)]" />
          <h2 className="font-[var(--font-headline)] text-[34px] font-semibold leading-[1.1] tracking-[-0.025em]">
            {coverage?.title}
          </h2>
          <p className="mt-3 font-[var(--font-body)] text-[26px] leading-snug">
            {coverage?.body}
          </p>
        </article>

        <article className="absolute right-0 top-[238px] w-[282px]">
          <div className="mb-4 h-[3px] w-12 bg-[var(--accent)]" />
          <h2 className="font-[var(--font-headline)] text-[34px] font-semibold leading-[1.1] tracking-[-0.025em]">
            {mast?.title}
          </h2>
          <p className="mt-3 font-[var(--font-body)] text-[26px] leading-snug">
            {mast?.body}
          </p>
        </article>

        <article className="absolute bottom-[35px] left-0 w-[310px]">
          <div className="mb-4 h-[3px] w-12 bg-[var(--accent)]" />
          <h2 className="font-[var(--font-headline)] text-[34px] font-semibold leading-[1.1] tracking-[-0.025em]">
            {scan?.title}
          </h2>
          <p className="mt-3 font-[var(--font-body)] text-[26px] leading-snug">
            {scan?.body}
          </p>
        </article>
      </div>
    </section>
  );
}
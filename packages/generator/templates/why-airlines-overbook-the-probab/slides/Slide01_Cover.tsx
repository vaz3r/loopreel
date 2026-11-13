import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

const BAR_WIDTHS = [
  2, 1, 4, 2, 5, 1, 3, 2, 1, 5, 3, 1, 4, 2, 3, 5, 1, 2,
  4, 1, 3, 2, 5, 2, 1, 4, 3, 1, 5, 2, 4, 1, 3, 2, 5, 1,
];

const BARCODE = BAR_WIDTHS.map((width, index) => ({
  width,
  x: BAR_WIDTHS.slice(0, index).reduce((sum, value) => sum + value + 2, 0),
}));

export default function Slide01({ slide }: SlideComponentProps) {
  const uid = React.useId().replace(/:/g, '');
  const leftStock = `${uid}-left-stock`;
  const rightStock = `${uid}-right-stock`;
  const leftBarcode = `${uid}-left-barcode`;
  const rightBarcode = `${uid}-right-barcode`;
  const artworkTitle = `${uid}-artwork-title`;
  const artworkDescription = `${uid}-artwork-description`;

  const headlineLines = (slide.headline ?? "").split(/ (?=Your Rights|Have Limits)/u);

  return (
    <section className="editorial-slide box-border py-[40px]">
      <header className="editorial-header flex h-[300px] shrink-0 flex-col justify-between">
        <div className="editorial-kicker">
          <span className="editorial-kicker-dot" />
          <span>{slide.kicker}</span>
        </div>

        <h1 className="editorial-headline">
          {headlineLines.map((line, index) => (
            <React.Fragment key={`${index}-${line}`}>
              {index > 0 && ' '}
              <span className="block">{line}</span>
            </React.Fragment>
          ))}
        </h1>

        {slide.subheadline && (
          <p className="editorial-subheadline max-w-[880px]">
            {slide.subheadline}
          </p>
        )}
      </header>

      <div className="editorial-visual-frame editorial-visual-monumental h-[560px] w-full shrink-0">
        <svg
          className="block h-full w-full"
          viewBox="0 0 952 650"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-labelledby={`${artworkTitle} ${artworkDescription}`}
        >
          <title id={artworkTitle}>
            Two boarding passes, one airplane seat
          </title>
          <desc id={artworkDescription}>
            Opposing fictional boarding passes both display seat 12A.
            Orange dotted trajectories converge on an empty seat cushion.
            A three-tier armrest plate displays $0, 200%, and 400%.
          </desc>

          <defs>
            <clipPath id={leftStock} clipPathUnits="userSpaceOnUse">
              <rect x="42" y="172" width="341" height="178" rx="2" />
            </clipPath>
            <clipPath id={rightStock} clipPathUnits="userSpaceOnUse">
              <rect x="627" y="100" width="279" height="178" rx="2" />
            </clipPath>
            <clipPath id={leftBarcode} clipPathUnits="userSpaceOnUse">
              <rect x="65" y="290" width="205" height="39" />
            </clipPath>
            <clipPath id={rightBarcode} clipPathUnits="userSpaceOnUse">
              <rect x="650" y="220" width="205" height="37" />
            </clipPath>
          </defs>

          {/* Specimen registration marks, not text placeholders. */}
          <g fill="none" stroke="var(--border)" strokeWidth="1">
            <path d="M310 72V48H334 M711 48H735V72" />
            <path d="M310 570V594H334 M711 594H735V570" />
            <path d="M490 30V46 M482 38H498" />
            <path d="M490 604V620 M482 612H498" />
            <path d="M286 325H306 M296 315V335" />
            <path d="M759 325H779 M769 315V335" />
            <ellipse cx="516" cy="580" rx="194" ry="24" />
            <path d="M358 580H674" strokeDasharray="3 9" />
          </g>

          {/* Seat pedestal and structural supports. */}
          <g stroke="var(--ink)" strokeLinejoin="round">
            <path
              d="M433 438L469 448L449 566L418 577Z"
              fill="var(--surface)"
              strokeWidth="2"
            />
            <path
              d="M573 428L600 416L625 558L597 572Z"
              fill="var(--surface)"
              strokeWidth="2"
            />
            <path
              d="M414 569L451 556L477 567L438 586L407 586Z"
              fill="var(--paper)"
              strokeWidth="2"
            />
            <path
              d="M592 563L626 551L655 565L623 589L590 589Z"
              fill="var(--paper)"
              strokeWidth="2"
            />
            <path
              d="M452 489L593 469L597 486L449 507Z"
              fill="var(--surface)"
              strokeWidth="1.5"
            />
          </g>

          {/* Monumental three-quarter backrest. */}
          <g stroke="var(--ink)" strokeLinejoin="round">
            <path
              d="M435 62L594 48Q630 48 641 78L674 301
                 Q681 334 651 351L544 390L411 326L390 107
                 Q387 77 435 62Z"
              fill="var(--surface)"
              strokeWidth="2.5"
            />
            <path
              d="M594 48Q630 48 641 78L674 301
                 Q681 334 651 351L623 355L603 95Z"
              fill="var(--paper)"
              strokeWidth="2"
            />
            <path
              d="M432 80L562 66Q587 64 594 92L621 292
                 Q626 317 603 327L462 358Q437 359 430 333
                 L407 117Q404 90 432 80Z"
              fill="var(--paper)"
              strokeWidth="1.5"
            />
            <path
              d="M437 91L553 78Q574 76 580 97L587 144
                 Q590 160 572 165L444 184Q426 186 423 167
                 L418 119Q415 98 437 91Z"
              fill="var(--surface)"
              strokeWidth="1.5"
            />
            <path
              d="M443 201Q507 180 591 181L608 291
                 Q611 306 595 311L467 339Q450 343 447 324Z"
              fill="var(--surface)"
              strokeWidth="1"
            />
            <path
              d="M456 211L470 320 M573 193L588 302"
              fill="none"
              stroke="var(--border)"
              strokeWidth="2"
            />
            <path
              d="M615 89L645 296Q649 319 632 329"
              fill="none"
              stroke="var(--border)"
              strokeWidth="2"
            />
          </g>

          {/* Far armrest and its upright. */}
          <g stroke="var(--ink)" strokeLinejoin="round">
            <path
              d="M350 312L371 305L393 413L373 422Z"
              fill="var(--paper)"
              strokeWidth="2"
            />
            <path
              d="M310 290L391 267L438 292L352 322L310 307Z"
              fill="var(--surface)"
              strokeWidth="2"
            />
            <path
              d="M310 290L352 305L438 277V292L352 322L310 307Z"
              fill="var(--paper)"
              strokeWidth="1.5"
            />
          </g>

          {/* One empty cushion, with a visible upholstered front edge. */}
          <g stroke="var(--ink)" strokeLinejoin="round">
            <path
              d="M405 340L565 309L687 373L526 452L359 399Z"
              fill="var(--surface)"
              strokeWidth="2.5"
            />
            <path
              d="M359 399L526 452L687 373L683 404L526 484
                 L361 430Z"
              fill="var(--paper)"
              strokeWidth="2"
            />
            <path
              d="M409 354L561 326L659 375L523 433L383 391Z"
              fill="var(--paper)"
              strokeWidth="1.5"
            />
            <path
              d="M383 391Q452 403 523 433L659 375"
              fill="none"
              stroke="var(--border)"
              strokeWidth="2"
            />
            <path
              d="M526 452V484 M375 418L510 461"
              fill="none"
              stroke="var(--border)"
              strokeWidth="1"
            />
          </g>

          {/* Near armrest projects toward the compensation teaser. */}
          <g stroke="var(--ink)" strokeLinejoin="round">
            <path
              d="M611 360L632 351L663 485L642 497Z"
              fill="var(--paper)"
              strokeWidth="2"
            />
            <path
              d="M592 320L632 306L752 413L752 440L710 462
                 L590 349Z"
              fill="var(--surface)"
              strokeWidth="2.5"
            />
            <path
              d="M592 320L710 433L752 413L632 306Z"
              fill="var(--paper)"
              strokeWidth="1.5"
            />
            <path
              d="M710 433V462 M607 324L714 425"
              fill="none"
              stroke="var(--border)"
              strokeWidth="1.5"
            />
            <path
              d="M631 389L735 425V553L631 517Z"
              fill="var(--paper)"
              strokeWidth="2"
            />
            <rect
              x="643"
              y="424"
              width="80"
              height="111"
              rx="2"
              fill="var(--surface)"
              stroke="var(--accent)"
              strokeWidth="1.5"
            />
            
          </g>

          <g
            fill="var(--ink)"
            textAnchor="middle"
            className="font-[family-name:var(--font-mono)] text-[28px] font-bold tabular-nums"
          >
            <text x="683" y="452">$0</text>
            <text x="683" y="489">200%</text>
            <text x="683" y="526" fill="var(--accent)">400%</text>
          </g>

          {/* Competing claims converge; neither path depicts boarding. */}
          <g
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <path
              d="M344 294C387 302 405 355 490 383"
              strokeDasharray="5 10"
            />
            <path
              d="M663 247C624 257 568 349 490 383"
              strokeDasharray="5 10"
            />
            <circle cx="490" cy="383" r="12" />
            <circle cx="490" cy="383" r="4" fill="var(--accent)" />
          </g>

          {/* Left pass. Rotation keeps every stock corner inside the inset. */}
          <g transform="rotate(-12 212.5 261)">
            <rect
              x="42"
              y="172"
              width="341"
              height="178"
              rx="2"
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeWidth="2"
            />
            <g clipPath={`url(#${leftStock})`}>
              <rect
                x="42"
                y="172"
                width="8"
                height="178"
                fill="var(--accent)"
              />
              <path
                d="M298 181V341"
                stroke="var(--border)"
                strokeWidth="1.5"
                strokeDasharray="4 5"
              />
              <circle
                cx="298"
                cy="172"
                r="9"
                fill="var(--paper)"
                stroke="var(--ink)"
              />
              <circle
                cx="298"
                cy="350"
                r="9"
                fill="var(--paper)"
                stroke="var(--ink)"
              />
              <g clipPath={`url(#${leftBarcode})`} fill="var(--ink)">
                {BARCODE.map((bar, index) => (
                  <rect
                    key={`left-${index}`}
                    x={65 + bar.x}
                    y="290"
                    width={bar.width}
                    height="39"
                  />
                ))}
              </g>
            </g>
            <text
              x="65"
              y="259"
              fill="var(--ink)"
              className="font-[family-name:var(--font-mono)] text-[64px] font-bold tabular-nums"
            >
              12A
            </text>
            <circle
              cx="339"
              cy="222"
              r="18"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <path
              d="M331 222H347 M339 214V230"
              stroke="var(--accent)"
              strokeWidth="2"
            />
          </g>

          {/* Right pass carries the same fictional seat assignment. */}
          <g transform="rotate(12 766.5 189)">
            <rect
              x="627"
              y="100"
              width="279"
              height="178"
              rx="2"
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeWidth="2"
            />
            <g clipPath={`url(#${rightStock})`}>
              <rect
                x="898"
                y="100"
                width="8"
                height="178"
                fill="var(--accent)"
              />
              <path
                d="M862 109V207"
                stroke="var(--border)"
                strokeWidth="1.5"
                strokeDasharray="4 5"
              />
              <circle
                cx="862"
                cy="100"
                r="9"
                fill="var(--paper)"
                stroke="var(--ink)"
              />
              <circle
                cx="862"
                cy="278"
                r="9"
                fill="var(--paper)"
                stroke="var(--ink)"
              />
              <g clipPath={`url(#${rightBarcode})`} fill="var(--ink)">
                {BARCODE.map((bar, index) => (
                  <rect
                    key={`right-${index}`}
                    x={650 + bar.x}
                    y="220"
                    width={bar.width}
                    height="37"
                  />
                ))}
              </g>
            </g>
            <text
              x="650"
              y="187"
              fill="var(--ink)"
              className="font-[family-name:var(--font-mono)] text-[64px] font-bold tabular-nums"
            >
              12A
            </text>
          </g>
        </svg>
      </div>

      <div className="flex h-[56px] shrink-0 flex-col justify-between">
        <p className="editorial-issue-badge">{slide.issueBadge}</p>
        {slide.footer && (
          <p className="editorial-note text-[20px]">{slide.footer}</p>
        )}
      </div>
    </section>
  );
}
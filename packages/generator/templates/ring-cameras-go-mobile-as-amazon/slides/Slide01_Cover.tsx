import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide01({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const titleId = React.useId();
  const diagramId = React.useId();

  void slide;
  void brand;
  void totalSlides;

  return (
    <section
      aria-labelledby={titleId}
      className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]"
      style={
        {
          '--paper': '#0D0E12',
          '--ink': '#F1F3F9',
          '--accent': '#FF4D00',
          '--surface': '#161820',
          '--border': '#F1F3F925',
          backgroundColor: 'var(--paper)',
        } as React.CSSProperties
      }
    >
      <div className="flex items-center gap-4">
        <span
          aria-hidden="true"
          className="h-3 w-3 shrink-0 bg-[var(--accent)]"
        />
        <p className="font-[var(--font-mono)] text-[20px] leading-[28px] tracking-[0.12em]">
          CUSTOM BRAND / MOBILE SECURITY
        </p>
      </div>

      <h1
        id={titleId}
        className="mt-8 max-w-[900px] font-[var(--font-headline)] text-[68px] font-bold leading-[1.04] tracking-[-0.045em]"
      >
        Ring Cameras
        <br />
        Leave Their Mounts
      </h1>

      <p className="mt-7 max-w-[790px] font-[var(--font-body)] text-[28px] leading-[1.4]">
        Amazon pairs a flying indoor camera with a wheeled business patrol robot.
      </p>

      <div className="relative mt-10 h-[1000px] w-full shrink-0">
        <svg
          role="img"
          aria-labelledby={diagramId}
          viewBox="0 0 952 1000"
          className="absolute inset-0 h-full w-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id={diagramId}>
            Conceptual drone and wheeled robot glyphs connected to a common
            origin by diverging orange trajectories.
          </title>

          {/* Sparse plotting field, not a containing card. */}
          <g stroke="var(--border)" strokeWidth="1">
            <path d="M0 1H952" />
            <path d="M0 999H952" />
            <path d="M58 450H894" strokeDasharray="3 13" />
            <path d="M58 740H894" strokeDasharray="3 13" />
            <path d="M220 80V920" strokeDasharray="3 13" />
            <path d="M740 80V920" strokeDasharray="3 13" />
          </g>

          <g stroke="var(--border)" strokeWidth="2">
            <path d="M38 40H62M50 28V52" />
            <path d="M890 40H914M902 28V52" />
            <path d="M38 960H62M50 948V972" />
            <path d="M890 960H914M902 948V972" />
          </g>

          {/* Shared origin with architectural mounting traces. */}
          <g stroke="var(--border)" strokeWidth="2">
            <circle cx="220" cy="740" r="76" />
            <circle cx="220" cy="740" r="110" strokeDasharray="4 12" />
            <path d="M95 654V826M78 665L95 648M78 697L95 680M78 729L95 712M78 761L95 744M78 793L95 776M78 825L95 808" />
            <path d="M95 740H177" />
          </g>

          {/* A single origin splits into upward and horizontal movement. */}
          <g
            stroke="var(--accent)"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              d="M220 740V542C220 426 286 423 286 314"
              strokeWidth="7"
            />
            <path d="M220 740H601" strokeWidth="7" />

            <path d="M274 339L286 314L298 339" strokeWidth="5" />
            <path d="M576 728L601 740L576 752" strokeWidth="5" />

            <path
              d="M191 612V542C191 421 257 411 257 348"
              strokeWidth="2"
              opacity="0.3"
            />
            <path d="M327 768H538" strokeWidth="2" opacity="0.3" />
          </g>

          <circle
            cx="220"
            cy="740"
            r="31"
            fill="var(--paper)"
            stroke="var(--accent)"
            strokeWidth="3"
          />
          <circle cx="220" cy="740" r="10" fill="var(--accent)" />

          {/* Abstract flying camera: suspended lens and rotor geometry. */}
          <g transform="translate(286 226)">
            <ellipse
              cy="70"
              rx="123"
              ry="21"
              stroke="var(--border)"
              strokeDasharray="5 10"
            />

            <g stroke="var(--ink)" strokeWidth="4" strokeLinejoin="round">
              <path d="M-40 -12L-95 -42M40 -12L95 -42" />
              <path d="M-40 12L-95 34M40 12L95 34" />

              <ellipse
                cx="-96"
                cy="-43"
                rx="56"
                ry="18"
                fill="var(--surface)"
              />
              <ellipse
                cx="96"
                cy="-43"
                rx="56"
                ry="18"
                fill="var(--surface)"
              />
              <ellipse
                cx="-96"
                cy="35"
                rx="56"
                ry="18"
                fill="var(--surface)"
              />
              <ellipse
                cx="96"
                cy="35"
                rx="56"
                ry="18"
                fill="var(--surface)"
              />

              <path
                d="M-45 -22L0 -38L45 -22V20L0 43L-45 20Z"
                fill="var(--surface)"
              />
              <path d="M-45 -22L0 0L45 -22M0 0V43" />
            </g>

            <path
              d="M-23 43V61Q0 79 23 61V43"
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeWidth="3"
            />
            <circle
              cx="0"
              cy="57"
              r="8"
              stroke="var(--accent)"
              strokeWidth="4"
            />

            <g stroke="var(--accent)" strokeWidth="3">
              <path d="M-122 -43H-70M70 -43H122" />
              <path d="M-122 35H-70M70 35H122" />
            </g>
          </g>

          {/* Drone endpoint leader. */}
          <path
            d="M451 186H481L502 165H526"
            stroke="var(--ink)"
            strokeWidth="2"
          />
          <circle cx="451" cy="186" r="4" fill="var(--accent)" />

          {/* Abstract patrol robot: upright sensor and wheeled chassis. */}
          <g transform="translate(740 650)">
            <ellipse
              cy="116"
              rx="122"
              ry="19"
              fill="var(--surface)"
              stroke="var(--border)"
              strokeWidth="2"
            />

            <g
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeWidth="4"
              strokeLinejoin="round"
            >
              <path d="M-11 -53V-114H11V-53" />
              <path d="M-47 -156H47V-115H-47Z" />
              <path d="M-69 -40L-43 -66H43L69 -40V61H-69Z" />
              <path d="M-89 44H89L105 69V100H-105V69Z" />

              <rect x="-110" y="60" width="32" height="53" rx="12" />
              <rect x="78" y="60" width="32" height="53" rx="12" />
            </g>

            <path
              d="M-36 -135H14"
              stroke="var(--accent)"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <circle cx="29" cy="-135" r="5" fill="var(--ink)" />

            <circle
              cy="-13"
              r="23"
              stroke="var(--ink)"
              strokeWidth="3"
            />
            <circle
              cy="-13"
              r="10"
              stroke="var(--accent)"
              strokeWidth="4"
            />
            <path d="M-39 29H39" stroke="var(--border)" strokeWidth="3" />
            <path d="M-54 80H54" stroke="var(--accent)" strokeWidth="4" />
          </g>

          {/* Robot endpoint leader. */}
          <path
            d="M740 786V808L716 832H690"
            stroke="var(--ink)"
            strokeWidth="2"
          />
          <circle cx="740" cy="786" r="4" fill="var(--accent)" />
        </svg>

        <div className="absolute left-[55.5%] top-[105px] w-[39%]">
          <h2 className="font-[var(--font-headline)] text-[36px] font-semibold leading-[1.1] tracking-[-0.025em]">
            Ring Drone Cam
          </h2>
          <p className="mt-4 max-w-[310px] font-[var(--font-body)] text-[26px] leading-snug">
            Flying indoor security camera.
          </p>
        </div>

        <div className="absolute left-[49%] top-[848px] w-[47%]">
          <h2 className="font-[var(--font-headline)] text-[36px] font-semibold leading-[1.1] tracking-[-0.025em]">
            Ring Rover Cam
          </h2>
          <p className="mt-4 font-[var(--font-body)] text-[26px] leading-snug">
            Wheeled autonomous security robot designed for business.
          </p>
        </div>
      </div>
    </section>
  );
}
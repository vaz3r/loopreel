import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

function EmphasizedCopy({ text }: { text?: string }) {
  return (
    <>
      {(text ?? '').split(/(\*\*.*?\*\*)/g).map((part, index) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={index}>{part.slice(2, -2)}</strong>
        ) : (
          <React.Fragment key={index}>{part}</React.Fragment>
        ),
      )}
    </>
  );
}

export default function Slide02({ slide }: SlideComponentProps) {
  const items = slide.items ?? [];
  const item0 = items[0];
  const item1 = items[1];
  const artworkId = React.useId();

  return (
    <section className="editorial-slide">
      <header className="editorial-header">
        <div className="editorial-kicker">
          <span className="editorial-kicker-dot" />
          <span>{slide.kicker}</span>
        </div>

        <h1 className="editorial-headline">{slide.headline}</h1>

        {slide.subheadline && (
          <p className="editorial-subheadline">{slide.subheadline}</p>
        )}
      </header>

      <div className="editorial-visual-frame editorial-visual-compact">
        <svg
          viewBox="0 0 952 420"
          role="img"
          aria-labelledby={`${artworkId}-title ${artworkId}-description`}
          className="block h-full w-full"
          fill="none"
        >
          <title id={`${artworkId}-title`}>
            A closed boarding gate and a volunteer negotiation channel
          </title>
          <desc id={`${artworkId}-description`}>
            Overlapping boarding passes enter a scanner. An orange return
            channel connects to an offer voucher before a closed mechanical
            gate. Beyond the gate is an aircraft seat. Branch 01 identifies
            volunteer negotiation; branch 02 identifies the replacement-travel
            checklist. Orange indicates negotiation, not automatic payment.
          </desc>

          {/* One continuous counter, conveyor, and boarding-lane assembly. */}
          <g stroke="var(--border)" strokeWidth="2">
            <path d="M36 270H326L347 250H668L710 270H918" />
            <path d="M36 288H334L355 268H660L702 288H918" />
            <path d="M48 288V350H914V288" />
            <path d="M68 350V366H146V350" />
            <path d="M824 350V366H900V350" />
            <path d="M48 322H332" />
            <path d="M414 322H670" />
            <path d="M710 322H914" />

            {/* Conveyor rollers: physical hardware, not text stand-ins. */}
            {Array.from({ length: 13 }, (_, index) => (
              <circle
                key={`roller-${index}`}
                cx={62 + index * 20}
                cy="279"
                r="4"
              />
            ))}
          </g>

          {/* Overlapping boarding passes feeding directly into the scanner. */}
          <g stroke="var(--ink)" strokeWidth="2">
            <g transform="rotate(-11 168 190)">
              <path
                d="M52 137H260V167A10 10 0 0 0 260 187V237H52V187A10 10 0 0 0 52 167Z"
                fill="var(--paper)"
              />
              <path
                d="M207 138V236"
                stroke="var(--border)"
                strokeDasharray="4 7"
              />
              <circle cx="79" cy="160" r="5" />
              <path d="M76 208H174M162 198L174 208L162 218" />
            </g>

            <path
              d="M94 150H310V182A10 10 0 0 0 310 202V250H94V202A10 10 0 0 0 94 182Z"
              fill="var(--surface)"
            />
            <path
              d="M254 151V249"
              stroke="var(--border)"
              strokeDasharray="4 7"
            />
            <circle cx="118" cy="173" r="5" />
            <path d="M119 220H218M206 210L218 220L206 230" />
            <rect x="271" y="166" width="22" height="22" rx="2" />
            <path d="M277 177L282 182L289 172" />
          </g>

          {/* Scanner housing, throat, sensor, and mounting hardware. */}
          <g stroke="var(--ink)" strokeWidth="2">
            <path
              d="M329 159L342 147H396L409 159V256H329Z"
              fill="var(--surface)"
            />
            <rect
              x="339"
              y="176"
              width="60"
              height="57"
              rx="2"
              fill="var(--paper)"
            />
            <path d="M348 184V225M390 184V225" />
            <path d="M343 205H395" stroke="var(--accent)" strokeWidth="3" />
            <circle cx="365" cy="159" r="4" fill="var(--accent)" stroke="none" />
            <path d="M345 256V270M391 256V270" />
            <circle cx="337" cy="246" r="2" />
            <circle cx="401" cy="246" r="2" />
          </g>

          {/* Orange belongs exclusively to the volunteer negotiation loop. */}
          <g stroke="var(--accent)" strokeWidth="3">
            <path d="M365 176V107Q365 80 395 80H430" />
            <path d="M418 72L430 80L418 88" />
            <path d="M645 176H654Q668 176 668 194V220Q668 238 649 238H447Q424 238 424 216V205H409" />
            <path d="M419 197L409 205L419 213" />
          </g>

          {/* Perforated offer voucher anchored to the return channel. */}
          <g stroke="var(--accent)" strokeWidth="2">
            <path
              d="M442 60H633L645 72V116A10 10 0 0 0 645 136V193L633 205H442L430 193V136A10 10 0 0 0 430 116V72Z"
              fill="var(--surface)"
            />
            <path d="M589 61V204" strokeDasharray="4 7" />
            <circle cx="452" cy="82" r="5" />
            <circle cx="622" cy="82" r="5" />
            <path d="M477 159C477 140 491 126 510 126H552" />
            <path d="M540 116L552 126L540 136" />
            <path d="M552 159C552 178 538 190 519 190H477" />
            <path d="M489 180L477 190L489 200" />
            <circle cx="617" cy="169" r="12" />
            <path d="M612 169H622M617 164V174" />
          </g>

          {/* Branch 01 extends into a tall voucher specimen above its card. */}
          <g stroke="var(--accent)" strokeWidth="2">
            <path d="M514 238V264" />
            <circle cx="514" cy="238" r="5" fill="var(--paper)" />
            <path
              d="M493 264H535L545 274V305A8 8 0 0 0 545 321V379L535 389H493L483 379V321A8 8 0 0 0 483 305V274Z"
              fill="var(--surface)"
            />
            <path d="M484 355H544" strokeDasharray="4 6" />
            <circle cx="514" cy="282" r="5" />
            <path d="M514 389V408H276V418" />
          </g>

          {/* Continuous lane terminates at a physically closed gate. */}
          <g stroke="var(--ink)" strokeWidth="2">
            <path d="M409 250H676" />
            <path d="M438 258H466M478 258H506M518 258H546M558 258H586M598 258H626" />
            <rect
              x="680"
              y="151"
              width="20"
              height="192"
              rx="2"
              fill="var(--surface)"
            />
            <rect x="675" y="336" width="30" height="14" fill="var(--paper)" />
            <circle cx="690" cy="184" r="8" fill="var(--paper)" />
            <circle cx="690" cy="184" r="3" />
            <path
              d="M690 176H731V279H715V192H690Z"
              fill="var(--surface)"
            />
            <rect x="715" y="237" width="16" height="26" fill="var(--paper)" />
            <circle cx="723" cy="247" r="3" />
            <path d="M723 250V256" />
            <path d="M680 301H700M680 309H700" />
            <path
              d="M730 218A44 44 0 0 0 760 176"
              stroke="var(--border)"
              strokeDasharray="4 7"
            />
          </g>

          {/* Detailed aircraft seat integrated with the boarding platform. */}
          <g stroke="var(--ink)" strokeWidth="2">
            <path
              d="M792 104Q791 92 804 92H849Q861 92 862 106L875 237Q876 250 864 254H804Z"
              fill="var(--surface)"
            />
            <rect x="802" y="105" width="47" height="39" rx="2" />
            <path d="M810 154L818 225H859L850 154Z" />
            <path d="M821 166L827 214H848L843 166Z" stroke="var(--border)" />
            <path
              d="M762 243H863Q877 243 881 256L885 273H752V254Z"
              fill="var(--surface)"
            />
            <path d="M765 252H865M761 263H873" stroke="var(--border)" />
            <path d="M751 223H790V233H751Z" fill="var(--paper)" />
            <path d="M760 233V245M782 233V243" />
            <path d="M854 218H887V228H854Z" fill="var(--paper)" />
            <path d="M878 228V250" />
            <path d="M775 273L762 334H779L796 273" />
            <path d="M852 273L868 334H884L873 273" />
            <path d="M752 344H791M857 344H890" />
            <path d="M788 291H862" />
            <path d="M804 245L829 264L854 245" />
            <rect x="824" y="255" width="12" height="9" fill="var(--paper)" />
          </g>

          {/* Branch 02: attached luggage-tag specimen and card connector. */}
          <g stroke="var(--ink)" strokeWidth="2">
            <path d="M807 288C787 288 786 306 800 314" />
            <path
              d="M800 304L820 316V388H780V316Z"
              fill="var(--surface)"
            />
            <circle cx="800" cy="318" r="4" />
            <path d="M781 373H819" stroke="var(--border)" strokeDasharray="3 5" />
            <path d="M800 388V408H764V418" />
          </g>

          {/* Numerical specimen identifiers only; meanings are HTML below. */}
          <g
            fill="var(--accent)"
            stroke="none"
            fontFamily="var(--font-mono)"
            fontSize="28"
            fontWeight="600"
            textAnchor="middle"
          >
            <text x="514" y="337">01</text>
          </g>
          <g
            fill="var(--ink)"
            stroke="none"
            fontFamily="var(--font-mono)"
            fontSize="28"
            fontWeight="600"
            textAnchor="middle"
          >
            <text x="800" y="359">02</text>
          </g>

          {/* Registration marks establish the technical specimen field. */}
          <g stroke="var(--border)" strokeWidth="1">
            <path d="M20 36H40M30 26V46" />
            <path d="M912 36H932M922 26V46" />
            <path d="M20 394H40M30 384V404" />
            <path d="M912 394H932M922 384V404" />
          </g>
        </svg>
      </div>

      <div className="layout-grid-2 !grid-cols-[minmax(0,552fr)_minmax(0,376fr)] !gap-6">
        {/* Voucher specimen: larger, accented, and mechanically perforated. */}
        <article className="editorial-card relative flex min-w-0 flex-col gap-3 !rounded-none !border-[var(--accent)] !p-6 [clip-path:polygon(12px_0,calc(100%-12px)_0,100%_12px,100%_calc(100%-12px),calc(100%-12px)_100%,12px_100%,0_calc(100%-12px),0_12px)]">
          <div className="flex items-center gap-3 border-b border-dashed border-[var(--accent)] pb-3">
            <span className="editorial-metric-badge">01</span>
            <span className="editorial-kicker text-[var(--accent)]">
              Volunteer negotiation
            </span>
          </div>

          <h2 className="editorial-card-title">{item0?.title}</h2>

          <p className="editorial-card-body">
            <EmphasizedCopy text={item0?.body} />
          </p>
        </article>

        {/* Baggage-tag specimen: clipped shoulders and a punched attachment. */}
        <article className="editorial-card relative flex min-w-0 flex-col gap-3 !rounded-none !p-6 [clip-path:polygon(20px_0,calc(100%-20px)_0,100%_20px,100%_100%,0_100%,0_20px)]">
          <div className="flex items-center gap-3 border-b border-dashed border-[var(--border)] pb-3">
            <span className="editorial-metric-badge">02</span>
            <span className="editorial-kicker">Replacement travel</span>
            <span
              aria-hidden="true"
              className="ml-auto h-3 w-3 shrink-0 rounded-full border border-[var(--border)] bg-[var(--paper)]"
            />
          </div>

          <h2 className="editorial-card-title">{item1?.title}</h2>

          <p className="editorial-card-body">
            <EmphasizedCopy text={item1?.body} />
          </p>
        </article>
      </div>

      {slide.footer && (
        <p className="editorial-note !text-[20px]">{slide.footer}</p>
      )}
    </section>
  );
}
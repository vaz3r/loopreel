import React from 'react';
import type { LayoutProps } from '../shared/types.js';
import styles from './frame.module.css';

/* ==========================================================================
   Hand-Drawn Vector Primitives (Inline SVGs)
   ========================================================================== */

export function Squiggle({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 22"
      preserveAspectRatio="none"
      className={className}
      style={{ display: 'block', width: 220, height: 20, margin: '28px 0', overflow: 'visible' }}
      aria-hidden="true"
    >
      <path
        d="M2 12 C 22 2, 38 2, 58 11 S 98 21, 118 11 S 158 1, 178 11 S 218 21, 238 9"
        fill="none"
        stroke="var(--accent-color, #B8432A)"
        strokeWidth="3.2"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function CircNumber({ n }: { n: string | number }) {
  return (
    <div
      style={{
        position: 'relative',
        width: 48,
        height: 48,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-hand, Caveat, cursive)',
        fontWeight: 700,
        fontSize: 30,
        color: 'var(--accent-color, #B8432A)',
      }}
    >
      <svg viewBox="0 0 64 64" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }} aria-hidden="true">
        <path
          d="M34 5 C51 6 60 19 59 34 C58 50 45 60 30 59 C14 58 4 46 5 31 C6 16 17 7 38 8"
          fill="none"
          stroke="var(--accent-color, #B8432A)"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
      </svg>
      {n}
    </div>
  );
}

export function Arrow() {
  return (
    <svg viewBox="0 0 80 56" style={{ width: 70, height: 48, flexShrink: 0, overflow: 'visible' }} aria-hidden="true">
      <path d="M76 6 C 60 40, 30 52, 6 44" fill="none" stroke="var(--accent-color, #B8432A)" strokeWidth="3" strokeLinecap="round" />
      <path d="M18 34 L5 44 L20 51" fill="none" stroke="var(--accent-color, #B8432A)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function XMark() {
  return (
    <svg viewBox="0 0 64 64" style={{ width: 44, height: 44, overflow: 'visible' }} aria-hidden="true">
      <path d="M14 12 C 28 28, 38 38, 52 54 M52 10 C 38 26, 26 40, 12 54" fill="none" stroke="var(--accent-color, #B8432A)" strokeWidth="4.5" strokeLinecap="round" />
    </svg>
  );
}

export function Box({ state = 'open' }: { state?: 'done' | 'open' | 'flag' }) {
  return (
    <svg viewBox="0 0 50 50" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }} aria-hidden="true">
      <path
        d="M5 6 C 18 4, 32 5, 45 5 C 46 18, 45 32, 46 45 C 32 46, 18 45, 4 46 C 5 32, 4 18, 5 6 Z"
        fill="none"
        stroke="var(--ink-color, #2B2219)"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      {state === 'done' && (
        <path d="M10 25 L21 37 L50 -2" fill="none" stroke="var(--accent-color, #B8432A)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      )}
      {state === 'flag' && (
        <path d="M25 11 V30 M25 38 V39" fill="none" stroke="var(--accent-color, #B8432A)" strokeWidth="4.5" strokeLinecap="round" />
      )}
    </svg>
  );
}

/* ==========================================================================
   Highlighter & Annotations Engine
   ========================================================================== */

export function renderMarkedText(text: string) {
  if (!text) return null;
  const parts = text.split(/(\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('*') && part.endsWith('*')) {
      const inner = part.slice(1, -1);
      return (
        <mark
          key={i}
          style={{
            color: 'inherit',
            background: 'linear-gradient(100deg, transparent 0.15em, var(--highlighter-color, rgba(236,182,62,0.55)) 0.3em, var(--highlighter-color, rgba(236,182,62,0.55)) calc(100% - 0.2em), transparent)',
            backgroundSize: '100% 0.44em',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '0 86%',
            padding: '0 0.08em',
            boxDecorationBreak: 'clone',
            WebkitBoxDecorationBreak: 'clone',
          }}
        >
          {inner}
        </mark>
      );
    }
    return part;
  });
}

function SlideWrapper({ slide, children }: { slide: any; children: React.ReactNode }) {
  const scribble = slide.scribble as string | undefined;
  const note = slide.note as string | undefined;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', position: 'relative' }}>
      {children}
      {scribble && (
        <div className={styles.scribble}>
          <Arrow />
          <span>{scribble}</span>
        </div>
      )}
      {note && (
        <p className={styles.note}>
          * {renderMarkedText(note)}
        </p>
      )}
    </div>
  );
}

/* ==========================================================================
   1. COVER SLIDE
   ========================================================================== */

export function Cover({ slide }: LayoutProps) {
  const s = slide as any;
  const meta: string[] = s.meta || (s.authorName ? [s.authorName, s.authorRole || 'Field Notes'] : []);

  return (
    <SlideWrapper slide={s}>
      {s.kicker && (
        <div
          style={{
            fontFamily: 'var(--font-mono, "DM Mono", monospace)',
            fontSize: 20,
            fontWeight: 500,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--accent-color, #B8432A)',
            marginBottom: 20,
          }}
        >
          {renderMarkedText(s.kicker)}
        </div>
      )}

      <h1
        style={{
          fontFamily: 'var(--font-headline, Fraunces, Georgia, serif)',
          fontSize: 84,
          fontWeight: 700,
          lineHeight: 1.02,
          letterSpacing: '-0.035em',
          margin: 0,
          color: 'var(--ink-color, #2B2219)',
        }}
      >
        {renderMarkedText(s.headline || s.title || '')}
      </h1>

      <Squiggle />

      {(s.subheadline || s.subtitle) && (
        <p
          style={{
            fontFamily: 'var(--font-body, Newsreader, Georgia, serif)',
            fontSize: 34,
            fontStyle: 'italic',
            lineHeight: 1.4,
            margin: 0,
            color: 'var(--muted-color, rgba(43, 34, 25, 0.68))',
          }}
        >
          {renderMarkedText(s.subheadline || s.subtitle || '')}
        </p>
      )}

      {meta.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 0,
            marginTop: 48,
            borderTop: '1.5px solid var(--border-color, rgba(43, 34, 25, 0.42))',
          }}
        >
          {meta.map((m, idx) => (
            <span
              key={idx}
              style={{
                padding: '18px 24px 0 0',
                marginRight: 24,
                borderRight: idx < meta.length - 1 ? '1.5px solid rgba(43, 34, 25, 0.15)' : 'none',
                fontFamily: 'var(--font-mono, "DM Mono", monospace)',
                fontSize: 18,
                fontWeight: 500,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--muted-color, rgba(43, 34, 25, 0.68))',
              }}
            >
              {m}
            </span>
          ))}
        </div>
      )}
    </SlideWrapper>
  );
}

/* ==========================================================================
   2. STATEMENT SLIDE
   ========================================================================== */

export function Statement({ slide }: LayoutProps) {
  const s = slide as any;

  return (
    <SlideWrapper slide={s}>
      <p
        style={{
          fontFamily: 'var(--font-headline, Fraunces, Georgia, serif)',
          fontSize: 66,
          fontWeight: 500,
          lineHeight: 1.15,
          letterSpacing: '-0.03em',
          margin: 0,
          color: 'var(--ink-color, #2B2219)',
        }}
      >
        {renderMarkedText(s.text || s.headline || '')}
      </p>
    </SlideWrapper>
  );
}

/* ==========================================================================
   3. LIST SLIDE
   ========================================================================== */

export function List({ slide }: LayoutProps) {
  const s = slide as any;
  const items = s.items || s.steps || [];

  return (
    <SlideWrapper slide={s}>
      {(s.title || s.headline) && (
        <div style={{ marginBottom: 28 }}>
          <h2
            style={{
              fontFamily: 'var(--font-headline, Fraunces, Georgia, serif)',
              fontSize: 54,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: '-0.025em',
              margin: 0,
              color: 'var(--ink-color, #2B2219)',
            }}
          >
            {renderMarkedText(s.title || s.headline)}
          </h2>
          <Squiggle />
        </div>
      )}

      <div>
        {items.slice(0, 5).map((it: any, idx: number) => (
          <div
            key={idx}
            style={{
              display: 'grid',
              gridTemplateColumns: '48px 1fr',
              gap: 24,
              padding: '22px 0',
              borderTop: '1.5px dashed var(--border-color, rgba(43, 34, 25, 0.42))',
              borderBottom: idx === items.length - 1 ? '1.5px dashed var(--border-color, rgba(43, 34, 25, 0.42))' : 'none',
            }}
          >
            <CircNumber n={it.num || idx + 1} />
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-headline, Fraunces, Georgia, serif)',
                  fontSize: 32,
                  fontWeight: 600,
                  lineHeight: 1.15,
                  letterSpacing: '-0.015em',
                  margin: 0,
                  color: 'var(--ink-color, #2B2219)',
                }}
              >
                {renderMarkedText(it.title || '')}
              </h3>
              {(it.desc || it.text) && (
                <p
                  style={{
                    fontFamily: 'var(--font-body, Newsreader, Georgia, serif)',
                    fontSize: 24,
                    lineHeight: 1.45,
                    margin: '8px 0 0 0',
                    color: 'var(--muted-color, rgba(43, 34, 25, 0.68))',
                  }}
                >
                  {renderMarkedText(it.desc || it.text || '')}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </SlideWrapper>
  );
}

/* ==========================================================================
   4. SPECIMEN SLIDE
   ========================================================================== */

export function Specimen({ slide }: LayoutProps) {
  const s = slide as any;
  const specimenNo = s.specimenNo ?? (typeof s.index === 'number' ? s.index + 1 : 1);

  return (
    <SlideWrapper slide={s}>
      <div className={styles.specimenCard}>
        <span
          className={styles.tape}
          style={{ top: -26, left: '50%', marginLeft: -125, transform: 'rotate(2deg)' }}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            paddingBottom: 16,
            borderBottom: '1.5px solid var(--border-color, rgba(43, 34, 25, 0.42))',
            fontFamily: 'var(--font-mono, "DM Mono", monospace)',
            fontSize: 18,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
          }}
        >
          <span style={{ color: 'var(--ink-color, #2B2219)' }}>Specimen no. {String(specimenNo).padStart(2, '0')}</span>
          <span style={{ color: 'var(--muted-color, rgba(43, 34, 25, 0.68))' }}>{s.pos || 'definition'}</span>
        </div>

        <div
          style={{
            fontFamily: 'var(--font-headline, Fraunces, Georgia, serif)',
            fontStyle: 'italic',
            fontWeight: 500,
            fontSize: 76,
            letterSpacing: '-0.03em',
            marginTop: 28,
            color: 'var(--ink-color, #2B2219)',
            lineHeight: 1,
          }}
        >
          {renderMarkedText(s.term || s.title || '')}
        </div>

        {s.pron && (
          <div
            style={{
              fontFamily: 'var(--font-mono, "DM Mono", monospace)',
              fontSize: 22,
              color: 'var(--muted-color, rgba(43, 34, 25, 0.68))',
              marginTop: 12,
            }}
          >
            {s.pron}
          </div>
        )}

        <p
          style={{
            fontFamily: 'var(--font-body, Newsreader, Georgia, serif)',
            fontSize: 32,
            lineHeight: 1.4,
            marginTop: 26,
            paddingTop: 26,
            borderTop: '1.5px dashed var(--border-color, rgba(43, 34, 25, 0.42))',
            color: 'var(--ink-color, #2B2219)',
          }}
        >
          {renderMarkedText(s.text || s.definition || '')}
        </p>

        {s.found && (
          <div style={{ display: 'flex', gap: 14, alignItems: 'baseline', marginTop: 28 }}>
            <span
              style={{
                fontFamily: 'var(--font-mono, "DM Mono", monospace)',
                fontSize: 18,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--muted-color, rgba(43, 34, 25, 0.68))',
              }}
            >
              Found in
            </span>
            <span
              style={{
                fontFamily: 'var(--font-hand, Caveat, cursive)',
                fontSize: 34,
                fontWeight: 700,
                color: 'var(--ink-color, #2B2219)',
              }}
            >
              {s.found}
            </span>
          </div>
        )}
      </div>
    </SlideWrapper>
  );
}

/* ==========================================================================
   5. MEASURE SLIDE
   ========================================================================== */

export function Measure({ slide }: LayoutProps) {
  const s = slide as any;

  return (
    <SlideWrapper slide={s}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 18 }}>
        <span
          style={{
            fontFamily: 'var(--font-headline, Fraunces, Georgia, serif)',
            fontWeight: 700,
            fontSize: 180,
            lineHeight: 0.85,
            letterSpacing: '-0.06em',
            color: 'var(--ink-color, #2B2219)',
          }}
        >
          {s.value}
        </span>
        {s.unit && (
          <span
            style={{
              fontFamily: 'var(--font-hand, Caveat, cursive)',
              fontWeight: 700,
              fontSize: 56,
              color: 'var(--accent-color, #B8432A)',
              paddingBottom: 14,
              transform: 'rotate(-4deg)',
              lineHeight: 1,
            }}
          >
            {s.unit}
          </span>
        )}
      </div>

      <div className={styles.ruler}>
        {s.label && <span className={styles.rulerLabel}>{s.label}</span>}
      </div>

      {s.title && (
        <h2
          style={{
            fontFamily: 'var(--font-headline, Fraunces, Georgia, serif)',
            fontSize: 48,
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: '-0.025em',
            margin: '20px 0 0 0',
            color: 'var(--ink-color, #2B2219)',
          }}
        >
          {renderMarkedText(s.title)}
        </h2>
      )}

      {s.text && (
        <p
          style={{
            fontFamily: 'var(--font-body, Newsreader, Georgia, serif)',
            fontSize: 26,
            lineHeight: 1.45,
            margin: '14px 0 0 0',
            color: 'var(--muted-color, rgba(43, 34, 25, 0.68))',
          }}
        >
          {renderMarkedText(s.text)}
        </p>
      )}
    </SlideWrapper>
  );
}

/* ==========================================================================
   6. TALLY SLIDE
   ========================================================================== */

export function Tally({ slide }: LayoutProps) {
  const s = slide as any;
  const items = s.items || s.stats || s.metrics || [];
  const isRows = items.length !== 4;

  return (
    <SlideWrapper slide={s}>
      {(s.title || s.headline) && (
        <div style={{ marginBottom: 28 }}>
          <h2
            style={{
              fontFamily: 'var(--font-headline, Fraunces, Georgia, serif)',
              fontSize: 54,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: '-0.025em',
              margin: 0,
              color: 'var(--ink-color, #2B2219)',
            }}
          >
            {renderMarkedText(s.title || s.headline)}
          </h2>
          <Squiggle />
        </div>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isRows ? '1fr' : '1fr 1fr',
          gap: isRows ? 24 : 28,
        }}
      >
        {items.slice(0, 4).map((it: any, idx: number) => (
          <div
            key={idx}
            style={{
              padding: 24,
              background: 'var(--surface-color, #F6F0E2)',
              border: '1.5px solid rgba(43, 34, 25, 0.18)',
              display: isRows ? 'grid' : 'block',
              gridTemplateColumns: isRows ? '240px 1fr' : undefined,
              alignItems: isRows ? 'center' : undefined,
              gap: isRows ? 24 : undefined,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span
                style={{
                  fontFamily: 'var(--font-headline, Fraunces, Georgia, serif)',
                  fontSize: isRows ? 72 : 64,
                  fontWeight: 700,
                  color: 'var(--ink-color, #2B2219)',
                  lineHeight: 0.95,
                  letterSpacing: '-0.05em',
                }}
              >
                {it.value}
              </span>
              {it.unit && (
                <span
                  style={{
                    fontFamily: 'var(--font-hand, Caveat, cursive)',
                    fontSize: 34,
                    fontWeight: 700,
                    color: 'var(--accent-color, #B8432A)',
                  }}
                >
                  {it.unit}
                </span>
              )}
            </div>

            {!isRows && <Squiggle />}

            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-headline, Fraunces, Georgia, serif)',
                  fontSize: 26,
                  fontWeight: 600,
                  lineHeight: 1.15,
                  margin: 0,
                  color: 'var(--ink-color, #2B2219)',
                }}
              >
                {renderMarkedText(it.label || '')}
              </h3>
              {(it.text || it.desc) && (
                <p
                  style={{
                    fontFamily: 'var(--font-body, Newsreader, Georgia, serif)',
                    fontSize: 20,
                    lineHeight: 1.4,
                    margin: '6px 0 0 0',
                    color: 'var(--muted-color, rgba(43, 34, 25, 0.68))',
                  }}
                >
                  {renderMarkedText(it.text || it.desc || '')}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </SlideWrapper>
  );
}

/* ==========================================================================
   7. ROUTE SLIDE
   ========================================================================== */

export function Route({ slide }: LayoutProps) {
  const s = slide as any;
  const items = s.items || s.steps || [];

  return (
    <SlideWrapper slide={s}>
      {(s.title || s.headline) && (
        <div style={{ marginBottom: 28 }}>
          <h2
            style={{
              fontFamily: 'var(--font-headline, Fraunces, Georgia, serif)',
              fontSize: 54,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: '-0.025em',
              margin: 0,
              color: 'var(--ink-color, #2B2219)',
            }}
          >
            {renderMarkedText(s.title || s.headline)}
          </h2>
          <Squiggle />
        </div>
      )}

      <div>
        {items.slice(0, 5).map((it: any, idx: number) => {
          const isEnd = idx === items.length - 1 && items.length > 1;
          return (
            <div
              key={idx}
              style={{
                position: 'relative',
                display: 'grid',
                gridTemplateColumns: '48px 1fr',
                gap: 24,
                paddingBottom: idx === items.length - 1 ? 0 : 36,
              }}
            >
              {idx < items.length - 1 && (
                <div
                  style={{
                    position: 'absolute',
                    left: 23,
                    top: 52,
                    bottom: 4,
                    borderLeft: '2.5px dotted var(--ink-color, #2B2219)',
                  }}
                />
              )}

              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  border: isEnd ? 'none' : '2px solid var(--ink-color, #2B2219)',
                  background: isEnd ? 'transparent' : 'var(--bg-color, #EEE5D0)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-headline, Fraunces, Georgia, serif)',
                  fontWeight: 600,
                  fontSize: 22,
                  zIndex: 2,
                }}
              >
                {isEnd ? <XMark /> : idx + 1}
              </div>

              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-headline, Fraunces, Georgia, serif)',
                    fontSize: 28,
                    fontWeight: 600,
                    lineHeight: 1.2,
                    margin: 0,
                    paddingTop: 6,
                    color: isEnd ? 'var(--accent-color, #B8432A)' : 'var(--ink-color, #2B2219)',
                  }}
                >
                  {renderMarkedText(it.title || '')}
                </h3>
                {(it.desc || it.text) && (
                  <p
                    style={{
                      fontFamily: 'var(--font-body, Newsreader, Georgia, serif)',
                      fontSize: 22,
                      lineHeight: 1.45,
                      margin: '6px 0 0 0',
                      color: 'var(--muted-color, rgba(43, 34, 25, 0.68))',
                    }}
                  >
                    {renderMarkedText(it.desc || it.text || '')}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </SlideWrapper>
  );
}

/* ==========================================================================
   8. LOG SLIDE
   ========================================================================== */

export function Log({ slide }: LayoutProps) {
  const s = slide as any;
  const items = s.items || [];
  const hasNow = items.some((x: any) => x.now);

  return (
    <SlideWrapper slide={s}>
      {(s.title || s.headline) && (
        <div style={{ marginBottom: 28 }}>
          <h2
            style={{
              fontFamily: 'var(--font-headline, Fraunces, Georgia, serif)',
              fontSize: 54,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: '-0.025em',
              margin: 0,
              color: 'var(--ink-color, #2B2219)',
            }}
          >
            {renderMarkedText(s.title || s.headline)}
          </h2>
          <Squiggle />
        </div>
      )}

      <div>
        {items.slice(0, 4).map((it: any, idx: number) => {
          const isNow = it.now || (!hasNow && idx === items.length - 1);
          return (
            <div
              key={idx}
              style={{
                display: 'grid',
                gridTemplateColumns: '140px 1fr',
                gap: 24,
                padding: '24px 0',
                borderTop: '1.5px solid var(--border-color, rgba(43, 34, 25, 0.42))',
                borderBottom: idx === items.length - 1 ? '1.5px solid var(--border-color, rgba(43, 34, 25, 0.42))' : 'none',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono, "DM Mono", monospace)',
                  fontSize: 24,
                  fontWeight: 500,
                  letterSpacing: '0.04em',
                  paddingTop: 4,
                  color: isNow ? 'var(--accent-color, #B8432A)' : 'var(--muted-color, rgba(43, 34, 25, 0.68))',
                }}
              >
                {it.time}
              </div>

              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-headline, Fraunces, Georgia, serif)',
                    fontSize: 28,
                    fontWeight: 600,
                    lineHeight: 1.2,
                    margin: 0,
                    color: 'var(--ink-color, #2B2219)',
                  }}
                >
                  {renderMarkedText(it.title || '')}
                  {isNow && (
                    <span
                      style={{
                        display: 'inline-block',
                        marginLeft: 14,
                        fontFamily: 'var(--font-hand, Caveat, cursive)',
                        fontWeight: 700,
                        fontSize: 30,
                        color: 'var(--accent-color, #B8432A)',
                        transform: 'rotate(-4deg)',
                      }}
                    >
                      ← here
                    </span>
                  )}
                </h3>
                {(it.desc || it.text) && (
                  <p
                    style={{
                      fontFamily: 'var(--font-body, Newsreader, Georgia, serif)',
                      fontSize: 22,
                      lineHeight: 1.45,
                      margin: '6px 0 0 0',
                      color: 'var(--muted-color, rgba(43, 34, 25, 0.68))',
                    }}
                  >
                    {renderMarkedText(it.desc || it.text || '')}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </SlideWrapper>
  );
}

/* ==========================================================================
   9. COMPARE SLIDE
   ========================================================================== */

export function Compare({ slide }: LayoutProps) {
  const s = slide as any;
  const left = s.left || { label: 'Before', items: [] };
  const right = s.right || { label: 'After', items: [] };

  return (
    <SlideWrapper slide={s}>
      {(s.title || s.headline) && (
        <div style={{ marginBottom: 28 }}>
          <h2
            style={{
              fontFamily: 'var(--font-headline, Fraunces, Georgia, serif)',
              fontSize: 54,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: '-0.025em',
              margin: 0,
              color: 'var(--ink-color, #2B2219)',
            }}
          >
            {renderMarkedText(s.title || s.headline)}
          </h2>
          <Squiggle />
        </div>
      )}

      <div className={styles.compareGrid}>
        <div>
          <div
            style={{
              fontFamily: 'var(--font-hand, Caveat, cursive)',
              fontWeight: 700,
              fontSize: 42,
              lineHeight: 1,
              color: 'var(--muted-color, rgba(43, 34, 25, 0.68))',
            }}
          >
            {left.label}
          </div>
          <ul className={styles.compareList}>
            {(left.items || []).slice(0, 5).map((x: string, idx: number) => (
              <li key={idx} className={`${styles.compareItem} ${styles.compareItemLeft}`}>
                {renderMarkedText(x)}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ width: 18, alignSelf: 'stretch' }}>
          <svg viewBox="0 0 18 600" preserveAspectRatio="none" style={{ width: '100%', height: '100%', overflow: 'visible' }} aria-hidden="true">
            <path
              d="M9 2 C 3 120, 15 240, 8 360 S 12 520, 9 598"
              fill="none"
              stroke="var(--border-color, rgba(43, 34, 25, 0.42))"
              strokeWidth="2"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        <div>
          <div
            style={{
              fontFamily: 'var(--font-hand, Caveat, cursive)',
              fontWeight: 700,
              fontSize: 42,
              lineHeight: 1,
              color: 'var(--accent-color, #B8432A)',
            }}
          >
            {right.label}
          </div>
          <ul className={styles.compareList}>
            {(right.items || []).slice(0, 5).map((x: string, idx: number) => (
              <li key={idx} className={`${styles.compareItem} ${styles.compareItemRight}`}>
                {renderMarkedText(x)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SlideWrapper>
  );
}

/* ==========================================================================
   10. TABLE SLIDE
   ========================================================================== */

export function Table({ slide }: LayoutProps) {
  const s = slide as any;
  const cols: string[] = s.columns || [];
  const rows: (string | number)[][] = s.rows || [];

  const isNumeric = (val: any) =>
    val != null && val !== '' && /\d/.test(String(val)) && /^[\s\d.,%×x+\-−–$€£:]+$/.test(String(val));

  const numCols = cols.map((_, c) => c > 0 && rows.length > 0 && rows.every((r) => r[c] === '' || r[c] == null || isNumeric(r[c])));

  return (
    <SlideWrapper slide={s}>
      {(s.title || s.headline) && (
        <div style={{ marginBottom: 28 }}>
          <h2
            style={{
              fontFamily: 'var(--font-headline, Fraunces, Georgia, serif)',
              fontSize: 54,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: '-0.025em',
              margin: 0,
              color: 'var(--ink-color, #2B2219)',
            }}
          >
            {renderMarkedText(s.title || s.headline)}
          </h2>
          <Squiggle />
        </div>
      )}

      <table className={styles.surveyTable}>
        <thead>
          <tr>
            {cols.map((col, c) => (
              <th key={c} className={numCols[c] ? styles.numeric : undefined}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.slice(0, 7).map((row, rIdx) => {
            const isTotalRow = Boolean(s.total) && rIdx === rows.length - 1;
            return (
              <tr key={rIdx} className={isTotalRow ? styles.totalRow : undefined}>
                {cols.map((_, cIdx) => (
                  <td key={cIdx} className={numCols[cIdx] ? styles.numeric : undefined}>
                    {renderMarkedText(String(row[cIdx] ?? ''))}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </SlideWrapper>
  );
}

/* ==========================================================================
   11. CHART SLIDE
   ========================================================================== */

export function Chart({ slide }: LayoutProps) {
  const s = slide as any;
  const data: Array<{ label: string; value: number }> = (s.data || []).map((d: any) => ({
    label: String(d.label || ''),
    value: Math.max(0, Number(d.value) || 0),
  }));

  const tgt = s.target && isFinite(Number(s.target.value)) ? Number(s.target.value) : null;
  const max = Math.max(...data.map((d) => d.value), tgt ?? 0, 1) * 1.08;
  const hi = Number.isInteger(s.highlight) ? s.highlight : data.reduce((m, d, i) => (d.value > data[m].value ? i : m), 0);

  const W = 834;
  const LW = 220;
  const rowH = 88;
  const top = tgt != null ? 54 : 10;
  const H = top + data.length * rowH + 10;
  const x = (v: number) => LW + (v / max) * (W - LW - 70);
  const u = s.unit || '';

  return (
    <SlideWrapper slide={s}>
      {(s.title || s.headline) && (
        <div style={{ marginBottom: 20 }}>
          <h2
            style={{
              fontFamily: 'var(--font-headline, Fraunces, Georgia, serif)',
              fontSize: 54,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: '-0.025em',
              margin: 0,
              color: 'var(--ink-color, #2B2219)',
            }}
          >
            {renderMarkedText(s.title || s.headline)}
          </h2>
          <Squiggle />
        </div>
      )}

      <svg viewBox={`0 0 ${W} ${H}`} style={{ display: 'block', width: '100%', height: 'auto', overflow: 'visible' }} role="img" aria-label="Bar chart">
        {data.map((d, i) => {
          const y = top + i * rowH;
          const on = i === hi;
          const bw = Math.max(x(d.value) - LW, 4);
          return (
            <g key={i}>
              <text x={0} y={y + 48} fontSize={28} fill="var(--ink-color, #2B2219)" fontFamily="var(--font-headline, Fraunces, Georgia, serif)" fontWeight={500}>
                {d.label}
              </text>
              <path
                d={`M${LW} ${y + 16} h${bw} l2 38 h${-bw - 2} z`}
                fill={on ? 'var(--accent-color, #B8432A)' : 'var(--highlighter-color, rgba(236,182,62,0.55))'}
                stroke={on ? 'var(--accent-color, #B8432A)' : 'var(--ink-color, #2B2219)'}
                strokeWidth={2}
                strokeLinejoin="round"
              />
              <text
                x={LW + bw + 16}
                y={y + 52}
                fontSize={38}
                fill={on ? 'var(--accent-color, #B8432A)' : 'var(--ink-color, #2B2219)'}
                fontFamily="var(--font-hand, Caveat, cursive)"
                fontWeight={700}
              >
                {+d.value.toFixed(1)}
                {u}
              </text>
              <line x1={0} y1={y + rowH - 6} x2={W} y2={y + rowH - 6} stroke="rgba(43, 34, 25, 0.15)" strokeWidth={1.5} strokeDasharray="6 6" />
            </g>
          );
        })}

        {tgt != null && (
          <g>
            <line x1={x(tgt)} y1={top - 6} x2={x(tgt)} y2={H - 10} stroke="var(--accent-color, #B8432A)" strokeWidth={2.5} strokeDasharray="3 9" strokeLinecap="round" />
            <text x={x(tgt)} y={top - 18} textAnchor="middle" fontSize={32} fill="var(--accent-color, #B8432A)" fontFamily="var(--font-hand, Caveat, cursive)" fontWeight={700}>
              {s.target?.label || 'Target'} · {tgt}
              {u}
            </text>
          </g>
        )}
      </svg>
    </SlideWrapper>
  );
}

/* ==========================================================================
   12. MAP SLIDE
   ========================================================================== */

export function MapSlide({ slide }: LayoutProps) {
  const s = slide as any;
  const pts: Array<{ name: string; note?: string }> = (s.points || []).slice(0, 6);
  const n = pts.length;

  const W = 834;
  const H = 400;
  const ys = [310, 130, 270, 80, 240, 60];
  const P = pts.map((_, i) => [50 + (W - 100) * (i / Math.max(n - 1, 1)), ys[i % ys.length]]);

  let d = n > 0 ? `M${P[0][0]} ${P[0][1]}` : '';
  for (let i = 1; i < n; i++) {
    const [x0, y0] = P[i - 1];
    const [x1, y1] = P[i];
    const mx = (x0 + x1) / 2;
    d += ` C${mx} ${y0}, ${mx} ${y1}, ${x1} ${y1}`;
  }

  const topoEllipses = [
    [250, 280, 220, 90, -8],
    [250, 280, 150, 58, -8],
    [250, 280, 80, 30, -8],
    [640, 150, 190, 75, 10],
    [640, 150, 110, 42, 10],
  ];

  return (
    <SlideWrapper slide={s}>
      {(s.title || s.headline) && (
        <div style={{ marginBottom: 16 }}>
          <h2
            style={{
              fontFamily: 'var(--font-headline, Fraunces, Georgia, serif)',
              fontSize: 54,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: '-0.025em',
              margin: 0,
              color: 'var(--ink-color, #2B2219)',
            }}
          >
            {renderMarkedText(s.title || s.headline)}
          </h2>
          <Squiggle />
        </div>
      )}

      <svg viewBox={`0 0 ${W} ${H + 10}`} style={{ display: 'block', width: '100%', height: 'auto', overflow: 'visible' }} role="img" aria-label="Journey map">
        {topoEllipses.map(([cx, cy, rx, ry, rot], j) => (
          <ellipse
            key={j}
            cx={cx}
            cy={cy}
            rx={rx}
            ry={ry}
            transform={`rotate(${rot} ${cx} ${cy})`}
            fill="none"
            stroke="rgba(43, 34, 25, 0.15)"
            strokeWidth={1.8}
          />
        ))}

        {n > 1 && <path d={d} fill="none" stroke="var(--ink-color, #2B2219)" strokeWidth={3} strokeDasharray="3 10" strokeLinecap="round" />}

        {P.map(([px, py], i) =>
          i === n - 1 ? (
            <g key={i} transform={`translate(${px - 22} ${py - 22}) scale(0.7)`}>
              <XMark />
            </g>
          ) : (
            <g key={i}>
              <circle cx={px} cy={py} r={20} fill="var(--bg-color, #EEE5D0)" stroke="var(--ink-color, #2B2219)" strokeWidth={2.4} />
              <text x={px} y={py + 9} textAnchor="middle" fontSize={26} fill="var(--ink-color, #2B2219)" fontFamily="var(--font-hand, Caveat, cursive)" fontWeight={700}>
                {i + 1}
              </text>
            </g>
          )
        )}

        {/* Compass Rose */}
        <g transform={`translate(${W - 34} ${H - 36})`}>
          <path d="M0 -26 L8 4 L0 -2 L-8 4 Z" fill="var(--ink-color, #2B2219)" />
          <path d="M0 26 L8 -4 L0 2 L-8 -4 Z" fill="none" stroke="var(--ink-color, #2B2219)" strokeWidth={1.5} />
          <text x={0} y={-32} textAnchor="middle" fontSize={18} fill="var(--ink-color, #2B2219)" fontFamily="var(--font-mono, 'DM Mono', monospace)">
            N
          </text>
        </g>

        {/* Scale indicator */}
        {s.scale && (
          <g transform={`translate(0 ${H - 6})`}>
            <path d="M0 0 h110 M0 -6 v12 M55 -4 v8 M110 -6 v12" stroke="var(--ink-color, #2B2219)" strokeWidth={2} />
            <text x={126} y={6} fontSize={16} letterSpacing={2} fill="var(--muted-color, rgba(43, 34, 25, 0.68))" fontFamily="var(--font-mono, 'DM Mono', monospace)">
              {String(s.scale).toUpperCase()}
            </text>
          </g>
        )}
      </svg>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px 32px', marginTop: 24 }}>
        {pts.map((p, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '42px 1fr', gap: 14, alignItems: 'start' }}>
            {i === n - 1 ? <XMark /> : <CircNumber n={i + 1} />}
            <div>
              <h3 style={{ fontFamily: 'var(--font-headline, Fraunces, Georgia, serif)', fontSize: 24, fontWeight: 600, margin: 0, color: 'var(--ink-color, #2B2219)' }}>
                {renderMarkedText(p.name)}
              </h3>
              {p.note && (
                <div style={{ fontFamily: 'var(--font-hand, Caveat, cursive)', fontSize: 26, color: 'var(--muted-color, rgba(43, 34, 25, 0.68))' }}>
                  {p.note}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </SlideWrapper>
  );
}

/* ==========================================================================
   13. QUOTE SLIDE
   ========================================================================== */

export function Quote({ slide }: LayoutProps) {
  const s = slide as any;

  return (
    <SlideWrapper slide={s}>
      <div
        style={{
          fontFamily: 'var(--font-headline, Fraunces, Georgia, serif)',
          fontSize: 160,
          fontWeight: 700,
          color: 'var(--accent-color, #B8432A)',
          lineHeight: 0.5,
          marginBottom: 16,
        }}
      >
        “
      </div>

      <blockquote
        style={{
          fontFamily: 'var(--font-headline, Fraunces, Georgia, serif)',
          fontSize: 48,
          fontWeight: 400,
          fontStyle: 'italic',
          lineHeight: 1.25,
          letterSpacing: '-0.02em',
          margin: 0,
          color: 'var(--ink-color, #2B2219)',
        }}
      >
        {renderMarkedText(s.quote || s.text || '')}
      </blockquote>

      {(s.author || s.by) && (
        <div style={{ marginTop: 44, display: 'flex', alignItems: 'baseline', gap: 18 }}>
          <span
            style={{
              fontFamily: 'var(--font-hand, Caveat, cursive)',
              fontSize: 46,
              fontWeight: 700,
              color: 'var(--ink-color, #2B2219)',
            }}
          >
            — {s.author || s.by}
          </span>
          {s.role && (
            <span
              style={{
                fontFamily: 'var(--font-mono, "DM Mono", monospace)',
                fontSize: 18,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--muted-color, rgba(43, 34, 25, 0.68))',
              }}
            >
              {s.role}
            </span>
          )}
        </div>
      )}
    </SlideWrapper>
  );
}

/* ==========================================================================
   14. ENTRY SLIDE (Journal Reflection with Drop Cap)
   ========================================================================== */

export function Entry({ slide }: LayoutProps) {
  const s = slide as any;

  return (
    <SlideWrapper slide={s}>
      <h2
        style={{
          fontFamily: 'var(--font-headline, Fraunces, Georgia, serif)',
          fontSize: 64,
          fontWeight: 700,
          lineHeight: 1.05,
          letterSpacing: '-0.03em',
          margin: 0,
          color: 'var(--ink-color, #2B2219)',
        }}
      >
        {renderMarkedText(s.title || s.headline || 'Reflection.')}
      </h2>

      {s.date && (
        <div
          style={{
            fontFamily: 'var(--font-hand, Caveat, cursive)',
            fontSize: 34,
            fontWeight: 600,
            color: 'var(--accent-color, #B8432A)',
            transform: 'rotate(-1.5deg)',
            display: 'inline-block',
            marginTop: 10,
          }}
        >
          {s.date}
        </div>
      )}

      <p
        className={styles.entryDropCap}
        style={{
          fontFamily: 'var(--font-body, Newsreader, Georgia, serif)',
          fontSize: 28,
          lineHeight: 1.6,
          marginTop: 28,
          color: 'var(--ink-color, #2B2219)',
          textAlign: 'justify',
        }}
      >
        {s.text}
      </p>
    </SlideWrapper>
  );
}

/* ==========================================================================
   15. QA SLIDE
   ========================================================================== */

export function Qa({ slide }: LayoutProps) {
  const s = slide as any;

  return (
    <SlideWrapper slide={s}>
      <div style={{ display: 'grid', gridTemplateColumns: '70px 1fr', gap: 20 }}>
        <div
          style={{
            fontFamily: 'var(--font-hand, Caveat, cursive)',
            fontSize: 76,
            fontWeight: 700,
            color: 'var(--accent-color, #B8432A)',
            lineHeight: 0.8,
          }}
        >
          Q.
        </div>
        <h2
          style={{
            fontFamily: 'var(--font-headline, Fraunces, Georgia, serif)',
            fontSize: 48,
            fontWeight: 600,
            lineHeight: 1.15,
            letterSpacing: '-0.025em',
            margin: 0,
            color: 'var(--ink-color, #2B2219)',
          }}
        >
          {renderMarkedText(s.question || s.title || '')}
        </h2>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '70px 1fr',
          gap: 20,
          marginTop: 40,
          paddingTop: 40,
          borderTop: '1.5px dashed var(--border-color, rgba(43, 34, 25, 0.42))',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-hand, Caveat, cursive)',
            fontSize: 76,
            fontWeight: 700,
            color: 'var(--accent-color, #B8432A)',
            lineHeight: 0.8,
          }}
        >
          A.
        </div>
        <div>
          <p
            style={{
              fontFamily: 'var(--font-body, Newsreader, Georgia, serif)',
              fontSize: 32,
              lineHeight: 1.45,
              margin: 0,
              color: 'var(--ink-color, #2B2219)',
            }}
          >
            {renderMarkedText(s.answer || s.text || '')}
          </p>
          {s.by && (
            <p
              style={{
                fontFamily: 'var(--font-hand, Caveat, cursive)',
                fontSize: 38,
                fontWeight: 700,
                color: 'var(--ink-color, #2B2219)',
                marginTop: 24,
              }}
            >
              — {s.by}
            </p>
          )}
        </div>
      </div>
    </SlideWrapper>
  );
}

/* ==========================================================================
   16. KIT SLIDE (Checklist)
   ========================================================================== */

export function Kit({ slide }: LayoutProps) {
  const s = slide as any;
  const items = s.items || [];

  return (
    <SlideWrapper slide={s}>
      {(s.title || s.headline) && (
        <div style={{ marginBottom: 28 }}>
          <h2
            style={{
              fontFamily: 'var(--font-headline, Fraunces, Georgia, serif)',
              fontSize: 54,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: '-0.025em',
              margin: 0,
              color: 'var(--ink-color, #2B2219)',
            }}
          >
            {renderMarkedText(s.title || s.headline)}
          </h2>
          <Squiggle />
        </div>
      )}

      <div>
        {items.slice(0, 6).map((it: any, idx: number) => {
          const st: 'done' | 'open' | 'flag' = ['done', 'flag', 'open'].includes(it.state) ? it.state : 'open';
          const isDone = st === 'done';
          const isFlag = st === 'flag';

          return (
            <div
              key={idx}
              style={{
                display: 'grid',
                gridTemplateColumns: '46px 1fr',
                gap: 22,
                alignItems: 'center',
                padding: '20px 0',
                borderTop: idx === 0 ? '1.5px dashed var(--border-color, rgba(43, 34, 25, 0.42))' : 'none',
                borderBottom: '1.5px dashed var(--border-color, rgba(43, 34, 25, 0.42))',
              }}
            >
              <div style={{ position: 'relative', width: 44, height: 44 }}>
                <Box state={st} />
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-body, Newsreader, Georgia, serif)',
                  fontSize: 28,
                  fontWeight: 500,
                  lineHeight: 1.3,
                  margin: 0,
                  color: isDone ? 'var(--muted-color, rgba(43, 34, 25, 0.68))' : 'var(--ink-color, #2B2219)',
                  textDecoration: isDone ? 'line-through' : 'none',
                  textDecorationColor: 'var(--border-color, rgba(43, 34, 25, 0.42))',
                  textDecorationThickness: 2,
                }}
              >
                {renderMarkedText(it.text || it.title || '')}
                {isFlag && (
                  <span
                    style={{
                      fontFamily: 'var(--font-hand, Caveat, cursive)',
                      fontSize: 30,
                      fontWeight: 700,
                      color: 'var(--accent-color, #B8432A)',
                      marginLeft: 10,
                    }}
                  >
                    — check
                  </span>
                )}
              </p>
            </div>
          );
        })}
      </div>
    </SlideWrapper>
  );
}

/* ==========================================================================
   17. CTA SLIDE
   ========================================================================== */

export function Cta({ slide }: LayoutProps) {
  const s = slide as any;
  const actionText = s.action || s.actionLabel || s.button || 'Save this entry';
  const signText = s.sign || s.author || 'see you in the field';
  const handleText = s.socialHandle || s.handle;

  return (
    <SlideWrapper slide={s}>
      <h1
        style={{
          fontFamily: 'var(--font-headline, Fraunces, Georgia, serif)',
          fontSize: 76,
          fontWeight: 700,
          lineHeight: 1.02,
          letterSpacing: '-0.035em',
          margin: 0,
          color: 'var(--ink-color, #2B2219)',
        }}
      >
        {renderMarkedText(s.headline || s.title || 'Close of Entry')}
      </h1>

      <Squiggle />

      {(s.subtext || s.text) && (
        <p
          style={{
            fontFamily: 'var(--font-body, Newsreader, Georgia, serif)',
            fontSize: 32,
            fontStyle: 'italic',
            lineHeight: 1.4,
            margin: '0 0 40px 0',
            color: 'var(--muted-color, rgba(43, 34, 25, 0.68))',
            maxWidth: 720,
          }}
        >
          {renderMarkedText(s.subtext || s.text || '')}
        </p>
      )}

      {/* Styled bookmark button */}
      <div>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 14,
            fontFamily: 'var(--font-mono, "DM Mono", monospace)',
            fontSize: 20,
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            padding: '20px 38px',
            borderRadius: 4,
            background: 'var(--ink-color, #2B2219)',
            color: 'var(--bg-color, #EEE5D0)',
            boxShadow: '0 8px 24px rgba(43, 34, 25, 0.25)',
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 22, height: 22 }}>
            <path d="M6 3h12v18l-6-5-6 5z" />
          </svg>
          {actionText}
        </div>
      </div>

      <div style={{ marginTop: 44, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <span
          style={{
            fontFamily: 'var(--font-hand, Caveat, cursive)',
            fontSize: 44,
            fontWeight: 700,
            color: 'var(--ink-color, #2B2219)',
            transform: 'rotate(-3deg)',
          }}
        >
          ~ {signText}
        </span>
        {handleText && (
          <span
            style={{
              fontFamily: 'var(--font-mono, "DM Mono", monospace)',
              fontSize: 18,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--muted-color, rgba(43, 34, 25, 0.68))',
              marginTop: 12,
              paddingTop: 10,
              borderTop: '1.5px solid var(--border-color, rgba(43, 34, 25, 0.42))',
            }}
          >
            {handleText}
          </span>
        )}
      </div>
    </SlideWrapper>
  );
}

// Graceful backward-compatible aliases
export const Sequence = List;
export const Telemetry = Tally;

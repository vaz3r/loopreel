import React from 'react';
import type { LayoutProps } from '../shared/types.js';

export function Squiggle() {
  return (
    <svg
      viewBox="0 0 240 22"
      preserveAspectRatio="none"
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
        width: 44,
        height: 44,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-hand, Caveat, cursive)',
        fontWeight: 700,
        fontSize: 26,
        color: 'var(--ink-color, #2B2219)',
        marginTop: 2,
      }}
    >
      <svg viewBox="0 0 64 64" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} aria-hidden="true">
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

function renderMarkedText(text: string) {
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

export function Cover({ slide }: LayoutProps) {
  const s = slide as any;
  const meta: string[] = s.meta || (s.authorName ? [s.authorName, s.authorRole || 'Field Notes'] : []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
      {s.kicker && (
        <div
          style={{
            fontFamily: 'var(--font-mono, "DM Mono", monospace)',
            fontSize: 20,
            fontWeight: 500,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--accent-color, #B8432A)',
            marginBottom: 24,
          }}
        >
          {renderMarkedText(s.kicker)}
        </div>
      )}

      <h1
        style={{
          fontFamily: 'var(--font-headline, Fraunces, Georgia, serif)',
          fontSize: 72,
          fontWeight: 700,
          lineHeight: 1.05,
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
            fontSize: 32,
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
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 44 }}>
          {meta.map((m, idx) => (
            <span
              key={idx}
              style={{
                fontFamily: 'var(--font-mono, "DM Mono", monospace)',
                fontSize: 16,
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                padding: '8px 16px',
                borderRadius: 999,
                background: 'var(--surface-color, #F6F0E2)',
                border: '1px solid var(--border-color, rgba(43, 34, 25, 0.42))',
                color: 'var(--ink-color, #2B2219)',
              }}
            >
              {m}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export function Sequence({ slide }: LayoutProps) {
  const s = slide as any;
  const items = s.items || s.steps || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
      <h2
        style={{
          fontFamily: 'var(--font-headline, Fraunces, Georgia, serif)',
          fontSize: 52,
          fontWeight: 700,
          lineHeight: 1.08,
          letterSpacing: '-0.025em',
          margin: 0,
          color: 'var(--ink-color, #2B2219)',
        }}
      >
        {renderMarkedText(s.headline || s.title || 'Observations')}
      </h2>

      <Squiggle />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {items.slice(0, 5).map((it: any, idx: number) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
            <CircNumber n={it.num || idx + 1} />
            <div style={{ flex: 1 }}>
              <h3
                style={{
                  fontFamily: 'var(--font-headline, Fraunces, Georgia, serif)',
                  fontSize: 28,
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
        ))}
      </div>
    </div>
  );
}

export function Telemetry({ slide }: LayoutProps) {
  const s = slide as any;
  const stats = s.stats || s.metrics || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
      <h2
        style={{
          fontFamily: 'var(--font-headline, Fraunces, Georgia, serif)',
          fontSize: 52,
          fontWeight: 700,
          lineHeight: 1.08,
          letterSpacing: '-0.025em',
          margin: 0,
          color: 'var(--ink-color, #2B2219)',
        }}
      >
        {renderMarkedText(s.headline || s.title || 'Tally & Metrics')}
      </h2>

      <Squiggle />

      <div style={{ display: 'grid', gridTemplateColumns: stats.length === 4 ? '1fr 1fr' : '1fr', gap: 28 }}>
        {stats.slice(0, 4).map((st: any, idx: number) => (
          <div
            key={idx}
            style={{
              padding: 24,
              background: 'var(--surface-color, #F6F0E2)',
              borderRadius: 8,
              border: '1px solid var(--border-color, rgba(43, 34, 25, 0.42))',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span
                style={{
                  fontFamily: 'var(--font-headline, Fraunces, Georgia, serif)',
                  fontSize: 56,
                  fontWeight: 700,
                  color: 'var(--accent-color, #B8432A)',
                  lineHeight: 1,
                }}
              >
                {st.value}
              </span>
              {st.unit && (
                <span
                  style={{
                    fontFamily: 'var(--font-mono, "DM Mono", monospace)',
                    fontSize: 22,
                    fontWeight: 500,
                    color: 'var(--muted-color, rgba(43, 34, 25, 0.68))',
                  }}
                >
                  {st.unit}
                </span>
              )}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-headline, Fraunces, Georgia, serif)',
                fontSize: 24,
                fontWeight: 600,
                marginTop: 10,
                color: 'var(--ink-color, #2B2219)',
              }}
            >
              {renderMarkedText(st.label || '')}
            </div>
            {(st.text || st.desc) && (
              <p
                style={{
                  fontFamily: 'var(--font-body, Newsreader, Georgia, serif)',
                  fontSize: 18,
                  lineHeight: 1.4,
                  margin: '6px 0 0 0',
                  color: 'var(--muted-color, rgba(43, 34, 25, 0.68))',
                }}
              >
                {renderMarkedText(st.text || st.desc || '')}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Quote({ slide }: LayoutProps) {
  const s = slide as any;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', position: 'relative' }}>
      <div
        style={{
          fontFamily: 'var(--font-headline, Fraunces, Georgia, serif)',
          fontSize: 104,
          fontWeight: 700,
          color: 'var(--accent-color, #B8432A)',
          lineHeight: 0.6,
          marginBottom: 16,
        }}
      >
        “
      </div>

      <blockquote
        style={{
          fontFamily: 'var(--font-headline, Fraunces, Georgia, serif)',
          fontSize: 42,
          fontWeight: 500,
          lineHeight: 1.25,
          letterSpacing: '-0.02em',
          margin: 0,
          color: 'var(--ink-color, #2B2219)',
        }}
      >
        {renderMarkedText(s.quote || s.text || '')}
      </blockquote>

      {(s.author || s.by) && (
        <div style={{ marginTop: 36, display: 'flex', alignItems: 'baseline', gap: 16 }}>
          <span
            style={{
              fontFamily: 'var(--font-hand, Caveat, cursive)',
              fontSize: 38,
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
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--muted-color, rgba(43, 34, 25, 0.68))',
              }}
            >
              {s.role}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export function Cta({ slide }: LayoutProps) {
  const s = slide as any;
  const actionText = s.action || s.actionLabel || s.button || 'Save this entry';
  const signText = s.sign || s.author || 'see you in the field';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', height: '100%' }}>
      <h1
        style={{
          fontFamily: 'var(--font-headline, Fraunces, Georgia, serif)',
          fontSize: 64,
          fontWeight: 700,
          lineHeight: 1.08,
          letterSpacing: '-0.03em',
          margin: 0,
          color: 'var(--ink-color, #2B2219)',
          maxWidth: 760,
        }}
      >
        {renderMarkedText(s.headline || s.title || 'Close of Entry')}
      </h1>

      <Squiggle />

      {(s.subtext || s.text) && (
        <p
          style={{
            fontFamily: 'var(--font-body, Newsreader, Georgia, serif)',
            fontSize: 28,
            fontStyle: 'italic',
            lineHeight: 1.45,
            margin: '0 0 40px 0',
            color: 'var(--muted-color, rgba(43, 34, 25, 0.68))',
            maxWidth: 680,
          }}
        >
          {renderMarkedText(s.subtext || s.text || '')}
        </p>
      )}

      {/* Styled stamp action button */}
      <div
        style={{
          fontFamily: 'var(--font-mono, "DM Mono", monospace)',
          fontSize: 20,
          fontWeight: 600,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          padding: '18px 40px',
          borderRadius: 8,
          background: 'var(--ink-color, #2B2219)',
          color: 'var(--bg-color, #EEE5D0)',
          display: 'inline-block',
          boxShadow: '0 8px 24px rgba(43, 34, 25, 0.2)',
        }}
      >
        {actionText}
      </div>

      <div
        style={{
          fontFamily: 'var(--font-hand, Caveat, cursive)',
          fontSize: 34,
          fontWeight: 700,
          color: 'var(--accent-color, #B8432A)',
          marginTop: 32,
          transform: 'rotate(-2deg)',
        }}
      >
        ~ {signText}
      </div>
    </div>
  );
}

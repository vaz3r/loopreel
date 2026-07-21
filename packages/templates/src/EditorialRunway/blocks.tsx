import { hexToRgba } from '@loopreel/design';
import { editorialRunwayTokens as t } from './tokens.js';
import type { PostMeta } from './contract.js';

export function SpineTab({ width, label }: { width: number; label: string }) {
  return (
    <div
      style={{
        position: 'absolute', top: 0, left: 0, bottom: 0, width,
        backgroundColor: t.colors.accent,
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        paddingBottom: width * 0.6, zIndex: 5,
      }}
    >
      <span style={{
        writingMode: 'vertical-rl', transform: 'rotate(180deg)',
        fontFamily: t.fonts.utilityExpanded, fontWeight: 600,
        fontSize: Math.max(10, width * 0.34), letterSpacing: '0.16em',
        textTransform: 'uppercase', color: t.colors.paper, whiteSpace: 'nowrap',
      }}>
        {label}
      </span>
    </div>
  );
}

export function RunningHead({
  left, leftColor, right, mutedColor, scale,
}: { left: string; leftColor: string; right: string; mutedColor: string; scale: number }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
      fontFamily: t.fonts.utilityExpanded, fontWeight: 600,
      fontSize: t.type.runningHead * scale, letterSpacing: '0.16em', textTransform: 'uppercase',
    }}>
      <span style={{ color: leftColor }}>{left}</span>
      <span style={{ color: mutedColor }}>{right}</span>
    </div>
  );
}

export function CreditFooter({
  meta, align, fg, mutedFg, scale,
}: { meta: PostMeta; align: 'left' | 'center'; fg: string; mutedFg: string; scale: number }) {
  return (
    <div style={{
      marginTop: 'auto', paddingTop: 18 * scale, display: 'flex', alignItems: 'center',
      gap: 10 * scale, justifyContent: align === 'center' ? 'center' : 'flex-start',
    }}>
      <div style={{
        width: 26 * scale, height: 26 * scale, borderRadius: '50%', flexShrink: 0,
        backgroundColor: fg,
        backgroundImage: meta.avatarUrl ? `url(${meta.avatarUrl})` : undefined,
        backgroundSize: 'cover',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {!meta.avatarUrl && (
          <span style={{ fontFamily: t.fonts.utilityExpanded, fontSize: 9 * scale, fontWeight: 700, color: t.colors.ink }}>
            {meta.avatarInitials}
          </span>
        )}
      </div>
      <span style={{ fontFamily: t.fonts.utility, fontSize: 12 * scale, color: mutedFg }}>
        {[meta.handle, meta.date ?? meta.readTime].filter(Boolean).join('  ·  ')}
      </span>
    </div>
  );
}

export function HookBody({
  kicker, heading, headingSize, fg, scale,
}: { kicker: string; heading: string; headingSize: number; fg: string; scale: number }) {
  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      justifyContent: 'flex-end', paddingBottom: 80 * scale,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9 * scale, marginBottom: 18 * scale }}>
        <div style={{ width: 9 * scale, height: 9 * scale, backgroundColor: t.colors.accent, flexShrink: 0 }} />
        <span style={{
          fontFamily: t.fonts.utilityExpanded, fontWeight: 600, fontSize: t.type.kicker * scale,
          letterSpacing: '0.14em', textTransform: 'uppercase', color: t.colors.accent,
        }}>
          {kicker}
        </span>
      </div>
      <h1
        data-smart-fit
        style={{
          fontFamily: t.fonts.display, fontStyle: 'italic', fontWeight: 480,
          fontSize: headingSize, lineHeight: 0.98, letterSpacing: '-0.01em', color: fg, margin: 0,
          maxWidth: '16ch',
        }}
      >
        {heading}
      </h1>
      <div style={{ width: 120 * scale, height: 1, background: hexToRgba(fg, 0.25), marginTop: 32 * scale }} />
    </div>
  );
}

export function ContentBody({
  heading, body, headingSize, bodySize, fg, scale,
}: { heading: string; body: string; headingSize: number; bodySize: number; fg: string; scale: number }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h2
        data-smart-fit
        style={{
          fontFamily: t.fonts.display, fontWeight: 560, fontSize: headingSize,
          lineHeight: 1.06, letterSpacing: '-0.01em', margin: `0 0 ${18 * scale}px`, color: fg,
        }}
      >
        {heading}
      </h2>
      <p
        data-smart-fit
        style={{
          fontFamily: t.fonts.utility, fontSize: bodySize, lineHeight: 1.6,
          color: hexToRgba(fg, 0.78), maxWidth: '52ch', margin: 0,
        }}
      >
        {body}
      </p>
    </div>
  );
}

export function ListBody({
  heading, headingSize, items, fg, scale,
}: { heading: string; headingSize: number; items: string[]; fg: string; scale: number }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h2
        data-smart-fit
        style={{
          fontFamily: t.fonts.display, fontWeight: 560, fontSize: headingSize,
          lineHeight: 1.06, letterSpacing: '-0.01em', margin: `0 0 ${16 * scale}px`, color: fg,
        }}
      >
        {heading}
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {items.map((item, i) => (
          <div key={i} style={{
            display: 'flex', gap: 14 * scale, alignItems: 'baseline',
            padding: `${18 * scale}px 0`, borderTop: `1px solid ${hexToRgba(fg, 0.14)}`,
            borderBottom: i === items.length - 1 ? `1px solid ${hexToRgba(fg, 0.14)}` : undefined,
          }}>
            <span style={{
              fontFamily: t.fonts.utility, fontWeight: 600, fontSize: 13 * scale,
              color: t.colors.accent, width: 18 * scale, flexShrink: 0,
            }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <span
              data-smart-fit
              style={{ fontFamily: t.fonts.utility, fontSize: t.type.listItem * scale, lineHeight: 1.4, color: fg, fontWeight: 500 }}
            >
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function QuoteBody({
  quote, attribution, fg, scale,
}: { quote: string; attribution: string; fg: string; scale: number }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ fontFamily: t.fonts.display, fontStyle: 'italic', fontSize: 72 * scale, lineHeight: 0.6, color: t.colors.accent }}>
        &ldquo;
      </div>
      <p
        data-smart-fit
        style={{
          fontFamily: t.fonts.display, fontStyle: 'italic', fontWeight: 460, fontSize: t.type.quote * scale,
          lineHeight: 1.2, margin: `${12 * scale}px 0 ${24 * scale}px`, color: fg, maxWidth: '30ch',
        }}
      >
        {quote}
      </p>
      <div style={{
        fontFamily: t.fonts.utilityExpanded, fontWeight: 600, fontSize: 11 * scale,
        letterSpacing: '0.14em', textTransform: 'uppercase', color: hexToRgba(fg, 0.7),
        paddingTop: 12 * scale, borderTop: `1px solid ${hexToRgba(fg, 0.18)}`,
      }}>
        — {attribution}
      </div>
    </div>
  );
}

export function StatBody({
  value, label, body, fg, scale,
}: { value: string; label: string; body?: string; fg: string; scale: number }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ fontFamily: t.fonts.display, fontWeight: 560, fontSize: t.type.stat * scale, lineHeight: 0.9, color: t.colors.accent, letterSpacing: '-0.02em' }}>
        {value}
      </div>
      <div style={{ fontFamily: t.fonts.utilityExpanded, fontWeight: 600, fontSize: 14 * scale, letterSpacing: '0.1em', textTransform: 'uppercase', color: fg, marginTop: 14 * scale }}>
        {label}
      </div>
      {body && (
        <p
          data-smart-fit
          style={{ fontFamily: t.fonts.utility, fontSize: 15 * scale, lineHeight: 1.55, color: hexToRgba(fg, 0.75), marginTop: 16 * scale, maxWidth: '48ch' }}
        >
          {body}
        </p>
      )}
    </div>
  );
}

export function CtaBody({
  heading, ctaLabel, fg, scale,
}: { heading: string; ctaLabel: string; fg: string; scale: number }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <h2
        data-smart-fit
        style={{ fontFamily: t.fonts.display, fontStyle: 'italic', fontWeight: 480, fontSize: t.type.ctaHeading * scale, lineHeight: 1.12, color: fg, margin: 0 }}
      >
        {heading}
      </h2>
      <div style={{
        marginTop: 26 * scale, border: `1px solid ${hexToRgba(fg, 0.5)}`, padding: `${13 * scale}px ${30 * scale}px`,
        fontFamily: t.fonts.utilityExpanded, fontWeight: 600, fontSize: 12 * scale,
        letterSpacing: '0.16em', textTransform: 'uppercase', color: fg,
      }}>
        {ctaLabel}
      </div>
    </div>
  );
}

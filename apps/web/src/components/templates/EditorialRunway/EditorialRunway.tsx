import type { SlideData, PostMeta, BrandKit, DesignOutput } from '@loopreel/schemas';
import type { SlideFormat } from '../shared/types.js';
import { hexToRgba, clampFontSize } from '@loopreel/design';
import '../../../styles/slides.css';

/**
 * "Runway Programme" editorial carousel template.
 *
 * Design system:
 *  - Ink/paper alternation by slide function (hook + cta = dark cover/close,
 *    everything else = light) instead of one flat background across the set.
 *  - One accent color, used only for structural marks (spine, kicker, rules).
 *  - Display face: Fraunces (italic). Utility face: Archivo / Archivo Expanded.
 *  - Signature element: a fixed left-edge "spine tab" that repeats on every
 *    slide, carrying the series name + look number — the one thing that
 *    visually stitches a multi-slide carousel into a single issue.
 */

// ---------------------------------------------------------------------------
// Format presets — same component, three IG/LinkedIn-safe aspect ratios
// ---------------------------------------------------------------------------

const FORMAT_DIMENSIONS: Record<SlideFormat, { width: number; height: number }> = {
  square: { width: 1080, height: 1080 },
  portrait: { width: 1080, height: 1350 },
  story: { width: 1080, height: 1920 },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface Props {
  slide: SlideData;
  slideCount: number;
  brandKit?: BrandKit;
  design?: DesignOutput;
  meta?: PostMeta;
  format?: SlideFormat;
}

export function EditorialTemplate({ slide, slideCount, brandKit, design, meta, format = 'square' }: Props) {
  const { width, height } = FORMAT_DIMENSIONS[format];
  const scale = height / 1080;

  const colorScheme = design?.colorScheme;
  const inkColor = colorScheme?.text ?? brandKit?.colors.text ?? '#15130F';
  const paperColor = colorScheme?.background ?? brandKit?.colors.background ?? '#E7E4D9';
  const accentColor = '#B31E23';

  const isDark = slide.type === 'hook' || slide.type === 'cta';
  const bg = isDark ? inkColor : paperColor;
  const fg = isDark ? paperColor : inkColor;
  const mutedFg = hexToRgba(fg, isDark ? 0.55 : 0.5);

  const kicker = slide.type === 'hook' ? (slide.kicker ?? meta?.category) : undefined;
  const seriesLabel = meta?.seriesName ?? 'ISSUE';
  const pageMark = `${String(slide.index + 1).padStart(2, '0')} / ${String(slideCount).padStart(2, '0')}`;

  const headingLength = slide.type === 'hook' || slide.type === 'content' || slide.type === 'list' ? (slide.heading?.length ?? 0) : 0;
  const bodyLength = slide.type === 'content' || slide.type === 'stat' ? (slide.body?.length ?? 0) : 0;
  const headingSize = clampFontSize(headingLength, {
    min: 30 * scale,
    max: (slide.type === 'hook' ? 96 : 56) * scale,
    pivot: 32,
  });
  const bodySize = clampFontSize(bodyLength, { min: 16 * scale, max: 22 * scale, pivot: 220 });

  const spineWidth = Math.round(30 * scale);

  return (
    <div
      className={`slide-container slide-${slide.type} template-editorial`}
      style={{
        boxSizing: 'border-box',
        width,
        height,
        backgroundColor: bg,
        color: fg,
        position: 'relative',
        display: 'flex',
        fontFamily: `'Archivo', sans-serif`,
        overflow: 'hidden',
      }}
    >
      <SpineTab
        width={spineWidth}
        accentColor={accentColor}
        label={`${seriesLabel.toUpperCase()} · LOOK ${String(slide.index + 1).padStart(2, '0')}`}
      />

      <div
        style={{
          flex: 1,
          marginLeft: spineWidth,
          padding: `${44 * scale}px ${44 * scale}px ${40 * scale}px`,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        <RunningHead
          left={slide.type === 'hook' || slide.type === 'cta' ? seriesLabel : (meta?.category ?? seriesLabel)}
          leftColor={slide.type === 'hook' || slide.type === 'cta' ? mutedFg : accentColor}
          right={slide.type === 'hook' ? `VOL. ${new Date().getFullYear()}` : pageMark}
          color={mutedFg}
          scale={scale}
        />

        {slide.type === 'hook' && (
          <HookBody
            kicker={kicker}
            heading={slide.heading}
            headingSize={headingSize}
            fg={fg}
            accentColor={accentColor}
            scale={scale}
          />
        )}

        {slide.type === 'content' && (
          <ContentBody
            heading={slide.heading}
            body={slide.body}
            headingSize={headingSize}
            bodySize={bodySize}
            fg={fg}
            scale={scale}
          />
        )}

        {slide.type === 'list' && (
          <ListBody
            heading={slide.heading}
            headingSize={headingSize}
            items={slide.items}
            fg={fg}
            accentColor={accentColor}
            scale={scale}
          />
        )}

        {slide.type === 'quote' && (
          <QuoteBody
            quote={slide.quote}
            attribution={slide.attribution}
            fg={fg}
            accentColor={accentColor}
            scale={scale}
          />
        )}

        {slide.type === 'stat' && (
          <StatBody
            value={slide.value}
            label={slide.label}
            body={slide.body}
            fg={fg}
            accentColor={accentColor}
            scale={scale}
          />
        )}

        {slide.type === 'image' && (
          <ImageBody
            imageUrl={slide.imageUrl}
            caption={slide.imageCaption}
            scale={scale}
          />
        )}

        {slide.type === 'cta' && (
          <CtaBody
            heading={slide.heading}
            ctaLabel={slide.ctaLabel}
            fg={fg}
            scale={scale}
          />
        )}

        <CreditFooter meta={meta} align={slide.type === 'cta' ? 'center' : 'left'} color={fg} mutedColor={mutedFg} scale={scale} />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Subcomponents
// ---------------------------------------------------------------------------

function SpineTab({ width, accentColor, label }: { width: number; accentColor: string; label: string }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0, left: 0, bottom: 0, width,
        backgroundColor: accentColor,
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        paddingBottom: width * 0.6, zIndex: 5,
      }}
    >
      <span
        style={{
          writingMode: 'vertical-rl', transform: 'rotate(180deg)',
          fontFamily: `'Archivo Expanded', sans-serif`, fontWeight: 600,
          fontSize: Math.max(10, width * 0.34), letterSpacing: '0.16em',
          textTransform: 'uppercase', color: '#F3EFE4', whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>
    </div>
  );
}

function RunningHead({
  left, leftColor, right, color, scale,
}: { left?: string; leftColor: string; right: string; color: string; scale: number }) {
  return (
    <div
      style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        fontFamily: `'Archivo Expanded', sans-serif`, fontWeight: 600,
        fontSize: 11 * scale, letterSpacing: '0.16em', textTransform: 'uppercase',
      }}
    >
      <span style={{ color: leftColor }}>{left ?? '—'}</span>
      <span style={{ color }}>{right}</span>
    </div>
  );
}

function CreditFooter({
  meta, align, color, mutedColor, scale,
}: { meta?: PostMeta; align: 'left' | 'center'; color: string; mutedColor: string; scale: number }) {
  if (!meta) return <div style={{ marginTop: 'auto' }} />;
  const initials = meta.avatarInitials ?? meta.authorName?.slice(0, 2).toUpperCase() ?? '';
  return (
    <div
      style={{
        marginTop: 'auto', paddingTop: 18 * scale, display: 'flex', alignItems: 'center',
        gap: 10 * scale, justifyContent: align === 'center' ? 'center' : 'flex-start',
      }}
    >
      {(meta.avatarUrl || initials) && (
        <div
          style={{
            width: 26 * scale, height: 26 * scale, borderRadius: '50%', flexShrink: 0,
            backgroundColor: hexToRgba(color, 1), backgroundImage: meta.avatarUrl ? `url(${meta.avatarUrl})` : undefined,
            backgroundSize: 'cover', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {!meta.avatarUrl && (
            <span style={{ fontFamily: `'Archivo Expanded', sans-serif`, fontSize: 9 * scale, fontWeight: 700, color: '#15130F' }}>
              {initials}
            </span>
          )}
        </div>
      )}
      <span style={{ fontFamily: `'Archivo', sans-serif`, fontSize: 12 * scale, color: mutedColor }}>
        {[meta.handle, meta.date ?? meta.readTime].filter(Boolean).join('  ·  ')}
      </span>
    </div>
  );
}

function HookBody({ kicker, heading, headingSize, fg, accentColor, scale }: {
  kicker?: string; heading: string; headingSize: number; fg: string; accentColor: string; scale: number;
}) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      {kicker && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 * scale, marginBottom: 18 * scale }}>
          <div style={{ width: 9 * scale, height: 9 * scale, backgroundColor: accentColor, flexShrink: 0 }} />
          <span style={{
            fontFamily: `'Archivo Expanded', sans-serif`, fontWeight: 600, fontSize: 12.5 * scale,
            letterSpacing: '0.14em', textTransform: 'uppercase', color: accentColor,
          }}>
            {kicker}
          </span>
        </div>
      )}
      <h1 style={{
        fontFamily: `'Fraunces', serif`, fontStyle: 'italic', fontWeight: 480,
        fontSize: headingSize, lineHeight: 0.98, letterSpacing: '-0.01em', color: fg, margin: 0,
      }}>
        {heading}
      </h1>
    </div>
  );
}

function ContentBody({ heading, body, headingSize, bodySize, fg, scale }: {
  heading: string; body?: string; headingSize: number; bodySize: number; fg: string; scale: number;
}) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h2 style={{
        fontFamily: `'Fraunces', serif`, fontWeight: 560, fontSize: headingSize,
        lineHeight: 1.06, letterSpacing: '-0.01em', margin: `${18 * scale}px 0 ${14 * scale}px`, color: fg,
      }}>
        {heading}
      </h2>
      {body && (
        <p style={{
          fontFamily: `'Archivo', sans-serif`, fontSize: bodySize, lineHeight: 1.6,
          color: hexToRgba(fg, 0.78), maxWidth: '90%', margin: 0,
        }}>
          {body}
        </p>
      )}
    </div>
  );
}

function ListBody({ heading, headingSize, items, fg, accentColor, scale }: {
  heading?: string; headingSize: number; items: string[]; fg: string; accentColor: string; scale: number;
}) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      {heading && (
        <h2 style={{
          fontFamily: `'Fraunces', serif`, fontWeight: 560, fontSize: headingSize,
          lineHeight: 1.06, letterSpacing: '-0.01em', margin: `0 0 ${16 * scale}px`, color: fg,
        }}>
          {heading}
        </h2>
      )}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {items.map((item: string, i: number) => (
          <div key={i} style={{
            display: 'flex', gap: 14 * scale, alignItems: 'baseline',
            padding: `${11 * scale}px 0`, borderTop: `1px solid ${hexToRgba(fg, 0.14)}`,
            borderBottom: i === items.length - 1 ? `1px solid ${hexToRgba(fg, 0.14)}` : undefined,
          }}>
            <span style={{ fontFamily: `'Archivo', sans-serif`, fontWeight: 600, fontSize: 13 * scale, color: accentColor, width: 18 * scale, flexShrink: 0 }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <span style={{ fontFamily: `'Archivo', sans-serif`, fontSize: 14.5 * scale, lineHeight: 1.4, color: fg, fontWeight: 500 }}>
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuoteBody({ quote, attribution, fg, accentColor, scale }: {
  quote: string; attribution?: string; fg: string; accentColor: string; scale: number;
}) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ fontFamily: `'Fraunces', serif`, fontStyle: 'italic', fontSize: 72 * scale, lineHeight: 0.6, color: accentColor }}>
        &ldquo;
      </div>
      <p style={{
        fontFamily: `'Fraunces', serif`, fontStyle: 'italic', fontWeight: 460, fontSize: 27 * scale,
        lineHeight: 1.2, margin: `${12 * scale}px 0 ${24 * scale}px`, color: fg,
      }}>
        {quote}
      </p>
      {attribution && (
        <div style={{
          fontFamily: `'Archivo Expanded', sans-serif`, fontWeight: 600, fontSize: 11 * scale,
          letterSpacing: '0.14em', textTransform: 'uppercase', color: hexToRgba(fg, 0.7),
          paddingTop: 12 * scale, borderTop: `1px solid ${hexToRgba(fg, 0.18)}`,
        }}>
          — {attribution}
        </div>
      )}
    </div>
  );
}

function StatBody({ value, label, body, fg, accentColor, scale }: {
  value: string; label?: string; body?: string; fg: string; accentColor: string; scale: number;
}) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{
        fontFamily: `'Fraunces', serif`, fontWeight: 560, fontSize: 110 * scale,
        lineHeight: 0.9, color: accentColor, letterSpacing: '-0.02em',
      }}>
        {value}
      </div>
      {label && (
        <div style={{
          fontFamily: `'Archivo Expanded', sans-serif`, fontWeight: 600, fontSize: 14 * scale,
          letterSpacing: '0.1em', textTransform: 'uppercase', color: fg, marginTop: 14 * scale,
        }}>
          {label}
        </div>
      )}
      {body && (
        <p style={{ fontFamily: `'Archivo', sans-serif`, fontSize: 15 * scale, lineHeight: 1.55, color: hexToRgba(fg, 0.75), marginTop: 16 * scale, maxWidth: '90%' }}>
          {body}
        </p>
      )}
    </div>
  );
}

function ImageBody({ imageUrl, caption, scale }: { imageUrl: string; caption?: string; scale: number }) {
  return (
    <div style={{ flex: 1, position: 'relative', margin: `${16 * scale}px -8px 0` }}>
      {imageUrl && (
        <div style={{
          position: 'absolute', inset: 0, backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
        }} />
      )}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(21,19,15,0.85), transparent 55%)',
      }} />
      {caption && (
        <div style={{
          position: 'absolute', bottom: 20 * scale, left: 20 * scale, right: 20 * scale,
          fontFamily: `'Fraunces', serif`, fontStyle: 'italic', fontSize: 22 * scale,
          lineHeight: 1.15, color: '#F3EFE4',
        }}>
          {caption}
        </div>
      )}
    </div>
  );
}

function CtaBody({ heading, ctaLabel, fg, scale }: { heading: string; ctaLabel?: string; fg: string; scale: number }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <h2 style={{
        fontFamily: `'Fraunces', serif`, fontStyle: 'italic', fontWeight: 480,
        fontSize: 40 * scale, lineHeight: 1.12, color: fg, margin: 0,
      }}>
        {heading}
      </h2>
      {ctaLabel && (
        <div style={{
          marginTop: 26 * scale, border: `1px solid ${hexToRgba(fg, 0.5)}`,
          padding: `${13 * scale}px ${30 * scale}px`,
          fontFamily: `'Archivo Expanded', sans-serif`, fontWeight: 600, fontSize: 12 * scale,
          letterSpacing: '0.16em', textTransform: 'uppercase', color: fg,
        }}>
          {ctaLabel}
        </div>
      )}
    </div>
  );
}

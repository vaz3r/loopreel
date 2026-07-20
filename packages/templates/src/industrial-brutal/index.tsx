import React from 'react';
import type { Slide } from './schema.js';
import { getHeadlineStyle, getBodyStyle, getThemeColors, getOverflowStyles, getImageCoverStyles, getImageSplitStyles } from './engine.js';
import {
  RegMarks,
  MicroFooter,
  SafeArea,
} from '../engine/components.js';

const T = getThemeColors();
const SANS = T.fontSans;
const MONO = T.fontMono;

interface IndustrialBrutalProps {
  slides: Slide[];
  platform?: string;
}

/* ─── Custom MicroHeader (4px bar design) ─── */

function MicroHeader({ tag }: { tag: string }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 4,
        background: T.accent,
        zIndex: 20,
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: 16,
          left: 80,
          fontFamily: MONO,
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(224,224,224,0.5)',
        }}
      >
        {tag}
      </span>
    </div>
  );
}

/* ─── Slide Layouts ─── */

function CoverLayout({ slide }: { slide: Extract<Slide, { type: 'cover' }> }) {
  const hs = getHeadlineStyle(slide.headline);
  const bs = getBodyStyle(slide.subheadline, true);
  return (
    <SafeArea top={100} bottom={100} style={{ justifyContent: 'center' }} data-smart-center="data-smart-center">
      <h1
        data-smart-fit="data-smart-fit"
        data-smart-fit-mode="width"
        data-smart-fit-min="48"
        data-smart-fit-max="130"
        style={{
          ...hs, ...getOverflowStyles(),
          fontFamily: SANS,
          letterSpacing: '-0.02em',
          color: T.text,
          marginBottom: 40,
        }}
      >
        {slide.headline}
      </h1>
      {slide.subheadline && (
        <p
          data-smart-fit="data-smart-fit"
          data-smart-fit-mode="box"
          data-smart-fit-min="18"
          data-smart-fit-max="36"
          data-smart-fit-max-lines="8"
          style={{
            fontFamily: SANS,
            fontSize: bs.fontSize,
            fontWeight: bs.fontWeight,
            lineHeight: 1.3,
            color: 'rgba(224,224,224,0.7)',
            maxWidth: 700,
          }}
        >
          {slide.subheadline}
        </p>
      )}
      {slide.metadata && (
        <div
          style={{
            marginTop: 40,
            paddingTop: 24,
            borderTop: `2px solid ${T.border}`,
            fontFamily: MONO,
            fontSize: 20,
            fontWeight: 500,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: T.accent,
          }}
        >
          {slide.metadata}
        </div>
      )}
    </SafeArea>
  );
}

function DefinitionLayout({ slide }: { slide: Extract<Slide, { type: 'definition' }> }) {
  return (
    <SafeArea top={100} bottom={100} style={{ justifyContent: 'center' }} data-smart-center="data-smart-center">
      <div
        style={{
          fontFamily: MONO,
          fontSize: 20,
          fontWeight: 500,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: T.accent,
          marginBottom: 24,
        }}
      >
        {slide.phonetic}
      </div>
      <h2
        data-smart-fit="data-smart-fit"
        data-smart-fit-mode="width"
        data-smart-fit-min="48"
        data-smart-fit-max="130"
        style={{
          fontFamily: SANS,
          ...getHeadlineStyle(slide.term),
          lineHeight: 1,
          marginBottom: 32,
          color: T.text,
        }}
      >
        {slide.term}
      </h2>
      <div style={{ width: 60, height: 3, background: T.accent, marginBottom: 32 }} />
      <p
        data-smart-fit="data-smart-fit"
        data-smart-fit-mode="box"
        data-smart-fit-min="18"
        data-smart-fit-max="36"
        data-smart-fit-max-lines="8"
        style={{
          fontFamily: SANS,
          ...getBodyStyle(slide.definition),
          lineHeight: 1.4,
          color: 'rgba(224,224,224,0.8)',
          marginBottom: 32,
        }}
      >
        {slide.definition}
      </p>
      {slide.example && (
        <div
          style={{
            fontFamily: MONO,
            fontSize: 22,
            fontWeight: 400,
            fontStyle: 'italic',
            color: 'rgba(224,224,224,0.5)',
            paddingLeft: 20,
            borderLeft: `3px solid ${T.accent}`,
          }}
        >
          {slide.example}
        </div>
      )}
    </SafeArea>
  );
}

function DichotomyLayout({ slide }: { slide: Extract<Slide, { type: 'dichotomy' }> }) {
  const hs = getHeadlineStyle(slide.headline);
  return (
    <SafeArea>
      <h2
        data-smart-fit="data-smart-fit"
        data-smart-fit-mode="width"
        data-smart-fit-min="48"
        data-smart-fit-max="130"
        style={{
          ...hs, ...getOverflowStyles(),
          fontFamily: SANS,
          letterSpacing: '-0.02em',
          marginBottom: 60,
          color: T.text,
        }}
      >
        {slide.headline}
      </h2>
      <div style={{ display: 'flex', gap: 40, flex: 1 }}>
        <div style={{ flex: 1, borderRight: `2px solid ${T.border}`, paddingRight: 40 }}>
          <h3
            style={{
              fontFamily: SANS,
              fontSize: 36,
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: T.accent,
              marginBottom: 20,
            }}
          >
            {slide.left.title}
          </h3>
          <p
            data-smart-fit="data-smart-fit"
            data-smart-fit-mode="box"
            data-smart-fit-min="18"
            data-smart-fit-max="36"
            data-smart-fit-max-lines="8"
            style={{ fontFamily: SANS, ...getBodyStyle(slide.left.desc), lineHeight: 1.4, color: 'rgba(224,224,224,0.7)' }}
          >
            {slide.left.desc}
          </p>
        </div>
        <div style={{ flex: 1, paddingLeft: 40 }}>
          <h3
            style={{
              fontFamily: SANS,
              fontSize: 36,
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: T.accent,
              marginBottom: 20,
            }}
          >
            {slide.right.title}
          </h3>
          <p
            data-smart-fit="data-smart-fit"
            data-smart-fit-mode="box"
            data-smart-fit-min="18"
            data-smart-fit-max="36"
            data-smart-fit-max-lines="8"
            style={{ fontFamily: SANS, ...getBodyStyle(slide.right.desc), lineHeight: 1.4, color: 'rgba(224,224,224,0.7)' }}
          >
            {slide.right.desc}
          </p>
        </div>
      </div>
    </SafeArea>
  );
}

function TimelineLayout({ slide }: { slide: Extract<Slide, { type: 'timeline' }> }) {
  const hs = getHeadlineStyle(slide.headline);
  return (
    <SafeArea>
      <h2
        data-smart-fit="data-smart-fit"
        data-smart-fit-mode="width"
        data-smart-fit-min="48"
        data-smart-fit-max="130"
        style={{
          ...hs, ...getOverflowStyles(),
          fontFamily: SANS,
          letterSpacing: '-0.02em',
          marginBottom: 50,
          color: T.text,
        }}
      >
        {slide.headline}
      </h2>
      <div data-smart-timeline="data-smart-timeline" style={{ display: 'flex', flexDirection: 'column', gap: 0, flex: 1, overflow: 'hidden' }}>
        {slide.events.map((ev, i) => (
          <div
            key={i}
            data-smart-timeline-item="data-smart-timeline-item"
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 30,
              borderTop: i === 0 ? `2px solid ${T.border}` : 'none',
              borderBottom: `2px solid ${T.border}`,
              padding: '20px 0',
            }}
          >
            <span
              style={{
                fontFamily: MONO,
                fontSize: 22,
                fontWeight: 700,
                color: T.accent,
                minWidth: 120,
                flexShrink: 0,
              }}
            >
              {ev.date}
            </span>
            <div>
              <h4
                style={{
                  fontFamily: SANS,
                  fontSize: 30,
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '0.03em',
                  color: T.text,
                  marginBottom: 6,
                }}
              >
                {ev.title}
              </h4>
              <p
                data-smart-fit="data-smart-fit"
                data-smart-fit-mode="box"
                data-smart-fit-min="18"
                data-smart-fit-max="36"
                data-smart-fit-max-lines="8"
                style={{ fontFamily: SANS, fontSize: 22, fontWeight: 300, lineHeight: 1.3, color: 'rgba(224,224,224,0.6)' }}
              >
                {ev.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </SafeArea>
  );
}

function QuoteLayout({ slide }: { slide: Extract<Slide, { type: 'quote' }> }) {
  return (
    <SafeArea top={100} bottom={100} style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }} data-smart-center="data-smart-center">
      <div style={{ width: 4, height: 80, background: T.accent, marginBottom: 50 }} />
      <blockquote
        data-smart-fit="data-smart-fit"
        data-smart-fit-mode="box"
        data-smart-fit-min="20"
        data-smart-fit-max="48"
        data-smart-fit-max-lines="8"
        style={{
          fontFamily: SANS,
          ...getBodyStyle(slide.quote, true),
          fontStyle: 'italic',
          lineHeight: 1.3,
          color: T.text,
          maxWidth: 800,
          marginBottom: 50,
        }}
      >
        &ldquo;{slide.quote}&rdquo;
      </blockquote>
      <div>
        <span
          style={{
            fontFamily: SANS,
            fontSize: 26,
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: T.accent,
          }}
        >
          {slide.author}
        </span>
        {slide.role && (
          <span
            style={{
              display: 'block',
              fontFamily: MONO,
              fontSize: 20,
              fontWeight: 400,
              color: 'rgba(224,224,224,0.5)',
              marginTop: 8,
            }}
          >
            {slide.role}
          </span>
        )}
      </div>
    </SafeArea>
  );
}

function SequenceLayout({ slide }: { slide: Extract<Slide, { type: 'sequence' }> }) {
  const hs = getHeadlineStyle(slide.headline);
  return (
    <SafeArea>
      <h2
        data-smart-fit="data-smart-fit"
        data-smart-fit-mode="width"
        data-smart-fit-min="48"
        data-smart-fit-max="130"
        style={{
          ...hs, ...getOverflowStyles(),
          fontFamily: SANS,
          letterSpacing: '-0.02em',
          marginBottom: 50,
          color: T.text,
        }}
      >
        {slide.headline}
      </h2>
      <div data-smart-timeline="data-smart-timeline" style={{ display: 'flex', flexDirection: 'column', gap: 0, flex: 1, overflow: 'hidden' }}>
        {slide.items.map((item, i) => (
          <div
            key={i}
            data-smart-timeline-item="data-smart-timeline-item"
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 30,
              borderTop: i === 0 ? `2px solid ${T.border}` : 'none',
              borderBottom: `2px solid ${T.border}`,
              padding: '20px 0',
            }}
          >
            <span
              style={{
                fontFamily: MONO,
                fontSize: 48,
                fontWeight: 700,
                color: T.accent,
                minWidth: 70,
                flexShrink: 0,
                lineHeight: 1,
              }}
            >
              {String(item.num).padStart(2, '0')}
            </span>
            <div>
              <h4
                style={{
                  fontFamily: SANS,
                  fontSize: 30,
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '0.03em',
                  color: T.text,
                  marginBottom: 6,
                }}
              >
                {item.title}
              </h4>
              <p
                data-smart-fit="data-smart-fit"
                data-smart-fit-mode="box"
                data-smart-fit-min="18"
                data-smart-fit-max="36"
                data-smart-fit-max-lines="8"
                style={{ fontFamily: SANS, fontSize: 22, fontWeight: 300, lineHeight: 1.3, color: 'rgba(224,224,224,0.6)' }}
              >
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </SafeArea>
  );
}

function TelemetryLayout({ slide }: { slide: Extract<Slide, { type: 'telemetry' }> }) {
  const hs = getHeadlineStyle(slide.headline);
  const count = slide.stats.length;
  const cols = count <= 4 ? 2 : count <= 6 ? 3 : 4;
  return (
    <SafeArea>
      <h2
        data-smart-fit="data-smart-fit"
        data-smart-fit-mode="width"
        data-smart-fit-min="48"
        data-smart-fit-max="130"
        style={{
          ...hs, ...getOverflowStyles(),
          fontFamily: SANS,
          letterSpacing: '-0.02em',
          marginBottom: 50,
          color: T.text,
        }}
      >
        {slide.headline}
      </h2>
      <div
        data-smart-grid="data-smart-grid"
        data-smart-grid-cols={cols}
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: 0,
          flex: 1,
          border: `2px solid ${T.border}`,
        }}
      >
        {slide.stats.map((stat, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '30px 24px',
              borderRight: (i + 1) % cols !== 0 ? `1px solid ${T.gridBorder}` : 'none',
              borderBottom: i < count - cols ? `1px solid ${T.gridBorder}` : 'none',
            }}
          >
            <span
              data-smart-stat="data-smart-stat"
              data-smart-stat-min="32"
              data-smart-stat-max="80"
              style={{
                fontFamily: MONO,
                fontSize: 52,
                fontWeight: 700,
                color: T.accent,
                lineHeight: 1,
                marginBottom: 12,
              }}
            >
              {stat.value}
            </span>
            <span
              style={{
                fontFamily: SANS,
                fontSize: 22,
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'rgba(224,224,224,0.6)',
              }}
            >
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </SafeArea>
  );
}

function TableLayout({ slide }: { slide: Extract<Slide, { type: 'table' }> }) {
  const hs = getHeadlineStyle(slide.headline);
  return (
    <SafeArea>
      <h2
        data-smart-fit="data-smart-fit"
        data-smart-fit-mode="width"
        data-smart-fit-min="48"
        data-smart-fit-max="130"
        style={{
          ...hs, ...getOverflowStyles(),
          fontFamily: SANS,
          letterSpacing: '-0.02em',
          marginBottom: 40,
          color: T.text,
        }}
      >
        {slide.headline}
      </h2>
      <div data-smart-table-container="data-smart-table-container" style={{ flex: 1, overflow: 'hidden', border: `2px solid ${T.border}` }}>
        <div style={{ display: 'flex', borderBottom: `2px solid ${T.border}` }}>
          {slide.headers.map((h, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                padding: '16px 20px',
                fontFamily: MONO,
                fontSize: 20,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: T.accent,
                borderRight: i < slide.headers.length - 1 ? `1px solid ${T.gridBorder}` : 'none',
              }}
            >
              {h}
            </div>
          ))}
        </div>
        {slide.rows.map((row, ri) => (
          <div
            key={ri}
            style={{
              display: 'flex',
              borderBottom: ri < slide.rows.length - 1 ? `1px solid ${T.gridBorder}` : 'none',
            }}
          >
            {row.map((cell, ci) => (
              <div
                key={ci}
                data-smart-fit="data-smart-fit"
                data-smart-fit-mode="box"
                data-smart-fit-min="16"
                data-smart-fit-max="24"
                style={{
                  flex: 1,
                  padding: '14px 20px',
                  fontFamily: SANS,
                  fontSize: 22,
                  fontWeight: 400,
                  color: 'rgba(224,224,224,0.8)',
                  borderRight: ci < row.length - 1 ? `1px solid ${T.gridBorder}` : 'none',
                }}
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </SafeArea>
  );
}

function ImageSplitLayout({ slide }: { slide: Extract<Slide, { type: 'image-split' }> }) {
  const hs = getHeadlineStyle(slide.headline);
  const bs = getBodyStyle(slide.bodyText);
  const { image: imgStyles } = getImageSplitStyles('dramatic');
  return (
    <SafeArea>
      <div data-smart-image-split="data-smart-image-split" data-smart-image-split-direction="row" style={{ display: 'flex', gap: 40, flex: 1 }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2
            data-smart-fit="data-smart-fit"
            data-smart-fit-mode="width"
            data-smart-fit-min="48"
            data-smart-fit-max="130"
            style={{
              ...hs, ...getOverflowStyles(),
              fontFamily: SANS,
              letterSpacing: '-0.02em',
              marginBottom: 30,
              color: T.text,
            }}
          >
            {slide.headline}
          </h2>
          <p
            data-smart-fit="data-smart-fit"
            data-smart-fit-mode="box"
            data-smart-fit-min="18"
            data-smart-fit-max="36"
            data-smart-fit-max-lines="8"
            style={{
              fontFamily: SANS,
              ...bs,
              ...getOverflowStyles({ maxLines: 6 }),
              color: 'rgba(224,224,224,0.7)',
            }}
          >
            {slide.bodyText}
          </p>
        </div>
        <div
          style={{
            flex: 1,
            background: 'rgba(224,224,224,0.08)',
            border: `2px solid ${T.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {slide.imageUrl ? (
            <img src={slide.imageUrl} alt="" style={imgStyles} />
          ) : (
            <span style={{ fontFamily: MONO, fontSize: 20, color: 'rgba(224,224,224,0.3)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
              {slide.imageKeywords || 'IMAGE'}
            </span>
          )}
        </div>
      </div>
    </SafeArea>
  );
}

function ImageCoverLayout({ slide }: { slide: Extract<Slide, { type: 'image-cover' }> }) {
  const hs = getHeadlineStyle(slide.headline);
  const coverStyles = getImageCoverStyles('dramatic');
  return (
    <>
      <div style={coverStyles.imageContainer}>
        {slide.imageUrl && (
          <img src={slide.imageUrl} alt="" style={coverStyles.image} />
        )}
      </div>
      <div style={coverStyles.overlay} />
      <SafeArea zIndex={5} style={{ justifyContent: 'flex-end' }}>
        <h2
          data-smart-fit="data-smart-fit"
          data-smart-fit-mode="width"
          data-smart-fit-min="48"
          data-smart-fit-max="130"
          style={{
            ...hs, ...getOverflowStyles(),
            fontFamily: SANS,
            letterSpacing: '-0.02em',
            marginBottom: 24,
            color: '#FFFFFF',
            textShadow: '0 2px 20px rgba(0,0,0,0.8)',
          }}
        >
          {slide.headline}
        </h2>
        {slide.subtext && (
          <p
            data-smart-fit="data-smart-fit"
            data-smart-fit-mode="box"
            data-smart-fit-min="18"
            data-smart-fit-max="36"
            data-smart-fit-max-lines="8"
            style={{
              fontFamily: SANS,
              ...getBodyStyle(slide.subtext),
              lineHeight: 1.4,
              ...getOverflowStyles({ maxLines: 4 }),
              color: 'rgba(255,255,255,0.8)',
              textShadow: '0 1px 10px rgba(0,0,0,0.6)',
            }}
          >
            {slide.subtext}
          </p>
        )}
      </SafeArea>
    </>
  );
}

function CtaLayout({ slide }: { slide: Extract<Slide, { type: 'cta' }> }) {
  const hs = getHeadlineStyle(slide.headline);
  return (
    <SafeArea top={100} bottom={100} style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }} data-smart-center="data-smart-center">
      <h2
        data-smart-fit="data-smart-fit"
        data-smart-fit-mode="width"
        data-smart-fit-min="48"
        data-smart-fit-max="130"
        style={{
          ...hs, ...getOverflowStyles(),
          fontFamily: SANS,
          letterSpacing: '-0.02em',
          marginBottom: 30,
          color: T.text,
        }}
      >
        {slide.headline}
      </h2>
      {slide.subtext && (
        <p
          data-smart-fit="data-smart-fit"
          data-smart-fit-mode="box"
          data-smart-fit-min="18"
          data-smart-fit-max="36"
          data-smart-fit-max-lines="8"
          style={{
            fontFamily: SANS,
            ...getBodyStyle(slide.subtext),
            lineHeight: 1.4,
            color: 'rgba(224,224,224,0.6)',
            maxWidth: 700,
            marginBottom: 50,
          }}
        >
          {slide.subtext}
        </p>
      )}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 16,
          border: `3px solid ${T.accent}`,
          padding: '20px 60px',
          fontFamily: SANS,
          fontSize: 28,
          fontWeight: 900,
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          color: T.accent,
        }}
      >
        {slide.actionLabel}
        <span style={{ fontSize: 32, fontWeight: 300 }}>→</span>
      </div>
      {slide.socialHandle && (
        <div
          style={{
            marginTop: 40,
            fontFamily: MONO,
            fontSize: 22,
            fontWeight: 500,
            color: 'rgba(224,224,224,0.4)',
            letterSpacing: '0.1em',
          }}
        >
          {slide.socialHandle}
        </div>
      )}
    </SafeArea>
  );
}

/* ─── Layout Registry ─── */

const LAYOUTS: Record<string, React.FC<{ slide: Slide }>> = {
  cover: CoverLayout as React.FC<{ slide: Slide }>,
  definition: DefinitionLayout as React.FC<{ slide: Slide }>,
  dichotomy: DichotomyLayout as React.FC<{ slide: Slide }>,
  timeline: TimelineLayout as React.FC<{ slide: Slide }>,
  quote: QuoteLayout as React.FC<{ slide: Slide }>,
  sequence: SequenceLayout as React.FC<{ slide: Slide }>,
  telemetry: TelemetryLayout as React.FC<{ slide: Slide }>,
  table: TableLayout as React.FC<{ slide: Slide }>,
  'image-split': ImageSplitLayout as React.FC<{ slide: Slide }>,
  'image-cover': ImageCoverLayout as React.FC<{ slide: Slide }>,
  cta: CtaLayout as React.FC<{ slide: Slide }>,
};

/* ─── Main Component ─── */

function IndustrialBrutalSlide({ slide }: { slide: Slide }) {
  const Layout = LAYOUTS[slide.type];
  if (!Layout) return null;
  return <Layout slide={slide} />;
}

function IndustrialBrutalTemplate({ slides }: IndustrialBrutalProps) {
  return (
    <div
      style={{
        width: 1080,
        height: 1350,
        position: 'relative',
        overflow: 'hidden',
        background: T.bg,
        color: T.text,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: SANS,
      }}
    >
      {slides.map((slide, i) => (
        <div key={i} style={{ position: 'relative', width: 1080, height: 1350, overflow: 'hidden' }}>
          <RegMarks color="rgba(224,224,224,0.25)" size={24} />
          <MicroHeader tag={slide.tag} />
          <IndustrialBrutalSlide slide={slide} />
          <MicroFooter
            footerLeft={slide.footerLeft}
            footerRight={slide.footerRight}
            bottom={80}
            color="rgba(224,224,224,0.4)"
            fontFamily={MONO}
            fontSize={22}
            fontWeight={500}
            letterSpacing="0.1em"
            zIndex={5}
          />
        </div>
      ))}
    </div>
  );
}

/* Single-slide export for render pipeline */
export function IndustrialBrutalSingle({ slide }: { slide: Slide }) {
  return (
    <div
      style={{
        width: 1080,
        height: 1350,
        position: 'relative',
        overflow: 'hidden',
        background: T.bg,
        color: T.text,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: SANS,
      }}
    >
      <RegMarks color="rgba(224,224,224,0.25)" size={24} />
      <MicroHeader tag={slide.tag} />
      <IndustrialBrutalSlide slide={slide} />
      <MicroFooter
        footerLeft={slide.footerLeft}
        footerRight={slide.footerRight}
        bottom={50}
        color="rgba(224,224,224,0.4)"
        fontFamily={MONO}
        fontSize={22}
        fontWeight={500}
        letterSpacing="0.1em"
        zIndex={5}
      />
    </div>
  );
}

IndustrialBrutalTemplate.meta = {
  id: 'industrial-brutal',
  name: 'Industrial Brutal',
  description: 'Aggressive, raw industrial carousel for tech, crypto, sports, and energy — 11 slide types',
  format: 'portrait' as const,
  fonts: {
    heading: "'Manrope', sans-serif",
    body: "'Manrope', sans-serif",
    mono: "'Space Mono', monospace",
  },
  slideTypes: [
    { type: 'cover', description: 'Bold headline with subheadline and metadata', fields: { headline: 'max:60', subheadline: 'max:120', metadata: 'max:100' } },
    { type: 'definition', description: 'Term definition with phonetic and example', fields: { term: 'max:40', phonetic: 'max:30', definition: 'max:200', example: 'max:150' } },
    { type: 'dichotomy', description: 'Two-column comparison with headline', fields: { headline: 'max:60', left: 'title+desc', right: 'title+desc' } },
    { type: 'timeline', description: 'Chronological events list', fields: { headline: 'max:60', events: 'min:2,max:8' } },
    { type: 'quote', description: 'Pull quote with author and role', fields: { quote: 'max:300', author: 'max:40', role: 'max:60' } },
    { type: 'sequence', description: 'Numbered step sequence', fields: { headline: 'max:60', items: 'min:2,max:8' } },
    { type: 'telemetry', description: 'Stats grid with values and labels', fields: { headline: 'max:60', stats: 'min:2,max:8' } },
    { type: 'table', description: 'Data table with headers and rows', fields: { headline: 'max:60', headers: 'max:5', rows: 'max:8' } },
    { type: 'image-split', description: 'Headline and body with image side', fields: { headline: 'max:60', bodyText: 'max:200', imageUrl: 'optional' } },
    { type: 'image-cover', description: 'Full-bleed image with headline overlay', fields: { headline: 'max:60', subtext: 'max:200', imageUrl: 'optional' } },
    { type: 'cta', description: 'Call to action with button and social handle', fields: { headline: 'max:60', subtext: 'max:150', actionLabel: 'max:30', socialHandle: 'max:40' } },
  ],
};

export default IndustrialBrutalTemplate;

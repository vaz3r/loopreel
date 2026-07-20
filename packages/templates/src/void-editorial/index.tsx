import type { VoidSlide } from './schema.js';
import {
  getHeadlineStyle,
  getBodyStyle,
  getThemeColors,
} from './engine.js';

const T = getThemeColors();

/* ─── Structural Components ─── */

function RegMarks() {
  const size = 30;
  const border = `2px solid ${T.border}`;
  return (
    <div
      style={{
        position: 'absolute',
        inset: 60,
        pointerEvents: 'none',
        zIndex: 10,
        opacity: 0.15,
      }}
    >
      <div style={{ position: 'absolute', width: size, height: size, top: 0, left: 0, borderTop: border, borderLeft: border }} />
      <div style={{ position: 'absolute', width: size, height: size, top: 0, right: 0, borderTop: border, borderRight: border }} />
      <div style={{ position: 'absolute', width: size, height: size, bottom: 0, left: 0, borderBottom: border, borderLeft: border }} />
      <div style={{ position: 'absolute', width: size, height: size, bottom: 0, right: 0, borderBottom: border, borderRight: border }} />
    </div>
  );
}

function Crosshairs() {
  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: '50%',
          height: '1px',
          background: T.gridBorder,
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: '50%',
          width: '1px',
          background: T.gridBorder,
          zIndex: 1,
        }}
      />
    </>
  );
}

function SafeArea({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 140,
        bottom: 140,
        left: 80,
        right: 80,
        display: 'flex',
        flexDirection: 'column',
        zIndex: 5,
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  );
}

function MicroHeader({ tag }: { tag: string }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 70,
        left: 80,
        right: 80,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 10,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div
          style={{
            width: 28,
            height: 2,
            background: T.accent,
          }}
        />
        <span
          style={{
            fontFamily: T.fontSans,
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(244,244,240,0.5)',
          }}
        >
          {tag}
        </span>
      </div>
    </div>
  );
}

function MicroFooter({ footerLeft, footerRight }: { footerLeft: string; footerRight: string }) {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 70,
        left: 80,
        right: 80,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        zIndex: 10,
      }}
    >
      <span
        style={{
          fontFamily: T.fontSans,
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'rgba(244,244,240,0.35)',
        }}
      >
        {footerLeft}
      </span>
      <span
        style={{
          fontFamily: T.fontSans,
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'rgba(244,244,240,0.35)',
        }}
      >
        {footerRight}
      </span>
    </div>
  );
}

/* ─── Slide Layouts ─── */

function CoverSlide({ slide }: { slide: Extract<VoidSlide, { type: 'cover' }> }) {
  const headlineStyle = getHeadlineStyle(slide.headline);
  return (
    <SafeArea>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h1
          style={{
            fontFamily: T.fontSerif,
            fontSize: headlineStyle.fontSize,
            fontWeight: headlineStyle.fontWeight,
            fontStyle: headlineStyle.fontStyle,
            textTransform: headlineStyle.textTransform as React.CSSProperties['textTransform'],
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
            margin: 0,
            color: T.text,
          }}
        >
          {slide.headline}
        </h1>
        {slide.subheadline && (
          <p
            style={{
              fontFamily: T.fontSans,
              fontSize: 22,
              fontWeight: 300,
              lineHeight: 1.5,
              color: 'rgba(244,244,240,0.6)',
              marginTop: 32,
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
              borderTop: `1px solid ${T.border}`,
              fontFamily: T.fontMono,
              fontSize: 13,
              fontWeight: 400,
              color: 'rgba(244,244,240,0.35)',
              letterSpacing: '0.05em',
            }}
          >
            {slide.metadata}
          </div>
        )}
      </div>
    </SafeArea>
  );
}

function DefinitionSlide({ slide }: { slide: Extract<VoidSlide, { type: 'definition' }> }) {
  return (
    <SafeArea>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ marginBottom: 48 }}>
          <h2
            style={{
              fontFamily: T.fontSerif,
              fontSize: 90,
              fontWeight: 300,
              fontStyle: 'italic',
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
              margin: 0,
              color: T.text,
            }}
          >
            {slide.term}
          </h2>
          {slide.phonetic && (
            <span
              style={{
                fontFamily: T.fontMono,
                fontSize: 16,
                color: 'rgba(244,244,240,0.4)',
                marginTop: 12,
                display: 'block',
              }}
            >
              {slide.phonetic}
            </span>
          )}
        </div>
        <div style={{ width: 40, height: 2, background: T.accent, marginBottom: 32 }} />
        <p
          style={{
            fontFamily: T.fontSans,
            fontSize: 28,
            fontWeight: 300,
            lineHeight: 1.6,
            color: 'rgba(244,244,240,0.8)',
            margin: 0,
            maxWidth: 750,
          }}
        >
          {slide.definition}
        </p>
        {slide.example && (
          <p
            style={{
              fontFamily: T.fontSans,
              fontSize: 18,
              fontWeight: 400,
              fontStyle: 'italic',
              lineHeight: 1.5,
              color: 'rgba(244,244,240,0.4)',
              marginTop: 24,
              maxWidth: 700,
            }}
          >
            {slide.example}
          </p>
        )}
      </div>
    </SafeArea>
  );
}

function DichotomySlide({ slide }: { slide: Extract<VoidSlide, { type: 'dichotomy' }> }) {
  const headlineStyle = getHeadlineStyle(slide.headline);
  return (
    <SafeArea>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h2
          style={{
            fontFamily: T.fontSerif,
            fontSize: headlineStyle.fontSize,
            fontWeight: headlineStyle.fontWeight,
            fontStyle: headlineStyle.fontStyle,
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
            margin: 0,
            marginBottom: 64,
            color: T.text,
          }}
        >
          {slide.headline}
        </h2>
        <div style={{ display: 'flex', gap: 48 }}>
          <div style={{ flex: 1 }}>
            <h3
              style={{
                fontFamily: T.fontSans,
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: T.accent,
                margin: 0,
                marginBottom: 16,
              }}
            >
              {slide.left.title}
            </h3>
            <p
              style={{
                fontFamily: T.fontSans,
                fontSize: 22,
                fontWeight: 300,
                lineHeight: 1.5,
                color: 'rgba(244,244,240,0.65)',
                margin: 0,
              }}
            >
              {slide.left.desc}
            </p>
          </div>
          <div style={{ width: 1, background: T.border, alignSelf: 'stretch' }} />
          <div style={{ flex: 1 }}>
            <h3
              style={{
                fontFamily: T.fontSans,
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: T.accent,
                margin: 0,
                marginBottom: 16,
              }}
            >
              {slide.right.title}
            </h3>
            <p
              style={{
                fontFamily: T.fontSans,
                fontSize: 22,
                fontWeight: 300,
                lineHeight: 1.5,
                color: 'rgba(244,244,240,0.65)',
                margin: 0,
              }}
            >
              {slide.right.desc}
            </p>
          </div>
        </div>
      </div>
    </SafeArea>
  );
}

function TimelineSlide({ slide }: { slide: Extract<VoidSlide, { type: 'timeline' }> }) {
  const headlineStyle = getHeadlineStyle(slide.headline);
  return (
    <SafeArea>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h2
          style={{
            fontFamily: T.fontSerif,
            fontSize: headlineStyle.fontSize,
            fontWeight: headlineStyle.fontWeight,
            fontStyle: headlineStyle.fontStyle,
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
            margin: 0,
            marginBottom: 48,
            color: T.text,
          }}
        >
          {slide.headline}
        </h2>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0 }}>
          {slide.events.map((event, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: 32,
                paddingTop: 24,
                paddingBottom: 24,
                borderTop: i === 0 ? `1px solid ${T.border}` : 'none',
                borderBottom: `1px solid ${T.border}`,
              }}
            >
              <span
                style={{
                  fontFamily: T.fontMono,
                  fontSize: 14,
                  color: 'rgba(244,244,240,0.35)',
                  minWidth: 100,
                  paddingTop: 4,
                }}
              >
                {event.date}
              </span>
              <div>
                <h4
                  style={{
                    fontFamily: T.fontSans,
                    fontSize: 22,
                    fontWeight: 600,
                    color: T.text,
                    margin: 0,
                    marginBottom: 6,
                  }}
                >
                  {event.title}
                </h4>
                <p
                  style={{
                    fontFamily: T.fontSans,
                    fontSize: 16,
                    fontWeight: 300,
                    lineHeight: 1.4,
                    color: 'rgba(244,244,240,0.5)',
                    margin: 0,
                  }}
                >
                  {event.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SafeArea>
  );
}

function QuoteSlide({ slide }: { slide: Extract<VoidSlide, { type: 'quote' }> }) {
  const bodyStyle = getBodyStyle(slide.quote);
  return (
    <SafeArea>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
        <div
          style={{
            fontFamily: T.fontSerif,
            fontSize: 120,
            lineHeight: 0.5,
            color: T.accent,
            opacity: 0.5,
            marginBottom: -8,
          }}
        >
          &ldquo;
        </div>
        <p
          style={{
            fontFamily: T.fontSerif,
            fontSize: bodyStyle.fontSize,
            fontWeight: bodyStyle.fontWeight,
            fontStyle: 'italic',
            lineHeight: 1.2,
            color: T.text,
            margin: '0 0 40px 0',
            maxWidth: 800,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          {slide.quote}
        </p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
          }}
        >
          <div style={{ width: 32, height: 1, background: T.accent }} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <span
              style={{
                fontFamily: T.fontSans,
                fontSize: 16,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(244,244,240,0.7)',
              }}
            >
              {slide.author}
            </span>
            {slide.role && (
              <span
                style={{
                  fontFamily: T.fontSans,
                  fontSize: 13,
                  fontWeight: 400,
                  color: 'rgba(244,244,240,0.35)',
                }}
              >
                {slide.role}
              </span>
            )}
          </div>
          <div style={{ width: 32, height: 1, background: T.accent }} />
        </div>
      </div>
    </SafeArea>
  );
}

function SequenceSlide({ slide }: { slide: Extract<VoidSlide, { type: 'sequence' }> }) {
  const headlineStyle = getHeadlineStyle(slide.headline);
  return (
    <SafeArea>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h2
          style={{
            fontFamily: T.fontSerif,
            fontSize: headlineStyle.fontSize,
            fontWeight: headlineStyle.fontWeight,
            fontStyle: headlineStyle.fontStyle,
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
            margin: 0,
            marginBottom: 48,
            color: T.text,
          }}
        >
          {slide.headline}
        </h2>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0 }}>
          {slide.items.map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 24,
                paddingTop: 20,
                paddingBottom: 20,
                borderTop: i === 0 ? `1px solid ${T.border}` : 'none',
                borderBottom: `1px solid ${T.border}`,
              }}
            >
              <span
                style={{
                  fontFamily: T.fontMono,
                  fontSize: 32,
                  fontWeight: 300,
                  color: T.accent,
                  minWidth: 48,
                  lineHeight: 1,
                }}
              >
                {String(item.num).padStart(2, '0')}
              </span>
              <div>
                <h4
                  style={{
                    fontFamily: T.fontSans,
                    fontSize: 20,
                    fontWeight: 600,
                    color: T.text,
                    margin: 0,
                    marginBottom: 4,
                  }}
                >
                  {item.title}
                </h4>
                <p
                  style={{
                    fontFamily: T.fontSans,
                    fontSize: 16,
                    fontWeight: 300,
                    lineHeight: 1.4,
                    color: 'rgba(244,244,240,0.5)',
                    margin: 0,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SafeArea>
  );
}

function TelemetrySlide({ slide }: { slide: Extract<VoidSlide, { type: 'telemetry' }> }) {
  const headlineStyle = getHeadlineStyle(slide.headline);
  return (
    <SafeArea>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h2
          style={{
            fontFamily: T.fontSerif,
            fontSize: headlineStyle.fontSize,
            fontWeight: headlineStyle.fontWeight,
            fontStyle: headlineStyle.fontStyle,
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
            margin: 0,
            marginBottom: 56,
            color: T.text,
          }}
        >
          {slide.headline}
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: slide.stats.length <= 4 ? '1fr 1fr' : '1fr 1fr 1fr',
            gap: '40px 48px',
          }}
        >
          {slide.stats.map((stat, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontFamily: T.fontSerif,
                  fontSize: 64,
                  fontWeight: 300,
                  fontStyle: 'italic',
                  lineHeight: 1,
                  color: T.accent,
                  marginBottom: 12,
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  fontFamily: T.fontSans,
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(244,244,240,0.45)',
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </SafeArea>
  );
}

function TableSlide({ slide }: { slide: Extract<VoidSlide, { type: 'table' }> }) {
  const headlineStyle = getHeadlineStyle(slide.headline);
  return (
    <SafeArea>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h2
          style={{
            fontFamily: T.fontSerif,
            fontSize: headlineStyle.fontSize,
            fontWeight: headlineStyle.fontWeight,
            fontStyle: headlineStyle.fontStyle,
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
            margin: 0,
            marginBottom: 40,
            color: T.text,
          }}
        >
          {slide.headline}
        </h2>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: slide.headers.map(() => '1fr').join(' '),
              gap: 0,
              borderBottom: `1px solid ${T.border}`,
              paddingBottom: 16,
              marginBottom: 8,
            }}
          >
            {slide.headers.map((header, i) => (
              <span
                key={i}
                style={{
                  fontFamily: T.fontSans,
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(244,244,240,0.4)',
                }}
              >
                {header}
              </span>
            ))}
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {slide.rows.map((row, ri) => (
              <div
                key={ri}
                style={{
                  display: 'grid',
                  gridTemplateColumns: slide.headers.map(() => '1fr').join(' '),
                  gap: 0,
                  borderBottom: `1px solid ${T.gridBorder}`,
                  paddingTop: 14,
                  paddingBottom: 14,
                }}
              >
                {row.map((cell, ci) => (
                  <span
                    key={ci}
                    style={{
                      fontFamily: T.fontSans,
                      fontSize: 16,
                      fontWeight: 400,
                      color: 'rgba(244,244,240,0.7)',
                    }}
                  >
                    {cell}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SafeArea>
  );
}

function ImageSplitSlide({ slide }: { slide: Extract<VoidSlide, { type: 'image-split' }> }) {
  const headlineStyle = getHeadlineStyle(slide.headline);
  const bodyStyle = getBodyStyle(slide.bodyText);
  const imgUrl = slide.imageUrl || (slide.imageKeywords
    ? `https://source.unsplash.com/800x1000/?${encodeURIComponent(slide.imageKeywords)}`
    : undefined);
  return (
    <SafeArea>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 48 }}>
        <div style={{ flex: '1 1 50%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2
            style={{
              fontFamily: T.fontSerif,
              fontSize: headlineStyle.fontSize,
              fontWeight: headlineStyle.fontWeight,
              fontStyle: headlineStyle.fontStyle,
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
              margin: 0,
              marginBottom: 24,
              color: T.text,
            }}
          >
            {slide.headline}
          </h2>
          <p
            style={{
              fontFamily: T.fontSans,
              fontSize: bodyStyle.fontSize,
              fontWeight: bodyStyle.fontWeight,
              lineHeight: 1.5,
              color: 'rgba(244,244,240,0.6)',
              margin: 0,
              maxWidth: 500,
            }}
          >
            {slide.bodyText}
          </p>
        </div>
        {imgUrl && (
          <div
            style={{
              flex: '1 1 50%',
              borderRadius: 4,
              overflow: 'hidden',
              background: 'linear-gradient(135deg, rgba(244,244,240,0.03), rgba(244,244,240,0.01))',
            }}
          >
            <img
              src={imgUrl}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'grayscale(30%) contrast(1.1)',
              }}
            />
          </div>
        )}
      </div>
    </SafeArea>
  );
}

function ImageCoverSlide({ slide }: { slide: Extract<VoidSlide, { type: 'image-cover' }> }) {
  const headlineStyle = getHeadlineStyle(slide.headline);
  const imgUrl = slide.imageUrl || (slide.imageKeywords
    ? `https://source.unsplash.com/1080x1350/?${encodeURIComponent(slide.imageKeywords)}`
    : undefined);
  return (
    <>
      {imgUrl && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
          }}
        >
          <img
            src={imgUrl}
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'grayscale(40%) contrast(1.1) brightness(0.6)',
            }}
          />
        </div>
      )}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.4) 50%, rgba(5,5,5,0.2) 100%)',
          zIndex: 2,
        }}
      />
      <SafeArea>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <h2
            style={{
              fontFamily: T.fontSerif,
              fontSize: headlineStyle.fontSize,
              fontWeight: headlineStyle.fontWeight,
              fontStyle: headlineStyle.fontStyle,
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
              margin: 0,
              marginBottom: 20,
              color: T.text,
            }}
          >
            {slide.headline}
          </h2>
          {slide.subtext && (
            <p
              style={{
                fontFamily: T.fontSans,
                fontSize: 20,
                fontWeight: 300,
                lineHeight: 1.5,
                color: 'rgba(244,244,240,0.6)',
                margin: 0,
                maxWidth: 650,
              }}
            >
              {slide.subtext}
            </p>
          )}
        </div>
      </SafeArea>
    </>
  );
}

function CtaSlide({ slide }: { slide: Extract<VoidSlide, { type: 'cta' }> }) {
  const headlineStyle = getHeadlineStyle(slide.headline);
  return (
    <SafeArea>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <h2
          style={{
            fontFamily: T.fontSerif,
            fontSize: headlineStyle.fontSize,
            fontWeight: headlineStyle.fontWeight,
            fontStyle: headlineStyle.fontStyle,
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
            margin: 0,
            marginBottom: slide.subtext ? 24 : 48,
            color: T.text,
            maxWidth: 800,
          }}
        >
          {slide.headline}
        </h2>
        {slide.subtext && (
          <p
            style={{
              fontFamily: T.fontSans,
              fontSize: 20,
              fontWeight: 300,
              lineHeight: 1.5,
              color: 'rgba(244,244,240,0.5)',
              margin: 0,
              marginBottom: 48,
              maxWidth: 500,
            }}
          >
            {slide.subtext}
          </p>
        )}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            padding: '18px 48px',
            border: `1.5px solid ${T.accent}`,
            borderRadius: 0,
            fontFamily: T.fontSans,
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: T.accent,
          }}
        >
          {slide.actionLabel}
          <span style={{ fontSize: 18, lineHeight: 1 }}>&rarr;</span>
        </div>
        {slide.socialHandle && (
          <span
            style={{
              fontFamily: T.fontMono,
              fontSize: 13,
              color: 'rgba(244,244,240,0.3)',
              marginTop: 32,
            }}
          >
            {slide.socialHandle}
          </span>
        )}
      </div>
    </SafeArea>
  );
}

/* ─── Layout Registry ─── */

const LAYOUTS: Record<string, React.FC<{ slide: VoidSlide }>> = {
  cover: CoverSlide as React.FC<{ slide: VoidSlide }>,
  definition: DefinitionSlide as React.FC<{ slide: VoidSlide }>,
  dichotomy: DichotomySlide as React.FC<{ slide: VoidSlide }>,
  timeline: TimelineSlide as React.FC<{ slide: VoidSlide }>,
  quote: QuoteSlide as React.FC<{ slide: VoidSlide }>,
  sequence: SequenceSlide as React.FC<{ slide: VoidSlide }>,
  telemetry: TelemetrySlide as React.FC<{ slide: VoidSlide }>,
  table: TableSlide as React.FC<{ slide: VoidSlide }>,
  'image-split': ImageSplitSlide as React.FC<{ slide: VoidSlide }>,
  'image-cover': ImageCoverSlide as React.FC<{ slide: VoidSlide }>,
  cta: CtaSlide as React.FC<{ slide: VoidSlide }>,
};

/* ─── Main Component ─── */

export function VoidEditorialComponent({
  slide,
}: {
  slide: VoidSlide;
  meta?: Record<string, unknown>;
  slideIndex?: number;
  slideCount?: number;
}) {
  const Layout = (LAYOUTS[slide.type] ?? CoverSlide) as React.FC<{ slide: VoidSlide }>;

  return (
    <div
      style={{
        position: 'relative',
        width: 1080,
        height: 1350,
        overflow: 'hidden',
        background: T.bg,
        color: T.text,
        fontFamily: T.fontSans,
      }}
    >
      <Crosshairs />
      <RegMarks />
      <MicroHeader tag={slide.tag} />
      <Layout slide={slide} />
      <MicroFooter footerLeft={slide.footerLeft} footerRight={slide.footerRight} />
    </div>
  );
}

export default VoidEditorialComponent;

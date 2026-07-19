import type { ProtocolSlide, ProtocolMeta } from './schema.js';

const THEMES = {
  void: { bg: '#080808', fg: '#F4F4F0', border: 'rgba(244,244,240,0.4)', muted: 'rgba(244,244,240,0.6)', divider: 'rgba(244,244,240,0.2)' },
  bone: { bg: '#F4F4F0', fg: '#080808', border: 'rgba(8,8,8,0.4)', muted: 'rgba(8,8,8,0.6)', divider: 'rgba(8,8,8,0.15)' },
  steel: { bg: '#D1D0CA', fg: '#080808', border: 'rgba(8,8,8,0.4)', muted: 'rgba(8,8,8,0.7)', divider: 'rgba(8,8,8,0.12)' },
} as const;

type ThemeKey = keyof typeof THEMES;
type Theme = (typeof THEMES)[ThemeKey];

const SERIF = "'Cormorant Garamond', 'Times New Roman', serif";
const SANS = "'Manrope', 'Helvetica Neue', sans-serif";

interface Protocol001Props {
  slide: ProtocolSlide;
  meta: ProtocolMeta;
  slideIndex: number;
  slideCount: number;
  format?: string;
  [key: string]: unknown;
}

export function Protocol001Component({ slide, slideIndex, slideCount }: Protocol001Props) {
  const themeKey: ThemeKey = (slide.theme as ThemeKey) in THEMES ? (slide.theme as ThemeKey) : 'void';
  const theme = THEMES[themeKey];
  const Layout = LAYOUTS[slide.type] ?? CoverLayout;

  return (
    <div style={{
      width: '1080px', height: '1350px',
      position: 'relative', overflow: 'hidden',
      background: theme.bg, color: theme.fg,
      display: 'flex', flexDirection: 'column',
      fontFamily: SANS,
    }}>
      <Crosshairs slideType={slide.type} />
      <RegMarks theme={theme} />
      <MicroHeader slide={slide} theme={theme} slideIndex={slideIndex} slideCount={slideCount} />
      <Layout slide={slide} theme={theme} />
      <MicroFooter slide={slide} theme={theme} />
    </div>
  );
}

/* ─── Structural Elements (exact from reference) ─── */

function Crosshairs({ slideType }: { slideType: string }) {
  if (slideType === 'data-list') return null;
  const showX = slideType === 'cover';
  const showY = slideType === 'cover' || slideType === 'quote';
  return (
    <>
      {showX && <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', height: '1px', background: 'rgba(128,128,128,0.15)', zIndex: 1 }} />}
      {showY && <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: '1px', background: 'rgba(128,128,128,0.15)', zIndex: 1 }} />}
    </>
  );
}

function RegMarks({ theme }: { theme: Theme }) {
  const b = `2px solid ${theme.border}`;
  return (
    <div style={{ position: 'absolute', inset: '40px', pointerEvents: 'none', zIndex: 10 }}>
      <div style={{ position: 'absolute', width: 30, height: 30, top: 0, left: 0, borderTop: b, borderLeft: b }} />
      <div style={{ position: 'absolute', width: 30, height: 30, top: 0, right: 0, borderTop: b, borderRight: b }} />
      <div style={{ position: 'absolute', width: 30, height: 30, bottom: 0, left: 0, borderBottom: b, borderLeft: b }} />
      <div style={{ position: 'absolute', width: 30, height: 30, bottom: 0, right: 0, borderBottom: b, borderRight: b }} />
    </div>
  );
}

function MicroHeader({ slide, theme, slideIndex, slideCount }: { slide: ProtocolSlide; theme: Theme; slideIndex: number; slideCount: number }) {
  const left = 'headerLeft' in slide ? slide.headerLeft : '';
  const right = slide.type === 'cover' || slide.type === 'quote'
    ? slide.headerRight
    : `${String(slideIndex + 1).padStart(2, '0')} / ${String(slideCount).padStart(2, '0')}`;
  return (
    <div style={{
      position: 'absolute', top: 70, left: 80, right: 80,
      display: 'flex', justifyContent: 'space-between',
      fontSize: 24, fontWeight: 700, letterSpacing: '0.25em',
      textTransform: 'uppercase', color: theme.muted, zIndex: 5,
    }}>
      <span>{left}</span>
      <span>{right}</span>
    </div>
  );
}

function MicroFooter({ slide, theme }: { slide: ProtocolSlide; theme: Theme }) {
  const left = 'footerLeft' in slide ? slide.footerLeft : '';
  const right = 'footerRight' in slide ? slide.footerRight : '';
  return (
    <div style={{
      position: 'absolute', bottom: 70, left: 80, right: 80,
      display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
      fontSize: 22, fontWeight: 600, letterSpacing: '0.15em',
      textTransform: 'uppercase', color: theme.muted, zIndex: 5,
    }}>
      <span>{left}</span>
      <span>{right}</span>
    </div>
  );
}

/* ─── Slide Layouts (pixel-perfect from reference) ─── */

function CoverLayout({ slide, theme }: { slide: ProtocolSlide; theme: Theme }) {
  const s = slide as Extract<ProtocolSlide, { type: 'cover' }>;
  const words = s.heading.toUpperCase().split(' ').filter(Boolean);
  const mid = Math.floor(words.length / 2) || 1;
  const line1 = words.slice(0, mid).join(' ');
  const line2 = words.slice(mid).join(' ');

  return (
    <>
      <div style={{
        position: 'absolute', top: '48%', left: 40, right: 40,
        transform: 'translateY(-50%)',
        fontFamily: SERIF, fontSize: 250, lineHeight: 0.85,
        letterSpacing: '-0.03em', fontWeight: 300,
        zIndex: 2,
      }}>
        <span style={{ display: 'block', textAlign: 'center' }}>{line1}</span>
        <span style={{ display: 'block', textAlign: 'center', fontStyle: 'italic' }}>{line2}</span>
      </div>

      {s.ticker && (
        <div style={{
          position: 'absolute', bottom: 180, left: 0, right: 0,
          borderTop: `2px solid ${theme.divider}`,
          borderBottom: `2px solid ${theme.divider}`,
          padding: '24px 80px',
          fontSize: 26, fontWeight: 600, letterSpacing: '0.3em',
          textTransform: 'uppercase', color: theme.fg,
          whiteSpace: 'nowrap', zIndex: 2,
        }}>
          {s.ticker}
        </div>
      )}
    </>
  );
}

function DataListLayout({ slide, theme }: { slide: ProtocolSlide; theme: Theme }) {
  const s = slide as Extract<ProtocolSlide, { type: 'data-list' }>;

  return (
    <div style={{
      position: 'absolute', top: 200, left: 80, right: 80, bottom: 160,
      display: 'flex', flexDirection: 'column', zIndex: 3,
    }}>
      <h2 style={{
        fontFamily: SERIF, fontSize: 90, fontWeight: 400,
        lineHeight: 0.95, letterSpacing: '-0.02em', marginBottom: 50,
      }}>
        {s.heading}
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {s.items.map((item, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'flex-start', gap: 30,
            borderTop: `2px solid ${theme.divider}`, paddingTop: 30, paddingBottom: 30,
          }}>
            <span style={{
              fontFamily: SANS, fontSize: 26, fontWeight: 700,
              opacity: 0.5, width: 50,
            }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <div style={{
              fontSize: 38, lineHeight: 1.3, fontWeight: 400,
              maxWidth: 700, fontFamily: SERIF,
            }}>
              <strong style={{
                fontWeight: 600, fontFamily: SANS, fontSize: 28,
                display: 'block', marginBottom: 8,
                textTransform: 'uppercase', letterSpacing: '0.05em',
              }}>
                {item.title}
              </strong>
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuoteLayout({ slide, theme }: { slide: ProtocolSlide; theme: Theme }) {
  const s = slide as Extract<ProtocolSlide, { type: 'quote' }>;
  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      textAlign: 'center', padding: '0 100px', zIndex: 3,
    }}>
      <div style={{ position: 'relative', width: '100%' }}>
        <div style={{
          width: 2, height: 160, background: theme.fg,
          margin: '0 auto 60px',
        }} />
        <div style={{
          fontFamily: SERIF, fontSize: 85, fontWeight: 400,
          fontStyle: 'italic', lineHeight: 1.05, letterSpacing: '-0.01em',
          marginBottom: 60,
        }}>
          {s.quote}
        </div>
        {s.attribution && (
          <div style={{
            fontSize: 24, fontWeight: 700, letterSpacing: '0.25em',
            textTransform: 'uppercase', color: theme.muted,
          }}>
            {s.attribution}
          </div>
        )}
      </div>
    </div>
  );
}

function CtaLayout({ slide, theme }: { slide: ProtocolSlide; theme: Theme }) {
  const s = slide as Extract<ProtocolSlide, { type: 'cta' }>;
  const words = s.heading.split(' ');
  const mid = Math.ceil(words.length / 2);
  const line1 = words.slice(0, mid).join(' ');
  const line2 = words.slice(mid).join(' ');

  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: 'center', zIndex: 3,
    }}>
      <div style={{ position: 'absolute', top: '30%', left: 0, right: 0, height: 2, background: 'rgba(244,244,240,0.1)', zIndex: 1 }} />
      <div style={{ position: 'absolute', top: '70%', left: 0, right: 0, height: 2, background: 'rgba(244,244,240,0.1)', zIndex: 1 }} />

      <div style={{
        fontFamily: SERIF, fontSize: 140, fontWeight: 300,
        lineHeight: 0.9, textAlign: 'center', marginBottom: 80,
        color: theme.fg,
      }}>
        {line1}<br />{line2}
      </div>

      <div style={{
        border: `2px solid ${theme.fg}`, borderRadius: 200,
        padding: '30px 80px', fontSize: 26, fontWeight: 700,
        letterSpacing: '0.25em', textTransform: 'uppercase',
        display: 'flex', alignItems: 'center', gap: 20,
      }}>
        {s.buttonLabel}
        <span style={{ fontFamily: 'sans-serif', fontSize: 32, fontWeight: 300, marginTop: -4 }}>→</span>
      </div>
    </div>
  );
}

const LAYOUTS: Record<string, React.FC<{ slide: ProtocolSlide; theme: Theme }>> = {
  cover: CoverLayout,
  'data-list': DataListLayout,
  quote: QuoteLayout,
  cta: CtaLayout,
};

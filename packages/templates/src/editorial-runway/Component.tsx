import type { EditorialSlide, EditorialMeta } from './schema.js';

const PALETTES = {
  midnight: {
    bg: '#07071A', bgStop: '#16213E', bgEnd: '#0F3460',
    surface: 'rgba(255,255,255,0.06)', surfaceBorder: 'rgba(255,255,255,0.10)',
    text: '#EAECF5', textSecondary: '#8B93B8', accent: '#667EEA',
    accentGlow: 'rgba(102,126,234,0.25)', overlay: 'rgba(7,7,26,0.55)',
  },
  sunset: {
    bg: '#FF6B6B', bgStop: '#EE5A24', bgEnd: '#F79F1F',
    surface: 'rgba(255,255,255,0.12)', surfaceBorder: 'rgba(255,255,255,0.20)',
    text: '#FFFFFF', textSecondary: 'rgba(255,255,255,0.75)', accent: '#FFEAA7',
    accentGlow: 'rgba(255,234,167,0.30)', overlay: 'rgba(200,30,10,0.40)',
  },
  forest: {
    bg: '#0A2916', bgStop: '#0F3D22', bgEnd: '#1B5E20',
    surface: 'rgba(255,255,255,0.06)', surfaceBorder: 'rgba(255,255,255,0.08)',
    text: '#E8F5E9', textSecondary: '#A5D6A7', accent: '#66BB6A',
    accentGlow: 'rgba(102,187,106,0.20)', overlay: 'rgba(10,41,22,0.50)',
  },
  monochrome: {
    bg: '#0D0D0D', bgStop: '#1A1A1A', bgEnd: '#0D0D0D',
    surface: 'rgba(255,255,255,0.04)', surfaceBorder: 'rgba(255,255,255,0.08)',
    text: '#F5F5F5', textSecondary: '#999999', accent: '#FFFFFF',
    accentGlow: 'rgba(255,255,255,0.08)', overlay: 'rgba(13,13,13,0.60)',
  },
  lavender: {
    bg: '#F5F0FF', bgStop: '#EDE2FF', bgEnd: '#E0D0FF',
    surface: 'rgba(255,255,255,0.70)', surfaceBorder: 'rgba(0,0,0,0.06)',
    text: '#1A1033', textSecondary: '#6B5B8C', accent: '#7C3AED',
    accentGlow: 'rgba(124,58,237,0.15)', overlay: 'rgba(245,240,255,0.30)',
  },
  ocean: {
    bg: '#0A2339', bgStop: '#0F3D5C', bgEnd: '#0077B6',
    surface: 'rgba(255,255,255,0.06)', surfaceBorder: 'rgba(255,255,255,0.10)',
    text: '#E0F0FF', textSecondary: '#90CAF9', accent: '#00D4AA',
    accentGlow: 'rgba(0,212,170,0.25)', overlay: 'rgba(10,35,57,0.50)',
  },
  warmMinimal: {
    bg: '#FAF8F5', bgStop: '#F5F0E8', bgEnd: '#EDE4D3',
    surface: 'rgba(255,255,255,0.65)', surfaceBorder: 'rgba(0,0,0,0.05)',
    text: '#1E1B18', textSecondary: '#7A7268', accent: '#D4692B',
    accentGlow: 'rgba(212,105,43,0.12)', overlay: 'rgba(250,248,245,0.25)',
  },
  charcoal: {
    bg: '#1A1A1E', bgStop: '#252530', bgEnd: '#1A1A1E',
    surface: 'rgba(255,255,255,0.05)', surfaceBorder: 'rgba(255,255,255,0.06)',
    text: '#F0F0F0', textSecondary: '#888892', accent: '#F59E0B',
    accentGlow: 'rgba(245,158,11,0.20)', overlay: 'rgba(26,26,30,0.55)',
  },
  roseGold: {
    bg: '#1C1018', bgStop: '#2D1828', bgEnd: '#1C1018',
    surface: 'rgba(255,255,255,0.05)', surfaceBorder: 'rgba(255,255,255,0.07)',
    text: '#F5EEF2', textSecondary: '#C9A8BB', accent: '#F0A8BC',
    accentGlow: 'rgba(240,168,188,0.22)', overlay: 'rgba(28,16,24,0.50)',
  },
  nordic: {
    bg: '#F0F4F8', bgStop: '#E2E8F0', bgEnd: '#CBD5E1',
    surface: 'rgba(255,255,255,0.60)', surfaceBorder: 'rgba(0,0,0,0.04)',
    text: '#0F172A', textSecondary: '#64748B', accent: '#2563EB',
    accentGlow: 'rgba(37,99,235,0.12)', overlay: 'rgba(240,244,248,0.20)',
  },
  terracotta: {
    bg: '#E2725A', bgStop: '#CC5544', bgEnd: '#B83A2A',
    surface: 'rgba(255,255,255,0.10)', surfaceBorder: 'rgba(255,255,255,0.15)',
    text: '#FFF5F0', textSecondary: 'rgba(255,245,240,0.70)', accent: '#FFD166',
    accentGlow: 'rgba(255,209,102,0.25)', overlay: 'rgba(180,50,30,0.35)',
  },
} as const;

const PALETTE_ALIASES: Record<string, PaletteKey> = {
  'ink-paper': 'warmMinimal',
  'high-contrast': 'monochrome',
  'accent-flood': 'sunset',
  'inverted': 'midnight',
};

type PaletteKey = keyof typeof PALETTES;
type Palette = (typeof PALETTES)[PaletteKey];

const FONT_FAMILIES = {
  heading: "'Inter', 'Helvetica Neue', sans-serif",
  display: "'Playfair Display', 'Georgia', serif",
  body: "'Inter', 'Helvetica Neue', sans-serif",
  mono: "'JetBrains Mono', 'SF Mono', monospace",
  tag: "'Inter', 'Helvetica Neue', sans-serif",
} as const;

function fontSize(heading: 'h1' | 'h2' | 'h3', body: 'large' | 'medium' | 'small') {
  const HEADING_SIZES = { h1: '68px', h2: '48px', h3: '36px' };
  const BODY_SIZES = { large: '24px', medium: '20px', small: '16px' };
  return { heading: HEADING_SIZES[heading], body: BODY_SIZES[body] };
}

const TYPOGRAPHY = {
  hero: fontSize('h1', 'large'),
  display: fontSize('h2', 'medium'),
  standard: fontSize('h2', 'medium'),
  compact: fontSize('h3', 'small'),
  stat: { value: '120px', label: '16px', body: '20px' },
  quote: { quote: '32px', attribution: '14px' },
} as const;

function getDimensions(format: string) {
  if (format === 'portrait') return { width: 1080, height: 1350 };
  if (format === 'story') return { width: 1080, height: 1920 };
  return { width: 1080, height: 1080 };
}

interface TemplateProps {
  slide: EditorialSlide;
  meta: EditorialMeta;
  slideIndex: number;
  slideCount: number;
  format?: string;
}

export function EditorialRunwayComponent({
  slide,
  meta,
  slideIndex,
  slideCount,
  format = 'square',
}: TemplateProps) {
  const dims = getDimensions(format);
  const rawKey = slide.palette as string;
  const paletteKey: PaletteKey = PALETTE_ALIASES[rawKey] ?? ((rawKey as PaletteKey) in PALETTES ? (rawKey as PaletteKey) : 'midnight');
  const palette = PALETTES[paletteKey];
  const LayoutComponent = LAYOUT_MAP[slide.layout] ?? HeroCenterLayout;

  const gradientCss = `radial-gradient(ellipse 80% 80% at 30% 20%, ${palette.bgStop} 0%, ${palette.bg} 100%), linear-gradient(135deg, ${palette.bgEnd} 0%, ${palette.bgStop} 50%, ${palette.bg} 100%)`;

  return (
    <div style={{ position: 'relative', width: `${dims.width}px`, height: `${dims.height}px`, overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: gradientCss,
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          radial-gradient(circle at 25% 65%, ${hexToRgba(palette.accent, 0.06)} 0%, transparent 50%),
          radial-gradient(circle at 75% 35%, ${hexToRgba(palette.accent, 0.04)} 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, ${hexToRgba(palette.accent, 0.02)} 0%, transparent 70%)
        `,
      }} />
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.03,
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 2px, ${palette.text} 2px, ${palette.text} 3px),
          repeating-linear-gradient(90deg, transparent, transparent 2px, ${palette.text} 2px, ${palette.text} 3px)
        `,
        backgroundSize: '40px 40px',
      }} />
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.025,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
      }} />

      <AccentGlow palette={palette} dims={dims} slideIndex={slideIndex} slideType={slide.type} />
      <DecorativeShapes palette={palette} dims={dims} slideType={slide.type} />

      <div style={{
        position: 'relative', zIndex: 10,
        width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column',
        padding: '64px 80px',
        boxSizing: 'border-box',
        fontFamily: FONT_FAMILIES.body,
        color: palette.text,
      }}>
        <HeaderBar category={meta.category} pageIndex={slideIndex} total={slideCount} palette={palette} />

        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <LayoutComponent slide={slide} palette={palette} slideIndex={slideIndex} slideCount={slideCount} />
        </div>

        {slideIndex === slideCount - 1 && <CreditFooter meta={meta} palette={palette} />}
      </div>
    </div>
  );
}

function HeaderBar({
  category, pageIndex, total, palette,
}: {
  category: string;
  pageIndex: number;
  total: number;
  palette: Palette;
}) {
  const accentBar = `${palette.accent}33`;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      marginBottom: '56px', fontFamily: FONT_FAMILIES.tag,
      fontWeight: 600, fontSize: '13px', letterSpacing: '0.18em',
      textTransform: 'uppercase', color: palette.textSecondary,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{ width: '32px', height: '2px', background: palette.accent, borderRadius: '1px' }} />
        <span>{category}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            style={{
              width: i === pageIndex ? '24px' : '6px',
              height: '3px',
              borderRadius: '2px',
              background: i === pageIndex ? palette.accent : accentBar,
              transition: 'none',
            }}
          />
        ))}
      </div>
      <span style={{ fontSize: '12px', fontFamily: FONT_FAMILIES.mono, color: palette.textSecondary }}>
        {String(pageIndex + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
      </span>
    </div>
  );
}

function CreditFooter({ meta, palette }: { meta: EditorialMeta; palette: Palette }) {
  return (
    <div style={{
      marginTop: 'auto', paddingTop: '24px',
      borderTop: `1px solid ${hexToRgba(palette.text, 0.10)}`,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      fontFamily: FONT_FAMILIES.tag, fontSize: '13px', color: palette.textSecondary,
      letterSpacing: '0.03em',
    }}>
      <span>{meta.seriesName}</span>
      <span>{meta.authorName} &middot; {meta.handle}</span>
    </div>
  );
}

function AccentGlow({
  palette, dims, slideIndex, slideType,
}: {
  palette: Palette;
  dims: { width: number; height: number };
  slideIndex: number;
  slideType: string;
}) {
  const isHero = slideType === 'hook' || slideType === 'cta';
  const size = isHero ? Math.max(dims.width, dims.height) * 1.2 : Math.max(dims.width, dims.height) * 0.6;
  const xOffsets = ['25%', '70%', '40%', '60%', '30%'];
  const yOffsets = ['60%', '30%', '50%', '35%', '65%'];
  const idx = slideIndex % xOffsets.length;

  return (
    <>
      <div style={{
        position: 'absolute', zIndex: 2,
        left: xOffsets[idx], top: yOffsets[idx],
        width: `${size}px`, height: `${size}px`,
        transform: 'translate(-50%, -50%)',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${palette.accentGlow} 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />
      {isHero && (
        <div style={{
          position: 'absolute', zIndex: 2,
          right: xOffsets[(idx + 2) % 5], bottom: yOffsets[(idx + 2) % 5],
          width: `${size * 0.7}px`, height: `${size * 0.7}px`,
          transform: 'translate(50%, 50%)',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${palette.accentGlow} 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />
      )}
    </>
  );
}

function DecorativeShapes({
  palette, dims, slideType,
}: {
  palette: Palette;
  dims: { width: number; height: number };
  slideType: string;
}) {
  const ringSize = Math.min(dims.width, dims.height) * 0.15;

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none' }}>
      <div style={{
        position: 'absolute', right: '7%', top: '12%',
        width: `${ringSize}px`, height: `${ringSize}px`,
        borderRadius: '50%',
        border: `1px solid ${hexToRgba(palette.accent, 0.12)}`,
      }} />
      <div style={{
        position: 'absolute', right: `calc(7% + ${ringSize * 0.35}px)`, top: `calc(12% + ${ringSize * 0.35}px)`,
        width: `${ringSize * 0.3}px`, height: `${ringSize * 0.3}px`,
        borderRadius: '50%',
        background: hexToRgba(palette.accent, 0.08),
      }} />
      {slideType === 'stat' && (
        <div style={{
          position: 'absolute', left: '8%', bottom: '18%',
          width: `${Math.min(dims.width * 0.06, 60)}px`,
          height: `${Math.min(dims.width * 0.06, 60)}px`,
          border: `2px solid ${hexToRgba(palette.accent, 0.10)}`,
          transform: 'rotate(12deg)',
        }} />
      )}
      <div style={{
        position: 'absolute', left: '5%', top: '50%',
        width: '40px', height: '2px',
        background: `linear-gradient(90deg, ${hexToRgba(palette.accent, 0.15)}, transparent)`,
      }} />
    </div>
  );
}

interface LayoutProps {
  slide: EditorialSlide;
  palette: Palette;
  slideIndex: number;
  slideCount: number;
}

function HeroCenterLayout({ slide, palette }: LayoutProps) {
  const heading = 'heading' in slide ? slide.heading : '';
  const subtitle = 'subtitle' in slide ? slide.subtitle : undefined;
  const body = 'body' in slide ? slide.body : undefined;

  return (
    <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto' }}>
      <h1 style={{
        fontFamily: FONT_FAMILIES.display, fontSize: TYPOGRAPHY.hero.heading,
        fontWeight: 700, lineHeight: 1.05, margin: 0,
        letterSpacing: '-0.025em',
      }}>
        {heading}
      </h1>
      {subtitle && (
        <p style={{
          fontFamily: FONT_FAMILIES.body, fontSize: TYPOGRAPHY.hero.body,
          fontWeight: 400, color: palette.textSecondary,
          marginTop: '24px', lineHeight: 1.45, maxWidth: '620px', marginLeft: 'auto', marginRight: 'auto',
        }}>
          {subtitle}
        </p>
      )}
      {body && (
        <div style={{
          marginTop: '36px', display: 'inline-block',
          padding: '16px 32px', borderRadius: '12px',
          background: palette.surface,
          border: `1px solid ${palette.surfaceBorder}`,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}>
          <p style={{
            fontFamily: FONT_FAMILIES.body, fontSize: TYPOGRAPHY.standard.body,
            fontWeight: 400, color: palette.textSecondary, margin: 0, lineHeight: 1.5,
          }}>
            {body}
          </p>
        </div>
      )}
    </div>
  );
}

function SplitLayout({ slide, palette }: LayoutProps) {
  const heading = 'heading' in slide ? slide.heading : '';
  const body = 'body' in slide ? slide.body : undefined;
  const items = 'items' in slide ? slide.items : undefined;

  return (
    <div style={{ display: 'flex', gap: '64px', alignItems: 'center', width: '100%' }}>
      <div style={{ flex: '1 1 45%' }}>
        <h2 style={{
          fontFamily: FONT_FAMILIES.heading, fontSize: TYPOGRAPHY.display.heading,
          fontWeight: 700, lineHeight: 1.08, margin: 0, letterSpacing: '-0.02em',
        }}>
          {heading}
        </h2>
        {body && (
          <p style={{
            fontFamily: FONT_FAMILIES.body, fontSize: TYPOGRAPHY.display.body,
            color: palette.textSecondary, marginTop: '20px', lineHeight: 1.5,
          }}>
            {body}
          </p>
        )}
      </div>
      {items && (
        <div style={{ flex: '1 1 45%', display: 'flex', flexDirection: 'column', gap: '0px' }}>
          {items.map((item, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'flex-start', gap: '20px',
              padding: '20px 0',
              borderBottom: i < items.length - 1 ? `1px solid ${hexToRgba(palette.text, 0.08)}` : undefined,
            }}>
              <span style={{
                fontFamily: FONT_FAMILIES.mono, fontSize: '14px', fontWeight: 500,
                color: palette.accent, minWidth: '28px', paddingTop: '3px',
              }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span style={{
                fontFamily: FONT_FAMILIES.body, fontSize: TYPOGRAPHY.standard.body,
                fontWeight: 400, lineHeight: 1.45,
              }}>
                {item}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ContentCardLayout({ slide, palette }: LayoutProps) {
  const heading = 'heading' in slide ? slide.heading : '';
  const body = 'body' in slide ? slide.body : undefined;

  return (
    <div style={{
      maxWidth: '780px', margin: '0 auto', width: '100%',
      padding: '56px 64px', borderRadius: '20px',
      background: palette.surface,
      border: `1px solid ${palette.surfaceBorder}`,
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      boxShadow: `0 8px 32px ${hexToRgba(palette.bg, 0.3)}`,
    }}>
      <h2 style={{
        fontFamily: FONT_FAMILIES.heading, fontSize: TYPOGRAPHY.display.heading,
        fontWeight: 700, lineHeight: 1.08, margin: 0, letterSpacing: '-0.02em',
      }}>
        {heading}
      </h2>
      {body && (
        <p style={{
          fontFamily: FONT_FAMILIES.body, fontSize: TYPOGRAPHY.display.body,
          color: palette.textSecondary, marginTop: '24px', lineHeight: 1.6,
        }}>
          {body}
        </p>
      )}
    </div>
  );
}

function StatLayout({ slide, palette }: LayoutProps) {
  const value = 'value' in slide ? slide.value : '';
  const label = 'label' in slide ? slide.label : '';
  const body = 'body' in slide ? slide.body : undefined;

  return (
    <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto' }}>
      <div style={{
        display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '8px',
      }}>
        <span style={{
          fontFamily: FONT_FAMILIES.heading, fontSize: TYPOGRAPHY.stat.value,
          fontWeight: 800, lineHeight: 0.9, color: palette.accent,
          letterSpacing: '-0.03em',
        }}>
          {value}
        </span>
        {label && (
          <span style={{
            fontFamily: FONT_FAMILIES.tag, fontSize: TYPOGRAPHY.stat.label,
            fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase',
            color: palette.textSecondary,
          }}>
            {label}
          </span>
        )}
      </div>
      {body && (
        <p style={{
          fontFamily: FONT_FAMILIES.body, fontSize: TYPOGRAPHY.stat.body,
          color: palette.textSecondary, marginTop: '28px', lineHeight: 1.6,
          maxWidth: '540px', marginLeft: 'auto', marginRight: 'auto',
        }}>
          {body}
        </p>
      )}
    </div>
  );
}

function QuoteLayout({ slide, palette }: LayoutProps) {
  const quote = 'quote' in slide ? slide.quote : '';
  const attribution = 'attribution' in slide ? slide.attribution : '';

  return (
    <div style={{ maxWidth: '760px', margin: '0 auto' }}>
      <div style={{
        fontFamily: FONT_FAMILIES.display, fontSize: '120px', lineHeight: 0.5,
        color: palette.accent, fontWeight: 700, opacity: 0.5,
        marginBottom: '-8px',
      }}>
        &ldquo;
      </div>
      <p style={{
        fontFamily: FONT_FAMILIES.display, fontStyle: 'italic',
        fontSize: TYPOGRAPHY.quote.quote, lineHeight: 1.25, fontWeight: 400,
        margin: '0 0 32px 0',
      }}>
        {quote}
      </p>
      {attribution && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '14px',
          paddingTop: '20px',
          borderTop: `1px solid ${hexToRgba(palette.text, 0.10)}`,
        }}>
          <div style={{
            width: '36px', height: '2px', background: palette.accent, borderRadius: '1px',
          }} />
          <span style={{
            fontFamily: FONT_FAMILIES.tag, fontSize: TYPOGRAPHY.quote.attribution,
            fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase',
            color: palette.textSecondary,
          }}>
            {attribution}
          </span>
        </div>
      )}
    </div>
  );
}

function CtaLayout({ slide, palette }: LayoutProps) {
  const heading = 'heading' in slide ? slide.heading : '';
  const buttonLabel = 'buttonLabel' in slide ? slide.buttonLabel : 'Learn more';

  return (
    <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
      <h2 style={{
        fontFamily: FONT_FAMILIES.display, fontSize: TYPOGRAPHY.hero.heading,
        fontWeight: 700, lineHeight: 1.05, margin: 0,
        letterSpacing: '-0.025em',
      }}>
        {heading}
      </h2>
      <div style={{
        marginTop: '48px',
        display: 'inline-flex', alignItems: 'center', gap: '12px',
        padding: '18px 40px', borderRadius: '14px',
        background: palette.accent,
        color: isLightColor(palette.accent) ? '#0D0D0D' : '#FFFFFF',
        fontFamily: FONT_FAMILIES.heading, fontSize: '18px', fontWeight: 700,
        letterSpacing: '0.02em',
        boxShadow: `0 4px 24px ${hexToRgba(palette.accent, 0.35)}`,
      }}>
        {buttonLabel}
        <span style={{ fontSize: '20px', lineHeight: 1 }}>&rarr;</span>
      </div>
    </div>
  );
}

const LAYOUT_MAP: Record<string, React.FC<LayoutProps>> = {
  'centered-display': HeroCenterLayout,
  'left-aligned-text': ContentCardLayout,
  'split-screen': SplitLayout,
  'stat-focus': StatLayout,
  'quote-card': QuoteLayout,
  'cta-display': CtaLayout,
};

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function isLightColor(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 128;
}

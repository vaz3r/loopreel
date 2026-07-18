import type { SlideData, BrandKit, DesignOutput } from '@loopreel/schemas';
import '../../styles/slides.css';

export interface TemplateProps {
  slide: SlideData;
  slideCount: number;
  brandKit?: BrandKit;
  design?: DesignOutput;
}

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

export function ModernBoldTemplate({ slide, slideCount, brandKit, design }: TemplateProps) {
  const slideDesign = slide.design;
  const colorScheme = design?.colorScheme;
  const template = design?.template ?? 'modern-bold';
  const brandColor = brandKit?.colors.primary ?? colorScheme?.primary ?? '#e94560';
  const bgColor = colorScheme?.background ?? brandKit?.colors.background ?? '#1a1a2e';
  const textColor = colorScheme?.text ?? brandKit?.colors.text ?? '#ffffff';
  const secondaryColor = colorScheme?.secondary ?? brandKit?.colors.secondary ?? '#4ECDC4';

  const getBackground = (): React.CSSProperties => {
    if (!slideDesign) return { background: bgColor };

    switch (slideDesign.backgroundType) {
      case 'gradient': {
        const colors = (slideDesign.gradientColors && slideDesign.gradientColors.length >= 2)
          ? slideDesign.gradientColors as string[]
          : [bgColor, brandColor];
        const type = slideDesign.gradientType ?? 'linear';
        const angle = slide.index === 0 ? '135deg' : (slide.index % 2 === 0 ? '160deg' : '200deg');
        if (type === 'radial') {
          return { background: `radial-gradient(circle at 30% 30%, ${colors[0]} 0%, ${colors[1]} 100%)` };
        }
        if (type === 'mesh') {
          return {
            background: `
              radial-gradient(at 20% 80%, ${hexToRgba(colors[0] ?? bgColor, 0.8)} 0%, transparent 50%),
              radial-gradient(at 80% 20%, ${hexToRgba(colors[1] ?? brandColor, 0.6)} 0%, transparent 50%),
              radial-gradient(at 50% 50%, ${hexToRgba(brandColor, 0.3)} 0%, transparent 70%),
              linear-gradient(${angle}, ${colors[0] ?? bgColor} 0%, ${colors[1] ?? brandColor} 100%)
            `,
          };
        }
        return { background: `linear-gradient(${angle}, ${colors[0] ?? bgColor} 0%, ${colors[1] ?? brandColor} 100%)` };
      }
      case 'solid':
        return { background: bgColor };
      case 'pattern':
        return {
          background: `
            repeating-linear-gradient(45deg, ${hexToRgba(brandColor, 0.03)} 0px, ${hexToRgba(brandColor, 0.03)} 2px, transparent 2px, transparent 12px),
            ${bgColor}
          `,
        };
      default:
        return { background: bgColor };
    }
  };

  const bgStyle = getBackground();

  const getSlideNumberStyle = (): React.CSSProperties => ({
    position: 'absolute',
    top: 40,
    right: 50,
    fontSize: 18,
    fontWeight: 600,
    opacity: 0.35,
    color: textColor,
    fontFamily: `'Inter', sans-serif`,
    zIndex: 10,
    letterSpacing: '0.05em',
  });

  const getBrandMarkStyle = (): React.CSSProperties => ({
    position: 'absolute',
    bottom: 36,
    left: 50,
    fontSize: 13,
    fontWeight: 700,
    opacity: 0.3,
    color: textColor,
    fontFamily: `'Inter', sans-serif`,
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    zIndex: 10,
  });

  const getAccentBarStyle = (): React.CSSProperties => ({
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 5,
    background: `linear-gradient(90deg, ${brandColor}, ${secondaryColor})`,
    zIndex: 10,
  });

  const getShapeStyle = (shape: { type: string; position: string; color?: string; opacity?: number }, index: number): React.CSSProperties => {
    const shapeColor = shape.color ?? brandColor;
    const shapeOpacity = shape.opacity ?? 0.12;
    const base: React.CSSProperties = {
      position: 'absolute',
      zIndex: 1,
    };

    switch (shape.position) {
      case 'top-right':
        return { ...base, top: -80, right: -80, width: 320, height: 320, borderRadius: shape.type === 'circle' ? '50%' : '20px', background: shapeColor, opacity: shapeOpacity, transform: 'rotate(15deg)' };
      case 'top-left':
        return { ...base, top: -60, left: -60, width: 280, height: 280, borderRadius: shape.type === 'circle' ? '50%' : '20px', background: shapeColor, opacity: shapeOpacity, transform: 'rotate(-10deg)' };
      case 'bottom-right':
        return { ...base, bottom: -70, right: -70, width: 300, height: 300, borderRadius: shape.type === 'circle' ? '50%' : '20px', background: shapeColor, opacity: shapeOpacity };
      case 'bottom-left':
        return { ...base, bottom: -50, left: -50, width: 250, height: 250, borderRadius: shape.type === 'circle' ? '50%' : '20px', background: shapeColor, opacity: shapeOpacity };
      case 'accent':
        return { ...base, top: 0, left: 0, width: 8, height: '100%', background: `linear-gradient(180deg, ${brandColor}, ${secondaryColor})`, opacity: 0.8, borderRadius: 0 };
      case 'center':
        return { ...base, top: '50%', left: '50%', width: 400, height: 400, borderRadius: '50%', background: shapeColor, opacity: shapeOpacity * 0.5, transform: 'translate(-50%, -50%)' };
      default:
        return { ...base, top: 20 + index * 40, right: 20, width: 120, height: 120, borderRadius: '50%', background: shapeColor, opacity: shapeOpacity * 0.7 };
    }
  };

  const getContentStyle = (): React.CSSProperties => ({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: slide.type === 'hook' ? 'center' : 'center',
    alignItems: slideDesign?.textAlignment === 'left' ? 'flex-start' : slideDesign?.textAlignment === 'right' ? 'flex-end' : 'center',
    padding: slide.type === 'hook' ? '100px 80px' : '80px 90px',
    position: 'relative',
    zIndex: 5,
    textAlign: slideDesign?.textAlignment ?? 'center',
    width: '100%',
  });

  const getHeadingStyle = (): React.CSSProperties => {
    const isHook = slide.type === 'hook';
    const isCTA = slide.type === 'cta';
    const emphasis = slideDesign?.emphasis ?? 'medium';
    const baseSize = emphasis === 'large' ? (isHook ? 78 : 60) : emphasis === 'medium' ? (isHook ? 64 : 48) : (isHook ? 52 : 38);

    return {
      fontFamily: `'Inter', -apple-system, BlinkMacSystemFont, sans-serif`,
      fontWeight: (brandKit?.fonts.headingWeight ?? 800) as number,
      fontSize: baseSize,
      lineHeight: 1.1,
      letterSpacing: isHook ? '-0.03em' : '-0.02em',
      color: isCTA ? brandColor : textColor,
      margin: 0,
      padding: 0,
      maxWidth: isHook ? '100%' : '90%',
    };
  };

  const getSubtitleStyle = (): React.CSSProperties => ({
    fontFamily: `'Inter', sans-serif`,
    fontWeight: 400,
    fontSize: slide.type === 'hook' ? 26 : 22,
    lineHeight: 1.45,
    color: hexToRgba(textColor, 0.75),
    marginTop: slide.type === 'hook' ? 28 : 16,
    maxWidth: '85%',
  });

  const getBodyStyle = (): React.CSSProperties => ({
    fontFamily: `'Inter', sans-serif`,
    fontWeight: (brandKit?.fonts.bodyWeight ?? 400) as number,
    fontSize: 24,
    lineHeight: 1.55,
    color: hexToRgba(textColor, 0.88),
    marginTop: 20,
    maxWidth: '90%',
  });

  const getBulletsStyle = (): React.CSSProperties => ({
    listStyle: 'none',
    padding: 0,
    margin: '28px 0 0',
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
    width: '100%',
    maxWidth: '90%',
  });

  const getBulletItemStyle = (): React.CSSProperties => ({
    fontFamily: `'Inter', sans-serif`,
    fontWeight: 400,
    fontSize: 21,
    lineHeight: 1.4,
    color: hexToRgba(textColor, 0.9),
    paddingLeft: 36,
    position: 'relative',
    textAlign: slideDesign?.textAlignment ?? 'left',
  });

  const getBulletDotStyle = (): React.CSSProperties => ({
    position: 'absolute',
    left: 0,
    top: 8,
    width: 10,
    height: 10,
    borderRadius: '50%',
    background: `linear-gradient(135deg, ${brandColor}, ${secondaryColor})`,
  });

  const getCtaUrlStyle = (): React.CSSProperties => ({
    fontFamily: `'Inter', sans-serif`,
    fontSize: 20,
    fontWeight: 500,
    opacity: 0.5,
    marginTop: 20,
    color: textColor,
    letterSpacing: '0.02em',
  });

  return (
    <div
      className={`slide-container slide-${slide.type} template-${template}`}
      style={{
        width: '1080px',
        height: '1080px',
        overflow: 'hidden',
        position: 'relative',
        ...bgStyle,
      }}
    >
      {/* Noise texture overlay for premium feel */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.03,
          background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Decorative shapes */}
      {slideDesign?.shapes?.map((shape, i) => (
        <div key={i} style={getShapeStyle(shape, i)} />
      ))}

      {/* Additional ambient decoration for hook slides */}
      {slide.type === 'hook' && (
        <>
          <div style={{
            position: 'absolute',
            top: '15%',
            right: '10%',
            width: 200,
            height: 200,
            borderRadius: '50%',
            border: `2px solid ${hexToRgba(brandColor, 0.15)}`,
            zIndex: 1,
          }} />
          <div style={{
            position: 'absolute',
            bottom: '20%',
            left: '5%',
            width: 150,
            height: 150,
            borderRadius: '50%',
            border: `2px solid ${hexToRgba(secondaryColor, 0.1)}`,
            zIndex: 1,
          }} />
        </>
      )}

      {/* Value slide: left accent strip */}
      {slide.type === 'value' && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 6,
          height: '100%',
          background: `linear-gradient(180deg, ${brandColor}, ${secondaryColor})`,
          zIndex: 10,
        }} />
      )}

      {/* Slide number */}
      <div style={getSlideNumberStyle()}>
        {String(slide.index + 1).padStart(2, '0')} / {String(slideCount).padStart(2, '0')}
      </div>

      {/* Content */}
      <div style={getContentStyle()}>
        {slide.type === 'hook' && (
          <>
            <div style={{
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: brandColor,
              marginBottom: 24,
              fontFamily: "'Inter', sans-serif",
            }}>
              {brandKit?.name ?? 'LOOPREEL'}
            </div>
            <h1 style={getHeadingStyle()}>{slide.heading}</h1>
            {slide.subtitle && <p style={getSubtitleStyle()}>{slide.subtitle}</p>}
          </>
        )}

        {slide.type === 'value' && (
          <>
            <div style={{
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: brandColor,
              marginBottom: 16,
              fontFamily: "'Inter', sans-serif",
            }}>
              {String(slide.index).padStart(2, '0')}
            </div>
            <h2 style={getHeadingStyle()}>{slide.heading}</h2>
            {slide.body && <p style={getBodyStyle()}>{slide.body}</p>}
            {slide.bulletPoints && slide.bulletPoints.length > 0 && (
              <ul style={getBulletsStyle()}>
                {slide.bulletPoints.map((bp, i) => (
                  <li key={i} style={getBulletItemStyle()}>
                    <span style={getBulletDotStyle()} />
                    {bp}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        {slide.type === 'cta' && (
          <>
            <div style={{
              width: 60,
              height: 4,
              background: `linear-gradient(90deg, ${brandColor}, ${secondaryColor})`,
              borderRadius: 2,
              marginBottom: 32,
            }} />
            <h2 style={getHeadingStyle()}>{slide.heading}</h2>
            {slide.ctaUrl && <p style={getCtaUrlStyle()}>{slide.ctaUrl}</p>}
          </>
        )}
      </div>

      {/* Brand mark */}
      {brandKit?.name && slide.type !== 'hook' && (
        <div style={getBrandMarkStyle()}>
          {brandKit.name}
        </div>
      )}

      {/* Accent bar */}
      <div style={getAccentBarStyle()} />
    </div>
  );
}

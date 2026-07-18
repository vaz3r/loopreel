import type { TemplateProps } from './ModernBoldTemplate.js';
import '../../styles/slides.css';

export function GlassmorphismTemplate({ slide, slideCount, brandKit, design }: TemplateProps) {
  const colorScheme = design?.colorScheme;
  const brandColor = brandKit?.colors.primary ?? colorScheme?.primary ?? '#9D4EDD';
  const secondaryColor = colorScheme?.secondary ?? brandKit?.colors.secondary ?? '#FF9E00';
  const bgColor = colorScheme?.background ?? brandKit?.colors.background ?? '#0A0914';
  const textColor = colorScheme?.text ?? brandKit?.colors.text ?? '#FFFFFF';

  const isLight = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 > 128;
  };
  const isBgLight = isLight(bgColor);
  const cardBg = isBgLight ? 'rgba(255, 255, 255, 0.4)' : 'rgba(20, 20, 30, 0.4)';
  const cardBorder = isBgLight ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.1)';

  return (
    <div
      className="slide-container"
      style={{
        width: 1080,
        height: 1080,
        backgroundColor: bgColor,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      {/* Dynamic Animated-like Mesh Gradients */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '-10%',
        width: '70%',
        height: '70%',
        background: `radial-gradient(circle, ${brandColor}80 0%, transparent 70%)`,
        filter: 'blur(80px)',
        zIndex: 0,
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        right: '-10%',
        width: '80%',
        height: '80%',
        background: `radial-gradient(circle, ${secondaryColor}60 0%, transparent 70%)`,
        filter: 'blur(100px)',
        zIndex: 0,
      }} />

      {/* Slide number top right outside card */}
      <div style={{
        position: 'absolute',
        top: 50,
        right: 60,
        fontSize: 22,
        fontWeight: 300,
        color: textColor,
        opacity: 0.6,
        zIndex: 2,
      }}>
        {String(slide.index + 1).padStart(2, '0')} / {String(slideCount).padStart(2, '0')}
      </div>

      {/* Main Glass Card */}
      <div style={{
        width: '85%',
        height: '85%',
        background: cardBg,
        backdropFilter: 'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)',
        border: `1px solid ${cardBorder}`,
        borderRadius: 40,
        boxShadow: '0 24px 60px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)',
        padding: slide.type === 'hook' ? '120px 80px' : '80px 80px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: slide.type === 'hook' ? 'center' : 'flex-start',
        position: 'relative',
        zIndex: 10,
      }}>
        {slide.type === 'hook' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{
              display: 'inline-block',
              padding: '8px 24px',
              borderRadius: 30,
              background: `linear-gradient(135deg, ${brandColor}40, transparent)`,
              border: `1px solid ${brandColor}60`,
              color: brandColor,
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              fontSize: 14,
              marginBottom: 40,
            }}>
              {brandKit?.name ?? 'LOOPREEL'}
            </div>
            <h1 style={{
              fontSize: 84,
              fontWeight: 800,
              lineHeight: 1.05,
              color: textColor,
              letterSpacing: '-0.03em',
              margin: '0 0 30px',
              textShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}>
              {slide.heading}
            </h1>
            {slide.subtitle && (
              <p style={{
                fontSize: 28,
                fontWeight: 300,
                color: textColor,
                opacity: 0.85,
                lineHeight: 1.4,
                maxWidth: '90%',
                margin: '0 auto',
              }}>
                {slide.subtitle}
              </p>
            )}
          </div>
        )}

        {slide.type === 'value' && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 40, gap: 20 }}>
              <div style={{
                width: 60,
                height: 60,
                borderRadius: 20,
                background: `linear-gradient(135deg, ${brandColor}, ${secondaryColor})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: 24,
                fontWeight: 700,
                boxShadow: `0 10px 20px ${brandColor}40`,
              }}>
                {String(slide.index).padStart(2, '0')}
              </div>
              <h2 style={{
                fontSize: 52,
                fontWeight: 700,
                color: textColor,
                margin: 0,
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
              }}>
                {slide.heading}
              </h2>
            </div>
            
            {slide.body && (
              <p style={{
                fontSize: 28,
                fontWeight: 300,
                color: textColor,
                opacity: 0.9,
                lineHeight: 1.6,
                marginBottom: 40,
              }}>
                {slide.body}
              </p>
            )}

            {slide.bulletPoints && slide.bulletPoints.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {slide.bulletPoints.map((bp, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 20,
                    background: 'rgba(255,255,255,0.05)',
                    padding: '24px 30px',
                    borderRadius: 24,
                    border: '1px solid rgba(255,255,255,0.05)',
                  }}>
                    <div style={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      background: brandColor,
                      marginTop: 10,
                      boxShadow: `0 0 10px ${brandColor}`,
                      flexShrink: 0,
                    }} />
                    <span style={{
                      fontSize: 24,
                      fontWeight: 400,
                      color: textColor,
                      lineHeight: 1.4,
                    }}>
                      {bp}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {slide.type === 'cta' && (
          <div style={{ textAlign: 'center', margin: 'auto 0' }}>
            <div style={{
              width: 120,
              height: 120,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${brandColor}, ${secondaryColor})`,
              margin: '0 auto 40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 20px 40px ${brandColor}50`,
            }}>
              <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
            <h2 style={{
              fontSize: 64,
              fontWeight: 800,
              color: textColor,
              lineHeight: 1.1,
              marginBottom: 30,
              letterSpacing: '-0.02em',
            }}>
              {slide.heading}
            </h2>
            {slide.ctaUrl && (
              <div style={{
                display: 'inline-block',
                padding: '16px 40px',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 40,
                fontSize: 24,
                fontWeight: 500,
                color: textColor,
                letterSpacing: '0.05em',
              }}>
                {slide.ctaUrl}
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Brand mark bottom left outside card */}
      {brandKit?.name && slide.type !== 'hook' && (
        <div style={{
          position: 'absolute',
          bottom: 50,
          left: 60,
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: textColor,
          opacity: 0.4,
          zIndex: 2,
        }}>
          {brandKit.name}
        </div>
      )}
    </div>
  );
}

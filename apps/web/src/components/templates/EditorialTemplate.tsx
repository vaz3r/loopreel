import type { TemplateProps } from './ModernBoldTemplate.js';
import '../../styles/slides.css';

export function EditorialTemplate({ slide, slideCount, brandKit, design }: TemplateProps) {
  const colorScheme = design?.colorScheme;
  const brandColor = brandKit?.colors.primary ?? colorScheme?.primary ?? '#B85D3B';
  const bgColor = colorScheme?.background ?? brandKit?.colors.background ?? '#EAE6DF';
  const textColor = colorScheme?.text ?? brandKit?.colors.text ?? '#1A1A1A';
  
  // Use a reliable placeholder image with a consistent seed based on the index
  const imageUrl = `https://picsum.photos/seed/vogue-${slide.index + 42}/1080/1080`;

  return (
    <div
      className="slide-container"
      style={{
        boxSizing: 'border-box',
        width: 1080,
        height: 1080,
        backgroundColor: bgColor,
        color: textColor,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Noise Texture for physical paper feel */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        opacity: 0.25,
        mixBlendMode: 'multiply',
        pointerEvents: 'none',
        zIndex: 20
      }} />

      {/* Decorative Borders */}
      <div style={{
        position: 'absolute', inset: 20,
        border: `1px solid ${textColor}`,
        opacity: 0.15,
        pointerEvents: 'none',
        zIndex: 10
      }} />

      {slide.type === 'hook' && (
        <div style={{ display: 'flex', width: '100%', height: '100%', position: 'relative' }}>
          <div style={{
            position: 'absolute', top: 60, left: 60, right: 60,
            display: 'flex', justifyContent: 'space-between', zIndex: 5,
            fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase',
            borderBottom: `1px solid ${textColor}30`, paddingBottom: 15
          }}>
            <span>{brandKit?.name ?? 'THE ISSUE'}</span>
            <span>VOL {String(slide.index + 1).padStart(2, '0')}</span>
          </div>

          {/* Large Image Background */}
          <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
            <img src={imageUrl} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%) contrast(1.2)' }} />
            <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${bgColor} 0%, ${bgColor}00 70%)` }} />
            <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to right, ${bgColor}ee 0%, ${bgColor}44 100%)` }} />
          </div>

          <div style={{ position: 'relative', zIndex: 5, padding: '100px 80px', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
            {slide.subtitle && (
              <span style={{
                fontFamily: "'Inter', sans-serif", fontSize: 18, fontWeight: 500, letterSpacing: '0.15em',
                color: brandColor, textTransform: 'uppercase', marginBottom: 30, display: 'block'
              }}>
                {slide.subtitle}
              </span>
            )}
            <h1 style={{
              fontFamily: "'Playfair Display', serif", fontSize: 110, fontWeight: 500,
              lineHeight: 0.95, letterSpacing: '-0.03em', margin: 0, color: textColor,
              textTransform: 'none'
            }}>
              {slide.heading}
            </h1>
          </div>
        </div>
      )}

      {slide.type === 'value' && (
        <div style={{ display: 'flex', width: '100%', height: '100%', padding: '60px 40px' }}>
          {/* Magazine split layout */}
          <div style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 5 }}>
            <div style={{
              fontFamily: "'Playfair Display', serif", fontSize: 320, fontWeight: 700, color: brandColor,
              opacity: 0.1, position: 'absolute', top: -100, left: -40, lineHeight: 1, zIndex: -1
            }}>
              {slide.index}
            </div>
            
            <h2 style={{
              fontFamily: "'Playfair Display', serif", fontSize: 72, fontWeight: 600,
              lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 50px', color: textColor,
            }}>
              {slide.heading}
            </h2>

            {slide.body && (
              <p style={{
                fontFamily: "'Inter', sans-serif", fontSize: 24, fontWeight: 400,
                lineHeight: 1.6, color: textColor, opacity: 0.85, marginBottom: 50, maxWidth: '90%'
              }}>
                {slide.body}
              </p>
            )}

            {slide.bulletPoints && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
                {slide.bulletPoints.map((bp, i) => (
                  <div key={i} style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
                    <div style={{ width: 40, height: 1, background: brandColor, marginTop: 16 }} />
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 20, lineHeight: 1.5, color: textColor, fontWeight: 500 }}>
                      {bp}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div style={{ width: '45%', position: 'relative', overflow: 'hidden' }}>
            <img src={imageUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      )}

      {slide.type === 'cta' && (
        <div style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <img src={imageUrl} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.3) grayscale(50%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${brandColor}ee, ${bgColor}ee)`, mixBlendMode: 'multiply' }} />
          
          <div style={{ position: 'relative', zIndex: 5, textAlign: 'center', padding: '0 100px' }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif", fontSize: 96, fontWeight: 500, fontStyle: 'italic',
              color: '#FFFFFF', lineHeight: 1.1, marginBottom: 60,
            }}>
              {slide.heading}
            </h2>
            {slide.ctaUrl && (
              <div style={{
                display: 'inline-block', border: '1px solid #FFFFFF', padding: '24px 60px',
                fontFamily: "'Inter', sans-serif", fontSize: 18, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#FFFFFF',
                backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)'
              }}>
                {slide.ctaUrl}
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Universal Footer */}
      {slide.type !== 'hook' && (
        <div style={{
          position: 'absolute', bottom: 40, left: 60, right: 60,
          display: 'flex', justifyContent: 'space-between', zIndex: 5,
          fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: slide.type === 'cta' ? '#FFFFFF' : textColor
        }}>
          <span>{brandKit?.name ?? 'EDITORIAL'}</span>
          <span>{String(slide.index + 1).padStart(2, '0')} / {String(slideCount).padStart(2, '0')}</span>
        </div>
      )}
    </div>
  );
}

import type { TemplateProps } from './ModernBoldTemplate.js';
import '../../styles/slides.css';

export function GlassmorphismTemplate({ slide, slideCount, brandKit, design }: TemplateProps) {
  const colorScheme = design?.colorScheme;
  // Use vibrant default colors if none provided
  const brandColor = brandKit?.colors.primary ?? colorScheme?.primary ?? '#FF0055';
  const secondaryColor = colorScheme?.secondary ?? brandKit?.colors.secondary ?? '#00F0FF';
  const accentColor = colorScheme?.accent ?? '#7000FF';
  const bgColor = '#05050A'; // Deep dark background for glowing contrast
  const textColor = '#FFFFFF';

  return (
    <div
      className="slide-container"
      style={{
        boxSizing: 'border-box',
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
      {/* Deep Mesh Gradients */}
      <div style={{
        position: 'absolute', top: '-20%', left: '-20%', width: '80%', height: '80%',
        background: `radial-gradient(ellipse at center, ${brandColor}99 0%, transparent 60%)`,
        filter: 'blur(120px)', zIndex: 0,
      }} />
      <div style={{
        position: 'absolute', bottom: '-20%', right: '-20%', width: '90%', height: '90%',
        background: `radial-gradient(ellipse at center, ${secondaryColor}99 0%, transparent 60%)`,
        filter: 'blur(140px)', zIndex: 0,
      }} />
      <div style={{
        position: 'absolute', top: '20%', right: '10%', width: '50%', height: '50%',
        background: `radial-gradient(ellipse at center, ${accentColor}AA 0%, transparent 60%)`,
        filter: 'blur(100px)', zIndex: 0,
      }} />

      {/* Grid Pattern Overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        zIndex: 1,
      }} />

      {/* Main Glass Card */}
      <div style={{
        boxSizing: 'border-box',
        width: '88%',
        height: '88%',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)',
        backdropFilter: 'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
        border: '1px solid rgba(255,255,255,0.15)',
        borderTop: '1px solid rgba(255,255,255,0.3)',
        borderLeft: '1px solid rgba(255,255,255,0.3)',
        borderRadius: 48,
        boxShadow: '0 30px 80px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.05)',
        padding: slide.type === 'hook' ? '100px' : '80px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: slide.type === 'hook' ? 'center' : 'flex-start',
        position: 'relative',
        zIndex: 10,
        overflow: 'hidden'
      }}>
        {/* Card internal glow */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '40%',
          background: `linear-gradient(to bottom, rgba(255,255,255,0.1) 0%, transparent 100%)`,
          pointerEvents: 'none',
        }} />

        {slide.type === 'hook' && (
          <div style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
            <div style={{
              display: 'inline-block', padding: '10px 30px', borderRadius: 100,
              background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)',
              color: '#FFF', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase',
              fontSize: 14, marginBottom: 50, backdropFilter: 'blur(10px)',
              boxShadow: `0 0 20px ${brandColor}40`
            }}>
              {brandKit?.name ?? 'LOOPREEL'}
            </div>
            <h1 style={{
              fontSize: 92, fontWeight: 800, lineHeight: 1.05, color: textColor,
              letterSpacing: '-0.03em', margin: '0 0 40px',
              textShadow: '0 10px 30px rgba(0,0,0,0.5)',
            }}>
              {slide.heading}
            </h1>
            {slide.subtitle && (
              <p style={{
                fontSize: 28, fontWeight: 300, color: 'rgba(255,255,255,0.7)',
                lineHeight: 1.5, maxWidth: '85%', margin: '0 auto',
              }}>
                {slide.subtitle}
              </p>
            )}
          </div>
        )}

        {slide.type === 'value' && (
          <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 50, gap: 30 }}>
              <div style={{
                width: 80, height: 80, borderRadius: 24,
                background: `linear-gradient(135deg, ${brandColor}, ${secondaryColor})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: 32, fontWeight: 800,
                boxShadow: `0 15px 30px ${brandColor}50, inset 0 2px 0 rgba(255,255,255,0.4)`,
              }}>
                {String(slide.index).padStart(2, '0')}
              </div>
              <h2 style={{ fontSize: 56, fontWeight: 800, color: textColor, margin: 0, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                {slide.heading}
              </h2>
            </div>
            
            {slide.body && (
              <p style={{ fontSize: 30, fontWeight: 300, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, marginBottom: 50 }}>
                {slide.body}
              </p>
            )}

            {slide.bulletPoints && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {slide.bulletPoints.map((bp, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 24,
                    background: 'rgba(0,0,0,0.2)', padding: '28px 36px', borderRadius: 30,
                    border: '1px solid rgba(255,255,255,0.05)',
                  }}>
                    <div style={{
                      width: 16, height: 16, borderRadius: '50%', background: secondaryColor,
                      marginTop: 10, boxShadow: `0 0 15px ${secondaryColor}`, flexShrink: 0,
                    }} />
                    <span style={{ fontSize: 26, fontWeight: 400, color: '#FFF', lineHeight: 1.4 }}>
                      {bp}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {slide.type === 'cta' && (
          <div style={{ textAlign: 'center', margin: 'auto 0', position: 'relative', zIndex: 2 }}>
            <div style={{
              width: 160, height: 160, borderRadius: '50%',
              background: `linear-gradient(135deg, ${brandColor}, ${secondaryColor})`,
              margin: '0 auto 60px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 30px 60px ${brandColor}60, inset 0 2px 0 rgba(255,255,255,0.4)`,
            }}>
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
            <h2 style={{ fontSize: 72, fontWeight: 800, color: textColor, lineHeight: 1.1, marginBottom: 50, letterSpacing: '-0.02em' }}>
              {slide.heading}
            </h2>
            {slide.ctaUrl && (
              <div style={{
                display: 'inline-block', padding: '24px 60px',
                background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: 100, fontSize: 26, fontWeight: 600, color: '#FFF',
                letterSpacing: '0.1em', boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                backdropFilter: 'blur(10px)'
              }}>
                {slide.ctaUrl}
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Progress Indicators at bottom */}
      <div style={{
        position: 'absolute', bottom: 40, left: 60, right: 60,
        display: 'flex', justifyContent: 'space-between', zIndex: 20, alignItems: 'center'
      }}>
        <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
          {brandKit?.name ?? 'LOOPREEL'}
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {Array.from({ length: slideCount }).map((_, i) => (
            <div key={i} style={{
              width: slide.index === i ? 40 : 12, height: 12, borderRadius: 10,
              background: slide.index === i ? '#FFF' : 'rgba(255,255,255,0.2)',
              transition: 'all 0.3s ease'
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}

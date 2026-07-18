import type { TemplateProps } from './ModernBoldTemplate.js';
import '../../styles/slides.css';

export function EditorialTemplate({ slide, slideCount, brandKit, design }: TemplateProps) {
  const colorScheme = design?.colorScheme;
  const brandColor = brandKit?.colors.primary ?? colorScheme?.primary ?? '#D23226';
  const bgColor = colorScheme?.background ?? brandKit?.colors.background ?? '#FAF9F6'; // Cream/off-white
  const textColor = colorScheme?.text ?? brandKit?.colors.text ?? '#111111';
  
  // Editorial uses extreme contrast and sharp lines.
  
  return (
    <div
      className="slide-container"
      style={{
        width: 1080,
        height: 1080,
        backgroundColor: bgColor,
        color: textColor,
        position: 'relative',
        padding: '80px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top Header Row */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        borderBottom: `2px solid ${textColor}`,
        paddingBottom: 20,
        marginBottom: slide.type === 'hook' ? 'auto' : 60,
      }}>
        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
        }}>
          {brandKit?.name ?? 'EDITORIAL'}
        </div>
        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 14,
          fontWeight: 500,
          letterSpacing: '0.05em',
          opacity: 0.6,
        }}>
          NO. {String(slide.index + 1).padStart(2, '0')} / {String(slideCount).padStart(2, '0')}
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: slide.type === 'hook' ? 'center' : 'flex-start',
      }}>
        {slide.type === 'hook' && (
          <div style={{ textAlign: 'center', padding: '0 40px' }}>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 96,
              fontWeight: 600,
              fontStyle: 'italic',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              margin: '0 0 40px',
              color: textColor,
            }}>
              {slide.heading}
            </h1>
            {slide.subtitle && (
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 22,
                fontWeight: 400,
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                lineHeight: 1.6,
                color: brandColor,
                maxWidth: '80%',
                margin: '0 auto',
              }}>
                {slide.subtitle}
              </p>
            )}
          </div>
        )}

        {slide.type === 'value' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 60, flex: 1 }}>
            {/* Left Column: Heading */}
            <div>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 64,
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
                margin: 0,
                color: brandColor,
              }}>
                {slide.heading}
              </h2>
            </div>
            
            {/* Right Column: Body & Bullets */}
            <div style={{ borderLeft: `1px solid ${textColor}40`, paddingLeft: 60 }}>
              {slide.body && (
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 26,
                  fontWeight: 400,
                  lineHeight: 1.6,
                  marginBottom: 40,
                  color: textColor,
                }}>
                  {slide.body}
                </p>
              )}

              {slide.bulletPoints && slide.bulletPoints.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
                  {slide.bulletPoints.map((bp, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      gap: 20,
                      alignItems: 'flex-start',
                      borderTop: `1px solid ${textColor}20`,
                      paddingTop: 30,
                    }}>
                      <div style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 24,
                        fontWeight: 600,
                        fontStyle: 'italic',
                        color: brandColor,
                        minWidth: 40,
                      }}>
                        {String(i + 1).padStart(2, '0')}.
                      </div>
                      <div style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 22,
                        fontWeight: 400,
                        lineHeight: 1.5,
                        color: textColor,
                      }}>
                        {bp}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {slide.type === 'cta' && (
          <div style={{ textAlign: 'center', margin: 'auto 0' }}>
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 18,
              fontWeight: 500,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: brandColor,
              marginBottom: 40,
            }}>
              Discover More
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 84,
              fontWeight: 600,
              lineHeight: 1.1,
              margin: '0 0 60px',
            }}>
              {slide.heading}
            </h2>
            {slide.ctaUrl && (
              <div style={{
                display: 'inline-block',
                border: `2px solid ${textColor}`,
                padding: '24px 60px',
                fontFamily: "'Inter', sans-serif",
                fontSize: 20,
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}>
                {slide.ctaUrl}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

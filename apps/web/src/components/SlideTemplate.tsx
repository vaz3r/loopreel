import type { SlideData, BrandKit, DesignOutput } from '@loopreel/schemas';
import '../styles/slides.css';

interface SlideRendererProps {
  slide: SlideData;
  slideCount: number;
  brandKit?: BrandKit;
  design?: DesignOutput;
}

export function SlideRenderer({ slide, slideCount, brandKit, design }: SlideRendererProps) {
  const slideDesign = slide.design;
  const colorScheme = design?.colorScheme;
  const template = design?.template ?? 'modern-bold';

  // Build CSS custom properties from brand kit and design
  const style = {
    '--slide-bg': colorScheme?.background ?? brandKit?.colors.background ?? '#1a1a2e',
    '--slide-surface': brandKit?.colors.surface ?? '#232340',
    '--slide-text': colorScheme?.text ?? brandKit?.colors.text ?? '#ffffff',
    '--slide-accent': colorScheme?.primary ?? brandKit?.colors.primary ?? '#e94560',
    '--slide-secondary': colorScheme?.secondary ?? brandKit?.colors.secondary ?? '#4ECDC4',
    '--slide-muted': brandKit?.colors.muted ?? '#8888AA',
    '--slide-heading-font': brandKit?.fonts.heading ?? 'Inter',
    '--slide-body-font': brandKit?.fonts.body ?? 'Inter',
    '--slide-heading-weight': brandKit?.fonts.headingWeight ?? 800,
    '--slide-body-weight': brandKit?.fonts.bodyWeight ?? 400,
    '--slide-width': '1080px',
    '--slide-height': '1080px',
  } as React.CSSProperties;

  // Get background CSS
  const getBackgroundCss = () => {
    if (!slideDesign) return {};

    switch (slideDesign.backgroundType) {
      case 'gradient':
        if (slideDesign.gradientColors && slideDesign.gradientColors.length >= 2) {
          return {
            background: `linear-gradient(135deg, ${slideDesign.gradientColors[0]} 0%, ${slideDesign.gradientColors[1]} 100%)`,
          };
        }
        return { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' };

      case 'image':
        if (slideDesign.imageSearch) {
          // For now, use a gradient fallback until Unsplash integration is complete
          return {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          };
        }
        return {};

      case 'solid':
      default:
        return {};
    }
  };

  // Get text alignment class
  const getAlignmentClass = () => {
    if (!slideDesign) return 'text-left';
    return `text-${slideDesign.textAlignment}`;
  };

  // Get emphasis class
  const getEmphasisClass = () => {
    if (!slideDesign) return 'emphasis-large';
    return `emphasis-${slideDesign.emphasis}`;
  };

  // Get layout class
  const getLayoutClass = () => {
    if (!slideDesign) return 'layout-center';
    return `layout-${slideDesign.layout}`;
  };

  return (
    <div
      className={`slide-container slide-${slide.type} template-${template} ${getLayoutClass()} ${getAlignmentClass()} ${getEmphasisClass()}`}
      style={{ ...style, ...getBackgroundCss() }}
    >
      {/* Decorative shapes */}
      {slideDesign?.shapes && slideDesign.shapes.length > 0 && (
        <div className="slide-shapes">
          {slideDesign.shapes.map((shape, i) => (
            <div
              key={i}
              className={`shape shape-${shape.type} position-${shape.position}`}
              style={{
                opacity: shape.opacity ?? 0.3,
                backgroundColor: shape.color ?? 'var(--slide-accent)',
              }}
            />
          ))}
        </div>
      )}

      {/* Slide number */}
      <span className="slide-number">
        {slide.index + 1} / {slideCount}
      </span>

      {/* Content */}
      <div className="slide-content">
        {slide.type === 'hook' && (
          <>
            <h1 className="slide-heading">{slide.heading}</h1>
            {slide.subtitle && <p className="slide-subtitle">{slide.subtitle}</p>}
          </>
        )}

        {slide.type === 'value' && (
          <>
            <h2 className="slide-heading">{slide.heading}</h2>
            {slide.body && <p className="slide-body">{slide.body}</p>}
            {slide.bulletPoints && slide.bulletPoints.length > 0 && (
              <ul className="slide-bullets">
                {slide.bulletPoints.map((bp, i) => (
                  <li key={i}>{bp}</li>
                ))}
              </ul>
            )}
          </>
        )}

        {slide.type === 'cta' && (
          <>
            <h2 className="slide-heading">{slide.heading}</h2>
            {slide.ctaUrl && <p className="slide-cta-url">{slide.ctaUrl}</p>}
          </>
        )}
      </div>

      {/* Brand mark */}
      {brandKit?.name && (
        <div className="slide-brand-mark">
          <span className="brand-name">{brandKit.name}</span>
        </div>
      )}

      {/* Accent bar */}
      <div className="slide-accent-bar" />
    </div>
  );
}

// Keep backward compatibility
export const SlideTemplate = SlideRenderer;

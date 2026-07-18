import type { SlideData, BrandKit } from '@loopreel/schemas';
import '../styles/slides.css';

interface SlideTemplateProps {
  slide: SlideData;
  slideCount: number;
  brandKit?: BrandKit;
}

export function SlideTemplate({ slide, slideCount, brandKit }: SlideTemplateProps) {
  const style = {
    '--slide-bg': brandKit?.primaryColor ? '#1a1a2e' : '#1a1a2e',
    '--slide-accent': brandKit?.primaryColor ?? '#e94560',
    '--slide-text': '#ffffff',
    fontFamily: brandKit?.fontFamily ? `'${brandKit.fontFamily}', Inter, sans-serif` : undefined,
  } as React.CSSProperties;

  return (
    <div className={`slide-container slide-${slide.type}`} style={style}>
      <span className="slide-number">
        {slide.index + 1} / {slideCount}
      </span>

      {slide.type === 'hook' && (
        <>
          <h1>{slide.heading}</h1>
          {slide.subtitle && <p className="subtitle">{slide.subtitle}</p>}
        </>
      )}

      {slide.type === 'value' && (
        <>
          <h2>{slide.heading}</h2>
          {slide.body && <p className="body">{slide.body}</p>}
          {slide.bulletPoints && slide.bulletPoints.length > 0 && (
            <ul className="bullets">
              {slide.bulletPoints.map((bp, i) => (
                <li key={i}>{bp}</li>
              ))}
            </ul>
          )}
        </>
      )}

      {slide.type === 'cta' && (
        <>
          <h2>{slide.heading}</h2>
          {slide.ctaUrl && <p className="cta-url">{slide.ctaUrl}</p>}
        </>
      )}

      <div className="slide-accent-bar" />
    </div>
  );
}

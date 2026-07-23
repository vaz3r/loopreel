import React from 'react';

interface SlideThumbnailsProps {
  slides: Array<Record<string, any>>;
  activeIndex: number;
  onSelectSlide: (index: number) => void;
}

export const SlideThumbnails: React.FC<SlideThumbnailsProps> = ({
  slides,
  activeIndex,
  onSelectSlide,
}) => {
  return (
    <div style={{ background: '#0F172A', borderRight: '1px solid #1E293B', width: 220, padding: 16, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <h3 style={{ color: '#64748B', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 4px 0' }}>
        Slides ({slides.length})
      </h3>
      {slides.map((slide, idx) => (
        <button
          key={slide._virtualId || slide.id || idx}
          onClick={() => onSelectSlide(idx)}
          style={{
            background: activeIndex === idx ? '#1E293B' : '#090D16',
            border: activeIndex === idx ? '2px solid #38BDF8' : '1px solid #1E293B',
            borderRadius: 8,
            padding: 12,
            textAlign: 'left',
            cursor: 'pointer',
            color: '#F8FAFC',
            transition: 'all 0.15s ease',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: 11, color: '#38BDF8', fontWeight: 700 }}>#{idx + 1}</span>
            <span style={{ fontSize: 10, color: '#64748B', textTransform: 'uppercase' }}>{slide.type}</span>
          </div>
          <div style={{ fontSize: 12, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#94A3B8' }}>
            {slide.headline || slide.term || slide.quote || 'Slide Content'}
          </div>
        </button>
      ))}
    </div>
  );
};

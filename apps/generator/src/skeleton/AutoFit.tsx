import React, { useLayoutEffect, useRef, useState, useCallback } from 'react';

export interface AutoFitProps {
  children: React.ReactNode;
  maxScale?: number;
  minScale?: number;
  paddingBuffer?: number;
  verticalAlign?: 'center' | 'flex-start';
  className?: string;
  style?: React.CSSProperties;
}

export function AutoFit({
  children,
  maxScale = 1.0,
  minScale = 0.55,
  paddingBuffer = 32,
  verticalAlign = 'center',
  className = '',
  style = {},
}: AutoFitProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1.0);

  const calculateFit = useCallback(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    // Reset transform to measure natural height
    content.style.transform = 'none';
    content.style.width = '100%';

    const containerH = container.clientHeight;
    const contentH = content.scrollHeight;

    if (contentH > containerH - paddingBuffer) {
      const calculatedScale = Math.max(minScale, (containerH - paddingBuffer) / contentH);
      const clampedScale = Math.min(maxScale, calculatedScale);
      setScale(clampedScale);
      content.style.transform = `scale(${clampedScale})`;
      content.style.transformOrigin = verticalAlign === 'center' ? 'center center' : 'top center';
      if (clampedScale < 1.0) {
        content.style.width = `${100 / clampedScale}%`;
      }
    } else {
      setScale(1.0);
      content.style.transform = 'none';
      content.style.width = '100%';
    }
  }, [maxScale, minScale, paddingBuffer, verticalAlign]);

  useLayoutEffect(() => {
    calculateFit();
    window.addEventListener('resize', calculateFit);
    return () => window.removeEventListener('resize', calculateFit);
  }, [calculateFit, children]);

  return (
    <div
      ref={containerRef}
      className={`loop-autofit-container relative w-full h-full flex flex-col overflow-hidden ${
        verticalAlign === 'center' ? 'justify-center' : 'justify-start'
      } ${className}`}
      data-autofit-scaled={scale.toFixed(3)}
      style={style}
    >
      <div
        ref={contentRef}
        className="loop-autofit-content w-full transition-transform duration-100 ease-out"
      >
        {children}
      </div>
    </div>
  );
}

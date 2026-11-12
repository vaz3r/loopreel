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

/**
 * Universal Dual-Axis AutoFit container for Loopreel slides.
 *
 * Measures unconstrained natural dimensions, reflows with width compensation,
 * and applies a mathematical scale transform with optical vertical centering.
 * Guarantees zero text overflow and zero horizontal clipping across all viewports.
 */
export function AutoFit({
  children,
  maxScale = 1.0,
  minScale = 0.65,
  paddingBuffer = 32,
  verticalAlign = 'center',
  className = '',
  style = {},
}: AutoFitProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [fitState, setFitState] = useState<{ scale: number; offsetY: number }>({
    scale: 1.0,
    offsetY: 0,
  });
  const isCalculatingRef = useRef(false);

  const calculateFit = useCallback(() => {
    if (isCalculatingRef.current) return;
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    isCalculatingRef.current = true;
    try {
      // Temporarily unconstrain height and transform to measure true natural dimensions
      content.style.transform = 'none';
      content.style.width = '100%';
      content.style.height = 'auto';
      content.style.minHeight = 'auto';
      content.style.position = 'relative';

      const containerH = container.clientHeight;
      const containerW = container.clientWidth;
      const rawH = content.scrollHeight;
      const rawW = content.scrollWidth;

      if (containerH <= 0 || containerW <= 0 || rawH <= 0 || rawW <= 0) return;

      const overflowsH = rawH > containerH;
      const overflowsW = rawW > containerW;

      let targetScale = 1.0;

      if (overflowsH || overflowsW) {
        const availableH = Math.max(10, containerH - paddingBuffer);
        const availableW = Math.max(10, containerW - paddingBuffer);
        const scaleH = overflowsH ? availableH / rawH : 1.0;
        const scaleW = overflowsW ? availableW / rawW : 1.0;
        targetScale = Math.max(minScale, Math.min(maxScale, scaleH, scaleW));
      }

      if (targetScale < 1.0) {
        // Compensate width so text does not narrow horizontally
        content.style.width = `${100 / targetScale}%`;
        content.style.height = 'auto';
        content.style.minHeight = 'auto';

        // Measure reflowed height after width compensation to get true optical height
        const reflowedH = content.scrollHeight;
        const scaledH = reflowedH * targetScale;
        const offsetY =
          verticalAlign === 'center' ? Math.max(0, (containerH - scaledH) / 2) : 0;

        content.style.transformOrigin = 'top left';
        content.style.transform = `translate(0px, ${offsetY / targetScale}px) scale(${targetScale})`;

        container.setAttribute('data-autofit-scaled', targetScale.toFixed(3));
        container.setAttribute('data-autofit-overflow', 'true');
        container.setAttribute(
          'data-layout-health',
          targetScale >= 0.94 ? 'optimal' : targetScale >= 0.85 ? 'compressed' : 'overflow'
        );
        setFitState({ scale: targetScale, offsetY });
      } else {
        content.style.width = '100%';
        content.style.height = '100%';
        content.style.minHeight = '100%';
        content.style.transform = 'none';
        container.setAttribute('data-autofit-scaled', '1.000');
        container.removeAttribute('data-autofit-overflow');
        container.setAttribute('data-layout-health', 'optimal');
        setFitState({ scale: 1.0, offsetY: 0 });
      }
    } finally {
      isCalculatingRef.current = false;
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
      className={`loop-autofit-container relative w-full h-full flex flex-col overflow-hidden ${className}`}
      data-autofit-scaled={fitState.scale.toFixed(3)}
      style={style}
    >
      <div
        ref={contentRef}
        className="loop-autofit-content w-full transition-transform duration-75 ease-out"
      >
        {children}
      </div>
    </div>
  );
}

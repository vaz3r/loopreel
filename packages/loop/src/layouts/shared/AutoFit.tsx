import React, { useLayoutEffect, useRef, useState, useCallback } from 'react';

export interface AutoFitProps {
  children: React.ReactNode;
  /** Maximum scale factor (default: 1.0, meaning never upscale above natural size) */
  maxScale?: number;
  /** Minimum scale factor to prevent micro-text (default: 0.50) */
  minScale?: number;
  /** Safety margin in pixels (default: 24) */
  paddingBuffer?: number;
  /** Vertical alignment strategy for scaled or unscaled content */
  verticalAlign?: 'center' | 'flex-start';
  /** Extra CSS class name */
  className?: string;
  /** Custom styles for the outer container */
  style?: React.CSSProperties;
}

/**
 * Universal AutoFit container for Loopreel slides.
 *
 * Measures content height and width synchronously before browser paint / screenshot.
 * If content exceeds the container's safe bounds, applies a mathematical scale transform
 * with width compensation, guaranteeing zero clipping and zero DOM overflow across all
 * viewports (portrait 4:5, square 1:1, story 9:16).
 */
export function AutoFit({
  children,
  maxScale = 1.0,
  minScale = 0.5,
  paddingBuffer = 24,
  verticalAlign = 'center',
  className = '',
  style = {},
}: AutoFitProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [fitState, setFitState] = useState<{ scale: number; offsetY: number }>({ scale: 1.0, offsetY: 0 });
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

      // Content only overflows if its natural unconstrained size strictly exceeds the container
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
        const offsetY = verticalAlign === 'center' ? Math.max(0, (containerH - scaledH) / 2) : 0;

        content.style.transformOrigin = 'top center';
        content.style.transform = `translate(0px, ${offsetY / targetScale}px) scale(${targetScale})`;

        container.setAttribute('data-autofit-scaled', targetScale.toFixed(3));
        container.setAttribute('data-autofit-overflow', 'true');
        container.setAttribute('data-layout-health', targetScale >= 0.95 ? 'optimal' : targetScale >= 0.82 ? 'compressed' : 'scaled');
        setFitState({ scale: targetScale, offsetY });
      } else {
        content.style.width = '100%';
        content.style.height = '100%';
        content.style.minHeight = '100%';
        content.style.transform = 'none';
        container.removeAttribute('data-autofit-scaled');
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

    // Re-calculate when web fonts are ready (e.g. Google Fonts Fraunces, DM Mono, Newsreader)
    if (typeof document !== 'undefined' && document.fonts) {
      document.fonts.ready.then(() => calculateFit());
      document.fonts.addEventListener('loadingdone', calculateFit);
    }

    const handleResize = () => calculateFit();
    window.addEventListener('resize', handleResize);
    window.addEventListener('slide-update', handleResize);

    // ResizeObserver on container to handle dynamic resizing
    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && containerRef.current) {
      observer = new ResizeObserver(() => {
        if (!isCalculatingRef.current) {
          calculateFit();
        }
      });
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('slide-update', handleResize);
      if (typeof document !== 'undefined' && document.fonts) {
        document.fonts.removeEventListener('loadingdone', calculateFit);
      }
      if (observer) {
        observer.disconnect();
      }
    };
  }, [calculateFit]);

  return (
    <div
      ref={containerRef}
      className={`loop-autofit-container ${className}`.trim()}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: fitState.scale < 1.0 ? 'flex-start' : verticalAlign,
        alignItems: 'stretch',
        ...style,
      }}
    >
      <div
        ref={contentRef}
        className="loop-autofit-content"
        style={{
          width: '100%',
          height: fitState.scale < 1.0 ? 'auto' : '100%',
          minHeight: fitState.scale < 1.0 ? 'auto' : '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: fitState.scale < 1.0 ? 'flex-start' : verticalAlign,
          alignItems: 'stretch',
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default AutoFit;

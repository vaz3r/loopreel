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
      content.style.transform = 'none';
      content.style.width = '100%';
      content.style.position = 'relative';

      const containerH = container.clientHeight;
      const containerW = container.clientWidth;
      const rawH = content.scrollHeight;
      const rawW = content.scrollWidth;

      if (containerH <= 0 || containerW <= 0 || rawH <= 0 || rawW <= 0) return;

      const safeH = containerH - paddingBuffer;
      const safeW = containerW - paddingBuffer;

      const scaleH = safeH / rawH;
      const scaleW = safeW / rawW;
      const rawScale = Math.min(scaleH, scaleW);

      let targetScale = Math.min(maxScale, Math.max(minScale, rawScale));
      if (rawScale >= 0.96) {
        targetScale = 1.0;
      }

      let offsetY = 0;
      if (verticalAlign === 'center' && targetScale < 1.0) {
        const scaledH = rawH * targetScale;
        offsetY = Math.max(0, (containerH - scaledH) / 2);
      }

      setFitState({
        scale: Number(targetScale.toFixed(3)),
        offsetY: Math.round(offsetY),
      });
    } finally {
      isCalculatingRef.current = false;
    }
  }, [maxScale, minScale, paddingBuffer, verticalAlign]);

  useLayoutEffect(() => {
    calculateFit();
  }, [calculateFit, children]);

  useLayoutEffect(() => {
    const handleUpdate = () => calculateFit();
    window.addEventListener('slide-update', handleUpdate);
    window.addEventListener('resize', handleUpdate);
    return () => {
      window.removeEventListener('slide-update', handleUpdate);
      window.removeEventListener('resize', handleUpdate);
    };
  }, [calculateFit]);

  return (
    <div
      ref={containerRef}
      className={`loop-autofit-container ${className}`}
      data-autofit-scaled={fitState.scale.toFixed(3)}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: verticalAlign === 'center' ? 'center' : 'flex-start',
        ...style,
      }}
    >
      <div
        ref={contentRef}
        className="loop-autofit-content"
        style={{
          width: fitState.scale < 1.0 ? `${(100 / fitState.scale).toFixed(2)}%` : '100%',
          transform: fitState.scale < 1.0 ? `scale(${fitState.scale})` : undefined,
          transformOrigin: verticalAlign === 'center' ? 'center center' : 'top left',
          transition: 'none',
        }}
      >
        {children}
      </div>
    </div>
  );
}

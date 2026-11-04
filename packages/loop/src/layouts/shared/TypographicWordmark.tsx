import React from 'react';

interface TypographicWordmarkProps {
  wordmark?: string;
  style?: 'serif' | 'sans' | 'mono' | 'small-caps';
  fontFamily?: string;
  color?: string;
  className?: string;
  fontSize?: string | number;
}

export function TypographicWordmark({
  wordmark,
  style = 'small-caps',
  fontFamily,
  color,
  className,
  fontSize,
}: TypographicWordmarkProps) {
  if (!wordmark) return null;

  const fontStyleStyles: React.CSSProperties = {
    fontFamily: fontFamily || (style === 'serif' ? 'var(--font-serif, serif)' : style === 'mono' ? 'var(--font-mono, monospace)' : 'var(--font-sans, sans-serif)'),
    textTransform: style === 'small-caps' ? 'uppercase' : undefined,
    letterSpacing: style === 'small-caps' ? '0.12em' : '0.04em',
    fontWeight: style === 'small-caps' ? 700 : 600,
    fontSize: fontSize || (style === 'small-caps' ? '14px' : '16px'),
    color: color || 'inherit',
    lineHeight: 1.2,
    display: 'inline-flex',
    alignItems: 'center',
    userSelect: 'none',
  };

  return (
    <span className={className} style={fontStyleStyles}>
      {wordmark}
    </span>
  );
}

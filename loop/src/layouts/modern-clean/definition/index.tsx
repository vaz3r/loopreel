import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function ModernCleanDefinition({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className="flex-1 flex flex-col justify-center min-h-0">
      <div className={styles.term}
        style={{ fontFamily: `'${scheme.fontSans}', sans-serif` }}>
        {s.term}
      </div>
      <div className={styles.rule} />
      <div className={styles.definition}
        style={{ fontFamily: `'${scheme.fontSans}', sans-serif` }}>
        {s.definition}
      </div>
      {s.example && (
        <div className={styles.example}
          style={{ fontFamily: `'${scheme.fontSans}', sans-serif` }}>
          &ldquo;{s.example}&rdquo;
        </div>
      )}
    </div>
  );
}

import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function AvantGardeDefinition({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className={styles.definition}>
      {s.tag && <div className={styles.tag}>{s.tag}</div>}
      <div className={styles.divider} />
      <div className={styles.term}>{s.term}</div>
      {s.phonetic && <div className={styles.phonetic}>{s.phonetic}</div>}
      {s.definition && <div className={styles.defText}>{s.definition}</div>}
      {s.example && <div className={styles.example}>{s.example}</div>}
    </div>
  );
}

import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function PaperOfRecordDefinition({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className={styles.definition}>
      {s.tag && <div className={styles.label}>{s.tag}</div>}
      <h2 className={styles.term}>{s.term}</h2>
      {s.phonetic && <div className={styles.phonetic}>{s.phonetic}</div>}
      <div className={styles.definitionBody}>
        <p className={styles.definitionText}>{s.definition}</p>
        {s.example && <p className={styles.example}>{s.example}</p>}
      </div>
    </div>
  );
}

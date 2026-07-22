import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function Cover({ slide }: LayoutProps) {
  const s = slide as any;
  return (
    <div className={styles.wrap}>
      <div className={styles.top}>
        <h1 className={styles.headline}>{s.headline}</h1>
      </div>
      <div className={styles.bottom}>
        <div className={styles.descCol}>
          <div className={styles.line} />
          <p className={styles.desc}>{s.subheadline}</p>
        </div>
        <div className={styles.quoteCol}>
          <p className={styles.pullQuote}>{s.pullQuote}</p>
        </div>
      </div>
    </div>
  );
}

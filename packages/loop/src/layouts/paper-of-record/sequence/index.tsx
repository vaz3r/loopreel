import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function PaperOfRecordSequence({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className={styles.sequence}>
      <div className={styles.header}>
        <h2 className={styles.headline}>{s.headline}</h2>
      </div>
      <div className={styles.items}>
        {(s.items || []).map((item: any, idx: number) => (
          <div key={idx} className={styles.item}>
            <div className={styles.itemNum}>{item.num}</div>
            <div className={styles.itemContent}>
              <h3 className={styles.itemTitle}>{item.title}</h3>
              <p className={styles.itemDesc}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

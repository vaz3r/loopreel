import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function Sequence({ slide }: LayoutProps) {
  const s = slide as any;
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h2 className={styles.headline}>{s.headline}</h2>
      </div>
      <div className={styles.list}>
        {s.items?.map((item: any, idx: number) => (
          <div key={idx} className={`${styles.item} ${idx < s.items.length - 1 ? styles.itemBorder : ''}`}>
            <div className={styles.num}>{item.num || `${idx + 1}`}</div>
            <div>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.desc}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

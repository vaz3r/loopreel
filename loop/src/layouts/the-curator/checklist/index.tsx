import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function Checklist({ slide }: LayoutProps) {
  const s = slide as any;
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h2 className={styles.headline}>{s.headline}</h2>
        <span className={styles.subtitle}>PRE-FLIGHT AUDIT</span>
      </div>
      <div className={styles.list}>
        {s.items?.map((item: any, idx: number) => (
          <div key={idx} className={`${styles.item} ${item.checked ? styles.itemChecked : ''}`}>
            <div className={`${styles.checkbox} ${item.checked ? styles.checkboxChecked : ''}`}>
              {item.checked && <span className={styles.checkmark}>✓</span>}
            </div>
            <p className={`${styles.itemText} ${item.checked ? '' : styles.itemTextLight}`}>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

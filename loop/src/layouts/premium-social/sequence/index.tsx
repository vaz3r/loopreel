import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function PremiumSocialSequence({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className={styles.sequence}>
      {s.tag && <div className={styles.tag}>{s.tag}</div>}
      <div className={styles.headline}>{s.headline}</div>
      <div className={styles.list}>
        {s.items?.map((item: any, i: number) => (
          <div key={i} className={styles.item}>
            <div className={styles.checkCircle}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7L6 10L11 4" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className={styles.body}>
              <div className={styles.title}>{item.title}</div>
              {item.desc && <div className={styles.desc}>{item.desc}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

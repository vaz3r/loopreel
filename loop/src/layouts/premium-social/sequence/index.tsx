import React from 'react';
import { Engine } from '../../../engine-utils';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function PremiumSocialSequence({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className="flex-1 flex flex-col justify-center min-h-0">
      {s.tag && <div className={styles.tag}>{s.tag}</div>}
      <div className={`${styles.headline} ${Engine.getHeadlineStyle(s.headline)}`}
        style={{ fontFamily: `'${scheme.fontSans}', sans-serif` }}>
        {s.headline}
      </div>
      <div className={styles.list}>
        {s.items?.map((item: any, i: number) => (
          <div key={i} className={styles.item}>
            <div className={styles.number}
              style={{ fontFamily: `'${scheme.fontSans}', sans-serif` }}>
              {item.num}
            </div>
            <div className={styles.body}>
              <div className={styles.title}
                style={{ fontFamily: `'${scheme.fontSans}', sans-serif` }}>
                {item.title}
              </div>
              {item.desc && <div className={styles.desc}>{item.desc}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

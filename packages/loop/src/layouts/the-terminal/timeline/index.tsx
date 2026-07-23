import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function Timeline({ slide }: LayoutProps) {
  const s = slide as any;
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h2 className={styles.headline}>{s.headline}</h2>
        <span className={styles.logLabel}>LOG: TIMELINE</span>
      </div>
      <div className={styles.track}>
        {s.events?.map((event: any, idx: number) => {
          const isHighlight = event.highlight;
          return (
            <div key={idx} className={styles.event}>
              <div className={`${styles.dot} ${isHighlight ? styles.dotAccent : styles.dotNormal}`} />
              <div className={`${styles.date} ${isHighlight ? styles.dateAccent : ''}`}>[ {event.date} ]</div>
              <h3 className={styles.eventTitle}>{event.title}</h3>
              <p className={styles.eventDesc}>{event.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

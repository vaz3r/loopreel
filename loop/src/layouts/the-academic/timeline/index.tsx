import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function Timeline({ slide }: LayoutProps) {
  const s = slide as any;
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h2 className={styles.headline}>{s.headline}</h2>
      </div>
      <div className={styles.timeline}>
        <div className={styles.trackLine} />
        {s.events?.map((event: any, idx: number) => (
          <div key={idx} className={styles.event}>
            <div className={styles.phaseLabel} style={{ color: event.highlight ? '#A31F34' : '#475569' }}>{event.date}</div>
            <div className={`${styles.dot} ${event.highlight ? styles.dotHighlight : ''}`} />
            <div className={styles.eventContent}>
              <h3 className={`${styles.eventTitle} ${event.highlight ? styles.eventTitleHighlight : ''}`}>{event.title}</h3>
              <p className={`${styles.eventDesc} ${event.highlight ? styles.eventDescHighlight : ''}`}>{event.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

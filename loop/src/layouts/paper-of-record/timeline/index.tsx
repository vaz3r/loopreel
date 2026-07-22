import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function PaperOfRecordTimeline({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className={styles.timeline}>
      <div className={styles.header}>
        <h2 className={styles.headline}>{s.headline}</h2>
      </div>
      <div className={styles.events}>
        {(s.events || []).map((event: any, idx: number) => (
          <div key={idx} className={styles.event}>
            <div className={`${styles.eventYear} ${event.highlight ? styles.eventYearHighlight : ''}`}>
              {event.date}
            </div>
            <div className={`${styles.eventDot} ${event.highlight ? styles.eventDotHighlight : ''}`} />
            <h3 className={styles.eventTitle}>{event.title}</h3>
            <p className={styles.eventDesc}>{event.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

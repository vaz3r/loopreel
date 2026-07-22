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
      <div className={styles.track}>
        {s.events?.map((event: any, idx: number) => {
          const isHighlight = event.highlight;
          return (
            <div key={idx} className={styles.event}>
              <div className={styles.dateLabel}>{event.date}</div>
              <div className={`${styles.dot} ${isHighlight ? styles.dotHighlight : ''}`} />
              <div className={styles.eventContent}>
                <h3 className={`${styles.eventTitle} ${isHighlight ? styles.eventTitleItalic : ''}`}>{event.title}</h3>
                <p className={`${styles.eventDesc} ${isHighlight ? styles.eventDescHighlight : ''}`}>{event.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

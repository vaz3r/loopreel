import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function Timeline({ slide }: LayoutProps) {
  const s = slide as any;
  const events = s.events || [];

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.kicker}>CHRONOLOGY</div>
        <h2 className={styles.headline}>{s.headline}</h2>
      </div>

      <div className={styles.timelineList}>
        {events.map((event: any, idx: number) => {
          const isHighlight = Boolean(event.highlight);
          const isLast = idx === events.length - 1;

          return (
            <div key={idx} className={styles.eventRow}>
              <div className={styles.dateCol}>
                <span className={styles.dateBadge}>{event.date}</span>
              </div>

              <div className={styles.trackCol}>
                <div className={`${styles.dot} ${isHighlight ? styles.dotHighlight : ''}`} />
                {!isLast && <div className={styles.stem} />}
              </div>

              <div className={styles.contentCol}>
                <h3 className={`${styles.eventTitle} ${isHighlight ? styles.eventTitleHighlight : ''}`}>
                  {event.title}
                </h3>
                <p className={`${styles.eventDesc} ${isHighlight ? styles.eventDescHighlight : ''}`}>
                  {event.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function PremiumSocialTimeline({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className={styles.timeline}>
      {s.tag && <div className={styles.tag}>{s.tag}</div>}
      <div className={styles.headline}>{s.headline}</div>
      <div className={styles.list}>
        {s.events?.map((event: any, i: number) => (
          <div key={i} className={styles.event}>
            <div className={styles.dotCol}>
              <div className={styles.dot} />
              {i < s.events.length - 1 && <div className={styles.line} />}
            </div>
            <div className={styles.body}>
              <div className={styles.date}>{event.date}</div>
              <div className={styles.eventTitle}>{event.title}</div>
              {event.desc && <div className={styles.eventDesc}>{event.desc}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

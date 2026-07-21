import React from 'react';
import { Engine } from '../../../engine-utils';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function PremiumSocialTimeline({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className="flex-1 flex flex-col justify-center min-h-0">
      {s.tag && <div className={styles.tag}>{s.tag}</div>}
      <div className={`${styles.headline} ${Engine.getHeadlineStyle(s.headline)}`}
        style={{ fontFamily: `'${scheme.fontSans}', sans-serif` }}>
        {s.headline}
      </div>
      <div className={styles.list}>
        {s.events?.map((event: any, i: number) => (
          <div key={i} className={styles.event}>
            <div className={styles.dotCol}>
              <div className={styles.dot} />
              {i < s.events.length - 1 && <div className={styles.line} />}
            </div>
            <div className={styles.body}>
              <div className={styles.date}>{event.date}</div>
              <div className={styles.eventTitle}
                style={{ fontFamily: `'${scheme.fontSans}', sans-serif` }}>
                {event.title}
              </div>
              {event.desc && <div className={styles.eventDesc}>{event.desc}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

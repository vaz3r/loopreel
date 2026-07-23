import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function CaseStudy({ slide }: LayoutProps) {
  const s = slide as any;
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h2 className={styles.headline}>{s.headline}</h2>
        <span className={styles.subtitle}>Clinical Observation</span>
      </div>
      <div className={styles.stages}>
        {s.stages?.map((stage: any, idx: number) => (
          <div key={idx} className={`${styles.stage} ${stage.highlighted ? styles.stageHighlight : ''}`}>
            <div className={styles.stageBar} style={{ background: stage.highlighted ? '#A31F34' : idx === 0 ? '#475569' : '#0F172A' }} />
            <div className={styles.stageLabel} style={{ color: stage.highlighted ? '#A31F34' : idx === 0 ? '#475569' : '#0F172A' }}>{stage.label}</div>
            <div>
              <h3 className={`${styles.stageTitle} ${stage.highlighted ? styles.stageTitleHighlight : ''}`}>{stage.title}</h3>
              <p className={styles.stageDesc}>{stage.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

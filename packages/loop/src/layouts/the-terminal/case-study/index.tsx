import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function CaseStudy({ slide }: LayoutProps) {
  const s = slide as any;
  const stageColors = ['#64748B', '#FFB000', '#FF003C'];
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h2 className={styles.headline}>{s.headline}</h2>
        <span className={styles.logId}>ID: FTX_COLLAPSE</span>
      </div>
      <div className={styles.stages}>
        {s.stages?.map((stage: any, idx: number) => {
          const color = stage.highlighted ? '#FF003C' : stageColors[idx] || '#64748B';
          return (
            <div key={idx} className={`${styles.stage} ${stage.highlighted ? styles.stageAlert : ''}`}>
              <div className={styles.stageBar} style={{ background: color }} />
              <div className={styles.stageLabel} style={{ color }}>{stage.label}</div>
              <div>
                <h3 className={`${styles.stageTitle} ${stage.highlighted ? styles.stageTitleAlert : ''}`}>{stage.title}</h3>
                <p className={styles.stageDesc}>{stage.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

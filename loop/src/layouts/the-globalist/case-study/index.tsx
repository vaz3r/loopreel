import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function CaseStudy({ slide }: LayoutProps) {
  const s = slide as any;
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h2 className={styles.headline}>{s.headline}</h2>
        {s.tag && <span className={styles.tag}>{s.tag}</span>}
      </div>
      <div className={styles.stages}>
        {s.stages?.map((stage: any, idx: number) => (
          <div key={idx} className={`${styles.stage} ${idx < s.stages.length - 1 ? styles.stageBorder : ''} ${stage.highlighted ? styles.stageBg : ''}`}>
            {stage.highlighted && <div className={styles.highlightBar} />}
            <div className={`${styles.stageLabel} ${stage.highlighted ? styles.labelAccent : styles.labelNormal}`}>{stage.label}</div>
            <div className={styles.divider} />
            <div>
              <h3 className={styles.stageTitle}>{stage.title}</h3>
              <p className={`${styles.stageDesc} ${stage.highlighted ? styles.descDark : styles.descNormal}`}>{stage.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

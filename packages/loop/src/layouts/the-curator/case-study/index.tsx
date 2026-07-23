import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function CaseStudy({ slide }: LayoutProps) {
  const s = slide as any;
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h2 className={styles.headline}>{s.headline}</h2>
      </div>
      <div className={styles.stages}>
        {s.stages?.map((stage: any, idx: number) => (
          <div key={idx} className={`${styles.stage} ${stage.highlighted ? styles.stageHighlight : ''}`}>
            <div className={styles.stageLabel}>{stage.label}</div>
            <div>
              <h3 className={`${styles.stageTitle} ${stage.highlighted ? styles.stageTitleItalic : ''}`}>{stage.title}</h3>
              <p className={styles.stageDesc}>{stage.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

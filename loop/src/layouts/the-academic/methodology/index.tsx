import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function Methodology({ slide }: LayoutProps) {
  const s = slide as any;
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h2 className={styles.headline}>{s.headline}</h2>
      </div>
      <div className={styles.steps}>
        {s.steps?.map((step: any, idx: number) => (
          <div key={idx} className={`${styles.step} ${step.highlighted ? styles.stepHighlight : ''}`}>
            <div className={styles.stepBorder} style={{ borderColor: step.highlighted ? '#A31F34' : '#0F172A' }} />
            <div className={styles.stepNum} style={{ color: step.highlighted ? '#A31F34' : '#475569' }}>Var. {step.num}</div>
            <div>
              <h3 className={`${styles.stepTitle} ${step.highlighted ? styles.stepTitleHighlight : ''}`}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

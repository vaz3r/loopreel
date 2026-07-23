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
      <div className={styles.content}>
        <div className={styles.trackLine} />
        {s.steps?.map((step: any, idx: number) => (
          <div key={idx} className={`${styles.step} ${step.highlighted ? styles.stepHighlight : ''}`}>
            <div className={styles.stepNum}>{step.num}</div>
            <div>
              <h3 className={`${styles.stepTitle} ${step.highlighted ? styles.stepTitleItalic : ''}`}>{step.title}</h3>
              <p className={`${styles.stepDesc} ${step.highlighted ? styles.stepDescHighlight : ''}`}>{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

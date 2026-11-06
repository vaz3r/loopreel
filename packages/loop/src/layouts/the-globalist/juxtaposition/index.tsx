import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function Juxtaposition({ slide }: LayoutProps) {
  const s = slide as any;
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h2 className={styles.headline}>{s.headline}</h2>
        {s.tag && <span className={styles.tag}>{s.tag}</span>}
      </div>
      <div className={styles.columns}>
        <div className={styles.dontCol}>
          <span className={styles.dontLabel}>Conventional Assumption</span>
          <ul className={styles.list}>
            {s.donts?.map((item: string, idx: number) => (
              <li key={idx} className={styles.dontItem}>
                <span className={styles.cross}>{'\u2715'}</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.doCol}>
          <div className={styles.doTopBar} />
          <span className={styles.doLabel}>Strategic Reality</span>
          <ul className={styles.list}>
            {s.dos?.map((item: string, idx: number) => (
              <li key={idx} className={styles.doItem}>
                <span className={styles.check}>{'\u2713'}</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

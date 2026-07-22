import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function PremiumSocialTable({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className={styles.table}>
      {s.tag && <div className={styles.tag}>{s.tag}</div>}
      <div className={styles.headline}>{s.headline}</div>
      <div className={styles.wrapper}>
        <table className={styles.tableEl}>
          <thead>
            <tr>
              {s.headers?.map((h: string, i: number) => (
                <th key={i} className={styles.headerCell}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {s.rows?.map((row: string[], ri: number) => (
              <tr key={ri}>
                {row.map((cell: string, ci: number) => (
                  <td key={ci} className={styles.cell}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

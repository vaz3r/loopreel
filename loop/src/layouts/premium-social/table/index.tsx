import React from 'react';
import { Engine } from '../../../engine-utils';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function PremiumSocialTable({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className="flex-1 flex flex-col justify-center min-h-0">
      {s.tag && <div className={styles.tag}>{s.tag}</div>}
      <div className={`${styles.headline} ${Engine.getHeadlineStyle(s.headline)}`}
        style={{ fontFamily: `'${scheme.fontSans}', sans-serif` }}>
        {s.headline}
      </div>
      <div className={styles.wrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              {s.headers?.map((h: string, i: number) => (
                <th key={i} className={styles.headerCell}
                  style={{ fontFamily: `'${scheme.fontSans}', sans-serif` }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {s.rows?.map((row: string[], ri: number) => (
              <tr key={ri} className={ri % 2 !== 0 ? styles.evenRow : undefined}>
                {row.map((cell: string, ci: number) => (
                  <td key={ci} className={styles.cell}
                    style={{ fontFamily: `'${scheme.fontSans}', sans-serif` }}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

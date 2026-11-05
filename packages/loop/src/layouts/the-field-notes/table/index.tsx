import React from 'react';
import type { LayoutProps } from '../../shared/types.js';
import styles from '../frame.module.css';
import { Squiggle, renderMarkedText, SlideWrapper } from '../primitives.js';

export default function Table({ slide }: LayoutProps) {
  const s = slide as any;
  const cols: string[] = s.columns || [];
  const rows: (string | number)[][] = s.rows || [];

  const isNumeric = (val: any) =>
    val != null && val !== '' && /\d/.test(String(val)) && /^[\s\d.,%×x+\-−–$€£:]+$/.test(String(val));

  const numCols = cols.map((_, c) => c > 0 && rows.length > 0 && rows.every((r) => r[c] === '' || r[c] == null || isNumeric(r[c])));

  return (
    <SlideWrapper slide={s}>
      {(s.title || s.headline) && (
        <div style={{ marginBottom: 28 }}>
          <h2
            style={{
              fontFamily: 'var(--font-headline, Fraunces, Georgia, serif)',
              fontSize: 54,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: '-0.025em',
              margin: 0,
              color: 'var(--ink-color, #2B2219)',
            }}
          >
            {renderMarkedText(s.title || s.headline)}
          </h2>
          <Squiggle />
        </div>
      )}

      <table className={styles.surveyTable}>
        <thead>
          <tr>
            {cols.map((col, c) => (
              <th key={c} className={numCols[c] ? styles.numeric : undefined}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.slice(0, 7).map((row, rIdx) => {
            const isTotalRow = Boolean(s.total) && rIdx === rows.length - 1;
            return (
              <tr key={rIdx} className={isTotalRow ? styles.totalRow : undefined}>
                {cols.map((_, cIdx) => (
                  <td key={cIdx} className={numCols[cIdx] ? styles.numeric : undefined}>
                    {renderMarkedText(String(row[cIdx] ?? ''))}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </SlideWrapper>
  );
}
export { Table };

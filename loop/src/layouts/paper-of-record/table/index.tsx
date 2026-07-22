import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function PaperOfRecordTable({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  const colCount = (s.headers || []).length;
  const gridTemplate = `repeat(${colCount}, 1fr)`;

  return (
    <div className={styles.table}>
      <div className={styles.header}>
        <h2 className={styles.headline}>{s.headline}</h2>
      </div>
      <div className={styles.tableBody}>
        <div className={styles.tableHead} style={{ gridTemplateColumns: gridTemplate }}>
          {(s.headers || []).map((h: string, i: number) => (
            <div key={i} className={styles.tableHeadCell}>{h}</div>
          ))}
        </div>
        {(s.rows || []).map((row: string[], rowIdx: number) => (
          <div key={rowIdx} className={`${styles.tableRow} ${rowIdx === s.highlightRow ? styles.tableRowHighlight : ''}`}
            style={{ gridTemplateColumns: gridTemplate }}>
            {row.map((cell: string, cellIdx: number) => (
              <div key={cellIdx} className={`${styles.tableCell} ${cellIdx === 0 ? styles.tableCellHead : ''} ${cell.startsWith('+') || cell.startsWith('-') ? styles.tableCellAccent : ''} ${cellIdx === row.length - 1 ? styles.tableCellMuted : ''}`}>
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

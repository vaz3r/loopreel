import React from 'react';
import { Engine } from '../../../engine-utils';
import type { LayoutProps } from '../../shared/types';

export default function BrandTable({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className="flex-1 flex flex-col justify-center min-h-0">
      <h2 className={Engine.getHeadlineStyle(s.headline, scheme.id) + ' mb-6'}
        style={{ fontFamily: `'${scheme.fontSans}', sans-serif`, color: scheme.text }}>
        {s.headline}
      </h2>
      <div className="overflow-hidden rounded-lg" style={{ border: `1px solid ${scheme.border}` }}>
        <table className="w-full text-left" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: scheme.accent }}>
              {s.headers.map((h: string, i: number) => (
                <th key={i} className="px-4 py-3 text-[16px] font-semibold tracking-wide whitespace-nowrap"
                  style={{ fontFamily: `'${scheme.fontSans}', sans-serif`, color: '#fff' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {s.rows.map((row: string[], ri: number) => (
              <tr key={ri} style={{ borderTop: `1px solid ${scheme.border}` }}>
                {row.map((cell: string, ci: number) => (
                  <td key={ci} className="px-4 py-3 text-[17px] font-light"
                    style={{ fontFamily: `'${scheme.fontSans}', sans-serif`, color: scheme.text, opacity: ri % 2 === 0 ? 1 : 0.85 }}>
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

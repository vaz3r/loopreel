import React from 'react';
import { Engine } from '../../../engine-utils';
import type { LayoutProps } from '../../shared/types';

export default function BrutalTable({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  return (
    <div className="flex-1 flex flex-col justify-center min-h-0">
      <div className={`${Engine.getHeadlineStyle(s.headline, scheme.id)} uppercase mb-6`}
        style={{ color: scheme.text, fontFamily: `'${scheme.fontSans}', sans-serif` }}>
        {s.headline}
      </div>
      <div className="flex-1 overflow-auto border-2 min-h-0"
        style={{ borderColor: scheme.border }}>
        <table className="w-full h-full border-collapse">
          <thead>
            <tr>
              {s.headers.map((h: string, i: number) => (
                <th key={i} className="px-4 py-4 text-left text-[18px] font-black uppercase tracking-wider border-2"
                  style={{ backgroundColor: scheme.accent, color: scheme.bg, borderColor: scheme.border, fontFamily: `'${scheme.fontSans}', sans-serif` }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {s.rows.map((row: string[], ri: number) => (
              <tr key={ri}>
                {row.map((cell: string, ci: number) => (
                  <td key={ci} className="px-4 py-3 text-[17px] border-2"
                    style={{ borderColor: scheme.border, fontFamily: `'${scheme.fontMono}', monospace`, color: scheme.text, opacity: ri % 2 === 0 ? 1 : 0.75 }}>
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

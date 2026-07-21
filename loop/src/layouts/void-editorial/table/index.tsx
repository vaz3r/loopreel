import React from 'react';
import { Engine } from '../../../engine-utils';
import type { LayoutProps } from '../../shared/types';

export default function TableLayout({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  const hCls = Engine.getHeadlineStyle(s.headline, scheme.id);

  return (
    <div className="flex-1 flex flex-col justify-center min-h-0">
      <p className="text-[13px] tracking-[0.3em] uppercase mb-3"
        style={{ fontFamily: `'${scheme.fontMono}', monospace`, color: scheme.accent }}>
        {s.tag}
      </p>
      <h1 className={hCls + " mb-6"}
        style={{ fontFamily: `'${scheme.fontSerif}', serif`, color: scheme.text }}>
        {s.headline}
      </h1>
      <div className="flex-1 overflow-y-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              {(s.headers || []).map((h: string, i: number) => (
                <th key={i} className="py-3 px-4 text-[13px] tracking-[0.2em] uppercase font-semibold"
                  style={{ fontFamily: `'${scheme.fontSans}', sans-serif`, color: scheme.text, backgroundColor: scheme.accent }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(s.rows || []).map((row: string[], ri: number) => (
              <tr key={ri} style={{ opacity: ri % 2 === 0 ? 1 : 0.4 }}>
                {row.map((cell: string, ci: number) => (
                  <td key={ci} className="py-3 px-4 text-[16px] font-light border-b"
                    style={{ fontFamily: `'${scheme.fontSans}', sans-serif`, color: scheme.text, borderColor: scheme.border }}>
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

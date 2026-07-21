import React from 'react';
import { Engine } from '../../../engine-utils';
import type { Slide } from '../../../../schema';
import type { LayoutProps } from '../../shared/types';

export default function ArchivePaperTable({ slide, scheme }: LayoutProps) {
  const s = slide as any;
  const headers = s.headers || [];
  const rows = s.rows || [];
  return (
    <div className="flex-1 flex flex-col justify-center min-h-0">
      <div className="px-8">
        {s.headline && (
          <h2 className={Engine.getHeadlineStyle(s.headline, scheme.id)}
            style={{ fontFamily: `'${scheme.fontSerif}', serif`, color: scheme.text, textAlign: 'center' }}>
            {s.headline}
          </h2>
        )}
        <div className="mt-8 overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {headers.map((h: string, i: number) => (
                  <th key={i}
                    className="text-left py-3 px-4 text-[16px] font-semibold tracking-[0.05em] uppercase"
                    style={{
                      fontFamily: `'${scheme.fontSans}', sans-serif`,
                      color: scheme.accent,
                      borderBottom: `1px solid ${scheme.border}`,
                      borderRight: i < headers.length - 1 ? `1px solid ${scheme.border}` : 'none'
                    }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.slice(0, 8).map((row: string[], ri: number) => (
                <tr key={ri}>
                  {row.map((cell: string, ci: number) => (
                    <td key={ci}
                      className="py-2.5 px-4 text-[15px]"
                      style={{
                        fontFamily: `'${scheme.fontSerif}', serif`,
                        color: scheme.text,
                        borderBottom: `1px solid ${scheme.border}`,
                        borderRight: ci < headers.length - 1 ? `1px solid ${scheme.border}` : 'none',
                        opacity: 0.85
                      }}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Engine, type Scheme } from './engine-utils';
import type { Slide } from '../schema';

interface SlideRendererProps {
  slide: Slide;
  scheme: Scheme;
  brandKit?: { logoUrl: string; text: string };
}

export default function SlideRenderer({ slide, scheme, brandKit }: SlideRendererProps) {
  const isCustomBrand = scheme.id === 'custom_brand';

  return (
    <div
      id="export-canvas"
      className="w-[1080px] h-[1350px] relative overflow-hidden shadow-2xl flex flex-col"
      style={{
        backgroundColor: scheme.bg,
        color: scheme.text,
        fontFamily: `'${scheme.fontSans}', sans-serif`,
        overflowWrap: 'break-word', hyphens: 'auto'
      }}
    >
      {slide.type === "image-cover" && slide.imageUrl && (
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${slide.imageUrl})` }}></div>
          <div className="absolute inset-0 opacity-85 mix-blend-multiply" style={{ backgroundColor: scheme.bg }}></div>
          <div className="absolute inset-0 opacity-60" style={{ backgroundColor: scheme.bg }}></div>
        </div>
      )}

      <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-[60px]">
        <div className="flex justify-between w-full">
          <div className="w-10 h-10 border-t-2 border-l-2" style={{ borderColor: scheme.border }}></div>
          <div className="w-10 h-10 border-t-2 border-r-2" style={{ borderColor: scheme.border }}></div>
        </div>
        <div className="flex justify-between w-full">
          <div className="w-10 h-10 border-b-2 border-l-2" style={{ borderColor: scheme.border }}></div>
          <div className="w-10 h-10 border-b-2 border-r-2" style={{ borderColor: scheme.border }}></div>
        </div>
      </div>

      <div
        className="absolute top-[80px] left-[100px] right-[100px] flex justify-between items-baseline font-mono text-[16px] font-bold tracking-[0.25em] uppercase border-b pb-6 z-20"
        style={{ borderColor: scheme.gridBorder }}
      >
        <span className="truncate max-w-[60%]">{slide.tag}</span>
        {isCustomBrand && brandKit?.logoUrl ? (
          <img src={brandKit.logoUrl} alt="Brand Logo" className="h-[24px] object-contain shrink-0" style={{ filter: brandKit.text === '#FFFFFF' || brandKit.text === '#F8FAFC' ? 'invert(1)' : 'none' }} />
        ) : (
          <span style={{ color: scheme.accent }}>{scheme.name.split(' ')[0]}</span>
        )}
      </div>

      <div
        className="absolute bottom-[80px] left-[100px] right-[100px] flex justify-between items-baseline font-mono text-[16px] font-bold tracking-[0.2em] uppercase border-t pt-6 z-20"
        style={{ borderColor: scheme.gridBorder }}
      >
        <span className="opacity-60 truncate max-w-[50%]">{slide.footerLeft}</span>
        <span style={{ color: scheme.accent }} className="truncate max-w-[50%]">{slide.footerRight}</span>
      </div>

      <div className="absolute inset-x-[100px] top-[180px] bottom-[180px] z-10 flex flex-col justify-center min-h-0">

        {slide.type === "cover" && (
          <div className="flex-1 flex flex-col justify-between py-4 min-h-0">
            <div className="flex-1 flex flex-col justify-center min-h-0">
              <h2 className={Engine.getHeadlineStyle(slide.headline, scheme.id)} style={{ fontFamily: `'${scheme.fontSerif}', serif`, textWrap: 'balance' }}>
                {slide.headline}
              </h2>
            </div>
            <div className="shrink-0 space-y-8 border-t pt-10" style={{ borderColor: scheme.gridBorder }}>
              <div className="grid grid-cols-12 gap-8 items-end">
                <div className="col-span-9 min-w-0">
                  <p className={`${Engine.getBodyStyle(slide.subheadline)} opacity-90`} style={{ textWrap: 'pretty' }}>{slide.subheadline}</p>
                </div>
                <div className="col-span-3 min-w-0 flex justify-end">
                  <span className="font-mono text-[14px] tracking-widest font-bold opacity-60 text-right truncate w-full block">{slide.metadata}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {slide.type === "sequence" && (
          <div className="flex-1 flex flex-col justify-between py-4 min-h-0">
            <div className="shrink-0 mb-10 min-w-0">
              <h2 className={Engine.getHeadlineStyle(slide.headline, scheme.id)} style={{ fontFamily: `'${scheme.fontSerif}', serif` }}>
                {slide.headline}
              </h2>
            </div>
            <div className="flex-1 grid grid-cols-1 border-t pt-8 min-h-0 overflow-hidden" style={{ borderColor: scheme.border }}>
              {slide.items.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-8 items-center border-b pb-6 mb-6 last:border-b-0 last:mb-0 last:pb-0 min-h-0 shrink-0" style={{ borderColor: scheme.gridBorder }}>
                  <div className="col-span-2">
                    <span className="text-[40px] font-bold font-mono tracking-tighter" style={{ color: scheme.accent }}>{item.num}</span>
                  </div>
                  <div className="col-span-10 min-w-0">
                    <h4 className="text-[32px] font-bold tracking-tight leading-[1.2] uppercase line-clamp-1 mb-2">{item.title}</h4>
                    <p className="text-[22px] leading-[1.4] opacity-80 font-light line-clamp-2 break-words text-wrap-pretty">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {slide.type === "quote" && (
          <div className="flex-1 flex flex-col justify-center items-center text-center min-h-0 px-10">
            <div className="text-[180px] leading-[0.5] font-serif mb-6 shrink-0" style={{ color: scheme.accent, fontFamily: `'${scheme.fontSerif}', serif` }}>"</div>
            <h2 className="text-[52px] leading-[1.2] font-medium italic text-wrap-balance mb-12 shrink-0 line-clamp-5" style={{ fontFamily: `'${scheme.fontSerif}', serif` }}>
              {slide.quote}
            </h2>
            <div className="flex flex-col items-center border-t pt-8 shrink-0 min-w-0 w-[60%]" style={{ borderColor: scheme.border }}>
              <span className="text-[24px] font-bold tracking-widest uppercase mb-2 line-clamp-1">{slide.author}</span>
              <span className="text-[18px] font-mono tracking-widest opacity-60 uppercase line-clamp-1" style={{ color: scheme.accent }}>{slide.role}</span>
            </div>
          </div>
        )}

        {slide.type === "telemetry" && (
          <div className="flex-1 flex flex-col py-4 min-h-0">
            <div className="shrink-0 mb-10 min-w-0">
              <h2 className={Engine.getHeadlineStyle(slide.headline, scheme.id)} style={{ fontFamily: `'${scheme.fontSerif}', serif` }}>
                {slide.headline}
              </h2>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-10 min-h-0 border-t pt-10" style={{ borderColor: scheme.border }}>
              {slide.stats.map((stat, i) => (
                <div key={i} className="flex flex-col justify-center border-l-4 pl-8 min-h-0 px-6" style={{ borderColor: scheme.accent, backgroundColor: scheme.gridBorder }}>
                  <div className="text-[90px] font-mono font-bold leading-none tracking-tighter mb-4 line-clamp-1" style={{ color: scheme.text }}>{stat.value}</div>
                  <div className="text-[24px] font-sans font-semibold uppercase tracking-widest opacity-60 line-clamp-2">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {slide.type === "table" && (
          <div className="flex-1 flex flex-col py-4 min-h-0">
            <div className="shrink-0 mb-8 min-w-0">
              <h2 className={Engine.getHeadlineStyle(slide.headline, scheme.id)} style={{ fontFamily: `'${scheme.fontSerif}', serif` }}>
                {slide.headline}
              </h2>
            </div>
            <div className="flex-1 min-h-0 flex flex-col bg-opacity-5 rounded-sm overflow-hidden" style={{ backgroundColor: scheme.gridBorder }}>
              <div className="grid border-b-2 shrink-0" style={{ borderColor: scheme.border, gridTemplateColumns: `repeat(${slide.headers.length}, minmax(0, 1fr))` }}>
                {slide.headers.map((h, i) => (
                  <div key={i} className="py-5 px-6 text-[18px] font-mono tracking-widest uppercase opacity-60 font-medium truncate">
                    {h}
                  </div>
                ))}
              </div>
              <div className="flex-1 overflow-hidden flex flex-col">
                {slide.rows.map((row, i) => (
                  <div key={i} className="grid border-b last:border-b-0 flex-1 items-center" style={{ borderColor: scheme.gridBorder, gridTemplateColumns: `repeat(${slide.headers.length}, minmax(0, 1fr))` }}>
                    {row.map((cell, j) => (
                      <div key={j} className="py-4 px-6 text-[22px] leading-[1.3] font-medium line-clamp-3" style={{ color: j === 0 ? scheme.text : scheme.text + 'CC', fontFamily: j === 0 ? `'${scheme.fontSans}', sans-serif` : `'${scheme.fontMono}', monospace` }}>
                        {cell}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {slide.type === "definition" && (
          <div className="flex-1 flex flex-col justify-center min-h-0 py-10 px-8">
            <div className="shrink-0 mb-6 min-w-0">
              <h2 className={Engine.getHeadlineStyle(slide.term, scheme.id)} style={{ fontFamily: `'${scheme.fontSerif}', serif`, fontSize: slide.term.length > 12 ? '90px' : '140px', lineHeight: '0.9' }}>
                {slide.term}.
              </h2>
            </div>
            <div className="font-mono text-[24px] tracking-widest opacity-60 mb-12 shrink-0" style={{ color: scheme.accent }}>
              [{slide.phonetic}]
            </div>
            <div className="border-l-4 pl-10 py-2 shrink-0 min-w-0" style={{ borderColor: scheme.accent }}>
              <p className={`${Engine.getBodyStyle(slide.definition, true)} opacity-90 mb-8`}>
                {slide.definition}
              </p>
              {slide.example && (
                <p className="text-[20px] font-mono opacity-60 leading-[1.6] line-clamp-3">
                  {slide.example}
                </p>
              )}
            </div>
          </div>
        )}

        {slide.type === "dichotomy" && (
          <div className="flex-1 flex flex-col py-4 min-h-0">
            <div className="shrink-0 mb-10 min-w-0">
              <h2 className={Engine.getHeadlineStyle(slide.headline, scheme.id)} style={{ fontFamily: `'${scheme.fontSerif}', serif` }}>
                {slide.headline}
              </h2>
            </div>
            <div className="flex-1 grid grid-cols-2 min-h-0 border-t" style={{ borderColor: scheme.border }}>
              <div className="flex flex-col border-r pr-10 pt-10 min-h-0" style={{ borderColor: scheme.border }}>
                <h3 className="text-[36px] font-bold uppercase tracking-tight leading-[1.2] opacity-50 mb-6 line-clamp-2">{slide.left.title}</h3>
                <p className="text-[24px] font-light leading-[1.6] opacity-70 line-clamp-10">{slide.left.desc}</p>
              </div>
              <div className="flex flex-col pl-10 pt-10 min-h-0">
                <h3 className="text-[42px] font-bold uppercase tracking-tight leading-[1.1] mb-6 line-clamp-2" style={{ color: scheme.accent }}>{slide.right.title}</h3>
                <p className="text-[28px] font-medium leading-[1.5] opacity-95 line-clamp-10">{slide.right.desc}</p>
              </div>
            </div>
          </div>
        )}

        {slide.type === "timeline" && (
          <div className="flex-1 flex flex-col py-4 min-h-0">
            <div className="shrink-0 mb-12 min-w-0">
              <h2 className={Engine.getHeadlineStyle(slide.headline, scheme.id)} style={{ fontFamily: `'${scheme.fontSerif}', serif` }}>
                {slide.headline}
              </h2>
            </div>
            <div className="flex-1 flex flex-col justify-between relative border-l-2 ml-[8px]" style={{ borderColor: scheme.gridBorder }}>
              {slide.events.map((event, idx) => (
                <div key={idx} className="relative pl-12 pb-8 last:pb-0 min-h-0 flex-1 flex flex-col justify-center">
                  <div className="absolute left-[-11px] top-1/2 -translate-y-1/2 w-[20px] h-[20px] rounded-full border-4 z-10" style={{ backgroundColor: scheme.bg, borderColor: scheme.accent }}></div>
                  <div className="min-w-0">
                    <span className="font-mono text-[16px] tracking-[0.2em] uppercase font-bold opacity-60 mb-2 block" style={{ color: scheme.accent }}>{event.date}</span>
                    <h4 className="text-[34px] font-bold tracking-tight leading-[1.1] uppercase line-clamp-1 mb-3">{event.title}</h4>
                    <p className="text-[22px] leading-[1.5] opacity-80 font-light line-clamp-3 break-words text-wrap-pretty">{event.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {slide.type === "image-split" && (
          <div className="flex-1 grid grid-cols-2 min-h-0 w-full h-full gap-10">
            <div className="col-span-1 flex flex-col justify-center min-h-0 border-r pr-10" style={{ borderColor: scheme.border }}>
              <h2 className={`${Engine.getHeadlineStyle(slide.headline, scheme.id)} mb-8`} style={{ fontFamily: `'${scheme.fontSerif}', serif` }}>
                {slide.headline}
              </h2>
              <p className={`${Engine.getBodyStyle(slide.bodyText)} opacity-90`}>
                {slide.bodyText}
              </p>
            </div>
            <div className="col-span-1 flex flex-col py-6">
              <div className="w-full flex-1 bg-cover bg-center rounded-sm border" style={{ backgroundImage: `url(${slide.imageUrl})`, borderColor: scheme.gridBorder, filter: 'grayscale(30%) contrast(1.1)' }}></div>
            </div>
          </div>
        )}

        {slide.type === "image-cover" && (
          <div className="flex-1 flex flex-col justify-center items-center text-center min-h-0 px-8">
            <div className="w-[2px] h-[100px] mb-10 shrink-0" style={{ backgroundColor: scheme.accent }}></div>
            <h2 className={Engine.getHeadlineStyle(slide.headline, scheme.id)} style={{ fontFamily: `'${scheme.fontSerif}', serif`, textWrap: 'balance' }}>
              {slide.headline}
            </h2>
            <p className={`${Engine.getBodyStyle(slide.subtext)} mx-auto max-w-[80%] opacity-90 mt-10`}>
              {slide.subtext}
            </p>
          </div>
        )}

        {slide.type === "cta" && (
          <div className="flex-1 flex flex-col justify-center items-center text-center min-h-0">
            <div className="space-y-8 w-full shrink-0 min-w-0 mb-16">
              <span className="font-mono text-[18px] tracking-[0.3em] uppercase block" style={{ color: scheme.accent }}>[ INITIATE SEQUENCE ]</span>
              <h2 className={Engine.getHeadlineStyle(slide.headline, scheme.id)} style={{ fontFamily: `'${scheme.fontSerif}', serif`, textWrap: 'balance' }}>
                {slide.headline}
              </h2>
              <p className={`${Engine.getBodyStyle(slide.subtext)} mx-auto max-w-[85%] opacity-80`}>{slide.subtext}</p>
            </div>
            <div className="shrink-0 min-w-0 mb-10">
              <div className="border-2 px-14 py-6 text-[22px] font-bold font-mono tracking-[0.25em] uppercase transition-all cursor-pointer truncate max-w-[800px]" style={{ borderColor: scheme.accent, color: scheme.accent }}>
                {slide.actionLabel}
              </div>
            </div>
            <div className="font-mono text-[16px] tracking-widest opacity-60 truncate max-w-[80%] shrink-0">CONNECT // {slide.socialHandle}</div>
          </div>
        )}

      </div>
    </div>
  );
}

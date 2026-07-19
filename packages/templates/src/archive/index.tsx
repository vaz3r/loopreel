import React from 'react';

// ── Types ──
export type ThemeKey = 'void' | 'bone' | 'steel';

export interface TemplateProps {
  slide: any;
  meta: any;
  slideIndex: number;
  slideCount: number;
}

// ── Themes (template-local) ──
export const themes = {
  void: {
    bg: '#080808',
    fg: '#F4F4F0',
    border: 'rgba(244,244,240,0.4)',
    muted: 'rgba(244,244,240,0.6)',
  },
  bone: {
    bg: '#F4F4F0',
    fg: '#080808',
    border: 'rgba(8,8,8,0.4)',
    muted: 'rgba(8,8,8,0.6)',
  },
  steel: {
    bg: '#D1D0CA',
    fg: '#080808',
    border: 'rgba(8,8,8,0.4)',
    muted: 'rgba(8,8,8,0.7)',
  },
};

// ── Local Components (template-owned) ──
const RegMarks = ({ theme }: { theme: ThemeKey }) => {
  const borderColor = theme === 'void' ? 'border-[rgba(244,244,240,0.4)]' : 'border-[rgba(8,8,8,0.4)]';
  return (
    <div className="absolute inset-[40px] pointer-events-none z-10">
      <div className={`absolute top-0 left-0 w-[30px] h-[30px] border-t-2 border-l-2 ${borderColor}`}></div>
      <div className={`absolute top-0 right-0 w-[30px] h-[30px] border-t-2 border-r-2 ${borderColor}`}></div>
      <div className={`absolute bottom-0 left-0 w-[30px] h-[30px] border-b-2 border-l-2 ${borderColor}`}></div>
      <div className={`absolute bottom-0 right-0 w-[30px] h-[30px] border-b-2 border-r-2 ${borderColor}`}></div>
    </div>
  );
};

const Crosshairs = () => (
  <>
    <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-[rgba(128,128,128,0.15)] z-0"></div>
    <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-[rgba(128,128,128,0.15)] z-0"></div>
  </>
);

const MicroHeader = ({ left, right, theme }: { left: string; right: string; theme: ThemeKey }) => {
  const textColor = theme === 'void' ? 'text-[rgba(244,244,240,0.6)]' : 'text-[rgba(8,8,8,0.6)]';
  return (
    <div className={`absolute top-[70px] left-[80px] right-[80px] flex justify-between text-[24px] font-bold tracking-[0.25em] uppercase z-10 ${textColor}`}>
      <span>{left}</span>
      <span>{right}</span>
    </div>
  );
};

const MicroFooter = ({ left, right, theme }: { left: string; right: string; theme: ThemeKey }) => {
  const textColor = theme === 'void' ? 'text-[rgba(244,244,240,0.6)]' : 'text-[rgba(8,8,8,0.6)]';
  return (
    <div className={`absolute bottom-[70px] left-[80px] right-[80px] flex justify-between items-end text-[22px] font-semibold tracking-[0.15em] uppercase z-10 ${textColor}`}>
      <span>{left}</span>
      <span>{right}</span>
    </div>
  );
};

const SafeArea = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`absolute top-[160px] bottom-[160px] left-[80px] right-[80px] flex flex-col z-10 overflow-hidden ${className}`}>
    {children}
  </div>
);

// ── Slide Layouts (8 types) ──

// 1. Cover Layout
const CoverLayout = ({ data }: { data: any }) => (
  <>
    <Crosshairs />
    <SafeArea className="justify-center">
      <div className="flex flex-col w-full font-serif font-light leading-[0.85] tracking-[-0.03em] uppercase break-words">
        <span className="block text-[220px] line-clamp-2 w-full">{data.titleTop}</span>
        <span className="block text-[220px] line-clamp-2 w-full ml-[10%] italic text-[rgba(255,255,255,0.7)]">{data.titleBottom}</span>
      </div>
    </SafeArea>
    <div className="absolute bottom-[160px] left-0 w-full border-t-2 border-b-2 border-[rgba(244,244,240,0.2)] py-[24px] px-[80px] text-[24px] font-semibold tracking-[0.3em] uppercase whitespace-nowrap overflow-hidden text-ellipsis z-10">
      {data.ticker}
    </div>
  </>
);

// 2. Context Layout
const ContextLayout = ({ data }: { data: any }) => (
  <SafeArea className="justify-center">
    <h2 className="font-serif text-[120px] font-normal leading-[0.9] tracking-[-0.02em] mb-[60px] line-clamp-2">{data.title}</h2>
    <p className="font-serif text-[52px] leading-[1.3] font-normal max-w-[850px] text-[rgba(8,8,8,0.8)] line-clamp-6">{data.text}</p>
  </SafeArea>
);

// 3. List Layout
const ListLayout = ({ data }: { data: any }) => (
  <SafeArea>
    <h2 className="font-serif text-[100px] font-normal leading-[0.9] tracking-[-0.02em] mb-[60px] shrink-0">{data.title}</h2>
    <div className="flex flex-col flex-1 overflow-hidden">
      {data.items.map((item: any, idx: number) => (
        <div key={idx} className="flex-1 min-h-0 flex items-start gap-[40px] border-t-2 border-[rgba(8,8,8,0.15)] py-[30px] overflow-hidden">
          <span className="font-sans text-[32px] font-bold opacity-50 w-[60px] shrink-0 pt-2">{item.num}</span>
          <div className="font-serif text-[42px] leading-[1.25] font-normal max-w-[700px] flex flex-col justify-center h-full">
            <strong className="font-sans text-[30px] font-semibold block mb-[8px] uppercase tracking-[0.05em] truncate">{item.label}</strong>
            <span className="line-clamp-2">{item.desc}</span>
          </div>
        </div>
      ))}
    </div>
  </SafeArea>
);

// 4. Matrix Layout
const MatrixLayout = ({ data }: { data: any }) => (
  <>
    <Crosshairs />
    <SafeArea className="items-center justify-center">
      <h2 className="font-serif text-[70px] font-normal leading-[0.9] tracking-[-0.02em] mb-[60px] bg-[#D1D0CA] px-8 py-2 text-center line-clamp-2 z-20 absolute top-0">
        {data.title}
      </h2>
      <div className="w-full max-w-[800px] aspect-square border-4 border-[rgba(8,8,8,0.8)] relative flex flex-wrap mt-[60px]">
        <div className="absolute top-1/2 left-0 right-0 h-[4px] bg-[rgba(8,8,8,0.8)]"></div>
        <div className="absolute left-1/2 top-0 bottom-0 w-[4px] bg-[rgba(8,8,8,0.8)]"></div>
        
        {data.quadrants.map((q: any, idx: number) => (
          <div key={idx} className="w-1/2 h-1/2 flex flex-col items-center justify-center p-8 text-center overflow-hidden">
            <span className="font-sans text-[20px] font-bold tracking-[0.2em] uppercase mb-[16px] opacity-60 truncate w-full">{q.title}</span>
            <span className="font-serif text-[36px] leading-[1.1] line-clamp-4">{q.text}</span>
          </div>
        ))}
      </div>
    </SafeArea>
  </>
);

// 5. Insight Layout
const InsightLayout = ({ data }: { data: any }) => (
  <SafeArea className="justify-center items-end text-right">
    <h2 className="font-serif text-[130px] font-light leading-[0.9] tracking-[-0.02em] mb-[60px] italic line-clamp-2">{data.title}</h2>
    <p className="font-sans text-[40px] leading-[1.5] font-light max-w-[800px] text-[rgba(244,244,240,0.8)] tracking-wide line-clamp-6">{data.text}</p>
  </SafeArea>
);

// 6. Quote Layout
const QuoteLayout = ({ data }: { data: any }) => (
  <>
    <Crosshairs />
    <SafeArea className="items-center justify-center text-center px-[40px]">
      <div className="relative w-full flex flex-col items-center">
        <div className="w-[2px] h-[120px] bg-[#080808] mx-auto mb-[60px] shrink-0"></div>
        <div className="font-serif text-[75px] font-normal italic leading-[1.1] tracking-[-0.01em] mb-[60px] line-clamp-5">{data.quote}</div>
        <div className="font-sans text-[24px] font-bold tracking-[0.25em] uppercase text-[rgba(8,8,8,0.7)] truncate w-full">{data.author}</div>
      </div>
    </SafeArea>
  </>
);

// 7. Evidence Layout
const EvidenceLayout = ({ data }: { data: any }) => (
  <SafeArea className="justify-between">
    <h2 className="font-serif text-[100px] font-normal leading-[0.9] tracking-[-0.02em] line-clamp-2 shrink-0">{data.title}</h2>
    <div className="flex flex-col gap-[60px] flex-1 justify-center overflow-hidden">
      {data.stats.map((stat: any, idx: number) => (
        <div key={idx} className="flex flex-col">
          <span className="font-sans text-[160px] font-bold leading-[0.8] tracking-tighter mb-[20px] truncate">{stat.value}</span>
          <span className="font-serif text-[38px] font-normal italic border-t-2 border-[#080808] pt-[20px] max-w-[700px] line-clamp-2">{stat.label}</span>
        </div>
      ))}
    </div>
  </SafeArea>
);

// 8. CTA Layout
const CtaLayout = ({ data }: { data: any }) => (
  <>
    <div className="absolute top-[30%] left-0 right-0 h-[2px] bg-[rgba(244,244,240,0.1)] z-0"></div>
    <div className="absolute top-[70%] left-0 right-0 h-[2px] bg-[rgba(244,244,240,0.1)] z-0"></div>
    <SafeArea className="justify-center items-center">
      <div className="font-serif text-[130px] font-light leading-[0.9] text-center mb-[80px] line-clamp-3" dangerouslySetInnerHTML={{__html: data.title}}></div>
      <div className="border-2 border-[#F4F4F0] rounded-[200px] px-[80px] py-[30px] text-[26px] font-bold tracking-[0.25em] uppercase flex items-center gap-[20px] max-w-full overflow-hidden shrink-0">
        <span className="truncate">{data.buttonText}</span> <span className="font-sans text-[32px] font-light -mt-[4px] shrink-0">→</span>
      </div>
    </SafeArea>
  </>
);

// ── Slide Registry ──
const slideRegistry: Record<string, React.ComponentType<any>> = {
  cover: CoverLayout,
  context: ContextLayout,
  list: ListLayout,
  matrix: MatrixLayout,
  insight: InsightLayout,
  quote: QuoteLayout,
  evidence: EvidenceLayout,
  cta: CtaLayout,
};

// ── Theme Styles ──
const themeStyles: Record<ThemeKey, string> = {
  void: 'bg-[#080808] text-[#F4F4F0]',
  bone: 'bg-[#F4F4F0] text-[#080808]',
  steel: 'bg-[#D1D0CA] text-[#080808]',
};

// ── Main Component ──
function ArchiveTemplate({ slide }: TemplateProps) {
  const theme: ThemeKey = slide.theme ?? 'void';
  const Layout = slideRegistry[slide.type] ?? CoverLayout;
  
  return (
    <div
      className={`relative w-[1080px] h-[1350px] overflow-hidden flex flex-col ${themeStyles[theme]}`}
      style={{ fontFamily: "'Manrope', sans-serif" }}
    >
      <RegMarks theme={theme} />
      <MicroHeader left={slide.headerLeft} right={slide.headerRight} theme={theme} />
      
      <Layout data={slide} />
      
      <MicroFooter left={slide.footerLeft} right={slide.footerRight} theme={theme} />
    </div>
  );
}

// ── Template Metadata ──
ArchiveTemplate.meta = {
  id: 'archive',
  name: 'Archive',
  description: 'Brutalist typographic carousel with 8 slide types: cover, context, list, matrix, insight, quote, evidence, cta',
  format: 'portrait' as const,
  themes: Object.keys(themes),
  fonts: {
    heading: "'Cormorant Garamond', serif",
    body: "'Manrope', sans-serif",
  },
  slideTypes: [
    { type: 'cover', description: 'Title slide with two-line heading and ticker', fields: { titleTop: 'max:15', titleBottom: 'max:15', ticker: 'max:120' } },
    { type: 'context', description: 'Paragraph slide with title and body text', fields: { title: 'max:20', text: 'max:200' } },
    { type: 'list', description: 'Numbered list of items with labels and descriptions', fields: { title: 'max:20', items: 'min:3,max:4' } },
    { type: 'matrix', description: '2x2 quadrant grid with title', fields: { title: 'max:20', quadrants: 'min:4,max:4' } },
    { type: 'insight', description: 'Right-aligned quote-style insight with title and body', fields: { title: 'max:20', text: 'max:200' } },
    { type: 'quote', description: 'Large centered quote with attribution', fields: { quote: 'max:200', author: 'max:40' } },
    { type: 'evidence', description: 'Stats grid with large numbers and labels', fields: { title: 'max:20', stats: 'min:2,max:4' } },
    { type: 'cta', description: 'Call to action with button', fields: { title: 'max:30', buttonText: 'max:20' } },
  ],
};

export default ArchiveTemplate;

export const SCHEMES = {
  archive_paper: {
    id: 'archive_paper', name: 'Archive Paper',
    bg: '#EBEAE5', text: '#111111', accent: '#003049',
    border: 'rgba(17, 17, 17, 0.2)', gridBorder: 'rgba(17, 17, 17, 0.1)',
    fontSerif: 'Playfair Display', fontSans: 'Manrope', fontMono: 'Space Mono'
  },
  globalist_editorial: {
    id: 'globalist_editorial', name: 'The Globalist',
    bg: '#F5F5F1', text: '#111111', accent: '#E3120B',
    border: 'rgba(17, 17, 17, 0.2)', gridBorder: 'rgba(17, 17, 17, 0.1)',
    fontSerif: 'Crimson Pro', fontSans: 'Oswald', fontMono: 'Inter'
  },
  custom_brand: {
    id: 'custom_brand', name: 'Custom Brand Kit',
    bg: '#0F172A', text: '#F8FAFC', accent: '#38BDF8',
    border: 'rgba(248, 250, 252, 0.2)', gridBorder: 'rgba(248, 250, 252, 0.1)',
    fontSerif: 'Playfair Display', fontSans: 'Inter', fontMono: 'Space Mono'
  },
  terminal_dark: {
    id: 'terminal_dark', name: 'The Terminal',
    bg: '#080808', text: '#E2E8F0', accent: '#FFB000',
    border: '#2A2A2A', gridBorder: '#2A2A2A33',
    fontSerif: 'Inter', fontSans: 'JetBrains Mono', fontMono: 'JetBrains Mono'
  },
  curator_gallery: {
    id: 'curator_gallery', name: 'The Curator',
    bg: '#FFFFFF', text: '#000000', accent: '#000000',
    border: '#E5E5E5', gridBorder: '#E5E5E5',
    fontSerif: 'Cormorant Garamond', fontSans: 'Inter', fontMono: 'Inter'
  },
  academic_research: {
    id: 'academic_research', name: 'The Academic',
    bg: '#FFFFFF', text: '#0F172A', accent: '#A31F34',
    border: '#CBD5E1', gridBorder: '#CBD5E1',
    fontSerif: 'Merriweather', fontSans: 'Source Sans 3', fontMono: 'IBM Plex Mono'
  },
};

export type Scheme = typeof SCHEMES[keyof typeof SCHEMES];

export const injectFonts = (customFonts: string[] = []) => {
  if (typeof document === 'undefined') return;
  const baseFonts = 'family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Manrope:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,600;0,800;1,400;1,600&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,500;0,8..60,600;1,8..60,400&family=Inter:wght@300;400;500;600;700;800;900&family=Crimson+Pro:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600&family=Oswald:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700;800&family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700&family=Source+Sans+3:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;1,400';

  const customQuery = customFonts
    .filter(Boolean)
    .map(font => `family=${font.replace(/\s+/g, '+')}:wght@300;400;600;700`)
    .join('&');

  const finalQuery = customQuery ? `${baseFonts}&${customQuery}` : baseFonts;
  const href = `https://fonts.googleapis.com/css2?${finalQuery}&display=swap`;

  let link = document.getElementById('editorial-fonts-v3') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.id = 'editorial-fonts-v3';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }

  if (link.getAttribute('href') !== href) {
    link.setAttribute('href', href);
  }
};

export const Engine = {
  getHeadlineStyle: (text = '', themeId?: string) => {
    const len = text.length;
    const weight = 'font-light italic tracking-tight';
    const align = 'text-wrap-balance break-words';
    if (len < 18) return `text-[130px] leading-[0.88] line-clamp-2 ${weight} ${align}`;
    if (len < 35) return `text-[95px] leading-[0.92] line-clamp-3 ${weight} ${align}`;
    if (len < 65) return `text-[72px] leading-[0.95] line-clamp-4 ${weight} ${align}`;
    return `text-[54px] leading-[1.0] line-clamp-4 ${weight} ${align}`;
  },
  getBodyStyle: (text = '', isHighlight = false) => {
    const len = text.length;
    const align = 'text-wrap-pretty break-words';
    if (isHighlight) {
      if (len < 50) return `text-[36px] leading-[1.3] font-semibold line-clamp-3 ${align}`;
      return `text-[28px] leading-[1.4] font-semibold line-clamp-4 ${align}`;
    }
    if (len < 120) return `text-[38px] leading-[1.45] font-light line-clamp-5 ${align}`;
    if (len < 250) return `text-[30px] leading-[1.5] font-light line-clamp-8 ${align}`;
    if (len < 400) return `text-[24px] leading-[1.55] font-normal line-clamp-10 ${align}`;
    return `text-[20px] leading-[1.6] font-normal line-clamp-12 ${align}`;
  }
};

export const chunkArray = <T>(arr: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

const PAGINATION_LIMITS: Record<string, { field: string; chunkSize: number }> = {
  sequence: { field: 'items', chunkSize: 4 },
  telemetry: { field: 'stats', chunkSize: 4 },
  timeline: { field: 'events', chunkSize: 4 },
};

export function paginateContract(contract: { slides: Record<string, any>[] }): { slides: Record<string, any>[] } {
  const result: Record<string, any>[] = [];

  for (const slide of contract.slides) {
    const rule = PAGINATION_LIMITS[slide.type];
    if (!rule || !slide[rule.field] || slide[rule.field].length <= rule.chunkSize) {
      result.push(slide);
      continue;
    }

    const chunks = chunkArray(slide[rule.field], rule.chunkSize);
    chunks.forEach((chunk, idx) => {
      const paginated = {
        ...slide,
        [rule.field]: chunk,
        _virtualId: `${slide.id}-part-${idx + 1}`,
        tag: chunks.length > 1 ? `${slide.tag || slide.type.toUpperCase()} [${idx + 1}/${chunks.length}]` : slide.tag,
        footerRight: slide.footerRight
          ? chunks.length > 1
            ? `${slide.footerRight} (${idx + 1}/${chunks.length})`
            : slide.footerRight
          : undefined,
      };
      result.push(paginated);
    });
  }

  return { slides: result };
}

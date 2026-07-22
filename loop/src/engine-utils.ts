export const SCHEMES = {
  void_editorial: {
    id: 'void_editorial', name: 'Void Editorial',
    bg: '#050505', text: '#F4F4F0', accent: '#E63946',
    border: 'rgba(244, 244, 240, 0.15)', gridBorder: 'rgba(244, 244, 240, 0.08)',
    fontSerif: 'Cormorant Garamond', fontSans: 'Manrope', fontMono: 'Space Mono'
  },
  archive_paper: {
    id: 'archive_paper', name: 'Archive Paper',
    bg: '#EBEAE5', text: '#111111', accent: '#003049',
    border: 'rgba(17, 17, 17, 0.2)', gridBorder: 'rgba(17, 17, 17, 0.1)',
    fontSerif: 'Playfair Display', fontSans: 'Manrope', fontMono: 'Space Mono'
  },
  industrial_brutal: {
    id: 'industrial_brutal', name: 'Industrial Brutal',
    bg: '#1A1A1A', text: '#E0E0E0', accent: '#F77F00',
    border: 'rgba(224, 224, 224, 0.25)', gridBorder: 'rgba(224, 224, 224, 0.12)',
    fontSerif: 'Manrope', fontSans: 'Manrope', fontMono: 'Space Mono'
  },
  custom_brand: {
    id: 'custom_brand', name: 'Custom Brand Kit',
    bg: '#0F172A', text: '#F8FAFC', accent: '#38BDF8',
    border: 'rgba(248, 250, 252, 0.2)', gridBorder: 'rgba(248, 250, 252, 0.1)',
    fontSerif: 'Playfair Display', fontSans: 'Inter', fontMono: 'Space Mono'
  },
  premium_social: {
    id: 'premium_social', name: 'Premium Social',
    bg: '#1A1A1A', text: '#FFFFFF', accent: '#22C55E',
    border: 'rgba(255, 255, 255, 0.08)', gridBorder: 'rgba(255, 255, 255, 0.05)',
    fontSerif: 'Inter', fontSans: 'Inter', fontMono: 'Space Mono',
    purple: '#A855F7', amber: '#F59E0B', green: '#22C55E', muted: '#A1A1AA', cardBg: '#222222',
  }
};

export type Scheme = typeof SCHEMES[keyof typeof SCHEMES];

export const injectFonts = (customFonts: string[] = []) => {
  if (typeof document === 'undefined') return;
  const baseFonts = 'family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Manrope:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,600;0,800;1,400;1,600&family=Inter:wght@300;400;500;600;700;800;900';

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
    const isBrutal = themeId === 'industrial_brutal';
    const weight = isBrutal ? 'font-black tracking-tight uppercase' : 'font-light italic tracking-tight';
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



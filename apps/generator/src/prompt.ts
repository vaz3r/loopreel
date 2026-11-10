export interface TemplateBrief {
  name: string;
  vibe: string;
  domain?: string;
  inspiration?: string;
}

export function buildSystemPrompt(): string {
  return `You are an elite Creative Director, Master Typographer, and Senior Editorial UI Engineer specializing in prestigious publication design (inspired by The New York Times Magazine, Monocle, The Economist, MoMA Exhibition Monographs, and Wired).

Your sole responsibility is to synthesize a complete, standalone, single-file HTML design reference for an editorial carousel template of Tier A gold-standard quality (matching The Curator and The Globalist).

======================================================================
CRITICAL ARCHITECTURAL STANDARD: THREE-TIER CANVAS SYSTEM (1080x1350)
======================================================================
The canvas MUST be constructed using the persistent 3-tier editorial structure:

1. GLOBAL CANVAS CONTAINER:
   <div id="export-canvas" class="canvas-container font-sans text-ink bg-paper">
     Width is exactly 1080px, height is exactly 1350px, position: relative, overflow: hidden.

2. PINNED GLOBAL MASTHEAD PLACARD (HEADER):
   Pinned to the canvas top:
   <div class="absolute top-[50px] left-[70px] right-[70px] z-50 flex justify-between items-end border-b-2 border-ink pb-4">
     <div class="flex flex-col">
       <span class="font-display font-bold text-[28px] tracking-tight uppercase text-ink leading-none">{{TEMPLATE_TITLE}}</span>
       <span class="font-mono text-[13px] text-graphite mt-1 uppercase tracking-widest">{{DOMAIN_OR_SERIES}}</span>
     </div>
     <div class="text-right">
       <span id="global-tag" class="font-mono font-bold text-[14px] uppercase tracking-widest text-accent">{{CATEGORY_TAG}}</span>
     </div>
   </div>

3. PINNED GLOBAL FOOTER PLACARD (FOOTER):
   Pinned to the canvas bottom:
   <div class="absolute bottom-[50px] left-[70px] right-[70px] z-50 flex justify-between items-center border-t border-hairline pt-4 font-mono text-[14px] uppercase tracking-widest text-graphite">
     <span>{{BRAND_OR_HANDLE}}</span>
     <div class="flex items-center gap-4">
       <span>FOLIO</span>
       <span id="page-num" class="font-bold text-ink text-[18px]">01</span>
     </div>
   </div>

4. CONTENT SAFE AREA:
   The slides live inside an absolute safe area that never collides with the header or footer:
   <div class="absolute top-[150px] bottom-[130px] left-[70px] right-[70px] z-30 flex flex-col justify-center">
     <!-- All slide layers live here -->
     <div id="slide-1" class="slide-layer active">...</div>
     <div id="slide-2" class="slide-layer">...</div>
     ...
     <div id="slide-8" class="slide-layer">...</div>
   </div>

======================================================================
MANDATORY HEAD STRUCTURE & GOOGLE FONTS IMPORT
======================================================================
In <head>, you MUST import the Google Fonts for all three chosen families:
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=IBM+Plex+Mono:wght@400;500;700&family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
(Replace with families tailored to the aesthetic brief).
Followed by <script src="https://cdn.tailwindcss.com"></script>.
Configure Tailwind via <script> tag before custom CSS:
tailwind.config = {
  theme: {
    extend: {
      colors: {
        paper: '{{HEX_BACKGROUND}}',     // Authentic canvas: e.g. #F5F5F1, #FDFBF7, #FFFFFF, #0F172A
        ink: '{{HEX_PRIMARY_TEXT}}',     // Stark contrast: e.g. #111111, #0A0A0A, #FFFFFF
        graphite: '{{HEX_SECONDARY}}',   // Secondary narrative: e.g. #4A4A4A, #475569, #94A3B8
        accent: '{{HEX_ACCENT}}',        // Signature color: e.g. #E3120B, #A31F34, #2563EB, #D97706
        hairline: '{{HEX_HAIRLINE}}',    // Crisp structural borders: e.g. #D1D1CD, #E2E8F0, #334155
        surface: '{{HEX_SURFACE}}',      // Subtle placard/panel contrast: e.g. #EFEFEA, #F8FAFC
      },
      fontFamily: {
        display: ['{{PRIMARY_FONT_FAMILY}}', 'serif'],    // Monumental headline font: Cormorant Garamond, Crimson Pro, Merriweather, Playfair Display, Syne
        sans: ['{{SECONDARY_FONT_FAMILY}}', 'sans-serif'],// Pristine body font: Inter, Source Sans 3, Plus Jakarta Sans
        mono: ['{{TERTIARY_FONT_FAMILY}}', 'monospace'],  // Technical indexers & kickers: IBM Plex Mono, Space Mono, Oswald
      }
    }
  }
};

======================================================================
MANDATORY TYPOGRAPHIC SCALE & OPTICAL FLOORS (STRICT PIXEL SIZES)
======================================================================
On a 1080x1350 canvas, normal web font sizes look tiny. You MUST adhere to these exact scale floors:
- Cover Headline: text-[120px] to text-[150px] (leading-[0.88] to leading-[0.95], tracking-tight, clamp-4, balance-text)
- Slide Section Headers: text-[68px] to text-[84px] (leading-[1.0], tracking-tight)
- Roman Numerals / Big Markers: text-[60px] to text-[80px] (italic or mono, leading-none)
- Telemetry Values: text-[110px] to text-[140px] (leading-none, font-display or font-mono, with text-[55px] unit suffix spans)
- Subheadlines / Thesis Statements: text-[36px] to text-[44px] (leading-[1.25])
- Body & Narrative Prose: text-[26px] to text-[32px] (leading-[1.4])
- Metadata, Kickers & Indexers: text-[16px] to text-[20px] (tracking-[0.25em] to tracking-[0.3em], uppercase, font-mono or font-sans)
- Rules & Spines: 1px, 2px, or 4px solid lines (NEVER 0.5px or 1.5px subpixels)

======================================================================
ABSOLUTE PROHIBITIONS ("ANTI-PATTERNS")
======================================================================
1. NO GENERIC DASHBOARD BOXES: NEVER make slides by putting 4 identical rounded grey cards with centered numbers in a grid. That looks like a cheap web dashboard, NOT an editorial publication.
2. NO WEAK HEADLINES: Never use text-5xl, text-6xl, or text-7xl for cover headlines. Cover headlines MUST be text-[120px] to text-[150px].
3. NO EMPTY QUADRANTS: Ensure high-density, balanced layout filling 75% to 90% of the safe area frame.
4. NO CENTERED EVERYTHING: Use broadsheet asymmetry, left-aligned architectural typography, Roman numeral margin markers, and 35%/65% split zones.
5. NO REPETITIVE HEADER ECHOES: The slide-level kicker must NEVER repeat the exact string of the masthead running header.

======================================================================
THE 8 MANDATORY EDITORIAL SLIDE ARCHETYPES (DETAILED BLUEPRINTS)
======================================================================
Generate exactly 8 complete, fully articulated slides in this order:

- SLIDE 1: FRONT COVER (Commanding Masthead & Asymmetric Thesis)
  - Monumental cover headline (text-[120px]-text-[150px], leading-[0.9], clamp-4).
  - Upper accent kicker rule (e.g. w-16 h-1 bg-accent mb-6).
  - Lower asymmetric split: 35% left column with hairline divider and uppercase overview paragraph; 65% right column with a rich italic thesis statement (text-[38px] leading-[1.3]).
  - Author byline with city / affiliation rule.

- SLIDE 2: THE CATALOG / CURATED LIST (Horizontal Broadsheet Dividers)
  - Section header: text-[72px] leading-[1] mb-12.
  - 3 stacked list entries separated by border-t and border-b border-hairline.
  - Each entry has an italic Roman numeral or monospace indexer (text-[60px] text-graphite w-20 shrink-0), an uppercase tracked kicker (text-[20px] tracking-widest text-ink), and deep editorial narrative (text-[28px] text-graphite leading-[1.35]).

- SLIDE 3: TELEMETRY / MACRO DATA (Vertical Architectural Spines)
  - Section header: text-[72px] leading-[1] mb-12.
  - 4 stats in a 2x2 grid, BUT styled with broadsheet authority: each cell has a vertical spine (border-l-2 border-ink pl-8 or border-l-4 border-accent pl-8).
  - Giant value (text-[110px] leading-none text-ink) with signed badge or suffix unit (text-[55px]).
  - Uppercase tracked metric label (text-[16px] tracking-widest text-graphite mt-3).
  - Italic editorial context sentence (text-[24px] text-graphite leading-[1.3] mt-2).

- SLIDE 4: THE FRAMEWORK / ANATOMY (Structured 2x2 Matrix or 3-Column System)
  - Clear architectural breakdown of a concept into 3 or 4 parts with hairline borders between columns/quadrants.
  - Bold corner index tags ([01], [02], [03], [04]), high-contrast titles (text-[36px]), and explanatory body (text-[26px]).

- SLIDE 5: CHRONOLOGY / METHODOLOGY (Vertical Timeline Stem)
  - Section header: text-[72px] leading-[1] mb-12.
  - 3 sequential phases with a continuous vertical timeline rule (border-l-2 border-hairline pl-10 relative).
  - Dedicated left date/step indicator (text-[34px] font-mono text-accent), filled node marker dots, step title (text-[36px]), and narrative body (text-[26px]).

- SLIDE 6: DEBUNK / JUXTAPOSITION (The Claim vs The Record)
  - Stark asymmetric split with a vertical hairline dividing the screen.
  - Left side: THE CLAIM [UNVERIFIED] in muted graphite with italic claim text.
  - Right side: THE RECORD [DOCUMENTED] inside an authoritative placard with a thick accent spine (border-l-4 border-accent pl-8), verified status badge, and commanding serif reality.

- SLIDE 7: THE MONOLITH / PULLQUOTE (High-Impact Typography)
  - Monumental quote (text-[64px] to text-[76px] leading-[1.15] font-display italic text-ink).
  - Signature oversized quote mark in accent color.
  - Clean attribution with author name (text-[26px] font-sans font-bold) and title/organization (text-[18px] uppercase tracking-widest text-graphite).

- SLIDE 8: HERO METRIC & FINAL DIRECTIVE (Monumental Centerpiece + CTA)
  - Monumental stat number (text-[180px] to text-[220px] leading-none text-accent font-display).
  - High-impact label (text-[52px] font-bold text-ink mb-6).
  - Comprehensive analytical summary placard (text-[28px] text-graphite leading-[1.4] max-w-[850px]).
  - Prominent high-contrast action directive placard with button (px-10 py-5 bg-ink text-paper text-[26px] font-bold uppercase tracking-widest) and social handle.

======================================================================
PREVIEW CONTROLLER & JAVASCRIPT HARNESS
======================================================================
Include the full web UI control panel:
- Fixed top control bar: Title, domain, <select id="slideSelector">, "45% Preview" / "Export Mode" button, Prev / Next buttons.
- Full JavaScript that:
  - Toggles .slide-layer.active.
  - Updates the dynamic footer folio <span id="page-num"> with zero-padded number ('01', '02', etc.).
  - Handles keyboard ArrowLeft and ArrowRight.
  - Toggles mode-preview (scale: 0.45) vs mode-export (scale: 1).

CRITICAL: Return ONLY valid, complete HTML5. Begin directly with <!DOCTYPE html> and end with </html>. Do NOT wrap in markdown code fences.`;
}

export function buildUserPrompt(brief: TemplateBrief): string {
  return `Generate a world-class, Tier A publication-grade single-file HTML design reference for the following template:

Template Name: "${brief.name}"
Aesthetic & Vibe: "${brief.vibe}"
Content Domain: "${brief.domain || 'General Editorial & Business'}"
${brief.inspiration ? `Art Direction Inspiration: "${brief.inspiration}"` : ''}

REQUIREMENTS:
1. Adhere strictly to the 3-Tier Canvas Architecture (1080x1350): Pinned Masthead Header, Pinned Footer with folio (#page-num), and Safe Content Area.
2. Configure Tailwind with bespoke colors (paper, ink, graphite, accent, hairline, surface) and 3 distinct font families (display, sans, mono).
3. Deliver all 8 slide archetypes in full detail with monumental typographic scale (Cover headline 120-150px, Telemetry 110-140px, Section headers 68-84px, Body 26-32px).
4. Zero generic dashboard card boxes. Use broadsheet spines, hairline rules, Roman numeral markers, and asymmetric balance.
5. All slides must have compelling, realistic, domain-specific copy matching "${brief.name}".
6. Include the complete preview harness script.

Begin directly with <!DOCTYPE html>.`;
}

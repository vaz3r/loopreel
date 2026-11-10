export interface TemplateBrief {
  name: string;
  vibe: string;
  domain?: string;
  inspiration?: string;
}

// ======================================================================
// PASS 1: CONCEPT & DESIGN SYSTEM
// ======================================================================

export function buildConceptSystemPrompt(): string {
  return `You are an elite Creative Director and Brand Identity Architect specializing in luxury editorial publications (The New York Times Magazine, Monocle, The Economist, MoMA Exhibition Monographs, Phaidon Art Books).

Your task is to conceptualize a comprehensive, sellable, publication-grade Brand Design System and an 8-slide thematic narrative based on the user's brief.

You must design:
1. Exact Color Palette (Authentic editorial hex colors):
   - paper: Canvas background (e.g. #F5F5F0 warm washi, #FFFFFF stark white newsprint, #F8FAFC slate paper, #FDFBF7 creamy gallery folio)
   - ink: Primary text contrast (e.g. #111111, #0A0A0A, #1A1A1A sumi-e black)
   - graphite: Secondary reading & meta text (e.g. #4A4A4A, #475569)
   - accent: Distinctive signature brand color (e.g. #D97706 warm amber, #E11D48 vermilion, #A31F34 crimson, #2563EB cobalt, #059669 forest)
   - hairline: Crisp structural framing borders (e.g. #D1D1CD, #E2E8F0, #CBD5E1)
   - surface: Subtle placard/panel contrast (e.g. #EFEFEA, #F8FAFC, #F1F5F9)

2. Distinctive Typography Trio:
   - displayFont: Monumental headline font (e.g. Cormorant Garamond, Syne, Crimson Pro, Merriweather, Playfair Display)
   - bodyFont: Pristine reading sans (e.g. Inter, Plus Jakarta Sans, Source Sans 3)
   - monoFont: Technical data & indexer font (e.g. IBM Plex Mono, Space Mono, Oswald)
   - googleFontsUrl: Complete Google Fonts <link> URL importing all 3 families with appropriate weights.

3. Thematic Narrative & 8 Slide Concepts:
   - Slide 1: Cover (introductory masthead, commanding headline, thesis)
   - Slide 2: Catalog (3-part curated list with Roman numerals I, II, III)
   - Slide 3: Telemetry (4 macro metrics in 2x2 with vertical spines)
   - Slide 4: Framework (3-pillar architectural system anatomy)
   - Slide 5: Chronology (3-phase timeline with continuous vertical stem)
   - Slide 6: Debunk (The Claim [Unverified] vs The Record [Documented])
   - Slide 7: Pullquote (Monumental monolith quote with oversized quote mark)
   - Slide 8: Hero Metric & CTA (Monumental stat centerpiece + analytical placard + action directive)

CRITICAL: Return ONLY a valid JSON object matching the BrandDesignSystem interface. Do NOT wrap in markdown code blocks.`;
}

export function buildConceptUserPrompt(brief: TemplateBrief): string {
  return `Conceptualize the Brand Design System for:
Template Name: "${brief.name}"
Vibe / Aesthetic: "${brief.vibe}"
Domain: "${brief.domain || 'General Editorial & Business'}"
${brief.inspiration ? `Inspiration: "${brief.inspiration}"` : ''}

Output JSON schema:
{
  "templateName": "${brief.name}",
  "domain": "${brief.domain || 'Editorial'}",
  "tagline": "Short evocative editorial series tagline",
  "aestheticManifesto": "2 sentences describing the physical print feel and typography tension",
  "colors": {
    "paper": "#HEX",
    "ink": "#HEX",
    "graphite": "#HEX",
    "accent": "#HEX",
    "hairline": "#HEX",
    "surface": "#HEX"
  },
  "typography": {
    "displayFont": "FontName",
    "bodyFont": "FontName",
    "monoFont": "FontName",
    "googleFontsUrl": "https://fonts.googleapis.com/css2?family=..."
  },
  "slideConcepts": [
    { "slideNumber": 1, "archetype": "Cover", "title": "...", "narrativeAngle": "..." },
    { "slideNumber": 2, "archetype": "Catalog", "title": "...", "narrativeAngle": "..." },
    { "slideNumber": 3, "archetype": "Telemetry", "title": "...", "narrativeAngle": "..." },
    { "slideNumber": 4, "archetype": "Framework", "title": "...", "narrativeAngle": "..." },
    { "slideNumber": 5, "archetype": "Timeline", "title": "...", "narrativeAngle": "..." },
    { "slideNumber": 6, "archetype": "Debunk", "title": "...", "narrativeAngle": "..." },
    { "slideNumber": 7, "archetype": "Pullquote", "title": "...", "narrativeAngle": "..." },
    { "slideNumber": 8, "archetype": "HeroCTA", "title": "...", "narrativeAngle": "..." }
  ]
}`;
}

// ======================================================================
// PASS 2: EDITORIAL COPYWRITING & SPATIAL COMPOSITION
// ======================================================================

export function buildEditorialSystemPrompt(): string {
  return `You are an Executive Editor and Master Editorial Copywriter (The New Yorker, Monocle, Harvard Business Review, Wired).

Your task is to write handcrafted, publication-grade editorial copy for each of the 8 slide concepts in the provided Design Manifest.

QUALITY REQUIREMENTS:
1. NEVER use generic placeholder bullets ("Item 1", "Lorem Ipsum", "Fast growth").
2. Write deep, intelligent, domain-specific journalism.
3. Every metric must have believable, specific signed numerical values, units, and analytical context.
4. Provide all required structural fields for each archetype:
   - Cover: headline (commanding, max 8 words), subhead (deep narrative), authorOrAttribution, thesisQuote.
   - Catalog: 3 items, each with index ("I.", "II.", "III."), kicker (uppercase, 2-3 words), and rich body text (25-35 words).
   - Telemetry: 4 stats, each with value, optional unit, uppercase label, and italic context sentence.
   - Framework: 3 pillars ([01], [02], [03]) with title and deep description.
   - Timeline: 3 milestones with year/phase, title, and detailed event description.
   - Debunk: claim (popular unverified belief) vs recordTitle and recordBody (authoritative documented reality).
   - Pullquote: monumental statement (15-25 words), author, professional credential.
   - HeroCTA: heroNumber, heroTitle, analytical narrative summary (40-50 words), CTA button text, social handle.

CRITICAL: Return ONLY a valid JSON array of 8 slide objects matching DetailedSlideContent[]. Do NOT wrap in markdown code blocks.`;
}

export function buildEditorialUserPrompt(manifest: any): string {
  return `Write the complete publication-grade editorial copy for all 8 slides based on this Design Manifest:
${JSON.stringify(manifest, null, 2)}

Return a JSON array of 8 slide objects:
[
  {
    "slideNumber": 1,
    "archetype": "Cover",
    "kicker": "ESSAY / REPORT",
    "headline": "...",
    "subhead": "...",
    "authorOrAttribution": "By ...",
    "thesisQuote": "..."
  },
  {
    "slideNumber": 2,
    "archetype": "Catalog",
    "kicker": "CURATED SYSTEMS",
    "headline": "...",
    "items": [
      { "index": "I.", "kicker": "...", "body": "..." },
      { "index": "II.", "kicker": "...", "body": "..." },
      { "index": "III.", "kicker": "...", "body": "..." }
    ]
  },
  {
    "slideNumber": 3,
    "archetype": "Telemetry",
    "kicker": "MACRO METRICS",
    "headline": "...",
    "stats": [
      { "value": "...", "unit": "...", "label": "...", "context": "..." },
      { "value": "...", "unit": "...", "label": "...", "context": "..." },
      { "value": "...", "unit": "...", "label": "...", "context": "..." },
      { "value": "...", "unit": "...", "label": "...", "context": "..." }
    ]
  },
  {
    "slideNumber": 4,
    "archetype": "Framework",
    "kicker": "SYSTEM ANATOMY",
    "headline": "...",
    "items": [
      { "index": "[01]", "kicker": "...", "body": "..." },
      { "index": "[02]", "kicker": "...", "body": "..." },
      { "index": "[03]", "kicker": "...", "body": "..." }
    ]
  },
  {
    "slideNumber": 5,
    "archetype": "Timeline",
    "kicker": "CHRONOLOGY",
    "headline": "...",
    "items": [
      { "index": "...", "kicker": "...", "body": "..." },
      { "index": "...", "kicker": "...", "body": "..." },
      { "index": "...", "kicker": "...", "body": "..." }
    ]
  },
  {
    "slideNumber": 6,
    "archetype": "Debunk",
    "kicker": "ANALYSIS",
    "headline": "...",
    "claimVsRecord": {
      "claim": "...",
      "recordTitle": "...",
      "recordBody": "..."
    }
  },
  {
    "slideNumber": 7,
    "archetype": "Pullquote",
    "kicker": "PERSPECTIVE",
    "headline": "...",
    "thesisQuote": "...",
    "authorOrAttribution": "...",
    "subhead": "..."
  },
  {
    "slideNumber": 8,
    "archetype": "HeroCTA",
    "kicker": "CONCLUSION",
    "headline": "...",
    "stats": [{ "value": "...", "label": "...", "context": "..." }],
    "bodyText": "...",
    "cta": {
      "buttonText": "...",
      "socialHandle": "..."
    }
  }
]`;
}

// ======================================================================
// PASS 3: MASTER HTML/CSS ASSEMBLY
// ======================================================================

export function buildAssemblySystemPrompt(): string {
  return `You are a Principal UI Front-End Engineer & Typographer specializing in production-grade editorial publication templates.

Your sole job is to compile the provided Design Manifest and Editorial Copy into a single-file, standalone HTML5 document.

======================================================================
CRITICAL ARCHITECTURAL STANDARD: THREE-TIER CANVAS SYSTEM (1080x1350)
======================================================================
The canvas MUST be constructed using the persistent 3-tier editorial structure:

1. GLOBAL CANVAS CONTAINER:
   <div id="export-canvas" class="canvas-container font-sans text-ink bg-paper w-[1080px] h-[1350px] relative overflow-hidden shadow-2xl mx-auto mt-[60px]">

2. PINNED GLOBAL MASTHEAD PLACARD (HEADER):
   Pinned to canvas top:
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
   Pinned to canvas bottom:
   <div class="absolute bottom-[50px] left-[70px] right-[70px] z-50 flex justify-between items-center border-t border-hairline pt-4 font-mono text-[14px] uppercase tracking-widest text-graphite">
     <span>{{BRAND_OR_HANDLE}}</span>
     <div class="flex items-center gap-4">
       <span>FOLIO</span>
       <span id="page-num" class="font-bold text-ink text-[18px]">01</span>
     </div>
   </div>

4. CONTENT SAFE AREA:
   <div class="absolute top-[150px] bottom-[130px] left-[70px] right-[70px] z-30">
     <!-- All 8 slide layers live here -->
     <div id="slide-1" class="slide-layer active">...</div>
     <div id="slide-2" class="slide-layer">...</div>
     ...
     <div id="slide-8" class="slide-layer">...</div>
   </div>

5. MANDATORY CSS IN <style>:
   You MUST include:
   <script src="https://cdn.tailwindcss.com"></script> (NEVER an outdated link tag).
   And in <style>:
   .canvas-container, #export-canvas {
     width: 1080px;
     height: 1350px;
     position: relative;
     overflow: hidden;
     box-sizing: border-box;
   }
   .slide-layer {
     display: none;
     width: 100%;
     height: 100%;
     position: absolute;
     inset: 0;
   }
   .slide-layer.active {
     display: flex;
     flex-direction: column;
   }

======================================================================
MANDATORY ARCHITECTURAL CLASS RECIPES FOR EACH SLIDE (NON-NEGOTIABLE)
======================================================================
Every slide MUST be constructed using these exact Tailwind structural recipes to ensure publication-grade graphic design richness and zero layout bugs:

- SLIDE 1 (COVER):
  <div id="slide-1" class="slide-layer active">
    <div class="flex flex-col h-full justify-between py-6">
      <div class="pt-4">
        <div class="w-16 h-1 bg-accent mb-8"></div>
        <h1 class="font-display font-bold text-[115px] leading-[0.92] tracking-tight balance-text text-ink clamp-4">
          <!-- headline -->
        </h1>
        <p class="font-sans text-[30px] leading-[1.3] text-graphite mt-8 max-w-[850px] clamp-3">
          <!-- subhead -->
        </p>
      </div>
      <div class="flex gap-12 items-end pt-8 border-t-2 border-ink pb-4">
        <div class="w-[35%] font-mono text-[16px] uppercase tracking-widest text-graphite">
          <!-- authorOrAttribution -->
        </div>
        <div class="w-[65%] font-display italic text-[36px] leading-[1.3] text-ink pl-8 border-l-2 border-accent">
          "<!-- thesisQuote -->"
        </div>
      </div>
    </div>
  </div>

- SLIDE 2 (CATALOG / LIST):
  <div id="slide-2" class="slide-layer">
    <div class="flex flex-col h-full justify-between py-6">
      <div class="shrink-0 mb-8 border-b-2 border-ink pb-4">
        <h2 class="font-display font-bold text-[72px] leading-none text-ink"><!-- headline --></h2>
      </div>
      <div class="flex-1 flex flex-col justify-around border-b border-hairline">
        <!-- 3 Items, each with: -->
        <div class="flex items-start gap-8 py-6 border-t border-hairline">
          <span class="font-display italic text-[60px] text-graphite w-20 shrink-0 leading-none"><!-- index --></span>
          <div>
            <span class="font-mono text-[20px] uppercase tracking-widest text-accent mb-2 block"><!-- kicker --></span>
            <p class="font-sans text-[28px] text-graphite leading-[1.35]"><!-- body --></p>
          </div>
        </div>
      </div>
    </div>
  </div>

- SLIDE 3 (TELEMETRY / 2x2 METRICS):
  <div id="slide-3" class="slide-layer">
    <div class="flex flex-col h-full justify-between py-6">
      <div class="shrink-0 mb-8 border-b-2 border-ink pb-4">
        <h2 class="font-display font-bold text-[72px] leading-none text-ink"><!-- headline --></h2>
      </div>
      <div class="flex-1 grid grid-cols-2 gap-x-16 gap-y-12 items-center content-center my-auto">
        <!-- 4 Stats, each with 4px accent spine: -->
        <div class="flex flex-col justify-end pl-8 border-l-4 border-accent bg-surface p-6 border-y border-r border-hairline">
          <span class="font-display font-bold text-[115px] leading-none text-ink"><!-- value --><span class="text-[50px] font-sans font-normal"><!-- unit --></span></span>
          <span class="font-mono text-[16px] uppercase tracking-widest text-graphite mt-3"><!-- label --></span>
          <p class="font-sans italic text-[24px] text-graphite leading-[1.3] mt-2"><!-- context --></p>
        </div>
      </div>
    </div>
  </div>

- SLIDE 4 (FRAMEWORK / SYSTEM ANATOMY):
  <div id="slide-4" class="slide-layer">
    <div class="flex flex-col h-full justify-between py-6">
      <div class="shrink-0 mb-8 border-b-2 border-ink pb-4">
        <h2 class="font-display font-bold text-[72px] leading-none text-ink"><!-- headline --></h2>
      </div>
      <div class="flex-1 grid grid-cols-3 gap-8 items-stretch content-center my-auto">
        <!-- 3 Pillars: -->
        <div class="p-8 bg-surface border border-hairline flex flex-col justify-between">
          <div>
            <span class="font-mono text-[22px] font-bold text-accent mb-4 block"><!-- index --></span>
            <h3 class="font-display font-bold text-[26px] leading-[1.2] text-ink mb-4 break-words hyphens-auto uppercase tracking-wide"><!-- kicker --></h3>
            <p class="font-sans text-[22px] leading-[1.4] text-graphite"><!-- body --></p>
          </div>
          <div class="w-16 h-1 bg-accent mt-8"></div>
        </div>
      </div>
    </div>
  </div>

- SLIDE 5 (CHRONOLOGY / STEM TIMELINE):
  <div id="slide-5" class="slide-layer">
    <div class="flex flex-col h-full justify-between py-6">
      <div class="shrink-0 mb-8 border-b-2 border-ink pb-4">
        <h2 class="font-display font-bold text-[72px] leading-none text-ink"><!-- headline --></h2>
      </div>
      <div class="flex-1 flex flex-col justify-around pl-16 border-l-2 border-hairline ml-8 my-4 relative">
        <!-- 3 Timeline Events: -->
        <div class="relative flex flex-col gap-2">
          <div class="absolute -left-[73px] top-2 w-4 h-4 bg-accent rounded-full border-2 border-paper"></div>
          <span class="font-mono text-[32px] text-accent font-bold"><!-- index/year --></span>
          <h3 class="font-display font-bold text-[36px] leading-[1.15] text-ink"><!-- kicker --></h3>
          <p class="font-sans text-[26px] text-graphite leading-[1.4] max-w-[800px]"><!-- body --></p>
        </div>
      </div>
    </div>
  </div>

- SLIDE 6 (DEBUNK / JUXTAPOSITION):
  <div id="slide-6" class="slide-layer">
    <div class="flex flex-col h-full justify-between py-6">
      <div class="shrink-0 mb-8 border-b-2 border-ink pb-4">
        <h2 class="font-display font-bold text-[72px] leading-none text-ink"><!-- headline --></h2>
      </div>
      <div class="flex-1 flex items-stretch gap-12 my-auto">
        <div class="w-1/2 flex flex-col justify-center pr-8 text-right bg-surface p-10 border border-hairline">
          <span class="font-mono text-[20px] uppercase tracking-widest text-graphite mb-4 block">THE CLAIM [UNVERIFIED]</span>
          <p class="font-sans italic text-[30px] leading-[1.35] text-graphite">"<!-- claim -->"</p>
        </div>
        <div class="w-[2px] bg-hairline self-stretch"></div>
        <div class="w-1/2 flex flex-col justify-center pl-8 bg-surface p-10 border-l-4 border-accent border-y border-r border-hairline">
          <span class="font-mono text-[20px] uppercase tracking-widest text-accent mb-4 block">THE RECORD [DOCUMENTED]</span>
          <h3 class="font-display font-bold text-[40px] leading-[1.2] text-ink mb-4"><!-- recordTitle --></h3>
          <p class="font-sans text-[26px] leading-[1.4] text-graphite"><!-- recordBody --></p>
        </div>
      </div>
    </div>
  </div>

- SLIDE 7 (PULLQUOTE / MONOLITH):
  <div id="slide-7" class="slide-layer">
    <div class="flex flex-col h-full justify-center items-center text-center px-12">
      <span class="font-display text-[96px] text-accent leading-none mb-4">“</span>
      <blockquote class="font-display font-bold text-[52px] leading-[1.2] text-ink mb-10 max-w-[900px] clamp-4 balance-text italic">
        <!-- thesisQuote -->
      </blockquote>
      <div class="pt-8 border-t-2 border-ink w-1/2 flex flex-col items-center">
        <span class="font-sans text-[26px] font-bold text-ink uppercase tracking-widest"><!-- authorOrAttribution --></span>
        <span class="font-mono text-[18px] uppercase tracking-widest text-graphite mt-2"><!-- subhead --></span>
      </div>
    </div>
  </div>

- SLIDE 8 (HERO METRIC & DIRECTIVE CTA):
  <div id="slide-8" class="slide-layer">
    <div class="flex flex-col h-full justify-between items-center text-center py-6">
      <div class="flex flex-col items-center pt-4">
        <span class="font-display font-bold text-[180px] leading-none text-accent"><!-- stats[0].value --></span>
        <h2 class="font-display font-bold text-[52px] text-ink mt-2 mb-4"><!-- stats[0].label --></h2>
        <div class="bg-surface p-8 max-w-[850px] border-t-2 border-b-2 border-ink">
          <p class="font-sans text-[28px] text-graphite leading-[1.4]"><!-- stats[0].context or bodyText --></p>
        </div>
      </div>
      <div class="pb-4 flex flex-col items-center">
        <a href="#" class="px-12 py-5 bg-ink text-paper font-bold uppercase tracking-widest text-[24px] hover:bg-graphite transition-colors inline-block rounded-none shadow-md">
          <!-- cta.buttonText -->
        </a>
        <span class="font-mono text-[16px] uppercase tracking-widest text-graphite mt-6"><!-- cta.socialHandle --></span>
      </div>
    </div>
  </div>

6. ZERO ABSOLUTE POSITIONING INSIDE SLIDES:
   Never use "position: absolute" on text, dates, or cards inside a slide layer!
   Every slide must use pure Flexbox flow:
   <div class="flex flex-col h-full justify-between py-6">
   This guarantees ZERO text collisions and perfect 75%–90% vertical frame fill.

7. INLINE REAL EDITORIAL COPY (NEVER OUTPUT PLACEHOLDERS):
   You MUST bake the ACTUAL copy strings, headlines, numbers, quotes, and author attributions from the provided EDITORIAL SLIDES CONTENT directly into the HTML markup!
   NEVER leave template variables like {{headline}}, {{thesisQuote}}, {{bodyText}}, or {{subhead}}.
   Every slide must contain the rich, specific, real journalism written in Pass 2.

8. FULL PREVIEW HARNESS SCRIPT:
   Include the top web control bar and JavaScript that handles slide transitions, keyboard arrows, and syncs #page-num.

CRITICAL: Return ONLY valid, complete HTML5 starting with <!DOCTYPE html> and ending with </html>. Do NOT wrap in markdown code blocks.`;
}

export function buildAssemblyUserPrompt(manifest: any, slides: any): string {
  return `Assemble the final single-file HTML design reference using this Design Manifest and Editorial Content:

DESIGN MANIFEST:
${JSON.stringify(manifest, null, 2)}

EDITORIAL SLIDES CONTENT:
${JSON.stringify(slides, null, 2)}

INSTRUCTIONS:
1. Interpolate every actual string (headlines, quotes, numbers, items) from EDITORIAL SLIDES CONTENT directly into the HTML elements. Do NOT output curly bracket placeholders like {{headline}} or {{thesisQuote}}.
2. Ensure all 8 slide archetypes are fully articulated, beautiful, mobile legible, and completely free of text collisions.
3. Begin directly with <!DOCTYPE html>.`;
}

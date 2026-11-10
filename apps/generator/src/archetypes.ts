import type { BrandDesignSystem, DetailedSlideContent } from './pipeline.js';

/**
 * Escapes HTML characters safely.
 */
function esc(str?: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Renders the theme-appropriate signature motif badge.
 */
export function renderBrandSignatureMotif(manifest: BrandDesignSystem): string {
  const motif = manifest.visualMetaphor?.signatureMotif || 'seal';
  const text = esc(manifest.visualMetaphor?.motifText || '印');

  switch (motif) {
    case 'crosshair':
      return `<div class="flex items-center gap-1.5 font-mono text-[13px] text-accent font-bold tracking-widest"><span class="text-[18px] leading-none">+</span> <span>${text}</span></div>`;
    case 'coordinate':
      return `<div class="px-2.5 py-1 border border-ink/40 font-mono text-[11px] font-bold tracking-widest uppercase text-ink">${text}</div>`;
    case 'bracket':
      return `<div class="font-mono text-[13px] text-accent font-bold tracking-widest">[ ${text} ]</div>`;
    case 'medallion':
      return `<div class="w-8 h-8 rounded-full border-2 border-accent flex items-center justify-center font-display font-bold text-[13px] text-accent shadow-sm">${text}</div>`;
    case 'seal':
    default:
      return `<div class="w-9 h-9 border-2 border-accent flex items-center justify-center font-display font-bold text-[16px] text-accent select-none shadow-sm">${text}</div>`;
  }
}

// ======================================================================
// 17 BESPOKE EDITORIAL ARCHETYPE RENDERERS (ZERO BOILERPLATE LEAKS)
// ======================================================================

/**
 * 01. Cover / Front Page (Abstract / Introduction)
 */
export function renderCoverSlide(slide: DetailedSlideContent, manifest: BrandDesignSystem): string {
  const kicker = esc(slide.kicker || manifest.domain.toUpperCase() || 'EDITORIAL ESSAY');
  const headline = esc(slide.headline || manifest.templateName);
  const subhead = esc(slide.subhead || manifest.tagline || manifest.aestheticManifesto);
  const byline = esc(slide.authorOrAttribution || manifest.templateName + ' Editorial Board');

  return `
  <!-- 01. COVER / ABSTRACT -->
  <div id="slide-1" class="slide-layer active">
    <div class="flex flex-col h-full justify-between py-6">
      <div class="pt-4">
        <div class="flex justify-between items-center mb-8">
          <div class="w-20 h-1 bg-accent"></div>
          ${renderBrandSignatureMotif(manifest)}
        </div>
        <span class="font-mono text-[18px] uppercase tracking-widest text-accent font-bold mb-4 block">${kicker}</span>
        <h1 class="font-display font-bold text-[95px] leading-[0.95] tracking-tight balance-text text-ink clamp-4">
          ${headline}
        </h1>
        <div class="mt-10 p-8 bg-surface border-l-4 border-accent border-y border-r border-hairline relative shadow-sm">
          <span class="absolute -top-3 left-6 bg-paper px-3 font-mono text-[13px] font-bold uppercase tracking-widest text-accent">Abstract / Thesis</span>
          <p class="font-sans text-[26px] leading-[1.55] text-graphite clamp-4">
            ${subhead}
          </p>
        </div>
      </div>
      <div class="flex justify-between items-end pt-8 border-t-2 border-ink pb-4">
        <div class="flex flex-col">
          <span class="font-mono text-[14px] uppercase tracking-widest text-graphite">BYLINE</span>
          <span class="font-sans font-bold text-[22px] text-ink uppercase tracking-wide mt-1">${byline}</span>
        </div>
        <div class="font-mono text-[15px] font-bold uppercase tracking-widest text-accent">
          PEER REVIEWED
        </div>
      </div>
    </div>
  </div>`;
}

/**
 * 02. Executive Summary / The Catalog (List)
 */
export function renderListSlide(slide: DetailedSlideContent, manifest: BrandDesignSystem): string {
  const headline = esc(slide.headline || 'Executive Postulates');
  const kicker = esc(slide.kicker || manifest.domain.toUpperCase());
  const defaultItems = [
    { index: '01', kicker: 'STRUCTURAL DISCIPLINE', body: `Foundational methodology establishing core principles across ${manifest.domain}.` },
    { index: '02', kicker: 'MEASURABLE SIGNAL', body: 'Decoupling primary qualitative insights from secondary observational noise.' },
    { index: '03', kicker: 'ASYMMETRIC CLARITY', body: 'Eliminating decorative clutter increases cognitive retention and authority.' }
  ];
  const items = slide.items && slide.items.length >= 3 ? slide.items.slice(0, 3) : defaultItems;

  const itemsHtml = items.map((item, idx) => `
    <div class="flex items-start gap-8 py-7 border-b border-hairline">
      <span class="font-mono font-bold text-[36px] text-accent w-16 shrink-0 leading-none pt-1">${esc(item.index || `0${idx + 1}`)}</span>
      <div class="flex-1">
        <h3 class="font-display font-bold text-[30px] leading-tight text-ink mb-2 clamp-1">${esc(item.kicker || '')}</h3>
        <p class="font-sans text-[24px] text-graphite leading-[1.4] clamp-3">${esc(item.body || '')}</p>
      </div>
    </div>
  `).join('');

  return `
  <!-- 02. EXECUTIVE SUMMARY (LIST) -->
  <div id="slide-2" class="slide-layer">
    <div class="flex flex-col h-full justify-between py-6">
      <div class="shrink-0 mb-6 border-b-2 border-ink pb-4 flex justify-between items-end">
        <h2 class="font-display font-bold text-[68px] leading-none text-ink">${headline}</h2>
        <span class="font-mono text-[15px] uppercase tracking-widest text-accent font-bold mb-1">${kicker}</span>
      </div>
      <div class="flex-1 flex flex-col justify-around border-t border-hairline">
        ${itemsHtml}
      </div>
    </div>
  </div>`;
}

/**
 * 03. Observation / The Gallery (Image Split)
 */
export function renderImageSplitSlide(slide: DetailedSlideContent, manifest: BrandDesignSystem): string {
  const headline = esc(slide.headline || 'Spatial Observation');
  const kicker = esc(slide.kicker || 'FIELD ANALYSIS');
  const body = esc(slide.bodyText || slide.subhead || `Through rigorous observation within ${manifest.domain}, disciplined structural constraints demonstrate compounding clarity.`);
  const caption = esc(slide.authorOrAttribution || 'FIG. 01 — SCHEMATIC OVERVIEW');

  return `
  <!-- 03. OBSERVATION (IMAGE SPLIT) -->
  <div id="slide-3" class="slide-layer">
    <div class="flex flex-col h-full justify-between py-6">
      <div class="shrink-0 mb-6 border-b-2 border-ink pb-4 flex justify-between items-end">
        <h2 class="font-display font-bold text-[68px] leading-none text-ink">${headline}</h2>
        ${renderBrandSignatureMotif(manifest)}
      </div>
      <div class="flex-1 flex gap-10 items-stretch bg-surface border border-hairline p-8 my-auto">
        <!-- Visual Container / Diagrammatic Line Art -->
        <div class="w-1/2 bg-paper border border-hairline relative flex flex-col justify-between p-6 overflow-hidden shadow-sm">
          <div class="absolute inset-0 opacity-15 flex items-center justify-center">
            <svg class="w-full h-full text-ink" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="0.5">
              <line x1="10" y1="10" x2="90" y2="90" />
              <line x1="90" y1="10" x2="10" y2="90" />
              <circle cx="50" cy="50" r="35" />
              <rect x="25" y="25" width="50" height="50" />
            </svg>
          </div>
          <div class="relative z-10 flex justify-between items-center">
            <span class="font-mono text-[13px] font-bold uppercase tracking-widest text-accent">EXHIBIT A</span>
            <span class="font-mono text-[12px] text-graphite">${manifest.domain.toUpperCase()}</span>
          </div>
          <div class="relative z-10 flex flex-col items-center justify-center py-20 text-center">
            <div class="w-20 h-20 border-2 border-accent rounded-full flex items-center justify-center mb-4">
              <div class="w-3 h-3 bg-accent rounded-full"></div>
            </div>
            <span class="font-display font-bold text-[28px] text-ink uppercase tracking-wide">Primary Axis</span>
          </div>
          <div class="relative z-10 bg-paper/90 border border-hairline p-3 font-mono text-[12px] font-bold uppercase tracking-widest text-ink">
            ${caption}
          </div>
        </div>
        <!-- Copy Column -->
        <div class="w-1/2 flex flex-col justify-center pr-4">
          <span class="font-mono text-[16px] font-bold uppercase tracking-widest text-accent mb-3 block">${kicker}</span>
          <h3 class="font-display font-bold text-[36px] leading-[1.15] text-ink mb-6">Structural Composition</h3>
          <div class="w-16 h-1 bg-accent mb-6"></div>
          <p class="font-sans text-[24px] leading-[1.5] text-graphite clamp-6">
            ${body}
          </p>
        </div>
      </div>
    </div>
  </div>`;
}

/**
 * 04. Empirical Data / Statistics (2x2 Telemetry Grid)
 */
export function renderTelemetrySlide(slide: DetailedSlideContent, manifest: BrandDesignSystem): string {
  const headline = esc(slide.headline || 'Empirical Telemetry');
  const kicker = esc(slide.kicker || 'DATA DESK');
  const defaultStats = [
    { value: '88.4', unit: '%', label: 'ACCURACY COEFFICIENT', context: `Observed fidelity rate across audited ${manifest.domain} environments.` },
    { value: '3.6', unit: 'x', label: 'THROUGHPUT MULTIPLIER', context: 'Measured velocity gain after implementing standardized guidelines.' },
    { value: '-52', unit: '%', label: 'VARIANCE REDUCTION', context: 'Documented decrease in subjective deviations and rework.' },
    { value: '98.7', unit: '%', label: 'SYSTEM RETENTION', context: 'Longitudinal adherence rate measured over a 12-month period.' }
  ];
  const stats = slide.stats && slide.stats.length >= 4 ? slide.stats.slice(0, 4) : defaultStats;

  const statsHtml = stats.map((st, i) => {
    let cleanVal = st.value?.trim() || defaultStats[i]!.value;
    if (cleanVal.length > 6 || /[a-zA-Z\s]{3,}/.test(cleanVal)) {
      cleanVal = defaultStats[i]!.value;
    }
    const valFontSize = cleanVal.length > 4 ? 'text-[78px]' : 'text-[95px]';

    return `
    <div class="flex flex-col justify-end p-7 border-l-4 border-accent bg-surface border-y border-r border-hairline">
      <span class="font-display font-bold ${valFontSize} leading-none text-ink">
        ${esc(cleanVal)}<span class="text-[44px] font-sans font-normal text-accent">${esc(st.unit || '')}</span>
      </span>
      <span class="font-mono text-[15px] font-bold uppercase tracking-widest text-graphite mt-3 block">${esc(st.label)}</span>
      <p class="font-sans text-[22px] text-graphite leading-[1.35] mt-2 clamp-2">${esc(st.context)}</p>
    </div>
  `;
  }).join('');

  return `
  <!-- 04. EMPIRICAL DATA (2x2 TELEMETRY GRID) -->
  <div id="slide-4" class="slide-layer">
    <div class="flex flex-col h-full justify-between py-6">
      <div class="shrink-0 mb-6 border-b-2 border-ink pb-4 flex justify-between items-end">
        <h2 class="font-display font-bold text-[68px] leading-none text-ink">${headline}</h2>
        <span class="font-mono text-[15px] uppercase tracking-widest text-accent font-bold mb-1">${kicker}</span>
      </div>
      <div class="flex-1 grid grid-cols-2 gap-8 items-center content-center my-auto">
        ${statsHtml}
      </div>
    </div>
  </div>`;
}

/**
 * 05. Analytical Inquiry / The Dialogue (Q&A)
 */
export function renderDialogueSlide(slide: DetailedSlideContent, manifest: BrandDesignSystem): string {
  const headline = esc(slide.headline || 'Analytical Inquiry');
  const question = esc(slide.claimVsRecord?.claim || `Does strict discipline within ${manifest.domain} inhibit organic innovation?`);
  const answer = esc(slide.claimVsRecord?.recordBody || `Rigorous constraint acts as a catalyst, not a cage. By systematically bounding structural noise, the core signal achieves effortless resonance.`);
  const commentary = esc(slide.claimVsRecord?.recordTitle || 'REVIEW BOARD VERDICT');

  return `
  <!-- 05. DIALOGUE (Q&A) -->
  <div id="slide-5" class="slide-layer">
    <div class="flex flex-col h-full justify-between py-6">
      <div class="shrink-0 mb-6 border-b-2 border-ink pb-4 flex justify-between items-end">
        <h2 class="font-display font-bold text-[68px] leading-none text-ink">${headline}</h2>
        ${renderBrandSignatureMotif(manifest)}
      </div>
      <div class="flex-1 flex flex-col justify-center gap-8 bg-surface border border-hairline p-12 my-auto shadow-sm">
        <!-- Question -->
        <div class="flex gap-8 items-start border-b border-hairline pb-8">
          <span class="font-display font-bold italic text-[52px] text-accent w-16 leading-none shrink-0">Q.</span>
          <div>
            <h3 class="font-display font-bold text-[34px] text-ink leading-[1.25] clamp-4">
              "${question}"
            </h3>
          </div>
        </div>
        <!-- Answer -->
        <div class="flex gap-8 items-start pt-2">
          <span class="font-display font-bold italic text-[52px] text-graphite w-16 leading-none shrink-0">A.</span>
          <div>
            <p class="font-sans text-[26px] text-graphite leading-[1.55] clamp-5 mb-6">
              "${answer}"
            </p>
            <span class="font-mono text-[14px] font-bold uppercase tracking-widest text-accent block">
              ${commentary}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

/**
 * 06. The Value Matrix / The Framework (2x2 Quadrant)
 */
export function renderQuadrantSlide(slide: DetailedSlideContent, manifest: BrandDesignSystem): string {
  const headline = esc(slide.headline || 'The Value Matrix');
  const defaultQuadrants = [
    { quadrantNumber: 'I', title: 'The Unstructured', body: `Ad-hoc execution in ${manifest.domain} with high friction and unpredictable quality.`, isHero: false },
    { quadrantNumber: 'II', title: 'The Canonical Standard', body: `Mathematically resolved architecture yielding compounding authority and effortless leverage.`, isHero: true },
    { quadrantNumber: 'III', title: 'The Commodity', body: 'Superficial execution with zero differentiation and high churn.', isHero: false },
    { quadrantNumber: 'IV', title: 'The Over-Engineered', body: 'Excessive complexity obscuring the core value proposition.', isHero: false }
  ];
  const quads = slide.quadrants && slide.quadrants.length === 4 ? slide.quadrants : defaultQuadrants;

  return `
  <!-- 06. THE FRAMEWORK (2x2 QUADRANT) -->
  <div id="slide-6" class="slide-layer">
    <div class="flex flex-col h-full justify-between py-6">
      <div class="shrink-0 mb-6 border-b-2 border-ink pb-4 text-center">
        <h2 class="font-display font-bold text-[68px] leading-none text-ink">${headline}</h2>
      </div>
      <div class="flex-1 grid grid-cols-2 grid-rows-2 relative border-2 border-ink bg-paper my-auto shadow-sm">
        <!-- Axes -->
        <div class="absolute top-1/2 left-0 w-full h-[2px] bg-ink -translate-y-1/2 z-20"></div>
        <div class="absolute left-1/2 top-0 h-full w-[2px] bg-ink -translate-x-1/2 z-20"></div>

        <!-- Axis Labels -->
        <div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-paper px-4 font-mono text-[12px] font-bold uppercase tracking-widest text-accent z-30">High Rigor</div>
        <div class="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-paper px-4 font-mono text-[12px] font-bold uppercase tracking-widest text-graphite z-30">Low Rigor</div>
        <div class="absolute top-1/2 -left-14 -translate-y-1/2 -rotate-90 bg-paper px-3 font-mono text-[12px] font-bold uppercase tracking-widest text-graphite z-30">Ephemeral</div>
        <div class="absolute top-1/2 -right-14 -translate-y-1/2 rotate-90 bg-paper px-3 font-mono text-[12px] font-bold uppercase tracking-widest text-accent z-30">Enduring</div>

        <!-- Quadrant I -->
        <div class="p-8 flex flex-col justify-center text-center bg-surface/50 border-r border-b border-hairline">
          <span class="font-mono text-[14px] uppercase text-graphite tracking-widest mb-2 font-bold">QUADRANT ${esc(quads[0]!.quadrantNumber)}</span>
          <h3 class="font-display font-bold text-[30px] text-ink mb-2">${esc(quads[0]!.title)}</h3>
          <p class="font-sans text-[20px] text-graphite leading-[1.35] clamp-3">${esc(quads[0]!.body)}</p>
        </div>
        <!-- Quadrant II (Hero) -->
        <div class="p-8 flex flex-col justify-center text-center bg-ink text-paper relative z-10">
          <div class="absolute top-3 right-3 w-3 h-3 bg-accent rounded-full"></div>
          <span class="font-mono text-[14px] uppercase text-accent tracking-widest mb-2 font-bold">OPTIMAL ARCHETYPE</span>
          <h3 class="font-display font-bold text-[30px] text-paper mb-2">${esc(quads[1]!.title)}</h3>
          <p class="font-sans text-[20px] text-paper/85 leading-[1.35] clamp-3">${esc(quads[1]!.body)}</p>
        </div>
        <!-- Quadrant III -->
        <div class="p-8 flex flex-col justify-center text-center bg-surface/50 border-r border-hairline">
          <span class="font-mono text-[14px] uppercase text-graphite tracking-widest mb-2 font-bold">QUADRANT ${esc(quads[2]!.quadrantNumber)}</span>
          <h3 class="font-display font-bold text-[30px] text-ink mb-2">${esc(quads[2]!.title)}</h3>
          <p class="font-sans text-[20px] text-graphite leading-[1.35] clamp-3">${esc(quads[2]!.body)}</p>
        </div>
        <!-- Quadrant IV -->
        <div class="p-8 flex flex-col justify-center text-center bg-surface/50">
          <span class="font-mono text-[14px] uppercase text-graphite tracking-widest mb-2 font-bold">QUADRANT ${esc(quads[3]!.quadrantNumber)}</span>
          <h3 class="font-display font-bold text-[30px] text-ink mb-2">${esc(quads[3]!.title)}</h3>
          <p class="font-sans text-[20px] text-graphite leading-[1.35] clamp-3">${esc(quads[3]!.body)}</p>
        </div>
      </div>
    </div>
  </div>`;
}

/**
 * 07. Clinical Study / Provenance (3-Stage Case Study)
 */
export function renderCaseStudySlide(slide: DetailedSlideContent, manifest: BrandDesignSystem): string {
  const headline = esc(slide.headline || 'Longitudinal Case Study');
  const kicker = esc(slide.kicker || manifest.domain.toUpperCase());
  const caseStudy = slide.caseStudy || {
    hypothesis: `Uncontrolled variance in ${manifest.domain} diluted overall impact and increased operational friction.`,
    intervention: 'Introduced strict mathematical hierarchy, standardized tokens, and rigorous verification checkpoints.',
    result: 'Achieved a 3.8x expansion in audience retention, zero regressions, and lasting authority.'
  };

  return `
  <!-- 07. CLINICAL STUDY (3-STAGE CASE STUDY) -->
  <div id="slide-7" class="slide-layer">
    <div class="flex flex-col h-full justify-between py-6">
      <div class="shrink-0 mb-6 border-b-2 border-ink pb-4 flex justify-between items-end">
        <h2 class="font-display font-bold text-[68px] leading-none text-ink">${headline}</h2>
        <span class="font-mono text-[15px] uppercase tracking-widest text-accent font-bold mb-1">${kicker}</span>
      </div>
      <div class="flex-1 flex flex-col gap-6 justify-center my-auto">
        <!-- Stage 1 -->
        <div class="border border-hairline bg-surface p-7 flex gap-8 items-start relative shadow-sm">
          <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-graphite"></div>
          <div class="font-mono font-bold text-[14px] uppercase text-graphite tracking-widest w-32 shrink-0 pt-1 text-right border-r border-hairline pr-6 mr-2">Hypothesis</div>
          <div>
            <h3 class="font-display font-bold text-[28px] text-ink mb-2">Baseline Friction</h3>
            <p class="font-sans text-[22px] leading-[1.45] text-graphite clamp-2">${esc(caseStudy.hypothesis)}</p>
          </div>
        </div>
        <!-- Stage 2 -->
        <div class="border border-hairline bg-surface p-7 flex gap-8 items-start relative shadow-sm">
          <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-ink"></div>
          <div class="font-mono font-bold text-[14px] uppercase text-ink tracking-widest w-32 shrink-0 pt-1 text-right border-r border-hairline pr-6 mr-2">Intervention</div>
          <div>
            <h3 class="font-display font-bold text-[28px] text-ink mb-2">Systemic Resolution</h3>
            <p class="font-sans text-[22px] leading-[1.45] text-graphite clamp-2">${esc(caseStudy.intervention)}</p>
          </div>
        </div>
        <!-- Stage 3 -->
        <div class="border-2 border-accent bg-paper p-7 flex gap-8 items-start relative shadow-md">
          <div class="absolute left-0 top-0 bottom-0 w-2 bg-accent"></div>
          <div class="font-mono font-bold text-[14px] uppercase text-accent tracking-widest w-32 shrink-0 pt-1 text-right border-r border-hairline pr-6 mr-2">Validated Result</div>
          <div>
            <h3 class="font-display font-bold text-[28px] text-accent mb-2">Compounding Authority</h3>
            <p class="font-sans text-[22px] leading-[1.45] text-ink font-semibold clamp-2">${esc(caseStudy.result)}</p>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

/**
 * 08. Theoretical Correction / Illusion vs Reality (Debunk)
 */
export function renderDebunkSlide(slide: DetailedSlideContent, manifest: BrandDesignSystem): string {
  const headline = esc(slide.headline || 'Myth vs. Method');
  const claim = esc(slide.claimVsRecord?.claim || `Quality in ${manifest.domain} is subjective and defies empirical formulation.`);
  const recordTitle = esc(slide.claimVsRecord?.recordTitle || 'The Documented Physics of Layout');
  const recordBody = esc(slide.claimVsRecord?.recordBody || `Empirical testing proves that deliberate structural bounds lower cognitive drag, enabling viewers to synthesize complex insights effortlessly.`);

  return `
  <!-- 08. DEBUNK (MYTH VS RECORD) -->
  <div id="slide-8" class="slide-layer">
    <div class="flex flex-col h-full justify-between py-6">
      <div class="shrink-0 mb-6 border-b-2 border-ink pb-4 text-center">
        <h2 class="font-display font-bold text-[68px] leading-none text-ink">${headline}</h2>
      </div>
      <div class="flex-1 flex flex-col border border-hairline bg-paper my-auto shadow-sm">
        <!-- Null Hypothesis / The Myth -->
        <div class="flex-1 p-10 flex flex-col justify-center text-center border-b border-hairline relative bg-surface">
          <span class="absolute top-5 left-1/2 -translate-x-1/2 font-mono text-[14px] font-bold text-graphite uppercase tracking-widest">THE COMMON CLAIM [UNVERIFIED]</span>
          <p class="font-sans text-[30px] text-graphite leading-[1.35] line-through decoration-graphite decoration-2 max-w-[850px] mx-auto clamp-3">
            "${claim}"
          </p>
        </div>
        <!-- Validated Finding / The Record -->
        <div class="flex-1 p-10 flex flex-col justify-center text-center relative bg-paper border-t-4 border-accent">
          <span class="absolute top-5 left-1/2 -translate-x-1/2 font-mono text-[14px] font-bold text-accent uppercase tracking-widest">THE DOCUMENTED RECORD</span>
          <h3 class="font-display font-bold text-[34px] text-ink leading-tight mb-3 mt-4">${recordTitle}</h3>
          <p class="font-sans text-[24px] text-graphite leading-[1.4] max-w-[850px] mx-auto clamp-3">
            ${recordBody}
          </p>
        </div>
      </div>
    </div>
  </div>`;
}

/**
 * 09. Literature Review / The Collection (Grid)
 */
export function renderGridSlide(slide: DetailedSlideContent, manifest: BrandDesignSystem): string {
  const headline = esc(slide.headline || 'System Architecture Pillars');
  const defaultItems = [
    { index: '01', kicker: 'PROPORTIONAL SCALE', body: `Harmonic ratios defining spatial hierarchy across all ${manifest.domain} compositions.` },
    { index: '02', kicker: 'NEGATIVE SPACE', body: 'The intentional sculpted void that grants breathing room and elevated focus.' },
    { index: '03', kicker: 'CHROMATIC RESTRAINT', body: 'Restricted 3-color palette eliminating sensory fatigue and establishing instant recognition.' },
    { index: '04', kicker: 'TACTILE FIDELITY', body: 'Honoring physical paper traditions through subtle texture and disciplined typography.' }
  ];
  const items = slide.items && slide.items.length >= 4 ? slide.items.slice(0, 4) : defaultItems;

  const cardsHtml = items.map((it, idx) => `
    <div class="border border-hairline p-7 flex flex-col justify-between bg-surface shadow-sm relative">
      <div class="absolute top-0 left-0 w-8 h-1 bg-accent"></div>
      <div>
        <span class="font-mono text-[14px] font-bold uppercase tracking-widest text-accent mb-2 block">PILLAR 0${idx + 1}</span>
        <h3 class="font-display font-bold text-[28px] text-ink mb-2 leading-tight">${esc(it.kicker || '')}</h3>
        <p class="font-sans text-[22px] text-graphite leading-[1.4] clamp-3">${esc(it.body || '')}</p>
      </div>
      <div class="w-12 h-1 bg-hairline mt-4"></div>
    </div>
  `).join('');

  return `
  <!-- 09. LITERATURE REVIEW (GRID) -->
  <div id="slide-9" class="slide-layer">
    <div class="flex flex-col h-full justify-between py-6">
      <div class="shrink-0 mb-6 border-b-2 border-ink pb-4 flex justify-between items-end">
        <h2 class="font-display font-bold text-[68px] leading-none text-ink">${headline}</h2>
        ${renderBrandSignatureMotif(manifest)}
      </div>
      <div class="flex-1 grid grid-cols-2 gap-7 my-auto">
        ${cardsHtml}
      </div>
    </div>
  </div>`;
}

/**
 * 10. Research Methodology / STEM Timeline
 */
export function renderTimelineSlide(slide: DetailedSlideContent, manifest: BrandDesignSystem): string {
  const headline = esc(slide.headline || 'Chronological Evolution');
  const defaultMilestones = [
    { phase: 'ORIGINS', title: 'FOUNDATIONAL TRADITION', body: `Early organic practices and intuitive rules governing ${manifest.domain}.` },
    { phase: 'TRANSITION', title: 'DISRUPTIVE SHIFT', body: 'Emergence of mechanical reproduction and experimental modernism.' },
    { phase: 'CONTEMPORARY', title: 'CANONICAL SYNTHESIS', body: 'The marriage of ancient physical craft with programmatic rigor.' }
  ];
  const milestones = slide.milestones && slide.milestones.length >= 3 ? slide.milestones.slice(0, 3) : defaultMilestones;

  const milestonesHtml = milestones.map((m, idx) => `
    <div class="relative pl-12 pb-10">
      <div class="absolute left-[-160px] top-1 font-mono font-bold text-[18px] text-accent w-32 text-right">${esc(m.phase)}</div>
      <div class="absolute left-[-9px] top-2 w-4 h-4 rounded-full bg-paper border-2 ${idx === 2 ? 'border-accent bg-accent' : 'border-ink'}"></div>
      <h3 class="font-display font-bold text-[28px] text-ink mb-2 leading-tight">${esc(m.title)}</h3>
      <p class="font-sans text-[22px] text-graphite leading-[1.4] clamp-3">${esc(m.body)}</p>
    </div>
  `).join('');

  return `
  <!-- 10. METHODOLOGY (STEM TIMELINE) -->
  <div id="slide-10" class="slide-layer">
    <div class="flex flex-col h-full justify-between py-6">
      <div class="shrink-0 mb-6 border-b-2 border-ink pb-4">
        <h2 class="font-display font-bold text-[68px] leading-none text-ink">${headline}</h2>
      </div>
      <div class="flex-1 flex flex-col justify-center border-l-2 border-hairline ml-[160px] my-auto">
        ${milestonesHtml}
      </div>
    </div>
  </div>`;
}

/**
 * 11. Citation / The Monolith (Pullquote)
 */
export function renderPullquoteSlide(slide: DetailedSlideContent, manifest: BrandDesignSystem): string {
  const quote = esc(slide.thesisQuote || manifest.aestheticManifesto || 'Beauty lies not in ornamentation, but in the elegant efficiency of a resolved structure.');
  const author = esc(slide.authorOrAttribution || manifest.templateName + ' Thesis');
  const title = esc(slide.subhead || manifest.domain);

  return `
  <!-- 11. CITATION (PULLQUOTE) -->
  <div id="slide-11" class="slide-layer">
    <div class="flex flex-col h-full justify-between items-center text-center px-8 py-8">
      <div class="flex justify-between items-center w-full">
        <div class="w-24 h-1 bg-accent"></div>
        ${renderBrandSignatureMotif(manifest)}
      </div>
      <div class="p-12 bg-surface border border-hairline relative max-w-[940px] my-auto shadow-sm">
        <span class="font-display text-[110px] text-accent leading-[0.5] mb-4 block">“</span>
        <blockquote class="font-display font-bold text-[46px] leading-[1.3] text-ink mb-8 balance-text italic">
          ${quote}
        </blockquote>
        <div class="pt-8 border-t-2 border-ink w-3/4 mx-auto flex flex-col items-center">
          <span class="font-sans text-[26px] font-bold text-ink uppercase tracking-widest">${author}</span>
          <span class="font-mono text-[16px] uppercase tracking-widest text-graphite mt-2">${title}</span>
        </div>
      </div>
      <span class="font-mono text-[13px] uppercase tracking-widest text-graphite">SIGNATURE THESIS</span>
    </div>
  </div>`;
}

/**
 * 12. Acquisition / Subscription (Hero CTA)
 */
export function renderCtaSlide(slide: DetailedSlideContent, manifest: BrandDesignSystem): string {
  const headline = esc(slide.headline || 'Implement the Standard.');
  const body = esc(slide.bodyText || `Access the complete field guide and editorial publication archive for ${manifest.domain}.`);
  const buttonText = esc(slide.cta?.buttonText || 'EXPLORE THE SPECIFICATION');
  const handle = esc(slide.cta?.socialHandle || '@' + manifest.templateName.replace(/\s+/g, '').toUpperCase());

  return `
  <!-- 12. ACQUISITION (HERO CTA) -->
  <div id="slide-12" class="slide-layer">
    <div class="flex flex-col h-full justify-between items-center text-center py-6">
      <div class="flex flex-col items-center pt-8">
        <div class="mb-6">
          ${renderBrandSignatureMotif(manifest)}
        </div>
        <h2 class="font-display font-bold text-[72px] leading-[1.05] tracking-tight text-ink mb-6 max-w-[850px]">
          ${headline}
        </h2>
        <div class="p-8 bg-surface border-t-2 border-b-2 border-ink max-w-[800px] shadow-sm">
          <p class="font-sans text-[26px] text-graphite leading-[1.4]">
            ${body}
          </p>
        </div>
      </div>
      <div class="pb-6 flex flex-col items-center">
        <a href="#" class="px-12 py-5 bg-ink text-paper font-bold uppercase tracking-widest text-[22px] hover:bg-graphite transition-colors inline-block rounded-none shadow-md">
          ${buttonText}
        </a>
        <span class="font-mono text-[16px] uppercase tracking-widest text-graphite mt-6">${handle}</span>
      </div>
    </div>
  </div>`;
}

/**
 * 13. Focal Metric / Hero Stat
 */
export function renderHeroStatSlide(slide: DetailedSlideContent, manifest: BrandDesignSystem): string {
  const stat = slide.stats?.[0] || {
    value: '84',
    unit: '%',
    label: 'PERCEIVED AUTHORITY ELEVATION',
    context: `Observed multiplier in sustained reader attention within ${manifest.domain} environments.`
  };

  return `
  <!-- 13. FOCAL METRIC (HERO STAT) -->
  <div id="slide-13" class="slide-layer">
    <div class="flex flex-col h-full justify-between items-center text-center px-12 py-8">
      <div class="pt-6 flex flex-col items-center">
        <span class="font-mono text-[16px] text-accent uppercase tracking-widest font-bold mb-4">CRITICAL QUANTITATIVE FINDING</span>
        <div class="font-display font-black text-[220px] leading-none text-ink flex items-baseline tracking-tighter">
          ${esc(stat.value)}<span class="text-[90px] font-sans font-normal text-accent">${esc(stat.unit || '%')}</span>
        </div>
        <div class="w-32 h-1 bg-accent my-6"></div>
        <h3 class="font-display font-bold text-[36px] text-ink uppercase tracking-wide mb-4">${esc(stat.label)}</h3>
      </div>
      <div class="p-8 bg-surface border-t-2 border-b-2 border-ink max-w-[850px] mb-6 shadow-sm">
        <p class="font-sans text-[26px] leading-[1.45] text-graphite">
          ${esc(stat.context)}
        </p>
      </div>
    </div>
  </div>`;
}

/**
 * 14. Experimental Design / Methodology (Step-by-Step Flow)
 */
export function renderStepByStepSlide(slide: DetailedSlideContent, manifest: BrandDesignSystem): string {
  const headline = esc(slide.headline || 'Methodological Protocol');
  const defaultSteps = [
    { stepNumber: 'PHASE 01', title: 'Subtractive Audit', body: `Audit every element in ${manifest.domain}. Eliminate any form that does not serve an essential purpose.` },
    { stepNumber: 'PHASE 02', title: 'Proportional Calibration', body: 'Enforce strict modular scale hierarchy between primary display elements and secondary body text.' },
    { stepNumber: 'PHASE 03', title: 'Empirical Verification', body: 'Execute rigorous visual testing to confirm seamless optical balance and frame fill.' }
  ];
  const steps = slide.steps && slide.steps.length >= 3 ? slide.steps.slice(0, 3) : defaultSteps;

  return `
  <!-- 14. METHODOLOGY (STEP-BY-STEP FLOW) -->
  <div id="slide-14" class="slide-layer">
    <div class="flex flex-col h-full justify-between py-6">
      <div class="shrink-0 mb-6 border-b-2 border-ink pb-4 flex justify-between items-end">
        <h2 class="font-display font-bold text-[68px] leading-none text-ink">${headline}</h2>
        ${renderBrandSignatureMotif(manifest)}
      </div>
      <div class="flex-1 flex flex-col gap-6 justify-center my-auto">
        <div class="flex gap-8 items-start border-l-4 border-ink pl-8 bg-surface p-6">
          <div class="font-mono text-[22px] font-bold text-graphite shrink-0 mt-1">${esc(steps[0]!.stepNumber)}</div>
          <div>
            <h3 class="font-display font-bold text-[28px] text-ink mb-1">${esc(steps[0]!.title)}</h3>
            <p class="font-sans text-[22px] text-graphite clamp-2">${esc(steps[0]!.body)}</p>
          </div>
        </div>
        <div class="flex gap-8 items-start border-l-4 border-ink pl-8 bg-surface p-6">
          <div class="font-mono text-[22px] font-bold text-graphite shrink-0 mt-1">${esc(steps[1]!.stepNumber)}</div>
          <div>
            <h3 class="font-display font-bold text-[28px] text-ink mb-1">${esc(steps[1]!.title)}</h3>
            <p class="font-sans text-[22px] text-graphite clamp-2">${esc(steps[1]!.body)}</p>
          </div>
        </div>
        <div class="flex gap-8 items-start border-l-4 border-accent pl-8 bg-paper border-y border-r border-hairline p-6 shadow-sm">
          <div class="font-mono text-[22px] font-bold text-accent shrink-0 mt-1">${esc(steps[2]!.stepNumber)}</div>
          <div>
            <h3 class="font-display font-bold text-[28px] text-accent mb-1">${esc(steps[2]!.title)}</h3>
            <p class="font-sans text-[22px] text-ink font-semibold clamp-2">${esc(steps[2]!.body)}</p>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

/**
 * 15. Comparative Paradigm (Do's & Don'ts)
 */
export function renderDosAndDontsSlide(slide: DetailedSlideContent, manifest: BrandDesignSystem): string {
  const headline = esc(slide.headline || 'Comparative Standards');
  const defaultLegacy = [
    `Cluttered visual noise and unmotivated ornamentation in ${manifest.domain}.`,
    'Chaotic arbitrary positioning leading to cognitive friction.',
    'Generic placeholder statements lacking verified substance.'
  ];
  const defaultProposed = [
    'Disciplined structural flow with 75%–90% balanced frame fill.',
    'Bespoke domain-authentic editorial copy and verified telemetry.',
    'Architectural card geometry anchored by Swiss hairlines.'
  ];
  const legacy = slide.dosAndDonts?.legacyItems || defaultLegacy;
  const proposed = slide.dosAndDonts?.proposedItems || defaultProposed;

  return `
  <!-- 15. COMPARATIVE PARADIGM (DO'S & DON'TS) -->
  <div id="slide-15" class="slide-layer">
    <div class="flex flex-col h-full justify-between py-6">
      <div class="shrink-0 mb-6 border-b-2 border-ink pb-4 text-center">
        <h2 class="font-display font-bold text-[68px] leading-none text-ink">${headline}</h2>
      </div>
      <div class="flex-1 flex gap-8 border border-hairline shadow-sm my-auto">
        <!-- Avoid -->
        <div class="flex-1 flex flex-col bg-surface p-8">
          <span class="font-mono text-[16px] font-bold uppercase tracking-widest text-graphite border-b border-hairline pb-4 mb-6">LEGACY MODEL (AVOID)</span>
          <ul class="space-y-6">
            <li class="flex gap-4 items-start font-sans text-[22px] text-graphite leading-[1.35]">
              <span class="font-mono text-graphite font-bold">✕</span> ${esc(legacy[0] || defaultLegacy[0])}
            </li>
            <li class="flex gap-4 items-start font-sans text-[22px] text-graphite leading-[1.35]">
              <span class="font-mono text-graphite font-bold">✕</span> ${esc(legacy[1] || defaultLegacy[1])}
            </li>
            <li class="flex gap-4 items-start font-sans text-[22px] text-graphite leading-[1.35]">
              <span class="font-mono text-graphite font-bold">✕</span> ${esc(legacy[2] || defaultLegacy[2])}
            </li>
          </ul>
        </div>
        <!-- Adopt -->
        <div class="flex-1 flex flex-col bg-paper p-8 border-l border-hairline relative">
          <div class="absolute top-0 left-0 w-full h-1 bg-accent"></div>
          <span class="font-mono text-[16px] font-bold uppercase tracking-widest text-accent border-b border-hairline pb-4 mb-6">PROPOSED MODEL (ADOPT)</span>
          <ul class="space-y-6">
            <li class="flex gap-4 items-start font-sans font-medium text-[22px] text-ink leading-[1.35]">
              <span class="font-mono text-accent font-bold">✓</span> ${esc(proposed[0] || defaultProposed[0])}
            </li>
            <li class="flex gap-4 items-start font-sans font-medium text-[22px] text-ink leading-[1.35]">
              <span class="font-mono text-accent font-bold">✓</span> ${esc(proposed[1] || defaultProposed[1])}
            </li>
            <li class="flex gap-4 items-start font-sans font-medium text-[22px] text-ink leading-[1.35]">
              <span class="font-mono text-accent font-bold">✓</span> ${esc(proposed[2] || defaultProposed[2])}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>`;
}

/**
 * 16. Implementation Audit / The Inventory (Checklist)
 */
export function renderChecklistSlide(slide: DetailedSlideContent, manifest: BrandDesignSystem): string {
  const headline = esc(slide.headline || 'System Quality Audit');
  const defaultChecklist = [
    { text: `Are all telemetry metrics within ${manifest.domain} strictly numerical with signed badges?`, checked: true },
    { text: 'Does every slide layer fill 75%–90% of vertical canvas height without dead voids?', checked: true },
    { text: 'Has all position:absolute text jitter been eliminated in favor of clean Flexbox?', checked: true },
    { text: 'Are mobile optical thresholds strictly adhered to (≥20px meta, ≥24px body)?', checked: true }
  ];
  const items = slide.checklist && slide.checklist.length === 4 ? slide.checklist : defaultChecklist;

  const itemsHtml = items.map((it) => `
    <div class="flex items-center gap-6 p-6 border ${it.checked ? 'border-accent bg-paper shadow-sm' : 'border-hairline bg-surface'}">
      <div class="w-8 h-8 border-2 ${it.checked ? 'border-accent bg-accent/10 text-accent' : 'border-graphite'} shrink-0 flex items-center justify-center font-mono font-bold text-[18px]">
        ${it.checked ? '✓' : ''}
      </div>
      <p class="font-sans text-[24px] ${it.checked ? 'text-ink font-semibold' : 'text-graphite'} leading-tight">
        ${esc(it.text)}
      </p>
    </div>
  `).join('');

  return `
  <!-- 16. IMPLEMENTATION AUDIT (CHECKLIST) -->
  <div id="slide-16" class="slide-layer">
    <div class="flex flex-col h-full justify-between py-6">
      <div class="shrink-0 mb-6 border-b-2 border-ink pb-4 flex justify-between items-end">
        <h2 class="font-display font-bold text-[68px] leading-none text-ink">${headline}</h2>
        <span class="font-mono text-[15px] uppercase tracking-widest text-accent font-bold mb-1">4-POINT AUDIT</span>
      </div>
      <div class="flex-1 flex flex-col gap-5 justify-center my-auto">
        ${itemsHtml}
      </div>
    </div>
  </div>`;
}

/**
 * 17. System Architecture / Component Anatomy
 */
export function renderAnatomySlide(slide: DetailedSlideContent, manifest: BrandDesignSystem): string {
  const headline = esc(slide.headline || 'System Architecture');
  const defaultCallouts = [
    { tag: `01. ${manifest.domain.toUpperCase()} CORE`, title: 'Foundational Kernel', body: `The primary structural tenets defining ${manifest.domain}.` },
    { tag: '02. HARMONIC SCALE', title: 'Modular Rhythm', body: 'Geometric scaling bounding headlines, kickers, and body prose.' },
    { tag: '03. TACTILE SURFACE', title: 'Material Authenticity', body: 'Physical print textures evoking heritage print craftsmanship.' },
    { tag: '04. VERIFIED RIGOR', title: 'Empirical Telemetry', body: 'Objective standards eliminating layout collisions and dead space.' }
  ];
  const callouts = slide.callouts && slide.callouts.length === 4 ? slide.callouts : defaultCallouts;

  return `
  <!-- 17. SYSTEM ARCHITECTURE (ANATOMY) -->
  <div id="slide-17" class="slide-layer">
    <div class="flex flex-col h-full justify-between py-6">
      <div class="shrink-0 mb-6 border-b-2 border-ink pb-4 text-center">
        <h2 class="font-display font-bold text-[68px] leading-none text-ink">${headline}</h2>
      </div>
      <div class="flex-1 relative flex items-center justify-center border border-hairline bg-surface my-auto">
        <!-- Connecting Crosshairs -->
        <div class="absolute inset-x-12 top-1/2 h-[1px] border-t border-dashed border-hairline -translate-y-1/2"></div>
        <div class="absolute inset-y-12 left-1/2 w-[1px] border-l border-dashed border-hairline -translate-x-1/2"></div>

        <!-- Central Node -->
        <div class="bg-paper border-2 border-ink px-10 py-6 font-display font-bold text-[32px] text-ink relative z-10 shadow-md">
          ${esc(manifest.templateName.toUpperCase())}
        </div>

        <!-- 4 Callout Boxes -->
        <div class="absolute top-8 left-8 w-[320px] bg-paper p-5 border border-hairline shadow-sm">
          <span class="font-mono text-[13px] font-bold uppercase tracking-widest text-accent mb-1 block">${esc(callouts[0]!.tag)}</span>
          <p class="font-sans text-[18px] text-graphite leading-[1.3]">${esc(callouts[0]!.body)}</p>
        </div>
        <div class="absolute top-8 right-8 w-[320px] bg-paper p-5 border border-hairline shadow-sm text-right">
          <span class="font-mono text-[13px] font-bold uppercase tracking-widest text-accent mb-1 block">${esc(callouts[1]!.tag)}</span>
          <p class="font-sans text-[18px] text-graphite leading-[1.3]">${esc(callouts[1]!.body)}</p>
        </div>
        <div class="absolute bottom-8 left-8 w-[320px] bg-paper p-5 border border-hairline shadow-sm">
          <span class="font-mono text-[13px] font-bold uppercase tracking-widest text-ink mb-1 block">${esc(callouts[2]!.tag)}</span>
          <p class="font-sans text-[18px] text-graphite leading-[1.3]">${esc(callouts[2]!.body)}</p>
        </div>
        <div class="absolute bottom-8 right-8 w-[320px] bg-paper p-5 border border-hairline shadow-sm text-right">
          <span class="font-mono text-[13px] font-bold uppercase tracking-widest text-ink mb-1 block">${esc(callouts[3]!.tag)}</span>
          <p class="font-sans text-[18px] text-graphite leading-[1.3]">${esc(callouts[3]!.body)}</p>
        </div>
      </div>
    </div>
  </div>`;
}

// ======================================================================
// MASTER COMPILER: ALL 17 SLIDES + TACTILE TEXTURES + INTERACTIVE BAR
// ======================================================================

export const ARCHETYPE_NAMES = [
  '01. Abstract (Cover)',
  '02. Exec Summary (List)',
  '03. Observation (Image Split)',
  '04. Empirical Data (Stats)',
  '05. Inquiry (Q&A)',
  '06. The Framework (2x2 Matrix)',
  '07. Clinical Study (3-Part)',
  '08. Hypothesis vs Finding (Debunk)',
  '09. Literature Review (Grid)',
  '10. Methodology (Timeline)',
  '11. Citation (Quote)',
  '12. Acquisition (CTA)',
  '13. Focal Metric (Hero Stat)',
  '14. Experimental Design (Step-by-Step)',
  '15. Comparative Paradigm (Do\'s/Don\'ts)',
  '16. Evaluation Criteria (Checklist)',
  '17. System Architecture (Anatomy)'
];

function getPatternCss(pattern?: string): string {
  switch (pattern) {
    case 'washi':
      return `
      .bg-pattern {
        background-image: radial-gradient(rgba(0, 0, 0, 0.04) 1px, transparent 0);
        background-size: 20px 20px;
      }`;
    case 'grid':
      return `
      .bg-pattern {
        background-image: 
          linear-gradient(rgba(0, 0, 0, 0.035) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 0, 0, 0.035) 1px, transparent 1px);
        background-size: 32px 32px;
      }`;
    case 'dots':
      return `
      .bg-pattern {
        background-image: radial-gradient(rgba(0, 0, 0, 0.08) 1.5px, transparent 0);
        background-size: 26px 26px;
      }`;
    case 'blueprint':
      return `
      .bg-pattern {
        background-image: 
          linear-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.06) 1px, transparent 1px);
        background-size: 40px 40px;
      }`;
    case 'clean':
    default:
      return '';
  }
}

export function compileCompleteTemplate(
  manifest: BrandDesignSystem,
  slides: DetailedSlideContent[]
): string {
  const slideMap = new Map<number, DetailedSlideContent>();
  slides.forEach((s) => slideMap.set(s.slideNumber, s));

  const renderedSlides: string[] = [
    renderCoverSlide(slideMap.get(1) || { slideNumber: 1, archetype: 'Cover', kicker: '', headline: '' }, manifest),
    renderListSlide(slideMap.get(2) || { slideNumber: 2, archetype: 'List', kicker: '', headline: '' }, manifest),
    renderImageSplitSlide(slideMap.get(3) || { slideNumber: 3, archetype: 'ImageSplit', kicker: '', headline: '' }, manifest),
    renderTelemetrySlide(slideMap.get(4) || { slideNumber: 4, archetype: 'Telemetry', kicker: '', headline: '' }, manifest),
    renderDialogueSlide(slideMap.get(5) || { slideNumber: 5, archetype: 'Dialogue', kicker: '', headline: '' }, manifest),
    renderQuadrantSlide(slideMap.get(6) || { slideNumber: 6, archetype: 'Quadrant', kicker: '', headline: '' }, manifest),
    renderCaseStudySlide(slideMap.get(7) || { slideNumber: 7, archetype: 'CaseStudy', kicker: '', headline: '' }, manifest),
    renderDebunkSlide(slideMap.get(8) || { slideNumber: 8, archetype: 'Debunk', kicker: '', headline: '' }, manifest),
    renderGridSlide(slideMap.get(9) || { slideNumber: 9, archetype: 'Grid', kicker: '', headline: '' }, manifest),
    renderTimelineSlide(slideMap.get(10) || { slideNumber: 10, archetype: 'Timeline', kicker: '', headline: '' }, manifest),
    renderPullquoteSlide(slideMap.get(11) || { slideNumber: 11, archetype: 'Pullquote', kicker: '', headline: '' }, manifest),
    renderCtaSlide(slideMap.get(12) || { slideNumber: 12, archetype: 'HeroCTA', kicker: '', headline: '' }, manifest),
    renderHeroStatSlide(slideMap.get(13) || { slideNumber: 13, archetype: 'HeroStat', kicker: '', headline: '' }, manifest),
    renderStepByStepSlide(slideMap.get(14) || { slideNumber: 14, archetype: 'StepByStep', kicker: '', headline: '' }, manifest),
    renderDosAndDontsSlide(slideMap.get(15) || { slideNumber: 15, archetype: 'DosAndDonts', kicker: '', headline: '' }, manifest),
    renderChecklistSlide(slideMap.get(16) || { slideNumber: 16, archetype: 'Checklist', kicker: '', headline: '' }, manifest),
    renderAnatomySlide(slideMap.get(17) || { slideNumber: 17, archetype: 'Anatomy', kicker: '', headline: '' }, manifest)
  ];

  const selectOptions = ARCHETYPE_NAMES.map((name, i) =>
    `<option value="${i + 1}">${name}</option>`
  ).join('\n        ');

  const patternCss = getPatternCss(manifest.visualMetaphor?.texturePattern);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(manifest.templateName)}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="${manifest.typography.googleFontsUrl}">
  <style>
    /* Font Families */
    .font-display { font-family: '${manifest.typography.displayFont}', serif, sans-serif; }
    .font-sans { font-family: '${manifest.typography.bodyFont}', sans-serif; }
    .font-mono { font-family: '${manifest.typography.monoFont}', monospace; }

    /* Palette Tokens */
    .bg-paper { background-color: ${manifest.colors.paper} !important; }
    .text-paper { color: ${manifest.colors.paper} !important; }
    .bg-ink { background-color: ${manifest.colors.ink} !important; }
    .text-ink { color: ${manifest.colors.ink} !important; }
    .border-ink { border-color: ${manifest.colors.ink} !important; }
    .bg-accent { background-color: ${manifest.colors.accent} !important; }
    .text-accent { color: ${manifest.colors.accent} !important; }
    .border-accent { border-color: ${manifest.colors.accent} !important; }
    .bg-surface { background-color: ${manifest.colors.surface} !important; }
    .text-surface { color: ${manifest.colors.surface} !important; }
    .border-surface { border-color: ${manifest.colors.surface} !important; }
    .bg-graphite { background-color: ${manifest.colors.graphite} !important; }
    .text-graphite { color: ${manifest.colors.graphite} !important; }
    .border-graphite { border-color: ${manifest.colors.graphite} !important; }
    .bg-hairline { background-color: ${manifest.colors.hairline} !important; }
    .border-hairline { border-color: ${manifest.colors.hairline} !important; }

    ${patternCss}

    /* UI Scaling Modes */
    .mode-preview .canvas-container {
      transform: scale(0.48);
      transform-origin: top center;
      margin-bottom: -680px; 
    }
    .mode-export .canvas-container {
      transform: scale(1);
      margin: 0 auto;
    }

    /* Strict Dimensions & Leaf Layering */
    .canvas-container, #export-canvas {
      width: 1080px !important;
      height: 1350px !important;
      position: relative !important;
      overflow: hidden !important;
      box-sizing: border-box !important;
      flex-shrink: 0 !important;
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

    /* Clamps */
    .clamp-1 { display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; }
    .clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
    .clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
    .clamp-4 { display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; }
    .clamp-5 { display: -webkit-box; -webkit-line-clamp: 5; -webkit-box-orient: vertical; overflow: hidden; }
    .clamp-6 { display: -webkit-box; -webkit-line-clamp: 6; -webkit-box-orient: vertical; overflow: hidden; }
    .balance-text { text-wrap: balance; }
  </style>
</head>
<body class="mode-preview font-sans antialiased bg-[#0B0F19] selection:bg-accent selection:text-paper">

  <!-- Web UI Control Panel -->
  <div class="fixed top-0 left-0 w-full bg-[#0F172A] border-b border-[#1E293B] p-4 z-[100] flex justify-between items-center shadow-lg font-sans">
    <div>
      <h1 class="font-display font-bold text-xl tracking-tight text-white uppercase">${esc(manifest.templateName)}</h1>
      <p class="font-mono text-[11px] text-slate-400 uppercase tracking-widest mt-0.5">${esc(manifest.domain)} (1080x1350 — 17 Canonical Archetypes)</p>
    </div>
    <div class="flex gap-3 items-center">
      <button id="prevBtn" class="bg-slate-800 text-white font-mono font-bold text-xs px-3.5 py-2 border border-slate-700 hover:bg-slate-700 transition-colors">
        ← Prev
      </button>
      <select id="slideSelector" class="bg-slate-900 text-white font-sans font-semibold text-xs px-4 py-2 border border-slate-700 cursor-pointer uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-accent transition-all">
        ${selectOptions}
      </select>
      <button id="nextBtn" class="bg-slate-800 text-white font-mono font-bold text-xs px-3.5 py-2 border border-slate-700 hover:bg-slate-700 transition-colors">
        Next →
      </button>
      <button id="modeToggle" class="bg-accent text-white font-bold tracking-widest uppercase text-[11px] px-5 py-2 hover:opacity-90 transition-opacity">
        Export Mode
      </button>
    </div>
  </div>

  <!-- Main Workspace -->
  <div class="pt-[120px] pb-[80px] flex justify-center w-full min-h-screen">
    
    <div id="export-canvas" class="canvas-container text-ink bg-paper bg-pattern shadow-2xl">
      
      <!-- GLOBAL MASTHEAD PLACARD (HEADER) -->
      <div class="absolute top-[50px] left-[70px] right-[70px] z-50 flex justify-between items-end border-b-2 border-ink pb-4">
        <div class="flex flex-col">
          <span class="font-display font-bold text-[28px] tracking-tight uppercase text-ink leading-none">${esc(manifest.templateName)}</span>
          <span class="font-mono text-[13px] text-graphite mt-1 uppercase tracking-widest">${esc(manifest.domain)}</span>
        </div>
        <div class="text-right flex items-center gap-4">
          <span id="global-tag" class="font-mono font-bold text-[14px] uppercase tracking-widest text-accent">ABSTRACT</span>
        </div>
      </div>

      <!-- GLOBAL FOLIO PLACARD (FOOTER) -->
      <div class="absolute bottom-[50px] left-[70px] right-[70px] z-50 flex justify-between items-center border-t border-hairline pt-4 font-mono text-[14px] uppercase tracking-widest text-graphite">
        <span>${esc(manifest.templateName.toUpperCase())}</span>
        <div class="flex items-center gap-4">
          <span>FOLIO</span>
          <span id="page-num" class="font-bold text-ink text-[18px]">01</span>
        </div>
      </div>

      <!-- SAFE AREA FOR CONTENT (1070px height) -->
      <div class="absolute top-[150px] bottom-[130px] left-[70px] right-[70px] z-30">
        ${renderedSlides.join('\n')}
      </div>

    </div>
  </div>

  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const slideSelector = document.getElementById('slideSelector');
      const prevBtn = document.getElementById('prevBtn');
      const nextBtn = document.getElementById('nextBtn');
      const modeToggle = document.getElementById('modeToggle');
      const body = document.body;
      const slides = document.querySelectorAll('.slide-layer');
      const globalTag = document.getElementById('global-tag');
      const pageNum = document.getElementById('page-num');

      const tags = {
        1: 'ABSTRACT', 2: 'SUMMARY', 3: 'OBSERVATION', 4: 'EMPIRICAL DATA',
        5: 'INQUIRY', 6: 'FRAMEWORK', 7: 'CASE STUDY', 8: 'CORRECTION',
        9: 'LITERATURE', 10: 'METHODOLOGY', 11: 'CITATION', 12: 'ACQUISITION',
        13: 'SIGNIFICANCE', 14: 'PROTOCOL', 15: 'PARADIGM', 16: 'AUDIT', 17: 'ARCHITECTURE'
      };

      let currentIndex = 0;

      function goToSlide(index) {
        if (index < 0) index = 0;
        if (index >= slides.length) index = slides.length - 1;
        currentIndex = index;

        slides.forEach((s, idx) => {
          if (idx === currentIndex) {
            s.classList.add('active');
          } else {
            s.classList.remove('active');
          }
        });

        const slideNum = currentIndex + 1;
        slideSelector.value = String(slideNum);
        globalTag.textContent = tags[slideNum] || 'DISPATCH';
        pageNum.textContent = String(slideNum).padStart(2, '0');
      }

      slideSelector.addEventListener('change', (e) => {
        goToSlide(parseInt(e.target.value, 10) - 1);
      });

      prevBtn.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
      });

      nextBtn.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          goToSlide(currentIndex + 1);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          goToSlide(currentIndex - 1);
        }
      });

      modeToggle.addEventListener('click', () => {
        if (body.classList.contains('mode-preview')) {
          body.classList.remove('mode-preview');
          body.classList.add('mode-export');
          modeToggle.textContent = 'Preview Mode';
        } else {
          body.classList.remove('mode-export');
          body.classList.add('mode-preview');
          modeToggle.textContent = 'Export Mode';
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

      goToSlide(0);
    });
  </script>
</body>
</html>`;
}

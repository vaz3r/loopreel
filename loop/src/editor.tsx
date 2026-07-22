import React, { useState, useEffect, useMemo } from 'react';
import { SCHEMES, injectFonts, Engine, chunkArray } from './engine-utils';
import { SlideRenderer } from './SlideRenderer';

const DEFAULT_SLIDES = [
  {
    id: "slide-1", type: "cover",
    tag: "PROTOCOL 01 // OVERTURE",
    headline: "THE ARCHITECTURE OF SCARCITY",
    subheadline: "How high-end brands weaponize friction to filter out low-value volume, command premium pricing, and scale net margins effortlessly.",
    metadata: "VOL. 04 — STRATEGY",
    footerLeft: "MAYARUNS.CO", footerRight: "PAGE 01"
  },
  {
    id: "slide-def-1", type: "definition",
    tag: "LEXICON // 01",
    term: "Friction",
    phonetic: "/ˈfrikSH(ə)n/",
    definition: "The deliberate introduction of structural, financial, or psychological hurdles within a client acquisition process. Designed to repel low-intent volume while simultaneously elevating perceived value for high-net-worth participants.",
    example: "e.g., Requiring a $500 application fee just to book an initial consultation.",
    footerLeft: "NOMENCLATURE", footerRight: "PAGE 02"
  },
  {
    id: "slide-dichotomy-1", type: "dichotomy",
    tag: "STRATEGIC POLARITY",
    headline: "The Paradigm Shift",
    left: { title: "Volume Agency", desc: "Focuses on maximizing client count. Relies on automated funnels, discounts, and rapid turnover. Ultimately leads to commoditization and margin erosion." },
    right: { title: "Scarcity Firm", desc: "Capped client roster. Requires applications, commands high retainers, and leverages asymmetric personalization. Results in compounding brand equity." },
    footerLeft: "COMPARATIVE", footerRight: "PAGE 03"
  },
  {
    id: "slide-timeline-1", type: "timeline",
    tag: "DEPLOYMENT ROADMAP",
    headline: "Integration Sequence",
    events: [
      { date: "PHASE 01", title: "Audit & Constraint", desc: "Identify all points of frictionless entry. Immediately cap the active client roster to artificially induce scarcity." },
      { date: "PHASE 02", title: "Price Restructuring", desc: "Transition from hourly billing to value-based retainers. Implement a minimum engagement floor." },
      { date: "PHASE 03", title: "The Sovereign Gate", desc: "Launch the application-only onboarding process. Require upfront capital commitment before strategy is discussed." },
      { date: "PHASE 04", title: "Asymmetric Delivery", desc: "Reallocate time saved from low-tier clients into hyper-personalized, high-touch experiences for the top 20%." }
    ],
    footerLeft: "EXECUTION PLAN", footerRight: "PAGE 04"
  },
  {
    id: "slide-quote-1", type: "quote",
    tag: "KEY THESIS",
    quote: "The architecture of your pricing dictates the architecture of your respect in the marketplace.",
    author: "M. Reyes", role: "Managing Partner",
    footerLeft: "SYSTEM INSTRUCTIONS", footerRight: "PAGE 05"
  },
  {
    id: "slide-4", type: "sequence",
    tag: "STRATEGY SEQUENCE",
    headline: "The Six Rules of Friction.",
    items: [
      { num: "01", title: "Charge for Onboarding", desc: "Introduce immediate transactional commitment before delivery." },
      { num: "02", title: "Asymmetric Delivery", desc: "Never automate what can be personalized by a skilled artisan." },
      { num: "03", title: "The Sovereign Limit", desc: "Cap your client roster permanently to trigger organic scarcity." },
      { num: "04", title: "Data Opacity", desc: "Keep critical metrics private to manufacture mystique." },
      { num: "05", title: "Intentional Delay", desc: "Introduce a waiting period to shift the power dynamic." },
      { num: "06", title: "The Disqualification", desc: "Openly state who your service is NOT for in the first interaction." }
    ],
    footerLeft: "EXECUTION", footerRight: "PAGE 03"
  },
  {
    id: "slide-telemetry-1", type: "telemetry",
    tag: "MARKET TELEMETRY",
    headline: "Friction to Conversion Ratio.",
    stats: [
      { value: "42%", label: "Increase in LTV" },
      { value: "3.5x", label: "Premium Multiplier" },
      { value: "12%", label: "Volume Drop" },
      { value: "98%", label: "Retention Rate" }
    ],
    footerLeft: "DATA SET 04", footerRight: "PAGE 04"
  },
  {
    id: "slide-table-1", type: "table",
    tag: "COMPARATIVE ANALYSIS",
    headline: "Volume vs. Scarcity Model",
    headers: ["Metric", "Volume Agency", "Scarcity Firm"],
    rows: [
      ["Client Roster", "100+ Active", "Strictly Capped at 12"],
      ["Pricing Model", "Hourly / Deliverables", "Value-Based Retainer"],
      ["Sales Process", "Automated Funnel", "Application & Interview"],
      ["Perceived Value", "Commoditized Vendor", "Strategic Partner"],
      ["Net Margin", "15% - 25%", "60% - 85%"]
    ],
    footerLeft: "ANALYSIS", footerRight: "PAGE 05"
  },
  {
    id: "slide-new-1", type: "image-split",
    tag: "VISUAL SCHEMATIC",
    headline: "Form follows friction.",
    bodyText: "Structural boundaries are not just for text. Incorporating photographic assets requires strict compartmentalization to prevent the image from competing with the typographical hierarchy.",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop", 
    footerLeft: "ASSET ENGINE", footerRight: "PAGE 06"
  },
  {
    id: "slide-new-2", type: "image-cover",
    tag: "ENVIRONMENT",
    headline: "Aesthetic Control.",
    subtext: "Total control over the environment yields total control over the perception of value.",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1080&auto=format&fit=crop", 
    footerLeft: "ENVIRONMENTAL DESIGN", footerRight: "PAGE 07"
  },
  {
    id: "slide-8", type: "cta",
    tag: "TERMINAL SYSTEM",
    headline: "Access the Framework.",
    subtext: "Initialize your architectural transition. The private strategy breakdown is now streaming for selected members.",
    actionLabel: "INITIALIZE SYSTEM", socialHandle: "@mayaruns",
    footerLeft: "END OF TRANS-MISSION", footerRight: "PAGE 08"
  }
];

export default function App() {
  const [baseSlides, setBaseSlides] = useState(DEFAULT_SLIDES);
  const [activePaginatedIndex, setActivePaginatedIndex] = useState(0);
  const [activeSchemeId, setActiveSchemeId] = useState('void_editorial');
  const [exportMode, setExportMode] = useState(false);

  // The Brand Kit State
  const [brandKit, setBrandKit] = useState({
    bg: '#0F172A', text: '#F8FAFC', accent: '#38BDF8',
    fontSerif: 'Playfair Display', fontSans: 'Inter',
    logoUrl: '' 
  });

  // This dynamically converts a slide with 7 items into 2 virtual slides for perfect rendering
  const paginatedSlides = useMemo(() => {
    let virtualSlides = [];
    baseSlides.forEach((slide, originalIndex) => {
      
      // Auto-Spill for Sequences
      if (slide.type === 'sequence' && slide.items && slide.items.length > 4) {
        // Tag items with their absolute index so the UI can edit them properly
        const taggedItems = slide.items.map((item, idx) => ({ ...item, _absoluteIndex: idx }));
        const chunks = chunkArray(taggedItems, 4);
        
        chunks.forEach((chunk, chunkIdx) => {
          virtualSlides.push({
            ...slide,
            _virtualId: `${slide.id}-part-${chunkIdx + 1}`,
            _originalIndex: originalIndex,
            items: chunk,
            tag: `${slide.tag} [${chunkIdx + 1}/${chunks.length}]`,
            footerRight: `${slide.footerRight} (${chunkIdx + 1}/${chunks.length})`
          });
        });
      } 
      // Auto-Spill for Telemetry
      else if (slide.type === 'telemetry' && slide.stats && slide.stats.length > 4) {
        const taggedStats = slide.stats.map((stat, idx) => ({ ...stat, _absoluteIndex: idx }));
        const chunks = chunkArray(taggedStats, 4);
        
        chunks.forEach((chunk, chunkIdx) => {
          virtualSlides.push({
            ...slide,
            _virtualId: `${slide.id}-part-${chunkIdx + 1}`,
            _originalIndex: originalIndex,
            stats: chunk,
            tag: `${slide.tag} [${chunkIdx + 1}/${chunks.length}]`,
          });
        });
      }
      // NEW: Auto-Spill for Tables (Max 5 Rows)
      else if (slide.type === 'table' && slide.rows && slide.rows.length > 5) {
        const taggedRows = slide.rows.map((row, idx) => ({ data: row, _absoluteIndex: idx }));
        const chunks = chunkArray(taggedRows, 5);
        
        chunks.forEach((chunk, chunkIdx) => {
          virtualSlides.push({
            ...slide,
            _virtualId: `${slide.id}-part-${chunkIdx + 1}`,
            _originalIndex: originalIndex,
            rows: chunk.map(c => c.data),
            tag: `${slide.tag} [${chunkIdx + 1}/${chunks.length}]`,
          });
        });
      }
      else if (slide.type === 'timeline' && slide.events && slide.events.length > 4) {
        const taggedEvents = slide.events.map((event, idx) => ({ ...event, _absoluteIndex: idx }));
        const chunks = chunkArray(taggedEvents, 4);
        
        chunks.forEach((chunk, chunkIdx) => {
          virtualSlides.push({
            ...slide,
            _virtualId: `${slide.id}-part-${chunkIdx + 1}`,
            _originalIndex: originalIndex,
            events: chunk,
            tag: `${slide.tag} [${chunkIdx + 1}/${chunks.length}]`,
          });
        });
      }
      // Standard Slide
      else {
        // Still tag items for consistency in editor
        let processedSlide = { ...slide, _virtualId: slide.id, _originalIndex: originalIndex };
        if (processedSlide.items) {
          processedSlide.items = processedSlide.items.map((item, idx) => ({ ...item, _absoluteIndex: idx }));
        }
        virtualSlides.push(processedSlide);
      }
    });
    return virtualSlides;
  }, [baseSlides]);

  // Ensure active index is within bounds if pagination shrinks
  useEffect(() => {
    if (activePaginatedIndex >= paginatedSlides.length) {
      setActivePaginatedIndex(Math.max(0, paginatedSlides.length - 1));
    }
  }, [paginatedSlides.length, activePaginatedIndex]);

  const activeData = paginatedSlides[activePaginatedIndex] || {};

  const currentScheme = useMemo(() => {
    if (activeSchemeId === 'custom_brand') {
      return {
        ...SCHEMES.custom_brand,
        bg: brandKit.bg,
        text: brandKit.text,
        accent: brandKit.accent,
        fontSerif: brandKit.fontSerif,
        fontSans: brandKit.fontSans,
        // Calculate semi-transparent borders dynamically from the text color
        border: `${brandKit.text}33`, // ~20% opacity hex
        gridBorder: `${brandKit.text}1A` // ~10% opacity hex
      };
    }
    return SCHEMES[activeSchemeId];
  }, [activeSchemeId, brandKit]);

  useEffect(() => {
    if (activeSchemeId === 'custom_brand') {
      injectFonts([brandKit.fontSerif, brandKit.fontSans]);
    } else {
      injectFonts(); // Just default fonts
    }
  }, [activeSchemeId, brandKit.fontSerif, brandKit.fontSans]);

  const updateSlideField = (field, value) => {
    const updated = [...baseSlides];
    updated[activeData._originalIndex][field] = value || '';
    setBaseSlides(updated);
  };

  const updateArrayItem = (arrayName, absoluteItemIndex, field, value) => {
    const updated = [...baseSlides];
    const originalIndex = activeData._originalIndex;
    if (updated[originalIndex][arrayName] && updated[originalIndex][arrayName][absoluteItemIndex]) {
      updated[originalIndex][arrayName][absoluteItemIndex][field] = value || '';
      setBaseSlides(updated);
    }
  };

  const updateNestedField = (parent, field, value) => {
    const updated = [...baseSlides];
    const originalIndex = activeData._originalIndex;
    if (!updated[originalIndex][parent]) updated[originalIndex][parent] = {};
    updated[originalIndex][parent][field] = value || '';
    setBaseSlides(updated);
  };

  const addArrayItem = (arrayName) => {
    const updated = [...baseSlides];
    const originalIndex = activeData._originalIndex;
    if (!updated[originalIndex][arrayName]) updated[originalIndex][arrayName] = [];
    
    if (arrayName === 'items') {
      updated[originalIndex][arrayName].push({ num: "XX", title: "New Item", desc: "Description here." });
    } else if (arrayName === 'stats') {
      updated[originalIndex][arrayName].push({ value: "0", label: "NEW METRIC" });
    } else if (arrayName === 'events') {
      updated[originalIndex][arrayName].push({ date: "NEW PHASE", title: "Milestone", desc: "Detailed description of the chronological step." });
    }
    setBaseSlides(updated);
  };


  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E5E5E5] font-sans flex flex-col lg:flex-row overflow-x-hidden">
      
      {/* CONTROL PANEL (LEFT) */}
      <div className="w-full lg:w-[480px] shrink-0 border-r border-[#222] bg-[#121212] p-6 overflow-y-auto flex flex-col justify-between max-h-screen shadow-2xl z-20 relative">
        <div>
          {/* Header */}
          <div className="mb-6 border-b border-[#222] pb-6">
            <div className="flex items-center justify-between mb-2">
              <h1 className="font-mono text-xs tracking-[0.2em] text-[#E63946] uppercase font-bold">AGENCY_ENGINE // V3</h1>
              <span className="bg-[#222] text-[10px] text-green-400 px-2 py-0.5 rounded font-mono border border-green-900">AUTO-PAGINATION ACTIVE</span>
            </div>
          </div>

          {/* Theme / Mode Controls */}
          <div className="space-y-6 mb-8 border-b border-[#222] pb-6">
            <div>
              <label className="block text-[10px] font-mono tracking-widest uppercase text-neutral-500 mb-2">Art Direction Schema</label>
              <div className="grid grid-cols-2 gap-2">
                {Object.values(SCHEMES).map(scheme => (
                  <button
                    key={scheme.id} onClick={() => setActiveSchemeId(scheme.id)}
                    className={`py-2 px-1 border text-[10px] font-mono uppercase transition-all ${
                      activeSchemeId === scheme.id ? 'border-[#E63946] bg-[#E63946]/10 text-[#E63946] font-bold' : 'border-[#333] text-neutral-500 hover:border-[#555]'
                    }`}
                  >
                    {scheme.name}
                  </button>
                ))}
              </div>
            </div>

            {/* BRAND KIT EDITOR (Only visible if custom scheme is active) */}
            {activeSchemeId === 'custom_brand' && (
              <div className="bg-[#1A1A1A] p-4 rounded border border-[#333] space-y-4">
                <h4 className="font-mono text-[10px] text-amber-500 uppercase tracking-widest">Brand Kit Injection</h4>
                
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Background</label>
                    <input type="color" value={brandKit.bg} onChange={(e) => setBrandKit({...brandKit, bg: e.target.value})} className="w-full h-8 bg-transparent border border-[#333] cursor-pointer" />
                  </div>
                  <div>
                    <label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Text Fill</label>
                    <input type="color" value={brandKit.text} onChange={(e) => setBrandKit({...brandKit, text: e.target.value})} className="w-full h-8 bg-transparent border border-[#333] cursor-pointer" />
                  </div>
                  <div>
                    <label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Accent</label>
                    <input type="color" value={brandKit.accent} onChange={(e) => setBrandKit({...brandKit, accent: e.target.value})} className="w-full h-8 bg-transparent border border-[#333] cursor-pointer" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Serif Font (Google)</label>
                    <input value={brandKit.fontSerif} onChange={(e) => setBrandKit({...brandKit, fontSerif: e.target.value})} className="w-full bg-black border border-[#333] rounded px-2 py-1.5 text-xs text-white focus:border-amber-500 font-mono" />
                  </div>
                  <div>
                    <label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Sans Font (Google)</label>
                    <input value={brandKit.fontSans} onChange={(e) => setBrandKit({...brandKit, fontSans: e.target.value})} className="w-full bg-black border border-[#333] rounded px-2 py-1.5 text-xs text-white focus:border-amber-500 font-mono" />
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">SVG/PNG Logo URL</label>
                  <input placeholder="https://..." value={brandKit.logoUrl} onChange={(e) => setBrandKit({...brandKit, logoUrl: e.target.value})} className="w-full bg-black border border-[#333] rounded px-2 py-1.5 text-xs text-white focus:border-amber-500 font-mono" />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[10px] font-mono tracking-widest uppercase text-neutral-500 mb-2">Viewport Mode</label>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => setExportMode(false)} className={`py-2 px-3 border text-xs font-mono uppercase transition-all ${!exportMode ? 'border-white bg-white text-black font-bold' : 'border-[#333] text-neutral-500'}`}>Fitted Preview</button>
                <button onClick={() => setExportMode(true)} className={`py-2 px-3 border text-xs font-mono uppercase transition-all ${exportMode ? 'border-white bg-white text-black font-bold' : 'border-[#333] text-neutral-500'}`}>Raw 1080x1350</button>
              </div>
            </div>
          </div>

          {/* Active Paginated Buffer Navigation */}
          <div className="mb-6 border-b border-[#222] pb-6">
            <label className="block text-[10px] font-mono tracking-widest uppercase text-neutral-500 mb-2 flex justify-between">
              <span>Virtual Buffer (Paginated)</span>
              <span className="text-amber-500">{paginatedSlides.length} Frames</span>
            </label>
            <div className="grid grid-cols-5 gap-1.5">
              {paginatedSlides.map((slide, idx) => (
                <button
                  key={slide._virtualId} onClick={() => setActivePaginatedIndex(idx)}
                  className={`py-1.5 text-xs font-mono transition-all border ${
                    activePaginatedIndex === idx ? 'bg-amber-500 text-[#000] border-amber-500 font-bold' : 'border-[#2D2D2D] text-neutral-500 hover:bg-[#1A1A1A]'
                  }`}
                  title={slide.tag}
                >
                  {String(idx + 1).padStart(2, '0')}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Content Forms */}
          <div className="space-y-4">
            <h3 className="font-mono text-[11px] tracking-widest text-amber-500 uppercase font-bold flex justify-between">
              <span>{activeData.type?.toUpperCase()} // DATA</span>
              <span className="text-neutral-600">SRC_INDEX: {activeData._originalIndex}</span>
            </h3>

            {/* Universal Tags */}
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Header Tag (Base)</label>
                <input
                  value={baseSlides[activeData._originalIndex]?.tag || ''} onChange={(e) => updateSlideField('tag', e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none font-mono"
                />
              </div>
            </div>

            {/* Media URL Field */}
            {activeData.imageUrl !== undefined && (
               <div>
                <label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Background Asset URL</label>
                <input
                  value={activeData.imageUrl} onChange={(e) => updateSlideField('imageUrl', e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none font-mono"
                  placeholder="https://..."
                />
              </div>
            )}

            {activeData.headline !== undefined && (
              <div>
                <label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1 flex justify-between">
                  <span>Headline Block</span>
                  <span className={activeData.headline.length > 60 ? 'text-amber-500' : 'text-neutral-600'}>CHARS: {activeData.headline.length}</span>
                </label>
                <textarea
                  value={activeData.headline} onChange={(e) => updateSlideField('headline', e.target.value)} rows={3}
                  className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                />
              </div>
            )}

            {activeData.bodyText !== undefined && (
              <div>
                <label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Body Text</label>
                <textarea
                  value={activeData.bodyText} onChange={(e) => updateSlideField('bodyText', e.target.value)} rows={5}
                  className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                />
              </div>
            )}

            {activeData.term !== undefined && (
              <div className="mt-4 pt-4 border-t border-[#333] space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Term</label>
                    <input value={activeData.term} onChange={(e) => updateSlideField('term', e.target.value)} className="w-full bg-black border border-[#222] rounded px-2 py-1.5 text-xs text-white" />
                  </div>
                  <div>
                    <label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Phonetic / Meta</label>
                    <input value={activeData.phonetic} onChange={(e) => updateSlideField('phonetic', e.target.value)} className="w-full bg-black border border-[#222] rounded px-2 py-1.5 text-xs text-white" />
                  </div>
                </div>
                <div>
                  <label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Definition</label>
                  <textarea value={activeData.definition} onChange={(e) => updateSlideField('definition', e.target.value)} rows={3} className="w-full bg-black border border-[#222] rounded px-2 py-1.5 text-xs text-white" />
                </div>
                <div>
                  <label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Example / Subtext</label>
                  <input value={activeData.example} onChange={(e) => updateSlideField('example', e.target.value)} className="w-full bg-black border border-[#222] rounded px-2 py-1.5 text-xs text-white" />
                </div>
              </div>
            )}

            {activeData.left !== undefined && activeData.right !== undefined && (
               <div className="mt-4 pt-4 border-t border-[#333] space-y-4">
                  <div className="p-3 border border-[#333] bg-[#151515] rounded">
                    <label className="block text-[9px] font-mono uppercase text-neutral-500 mb-2">Left Matrix (Standard)</label>
                    <input value={activeData.left.title} onChange={(e) => updateNestedField('left', 'title', e.target.value)} placeholder="Title" className="w-full bg-black border border-[#222] rounded px-2 py-1.5 text-xs text-white mb-2" />
                    <textarea value={activeData.left.desc} onChange={(e) => updateNestedField('left', 'desc', e.target.value)} rows={2} placeholder="Description" className="w-full bg-black border border-[#222] rounded px-2 py-1.5 text-xs text-white" />
                  </div>
                  <div className="p-3 border border-amber-900/30 bg-[#151515] rounded">
                    <label className="block text-[9px] font-mono uppercase text-amber-500 mb-2">Right Matrix (Highlighted)</label>
                    <input value={activeData.right.title} onChange={(e) => updateNestedField('right', 'title', e.target.value)} placeholder="Title" className="w-full bg-black border border-[#222] rounded px-2 py-1.5 text-xs text-white mb-2" />
                    <textarea value={activeData.right.desc} onChange={(e) => updateNestedField('right', 'desc', e.target.value)} rows={2} placeholder="Description" className="w-full bg-black border border-[#222] rounded px-2 py-1.5 text-xs text-white" />
                  </div>
               </div>
            )}

            {activeData.items !== undefined && (
              <div className="mt-4 pt-4 border-t border-[#333]">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-[9px] font-mono uppercase text-neutral-500">List Items (Current Chunk)</label>
                  <button onClick={() => addArrayItem('items')} className="text-[9px] bg-[#222] px-2 py-1 rounded text-white hover:bg-amber-500 uppercase">+ Add Item to Base</button>
                </div>
                {activeData.items.map((item, idx) => (
                  <div key={idx} className="mb-3 pl-3 border-l-2 border-[#333] space-y-2">
                    <input value={item.title} onChange={(e) => updateArrayItem('items', item._absoluteIndex, 'title', e.target.value)} className="w-full bg-black border border-[#222] rounded px-2 py-1.5 text-xs text-white" />
                    <textarea value={item.desc} onChange={(e) => updateArrayItem('items', item._absoluteIndex, 'desc', e.target.value)} rows={2} className="w-full bg-black border border-[#222] rounded px-2 py-1 text-xs text-white" />
                  </div>
                ))}
              </div>
            )}

            {activeData.quote !== undefined && (
              <div className="mt-4 pt-4 border-t border-[#333]">
                <div>
                  <label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Quote</label>
                  <textarea value={activeData.quote} onChange={(e) => updateSlideField('quote', e.target.value)} rows={4} className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div>
                    <label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Author</label>
                    <input value={activeData.author} onChange={(e) => updateSlideField('author', e.target.value)} className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Role / Title</label>
                    <input value={activeData.role} onChange={(e) => updateSlideField('role', e.target.value)} className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none" />
                  </div>
                </div>
              </div>
            )}

            {activeData.type === 'table' && (
              <div className="mt-4 pt-4 border-t border-[#333]">
                <label className="block text-[9px] font-mono uppercase text-neutral-500 mb-2">Table Engine</label>
                <div className="text-[10px] text-neutral-500 italic bg-black p-3 border border-[#222] rounded leading-relaxed">
                  Data tables are natively structured via the API payload matrix. Direct cell editing is locked in the basic UI to preserve data schema integrity.
                </div>
              </div>
            )}

            {activeData.events !== undefined && (
              <div className="mt-4 pt-4 border-t border-[#333]">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-[9px] font-mono uppercase text-neutral-500">Timeline Events (Chunk)</label>
                  <button onClick={() => addArrayItem('events')} className="text-[9px] bg-[#222] px-2 py-1 rounded text-white hover:bg-amber-500 uppercase">+ Add Event</button>
                </div>
                {activeData.events.map((event, idx) => (
                  <div key={idx} className="mb-3 pl-3 border-l-2 border-[#333] space-y-2">
                    <div className="grid grid-cols-3 gap-2">
                      <input value={event.date} onChange={(e) => updateArrayItem('events', event._absoluteIndex, 'date', e.target.value)} className="w-full col-span-1 bg-black border border-[#222] rounded px-2 py-1.5 text-xs text-white" placeholder="Date/Phase" />
                      <input value={event.title} onChange={(e) => updateArrayItem('events', event._absoluteIndex, 'title', e.target.value)} className="w-full col-span-2 bg-black border border-[#222] rounded px-2 py-1.5 text-xs text-white" placeholder="Title" />
                    </div>
                    <textarea value={event.desc} onChange={(e) => updateArrayItem('events', event._absoluteIndex, 'desc', e.target.value)} rows={2} className="w-full bg-black border border-[#222] rounded px-2 py-1 text-xs text-white" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT PANEL - PREVIEW SCALER */}
      <div className="flex-1 flex items-center justify-center p-8 bg-[#050505] overflow-auto relative design-grid-background">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

        {/* Scaler Wrapper */}
        <div 
          className="relative transition-all duration-300 flex-shrink-0"
          style={exportMode ? { width: '1080px', height: '1350px' } : { width: '1080px', height: '1350px', transform: 'scale(0.55)', transformOrigin: 'center center', margin: '-300px 0' }}
        >
          {/* THE ACTUAL DOM NODE FOR PLAYWRIGHT */}
          <SlideRenderer
            slide={activeData as any}
            scheme={currentScheme}
            templateId={activeSchemeId.replace(/_/g, '-')}
            brandKit={activeSchemeId === 'custom_brand' ? brandKit : undefined}
          />
        </div>
      </div>
    </div>
  );
}
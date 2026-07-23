import React, { useState, useEffect, useMemo } from 'react';
import { SCHEMES, injectFonts, chunkArray } from './engine-utils.js';
import { SlideRenderer } from './SlideRenderer.js';
import { PLATFORMS, type PlatformId } from './platforms.js';
import { TEMPLATE_MAP, PAPER_OF_RECORD_SLIDES } from './sample-slides.js';
import { EditorHeader } from './editor/components/EditorHeader.js';
import { SlideThumbnails } from './editor/components/SlideThumbnails.js';

export default function App() {
  const [activeTemplate, setActiveTemplate] = useState('paper-of-record');
  const [baseSlides, setBaseSlides] = useState(PAPER_OF_RECORD_SLIDES);
  const [activePaginatedIndex, setActivePaginatedIndex] = useState(0);
  const [activeSchemeId, setActiveSchemeId] = useState('archive_paper');
  const [activePlatformId, setActivePlatformId] = useState<PlatformId>('instagram-feed' as PlatformId);
  const [exportMode, setExportMode] = useState(false);

  const [brandKit, setBrandKit] = useState({
    bg: '#0F172A', text: '#F8FAFC', accent: '#38BDF8',
    fontSerif: 'Playfair Display', fontSans: 'Inter',
    logoUrl: ''
  });

  const switchTemplate = (templateId: string) => {
    setActiveTemplate(templateId);
    setBaseSlides(TEMPLATE_MAP[templateId].slides);
    setActiveSchemeId(TEMPLATE_MAP[templateId].schemeId);
    setActivePaginatedIndex(0);
  };

  const paginatedSlides = useMemo(() => {
    let virtualSlides = [];
    baseSlides.forEach((slide, originalIndex) => {
      if (slide.type === 'sequence' && slide.items && slide.items.length > 4) {
        const taggedItems = slide.items.map((item, idx) => ({ ...item, _absoluteIndex: idx }));
        const chunks = chunkArray(taggedItems, 4);
        chunks.forEach((chunk, chunkIdx) => {
          virtualSlides.push({ ...slide, _virtualId: `${slide.id}-part-${chunkIdx + 1}`, _originalIndex: originalIndex, items: chunk, tag: `${slide.tag} [${chunkIdx + 1}/${chunks.length}]`, footerRight: `${slide.footerRight} (${chunkIdx + 1}/${chunks.length})` });
        });
      } else if (slide.type === 'telemetry' && slide.stats && slide.stats.length > 4) {
        const taggedStats = slide.stats.map((stat, idx) => ({ ...stat, _absoluteIndex: idx }));
        const chunks = chunkArray(taggedStats, 4);
        chunks.forEach((chunk, chunkIdx) => {
          virtualSlides.push({ ...slide, _virtualId: `${slide.id}-part-${chunkIdx + 1}`, _originalIndex: originalIndex, stats: chunk, tag: `${slide.tag} [${chunkIdx + 1}/${chunks.length}]` });
        });
      } else if (slide.type === 'table' && slide.rows && slide.rows.length > 5) {
        const taggedRows = slide.rows.map((row, idx) => ({ data: row, _absoluteIndex: idx }));
        const chunks = chunkArray(taggedRows, 5);
        chunks.forEach((chunk, chunkIdx) => {
          virtualSlides.push({ ...slide, _virtualId: `${slide.id}-part-${chunkIdx + 1}`, _originalIndex: originalIndex, rows: chunk.map(c => c.data), tag: `${slide.tag} [${chunkIdx + 1}/${chunks.length}]` });
        });
      } else if (slide.type === 'timeline' && slide.events && slide.events.length > 4) {
        const taggedEvents = slide.events.map((event, idx) => ({ ...event, _absoluteIndex: idx }));
        const chunks = chunkArray(taggedEvents, 4);
        chunks.forEach((chunk, chunkIdx) => {
          virtualSlides.push({ ...slide, _virtualId: `${slide.id}-part-${chunkIdx + 1}`, _originalIndex: originalIndex, events: chunk, tag: `${slide.tag} [${chunkIdx + 1}/${chunks.length}]` });
        });
      } else {
        let processedSlide = { ...slide, _virtualId: slide.id, _originalIndex: originalIndex };
        if (processedSlide.items) processedSlide.items = processedSlide.items.map((item, idx) => ({ ...item, _absoluteIndex: idx }));
        virtualSlides.push(processedSlide);
      }
    });
    return virtualSlides;
  }, [baseSlides]);

  useEffect(() => {
    if (activePaginatedIndex >= paginatedSlides.length) setActivePaginatedIndex(Math.max(0, paginatedSlides.length - 1));
  }, [paginatedSlides.length, activePaginatedIndex]);

  const activeData = paginatedSlides[activePaginatedIndex] || {};

  const currentScheme = useMemo(() => {
    if (activeSchemeId === 'custom_brand') {
      return { ...SCHEMES.custom_brand, bg: brandKit.bg, text: brandKit.text, accent: brandKit.accent, fontSerif: brandKit.fontSerif, fontSans: brandKit.fontSans, border: `${brandKit.text}33`, gridBorder: `${brandKit.text}1A` };
    }
    return SCHEMES[activeSchemeId];
  }, [activeSchemeId, brandKit]);

  useEffect(() => {
    if (activeSchemeId === 'custom_brand') injectFonts([brandKit.fontSerif, brandKit.fontSans]);
    else injectFonts();
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
    if (arrayName === 'items') updated[originalIndex][arrayName].push({ num: "XX", title: "New Item", desc: "Description here." });
    else if (arrayName === 'stats') updated[originalIndex][arrayName].push({ value: "0", unit: "", label: "NEW METRIC" });
    else if (arrayName === 'events') updated[originalIndex][arrayName].push({ date: "NEW PHASE", title: "Milestone", desc: "Detailed description." });
    setBaseSlides(updated);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E5E5E5] font-sans flex flex-col overflow-x-hidden">
      <EditorHeader
        activeTemplate={activeTemplate}
        onSwitchTemplate={switchTemplate}
        activePlatformId={activePlatformId}
        onSelectPlatform={setActivePlatformId}
        exportMode={exportMode}
        onToggleExportMode={setExportMode}
      />
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <SlideThumbnails
          slides={paginatedSlides}
          activeIndex={activePaginatedIndex}
          onSelectSlide={setActivePaginatedIndex}
        />
        <div className="w-full lg:w-[420px] shrink-0 border-r border-[#222] bg-[#121212] p-6 overflow-y-auto flex flex-col justify-between max-h-screen shadow-2xl z-20 relative">
          <div>
            <div className="mb-6 border-b border-[#222] pb-6">
              <div className="flex items-center justify-between mb-2">
                <h1 className="font-mono text-xs tracking-[0.2em] text-[#E63946] uppercase font-bold">AGENCY_ENGINE // V3</h1>
                <span className="bg-[#222] text-[10px] text-green-400 px-2 py-0.5 rounded font-mono border border-green-900">AUTO-PAGINATION ACTIVE</span>
              </div>
            </div>

            <div className="space-y-6 mb-8 border-b border-[#222] pb-6">
            {/* Template Selector */}
            <div>
              <label className="block text-[10px] font-mono tracking-widest uppercase text-neutral-500 mb-2">Template</label>
              <div className="grid grid-cols-3 gap-2">
                {Object.keys(TEMPLATE_MAP).map(tid => (
                  <button key={tid} onClick={() => switchTemplate(tid)}
                    className={`py-2 px-1 border text-[10px] font-mono uppercase transition-all ${activeTemplate === tid ? 'border-blue-500 bg-blue-500/10 text-blue-400 font-bold' : 'border-[#333] text-neutral-500 hover:border-[#555]'}`}>
                    {tid === 'paper-of-record' ? 'Paper of Record' : tid === 'the-globalist' ? 'The Globalist' : tid === 'the-terminal' ? 'The Terminal' : tid === 'the-curator' ? 'The Curator' : 'The Academic'}
                  </button>
                ))}
              </div>
            </div>

            {/* Scheme Selector */}
            <div>
              <label className="block text-[10px] font-mono tracking-widest uppercase text-neutral-500 mb-2">Color Scheme</label>
              <div className="grid grid-cols-3 gap-2">
                {Object.values(SCHEMES).map(scheme => (
                  <button key={scheme.id} onClick={() => setActiveSchemeId(scheme.id)}
                    className={`py-2 px-1 border text-[10px] font-mono uppercase transition-all ${activeSchemeId === scheme.id ? 'border-[#E63946] bg-[#E63946]/10 text-[#E63946] font-bold' : 'border-[#333] text-neutral-500 hover:border-[#555]'}`}>
                    {scheme.name}
                  </button>
                ))}
              </div>
            </div>

            {activeSchemeId === 'custom_brand' && (
              <div className="bg-[#1A1A1A] p-4 rounded border border-[#333] space-y-4">
                <h4 className="font-mono text-[10px] text-amber-500 uppercase tracking-widest">Brand Kit Injection</h4>
                <div className="grid grid-cols-3 gap-3">
                  <div><label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Background</label><input type="color" value={brandKit.bg} onChange={(e) => setBrandKit({...brandKit, bg: e.target.value})} className="w-full h-8 bg-transparent border border-[#333] cursor-pointer" /></div>
                  <div><label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Text Fill</label><input type="color" value={brandKit.text} onChange={(e) => setBrandKit({...brandKit, text: e.target.value})} className="w-full h-8 bg-transparent border border-[#333] cursor-pointer" /></div>
                  <div><label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Accent</label><input type="color" value={brandKit.accent} onChange={(e) => setBrandKit({...brandKit, accent: e.target.value})} className="w-full h-8 bg-transparent border border-[#333] cursor-pointer" /></div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Serif Font</label><input value={brandKit.fontSerif} onChange={(e) => setBrandKit({...brandKit, fontSerif: e.target.value})} className="w-full bg-black border border-[#333] rounded px-2 py-1.5 text-xs text-white focus:border-amber-500 font-mono" /></div>
                  <div><label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Sans Font</label><input value={brandKit.fontSans} onChange={(e) => setBrandKit({...brandKit, fontSans: e.target.value})} className="w-full bg-black border border-[#333] rounded px-2 py-1.5 text-xs text-white focus:border-amber-500 font-mono" /></div>
                </div>
                <div><label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Logo URL</label><input placeholder="https://..." value={brandKit.logoUrl} onChange={(e) => setBrandKit({...brandKit, logoUrl: e.target.value})} className="w-full bg-black border border-[#333] rounded px-2 py-1.5 text-xs text-white focus:border-amber-500 font-mono" /></div>
              </div>
            )}

            <div>
              <label className="block text-[10px] font-mono tracking-widest uppercase text-neutral-500 mb-2">Platform</label>
              <div className="grid grid-cols-3 gap-1.5">
                {Object.values(PLATFORMS).map(p => (
                  <button key={p.id} onClick={() => setActivePlatformId(p.id)}
                    className={`py-1.5 px-1 border text-[9px] font-mono transition-all ${activePlatformId === p.id ? 'border-white bg-white text-black font-bold' : 'border-[#333] text-neutral-500 hover:border-[#555]'}`}>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono tracking-widest uppercase text-neutral-500 mb-2">Viewport Mode</label>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => setExportMode(false)} className={`py-2 px-3 border text-xs font-mono uppercase transition-all ${!exportMode ? 'border-white bg-white text-black font-bold' : 'border-[#333] text-neutral-500'}`}>Fitted Preview</button>
                <button onClick={() => setExportMode(true)} className={`py-2 px-3 border text-xs font-mono uppercase transition-all ${exportMode ? 'border-white bg-white text-black font-bold' : 'border-[#333] text-neutral-500'}`}>Raw</button>
              </div>
            </div>
          </div>

          <div className="mb-6 border-b border-[#222] pb-6">
            <label className="block text-[10px] font-mono tracking-widest uppercase text-neutral-500 mb-2 flex justify-between">
              <span>Virtual Buffer</span><span className="text-amber-500">{paginatedSlides.length} Frames</span>
            </label>
            <div className="grid grid-cols-5 gap-1.5">
              {paginatedSlides.map((slide, idx) => (
                <button key={slide._virtualId} onClick={() => setActivePaginatedIndex(idx)}
                  className={`py-1.5 text-xs font-mono transition-all border ${activePaginatedIndex === idx ? 'bg-amber-500 text-[#000] border-amber-500 font-bold' : 'border-[#2D2D2D] text-neutral-500 hover:bg-[#1A1A1A]'}`} title={slide.tag}>
                  {String(idx + 1).padStart(2, '0')}
                </button>
              ))}
            </div>
          </div>

          {/* Content Forms */}
          <div className="space-y-4">
            <h3 className="font-mono text-[11px] tracking-widest text-amber-500 uppercase font-bold flex justify-between">
              <span>{activeData.type?.toUpperCase()} // DATA</span>
              <span className="text-neutral-600">IDX: {activeData._originalIndex}</span>
            </h3>

            <div><label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Tag</label>
              <input value={baseSlides[activeData._originalIndex]?.tag || ''} onChange={(e) => updateSlideField('tag', e.target.value)} className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none font-mono" /></div>

            {activeData.imageUrl !== undefined && <div><label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Image URL</label><input value={activeData.imageUrl} onChange={(e) => updateSlideField('imageUrl', e.target.value)} className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3 py-2 text-xs text-white font-mono" placeholder="https://..." /></div>}

            {activeData.headline !== undefined && <div><label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Headline ({activeData.headline?.length || 0})</label><textarea value={activeData.headline} onChange={(e) => updateSlideField('headline', e.target.value)} rows={3} className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none" /></div>}

            {activeData.subheadline !== undefined && <div><label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Subheadline</label><textarea value={activeData.subheadline} onChange={(e) => updateSlideField('subheadline', e.target.value)} rows={3} className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3 py-2 text-xs text-white" /></div>}

            {activeData.bodyText !== undefined && <div><label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Body Text</label><textarea value={activeData.bodyText} onChange={(e) => updateSlideField('bodyText', e.target.value)} rows={4} className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3 py-2 text-xs text-white" /></div>}

            {activeData.subtext !== undefined && <div><label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Subtext</label><textarea value={activeData.subtext} onChange={(e) => updateSlideField('subtext', e.target.value)} rows={2} className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3 py-2 text-xs text-white" /></div>}

            {activeData.term !== undefined && <div className="mt-4 pt-4 border-t border-[#333] space-y-3">
              <div className="grid grid-cols-2 gap-3"><div><label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Term</label><input value={activeData.term} onChange={(e) => updateSlideField('term', e.target.value)} className="w-full bg-black border border-[#222] rounded px-2 py-1.5 text-xs text-white" /></div><div><label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Phonetic</label><input value={activeData.phonetic} onChange={(e) => updateSlideField('phonetic', e.target.value)} className="w-full bg-black border border-[#222] rounded px-2 py-1.5 text-xs text-white" /></div></div>
              <div><label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Definition</label><textarea value={activeData.definition} onChange={(e) => updateSlideField('definition', e.target.value)} rows={3} className="w-full bg-black border border-[#222] rounded px-2 py-1.5 text-xs text-white" /></div>
              <div><label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Example</label><input value={activeData.example} onChange={(e) => updateSlideField('example', e.target.value)} className="w-full bg-black border border-[#222] rounded px-2 py-1.5 text-xs text-white" /></div>
            </div>}

            {activeData.left !== undefined && activeData.right !== undefined && <div className="mt-4 pt-4 border-t border-[#333] space-y-4">
              <div className="p-3 border border-[#333] bg-[#151515] rounded"><label className="block text-[9px] font-mono uppercase text-neutral-500 mb-2">Left Side</label><input value={activeData.left.title} onChange={(e) => updateNestedField('left', 'title', e.target.value)} className="w-full bg-black border border-[#222] rounded px-2 py-1.5 text-xs text-white mb-2" /><textarea value={activeData.left.desc} onChange={(e) => updateNestedField('left', 'desc', e.target.value)} rows={2} className="w-full bg-black border border-[#222] rounded px-2 py-1.5 text-xs text-white" /></div>
              <div className="p-3 border border-amber-900/30 bg-[#151515] rounded"><label className="block text-[9px] font-mono uppercase text-amber-500 mb-2">Right Side</label><input value={activeData.right.title} onChange={(e) => updateNestedField('right', 'title', e.target.value)} className="w-full bg-black border border-[#222] rounded px-2 py-1.5 text-xs text-white mb-2" /><textarea value={activeData.right.desc} onChange={(e) => updateNestedField('right', 'desc', e.target.value)} rows={2} className="w-full bg-black border border-[#222] rounded px-2 py-1.5 text-xs text-white" /></div>
            </div>}

            {activeData.items !== undefined && <div className="mt-4 pt-4 border-t border-[#333]">
              <div className="flex justify-between items-center mb-2"><label className="block text-[9px] font-mono uppercase text-neutral-500">Items</label><button onClick={() => addArrayItem('items')} className="text-[9px] bg-[#222] px-2 py-1 rounded text-white hover:bg-amber-500 uppercase">+ Add</button></div>
              {activeData.items.map((item, idx) => <div key={idx} className="mb-3 pl-3 border-l-2 border-[#333] space-y-2"><input value={item.title} onChange={(e) => updateArrayItem('items', item._absoluteIndex, 'title', e.target.value)} className="w-full bg-black border border-[#222] rounded px-2 py-1.5 text-xs text-white" /><textarea value={item.desc} onChange={(e) => updateArrayItem('items', item._absoluteIndex, 'desc', e.target.value)} rows={2} className="w-full bg-black border border-[#222] rounded px-2 py-1 text-xs text-white" /></div>)}
            </div>}

            {activeData.quote !== undefined && <div className="mt-4 pt-4 border-t border-[#333]">
              <div><label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Quote</label><textarea value={activeData.quote} onChange={(e) => updateSlideField('quote', e.target.value)} rows={4} className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3 py-2 text-xs text-white" /></div>
              <div className="grid grid-cols-2 gap-3 mt-3"><div><label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Author</label><input value={activeData.author} onChange={(e) => updateSlideField('author', e.target.value)} className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3 py-2 text-xs text-white" /></div><div><label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Role</label><input value={activeData.role} onChange={(e) => updateSlideField('role', e.target.value)} className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3 py-2 text-xs text-white" /></div></div>
            </div>}

            {activeData.question !== undefined && <div className="mt-4 pt-4 border-t border-[#333] space-y-3">
              <div><label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Question</label><textarea value={activeData.question} onChange={(e) => updateSlideField('question', e.target.value)} rows={3} className="w-full bg-black border border-[#222] rounded px-2 py-1.5 text-xs text-white" /></div>
              <div><label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Answer</label><textarea value={activeData.answer} onChange={(e) => updateSlideField('answer', e.target.value)} rows={4} className="w-full bg-black border border-[#222] rounded px-2 py-1.5 text-xs text-white" /></div>
              <div className="grid grid-cols-2 gap-3"><div><label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Respondent</label><input value={activeData.respondentName} onChange={(e) => updateSlideField('respondentName', e.target.value)} className="w-full bg-black border border-[#222] rounded px-2 py-1.5 text-xs text-white" /></div><div><label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Role</label><input value={activeData.respondentRole} onChange={(e) => updateSlideField('respondentRole', e.target.value)} className="w-full bg-black border border-[#222] rounded px-2 py-1.5 text-xs text-white" /></div></div>
            </div>}

            {activeData.myth !== undefined && <div className="mt-4 pt-4 border-t border-[#333] space-y-3">
              <div><label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Myth</label><textarea value={activeData.myth} onChange={(e) => updateSlideField('myth', e.target.value)} rows={3} className="w-full bg-black border border-[#222] rounded px-2 py-1.5 text-xs text-white" /></div>
              <div><label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Fact</label><textarea value={activeData.fact} onChange={(e) => updateSlideField('fact', e.target.value)} rows={3} className="w-full bg-black border border-[#222] rounded px-2 py-1.5 text-xs text-white" /></div>
            </div>}

            {activeData.events !== undefined && <div className="mt-4 pt-4 border-t border-[#333]">
              <div className="flex justify-between items-center mb-2"><label className="block text-[9px] font-mono uppercase text-neutral-500">Events</label><button onClick={() => addArrayItem('events')} className="text-[9px] bg-[#222] px-2 py-1 rounded text-white hover:bg-amber-500 uppercase">+ Add</button></div>
              {activeData.events.map((event, idx) => <div key={idx} className="mb-3 pl-3 border-l-2 border-[#333] space-y-2"><div className="grid grid-cols-3 gap-2"><input value={event.date} onChange={(e) => updateArrayItem('events', event._absoluteIndex, 'date', e.target.value)} className="w-full col-span-1 bg-black border border-[#222] rounded px-2 py-1.5 text-xs text-white" placeholder="Date" /><input value={event.title} onChange={(e) => updateArrayItem('events', event._absoluteIndex, 'title', e.target.value)} className="w-full col-span-2 bg-black border border-[#222] rounded px-2 py-1.5 text-xs text-white" placeholder="Title" /></div><textarea value={event.desc} onChange={(e) => updateArrayItem('events', event._absoluteIndex, 'desc', e.target.value)} rows={2} className="w-full bg-black border border-[#222] rounded px-2 py-1 text-xs text-white" /></div>)}
            </div>}

            {activeData.actionLabel !== undefined && <div className="mt-4 pt-4 border-t border-[#333] space-y-3">
              <div><label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Action Label</label><input value={activeData.actionLabel} onChange={(e) => updateSlideField('actionLabel', e.target.value)} className="w-full bg-black border border-[#222] rounded px-2 py-1.5 text-xs text-white" /></div>
              <div><label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Social Handle</label><input value={activeData.socialHandle} onChange={(e) => updateSlideField('socialHandle', e.target.value)} className="w-full bg-black border border-[#222] rounded px-2 py-1.5 text-xs text-white" /></div>
            </div>}

            {activeData.personName !== undefined && <div className="mt-4 pt-4 border-t border-[#333] space-y-3">
              <div><label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Person Name</label><input value={activeData.personName} onChange={(e) => updateSlideField('personName', e.target.value)} className="w-full bg-black border border-[#222] rounded px-2 py-1.5 text-xs text-white" /></div>
              <div><label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Person Role</label><input value={activeData.personRole} onChange={(e) => updateSlideField('personRole', e.target.value)} className="w-full bg-black border border-[#222] rounded px-2 py-1.5 text-xs text-white" /></div>
            </div>}
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-[#050505] overflow-auto relative design-grid-background">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="relative transition-all duration-300 flex-shrink-0"
          style={exportMode ? { width: PLATFORMS[activePlatformId].width, height: PLATFORMS[activePlatformId].height } : { width: PLATFORMS[activePlatformId].width, height: PLATFORMS[activePlatformId].height, transform: `scale(${Math.min(0.55, 600 / Math.max(PLATFORMS[activePlatformId].width, PLATFORMS[activePlatformId].height))})`, transformOrigin: 'center center', margin: '-300px 0' }}>
          <SlideRenderer slide={activeData as any} scheme={currentScheme} templateId={activeTemplate} brandKit={activeSchemeId === 'custom_brand' ? brandKit : undefined} size={{ width: PLATFORMS[activePlatformId].width, height: PLATFORMS[activePlatformId].height }} />
        </div>
      </div>
    </div>
  </div>
);
}

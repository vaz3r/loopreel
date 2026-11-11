import React, { useState, useEffect, useMemo, Component, type ReactNode } from 'react';
import { SlideFrame } from '../skeleton/SlideFrame';
import type { TemplatePackage, SlideComponent } from '../skeleton/types';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class SlideErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Slide render error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex h-full w-full flex-col items-center justify-center p-8 text-rose-400 bg-zinc-950 font-mono text-sm border border-rose-800 rounded">
            <p className="font-semibold text-base mb-2">Slide Rendering Error</p>
            <p className="text-xs text-zinc-400 max-w-md text-center">{this.state.error?.message}</p>
          </div>
        )
      );
    }
    return this.props.children;
  }
}

// Auto-discover all generated templates in /templates/
const templateModules = import.meta.glob('/templates/**/index.ts', { eager: true });

interface DiscoveredTemplate {
  slug: string;
  name: string;
  pkg: TemplatePackage;
}

export function TemplateStudio() {
  // Parse URL parameters
  const searchParams = new URLSearchParams(window.location.search);
  const initialTemplateParam = searchParams.get('template');
  const initialSlideParam = parseInt(searchParams.get('slide') || '0', 10);
  const initialModeParam = (searchParams.get('mode') as 'fit' | '1:1' | 'grid') || 'fit';

  // Discover templates
  const templates: DiscoveredTemplate[] = useMemo(() => {
    const list: DiscoveredTemplate[] = [];
    for (const path in templateModules) {
      const mod = templateModules[path] as { default: TemplatePackage };
      if (mod?.default?.brand && mod?.default?.deck) {
        list.push({
          slug: mod.default.brand.slug,
          name: mod.default.brand.name,
          pkg: mod.default,
        });
      }
    }
    return list;
  }, []);

  const [activeSlug, setActiveSlug] = useState<string>(() => {
    if (initialTemplateParam && templates.some((t) => t.slug === initialTemplateParam)) {
      return initialTemplateParam;
    }
    return templates[0]?.slug || '';
  });

  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(
    isNaN(initialSlideParam) ? 0 : initialSlideParam
  );
  const [viewMode, setViewMode] = useState<'fit' | '1:1' | 'grid'>(initialModeParam);
  const [metrics, setMetrics] = useState<{ fill: number; scale: string }>({ fill: 80, scale: '1.000' });

  const activeTemplate = useMemo(() => {
    return templates.find((t) => t.slug === activeSlug) || templates[0];
  }, [templates, activeSlug]);

  const totalSlides = activeTemplate?.pkg.deck.slides.length || 0;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setActiveSlideIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'ArrowRight') {
        setActiveSlideIndex((prev) => Math.min(totalSlides - 1, prev + 1));
      } else if (e.key.toLowerCase() === 'g') {
        setViewMode((prev) => (prev === 'grid' ? 'fit' : 'grid'));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalSlides]);

  // Synchronize URL
  useEffect(() => {
    if (activeTemplate) {
      const url = new URL(window.location.href);
      url.searchParams.set('template', activeTemplate.slug);
      url.searchParams.set('slide', String(activeSlideIndex));
      url.searchParams.set('mode', viewMode);
      window.history.replaceState({}, '', url.toString());
    }
  }, [activeTemplate, activeSlideIndex, viewMode]);

  // Measure live metrics
  useEffect(() => {
    const timer = setTimeout(() => {
      const container = document.querySelector('.loop-autofit-container');
      const content = document.querySelector('.loop-autofit-content');
      if (container && content) {
        const cH = container.clientHeight || 1;
        const sH = content.scrollHeight || 0;
        const fill = Math.min(100, Math.round((sH / cH) * 100));
        const scale = container.getAttribute('data-autofit-scaled') || '1.000';
        setMetrics({ fill, scale });
      }
    }, 150);
    return () => clearTimeout(timer);
  }, [activeSlideIndex, activeSlug, viewMode]);

  if (!activeTemplate) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
        <h1 className="text-2xl font-bold tracking-tight mb-2">Loopreel Template Studio</h1>
        <p className="text-zinc-400 max-w-md mb-6">
          No templates found in <code className="text-zinc-200">apps/generator/templates/</code> yet.
        </p>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 text-left font-mono text-sm">
          <p className="text-zinc-500 mb-2">// Generate your first template:</p>
          <p className="text-emerald-400">
            pnpm --filter @loopreel/generator generate --name &quot;The Tokyo Review&quot;
          </p>
        </div>
      </div>
    );
  }

  const { brand, deck, slides } = activeTemplate.pkg;
  const currentSlideData = deck.slides[activeSlideIndex] || deck.slides[0]!;
  const CurrentSlideComponent = (slides[activeSlideIndex] || slides[0]) as SlideComponent;

  // Export mode for Playwright automated visual audits
  if (initialModeParam === '1:1' && searchParams.get('export') === 'true') {
    return (
      <div className="inline-block" style={{ width: 1080, height: 1350 }}>
        <SlideFrame
          brand={brand}
          slide={currentSlideData}
          slideIndex={activeSlideIndex}
          totalSlides={totalSlides}
        >
          <CurrentSlideComponent
            slide={currentSlideData}
            brand={brand}
            totalSlides={totalSlides}
          />
        </SlideFrame>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100">
      {/* FIXED TOP CONTROL BAR */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 bg-zinc-900/90 backdrop-blur-md border-b border-zinc-800">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold tracking-wider text-xs uppercase text-zinc-300">
              Template Studio
            </span>
          </div>

          {/* Template Selector */}
          <select
            value={activeSlug}
            onChange={(e) => {
              setActiveSlug(e.target.value);
              setActiveSlideIndex(0);
            }}
            className="bg-zinc-800 text-zinc-100 text-xs font-semibold px-3 py-1.5 rounded border border-zinc-700 hover:border-zinc-500 cursor-pointer focus:outline-none"
          >
            {templates.map((t) => (
              <option key={t.slug} value={t.slug}>
                {t.name} ({t.slug})
              </option>
            ))}
          </select>

          {/* Slide Selector & Pagination */}
          {viewMode !== 'grid' && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveSlideIndex((prev) => Math.max(0, prev - 1))}
                disabled={activeSlideIndex === 0}
                className="px-2.5 py-1 text-xs rounded border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed"
                title="Previous slide (Left Arrow)"
              >
                ◀
              </button>

              <select
                value={activeSlideIndex}
                onChange={(e) => setActiveSlideIndex(parseInt(e.target.value, 10))}
                className="bg-zinc-800 text-zinc-100 text-xs px-2.5 py-1.5 rounded border border-zinc-700 focus:outline-none cursor-pointer"
              >
                {deck.slides.map((s, idx) => (
                  <option key={idx} value={idx}>
                    Slide {idx + 1}: {(s.type || (s as any).archetype || 'editorial').toUpperCase()} — {s.title || s.headline || 'Untitled'}
                  </option>
                ))}
              </select>

              <button
                onClick={() => setActiveSlideIndex((prev) => Math.min(totalSlides - 1, prev + 1))}
                disabled={activeSlideIndex === totalSlides - 1}
                className="px-2.5 py-1 text-xs rounded border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed"
                title="Next slide (Right Arrow)"
              >
                ▶
              </button>

              <span className="text-xs font-mono text-zinc-400 ml-1">
                {activeSlideIndex + 1} / {totalSlides}
              </span>
            </div>
          )}
        </div>

        {/* View Mode & Metrics */}
        <div className="flex items-center gap-4">
          {/* Live DOM Metrics HUD */}
          {viewMode !== 'grid' && (
            <div className="flex items-center gap-3 text-[11px] font-mono bg-zinc-950 px-3 py-1 rounded border border-zinc-800 text-zinc-400">
              <span>
                FILL: <strong className="text-zinc-200">{metrics.fill}%</strong>
              </span>
              <span>•</span>
              <span>
                SCALE: <strong className="text-zinc-200">{metrics.scale}</strong>
              </span>
            </div>
          )}

          {/* View Mode Buttons */}
          <div className="flex items-center rounded border border-zinc-700 bg-zinc-800 p-0.5 text-xs">
            <button
              onClick={() => setViewMode('fit')}
              className={`px-3 py-1 rounded transition-colors ${
                viewMode === 'fit' ? 'bg-zinc-700 font-bold text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Fit Preview
            </button>
            <button
              onClick={() => setViewMode('1:1')}
              className={`px-3 py-1 rounded transition-colors ${
                viewMode === '1:1' ? 'bg-zinc-700 font-bold text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              1:1 Native
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1 rounded transition-colors ${
                viewMode === 'grid' ? 'bg-zinc-700 font-bold text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Grid View (G)
            </button>
          </div>
        </div>
      </header>

      {/* STAGE CANVAS */}
      <main className="flex-1 flex items-center justify-center p-8 overflow-auto">
        {viewMode === 'fit' && (
          <div
            className="transition-transform duration-200 ease-out origin-center shadow-2xl rounded-sm"
            style={{
              transform: 'scale(0.48)',
              width: 1080,
              height: 1350,
              marginBottom: -420,
              marginTop: -280,
            }}
          >
            <SlideFrame
              brand={brand}
              slide={currentSlideData}
              slideIndex={activeSlideIndex}
              totalSlides={totalSlides}
            >
              <CurrentSlideComponent
                slide={currentSlideData}
                brand={brand}
                totalSlides={totalSlides}
              />
            </SlideFrame>
          </div>
        )}

        {viewMode === '1:1' && (
          <div className="shadow-2xl rounded-sm my-8">
            <SlideFrame
              brand={brand}
              slide={currentSlideData}
              slideIndex={activeSlideIndex}
              totalSlides={totalSlides}
            >
              <SlideErrorBoundary>
                <CurrentSlideComponent
                  slide={currentSlideData}
                  brand={brand}
                  totalSlides={totalSlides}
                />
              </SlideErrorBoundary>
            </SlideFrame>
          </div>
        )}

        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl w-full py-8">
            {deck.slides.map((s, idx) => {
              const SlideComp = (slides[idx] || slides[0]) as SlideComponent;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    setActiveSlideIndex(idx);
                    setViewMode('fit');
                  }}
                  className="flex flex-col items-center group cursor-pointer"
                >
                  <div className="text-xs font-mono text-zinc-400 mb-2 group-hover:text-emerald-400">
                    Slide {idx + 1}: {(s.type || (s as any).archetype || 'editorial').toUpperCase()}
                  </div>
                  <div
                    className="overflow-hidden shadow-lg border border-zinc-800 group-hover:border-emerald-500/50 rounded-sm transition-all"
                    style={{ width: 270, height: 337.5 }}
                  >
                    <div style={{ transform: 'scale(0.25)', transformOrigin: 'top left', width: 1080, height: 1350 }}>
                      <SlideFrame brand={brand} slide={s} slideIndex={idx} totalSlides={totalSlides}>
                        <SlideErrorBoundary>
                          <SlideComp slide={s} brand={brand} totalSlides={totalSlides} />
                        </SlideErrorBoundary>
                      </SlideFrame>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

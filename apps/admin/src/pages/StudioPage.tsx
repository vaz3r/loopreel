import React, { useState, useEffect, useMemo, Component, type ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlideFrame } from '@generator/skeleton/SlideFrame';
import type { TemplatePackage, SlideComponent } from '@generator/skeleton/types';
import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Maximize2,
  Minimize2,
  RefreshCw,
  Layers,
  Smartphone,
  Square,
  AlertCircle,
  Eye,
} from 'lucide-react';

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

// Dynamic Template Discovery using Vite globbing
const brandFiles = import.meta.glob('../../../../packages/generator/templates/**/brand.json', { eager: true });
const templateLoaders = import.meta.glob('../../../../packages/generator/templates/**/index.ts');

interface TemplateManifest {
  slug: string;
  name: string;
  indexPath: string;
}

export function StudioPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTemplateParam = searchParams.get('template');
  const initialSlideParam = parseInt(searchParams.get('slide') || '0', 10);
  const initialModeParam = (searchParams.get('mode') as 'fit' | '1:1' | 'grid') || 'fit';
  const platformParam = searchParams.get('platform');
  const isExportMode = searchParams.get('export') === 'true';

  // Discover template manifests from brand.json
  const templates: TemplateManifest[] = useMemo(() => {
    const list: TemplateManifest[] = [];
    for (const brandPath in brandFiles) {
      const brand = ((brandFiles[brandPath] as any)?.default || brandFiles[brandPath]) as { slug: string; name: string };
      const indexPath = brandPath.replace(/brand\.json$/, 'index.ts');
      if (brand?.slug && brand?.name && templateLoaders[indexPath]) {
        list.push({
          slug: brand.slug,
          name: brand.name,
          indexPath,
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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [metrics, setMetrics] = useState<{ fill: number; scale: string }>({ fill: 80, scale: '1.000' });

  const [activePkg, setActivePkg] = useState<TemplatePackage | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Sync selected template from URL if it changes externally
  useEffect(() => {
    if (initialTemplateParam && templates.some((t) => t.slug === initialTemplateParam) && initialTemplateParam !== activeSlug) {
      setActiveSlug(initialTemplateParam);
    }
  }, [initialTemplateParam, templates, activeSlug]);

  const activeManifest = useMemo(() => {
    return templates.find((t) => t.slug === activeSlug) || templates[0];
  }, [templates, activeSlug]);

  // Load selected template package dynamically
  useEffect(() => {
    if (!activeManifest) {
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    setIsLoading(true);
    setLoadError(null);

    const loader = templateLoaders[activeManifest.indexPath];
    if (!loader) {
      setLoadError(`No template entrypoint found for ${activeManifest.slug}`);
      setIsLoading(false);
      return;
    }

    loader()
      .then((mod: any) => {
        if (!isMounted) return;
        const pkg = mod.default as TemplatePackage;
        if (!pkg?.brand || !pkg?.deck) {
          throw new Error('Template package missing brand or deck data');
        }
        setActivePkg(pkg);
        setLoadError(null);
        setIsLoading(false);
      })
      .catch((err: any) => {
        if (!isMounted) return;
        console.error(`Failed to load template ${activeManifest.slug}:`, err);
        setLoadError(err.message || String(err));
        setActivePkg(null);
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [activeManifest]);

  const totalSlides = activePkg?.deck.slides.length || 0;
  const activePlatform = platformParam || activePkg?.deck?.platform || activePkg?.brand?.platform || 'instagram-feed';
  const canvasWidth = 1080;
  const canvasHeight = activePlatform === 'instagram-stories' ? 1920 : activePlatform === 'instagram-square' ? 1080 : 1350;

  // Synchronize URL query params
  useEffect(() => {
    if (activeManifest && !isExportMode) {
      const params = new URLSearchParams();
      params.set('template', activeManifest.slug);
      params.set('slide', String(activeSlideIndex));
      params.set('mode', viewMode);
      setSearchParams(params, { replace: true });
    }
  }, [activeManifest, activeSlideIndex, viewMode, isExportMode, setSearchParams]);

  // Measure live AutoFit metrics
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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowLeft') {
        setActiveSlideIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'ArrowRight') {
        setActiveSlideIndex((prev) => Math.min(totalSlides - 1, prev + 1));
      } else if (e.key.toLowerCase() === 'g') {
        setViewMode((prev) => (prev === 'grid' ? 'fit' : 'grid'));
      } else if (e.key.toLowerCase() === 'f') {
        setIsFullscreen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalSlides]);

  // Export mode for Playwright automated visual audits (zero chrome)
  if (isExportMode && initialModeParam === '1:1') {
    if (loadError) {
      return (
        <div className="vite-error-overlay flex h-[1350px] w-[1080px] flex-col items-center justify-center bg-zinc-950 p-12 text-rose-400 font-mono">
          <p className="text-2xl font-bold mb-4">Template Compilation Error</p>
          <pre className="text-sm bg-zinc-900 p-6 rounded border border-rose-900 max-w-3xl whitespace-pre-wrap">{loadError}</pre>
        </div>
      );
    }
    if (isLoading || !activePkg) {
      return (
        <div className="flex items-center justify-center bg-zinc-950 text-zinc-400 font-mono" style={{ width: canvasWidth, height: canvasHeight }}>
          Loading template...
        </div>
      );
    }

    const { brand, deck, slides } = activePkg;
    const currentSlideData = deck.slides[activeSlideIndex] || deck.slides[0]!;
    const CurrentSlideComponent = (slides[activeSlideIndex] || slides[0]) as SlideComponent;

    return (
      <div className="inline-block bg-zinc-950" style={{ width: canvasWidth, height: canvasHeight }}>
        <SlideErrorBoundary>
          <SlideFrame
            brand={brand}
            slide={currentSlideData}
            slideIndex={activeSlideIndex}
            totalSlides={totalSlides}
            platform={activePlatform}
          >
            <CurrentSlideComponent
              slide={currentSlideData}
              brand={brand}
              totalSlides={totalSlides}
            />
          </SlideFrame>
        </SlideErrorBoundary>
      </div>
    );
  }

  const brand = activePkg?.brand;
  const deck = activePkg?.deck;
  const slides = activePkg?.slides || [];
  const currentSlideData = deck?.slides[activeSlideIndex] || deck?.slides[0];
  const CurrentSlideComponent = (slides[activeSlideIndex] || slides[0]) as SlideComponent | undefined;

  // Responsive Fit scale calculation
  const fitScale = activePlatform === 'instagram-stories' ? 0.38 : 0.48;

  return (
    <div className={`flex flex-col bg-zinc-950 text-zinc-100 ${isFullscreen ? 'fixed inset-0 z-50' : 'h-[calc(100vh-3rem)] w-full'}`}>
      {/* NATIVE STUDIO CONTROL TOOLBAR */}
      <header className="flex h-12 shrink-0 items-center justify-between border-b border-border/80 bg-surface px-4 shadow-xs">
        {/* Left: Template Selector & Info */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 pr-3 border-r border-border">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[12px] font-semibold tracking-wide uppercase text-text-primary flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
              Template Studio
            </span>
          </div>

          {/* Template Dropdown */}
          <div className="flex items-center gap-2">
            <select
              value={activeSlug}
              onChange={(e) => {
                setActiveSlug(e.target.value);
                setActiveSlideIndex(0);
              }}
              className="h-7 rounded-md border border-border bg-surface-2 px-2.5 text-[12px] font-medium text-text-primary focus:outline-hidden focus:border-border-secondary max-w-[220px]"
            >
              {templates.map((t) => (
                <option key={t.slug} value={t.slug}>
                  {t.name} ({t.slug})
                </option>
              ))}
            </select>
          </div>

          {/* Platform Canvas Badge */}
          <div className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded bg-surface-2 border border-border text-[11px] font-mono text-text-tertiary">
            {activePlatform === 'instagram-stories' ? (
              <>
                <Smartphone className="h-3 w-3 text-emerald-400" />
                <span>9:16 Stories</span>
              </>
            ) : (
              <>
                <Square className="h-3 w-3 text-blue-400" />
                <span>4:5 Feed</span>
              </>
            )}
          </div>
        </div>

        {/* Center: Slide Stepper & Selector */}
        {deck && deck.slides && viewMode !== 'grid' && (
          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-md border border-border bg-surface-2 p-0.5">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                disabled={activeSlideIndex <= 0}
                onClick={() => setActiveSlideIndex((prev) => Math.max(0, prev - 1))}
                className="h-6 w-6 text-text-tertiary hover:text-text-primary disabled:opacity-30"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </Button>

              <select
                value={activeSlideIndex}
                onChange={(e) => setActiveSlideIndex(parseInt(e.target.value, 10))}
                className="h-6 bg-transparent border-0 px-2 text-[11px] font-mono font-medium text-text-primary focus:outline-hidden cursor-pointer"
              >
                {deck.slides.map((s, idx) => (
                  <option key={idx} value={idx} className="bg-zinc-900 text-zinc-100">
                    Slide {idx + 1}: {(s.type || (s as any).archetype || 'editorial').toUpperCase()} — {s.title || s.headline || 'Untitled'}
                  </option>
                ))}
              </select>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                disabled={activeSlideIndex >= totalSlides - 1}
                onClick={() => setActiveSlideIndex((prev) => Math.min(totalSlides - 1, prev + 1))}
                className="h-6 w-6 text-text-tertiary hover:text-text-primary disabled:opacity-30"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </div>

            {/* Slide Quick Pills */}
            <div className="hidden md:flex items-center gap-1">
              {Array.from({ length: totalSlides }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveSlideIndex(i)}
                  className={`h-6 w-6 rounded text-[11px] font-mono transition-all ${
                    activeSlideIndex === i
                      ? 'bg-emerald-500 text-zinc-950 font-bold shadow-xs'
                      : 'text-text-tertiary hover:text-text-primary hover:bg-surface-3'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Right: Telemetry HUD, View Modes & Fullscreen */}
        <div className="flex items-center gap-2">
          {/* Live DOM Space Balance & AutoFit HUD */}
          {viewMode !== 'grid' && activePkg && (
            <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 rounded-md bg-surface-2 border border-border text-[11px] font-mono text-text-tertiary">
              <span>
                FILL: <strong className="text-text-primary">{metrics.fill}%</strong>
              </span>
              <span>•</span>
              <span>
                SCALE: <strong className="text-text-primary">{metrics.scale}</strong>
              </span>
            </div>
          )}

          {/* View Mode Switcher */}
          <div className="flex items-center rounded-md border border-border bg-surface-2 p-0.5 text-[11px]">
            <button
              type="button"
              onClick={() => setViewMode('fit')}
              className={`px-2.5 py-0.5 rounded transition-colors ${
                viewMode === 'fit' ? 'bg-surface-4 text-text-primary font-medium shadow-xs' : 'text-text-tertiary hover:text-text-primary'
              }`}
            >
              Fit Preview
            </button>
            <button
              type="button"
              onClick={() => setViewMode('1:1')}
              className={`px-2.5 py-0.5 rounded transition-colors ${
                viewMode === '1:1' ? 'bg-surface-4 text-text-primary font-medium shadow-xs' : 'text-text-tertiary hover:text-text-primary'
              }`}
            >
              1:1 Native
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 ${
                viewMode === 'grid' ? 'bg-surface-4 text-text-primary font-medium shadow-xs' : 'text-text-tertiary hover:text-text-primary'
              }`}
            >
              <Layers className="h-3 w-3" />
              Grid (G)
            </button>
          </div>

          {/* Fullscreen Expand */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setIsFullscreen((prev) => !prev)}
            title={isFullscreen ? 'Exit Fullscreen' : 'Expand Fullscreen (F)'}
            className="h-7 w-7 border border-border bg-surface-2 text-text-tertiary hover:text-text-primary hover:bg-surface-3"
          >
            {isFullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
          </Button>
        </div>
      </header>

      {/* NATIVE STAGE CANVAS (ZERO IFRAME) */}
      <main className="flex-1 flex items-center justify-center p-6 overflow-auto bg-zinc-950">
        {loadError && (
          <div className="flex flex-col items-center justify-center p-8 bg-zinc-900 border border-rose-900/50 rounded-xl max-w-xl text-center shadow-lg">
            <AlertCircle className="h-8 w-8 text-rose-400 mb-3" />
            <span className="text-rose-400 font-bold mb-1">Template Load Error</span>
            <p className="text-zinc-400 font-mono text-xs whitespace-pre-wrap">{loadError}</p>
            <p className="text-zinc-500 text-xs mt-4">Select another template from the top bar to continue.</p>
          </div>
        )}

        {isLoading && !loadError && (
          <div className="flex items-center justify-center text-zinc-400 font-mono text-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping mr-3" />
            Loading native React template package...
          </div>
        )}

        {!isLoading && !loadError && brand && deck && currentSlideData && CurrentSlideComponent && (
          <>
            {/* VIEW MODE 1: FIT PREVIEW */}
            {viewMode === 'fit' && (
              <div
                className="transition-transform duration-200 ease-out origin-center shadow-2xl rounded-sm shrink-0"
                style={{
                  transform: `scale(${fitScale})`,
                  width: canvasWidth,
                  height: canvasHeight,
                }}
              >
                <SlideErrorBoundary>
                  <SlideFrame
                    brand={brand}
                    slide={currentSlideData}
                    slideIndex={activeSlideIndex}
                    totalSlides={totalSlides}
                    platform={activePlatform}
                  >
                    <CurrentSlideComponent
                      slide={currentSlideData}
                      brand={brand}
                      totalSlides={totalSlides}
                    />
                  </SlideFrame>
                </SlideErrorBoundary>
              </div>
            )}

            {/* VIEW MODE 2: 1:1 NATIVE RESOLUTION */}
            {viewMode === '1:1' && (
              <div
                className="shadow-2xl rounded-sm my-auto shrink-0"
                style={{
                  width: canvasWidth,
                  height: canvasHeight,
                }}
              >
                <SlideErrorBoundary>
                  <SlideFrame
                    brand={brand}
                    slide={currentSlideData}
                    slideIndex={activeSlideIndex}
                    totalSlides={totalSlides}
                    platform={activePlatform}
                  >
                    <CurrentSlideComponent
                      slide={currentSlideData}
                      brand={brand}
                      totalSlides={totalSlides}
                    />
                  </SlideFrame>
                </SlideErrorBoundary>
              </div>
            )}

            {/* VIEW MODE 3: MULTI-SLIDE OVERVIEW GRID */}
            {viewMode === 'grid' && (
              <div className="w-full h-full p-6 overflow-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 justify-items-center">
                  {deck.slides.map((s, idx) => {
                    const Comp = slides[idx] as SlideComponent | undefined;
                    const isSelected = activeSlideIndex === idx;
                    const gridScale = activePlatform === 'instagram-stories' ? 0.22 : 0.26;
                    const containerW = canvasWidth * gridScale;
                    const containerH = canvasHeight * gridScale;

                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          setActiveSlideIndex(idx);
                          setViewMode('fit');
                        }}
                        className={`group relative flex flex-col items-center cursor-pointer rounded-lg p-2.5 transition-all ${
                          isSelected
                            ? 'bg-emerald-950/40 border-2 border-emerald-500 ring-2 ring-emerald-500/20'
                            : 'bg-zinc-900/60 border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full mb-2 px-1 text-[11px] font-mono">
                          <span className={isSelected ? 'text-emerald-400 font-bold' : 'text-zinc-400'}>
                            Slide {idx + 1}
                          </span>
                          <span className="text-[10px] text-zinc-500 uppercase">
                            {s.type || (s as any).archetype || 'editorial'}
                          </span>
                        </div>

                        <div
                          className="overflow-hidden rounded-sm shadow-md bg-zinc-950 flex items-center justify-center"
                          style={{ width: containerW, height: containerH }}
                        >
                          <div
                            style={{
                              transform: `scale(${gridScale})`,
                              transformOrigin: 'top left',
                              width: canvasWidth,
                              height: canvasHeight,
                              pointerEvents: 'none',
                            }}
                          >
                            <SlideErrorBoundary>
                              <SlideFrame
                                brand={brand}
                                slide={s}
                                slideIndex={idx}
                                totalSlides={totalSlides}
                                platform={activePlatform}
                              >
                                {Comp ? (
                                  <Comp slide={s} brand={brand} totalSlides={totalSlides} />
                                ) : (
                                  <div className="p-8 text-zinc-400">Loading slide...</div>
                                )}
                              </SlideFrame>
                            </SlideErrorBoundary>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

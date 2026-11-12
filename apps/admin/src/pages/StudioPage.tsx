import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTemplates } from '@/api/hooks';
import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ExternalLink,
  Maximize2,
  Minimize2,
  RefreshCw,
  Layers,
  Smartphone,
  Square,
  AlertCircle,
} from 'lucide-react';

export function StudioPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: templatesData, isLoading, refetch } = useTemplates();
  const templates = templatesData?.templates ?? [];

  const initialTemplate = searchParams.get('template') || '';
  const initialSlide = parseInt(searchParams.get('slide') || '0', 10);
  const initialMode = (searchParams.get('mode') as 'fit' | '1:1' | 'grid') || 'fit';

  const [selectedSlug, setSelectedSlug] = useState<string>(initialTemplate);
  const [activeSlide, setActiveSlide] = useState<number>(isNaN(initialSlide) ? 0 : initialSlide);
  const [viewMode, setViewMode] = useState<'fit' | '1:1' | 'grid'>(initialMode);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  // Sync selected template when templates load
  useEffect(() => {
    if (templates.length > 0) {
      if (!selectedSlug || !templates.some((t) => t.slug === selectedSlug)) {
        if (initialTemplate && templates.some((t) => t.slug === initialTemplate)) {
          setSelectedSlug(initialTemplate);
        } else {
          setSelectedSlug(templates[0]!.slug);
        }
      }
    }
  }, [templates, initialTemplate, selectedSlug]);

  const activeTemplate = useMemo(() => {
    return templates.find((t) => t.slug === selectedSlug) || templates[0];
  }, [templates, selectedSlug]);

  const totalSlides = activeTemplate?.slideCount || 7;
  const platform = activeTemplate?.platform || 'instagram-feed';

  // Synchronize URL query params
  useEffect(() => {
    if (selectedSlug) {
      const params = new URLSearchParams();
      params.set('template', selectedSlug);
      params.set('slide', String(activeSlide));
      params.set('mode', viewMode);
      setSearchParams(params, { replace: true });
    }
  }, [selectedSlug, activeSlide, viewMode, setSearchParams]);

  // Iframe source URL (points to generator-studio Vite dev server on port 5174)
  const iframeSrc = useMemo(() => {
    if (!selectedSlug) return '';
    return `http://localhost:5174/?template=${selectedSlug}&slide=${activeSlide}&mode=${viewMode}&platform=${platform}`;
  }, [selectedSlug, activeSlide, viewMode, platform]);

  const standaloneUrl = `http://localhost:5174/?template=${selectedSlug || ''}&slide=${activeSlide}&mode=${viewMode}`;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowLeft') {
        setActiveSlide((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'ArrowRight') {
        setActiveSlide((prev) => Math.min(totalSlides - 1, prev + 1));
      } else if (e.key.toLowerCase() === 'g') {
        setViewMode((prev) => (prev === 'grid' ? 'fit' : 'grid'));
      } else if (e.key.toLowerCase() === 'f') {
        setIsFullscreen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalSlides]);

  return (
    <div className={`flex flex-col bg-zinc-950 text-zinc-100 ${isFullscreen ? 'fixed inset-0 z-50' : 'h-[calc(100vh-3rem)] w-full'}`}>
      {/* STUDIO TOOLBAR */}
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
              value={selectedSlug}
              onChange={(e) => {
                setSelectedSlug(e.target.value);
                setActiveSlide(0);
              }}
              className="h-7 rounded-md border border-border bg-surface-2 px-2.5 text-[12px] font-medium text-text-primary focus:outline-hidden focus:border-border-secondary max-w-[220px]"
            >
              {templates.map((t) => (
                <option key={t.slug} value={t.slug}>
                  {t.name} ({t.slug})
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => refetch()}
              title="Refresh template list"
              className="p-1 rounded text-text-quaternary hover:text-text-primary hover:bg-surface-3 transition-colors"
            >
              <RefreshCw className="h-3 w-3" />
            </button>
          </div>

          {/* Platform Canvas Badge */}
          <div className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded bg-surface-2 border border-border text-[11px] font-mono text-text-tertiary">
            {platform === 'instagram-stories' ? (
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

        {/* Center: Slide Stepper & Quick Pills */}
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-md border border-border bg-surface-2 p-0.5">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              disabled={activeSlide <= 0}
              onClick={() => setActiveSlide((prev) => Math.max(0, prev - 1))}
              className="h-6 w-6 text-text-tertiary hover:text-text-primary disabled:opacity-30"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </Button>

            <span className="px-2 text-[11px] font-mono font-medium text-text-secondary select-none">
              Slide <strong className="text-text-primary">{activeSlide + 1}</strong> of {totalSlides}
            </span>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              disabled={activeSlide >= totalSlides - 1}
              onClick={() => setActiveSlide((prev) => Math.min(totalSlides - 1, prev + 1))}
              className="h-6 w-6 text-text-tertiary hover:text-text-primary disabled:opacity-30"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </div>

          {/* Slide Quick Pills (for up to 10 slides) */}
          <div className="hidden md:flex items-center gap-1">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveSlide(i)}
                className={`h-6 w-6 rounded text-[11px] font-mono transition-all ${
                  activeSlide === i
                    ? 'bg-emerald-500 text-zinc-950 font-bold shadow-xs'
                    : 'text-text-tertiary hover:text-text-primary hover:bg-surface-3'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Right: View Modes & Fullscreen */}
        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex items-center rounded-md border border-border bg-surface-2 p-0.5 text-[11px]">
            <button
              type="button"
              onClick={() => setViewMode('fit')}
              className={`px-2 py-0.5 rounded transition-colors ${
                viewMode === 'fit' ? 'bg-surface-4 text-text-primary font-medium' : 'text-text-tertiary hover:text-text-primary'
              }`}
            >
              Fit
            </button>
            <button
              type="button"
              onClick={() => setViewMode('1:1')}
              className={`px-2 py-0.5 rounded transition-colors ${
                viewMode === '1:1' ? 'bg-surface-4 text-text-primary font-medium' : 'text-text-tertiary hover:text-text-primary'
              }`}
            >
              1:1
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`px-2 py-0.5 rounded transition-colors flex items-center gap-1 ${
                viewMode === 'grid' ? 'bg-surface-4 text-text-primary font-medium' : 'text-text-tertiary hover:text-text-primary'
              }`}
            >
              <Layers className="h-3 w-3" />
              Grid
            </button>
          </div>

          {/* Pop out to Standalone Port 5174 */}
          <a
            href={standaloneUrl}
            target="_blank"
            rel="noreferrer"
            title="Open in new window (port 5174)"
            className="inline-flex items-center justify-center h-7 w-7 rounded-md border border-border bg-surface-2 text-text-tertiary hover:text-text-primary hover:bg-surface-3 transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </a>

          {/* Fullscreen Expand */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setIsFullscreen((prev) => !prev)}
            title={isFullscreen ? 'Exit Fullscreen' : 'Expand Fullscreen'}
            className="h-7 w-7 border border-border bg-surface-2 text-text-tertiary hover:text-text-primary hover:bg-surface-3"
          >
            {isFullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
          </Button>
        </div>
      </header>

      {/* EMBEDDED STUDIO VIEWPORT */}
      <div className="relative flex-1 w-full bg-zinc-950 overflow-hidden">
        {isLoading && !selectedSlug ? (
          <div className="flex h-full w-full items-center justify-center text-text-tertiary text-[13px]">
            Discovering templates...
          </div>
        ) : !selectedSlug ? (
          <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center text-text-tertiary">
            <AlertCircle className="h-8 w-8 text-text-quaternary mb-3" />
            <p className="text-[14px] font-semibold text-text-primary">No Generated Templates Found</p>
            <p className="text-[12px] text-text-quaternary max-w-sm mt-1">
              Create a job using the Bespoke engine to generate your first isolated template deck.
            </p>
          </div>
        ) : (
          <iframe
            key={`${selectedSlug}-${activeSlide}-${viewMode}`}
            src={iframeSrc}
            title={`Studio - ${selectedSlug}`}
            className="h-full w-full border-0"
            allow="fullscreen"
            onLoad={() => setIframeLoaded(true)}
          />
        )}
      </div>
    </div>
  );
}

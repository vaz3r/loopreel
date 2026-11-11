import { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Smartphone,
  Monitor,
  LayoutGrid,
  Play,
  Maximize2
} from 'lucide-react';
import type { JobDetail, BespokeDeck, BespokeSlide } from '@/api/client';

export function SlidePreview({ job }: { job: JobDetail }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [displayMode, setDisplayMode] = useState<'simulator' | 'grid'>('simulator');
  const [deviceFrame, setDeviceFrame] = useState<'standard' | 'phone'>('standard');

  const slides = job.assets
    .filter((a) => a.formatType === 'carousel_slide')
    .sort((a, b) => (a.slideIndex ?? 0) - (b.slideIndex ?? 0));

  const bespokeDeck = (job.contentPayload as any)?.deck as BespokeDeck | undefined;

  const isStories = job.platform === 'instagram-stories';
  const isSquare = job.platform === 'instagram-square';
  const aspectClass = isStories ? 'aspect-[9/16]' : isSquare ? 'aspect-square' : 'aspect-[4/5]';
  const containerWidth = isStories
    ? (deviceFrame === 'phone' ? 'w-[320px]' : 'w-[360px]')
    : isSquare
    ? 'w-[420px]'
    : (deviceFrame === 'phone' ? 'w-[360px]' : 'w-[420px]');
  const lightboxMaxWidth = isStories ? 'max-w-sm' : isSquare ? 'max-w-lg' : 'max-w-xl';

  const currentSlide = slides[activeIdx] ?? slides[0];
  const slideDeckData = bespokeDeck?.slides?.[activeIdx] as BespokeSlide | undefined;

  const handlePrev = useCallback(() => {
    setActiveIdx((prev) => (prev > 0 ? prev - 1 : slides.length - 1));
  }, [slides.length]);

  const handleNext = useCallback(() => {
    setActiveIdx((prev) => (prev < slides.length - 1 ? prev + 1 : 0));
  }, [slides.length]);

  // Keyboard navigation for simulator
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (lightboxIdx !== null) return; // handled by modal
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext, lightboxIdx]);

  if (slides.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="text-[13px] font-medium text-text-secondary mb-4">Slides</h3>
        <p className="text-[13px] text-text-quaternary text-center py-8">No slides generated yet</p>
      </div>
    );
  }

  async function downloadSlide(storageUrl: string, index: number) {
    const url = `/api/slides/${storageUrl}`;
    const a = document.createElement('a');
    a.href = url;
    a.download = `slide_${String(index + 1).padStart(2, '0')}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  async function downloadAllSlides() {
    for (const slide of slides) {
      if (!slide.storageUrl) continue;
      await downloadSlide(slide.storageUrl, slide.slideIndex ?? 0);
      await new Promise((r) => setTimeout(r, 200));
    }
  }

  return (
    <>
      <div className="rounded-lg border border-border bg-card p-6 space-y-5">
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border">
          <div className="flex items-center gap-2">
            <h3 className="text-[13px] font-semibold text-text-primary">
              Carousel Presentation
            </h3>
            <span className="text-[11px] font-mono text-text-quaternary">
              ({slides.length} slides)
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="flex items-center gap-0.5 bg-surface-2 rounded-lg p-0.5 border border-border">
              <button
                type="button"
                onClick={() => setDisplayMode('simulator')}
                className={`flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-md font-medium transition-colors ${
                  displayMode === 'simulator'
                    ? 'bg-surface-4 text-text-primary shadow-xs'
                    : 'text-text-tertiary hover:text-text-primary'
                }`}
              >
                <Play className="h-3 w-3" />
                Simulator
              </button>
              <button
                type="button"
                onClick={() => setDisplayMode('grid')}
                className={`flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-md font-medium transition-colors ${
                  displayMode === 'grid'
                    ? 'bg-surface-4 text-text-primary shadow-xs'
                    : 'text-text-tertiary hover:text-text-primary'
                }`}
              >
                <LayoutGrid className="h-3 w-3" />
                All Slides
              </button>
            </div>

            {/* In Simulator Mode: Phone / Standard toggle */}
            {displayMode === 'simulator' && (
              <div className="flex items-center gap-0.5 bg-surface-2 rounded-lg p-0.5 border border-border">
                <button
                  type="button"
                  onClick={() => setDeviceFrame('standard')}
                  title="Standard 4:5 Aspect Ratio"
                  className={`flex items-center gap-1 text-[11px] px-2 py-1 rounded-md transition-colors ${
                    deviceFrame === 'standard'
                      ? 'bg-surface-4 text-text-primary shadow-xs'
                      : 'text-text-tertiary hover:text-text-primary'
                  }`}
                >
                  <Monitor className="h-3 w-3" />
                </button>
                <button
                  type="button"
                  onClick={() => setDeviceFrame('phone')}
                  title="Mobile Phone Mockup"
                  className={`flex items-center gap-1 text-[11px] px-2 py-1 rounded-md transition-colors ${
                    deviceFrame === 'phone'
                      ? 'bg-surface-4 text-text-primary shadow-xs'
                      : 'text-text-tertiary hover:text-text-primary'
                  }`}
                >
                  <Smartphone className="h-3 w-3" />
                </button>
              </div>
            )}

            {/* Download All */}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={downloadAllSlides}
              className="h-7 text-[11px] gap-1.5 border-border text-text-secondary hover:text-text-primary"
            >
              <Download className="h-3.5 w-3.5" />
              Download All
            </Button>
          </div>
        </div>

        {/* Display Mode 1: Interactive Carousel Simulator */}
        {displayMode === 'simulator' && currentSlide && (
          <div className="flex flex-col items-center py-4 bg-background/50 rounded-xl border border-border/60">
            {/* Active Slide Context Pill */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-surface-2 text-text-primary border border-border">
                Slide {activeIdx + 1} of {slides.length}
              </span>
              {slideDeckData?.type && (
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-950/40 text-emerald-300 border border-emerald-800/40">
                  {slideDeckData.type}
                </span>
              )}
              {slideDeckData?.title && (
                <span className="text-[12px] font-medium text-text-secondary truncate max-w-[280px]">
                  {slideDeckData.title}
                </span>
              )}
            </div>

            {/* Simulator Stage with Floating Arrows */}
            <div className="relative flex items-center justify-center w-full max-w-2xl px-12">
              {/* Prev Button */}
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-surface-2/90 border border-border text-text-secondary hover:text-text-primary hover:bg-surface-3 transition-colors shadow-md"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {/* Slide Mockup Container */}
              <div
                className={`relative transition-all duration-200 ${containerWidth} ${
                  deviceFrame === 'phone'
                    ? 'p-3 rounded-[44px] bg-zinc-950 border-[6px] border-zinc-800 shadow-2xl'
                    : 'rounded-xl border border-border bg-surface-2 shadow-xl overflow-hidden'
                }`}
              >
                {/* Phone Notch/Island if mobile mockup */}
                {deviceFrame === 'phone' && (
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 h-4 w-24 bg-black rounded-full z-20" />
                )}

                <div
                  className={`relative ${aspectClass} w-full overflow-hidden ${
                    deviceFrame === 'phone' ? 'rounded-[32px]' : ''
                  }`}
                >
                  <img
                    src={`/api/slides/${currentSlide.storageUrl}`}
                    alt={`Slide ${activeIdx + 1}`}
                    className="h-full w-full object-cover"
                  />

                  {/* Quick Expand overlay button */}
                  <button
                    type="button"
                    onClick={() => setLightboxIdx(activeIdx)}
                    className="absolute top-2.5 right-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white/80 hover:text-white hover:bg-black/80 transition-colors"
                    title="Fullscreen zoom"
                  >
                    <Maximize2 className="h-3.5 w-3.5" />
                  </button>

                  {/* Individual Download overlay button */}
                  {currentSlide.storageUrl && (
                    <button
                      type="button"
                      onClick={() => downloadSlide(currentSlide.storageUrl!, activeIdx)}
                      className="absolute bottom-2.5 right-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white/80 hover:text-white hover:bg-black/80 transition-colors"
                      title="Download PNG"
                    >
                      <Download className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                {/* Phone Home Bar if mobile mockup */}
                {deviceFrame === 'phone' && (
                  <div className="w-28 h-1 bg-zinc-600 rounded-full mx-auto mt-2" />
                )}
              </div>

              {/* Next Button */}
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-surface-2/90 border border-border text-text-secondary hover:text-text-primary hover:bg-surface-3 transition-colors shadow-md"
                aria-label="Next slide"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Clickable Pill / Dot Rail */}
            <div className="flex items-center gap-1.5 mt-5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveIdx(i)}
                  className={`h-2 rounded-full transition-all ${
                    activeIdx === i
                      ? 'w-6 bg-emerald-400'
                      : 'w-2 bg-border hover:bg-border-secondary'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <p className="text-[11px] text-text-quaternary mt-2">
              Tip: Use <kbd className="font-mono bg-surface-2 px-1 py-0.5 rounded border border-border">←</kbd> and <kbd className="font-mono bg-surface-2 px-1 py-0.5 rounded border border-border">→</kbd> arrow keys to swipe
            </p>
          </div>
        )}

        {/* Display Mode 2: Grid Gallery */}
        {displayMode === 'grid' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {slides.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setLightboxIdx(idx)}
                className={`group relative ${aspectClass} overflow-hidden rounded-lg border border-border bg-surface-2 transition-all hover:border-border-secondary hover:shadow-md text-left`}
              >
                <img
                  src={`/api/slides/${slide.storageUrl}`}
                  alt={`Slide ${(slide.slideIndex ?? 0) + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="absolute bottom-2 left-2 opacity-0 transition-opacity group-hover:opacity-100 flex items-center gap-1.5">
                  <span className="text-[10px] font-mono font-bold text-white bg-black/70 rounded px-1.5 py-0.5">
                    #{(slide.slideIndex ?? 0) + 1}
                  </span>
                  <span className="text-[10px] text-white/80">Click to expand</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Dialog Modal */}
      <Dialog open={lightboxIdx !== null} onOpenChange={() => setLightboxIdx(null)}>
        <DialogContent className="max-w-3xl p-0 bg-background border-border transition-all duration-200 overflow-hidden">
          {lightboxIdx !== null && slides[lightboxIdx] && (
            <div className="relative flex flex-col items-center p-4">
              <div className="w-full flex items-center justify-between pb-3 mb-2 border-b border-border">
                <span className="text-xs font-semibold text-text-primary">
                  Slide {(slides[lightboxIdx].slideIndex ?? 0) + 1} of {slides.length}
                </span>

                {slides[lightboxIdx].storageUrl && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => downloadSlide(slides[lightboxIdx].storageUrl!, lightboxIdx)}
                    className="h-7 text-[11px] gap-1 text-text-secondary hover:text-text-primary"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Save Slide
                  </Button>
                )}
              </div>

              <div className={`relative w-full ${lightboxMaxWidth} ${aspectClass} overflow-hidden rounded-lg border border-border bg-surface-2 shadow-2xl`}>
                <img
                  src={`/api/slides/${slides[lightboxIdx].storageUrl}`}
                  alt={`Slide ${(slides[lightboxIdx].slideIndex ?? 0) + 1}`}
                  className="h-full w-full object-contain"
                />
              </div>

              {/* Lightbox Nav */}
              <div className="flex items-center gap-4 mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setLightboxIdx((prev) => (prev! > 0 ? prev! - 1 : slides.length - 1))}
                  className="h-7 px-3 text-xs"
                >
                  <ChevronLeft className="h-3.5 w-3.5 mr-1" />
                  Prev
                </Button>
                <span className="text-xs text-text-quaternary font-mono">
                  {lightboxIdx + 1} / {slides.length}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setLightboxIdx((prev) => (prev! < slides.length - 1 ? prev! + 1 : 0))}
                  className="h-7 px-3 text-xs"
                >
                  Next
                  <ChevronRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

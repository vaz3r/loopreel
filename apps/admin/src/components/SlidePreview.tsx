import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, ChevronLeft, ChevronRight, Download, Smartphone, Monitor } from 'lucide-react';
import type { JobDetail } from '@/api/client';

export function SlidePreview({ job }: { job: JobDetail }) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'fit' | 'mobile'>('fit');

  const slides = job.assets
    .filter((a) => a.formatType === 'carousel_slide')
    .sort((a, b) => (a.slideIndex ?? 0) - (b.slideIndex ?? 0));

  if (slides.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="text-[13px] font-medium text-text-secondary mb-4">Slides</h3>
        <p className="text-[13px] text-text-quaternary text-center py-8">No slides generated yet</p>
      </div>
    );
  }

  const currentSlide = selectedIdx !== null ? slides[selectedIdx] : null;

  async function downloadAllSlides() {
    for (const slide of slides) {
      const url = `/api/slides/${slide.storageUrl}`;
      const a = document.createElement('a');
      a.href = url;
      a.download = `slide_${String((slide.slideIndex ?? 0) + 1).padStart(2, '0')}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      await new Promise((r) => setTimeout(r, 200));
    }
  }

  return (
    <>
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[13px] font-medium text-text-secondary">
            Slides <span className="text-text-quaternary">({slides.length})</span>
          </h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={downloadAllSlides}
            className="h-7 text-[11px] gap-1.5 border-border text-text-secondary hover:text-text-primary"
          >
            <Download className="h-3.5 w-3.5" />
            Download All Slides
          </Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {slides.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setSelectedIdx(idx)}
              className="group relative aspect-[4/5] overflow-hidden rounded-md border border-border bg-surface-2 transition-colors hover:border-border-secondary"
            >
              <img
                src={`/api/slides/${slide.storageUrl}`}
                alt={`Slide ${(slide.slideIndex ?? 0) + 1}`}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="absolute bottom-1.5 left-1.5 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="text-[10px] font-medium text-text-primary bg-black/60 rounded px-1.5 py-0.5">
                  #{(slide.slideIndex ?? 0) + 1}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Dialog open={selectedIdx !== null} onOpenChange={() => setSelectedIdx(null)}>
        <DialogContent className={`${viewMode === 'mobile' ? 'max-w-md' : 'max-w-3xl'} p-0 bg-background border-border transition-all duration-200 overflow-hidden`}>
          {currentSlide && (
            <div className="relative flex flex-col items-center p-4">
              {/* Header Toolbar */}
              <div className="w-full flex items-center justify-between pb-3 mb-2 border-b border-border">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-text-primary">
                    Slide {(currentSlide.slideIndex ?? 0) + 1} of {slides.length}
                  </span>
                  <span className="text-[10px] text-text-quaternary">
                    ({job.templateId || 'carousel'})
                  </span>
                </div>

                <div className="flex items-center gap-1 bg-surface-2 rounded-lg p-0.5 border border-border">
                  <button
                    type="button"
                    onClick={() => setViewMode('fit')}
                    className={`flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-md font-medium transition-colors ${
                      viewMode === 'fit'
                        ? 'bg-surface-4 text-text-primary shadow-xs'
                        : 'text-text-tertiary hover:text-text-primary'
                    }`}
                  >
                    <Monitor className="h-3 w-3" />
                    Full
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('mobile')}
                    className={`flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-md font-medium transition-colors ${
                      viewMode === 'mobile'
                        ? 'bg-surface-4 text-text-primary shadow-xs'
                        : 'text-text-tertiary hover:text-text-primary'
                    }`}
                  >
                    <Smartphone className="h-3 w-3" />
                    Mobile (390px)
                  </button>
                </div>

                <div className="flex items-center gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7 text-text-tertiary hover:text-text-primary"
                    asChild
                  >
                    <a href={`/api/slides/${currentSlide.storageUrl}`} download title="Download slide">
                      <Download className="h-3.5 w-3.5" />
                    </a>
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7 text-text-tertiary hover:text-text-primary"
                    onClick={() => setSelectedIdx(null)}
                    title="Close"
                  >
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>

              {/* Viewport Container */}
              <div className={`relative ${viewMode === 'mobile' ? 'w-[390px] border-4 border-neutral-800 rounded-3xl shadow-2xl overflow-hidden bg-black' : 'w-full'}`}>
                {viewMode === 'mobile' && (
                  <div className="bg-neutral-900 text-neutral-400 text-[10px] font-mono px-3 py-1 flex items-center justify-between border-b border-neutral-800">
                    <span>9:41</span>
                    <span className="font-semibold text-neutral-300">Instagram Viewport (390×488pt)</span>
                    <span>100%</span>
                  </div>
                )}
                <img
                  src={`/api/slides/${currentSlide.storageUrl}`}
                  alt={`Slide ${(currentSlide.slideIndex ?? 0) + 1}`}
                  className="w-full h-auto block"
                />
              </div>

              {/* Navigation Arrows */}
              {slides.length > 1 && (
                <>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute left-6 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-surface-3/80 backdrop-blur-sm border-border hover:bg-surface-4 shadow-md"
                    disabled={selectedIdx === 0}
                    onClick={() => setSelectedIdx((i) => i !== null ? Math.max(0, i - 1) : null)}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute right-6 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-surface-3/80 backdrop-blur-sm border-border hover:bg-surface-4 shadow-md"
                    disabled={selectedIdx === slides.length - 1}
                    onClick={() => setSelectedIdx((i) => i !== null ? Math.min(slides.length - 1, i + 1) : null)}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

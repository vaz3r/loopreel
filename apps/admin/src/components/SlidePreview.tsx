import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import type { JobDetail } from '@/api/client';

export function SlidePreview({ job }: { job: JobDetail }) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

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

  return (
    <>
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[13px] font-medium text-text-secondary">
            Slides <span className="text-text-quaternary">({slides.length})</span>
          </h3>
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
        <DialogContent className="max-w-3xl p-0 bg-background border-border">
          {currentSlide && (
            <div className="relative">
              <img
                src={`/api/slides/${currentSlide.storageUrl}`}
                alt={`Slide ${(currentSlide.slideIndex ?? 0) + 1}`}
                className="w-full rounded-lg"
              />

              {slides.length > 1 && (
                <>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-md bg-surface-3/80 backdrop-blur-sm border-border hover:bg-surface-4"
                    disabled={selectedIdx === 0}
                    onClick={() => setSelectedIdx((i) => i !== null ? Math.max(0, i - 1) : null)}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-md bg-surface-3/80 backdrop-blur-sm border-border hover:bg-surface-4"
                    disabled={selectedIdx === slides.length - 1}
                    onClick={() => setSelectedIdx((i) => i !== null ? Math.min(slides.length - 1, i + 1) : null)}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}

              <div className="absolute top-3 right-3 flex gap-1.5">
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-7 w-7 rounded-md bg-surface-3/80 backdrop-blur-sm border-border hover:bg-surface-4"
                  onClick={() => setSelectedIdx(null)}
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-7 w-7 rounded-md bg-surface-3/80 backdrop-blur-sm border-border hover:bg-surface-4"
                  asChild
                >
                  <a href={`/api/slides/${currentSlide.storageUrl}`} download>
                    <Download className="h-3.5 w-3.5" />
                  </a>
                </Button>
              </div>

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
                <span className="text-[11px] font-medium text-text-secondary bg-surface-3/80 backdrop-blur-sm rounded-md px-2.5 py-1 border border-border">
                  {(currentSlide.slideIndex ?? 0) + 1} / {slides.length}
                </span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

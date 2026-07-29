import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, X } from 'lucide-react';
import type { JobDetail } from '@/api/client';

export function SlidePreview({ job }: { job: JobDetail }) {
  const [selectedSlide, setSelectedSlide] = useState<string | null>(null);

  const slides = job.assets
    .filter((a) => a.formatType === 'carousel_slide')
    .sort((a, b) => (a.slideIndex ?? 0) - (b.slideIndex ?? 0));

  if (slides.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Slides</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-8">
            No slides generated yet
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">
            Slides ({slides.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {slides.map((slide) => (
              <button
                key={slide.id}
                onClick={() => setSelectedSlide(`/api/slides/${slide.storageUrl}`)}
                className="group relative aspect-[4/5] overflow-hidden rounded-lg border bg-muted"
              >
                <img
                  src={`/api/slides/${slide.storageUrl}`}
                  alt={`Slide ${(slide.slideIndex ?? 0) + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/40" />
                <div className="absolute bottom-2 left-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="text-xs font-medium text-white bg-black/60 rounded px-1.5 py-0.5">
                    #{(slide.slideIndex ?? 0) + 1}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedSlide} onOpenChange={() => setSelectedSlide(null)}>
        <DialogContent className="max-w-2xl p-0 bg-black border-0">
          {selectedSlide && (
            <div className="relative">
              <img
                src={selectedSlide}
                alt="Slide preview"
                className="w-full rounded-lg"
              />
              <Button
                size="icon"
                variant="secondary"
                className="absolute top-2 right-2 h-8 w-8"
                onClick={() => setSelectedSlide(null)}
              >
                <X className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                className="absolute bottom-2 right-2 h-8 w-8"
                asChild
              >
                <a href={selectedSlide} download>
                  <Download className="h-4 w-4" />
                </a>
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

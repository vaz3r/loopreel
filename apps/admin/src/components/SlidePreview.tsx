import type { JobDetail } from '../api/client';
import { Download } from 'lucide-react';

export function SlidePreview({ job }: { job: JobDetail }) {
  const slides = job.assets.filter((a) => a.formatType === 'carousel_slide');

  if (slides.length === 0) {
    return (
      <div className="rounded-lg border border-gray-800 bg-gray-900 p-8 text-center text-sm text-gray-500">
        No slides generated yet
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {slides.map((slide) => (
        <div
          key={slide.id}
          className="group relative overflow-hidden rounded-lg border border-gray-800 bg-gray-900"
        >
          <div className="aspect-[4/5] bg-gray-800">
            <img
              src={`/api/slides/${slide.storageUrl}`}
              alt={`Slide ${slide.slideIndex}`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
            <a
              href={`/api/slides/${slide.storageUrl}`}
              download
              className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur hover:bg-white/20"
            >
              <Download className="h-3.5 w-3.5" />
              Slide {slide.slideIndex}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

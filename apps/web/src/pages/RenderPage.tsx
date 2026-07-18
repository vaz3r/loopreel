import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { buildSlides, type StructuredContent, type BrandKit } from '@loopreel/schemas';
import { SlideTemplate } from '../components/SlideTemplate.js';

interface JobData {
  id: string;
  status: string;
  structuredJson: StructuredContent | null;
  slideCount: number | null;
  brandKit?: BrandKit;
}

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

function signalComplete() {
  document.documentElement.setAttribute('data-render-complete', 'true');
}

export function RenderPage() {
  const { jobId, slideIndex } = useParams<{ jobId: string; slideIndex: string }>();
  const [job, setJob] = useState<JobData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const index = Number(slideIndex);

  useEffect(() => {
    if (!jobId) {
      setError('Missing jobId');
      return;
    }

    const fetchJob = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/jobs/${jobId}`);
        if (!res.ok) {
          setError(`Failed to fetch job: ${res.status}`);
          return;
        }
        const data = await res.json() as {
          id: string;
          status: string;
          structuredJson: StructuredContent | null;
          slideCount: number | null;
          brandKit?: BrandKit;
        };
        setJob(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    };

    void fetchJob();
  }, [jobId]);

  useEffect(() => {
    const timeout = setTimeout(signalComplete, 3000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!job || error) return;

    const ready = async () => {
      try {
        await Promise.race([
          document.fonts.ready,
          new Promise((resolve) => setTimeout(resolve, 2000)),
        ]);
      } catch {
        // fonts may not load in headless
      }
      signalComplete();
    };

    if (job.structuredJson && job.slideCount) {
      void ready();
    }
  }, [job, error]);

  if (error) {
    return (
      <div style={{ width: 1080, height: 1080, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1a1a2e', color: '#ff6b6b', fontFamily: 'Inter, sans-serif' }}>
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!job || !job.structuredJson || !job.slideCount) {
    return (
      <div style={{ width: 1080, height: 1080, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1a1a2e', color: '#ffffff', fontFamily: 'Inter, sans-serif' }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (index < 0 || index >= job.slideCount) {
    return (
      <div style={{ width: 1080, height: 1080, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1a1a2e', color: '#ff6b6b', fontFamily: 'Inter, sans-serif' }}>
        <p>Invalid slide index: {index}</p>
      </div>
    );
  }

  const slides = buildSlides(job.structuredJson);
  const slide = slides[index];

  if (!slide) {
    return (
      <div style={{ width: 1080, height: 1080, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1a1a2e', color: '#ff6b6b', fontFamily: 'Inter, sans-serif' }}>
        <p>Slide not found at index {index}</p>
      </div>
    );
  }

  return (
    <SlideTemplate
      slide={slide}
      slideCount={job.slideCount}
      brandKit={job.brandKit}
    />
  );
}

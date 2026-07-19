import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import {
  buildSlidesWithDesign,
  type StructuredContent,
  type BrandKit,
  type DesignOutput,
} from '@loopreel/schemas';
import { SlideRenderer } from '../components/SlideTemplate.js';

interface JobData {
  id: string;
  status: string;
  templateId?: string;
  platform?: string;
  structuredJson: StructuredContent & { design?: DesignOutput; brandKit?: BrandKit } | null;
  slideCount: number | null;
  brandKit?: BrandKit;
}

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

function signalComplete() {
  document.documentElement.setAttribute('data-render-complete', 'true');
}

function isLegacyFormat(content: StructuredContent): boolean {
  return 'valuePoints' in content && !('slides' in content);
}

const FORMAT_MAP: Record<string, 'square' | 'portrait' | 'story'> = {
  'instagram-feed': 'square',
  'instagram-stories': 'story',
  'linkedin': 'square',
  'facebook': 'square',
};

export function RenderPage() {
  const { jobId, slideIndex } = useParams<{ jobId: string; slideIndex: string }>();
  const [searchParams] = useSearchParams();
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
        const data = await res.json() as JobData;
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

  // Detect legacy format — old jobs used valuePoints, new jobs use slides
  if (isLegacyFormat(job.structuredJson)) {
    return (
      <div style={{ width: 1080, height: 1080, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#E7E4D9', color: '#15130F', fontFamily: 'Archivo, sans-serif' }}>
        <div style={{ textAlign: 'center', padding: 60 }}>
          <p style={{ fontSize: 18, marginBottom: 12 }}>This job was created with an older template system.</p>
          <p style={{ fontSize: 14, color: '#666' }}>Screenshots are available in the assets tab.</p>
        </div>
      </div>
    );
  }

  // Extract content and design from the structured JSON
  const { design, brandKit: embeddedBrandKit, ...content } = job.structuredJson;
  const finalBrandKit = embeddedBrandKit ?? job.brandKit;

  const queryTemplate = searchParams.get('template');
  const templateId = queryTemplate ?? job.templateId ?? design?.template ?? 'editorial-runway';

  // Force the templateId into the design object
  const mergedDesign: DesignOutput = design
    ? { ...design, template: templateId }
    : {
        template: templateId,
        colorScheme: {
          primary: '#B31E23',
          secondary: '#E7E4D9',
          accent: '#B31E23',
          background: '#E7E4D9',
          text: '#15130F',
        },
        slides: [],
      };

  const { slides, meta } = buildSlidesWithDesign(content as StructuredContent, mergedDesign);
  const slide = slides[index];

  if (!slide) {
    return (
      <div style={{ width: 1080, height: 1080, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1a1a2e', color: '#ff6b6b', fontFamily: 'Inter, sans-serif' }}>
        <p>Slide not found at index {index}</p>
      </div>
    );
  }

  // Derive format from platform
  const platformId = job.platform ?? 'instagram-feed';
  const format = FORMAT_MAP[platformId] ?? 'square';

  return (
    <SlideRenderer
      slide={slide}
      slideCount={job.slideCount}
      brandKit={finalBrandKit}
      design={mergedDesign}
      meta={meta}
      format={format}
    />
  );
}

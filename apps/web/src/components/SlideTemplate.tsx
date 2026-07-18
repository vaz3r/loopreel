import type { SlideData, BrandKit, DesignOutput } from '@loopreel/schemas';
import { ModernBoldTemplate } from './templates/ModernBoldTemplate.js';
import { GlassmorphismTemplate } from './templates/GlassmorphismTemplate.js';
import { EditorialTemplate } from './templates/EditorialTemplate.js';

export interface SlideRendererProps {
  slide: SlideData;
  slideCount: number;
  brandKit?: BrandKit;
  design?: DesignOutput;
}

export function SlideRenderer(props: SlideRendererProps) {
  const templateId = props.design?.template ?? 'modern-bold';

  switch (templateId) {
    case 'glassmorphism':
      return <GlassmorphismTemplate {...props} />;
    case 'editorial':
      return <EditorialTemplate {...props} />;
    case 'modern-dark':
    case 'modern-bold':
    default:
      return <ModernBoldTemplate {...props} />;
  }
}

export const SlideTemplate = SlideRenderer;

import type { SlideData, PostMeta, BrandKit, DesignOutput } from '@loopreel/schemas';
import type { SlideFormat } from './templates/shared/types.js';
import { getTemplate } from './templates/registry.js';

export interface SlideRendererProps {
  slide: SlideData;
  slideCount: number;
  brandKit?: BrandKit;
  design?: DesignOutput;
  meta?: PostMeta;
  format?: SlideFormat;
}

export function SlideRenderer(props: SlideRendererProps) {
  const templateId = props.design?.template ?? 'editorial-runway';
  const Template = getTemplate(templateId);
  return <Template {...props} />;
}

export const SlideTemplate = SlideRenderer;

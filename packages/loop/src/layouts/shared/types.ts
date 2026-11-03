import { z } from 'zod';
import type { Scheme } from '../../engine-utils.js';
import type { Slide } from '../../../schema.js';
import type { ReactNode } from 'react';
import type { DensityProfile } from '../_shared/density-engine.js';

export type { DensityProfile };

export const booleanFromString = z
  .union([z.boolean(), z.string()])
  .transform((v) => v === true || v === 'true')
  .optional();

export interface LayoutProps<T extends Slide = Slide> {
  slide: T;
  scheme: Scheme;
  density?: DensityProfile;
}

export interface FrameProps {
  slide: Slide;
  scheme: Scheme;
  children: ReactNode;
  brandKit?: Record<string, string | undefined>;
  size?: { width: number; height: number };
  density?: DensityProfile;
}

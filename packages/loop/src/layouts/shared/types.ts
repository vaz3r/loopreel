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

export interface BrandKitConfig {
  bg?: string;
  text?: string;
  accent?: string;
  surface?: string;
  fontSerif?: string;
  fontSans?: string;
  fontMono?: string;
  wordmark?: string;
  handle?: string;
  wordmarkStyle?: 'serif' | 'sans' | 'mono' | 'small-caps';
  logoUrl?: string;
}

export interface FrameProps {
  slide: Slide;
  scheme: Scheme;
  children: ReactNode;
  brandKit?: BrandKitConfig;
  size?: { width: number; height: number };
  density?: DensityProfile;
}

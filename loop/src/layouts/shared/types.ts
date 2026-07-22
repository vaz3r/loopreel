import type { Scheme } from '../../engine-utils';
import type { Slide } from '../../../schema';

export interface LayoutProps<T extends Slide = Slide> {
  slide: T;
  scheme: Scheme;
}

export interface FrameProps {
  slide: Slide;
  scheme: Scheme;
  children: React.ReactNode;
  brandKit?: Record<string, string>;
  size?: { width: number; height: number };
}

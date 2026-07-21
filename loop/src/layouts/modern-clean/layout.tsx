import Frame from './frame';
import Cover from './cover';
import Definition from './definition';
import Dichotomy from './dichotomy';
import Timeline from './timeline';
import Quote from './quote';
import Sequence from './sequence';
import Telemetry from './telemetry';
import Table from './table';
import ImageSplit from './image-split';
import ImageCover from './image-cover';
import Cta from './cta';
import type { LayoutProps } from '../shared/types';
import type React from 'react';

const layouts: Record<string, React.ComponentType<LayoutProps>> = {
  cover: Cover, definition: Definition, dichotomy: Dichotomy,
  timeline: Timeline, quote: Quote, sequence: Sequence,
  telemetry: Telemetry, table: Table, 'image-split': ImageSplit,
  'image-cover': ImageCover, cta: Cta,
};

export { Frame };
export function getLayout(type: string): React.ComponentType<LayoutProps> {
  return layouts[type] ?? layouts.cover;
}

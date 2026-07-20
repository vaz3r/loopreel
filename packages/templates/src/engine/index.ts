export {
  CANVAS,
  SAFE_AREAS,
  REGMARKS,
  HEADER_ZONE,
  FOOTER_ZONE,
  getContentArea,
  getSafeAreaStyle,
  getCompactSafeAreaStyle,
  getMicroHeaderStyle,
  getMicroFooterStyle,
} from './layout.js';

export type { SafeAreaConfig, RegMarksConfig, ZoneConfig } from './layout.js';

export {
  getHeadlineFontSize,
  getBodyFontSize,
  getOverflowStyles,
  getHeadlineLineHeight,
} from './typography.js';

export {
  getImageFilter,
  getImageSplitStyles,
  getImageCoverStyles,
} from './images.js';

export type { ImageMood, ImageFilterConfig } from './images.js';

export {
  RegMarks,
  MicroHeader,
  MicroFooter,
  SafeArea,
} from './components.js';

export type {
  RegMarksProps,
  MicroHeaderProps,
  MicroFooterProps,
  SafeAreaProps,
} from './components.js';

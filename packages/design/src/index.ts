export type { PlatformFormat } from './platforms.js';

export {
  platforms,
  getPlatform,
  getPlatformIds,
} from './platforms.js';

export {
  gradients,
  patterns,
  getGradient,
  getPattern,
  getGradientsByCategory,
} from './backgrounds.js';

export type { GradientDef, PatternDef } from './backgrounds.js';

export {
  hexToRgba,
  spacing,
  clampFontSize,
  getCanvasPadding,
  meshGradient,
  noiseTexture,
  patterns as templatePatterns,
} from './template-utils.js';

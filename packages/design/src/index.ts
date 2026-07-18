export type {
  ColorPalette,
  TypographyConfig,
  LayoutConfig,
  BackgroundConfig,
  EffectsConfig,
  LayoutVariant,
  Template,
  PlatformFormat,
  SlideDesign,
  DesignOutput,
} from './types.js';

export {
  templates,
  getTemplate,
  getTemplateIds,
  getTemplatesByStyle,
} from './templates.js';

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

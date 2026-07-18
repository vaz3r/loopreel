// Color palette for a template
export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  muted: string;
}

// Typography configuration
export interface TypographyConfig {
  headingFont: string;
  bodyFont: string;
  headingWeight: number;
  bodyWeight: number;
  scale: number; // multiplier for font sizes
}

// Layout configuration
export interface LayoutConfig {
  padding: string;
  maxWidth: string;
  alignment: 'left' | 'center' | 'right';
}

// Background configuration
export interface BackgroundConfig {
  type: 'solid' | 'gradient' | 'pattern' | 'image';
  allowedTypes: Array<'solid' | 'gradient' | 'pattern' | 'image'>;
}

// Effects configuration
export interface EffectsConfig {
  shadows: boolean;
  borders: boolean;
  overlays: boolean;
  shapes: boolean;
  glass: boolean;
}

// Layout variant for a slide type
export interface LayoutVariant {
  id: string;
  name: string;
  alignment: 'left' | 'center' | 'right';
  splitRatio?: string; // e.g., "50/50", "60/40"
  shapes: string[];
  emphasis: 'small' | 'medium' | 'large';
}

// Complete template definition
export interface Template {
  id: string;
  name: string;
  description: string;
  colorPalette: ColorPalette;
  typography: TypographyConfig;
  layout: LayoutConfig;
  background: BackgroundConfig;
  effects: EffectsConfig;
  slideLayouts: {
    hook: LayoutVariant[];
    value: LayoutVariant[];
    cta: LayoutVariant[];
  };
}

// Platform format configuration
export interface PlatformFormat {
  id: string;
  name: string;
  width: number;
  height: number;
  maxSlides: number;
  safeZones: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  typographyScale: number;
}

// Complete design decision for a slide
export interface SlideDesign {
  index: number;
  layout: string;
  backgroundType: 'solid' | 'gradient' | 'pattern' | 'image';
  gradientType?: string;
  gradientColors?: string[];
  imageSearch?: string;
  imageBlur?: number;
  imageOverlay?: string;
  textAlignment: 'left' | 'center' | 'right';
  emphasis: 'small' | 'medium' | 'large';
  shapes: Array<{
    type: string;
    position: string;
    color?: string;
    opacity?: number;
  }>;
}

// Full design output from LLM
export interface DesignOutput {
  template: string;
  colorScheme: ColorPalette;
  slides: SlideDesign[];
}

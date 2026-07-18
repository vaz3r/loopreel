import type { Template } from './types.js';

export const modernBold: Template = {
  id: 'modern-bold',
  name: 'Modern Bold',
  description: 'Large typography, geometric accent shapes, high contrast',
  colorPalette: {
    primary: '#FF6B6B',
    secondary: '#4ECDC4',
    accent: '#45B7D1',
    background: '#1A1A2E',
    surface: '#232340',
    text: '#FFFFFF',
    muted: '#8888AA',
  },
  typography: {
    headingFont: 'Inter',
    bodyFont: 'Inter',
    headingWeight: 800,
    bodyWeight: 400,
    scale: 1.0,
  },
  layout: {
    padding: '60px 70px',
    maxWidth: '940px',
    alignment: 'left',
  },
  background: {
    type: 'gradient',
    allowedTypes: ['solid', 'gradient', 'image'],
  },
  effects: {
    shadows: true,
    borders: false,
    overlays: true,
    shapes: true,
    glass: false,
  },
  slideLayouts: {
    hook: [
      { id: 'hero-center', name: 'Hero Center', alignment: 'center', shapes: ['circle-top-right', 'circle-bottom-left'], emphasis: 'large' },
      { id: 'hero-left', name: 'Hero Left', alignment: 'left', shapes: ['triangle-right'], emphasis: 'large' },
    ],
    value: [
      { id: 'split-left', name: 'Split Left', alignment: 'left', splitRatio: '55/45', shapes: ['rectangle-accent'], emphasis: 'medium' },
      { id: 'split-right', name: 'Split Right', alignment: 'right', splitRatio: '45/55', shapes: ['circle-accent'], emphasis: 'medium' },
      { id: 'center-focus', name: 'Center Focus', alignment: 'center', shapes: [], emphasis: 'medium' },
    ],
    cta: [
      { id: 'cta-center', name: 'CTA Center', alignment: 'center', shapes: ['circle-center'], emphasis: 'large' },
      { id: 'cta-bottom', name: 'CTA Bottom', alignment: 'left', shapes: ['rectangle-bottom'], emphasis: 'medium' },
    ],
  },
};

export const minimalClean: Template = {
  id: 'minimal-clean',
  name: 'Minimal Clean',
  description: 'White space, thin fonts, subtle borders, muted palette',
  colorPalette: {
    primary: '#2D3436',
    secondary: '#636E72',
    accent: '#0984E3',
    background: '#FFFFFF',
    surface: '#F8F9FA',
    text: '#2D3436',
    muted: '#B2BEC3',
  },
  typography: {
    headingFont: 'Inter',
    bodyFont: 'Inter',
    headingWeight: 600,
    bodyWeight: 400,
    scale: 0.9,
  },
  layout: {
    padding: '80px 90px',
    maxWidth: '900px',
    alignment: 'left',
  },
  background: {
    type: 'solid',
    allowedTypes: ['solid', 'pattern'],
  },
  effects: {
    shadows: false,
    borders: true,
    overlays: false,
    shapes: false,
    glass: false,
  },
  slideLayouts: {
    hook: [
      { id: 'minimal-center', name: 'Minimal Center', alignment: 'center', shapes: ['line-bottom'], emphasis: 'large' },
      { id: 'minimal-left', name: 'Minimal Left', alignment: 'left', shapes: ['line-accent'], emphasis: 'large' },
    ],
    value: [
      { id: 'clean-left', name: 'Clean Left', alignment: 'left', shapes: ['line-separator'], emphasis: 'medium' },
      { id: 'clean-right', name: 'Clean Right', alignment: 'right', shapes: ['dot-accent'], emphasis: 'medium' },
      { id: 'clean-card', name: 'Clean Card', alignment: 'center', shapes: ['border-card'], emphasis: 'medium' },
    ],
    cta: [
      { id: 'cta-minimal', name: 'CTA Minimal', alignment: 'center', shapes: ['line-underline'], emphasis: 'large' },
    ],
  },
};

export const elegantLuxury: Template = {
  id: 'elegant-luxury',
  name: 'Elegant Luxury',
  description: 'Serif fonts, gold/metallic accents, dark backgrounds',
  colorPalette: {
    primary: '#C9A96E',
    secondary: '#8B6914',
    accent: '#D4AF37',
    background: '#1A1A1A',
    surface: '#2A2A2A',
    text: '#F5F5F5',
    muted: '#888888',
  },
  typography: {
    headingFont: 'Playfair Display',
    bodyFont: 'Inter',
    headingWeight: 700,
    bodyWeight: 400,
    scale: 1.1,
  },
  layout: {
    padding: '70px 80px',
    maxWidth: '920px',
    alignment: 'center',
  },
  background: {
    type: 'gradient',
    allowedTypes: ['solid', 'gradient', 'image'],
  },
  effects: {
    shadows: true,
    borders: true,
    overlays: true,
    shapes: false,
    glass: false,
  },
  slideLayouts: {
    hook: [
      { id: 'luxury-center', name: 'Luxury Center', alignment: 'center', shapes: ['gold-line'], emphasis: 'large' },
      { id: 'luxury-framed', name: 'Luxury Framed', alignment: 'center', shapes: ['gold-border'], emphasis: 'large' },
    ],
    value: [
      { id: 'elegant-left', name: 'Elegant Left', alignment: 'left', shapes: ['gold-accent'], emphasis: 'medium' },
      { id: 'elegant-center', name: 'Elegant Center', alignment: 'center', shapes: ['gold-divider'], emphasis: 'medium' },
    ],
    cta: [
      { id: 'cta-luxury', name: 'CTA Luxury', alignment: 'center', shapes: ['gold-border-bottom'], emphasis: 'large' },
    ],
  },
};

export const techGradient: Template = {
  id: 'tech-gradient',
  name: 'Tech Gradient',
  description: 'Mesh gradients, neon accents, futuristic feel',
  colorPalette: {
    primary: '#667EEA',
    secondary: '#764BA2',
    accent: '#F093FB',
    background: '#0F0C29',
    surface: '#1A1A3E',
    text: '#FFFFFF',
    muted: '#6C63FF',
  },
  typography: {
    headingFont: 'Inter',
    bodyFont: 'Inter',
    headingWeight: 700,
    bodyWeight: 400,
    scale: 1.0,
  },
  layout: {
    padding: '60px 70px',
    maxWidth: '940px',
    alignment: 'left',
  },
  background: {
    type: 'gradient',
    allowedTypes: ['gradient', 'image'],
  },
  effects: {
    shadows: true,
    borders: false,
    overlays: true,
    shapes: true,
    glass: true,
  },
  slideLayouts: {
    hook: [
      { id: 'tech-hero', name: 'Tech Hero', alignment: 'center', shapes: ['glow-circle', 'gradient-orb'], emphasis: 'large' },
      { id: 'tech-split', name: 'Tech Split', alignment: 'left', shapes: ['neon-line'], emphasis: 'large' },
    ],
    value: [
      { id: 'glass-card', name: 'Glass Card', alignment: 'left', shapes: ['glass-panel'], emphasis: 'medium' },
      { id: 'gradient-panel', name: 'Gradient Panel', alignment: 'center', shapes: ['gradient-overlay'], emphasis: 'medium' },
      { id: 'neon-focus', name: 'Neon Focus', alignment: 'left', shapes: ['neon-border'], emphasis: 'medium' },
    ],
    cta: [
      { id: 'cta-glow', name: 'CTA Glow', alignment: 'center', shapes: ['glow-ring'], emphasis: 'large' },
    ],
  },
};

export const organicNatural: Template = {
  id: 'organic-natural',
  name: 'Organic Natural',
  description: 'Soft rounded shapes, earth tones, nature-inspired',
  colorPalette: {
    primary: '#2D6A4F',
    secondary: '#52B788',
    accent: '#95D5B2',
    background: '#F0F7F4',
    surface: '#D8F3DC',
    text: '#1B4332',
    muted: '#74C69D',
  },
  typography: {
    headingFont: 'Inter',
    bodyFont: 'Inter',
    headingWeight: 700,
    bodyWeight: 400,
    scale: 1.0,
  },
  layout: {
    padding: '70px 80px',
    maxWidth: '920px',
    alignment: 'left',
  },
  background: {
    type: 'solid',
    allowedTypes: ['solid', 'gradient', 'image'],
  },
  effects: {
    shadows: true,
    borders: false,
    overlays: false,
    shapes: true,
    glass: false,
  },
  slideLayouts: {
    hook: [
      { id: 'organic-center', name: 'Organic Center', alignment: 'center', shapes: ['blob-top', 'blob-bottom'], emphasis: 'large' },
    ],
    value: [
      { id: 'nature-left', name: 'Nature Left', alignment: 'left', shapes: ['leaf-accent'], emphasis: 'medium' },
      { id: 'nature-card', name: 'Nature Card', alignment: 'center', shapes: ['rounded-card'], emphasis: 'medium' },
    ],
    cta: [
      { id: 'cta-organic', name: 'CTA Organic', alignment: 'center', shapes: ['blob-center'], emphasis: 'large' },
    ],
  },
};

export const corporateSharp: Template = {
  id: 'corporate-sharp',
  name: 'Corporate Sharp',
  description: 'Clean lines, blue/navy tones, structured grid',
  colorPalette: {
    primary: '#003366',
    secondary: '#0066CC',
    accent: '#00A3E0',
    background: '#FFFFFF',
    surface: '#F2F6FA',
    text: '#1A1A2E',
    muted: '#6B7B8D',
  },
  typography: {
    headingFont: 'Inter',
    bodyFont: 'Inter',
    headingWeight: 700,
    bodyWeight: 400,
    scale: 0.95,
  },
  layout: {
    padding: '60px 70px',
    maxWidth: '940px',
    alignment: 'left',
  },
  background: {
    type: 'solid',
    allowedTypes: ['solid', 'gradient'],
  },
  effects: {
    shadows: false,
    borders: true,
    overlays: false,
    shapes: false,
    glass: false,
  },
  slideLayouts: {
    hook: [
      { id: 'corporate-hero', name: 'Corporate Hero', alignment: 'left', shapes: ['navy-bar'], emphasis: 'large' },
      { id: 'corporate-center', name: 'Corporate Center', alignment: 'center', shapes: ['blue-underline'], emphasis: 'large' },
    ],
    value: [
      { id: 'structured-left', name: 'Structured Left', alignment: 'left', shapes: ['border-left'], emphasis: 'medium' },
      { id: 'grid-card', name: 'Grid Card', alignment: 'center', shapes: ['grid-lines'], emphasis: 'medium' },
    ],
    cta: [
      { id: 'cta-corporate', name: 'CTA Corporate', alignment: 'center', shapes: ['navy-bottom-bar'], emphasis: 'large' },
    ],
  },
};

export const creativePop: Template = {
  id: 'creative-pop',
  name: 'Creative Pop',
  description: 'Bold asymmetric layouts, vibrant colors, playful',
  colorPalette: {
    primary: '#FF006E',
    secondary: '#FB5607',
    accent: '#FFBE0B',
    background: '#FFFFFF',
    surface: '#FFF3E0',
    text: '#1A1A2E',
    muted: '#FF85A1',
  },
  typography: {
    headingFont: 'Inter',
    bodyFont: 'Inter',
    headingWeight: 800,
    bodyWeight: 400,
    scale: 1.1,
  },
  layout: {
    padding: '60px 70px',
    maxWidth: '940px',
    alignment: 'left',
  },
  background: {
    type: 'solid',
    allowedTypes: ['solid', 'gradient', 'pattern'],
  },
  effects: {
    shadows: true,
    borders: false,
    overlays: false,
    shapes: true,
    glass: false,
  },
  slideLayouts: {
    hook: [
      { id: 'pop-hero', name: 'Pop Hero', alignment: 'left', shapes: ['circle-accent', 'triangle-accent'], emphasis: 'large' },
      { id: 'pop-diagonal', name: 'Pop Diagonal', alignment: 'center', shapes: ['diagonal-stripe'], emphasis: 'large' },
    ],
    value: [
      { id: 'playful-left', name: 'Playful Left', alignment: 'left', shapes: ['dot-grid'], emphasis: 'medium' },
      { id: 'color-block', name: 'Color Block', alignment: 'center', shapes: ['color-block-accent'], emphasis: 'medium' },
    ],
    cta: [
      { id: 'cta-pop', name: 'CTA Pop', alignment: 'center', shapes: ['starburst'], emphasis: 'large' },
    ],
  },
};

export const premiumDark: Template = {
  id: 'premium-dark',
  name: 'Premium Dark',
  description: 'Dark backgrounds with glow effects, glassmorphism',
  colorPalette: {
    primary: '#A855F7',
    secondary: '#6366F1',
    accent: '#EC4899',
    background: '#09090B',
    surface: '#18181B',
    text: '#FAFAFA',
    muted: '#71717A',
  },
  typography: {
    headingFont: 'Inter',
    bodyFont: 'Inter',
    headingWeight: 700,
    bodyWeight: 400,
    scale: 1.0,
  },
  layout: {
    padding: '60px 70px',
    maxWidth: '940px',
    alignment: 'left',
  },
  background: {
    type: 'gradient',
    allowedTypes: ['solid', 'gradient', 'image'],
  },
  effects: {
    shadows: true,
    borders: false,
    overlays: true,
    shapes: true,
    glass: true,
  },
  slideLayouts: {
    hook: [
      { id: 'premium-hero', name: 'Premium Hero', alignment: 'center', shapes: ['glow-orb', 'glass-panel'], emphasis: 'large' },
      { id: 'premium-split', name: 'Premium Split', alignment: 'left', shapes: ['gradient-bar'], emphasis: 'large' },
    ],
    value: [
      { id: 'glass-card', name: 'Glass Card', alignment: 'left', shapes: ['glass-card'], emphasis: 'medium' },
      { id: 'glow-focus', name: 'Glow Focus', alignment: 'center', shapes: ['glow-ring'], emphasis: 'medium' },
      { id: 'dark-panel', name: 'Dark Panel', alignment: 'left', shapes: ['dark-gradient-panel'], emphasis: 'medium' },
    ],
    cta: [
      { id: 'cta-premium', name: 'CTA Premium', alignment: 'center', shapes: ['glass-cta'], emphasis: 'large' },
    ],
  },
};

// All templates indexed by ID
export const templates: Record<string, Template> = {
  'modern-bold': modernBold,
  'minimal-clean': minimalClean,
  'elegant-luxury': elegantLuxury,
  'tech-gradient': techGradient,
  'organic-natural': organicNatural,
  'corporate-sharp': corporateSharp,
  'creative-pop': creativePop,
  'premium-dark': premiumDark,
};

// Get template by ID
export function getTemplate(id: string): Template | undefined {
  return templates[id];
}

// Get all template IDs
export function getTemplateIds(): string[] {
  return Object.keys(templates);
}

// Get templates by style direction
export function getTemplatesByStyle(style: string): Template[] {
  return Object.values(templates).filter(t =>
    t.id.includes(style) ||
    t.name.toLowerCase().includes(style)
  );
}

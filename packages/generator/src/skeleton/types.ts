import React from 'react';

export interface BrandTokens {
  name: string;
  slug: string;
  vibe: string;
  domain: string;
  platform?: string;
  palette: {
    paper: string;       // Canvas background
    ink: string;         // Primary text
    accent: string;      // Visual highlight (crimson, vermilion, cobalt)
    surface: string;     // Nested cards / panels
    border: string;      // Borders & separators
    subtle?: string;     // Secondary muted text
  };
  typography: {
    headlineFont: string;
    bodyFont: string;
    monoFont: string;
    googleFontsUrl: string;
  };
  wordmark: string;
  wordmarkStyle: 'serif' | 'sans' | 'mono' | 'small-caps';
  handle: string;
  texture: 'washi' | 'grid' | 'dots' | 'blueprint' | 'none';
  motif: 'seal' | 'crosshair' | 'coord' | 'bracket' | 'none';
}

export interface SlideData {
  id: string;
  index: number;
  type: string;
  platform?: string;
  title?: string;
  headline?: string;
  subheadline?: string;
  tag?: string;
  kicker?: string;
  authorName?: string;
  authorRole?: string;
  visualStyle?: string;
  layoutTopology?: string;
  svgBlueprint?: string;
  items?: any;
  points?: any;
  metrics?: any;
  timeline?: any;
  specs?: any;
  callouts?: any;
  [key: string]: any;
}

export interface DeckData {
  templateName: string;
  templateSlug: string;
  domain: string;
  platform?: string;
  slides: SlideData[];
}

export interface SlideComponentProps {
  slide: SlideData;
  brand: BrandTokens;
  totalSlides: number;
  platform?: string;
}

export type SlideComponent = React.ComponentType<SlideComponentProps>;

export interface TemplatePackage {
  brand: BrandTokens;
  deck: DeckData;
  slides: SlideComponent[];
}

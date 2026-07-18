// Gradient definitions for backgrounds
export interface GradientDef {
  id: string;
  name: string;
  css: string;
  colors: string[];
}

export const gradients: GradientDef[] = [
  // Mesh gradients
  { id: 'mesh-1', name: 'Cosmic Purple', css: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', colors: ['#667eea', '#764ba2'] },
  { id: 'mesh-2', name: 'Sunset Glow', css: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', colors: ['#f093fb', '#f5576c'] },
  { id: 'mesh-3', name: 'Ocean Blue', css: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', colors: ['#4facfe', '#00f2fe'] },
  { id: 'mesh-4', name: 'Emerald Coast', css: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', colors: ['#43e97b', '#38f9d7'] },
  { id: 'mesh-5', name: 'Peach Sunset', css: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', colors: ['#fa709a', '#fee140'] },
  { id: 'mesh-6', name: 'Night Sky', css: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)', colors: ['#0f0c29', '#302b63', '#24243e'] },
  { id: 'mesh-7', name: 'Northern Lights', css: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', colors: ['#a8edea', '#fed6e3'] },
  { id: 'mesh-8', name: 'Deep Ocean', css: 'linear-gradient(135deg, #2c3e50 0%, #4ca1af 100%)', colors: ['#2c3e50', '#4ca1af'] },
  { id: 'mesh-9', name: 'Warm Flame', css: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', colors: ['#ff9a9e', '#fecfef'] },
  { id: 'mesh-10', name: 'Cool Blues', css: 'linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)', colors: ['#2193b0', '#6dd5ed'] },

  // Dark gradients
  { id: 'dark-1', name: 'Midnight', css: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)', colors: ['#1a1a2e', '#16213e', '#0f3460'] },
  { id: 'dark-2', name: 'Dark Purple', css: 'linear-gradient(135deg, #200122 0%, #6f0000 100%)', colors: ['#200122', '#6f0000'] },
  { id: 'dark-3', name: 'Dark Blue', css: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)', colors: ['#0f2027', '#203a43', '#2c5364'] },
  { id: 'dark-4', name: 'Dark Green', css: 'linear-gradient(135deg, #0a2e1a 0%, #1a4a3a 100%)', colors: ['#0a2e1a', '#1a4a3a'] },
  { id: 'dark-5', name: 'Dark Gold', css: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 50%, #3a3a3a 100%)', colors: ['#1a1a1a', '#2a2a2a', '#3a3a3a'] },

  // Vibrant gradients
  { id: 'vibrant-1', name: 'Electric Blue', css: 'linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)', colors: ['#00d2ff', '#3a7bd5'] },
  { id: 'vibrant-2', name: 'Neon Pink', css: 'linear-gradient(135deg, #ff0099 0%, #493210 100%)', colors: ['#ff0099', '#493210'] },
  { id: 'vibrant-3', name: 'Cyber Yellow', css: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)', colors: ['#f7971e', '#ffd200'] },
  { id: 'vibrant-4', name: 'Hot Magenta', css: 'linear-gradient(135deg, #ff0844 0%, #ffb199 100%)', colors: ['#ff0844', '#ffb199'] },

  // Subtle gradients
  { id: 'subtle-1', name: 'Light Gray', css: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', colors: ['#f5f7fa', '#c3cfe2'] },
  { id: 'subtle-2', name: 'Warm White', css: 'linear-gradient(135deg, #fffbf0 0%, #f0e6d3 100%)', colors: ['#fffbf0', '#f0e6d3'] },
  { id: 'subtle-3', name: 'Cool White', css: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)', colors: ['#e0eafc', '#cfdef3'] },
];

// Pattern definitions (CSS-only)
export interface PatternDef {
  id: string;
  name: string;
  css: string;
}

export const patterns: PatternDef[] = [
  // Dot patterns
  { id: 'dots-1', name: 'Dots Small', css: 'radial-gradient(circle, #666 1px, transparent 1px)' },
  { id: 'dots-2', name: 'Dots Large', css: 'radial-gradient(circle, #888 2px, transparent 2px)' },
  { id: 'dots-3', name: 'Dots Accent', css: 'radial-gradient(circle, var(--accent, #e94560) 2px, transparent 2px)' },

  // Line patterns
  { id: 'lines-1', name: 'Horizontal Lines', css: 'repeating-linear-gradient(0deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 11px)' },
  { id: 'lines-2', name: 'Vertical Lines', css: 'repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 11px)' },
  { id: 'lines-3', name: 'Diagonal Lines', css: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 11px)' },

  // Grid patterns
  { id: 'grid-1', name: 'Grid Small', css: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)' },
  { id: 'grid-2', name: 'Grid Large', css: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)' },

  // Wave patterns
  { id: 'waves-1', name: 'Waves', css: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1440 320\'%3E%3Cpath fill=\'rgba(255,255,255,0.05)\' d=\'M0,192L48,197.3C96,203,192,213,288,202.7C384,192,480,160,576,165.3C672,171,768,213,864,218.7C960,224,1056,192,1152,181.3C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z\'%3E%3C/path%3E%3C/svg%3E")' },

  // Noise texture
  { id: 'noise-1', name: 'Noise', css: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' },
];

export function getGradient(id: string): GradientDef | undefined {
  return gradients.find(g => g.id === id);
}

export function getPattern(id: string): PatternDef | undefined {
  return patterns.find(p => p.id === id);
}

export function getGradientsByCategory(category: 'mesh' | 'dark' | 'vibrant' | 'subtle'): GradientDef[] {
  return gradients.filter(g => g.id.startsWith(category));
}

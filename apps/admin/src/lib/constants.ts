export const PLATFORM_LABELS: Record<string, string> = {
  'instagram-feed': 'Instagram Carousel (4:5)',
  'instagram-stories': 'Instagram Stories (9:16)',
  'instagram-square': 'Instagram Square (1:1)',
  linkedin: 'LinkedIn Carousel PDF (4:5)',
  pinterest: 'Pinterest Pin (2:3)',
  x: 'X / Twitter',
  facebook: 'Facebook',
};

export const TEMPLATE_LABELS: Record<string, string> = {
  auto: 'Auto (AI Dynamic Classifier)',
  chameleon: 'Chameleon (Dynamic AI Parametric Engine)',
  'paper-of-record': 'The Paper of Record (Broadsheet)',
  'the-globalist': 'The Globalist (Newsprint Digest)',
  'the-curator': 'The Curator (Minimalist Gallery)',
  'the-academic': 'The Academic (Research Paper)',
  'the-signal': 'The Signal (Modern B2B / Tech)',
  'the-field-notes': 'The Field Notes (Notebook Journal)',
};

export const STATUS_FLOW = [
  'queued',
  'ingesting',
  'transcribing',
  'structuring',
  'rendering',
  'complete',
] as const;

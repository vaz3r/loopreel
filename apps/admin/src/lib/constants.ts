export const PLATFORM_LABELS: Record<string, string> = {
  'instagram-feed': 'Instagram Feed',
  'instagram-square': 'Instagram Square',
  'instagram-stories': 'Instagram Stories',
  linkedin: 'LinkedIn',
  x: 'X / Twitter',
  facebook: 'Facebook',
};

export const TEMPLATE_LABELS: Record<string, string> = {
  auto: 'Auto (AI Selects)',
  'paper-of-record': 'Paper of Record',
  'the-globalist': 'The Globalist',
  'the-terminal': 'The Terminal',
  'the-curator': 'The Curator',
  'the-academic': 'The Academic',
};

export const STATUS_COLORS: Record<string, string> = {
  queued: 'bg-gray-600 text-gray-100',
  ingesting: 'bg-blue-600 text-blue-100',
  transcribing: 'bg-violet-600 text-violet-100',
  structuring: 'bg-amber-600 text-amber-100',
  rendering: 'bg-pink-600 text-pink-100',
  complete: 'bg-emerald-600 text-emerald-100',
  failed: 'bg-red-600 text-red-100',
};

export const STATUS_FLOW = [
  'queued',
  'ingesting',
  'transcribing',
  'structuring',
  'rendering',
  'complete',
] as const;

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

export const STATUS_COLORS: Record<string, { label: string; classes: string }> = {
  queued: { label: 'Queued', classes: 'bg-gray-600 text-gray-100' },
  ingesting: { label: 'Ingesting', classes: 'bg-blue-600 text-blue-100' },
  transcribing: { label: 'Transcribing', classes: 'bg-violet-600 text-violet-100' },
  structuring: { label: 'Structuring', classes: 'bg-amber-600 text-amber-100' },
  rendering: { label: 'Rendering', classes: 'bg-pink-600 text-pink-100' },
  complete: { label: 'Complete', classes: 'bg-emerald-600 text-emerald-100' },
  failed: { label: 'Failed', classes: 'bg-red-600 text-red-100' },
};

export const STATUS_FLOW = [
  'queued',
  'ingesting',
  'transcribing',
  'structuring',
  'rendering',
  'complete',
] as const;

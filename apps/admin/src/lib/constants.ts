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

export const STATUS_FLOW = [
  'queued',
  'ingesting',
  'transcribing',
  'structuring',
  'rendering',
  'complete',
] as const;

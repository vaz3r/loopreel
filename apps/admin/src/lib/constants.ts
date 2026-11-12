export const PLATFORM_LABELS: Record<string, string> = {
  'instagram-feed': 'Instagram Carousel (4:5)',
  'instagram-stories': 'Instagram Stories (9:16)',
  'instagram-square': 'Instagram Square (1:1)',
  linkedin: 'LinkedIn Carousel PDF (4:5)',
  pinterest: 'Pinterest Pin (2:3)',
  x: 'X / Twitter',
  facebook: 'Facebook',
};

export const STATUS_FLOW = [
  'queued',
  'ingesting',
  'transcribing',
  'structuring',
  'complete',
] as const;

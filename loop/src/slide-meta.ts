export const SLIDE_META = {
  cover: {
    label: 'Cover Slide',
    description: 'Opening slide with headline and subheadline. Sets the visual tone for the carousel.',
    fields: {
      tag:        { type: 'string', min: 0,  max: 30,  required: true,  desc: 'Small uppercase label above the headline (e.g. "PROTOCOL 01" or "CHAPTER ONE").' },
      headline:   { type: 'string', min: 3,  max: 60,  required: true,  desc: 'Main headline. The single most important text. Keep it punchy.' },
      subheadline:{ type: 'string', min: 0,  max: 200, required: true,  desc: 'Supporting text that expands on the headline. One to two sentences.' },
      metadata:   { type: 'string', min: 0,  max: 40,  required: false, desc: 'Small metadata text at the bottom. Optional (e.g. "VOL. 04 — STRATEGY").' },
    },
  },
  definition: {
    label: 'Definition Slide',
    description: 'Defines a key term with phonetic pronunciation, definition text, and an optional usage example.',
    fields: {
      tag:       { type: 'string', min: 0,  max: 30,  required: true,  desc: 'Small uppercase label (e.g. "LEXICON // 01" or "TERM // 01").' },
      term:      { type: 'string', min: 1,  max: 40,  required: true,  desc: 'The word or phrase being defined.' },
      phonetic:  { type: 'string', min: 0,  max: 40,  required: true,  desc: 'Phonetic pronunciation (e.g. "/ˈfrikSH(ə)n/"). Use IPA notation.' },
      definition:{ type: 'string', min: 10, max: 500, required: true,  desc: 'The full definition. Two to four sentences. Explain the term clearly.' },
      example:   { type: 'string', min: 0,  max: 200, required: false, desc: 'Optional usage example. Start with "e.g.," (e.g. "e.g., A no-questions-asked return policy.").' },
    },
  },
  dichotomy: {
    label: 'Dichotomy / Comparison Slide',
    description: 'Compares two opposing concepts side by side. Each gets a title and description.',
    fields: {
      tag:    { type: 'string', min: 0,  max: 30,  required: true,  desc: 'Small uppercase label (e.g. "STRATEGIC POLARITY" or "COMPARISON").' },
      headline: { type: 'string', min: 3, max: 60, required: true, desc: 'The overarching comparison title (e.g. "Volume vs. Value" or "Narrow AI vs. General AI").' },
      left:   { type: 'object', required: true, fields: {
        title: { type: 'string', min: 1,  max: 30,  required: true, desc: 'Title for the left-side concept.' },
        desc:  { type: 'string', min: 0,  max: 200, required: true, desc: 'Description of the left-side concept. One to two sentences.' },
      }, desc: 'Left-side concept in the comparison.' },
      right:  { type: 'object', required: true, fields: {
        title: { type: 'string', min: 1,  max: 30,  required: true, desc: 'Title for the right-side concept.' },
        desc:  { type: 'string', min: 0,  max: 200, required: true, desc: 'Description of the right-side concept. One to two sentences.' },
      }, desc: 'Right-side concept in the comparison.' },
    },
  },
  timeline: {
    label: 'Timeline Slide',
    description: 'Shows a sequence of events in chronological order. Each event has a date, title, and description.',
    fields: {
      tag:      { type: 'string', min: 0,  max: 30,  required: true,  desc: 'Small uppercase label (e.g. "EVOLUTION" or "HISTORY").' },
      headline: { type: 'string', min: 3,  max: 60,  required: true,  desc: 'Title for the timeline (e.g. "The AI Timeline" or "The Creator Arc").' },
      events:   { type: 'array', minItems: 1, maxItems: 12, required: true, desc: 'List of events in chronological order.', fields: {
        date:  { type: 'string', min: 0,  max: 30,  required: true, desc: 'Date label (e.g. "2012", "WEEK 1", "PHASE 03").' },
        title: { type: 'string', min: 1,  max: 30,  required: true, desc: 'Short event title.' },
        desc:  { type: 'string', min: 0,  max: 150, required: true, desc: 'One-sentence description of the event.' },
      }},
    },
  },
  quote: {
    label: 'Quote Slide',
    description: 'A notable quote with attribution. Author and role displayed below the quote.',
    fields: {
      tag:    { type: 'string', min: 0,  max: 30,  required: true,  desc: 'Small uppercase label (e.g. "WISDOM" or "VOICES").' },
      quote:  { type: 'string', min: 10, max: 400, required: true,  desc: 'The quote text itself. One to four sentences.' },
      author: { type: 'string', min: 1,  max: 40,  required: true,  desc: 'Name of the person being quoted.' },
      role:   { type: 'string', min: 0,  max: 40,  required: false, desc: 'Role/title of the person (e.g. "CEO, Company").' },
    },
  },
  sequence: {
    label: 'Sequence / Steps Slide',
    description: 'A numbered list of steps or items. Each item has a number, title, and description.',
    fields: {
      tag:      { type: 'string', min: 0,  max: 30,  required: true,  desc: 'Small uppercase label (e.g. "PROCESS" or "FRAMEWORK").' },
      headline: { type: 'string', min: 3,  max: 60,  required: true,  desc: 'Title for the sequence (e.g. "The 3-Step Framework").' },
      items:    { type: 'array', minItems: 1, maxItems: 12, required: true, desc: 'List of steps or items in order.', fields: {
        num:   { type: 'string', min: 1,  max: 4,   required: true, desc: 'Step number (e.g. "1", "01", "STEP 1").' },
        title: { type: 'string', min: 1,  max: 30,  required: true, desc: 'Short title for this step.' },
        desc:  { type: 'string', min: 0,  max: 150, required: true, desc: 'One-sentence description of this step.' },
      }},
    },
  },
  telemetry: {
    label: 'Telemetry / Stats Slide',
    description: 'Displays key metrics or statistics in a grid. Each stat has a large value and descriptive label.',
    fields: {
      tag:      { type: 'string', min: 0,  max: 30,  required: true,  desc: 'Small uppercase label (e.g. "METRICS" or "BENCHMARK").' },
      headline: { type: 'string', min: 3,  max: 60,  required: true,  desc: 'Title for the stats section (e.g. "The Growth Stack").' },
      stats:    { type: 'array', minItems: 1, maxItems: 12, required: true, desc: 'List of statistics.', fields: {
        value: { type: 'string', min: 1,  max: 20,  required: true, desc: 'The metric value (e.g. "87%", "3.2x", "12min").' },
        label: { type: 'string', min: 1,  max: 40,  required: true, desc: 'Label describing what the metric measures (e.g. "Engagement Rate", "Avg. Study Time").' },
      }},
    },
  },
  table: {
    label: 'Table / Comparison Grid Slide',
    description: 'A structured table with header row and data rows. Best for comparing multiple items across criteria.',
    fields: {
      tag:      { type: 'string', min: 0,  max: 30,  required: true,  desc: 'Small uppercase label (e.g. "COMPARISON" or "BENCHMARK").' },
      headline: { type: 'string', min: 3,  max: 60,  required: true,  desc: 'Title for the table (e.g. "Platform Performance" or "Feature Matrix").' },
      headers:  { type: 'array', minItems: 2, maxItems: 6, required: true, desc: 'Column headers. Array of strings.', fields: {
        '': { type: 'string', min: 1, max: 30, required: true, desc: 'Column header text.' },
      }},
      rows:     { type: 'array', minItems: 1, maxItems: 15, required: true, desc: 'Data rows. Each row has one cell per header.', fields: {
        '': { type: 'string', min: 1, max: 50, required: true, desc: 'Cell text for this row/column intersection.' },
      }},
    },
  },
  'image-split': {
    label: 'Image Split Slide',
    description: 'A split-layout slide with an image on one side and text on the other. Image URL required.',
    fields: {
      tag:      { type: 'string', min: 0,  max: 30,  required: true,  desc: 'Small uppercase label (e.g. "VISUAL STUDY" or "CASE STUDY").' },
      headline: { type: 'string', min: 3,  max: 60,  required: true,  desc: 'Headline on the text side.' },
      bodyText: { type: 'string', min: 0,  max: 200, required: true,  desc: 'Body text on the text side. One to three sentences.' },
      imageUrl: { type: 'string', min: 0,  max: 2000, required: true, desc: 'Full URL to the image (must be publicly accessible or a data URL).' },
    },
  },
  'image-cover': {
    label: 'Image Cover Slide',
    description: 'A full-bleed image with text overlay. Dramatic hero-style slide.',
    fields: {
      tag:      { type: 'string', min: 0,  max: 30,  required: true,  desc: 'Small uppercase label (e.g. "VISUAL ESSAY" or "CASE STUDY").' },
      headline: { type: 'string', min: 3,  max: 60,  required: true,  desc: 'Headline overlaid on the image.' },
      subtext:  { type: 'string', min: 0,  max: 200, required: true,  desc: 'Subtitle or supporting text overlaid on the image.' },
      imageUrl: { type: 'string', min: 0,  max: 2000, required: true, desc: 'Full URL to the background image (must be publicly accessible).' },
    },
  },
  cta: {
    label: 'Call to Action Slide',
    description: 'Closing slide with a strong headline, call-to-action button, and social handle.',
    fields: {
      tag:         { type: 'string', min: 0,  max: 30,  required: true,  desc: 'Small uppercase label (e.g. "FINALE" or "JOIN US").' },
      headline:    { type: 'string', min: 3,  max: 60,  required: true,  desc: 'Final headline. Compelling and action-oriented.' },
      subtext:     { type: 'string', min: 0,  max: 200, required: true,  desc: 'Supporting text before the CTA button.' },
      actionLabel: { type: 'string', min: 1,  max: 40,  required: true,  desc: 'Button text (e.g. "GET STARTED", "FOLLOW US").' },
      socialHandle:{ type: 'string', min: 0,  max: 30,  required: false, desc: 'Social media handle (e.g. "@brandname").' },
    },
  },
} as const;

export const FOOTER_META = {
  footerLeft:  { type: 'string', min: 0, max: 40, required: false, desc: 'Left footer text (e.g. chapter name or section label).' },
  footerRight: { type: 'string', min: 0, max: 40, required: false, desc: 'Right footer text (e.g. page number).' },
} as const;

export const SLIDE_TYPES = Object.keys(SLIDE_META) as (keyof typeof SLIDE_META)[];
export const SLIDE_TYPE_COUNT = SLIDE_TYPES.length;

export function getSlideTypeMeta(type: keyof typeof SLIDE_META) {
  return SLIDE_META[type];
}

export function buildPromptForSlideTypes(): string {
  let prompt = 'AVAILABLE SLIDE TYPES:\n\n';
  for (const [type, meta] of Object.entries(SLIDE_META)) {
    prompt += `${type.toUpperCase()} — ${meta.description}\n`;
    prompt += '  Fields:\n';
    for (const [name, field] of Object.entries(meta.fields)) {
      if (field.type === 'object') {
        prompt += `    ${name}: {}\n`;
        if ('fields' in field) {
          for (const [subName, subField] of Object.entries(field.fields!)) {
            const required = subField.required ? '' : ' (optional)';
            prompt += `      ${subName}: ${subField.type}[${subField.min}-${subField.max}]${required} — ${subField.desc}\n`;
          }
        }
      } else if (field.type === 'array') {
        prompt += `    ${name}[]: ${field.minItems}-${field.maxItems} items\n`;
        if ('fields' in field) {
          for (const [subName, subField] of Object.entries(field.fields!)) {
            const required = subField.required ? '' : ' (optional)';
            prompt += `      ${subName}: ${subField.type}[${subField.min}-${subField.max}]${required} — ${subField.desc}\n`;
          }
        }
      } else {
        const required = field.required ? '' : ' (optional)';
        prompt += `    ${name}: ${field.type}[${field.min}-${field.max}]${required} — ${field.desc}\n`;
      }
    }
    prompt += '\n';
  }
  return prompt;
}

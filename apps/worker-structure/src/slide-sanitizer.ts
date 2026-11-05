export const VALID_SLIDE_TYPES = [
  'cover', 'sequence', 'image-split', 'telemetry', 'interview', 'quadrant',
  'case-study', 'myth-fact', 'resource-grid', 'timeline', 'quote', 'cta',
  'profile', 'analysis', 'definition', 'dichotomy', 'table', 'breakdown',
  'juxtaposition', 'methodology', 'hero-metric', 'checklist',
  // The Field Notes specific slide types
  'statement', 'list', 'specimen', 'measure', 'tally', 'route', 'log',
  'compare', 'chart', 'map', 'entry', 'qa', 'kit',
];

const TYPE_MAP: Record<string, string> = {
  'hero-metric': 'telemetry',
  'hero': 'telemetry',
  'metric': 'telemetry',
  'stats': 'telemetry',
  'data': 'telemetry',
  'comparison': 'compare',
  'dichotomy': 'compare',
  'vs': 'compare',
  'checklist': 'kit',
  'resources': 'resource-grid',
  'steps': 'sequence',
  'pros-cons': 'compare',
  'proscons': 'compare',
  'myth': 'myth-fact',
  'fact': 'myth-fact',
  'debunk': 'myth-fact',
  'expert': 'qa',
  'q&a': 'qa',
  'interview-slide': 'interview',
};

export function sanitizeSlides(slides: Record<string, unknown>[]): Record<string, unknown>[] {
  return slides
    .filter((s) => typeof s === 'object' && s !== null)
    .map((slide) => {
      let type = String(slide.type ?? '');

      if (!VALID_SLIDE_TYPES.includes(type)) {
        const mapped = TYPE_MAP[type.toLowerCase()];
        type = mapped ?? 'sequence';
      }

      const fixed: Record<string, unknown> = { ...slide, type };

      // Fix string fields that the LLM wraps in objects
      const stringFields = [
        'headline', 'subheadline', 'tag', 'myth', 'fact', 'quote',
        'respondentName', 'respondentRole', 'author', 'role', 'credit', 'bodyText',
        'subtext', 'actionLabel', 'socialHandle', 'term', 'definition', 'pos', 'pron',
        'found', 'scribble', 'note', 'question', 'answer', 'by', 'sign', 'text', 'value', 'unit',
      ];
      for (const field of stringFields) {
        if (fixed[field] && typeof fixed[field] === 'object') {
          const obj = fixed[field] as Record<string, unknown>;
          fixed[field] = obj.title ?? obj.text ?? obj.name ?? obj.value ?? JSON.stringify(obj);
        }
      }

      // Ensure compare slides have left and right objects
      if (type === 'compare') {
        if (!fixed.left || typeof fixed.left !== 'object') {
          fixed.left = { label: 'Before', items: ['Traditional paradigm'] };
        } else {
          const leftObj = fixed.left as Record<string, unknown>;
          if (!leftObj.label) leftObj.label = 'Before';
          if (!Array.isArray(leftObj.items)) {
            leftObj.items = [leftObj.desc || leftObj.text || leftObj.title || 'Observation A'];
          }
        }
        if (!fixed.right || typeof fixed.right !== 'object') {
          fixed.right = { label: 'After', items: ['Reflective paradigm'] };
        } else {
          const rightObj = fixed.right as Record<string, unknown>;
          if (!rightObj.label) rightObj.label = 'After';
          if (!Array.isArray(rightObj.items)) {
            rightObj.items = [rightObj.desc || rightObj.text || rightObj.title || 'Observation B'];
          }
        }
      }

      // Ensure tally slides have items array
      if (type === 'tally') {
        const rawItems = fixed.items || fixed.stats || fixed.metrics;
        if (!Array.isArray(rawItems) || rawItems.length === 0) {
          fixed.items = [
            { value: '1', label: 'Finding', desc: String(fixed.headline || 'Core observation') }
          ];
        }
      }

      // Ensure statement slides have non-empty text
      if (type === 'statement' && !fixed.text) {
        fixed.text = fixed.headline || fixed.subheadline || 'Substantive field observation.';
      }

      // Ensure entry slides have non-empty text
      if (type === 'entry' && !fixed.text) {
        fixed.text = fixed.headline || fixed.subheadline || 'Substantive journal entry reflection recorded in the field.';
      }

      // Ensure specimen slides have term and definition
      if (type === 'specimen') {
        if (!fixed.term) fixed.term = fixed.headline || fixed.title || 'Concept';
        if (!fixed.definition) fixed.definition = fixed.text || fixed.desc || 'Methodological paradigm definition.';
      }

      // Ensure sequence / list slides have non-empty items
      if (type === 'sequence' || type === 'list') {
        const rawItems = fixed.items || fixed.steps;
        if (!Array.isArray(rawItems) || rawItems.length === 0) {
          fixed.items = [
            { num: '1', title: String(fixed.headline || 'Key Observation'), desc: String(fixed.subheadline || fixed.text || 'Core methodological finding documented in research.') }
          ];
        }
      }

      // Ensure quadrant slides have required fields
      if (type === 'quadrant') {
        for (const corner of ['topLeft', 'topRight', 'bottomLeft', 'bottomRight']) {
          if (!fixed[corner] || typeof fixed[corner] !== 'object') {
            fixed[corner] = { title: corner, desc: '' };
          }
        }
      }

      // Ensure interview slides have string respondentName
      if (type === 'interview') {
        if (typeof fixed.respondentName !== 'string') fixed.respondentName = '';
        if (typeof fixed.respondentRole !== 'string') fixed.respondentRole = '';
      }

      // Ensure case-study has stages array
      if (type === 'case-study' && (!fixed.stages || !Array.isArray(fixed.stages))) {
        fixed.stages = [{ label: 'Step 1', title: 'Process', desc: 'Key process step', highlighted: 'true' }];
      }

      // Ensure resource-grid has items array
      if (type === 'resource-grid' && (!fixed.items || !Array.isArray(fixed.items))) {
        fixed.items = [{ title: 'Resource', desc: 'Key resource' }];
      }

      // Ensure timeline has events array
      if (type === 'timeline' && (!fixed.events || !Array.isArray(fixed.events))) {
        fixed.events = [{ date: '2024', title: 'Event', desc: 'Key event', highlight: 'true' }];
      }

      return fixed;
    });
}

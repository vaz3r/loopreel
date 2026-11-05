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
        const headlineSubject = String(fixed.headline || fixed.title || 'Core Observation');
        const normalizeSide = (sideVal: unknown, defaultLabel: string, defaultContrast: string) => {
          if (!sideVal || typeof sideVal !== 'object') {
            return { label: defaultLabel, items: [defaultContrast] };
          }
          const sideObj = sideVal as Record<string, unknown>;
          const label = String(sideObj.label || sideObj.title || defaultLabel);
          const rawItems = sideObj.items ?? sideObj.item ?? sideObj.points;
          let items: string[] = [];
          if (Array.isArray(rawItems)) {
            items = rawItems.map(it => {
              if (typeof it === 'string') return it;
              if (it && typeof it === 'object') {
                const o = it as Record<string, unknown>;
                return String(o.text || o.desc || o.title || o.value || JSON.stringify(o));
              }
              return String(it);
            }).filter(Boolean);
          } else if (typeof rawItems === 'string') {
            items = [rawItems];
          } else if (rawItems && typeof rawItems === 'object') {
            const o = rawItems as Record<string, unknown>;
            items = [String(o.text || o.desc || o.title || o.value || defaultContrast)];
          } else if (sideObj.desc || sideObj.text || sideObj.title) {
            items = [String(sideObj.desc || sideObj.text || sideObj.title)];
          }

          if (items.length === 0) {
            items = [defaultContrast];
          }
          return { label, items };
        };

        fixed.left = normalizeSide(fixed.left, 'Before', `Original perspective: ${headlineSubject}`);
        fixed.right = normalizeSide(fixed.right, 'After', `Modern analysis: ${headlineSubject}`);
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

      // Ensure measure slides have non-empty value
      if (type === 'measure') {
        if (!fixed.value) {
          const statsArr = fixed.stats as any[];
          const itemsArr = fixed.items as any[];
          fixed.value = String(fixed.stat || fixed.number || fixed.val || (Array.isArray(statsArr) && statsArr[0]?.value) || (Array.isArray(itemsArr) && itemsArr[0]?.value) || '100%');
        }
      }

      // Ensure statement slides have non-empty text
      if (type === 'statement' && !fixed.text) {
        fixed.text = fixed.headline || fixed.subheadline || 'Key analytical finding documented in the field.';
      }

      // Ensure entry slides have non-empty text
      if (type === 'entry' && !fixed.text) {
        fixed.text = fixed.headline || fixed.subheadline || 'Primary archival finding and observation.';
      }

      // Ensure specimen slides have term and definition
      if (type === 'specimen') {
        if (!fixed.term) fixed.term = fixed.headline || fixed.title || 'Concept';
        if (!fixed.definition) fixed.definition = fixed.text || fixed.desc || 'Foundational concept definition.';
      }

      // Ensure quote slides have quote and author
      if (type === 'quote') {
        if (!fixed.quote) fixed.quote = String(fixed.text || fixed.desc || fixed.headline || 'Foundational observation documented in the field.');
        if (!fixed.author) fixed.author = String(fixed.speaker || fixed.source || fixed.by || 'Field Researcher');
      }

      // Ensure qa slides have question and answer
      if (type === 'qa') {
        if (!fixed.question) fixed.question = String(fixed.headline || fixed.title || 'Core Research Inquiry?');
        if (!fixed.answer) fixed.answer = String(fixed.text || fixed.desc || fixed.subheadline || 'Key analytical finding.');
      }

      // Ensure kit slides have items with normalized states ('done' | 'open' | 'flag')
      if (type === 'kit') {
        if (!Array.isArray(fixed.items) || (fixed.items as any[]).length === 0) {
          fixed.items = [{ text: 'Field Apparatus', state: 'open' }];
        } else {
          fixed.items = (fixed.items as any[]).map((it) => {
            if (!it || typeof it !== 'object') return { text: String(it), state: 'open' };
            const rawState = String(it.state || '').toLowerCase().trim();
            let state: 'done' | 'open' | 'flag' = 'open';
            if (rawState === 'done' || rawState === 'checked' || rawState === 'complete' || rawState === 'completed' || rawState === 'true') {
              state = 'done';
            } else if (rawState === 'flag' || rawState === 'flagged' || rawState === 'warning' || rawState === 'alert') {
              state = 'flag';
            }
            return {
              ...it,
              state,
              text: it.text || it.name || it.title || it.desc || 'Observation check',
            };
          });
        }
      }

      // Ensure route slides have waypoints
      if (type === 'route') {
        const rawWaypoints = fixed.waypoints || fixed.stops || fixed.items;
        if (!Array.isArray(rawWaypoints) || (rawWaypoints as any[]).length === 0) {
          fixed.waypoints = [{ name: 'Base Camp', desc: 'Initial research point' }];
        } else {
          fixed.waypoints = rawWaypoints;
        }
      }

      // Ensure log slides have entries
      if (type === 'log') {
        const rawEntries = fixed.entries || fixed.items || fixed.logs;
        if (!Array.isArray(rawEntries) || (rawEntries as any[]).length === 0) {
          fixed.entries = [{ date: 'Log 01', text: String(fixed.text || fixed.desc || 'Observation recorded.') }];
        } else {
          fixed.entries = rawEntries;
        }
      }

      // Ensure table slides have columns and rows
      if (type === 'table') {
        if (!Array.isArray(fixed.columns) || (fixed.columns as any[]).length === 0) fixed.columns = ['Observation', 'Measurement'];
        if (!Array.isArray(fixed.rows) || (fixed.rows as any[]).length === 0) fixed.rows = [['Primary Site', 'Recorded']];
      }

      // Ensure chart slides have series
      if (type === 'chart') {
        if (!Array.isArray(fixed.series) || (fixed.series as any[]).length === 0) {
          fixed.series = [{ name: 'Metric Trend', values: [15, 30, 60, 95] }];
        }
      }

      // Ensure map slides have pins
      if (type === 'map') {
        if (!Array.isArray(fixed.pins) || (fixed.pins as any[]).length === 0) {
          fixed.pins = [{ label: 'Site 01', x: 50, y: 50 }];
        }
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

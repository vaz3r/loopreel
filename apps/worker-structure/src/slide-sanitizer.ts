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

export function cleanEditorialText(text: string): string {
  if (!text || typeof text !== 'string') return text;
  return text
    .replace(/,?\s*attributed to [^;.,]+ initially and [^;.,]+ later;?\s*/gi, ', ')
    .replace(/;?\s*the later section says\s+/gi, ' — ')
    .replace(/\baccording to the article\b/gi, '')
    .replace(/\bthe article reports that\b/gi, '')
    .replace(/,\s*—\s*/g, ' — ')
    .replace(/\s{2,}/g, ' ')
    .replace(/\s+,/g, ',')
    .replace(/,\s*,/g, ',')
    .trim();
}

export function cleanCoverHeadline(headline: string): string {
  if (!headline || typeof headline !== 'string') return headline;
  let h = headline.trim();
  const doesReverseMatch = h.match(/^Does\s+(.*?)\s+Reverse\s+(.*?)\??$/i);
  if (doesReverseMatch) {
    return `${doesReverseMatch[1]} Fails to Reverse ${doesReverseMatch[2]}`.trim();
  }
  const doesMatch = h.match(/^Does\s+(.*?)\??$/i);
  if (doesMatch && doesMatch[1]) {
    return doesMatch[1].trim();
  }
  const isMatch = h.match(/^Is\s+(.*?)\??$/i);
  if (isMatch && isMatch[1]) {
    return isMatch[1].trim();
  }
  return h;
}

export function cleanTelemetryStats(stats: any[]): any[] {
  if (!Array.isArray(stats)) return stats;
  return stats.map(st => {
    if (!st || typeof st !== 'object') return st;
    let val = String(st.value ?? '').trim();
    let unit = String(st.unit ?? '').trim();
    let label = String(st.label ?? '').trim();

    // 1. Extract conversational qualifiers from value into label
    const qualifierMatch = val.match(/^(about|more than|over|nearly|approximately|around|less than|up to)\s+(.+)$/i);
    if (qualifierMatch && qualifierMatch[1] && qualifierMatch[2]) {
      const q = qualifierMatch[1];
      const qualifier = q.charAt(0).toUpperCase() + q.slice(1).toLowerCase();
      val = qualifierMatch[2].trim();
      if (!label.toLowerCase().includes(q.toLowerCase())) {
        label = `${qualifier} ${val}: ${label}`;
      }
    }

    // 2. Normalize directional words in unit into signed value
    const lowerUnit = unit.toLowerCase();
    if (['rise', 'rose', 'gain', 'gains', 'higher', 'growth', 'up'].includes(lowerUnit)) {
      if (!val.startsWith('+') && !val.startsWith('-')) {
        val = `+${val}`;
      }
      unit = '';
    } else if (['fall', 'fell', 'drop', 'drops', 'loss', 'losses', 'lower', 'down', 'plunge', 'plunged'].includes(lowerUnit)) {
      if (!val.startsWith('-')) {
        val = `-${val}`;
      }
      unit = '';
    }

    // 3. Deduplicate unit if already present in value
    if (val.includes('%') && (unit === '%' || unit === 'percent')) {
      unit = '';
    }
    if (val.startsWith('$') && (unit === '$' || unit === 'USD')) {
      unit = '';
    }

    return {
      ...st,
      value: val,
      unit,
      label,
    };
  });
}

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

      // Defensive length clamping for common metadata fields to prevent minor LLM overage failures
      if (typeof fixed.subtext === 'string' && fixed.subtext.length > 250) {
        fixed.subtext = fixed.subtext.slice(0, 247).trimEnd() + '...';
      }
      if (typeof fixed.actionLabel === 'string' && fixed.actionLabel.length > 40) {
        fixed.actionLabel = fixed.actionLabel.slice(0, 40).trimEnd();
      }
      if (typeof fixed.tag === 'string' && fixed.tag.length > 30) {
        fixed.tag = fixed.tag.slice(0, 30).trimEnd();
      }
      if (typeof fixed.value === 'string' && fixed.value.length > 20) {
        fixed.value = fixed.value.slice(0, 20).trimEnd();
      }
      if (typeof fixed.unit === 'string' && fixed.unit.length > 20) {
        fixed.unit = fixed.unit.slice(0, 20).trimEnd();
      }

      // Editorial copy and telemetry sanitization
      if (type === 'cover' && typeof fixed.headline === 'string') {
        fixed.headline = cleanCoverHeadline(fixed.headline);
      }
      if (typeof fixed.subheadline === 'string') {
        fixed.subheadline = cleanEditorialText(fixed.subheadline.replace(/^For you,\s*/i, ''));
      }
      if (typeof fixed.fact === 'string') {
        fixed.fact = cleanEditorialText(fixed.fact);
      }
      if (typeof fixed.myth === 'string') {
        fixed.myth = cleanEditorialText(fixed.myth);
      }
      if (Array.isArray(fixed.stats)) {
        fixed.stats = cleanTelemetryStats(fixed.stats).slice(0, 4);
      }
      if (Array.isArray(fixed.items) && fixed.items.length > 4) {
        fixed.items = fixed.items.slice(0, 4);
      }
      if (Array.isArray(fixed.events) && fixed.events.length > 5) {
        fixed.events = fixed.events.slice(0, 5);
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

      // Ensure dichotomy slides have left and right objects with title and desc
      if (type === 'dichotomy') {
        const headlineSubject = String(fixed.headline || fixed.title || 'Perspective');
        const normalizeDichotomySide = (sideVal: unknown, defaultTitle: string) => {
          if (!sideVal || typeof sideVal !== 'object') {
            return { title: defaultTitle, desc: `Analysis for ${headlineSubject}` };
          }
          const o = sideVal as Record<string, unknown>;
          return {
            title: String(o.title || o.label || defaultTitle).slice(0, 60),
            desc: String(o.desc || o.text || o.description || (Array.isArray(o.items) ? (o.items as string[]).join(' ') : `Analysis for ${headlineSubject}`)).slice(0, 400),
          };
        };
        fixed.left = normalizeDichotomySide(fixed.left, 'Perspective A');
        fixed.right = normalizeDichotomySide(fixed.right, 'Perspective B');
      }

      // Ensure telemetry slides have stats array
      if (type === 'telemetry') {
        let stats = fixed.stats ?? fixed.items;
        if (stats && typeof stats === 'object' && !Array.isArray(stats)) {
          const sObj = stats as Record<string, unknown>;
          stats = sObj.stat ?? sObj.stats ?? sObj.item ?? sObj.items ?? Object.values(sObj);
        }
        if (Array.isArray(stats)) {
          fixed.stats = stats.map((st: any) => {
            if (st && typeof st === 'object') {
              return {
                value: String(st.value ?? st.val ?? st.num ?? '0').slice(0, 20),
                label: String(st.label ?? st.desc ?? st.title ?? st.text ?? '').slice(0, 120),
                ...(st.unit ? { unit: String(st.unit).slice(0, 10) } : {}),
              };
            }
            return { value: String(st).slice(0, 20), label: '' };
          }).slice(0, 4);
        } else {
          fixed.stats = [{ value: '0', label: 'Metric' }];
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

      // Ensure table slides have valid headers/columns and rows
      if (type === 'table') {
        let headers = fixed.headers ?? fixed.columns;
        if (headers && typeof headers === 'object' && !Array.isArray(headers)) {
          const hObj = headers as Record<string, unknown>;
          headers = hObj.header ?? hObj.headers ?? hObj.col ?? hObj.cols ?? Object.values(hObj);
        }
        const cleanHeaders = Array.isArray(headers)
          ? headers.map(h => String(typeof h === 'object' ? ((h as any).title ?? (h as any).text ?? h) : h).slice(0, 30))
          : ['Observation', 'Measurement'];

        fixed.headers = cleanHeaders;
        fixed.columns = cleanHeaders;

        let rows = fixed.rows;
        if (rows && typeof rows === 'object' && !Array.isArray(rows)) {
          const rObj = rows as Record<string, unknown>;
          rows = rObj.row ?? rObj.rows ?? Object.values(rObj);
        }
        if (Array.isArray(rows)) {
          fixed.rows = rows.map((r: any) => {
            if (Array.isArray(r)) {
              return r.map(c => String(typeof c === 'object' ? ((c as any).text ?? (c as any).value ?? JSON.stringify(c)) : c).slice(0, 60));
            }
            if (r && typeof r === 'object') {
              const cells = r.cell ?? r.cells ?? r.values ?? r.items ?? Object.values(r);
              if (Array.isArray(cells)) {
                return cells.map(c => String(typeof c === 'object' ? ((c as any).text ?? (c as any).value ?? JSON.stringify(c)) : c).slice(0, 60));
              }
            }
            return [String(r).slice(0, 60)];
          }).slice(0, 10);
        } else {
          fixed.rows = [['Primary Site', 'Recorded']];
        }
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

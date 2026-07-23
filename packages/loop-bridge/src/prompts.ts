const TEMPLATE_IDS = ['paper-of-record', 'the-globalist', 'the-terminal', 'the-curator', 'the-academic'] as const;

function getSchemaDescription(templateId: string): string {
  switch (templateId) {
    case 'paper-of-record':
      return `Slide types: cover (tag, headline, subheadline, authorName, authorRole), quote (quote, author, role), definition (term, phonetic, definition, example), sequence (headline, items[{num, title, desc}]), dichotomy (headline, left{title, desc}, right{title, desc}), telemetry (headline, stats[{value, unit, label}]), timeline (headline, events[{date, title, desc, highlight?}]), image-split (headline, bodyText, imageUrl, credit), table (headline, headers, rows, highlightRow?), analysis (headline, bodyText), profile (headline, portraitUrl, personName, personRole, quote), cta (headline, subtext, actionLabel, socialHandle). All slides have optional id, tag, footerLeft, footerRight.`;
    case 'the-globalist':
      return `Slide types: cover (tag, headline, subheadline, authorName, authorRole), sequence (headline, items[{num, title, desc}]), image-split (headline, bodyText, imageUrl, credit), telemetry (headline, stats[{value, unit, label}]), interview (headline, question, answer, respondentName, respondentRole), quadrant (headline, topLeft/Right/BottomLeft/Right{title, desc}, topLabel?, bottomLabel?, leftLabel?, rightLabel?, highlight?), case-study (headline, stages[{label, title, desc, highlighted?}]), myth-fact (headline, myth, fact), resource-grid (headline, items[{title, desc}]), timeline (headline, events[{date, title, desc, highlight?}]), quote (quote, author, role), cta (headline, subtext, actionLabel, socialHandle).`;
    case 'the-terminal':
      return `Slide types: cover (tag, reportId?, headline, subheadline, authorName, authorRole), sequence (headline, items[{num, title, desc}]), image-split (headline, bodyText, imageUrl?, credit), telemetry (headline, stats[{value, unit?, label, color?: green|red|amber|blue}]), interview (headline, question, answer, respondentName, respondentRole), quadrant (headline, topLeft/Right/BottomLeft/Right{title, desc}, highlight?), case-study (headline, stages[{label, title, desc, highlighted?}]), myth-fact (headline, myth, fact), resource-grid (headline, items[{title, desc}]), timeline (headline, events[{date, title, desc, highlight?}]), quote (quote, author, role), cta (headline, subtext, actionLabel, socialHandle).`;
    case 'the-curator':
      return `Slide types: cover (tag, headline, subheadline?, pullQuote?), sequence (headline, items[{num, title, desc}]), image-split (headline, bodyText, imageUrl?, credit), telemetry (headline, stats[{value, unit?, label, note?}]), interview (headline, question, answer, respondentName, respondentRole), quadrant (headline, topLeft/Right/BottomLeft/Right{label?, title, desc}), case-study (headline, stages[{label, title, desc, highlighted?}]), myth-fact (headline, myth, fact), resource-grid (headline, items[{num?, title, desc}]), timeline (headline, events[{date, title, desc, highlight?}]), quote (quote, author, role), cta (headline, subtext, actionLabel, socialHandle), hero-metric (value, unit?, headline, bodyText?), methodology (headline, steps[{num, title, desc, highlighted?}]), juxtaposition (headline, donts[], dos[]), checklist (headline, items[{text, checked?}]), breakdown (headline, centerLabel, items[{num, title, desc}]).`;
    case 'the-academic':
      return `Slide types: cover (tag, headline, subheadline?, authorName, authorRole), sequence (headline, items[{num, title, desc}]), image-split (headline, bodyText, imageUrl?, credit), telemetry (headline, stats[{value, unit?, label, color?: crimson|ink|graphite}]), interview (headline, question, answer, respondentName, respondentRole), quadrant (headline, topLeft/Right/BottomLeft/Right{title, desc}, highlight?), case-study (headline, stages[{label, title, desc, highlighted?}]), myth-fact (headline, myth, fact), resource-grid (headline, items[{num?, title, desc, color?: crimson|ink}]), timeline (headline, events[{date, title, desc, highlight?}]), quote (quote, author, role), cta (headline, subtext, actionLabel, socialHandle), hero-metric (value, unit?, headline, bodyText?), methodology (headline, steps[{num, title, desc, highlighted?}]), juxtaposition (headline, donts[], dos[]), checklist (headline, items[{text, checked?}]), breakdown (headline, centerLabel, items[{num, title, desc}]).`;
    default:
      return '';
  }
}

function getTemplateStyle(templateId: string): string {
  switch (templateId) {
    case 'paper-of-record':
      return 'Classic newspaper editorial. Think New York Times, The Guardian longform. Authoritative, serious, investigative tone.';
    case 'the-globalist':
      return 'Economist/Monocle-style global affairs magazine. Macro-economic, geopolitical, financial analysis. Sophisticated and worldly.';
    case 'the-terminal':
      return 'Bloomberg Terminal / Financial Times dark mode. Data-driven, market-focused, quantitative. Technical and precise.';
    case 'the-curator':
      return 'MoMA gallery / avant-garde design publication. Minimal, artistic, conceptual. Heavy use of negative space.';
    case 'the-academic':
      return 'Harvard Business Review / MIT research paper. Academic, evidence-based, structured. Citation-heavy, methodical.';
    default:
      return '';
  }
}

export async function getPrompt(templateId: string, rawText: string): Promise<string> {
  if (!TEMPLATE_IDS.includes(templateId as any)) {
    throw new Error(`Unknown template "${templateId}"`);
  }

  const style = getTemplateStyle(templateId);
  const schemaDesc = getSchemaDescription(templateId);

  return `You are a world-class editorial content strategist. Your task is to transform the provided source content into a structured social media carousel for the "${templateId}" template.

## Template Style
${style}

## Output Format
Return a JSON object with a "slides" array. Each slide must have a "type" field matching one of the allowed types below, plus an "id" field (unique string like "slide-01", "slide-02"), and a "tag" field (short uppercase label like "ANALYSIS", "DATA SET", "PROFILE").

## Allowed Slide Types
${schemaDesc}

## Rules
1. Generate 6-12 slides. Start with a cover slide, end with a CTA slide.
2. Use a variety of slide types — never repeat the same type twice in a row.
3. Every slide MUST have: id, type, tag, footerLeft, footerRight.
4. Headlines max 80 chars. Subheadlines max 200 chars. Descriptions max 200 chars.
5. Stats should have concrete numbers with units (e.g., "42%", "3.2x", "$11T").
6. Quotes must have named attribution with role.
7. Sequence items: use "1", "2", "3" for num (not "Step 1").
8. Do NOT invent author names, handles, or series names — those come from user settings.
9. footerLeft: short category label. footerRight: "PAGE 01", "PAGE 02", etc.
10. Return ONLY the JSON object, no markdown fences, no explanation.

## Source Content
${rawText}`;
}

export { TEMPLATE_IDS };

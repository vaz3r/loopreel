import { getTemplate } from './registry.js';
import { getBrandKitDescription } from './brandkits.js';
import { introspectSchema } from './schema-introspect.js';

const TEMPLATE_IDS = ['paper-of-record', 'the-globalist', 'the-terminal', 'the-curator', 'the-academic'] as const;

function getTemplateStyle(templateId: string): string {
  switch (templateId) {
    case 'paper-of-record':
      return 'Classic newspaper editorial. Think New York Times, The Guardian longform. Authoritative, serious, investigative tone. Content should feel like breaking news or deep investigative journalism.';
    case 'the-globalist':
      return 'Economist/Monocle-style global affairs magazine. Macro-economic, geopolitical, financial analysis. Sophisticated and worldly. Content should feel like a premium intelligence briefing.';
    case 'the-terminal':
      return 'Bloomberg Terminal / Financial Times dark mode. Data-driven, market-focused, quantitative. Technical and precise. Content should feel like real-time market intelligence.';
    case 'the-curator':
      return 'MoMA gallery / avant-garde design publication. Minimal, artistic, conceptual. Heavy use of negative space. Content should feel like a gallery exhibition — every word is curated.';
    case 'the-academic':
      return 'Harvard Business Review / MIT research paper. Academic, evidence-based, structured. Citation-heavy, methodical. Content should feel like a peer-reviewed journal article.';
    default:
      return '';
  }
}

export async function getPrompt(
  templateId: string,
  rawText: string,
  brandKit?: Record<string, string | undefined>,
): Promise<string> {
  if (!TEMPLATE_IDS.includes(templateId as any)) {
    throw new Error(`Unknown template "${templateId}"`);
  }

  const template = getTemplate(templateId);
  const style = getTemplateStyle(templateId);

  // Auto-generate schema constraints from Zod contracts
  const schemaConstraints = introspectSchema(template.schema);

  // Auto-generate brand kit description from per-template brandkit schema
  const brandKitDesc = getBrandKitDescription(templateId);

  // Build brand kit section
  let brandKitSection = '';
  if (brandKit && Object.keys(brandKit).length > 0) {
    const providedEntries = Object.entries(brandKit)
      .filter(([, v]) => v != null && v !== '')
      .map(([k, v]) => `  - ${k}: "${v}"`)
      .join('\n');
    brandKitSection = providedEntries
      ? `\n## User's Brand Kit Values\nThe user has provided these brand customizations:\n${providedEntries}\n`
      : '';
  }

  return `You are a world-class editorial content strategist. Your task is to transform the provided source content into a structured social media carousel for the "${template.name}" template.

## Template Style
${style}

## Output Format
Return an XML document with a <presentation> root element. Each slide is a <slide> element. Simple fields (strings, numbers, booleans) go as XML attributes on the <slide> tag. Complex fields (nested objects, arrays) go as child elements. Do NOT use markdown fences — return raw XML only.

### Example (cover slide for paper-of-record):
<presentation>
  <slide type="cover" id="slide-01" tag="TECHNOLOGY" headline="The Future of Artificial Intelligence" subheadline="How machine learning is reshaping every industry from healthcare to finance" authorName="Jane Smith" authorRole="Technology Correspondent" footerLeft="AI SERIES" footerRight="PAGE 01" />
</presentation>

### Example (sequence slide with child elements):
<presentation>
  <slide type="sequence" id="slide-02" tag="KEY FINDINGS" headline="Five Trends Shaping AI in 2026" footerLeft="ANALYSIS" footerRight="PAGE 02">
    <items>
      <item num="1" title="Edge AI" desc="Processing moves to devices, reducing latency and cloud costs" />
      <item num="2" title="Multimodal Models" desc="Systems that understand text, images, audio, and video simultaneously" />
      <item num="3" title="AI Agents" desc="Autonomous systems that can plan, reason, and execute complex tasks" />
    </items>
  </slide>
</presentation>

### Example (telemetry slide with array of objects):
<presentation>
  <slide type="telemetry" id="slide-03" tag="DATA" headline="AI Market Growth" footerLeft="METRICS" footerRight="PAGE 03">
    <stats>
      <stat value="42" unit="%" label="Year-over-year growth in enterprise AI adoption" />
      <stat value="184" unit="B" label="Global AI market size projected for 2026" />
    </stats>
  </slide>
</presentation>

### Example (nested object — dichotomy/left-right):
<presentation>
  <slide type="dichotomy" id="slide-04" tag="ANALYSIS" headline="Before vs After" footerLeft="COMPARISON" footerRight="PAGE 04">
    <left title="Before" desc="The old way of doing things was slow and expensive" />
    <right title="After" desc="The new approach delivers 10x speed at 1/10th the cost" />
  </slide>
</presentation>

## Slide Type Constraints
Each slide type has specific fields with character limits and array size limits. YOU MUST FOLLOW THESE EXACTLY.
${schemaConstraints}

## Universal Rules
1. Generate 6-12 slides. Start with a cover slide, end with a CTA slide.
2. Use a variety of slide types — never repeat the same type twice in a row.
3. Every slide MUST have: id, type, tag, footerLeft, footerRight.
4. Respect the character limits listed above for each field. Strings that exceed limits will be rejected.
5. Stats should have concrete numbers with units (e.g., "42%", "3.2x", "$11T").
6. Quotes must have named attribution with role.
7. Sequence items: use "1", "2", "3" for num (not "Step 1").
8. Do NOT invent author names, handles, or series names — those come from user settings.
9. footerLeft: short category label. footerRight: "PAGE 01", "PAGE 02", etc.
10. Return ONLY the XML document, no markdown fences, no explanation.
11. Use self-closing tags <slide ... /> for simple slides with no child elements.
12. Use nested elements <slide ...><child>...</child></slide> for arrays and objects.
13. Escape special XML characters in attribute values: &amp; for &, &lt; for <, &gt; for >, &quot; for ".

## Brand Kit
The user may provide a brand kit to customize colors and fonts. For this template, the available brand kit fields are:
${brandKitDesc}
${brandKitSection}
If the user has provided brand kit values, the visual output will be customized accordingly. Structure your content to work well with their brand (e.g., shorter headlines for bold accent colors, more whitespace for light backgrounds).

## Source Content
${rawText}`;
}

export { TEMPLATE_IDS };

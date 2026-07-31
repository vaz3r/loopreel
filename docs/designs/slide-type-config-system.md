# Slide Type Configuration System — Design Document

## Problem Statement

Currently, 23 slide types are defined as hardcoded constants in `orchestrator.ts` (`SLIDE_TYPE_RULES`). Adding a new slide type requires:
1. Modifying the TypeScript source code in `SLIDE_TYPE_RULES`
2. Updating the content-generation.md prompt if field limits change
3. Updating the Zod schema in the loop package
4. Rebuilding and redeploying

This is slow, error-prone, and prevents non-developers from extending the system.

## Goals

1. **Additive-only workflow**: New slide types added by creating a YAML config file — zero code changes
2. **Single source of truth**: One config file per slide type defines everything (rules, patterns, fields, power words)
3. **Backward compatible**: Existing 23 slide types migrate without behavioral change
4. **Dynamic prompt injection**: content-generation.md receives config data via Handlebars, not hardcoded strings
5. **Schema-aware**: Configs can reference or extend Zod schema introspection results

---

## 1. Proposed Directory Structure

```
packages/llm/
├── domains/                          # Existing: domain XML files
│   ├── news.xml
│   ├── finance.xml
│   └── ...
├── slide-types/                      # NEW: slide type YAML configs
│   ├── _global.yaml                  # Global settings (field limits, power words)
│   ├── cover.yaml
│   ├── telemetry.yaml
│   ├── sequence.yaml
│   ├── myth-fact.yaml
│   ├── quote.yaml
│   ├── cta.yaml
│   ├── timeline.yaml
│   ├── analysis.yaml
│   ├── definition.yaml
│   ├── dichotomy.yaml
│   ├── table.yaml
│   ├── profile.yaml
│   ├── image-split.yaml
│   ├── breakdown.yaml
│   ├── juxtaposition.yaml
│   ├── methodology.yaml
│   ├── hero-metric.yaml
│   ├── checklist.yaml
│   ├── quadrant.yaml
│   ├── case-study.yaml
│   ├── resource-grid.yaml
│   └── interview.yaml
├── src/
│   └── brain/
│       ├── slide-type-loader.ts      # NEW: YAML loader
│       ├── orchestrator.ts           # MODIFIED: uses loader
│       └── prompts/
│           └── content-generation.md # MODIFIED: Handlebars references
```

### Why this structure?
- **One file per slide type**: Easy to find, edit, version-control
- **`_global.yaml`**: Shared constraints (field character limits, global power words) that apply to all types
- **Parallel to `domains/`**: Follows the existing pattern of external config files loaded at runtime
- **No nesting by category**: Flat structure is simpler; the `category` field in each YAML handles grouping

---

## 2. YAML Schema Design

### 2.1 Global Configuration (`_global.yaml`)

```yaml
# packages/llm/slide-types/_global.yaml
# Global constraints that apply to ALL slide types.
# Individual slide type configs can override these.

version: 1

# Field character limits — used in content-generation.md prompt
fieldLimits:
  stat.value: 20
  stat.unit: 10
  stat.label: 120
  headline: 80
  headline.cover: 120
  tag: 30
  "item.title": 60
  "item.desc": 200
  footerLeft: 40
  footerRight: 40
  myth: 300
  fact: 300
  subheadline: 200
  subtext: 300
  quote: 500
  definition: 600
  term: 60

# Global power words — checked across ALL slides for variety
globalPowerWords:
  - shocking
  - breaking
  - urgent
  - exclusive
  - revealed
  - stunning
  - unprecedented
  - critical
  - devastating
  - bizarre

# Headline rules that apply to all slide types
headlineRules:
  - "Headlines MUST be a CLAIM, QUESTION, COMMAND, or PATTERN-INTERRUPT — never a noun phrase."
  - "Max 7 words. Fragments preferred. Active voice. Use contractions when natural."
  - "Vary emotional angles across slides. Available angles: curiosity, urgency, fear, surprise, empathy, concern, challenge. Each angle at most once per carousel."
  - "Use power words sparingly. Combined budget: each power word may appear at most ONCE per carousel."
  - "The few-shot example demonstrates STRUCTURE and QUALITY LEVEL only. Your headlines must be ORIGINAL."

# Variety rules
varietyRules:
  - "NEVER use the same headline structure twice in one carousel."
  - "NEVER start two consecutive slides with the same word."
  - "VARY emotional angles across slides."
  - "Each carousel must feel like a DIFFERENT editorial voice."

# Anti-hallucination rules
antiHallucinationRules:
  - "Every fact, number, and quote MUST come DIRECTLY from the content brief."
  - "If the content brief says '2-3%', you MUST write exactly that."
  - "If you cannot find an exact number in the brief, the stat does not exist."
  - "NEVER invent statistics, percentages, dollar amounts, or counts."
  - "NEVER invent quotes. Use ONLY quotes from the brief."
```

### 2.2 Slide Type Config Schema (Full Spec)

```yaml
# Slide Type Config Schema (YAML)
# Each file = one slide type

# ─── METADATA ───────────────────────────────────────────
id: string              # Unique identifier (matches Zod schema type literal)
name: string            # Human-readable name (e.g., "Cover Slide")
description: string     # What this slide type is for
category: string        # Grouping: "narrative", "data", "visual", "interactive"
version: number         # Config schema version (for future migration)

# ─── FIELD DEFINITIONS ─────────────────────────────────
# These describe the fields for THIS slide type.
# They supplement (not replace) Zod schema introspection.
# If a field exists in Zod but not here, Zod's description wins.
# If a field exists here but not in Zod, it's extra guidance for the LLM.
fields:
  - name: string         # Field name (matches XML attribute/child element)
    type: string         # "string" | "number" | "boolean" | "object" | "array"
    required: boolean    # Whether the LLM must include this field
    maxLength: number    # Max character count (overrides global fieldLimits)
    description: string  # What this field contains
    example: string      # Example value for few-shot guidance
    notes: string        # Additional guidance (e.g., "Do NOT include on definition slides")

# ─── HEADLINE PATTERNS ─────────────────────────────────
# Structured replacement for the hardcoded PATTERN A/B/C/D strings
headlinePatterns:
  - id: string           # e.g., "approach-a"
    name: string         # e.g., "Shock Number Lead"
    template: string     # e.g., "[Number] [Unit]. [Number] [Unit]."
    example: string      # e.g., "6.8 Mag. 13 Lives. Zero Warning."
    emotionalTrigger: string  # e.g., "surprise"
    bestFor: string      # e.g., "When brief has contrasting data points"

# ─── RULES ─────────────────────────────────────────────
# Free-form rules injected into the prompt for this slide type.
# Replaces the hardcoded `rule` string in SLIDE_TYPE_RULES.
rules:
  - string               # Each entry is one rule line

# ─── POWER WORDS ────────────────────────────────────────
# Slide-type-specific power words (supplements global power words)
powerWords:
  - string

# ─── BEHAVIORAL FLAGS ───────────────────────────────────
# Flags that control orchestrator behavior
hasHeadline: boolean     # false for definition slides (uses term instead)
hasStats: boolean        # true for telemetry slides
hasItems: boolean        # true for sequence, checklist slides
hasLeftRight: boolean    # true for dichotomy slides
maxCount: number         # max times this type can appear in one carousel (0 = unlimited)
```

### 2.3 Example: Cover Slide (`cover.yaml`)

```yaml
id: cover
name: Cover Slide
description: "The opening slide. Must hook the reader in the first 3 words."
category: narrative
version: 1

fields:
  - name: headline
    type: string
    required: true
    maxLength: 120
    description: "The main hook. Must be a CLAIM, QUESTION, COMMAND, or PATTERN-INTERRUPT."
    example: "1,100 Pages They Tried to Bury"
    notes: "Max 5 words preferred. NEVER start with the same word as the previous cover."
  - name: subheadline
    type: string
    required: false
    maxLength: 200
    description: "Supporting context. 1-2 sentences max."
    example: "Fauci's private journals. The truth is inside."
  - name: authorName
    type: string
    required: false
    maxLength: 40
    description: "Author attribution"
    example: "Editorial Desk"
  - name: authorRole
    type: string
    required: false
    maxLength: 40
    description: "Author role/title"
    example: "Investigative Unit"
  - name: tag
    type: string
    required: true
    maxLength: 30
    description: "Category tag in ALL CAPS"
    example: "BREAKING NEWS"

headlinePatterns:
  - id: approach-a
    name: "Shock Number Lead"
    template: "[Most shocking number from brief]"
    example: "1,100 Pages They Tried to Bury"
    emotionalTrigger: surprise
    bestFor: "When brief has a single large/memorable number"

  - id: approach-b
    name: "Question Hook"
    template: "[Question the reader is already thinking]"
    example: "Is Your Data Safe?"
    emotionalTrigger: curiosity
    bestFor: "When the topic raises an obvious question"

  - id: approach-c
    name: "Human Impact Lead"
    template: "[Who is affected]. [What they lost]."
    example: "Shopping Center Collapses in Japan"
    emotionalTrigger: empathy
    bestFor: "When brief has human casualties or personal stories"

  - id: approach-d
    name: "Unexpected Angle"
    template: "[What nobody anticipated]"
    example: "The Earthquake Nobody Saw Coming"
    emotionalTrigger: surprise
    bestFor: "When brief has a surprising or counterintuitive finding"

rules:
  - "MUST hook the reader in the first 3 words"
  - "Choose ONE approach (do NOT default to the same one every time)"
  - "NEVER start with the same word as the previous carousel cover"
  - "NEVER use the same number as the first word more than once per batch"
  - "Cover headlines max 120 chars (other slides: 80 chars)"

powerWords: []

hasHeadline: true
hasStats: false
hasItems: false
hasLeftRight: false
maxCount: 1
```

### 2.4 Example: Telemetry Slide (`telemetry.yaml`)

```yaml
id: telemetry
name: Telemetry Slide
description: "Data visualization slide. Shows 3-4 stats with values, units, and labels."
category: data
version: 1

fields:
  - name: headline
    type: string
    required: true
    maxLength: 80
    description: "Data-driven headline using numbers from the stats"
    example: "6.8 Mag. 13 Lives. Zero Warning."
  - name: stats
    type: array
    required: true
    description: "Array of stat objects. Must include at least one number from the brief."
    notes: "3-4 stats recommended"
  - name: stat.value
    type: string
    required: true
    maxLength: 20
    description: "The numeric value"
    example: "6.8"
  - name: stat.unit
    type: string
    required: true
    maxLength: 10
    description: "Unit of measurement"
    example: "mag"
  - name: stat.label
    type: string
    required: true
    maxLength: 120
    description: "Description of what this stat measures"
    example: "Earthquake magnitude"
  - name: tag
    type: string
    required: true
    maxLength: 30
    description: "Category tag in ALL CAPS"
    example: "SHOCKING DATA"

headlinePatterns:
  - id: pattern-a
    name: "Dual Contrast"
    template: "[Number] [Unit]. [Number] [Unit]."
    example: "6.8 Mag. 13 Lives. Zero Warning."
    emotionalTrigger: surprise
    bestFor: "When brief has two contrasting data points"

  - id: pattern-b
    name: "Data + Meaning"
    template: "[Number] [Unit]. [What it means for you]."
    example: "2.3% Down. Your Portfolio Feels It."
    emotionalTrigger: concern
    bestFor: "When stats have direct personal impact"

  - id: pattern-c
    name: "Noun Colon"
    template: "The [Noun]: [Number]."
    example: "The Depth: 6 Miles."
    emotionalTrigger: curiosity
    bestFor: "When one stat tells the whole story"

  - id: pattern-d
    name: "Number + Twist"
    template: "[Number] [Unit] — and [something unexpected]."
    example: "3,600 Troops — and Zero Warning."
    emotionalTrigger: surprise
    bestFor: "When one stat contradicts expectations"

rules:
  - "MUST include at least one number from the stats in the headline"
  - "VARY your pattern. Do NOT copy the few-shot telemetry headline."
  - "stat.value: max 20 chars. stat.unit: max 10 chars. stat.label: max 120 chars."

powerWords: []

hasHeadline: true
hasStats: true
hasItems: false
hasLeftRight: false
maxCount: 0
```

### 2.5 Example: Definition Slide (`definition.yaml`)

```yaml
id: definition
name: Definition Slide
description: "Defines a concept or term. Does NOT use headline — uses term field instead."
category: narrative
version: 1

fields:
  - name: term
    type: string
    required: true
    maxLength: 60
    description: "The concept or term being defined (replaces headline)"
    example: "Cyclosporiasis"
    notes: "This field replaces the headline. Do NOT include a headline attribute."
  - name: phonetic
    type: string
    required: false
    maxLength: 60
    description: "Optional pronunciation guide"
    example: "/sɪkloʊspɔːraɪəsɪs/"
  - name: definition
    type: string
    required: true
    maxLength: 600
    description: "Clear plain-English explanation of the term"
    example: "A diarrheal illness caused by the parasite Cyclospora cayetanensis, typically spread through contaminated food or water."
  - name: example
    type: string
    required: false
    maxLength: 300
    description: "Optional real-world example"
    example: "Outbreaks often linked to imported fresh produce like raspberries and basil."
  - name: tag
    type: string
    required: true
    maxLength: 30
    description: "Category tag in ALL CAPS"
    example: "KEY TERM"

headlinePatterns: []
  # Definition slides do not use headlines.
  # The 'term' field serves as the visual anchor.

rules:
  - "IMPORTANT: Definition slides do NOT have a headline field"
  - "Use the `term` field for the concept name (e.g., 'Cyclosporiasis')"
  - "Use the `definition` field for the explanation"
  - "`term`: REQUIRED, max 60 chars"
  - "`definition`: REQUIRED, max 600 chars"
  - "`phonetic`: Optional pronunciation guide"
  - "`example`: Optional real-world example"
  - "DO NOT include a headline attribute on definition slides"

powerWords: []

hasHeadline: false
hasStats: false
hasItems: false
hasLeftRight: false
maxCount: 0
```

---

## 3. Loader Design

### 3.1 New File: `packages/llm/src/brain/slide-type-loader.ts`

```typescript
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { parse as parseYaml } from 'yaml';  // Need to add 'yaml' dependency

// ─── Types ───────────────────────────────────────────────

export interface FieldLimit {
  name: string;
  type: string;
  required: boolean;
  maxLength?: number;
  description: string;
  example?: string;
  notes?: string;
}

export interface HeadlinePattern {
  id: string;
  name: string;
  template: string;
  example: string;
  emotionalTrigger: string;
  bestFor: string;
}

export interface SlideTypeConfig {
  id: string;
  name: string;
  description: string;
  category: string;
  version: number;
  fields: FieldLimit[];
  headlinePatterns: HeadlinePattern[];
  rules: string[];
  powerWords: string[];
  hasHeadline: boolean;
  hasStats: boolean;
  hasItems: boolean;
  hasLeftRight: boolean;
  maxCount: number;
}

export interface GlobalConfig {
  version: number;
  fieldLimits: Record<string, number>;
  globalPowerWords: string[];
  headlineRules: string[];
  varietyRules: string[];
  antiHallucinationRules: string[];
}

export interface SlideTypeRegistry {
  global: GlobalConfig;
  types: Map<string, SlideTypeConfig>;
  allTypes: SlideTypeConfig[];
}

// ─── Loader ──────────────────────────────────────────────

function resolveSlideTypesDir(): string {
  const candidates = [
    join(process.cwd(), 'packages', 'llm', 'slide-types'),
    join('/app', 'packages', 'llm', 'slide-types'),
    join(import.meta.dirname ?? '.', 'slide-types'),
    join(import.meta.dirname ?? '.', '..', 'slide-types'),
  ];
  for (const dir of candidates) {
    if (existsSync(dir)) return dir;
  }
  return candidates[0]!;
}

let _registryCache: SlideTypeRegistry | null = null;

export function loadSlideTypes(): SlideTypeRegistry {
  if (_registryCache) return _registryCache;

  const dir = resolveSlideTypesDir();
  const globalPath = join(dir, '_global.yaml');

  // Load global config
  let global: GlobalConfig;
  if (existsSync(globalPath)) {
    const raw = readFileSync(globalPath, 'utf-8');
    global = parseYaml(raw) as GlobalConfig;
  } else {
    // Fallback defaults matching current hardcoded values
    global = {
      version: 1,
      fieldLimits: {
        'stat.value': 20, 'stat.unit': 10, 'stat.label': 120,
        headline: 80, 'headline.cover': 120, tag: 30,
        'item.title': 60, 'item.desc': 200,
        footerLeft: 40, footerRight: 40,
        myth: 300, fact: 300,
      },
      globalPowerWords: ['shocking', 'breaking', 'urgent', 'exclusive', 'revealed',
        'stunning', 'unprecedented', 'critical', 'devastating', 'bizarre'],
      headlineRules: [],
      varietyRules: [],
      antiHallucinationRules: [],
    };
  }

  // Load all slide type configs
  const types = new Map<string, SlideTypeConfig>();
  try {
    const files = readdirSync(dir).filter(f => f.endsWith('.yaml') && !f.startsWith('_'));
    for (const file of files) {
      const raw = readFileSync(join(dir, file), 'utf-8');
      const config = parseYaml(raw) as SlideTypeConfig;
      types.set(config.id, config);
    }
  } catch {
    // If directory doesn't exist or is empty, return empty registry
  }

  _registryCache = {
    global,
    types,
    allTypes: Array.from(types.values()),
  };

  return _registryCache;
}

// ─── Query API ───────────────────────────────────────────

/** Get config for a specific slide type */
export function getSlideType(id: string): SlideTypeConfig | undefined {
  return loadSlideTypes().types.get(id);
}

/** Get all slide type configs */
export function getAllSlideTypes(): SlideTypeConfig[] {
  return loadSlideTypes().allTypes;
}

/** Get global config */
export function getGlobalConfig(): GlobalConfig {
  return loadSlideTypes().global;
}

/** Build the slideTypeRules string for the prompt (replaces SLIDE_TYPE_RULES) */
export function buildSlideTypeRules(selectedTypes: Set<string>): string {
  const registry = loadSlideTypes();
  const rules: string[] = [];

  for (const id of selectedTypes) {
    const config = registry.types.get(id);
    if (!config) continue;

    const header = `### ${config.name}`;
    const body = config.rules.join('\n');
    rules.push(`${header}\n${body}`);
  }

  return rules.join('\n\n');
}

/** Build field limits section for the prompt (replaces hardcoded limits) */
export function buildFieldLimitsSection(): string {
  const { global } = loadSlideTypes();
  const lines: string[] = [];

  for (const [field, limit] of Object.entries(global.fieldLimits)) {
    lines.push(`- ${field}: max ${limit} characters`);
  }

  return lines.join('\n');
}

/** Build global headline rules for the prompt */
export function buildHeadlineRules(): string {
  const { global } = loadSlideTypes();
  return global.headlineRules.map(r => `  <rule>${r}</rule>`).join('\n');
}

/** Build variety rules for the prompt */
export function buildVarietyRules(): string {
  const { global } = loadSlideTypes();
  return global.varietyRules.map(r => `- ${r}`).join('\n');
}

/** Build anti-hallucination rules for the prompt */
export function buildAntiHallucinationRules(): string {
  const { global } = loadSlideTypes();
  return global.antiHallucinationRules.map(r => `  <rule>${r}</rule>`).join('\n');
}

/** Get headline patterns for a specific slide type */
export function getHeadlinePatterns(typeId: string): HeadlinePattern[] {
  const config = getSlideType(typeId);
  return config?.headlinePatterns ?? [];
}

/** Get all power words (global + type-specific) */
export function getAllPowerWords(typeIds: string[]): string[] {
  const registry = loadSlideTypes();
  const words = new Set(registry.global.globalPowerWords);

  for (const id of typeIds) {
    const config = registry.types.get(id);
    if (config) {
      for (const w of config.powerWords) {
        words.add(w);
      }
    }
  }

  return Array.from(words);
}

/** Reset cache (for testing) */
export function resetSlideTypeCache(): void {
  _registryCache = null;
}
```

### 3.2 Dependency: `yaml` Package

Add to `packages/llm/package.json`:

```json
{
  "dependencies": {
    "fast-xml-parser": "^5.10.1",
    "handlebars": "^4.7.9",
    "yaml": "^2.6.0",
    "zod": "^3.24.0"
  }
}
```

---

## 4. Integration Points

### 4.1 Orchestrator Changes

The orchestrator needs these changes:

**Before (hardcoded):**
```typescript
const SLIDE_TYPE_RULES = [
  { type: 'cover', rule: '- MUST hook the reader...' },
  { type: 'telemetry', rule: '- MUST include at least one number...' },
  // ... 21 more entries
];
```

**After (config-driven):**
```typescript
import {
  buildSlideTypeRules,
  buildFieldLimitsSection,
  buildHeadlineRules,
  buildVarietyRules,
  buildAntiHallucinationRules,
  getAllPowerWords,
} from './slide-type-loader.js';

// In buildGeneratePrompt():
function buildGeneratePrompt(
  briefXml: string,
  planXml: string,
  selectedTemplate: TemplateInfo,
  slidePlan: string[],
  domainExamples?: DomainExamples,
): { system: string; user: string } {
  const selectedTypes = new Set(slidePlan);

  // NEW: Build rules from config instead of hardcoded SLIDE_TYPE_RULES
  const slideTypeRules = buildSlideTypeRules(selectedTypes);

  // NEW: Build field limits from config
  const fieldLimitsSection = buildFieldLimitsSection();

  // NEW: Build headline rules from config
  const headlineRulesSection = buildHeadlineRules();

  // NEW: Build variety rules from config
  const varietyRulesSection = buildVarietyRules();

  // NEW: Build anti-hallucination rules from config
  const antiHallucinationSection = buildAntiHallucinationRules();

  // NEW: Get power words for selected types
  const allPowerWords = getAllPowerWords(slidePlan);

  // ... rest of the function
}
```

### 4.2 Prompt Template Changes

The `content-generation.md` prompt needs to use Handlebars variables for the dynamic sections.

**Current (hardcoded in markdown):**
```markdown
## FIELD CHARACTER LIMITS (CRITICAL)
- stat.value: max 20 characters
- stat.unit: max 10 characters
...

## VARIETY RULES (CRITICAL)
- NEVER use the same headline structure twice...
```

**After (dynamic via Handlebars):**
```markdown
## FIELD CHARACTER LIMITS (CRITICAL — violating these causes schema validation failures)

{{{fieldLimitsSection}}}

## ANTI-HALLUCINATION RULES (CRITICAL)

<antiHallucination>
{{{antiHallucinationSection}}}
</antiHallucination>

## RULES
- Return ONLY the XML <presentation> element. No markdown fences, no explanation.
- Generate ALL slides in order as specified in the slidePlan.
- Use ONLY data from the content brief.
- Respect ALL field constraints exactly.
- Self-closing tags for simple elements: <item ... />
- Every slide MUST have: id, type, tag, footerLeft, footerRight.
- footerRight: "PAGE 01", "PAGE 02", etc. (sequential)

## VARIETY RULES (CRITICAL)

{{{varietyRulesSection}}}

## HEADLINE RULES

<headlineRules>
{{{headlineRulesSection}}}
</headlineRules>
```

### 4.3 Updated `buildGeneratePrompt` Call

```typescript
// In orchestrator.ts, buildGeneratePrompt:
const system = renderPrompt('content-generation', {
  templateName: selectedTemplate.name,
  templateAesthetics: selectedTemplate.aesthetics,
  fewShot: getDomainFewShot(domainExamples),
  planXml,
  briefXml,
  filteredSchema,
  slideTypeRules,              // Already exists, now from config
  domainPrinciples,
  domainName,
  domainPowerWords,
  // NEW variables:
  fieldLimitsSection,          // From buildFieldLimitsSection()
  headlineRulesSection,        // From buildHeadlineRules()
  varietyRulesSection,         // From buildVarietyRules()
  antiHallucinationSection,    // From buildAntiHallucinationRules()
  allPowerWords,               // From getAllPowerWords()
});
```

---

## 5. Migration Path

### 5.1 Minimal Changes to Get Working

| Step | File | Change | Risk |
|------|------|--------|------|
| 1 | `packages/llm/package.json` | Add `"yaml": "^2.6.0"` dependency | Low — no breaking changes |
| 2 | `packages/llm/slide-types/` | Create directory + 23 YAML files + `_global.yaml` | Low — additive only |
| 3 | `packages/llm/src/brain/slide-type-loader.ts` | New file — loader module | Low — new module, no existing code touched |
| 4 | `packages/llm/src/brain/orchestrator.ts` | Replace `SLIDE_TYPE_RULES` with loader calls | Medium — core logic change |
| 5 | `packages/llm/src/brain/prompts/content-generation.md` | Add Handlebars variables for dynamic sections | Medium — prompt template change |
| 6 | Test | Run full pipeline with existing briefs, compare output | Required |

### 5.2 Detailed Migration Checklist

#### Phase 1: Infrastructure (Non-Breaking)

- [ ] Add `yaml` dependency to `packages/llm/package.json`
- [ ] Create `packages/llm/slide-types/` directory
- [ ] Create `packages/llm/slide-types/_global.yaml` with current hardcoded values
- [ ] Create `packages/llm/src/brain/slide-type-loader.ts` with full loader API
- [ ] Add unit tests for the loader (load, parse, query)
- [ ] Verify loader loads all 23 existing slide types correctly

#### Phase 2: Config Files (Additive)

- [ ] Create `cover.yaml` — migrate from `SLIDE_TYPE_RULES[0]`
- [ ] Create `telemetry.yaml` — migrate from `SLIDE_TYPE_RULES[1]`
- [ ] Create `sequence.yaml` — migrate from `SLIDE_TYPE_RULES[2]`
- [ ] Create `myth-fact.yaml` — migrate from `SLIDE_TYPE_RULES[3]`
- [ ] Create `quote.yaml` — migrate from `SLIDE_TYPE_RULES[4]`
- [ ] Create `cta.yaml` — migrate from `SLIDE_TYPE_RULES[5]`
- [ ] Create `timeline.yaml` — migrate from `SLIDE_TYPE_RULES[6]`
- [ ] Create `analysis.yaml` — migrate from `SLIDE_TYPE_RULES[7]`
- [ ] Create `definition.yaml` — migrate from `SLIDE_TYPE_RULES[8]`
- [ ] Create `dichotomy.yaml` — migrate from `SLIDE_TYPE_RULES[9]`
- [ ] Create `table.yaml` — migrate from `SLIDE_TYPE_RULES[10]`
- [ ] Create `profile.yaml` — migrate from `SLIDE_TYPE_RULES[11]`
- [ ] Create `image-split.yaml` — migrate from `SLIDE_TYPE_RULES[12]`
- [ ] Create `breakdown.yaml` — migrate from `SLIDE_TYPE_RULES[13]`
- [ ] Create `juxtaposition.yaml` — migrate from `SLIDE_TYPE_RULES[14]`
- [ ] Create `methodology.yaml` — migrate from `SLIDE_TYPE_RULES[15]`
- [ ] Create `hero-metric.yaml` — migrate from `SLIDE_TYPE_RULES[16]`
- [ ] Create `checklist.yaml` — migrate from `SLIDE_TYPE_RULES[17]`
- [ ] Create `quadrant.yaml` — migrate from `SLIDE_TYPE_RULES[18]`
- [ ] Create `case-study.yaml` — migrate from `SLIDE_TYPE_RULES[19]`
- [ ] Create `resource-grid.yaml` — migrate from `SLIDE_TYPE_RULES[20]`
- [ ] Create `interview.yaml` — migrate from `SLIDE_TYPE_RULES[21]`

#### Phase 3: Orchestrator Integration (Breaking)

- [ ] Import loader functions in `orchestrator.ts`
- [ ] Remove `SLIDE_TYPE_RULES` constant
- [ ] Update `buildGeneratePrompt` to use `buildSlideTypeRules()`
- [ ] Update `content-generation.md` to use Handlebars variables
- [ ] Verify `renderPrompt` passes all new variables correctly
- [ ] Run end-to-end test with 3 different briefs
- [ ] Compare output XML structure before/after migration

#### Phase 4: Validation

- [ ] Verify all 23 slide types load from YAML
- [ ] Verify field limits match current hardcoded values
- [ ] Verify headline patterns match current hardcoded patterns
- [ ] Verify rules text matches current hardcoded rules
- [ ] Run full pipeline on news, finance, health briefs
- [ ] Verify no regressions in slide quality
- [ ] Delete `SLIDE_TYPE_RULES` constant from orchestrator.ts

### 5.3 Rollback Strategy

If the migration causes issues:
1. Revert `orchestrator.ts` changes (restore `SLIDE_TYPE_RULES`)
2. Revert `content-generation.md` changes (restore hardcoded sections)
3. Keep the YAML files and loader for future use
4. The `yaml` dependency can stay — it's lightweight and useful

---

## 6. Future Extensibility

### Adding a New Slide Type (Post-Migration)

1. Create `packages/llm/slide-types/my-new-type.yaml`
2. Add the Zod schema variant in the loop package
3. Run the pipeline — the loader picks it up automatically

No changes to `orchestrator.ts` or prompt templates needed.

### Schema Validation Integration

The loader could optionally validate YAML configs against a Zod schema at load time:

```typescript
import { z } from 'zod';

const SlideTypeConfigSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  category: z.enum(['narrative', 'data', 'visual', 'interactive']),
  version: z.number(),
  fields: z.array(z.object({
    name: z.string(),
    type: z.enum(['string', 'number', 'boolean', 'object', 'array']),
    required: z.boolean(),
    maxLength: z.number().optional(),
    description: z.string(),
    example: z.string().optional(),
    notes: z.string().optional(),
  })),
  headlinePatterns: z.array(z.object({
    id: z.string(),
    name: z.string(),
    template: z.string(),
    example: z.string(),
    emotionalTrigger: z.string(),
    bestFor: z.string(),
  })),
  rules: z.array(z.string()),
  powerWords: z.array(z.string()),
  hasHeadline: z.boolean(),
  hasStats: z.boolean(),
  hasItems: z.boolean(),
  hasLeftRight: z.boolean(),
  maxCount: z.number(),
});
```

### Hot-Reload Support

For development, the loader could watch the `slide-types/` directory and invalidate the cache when files change:

```typescript
import { watch } from 'node:fs';

export function watchSlideTypes(callback: () => void): () => void {
  const dir = resolveSlideTypesDir();
  const stop = watch(dir, { recursive: false }, () => {
    resetSlideTypeCache();
    callback();
  });
  return () => stop.close();
}
```

---

## 7. Testing Strategy

### Unit Tests

```typescript
// slide-type-loader.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { loadSlideTypes, getSlideType, buildSlideTypeRules } from './slide-type-loader';

describe('slide-type-loader', () => {
  beforeEach(() => {
    resetSlideTypeCache();
  });

  it('loads all 23 slide types', () => {
    const registry = loadSlideTypes();
    expect(registry.allTypes.length).toBe(23);
  });

  it('loads global config', () => {
    const global = getGlobalConfig();
    expect(global.fieldLimits['stat.value']).toBe(20);
    expect(global.globalPowerWords.length).toBeGreaterThan(0);
  });

  it('builds slide type rules for selected types', () => {
    const rules = buildSlideTypeRules(new Set(['cover', 'telemetry']));
    expect(rules).toContain('### Cover Slide');
    expect(rules).toContain('### Telemetry Slide');
    expect(rules).not.toContain('### Definition Slide');
  });

  it('cover config has 4 headline patterns', () => {
    const cover = getSlideType('cover');
    expect(cover?.headlinePatterns.length).toBe(4);
  });

  it('definition config has hasHeadline=false', () => {
    const def = getSlideType('definition');
    expect(def?.hasHeadline).toBe(false);
  });
});
```

### Integration Tests

```typescript
// Full pipeline test with YAML-loaded configs
it('generates valid slides with config-driven rules', async () => {
  const result = await generateSlides(testBrief, templates, options);
  expect(result.slides.length).toBeGreaterThan(0);
  // Verify all slides have required fields
  for (const slide of result.slides) {
    expect(slide.type).toBeDefined();
    expect(slide.id).toBeDefined();
  }
});
```

---

## 8. Files Changed Summary

| File | Action | Description |
|------|--------|-------------|
| `packages/llm/package.json` | MODIFY | Add `yaml` dependency |
| `packages/llm/slide-types/_global.yaml` | CREATE | Global config |
| `packages/llm/slide-types/*.yaml` (23 files) | CREATE | One per slide type |
| `packages/llm/src/brain/slide-type-loader.ts` | CREATE | Loader module |
| `packages/llm/src/brain/orchestrator.ts` | MODIFY | Replace SLIDE_TYPE_RULES with loader |
| `packages/llm/src/brain/prompts/content-generation.md` | MODIFY | Add Handlebars variables |

**Total: 27 files created, 3 files modified**

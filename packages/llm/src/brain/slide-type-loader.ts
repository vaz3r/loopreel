import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { parse as parseYaml } from 'yaml';

// ─── Types ──────────────────────────────────────────────────────────────────

export interface SlideTypeField {
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
  firstThreeWords?: string;
}

export interface SlideTypeConfig {
  id: string;
  name: string;
  description: string;
  category: string;
  fields: SlideTypeField[];
  headlinePatterns: HeadlinePattern[];
  rules: string[];
  powerWords: string[];
  hasHeadline: boolean;
  hasStats?: boolean;
  hasItems?: boolean;
  hasLeftRight?: boolean;
  maxCount?: number;
}

export interface TemplateSlideTypesConfig {
  inherits: string[];
  types: Record<string, Omit<SlideTypeConfig, 'id'>>;
}

// ─── Path Resolution ────────────────────────────────────────────────────────

function resolveLayoutsDir(): string {
  const candidates = [
    join(process.cwd(), 'packages', 'loop', 'src', 'layouts'),
    join('/app', 'packages', 'loop', 'src', 'layouts'),
    join(import.meta.dirname ?? '.', '..', '..', '..', 'loop', 'src', 'layouts'),
  ];
  for (const dir of candidates) {
    if (existsSync(dir)) return dir;
  }
  return candidates[0]!;
}

const LAYOUTS_DIR = resolveLayoutsDir();
const SHARED_DIR = join(LAYOUTS_DIR, '_shared', 'slide-types');

// ─── YAML Loading ───────────────────────────────────────────────────────────

function loadYamlFile(filePath: string): unknown {
  try {
    const content = readFileSync(filePath, 'utf-8');
    return parseYaml(content);
  } catch {
    return null;
  }
}

function loadSlideTypeFromYaml(filePath: string): SlideTypeConfig | null {
  const data = loadYamlFile(filePath) as Record<string, unknown> | null;
  if (!data || !data.id) return null;

  return {
    id: data.id as string,
    name: (data.name as string) ?? data.id as string,
    description: (data.description as string) ?? '',
    category: (data.category as string) ?? 'general',
    fields: ((data.fields as SlideTypeField[]) ?? []).map(f => ({
      name: f.name,
      type: f.type ?? 'string',
      required: f.required ?? false,
      maxLength: f.maxLength,
      description: f.description ?? '',
      example: f.example,
      notes: f.notes,
    })),
    headlinePatterns: ((data.headlinePatterns as HeadlinePattern[]) ?? []).map(p => ({
      id: p.id,
      name: p.name,
      template: p.template,
      example: p.example,
      emotionalTrigger: p.emotionalTrigger ?? 'general',
      bestFor: p.bestFor ?? '',
      firstThreeWords: p.firstThreeWords,
    })),
    rules: (data.rules as string[]) ?? [],
    powerWords: (data.powerWords as string[]) ?? [],
    hasHeadline: (data.hasHeadline as boolean) ?? true,
    hasStats: data.hasStats as boolean | undefined,
    hasItems: data.hasItems as boolean | undefined,
    hasLeftRight: data.hasLeftRight as boolean | undefined,
    maxCount: data.maxCount as number | undefined,
  };
}

// ─── Shared Types Cache ─────────────────────────────────────────────────────

let _sharedCache: Map<string, SlideTypeConfig> | null = null;

function loadSharedTypes(): Map<string, SlideTypeConfig> {
  if (_sharedCache) return _sharedCache;
  _sharedCache = new Map();

  if (!existsSync(SHARED_DIR)) return _sharedCache;

  const files = readdirSync(SHARED_DIR).filter(f => f.endsWith('.yaml'));
  for (const file of files) {
    const config = loadSlideTypeFromYaml(join(SHARED_DIR, file));
    if (config) {
      _sharedCache.set(config.id, config);
    }
  }
  return _sharedCache;
}

// ─── Template Types Loading ─────────────────────────────────────────────────

export function loadSlideTypesForTemplate(templateId: string): SlideTypeConfig[] {
  const shared = loadSharedTypes();
  const templateDir = join(LAYOUTS_DIR, templateId);
  const yamlPath = join(templateDir, 'slide-types.yaml');

  // If no template-specific YAML, return all shared types
  if (!existsSync(yamlPath)) {
    return Array.from(shared.values());
  }

  const templateConfig = loadYamlFile(yamlPath) as TemplateSlideTypesConfig | null;
  if (!templateConfig) {
    return Array.from(shared.values());
  }

  // Start with inherited shared types
  const result = new Map<string, SlideTypeConfig>();
  const inheritedIds = templateConfig.inherits ?? [];

  for (const id of inheritedIds) {
    const sharedConfig = shared.get(id);
    if (sharedConfig) {
      result.set(id, sharedConfig);
    }
  }

  // Add template-specific types (or override shared ones)
  if (templateConfig.types) {
    for (const [id, typeConfig] of Object.entries(templateConfig.types)) {
      result.set(id, {
        id,
        ...typeConfig,
      });
    }
  }

  return Array.from(result.values());
}

// ─── Builder Functions for Prompts ──────────────────────────────────────────

/**
 * Build the slide type rules section for the content-generation prompt.
 * Returns a formatted string with rules for each selected slide type.
 */
export function buildSlideTypeRules(selectedTypes: Set<string>, templateId: string): string {
  const configs = loadSlideTypesForTemplate(templateId);
  const selected = configs.filter(c => selectedTypes.has(c.id));

  return selected.map(config => {
    const header = `### ${config.name}`;
    const rules = config.rules.map(r => `- ${r}`).join('\n');
    const patterns = config.headlinePatterns.length > 0
      ? '\n**Headline Patterns:**\n' + config.headlinePatterns.map(p =>
        `- **${p.name}**: \`${p.template}\`\n  Example: "${p.example}"\n  Best for: ${p.bestFor}`
      ).join('\n')
      : '';
    return `${header}\n${rules}${patterns}`;
  }).join('\n\n');
}

/**
 * Build the field limits section for the content-generation prompt.
 * Returns a formatted string with character limits for each field.
 */
export function buildFieldLimitsSection(templateId: string): string {
  const configs = loadSlideTypesForTemplate(templateId);
  const limits: string[] = [];

  for (const config of configs) {
    for (const field of config.fields) {
      if (field.maxLength) {
        const required = field.required ? '' : '?';
        limits.push(`${config.id}.${field.name}${required}: max ${field.maxLength} characters`);
      }
    }
  }

  return limits.join('\n');
}

/**
 * Build headline patterns section for the content-generation prompt.
 * Returns patterns for all selected slide types.
 */
export function buildHeadlinePatterns(selectedTypes: Set<string>, templateId: string): string {
  const configs = loadSlideTypesForTemplate(templateId);
  const selected = configs.filter(c => selectedTypes.has(c.id) && c.headlinePatterns.length > 0);

  return selected.map(config => {
    const patterns = config.headlinePatterns.map(p =>
      `- **${p.name}** (${p.emotionalTrigger}): \`${p.template}\`\n  Example: "${p.example}"`
    ).join('\n');
    return `#### ${config.name}\n${patterns}`;
  }).join('\n\n');
}

/**
 * Get all power words for the selected slide types (merged, deduplicated).
 */
export function getAllPowerWords(selectedTypes: Set<string>, templateId: string): string[] {
  const configs = loadSlideTypesForTemplate(templateId);
  const selected = configs.filter(c => selectedTypes.has(c.id));

  const words = new Set<string>();
  for (const config of selected) {
    for (const word of config.powerWords) {
      words.add(word);
    }
  }
  return Array.from(words);
}

/**
 * Check if a slide type has specific behavioral flags.
 */
export function getSlideTypeConfig(typeId: string, templateId: string): SlideTypeConfig | undefined {
  const configs = loadSlideTypesForTemplate(templateId);
  return configs.find(c => c.id === typeId);
}

/**
 * Get all available slide type IDs for a template.
 */
export function getAvailableSlideTypes(templateId: string): string[] {
  const configs = loadSlideTypesForTemplate(templateId);
  return configs.map(c => c.id);
}

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { parseXml } from '../xml-parser.js';
import { xmlToObjects } from './xml-helpers.js';
import type { DomainExamples } from './types.js';
import { renderPrompt } from './prompts/loader.js';

function resolveDomainsDir(): string {
  const candidates = [
    join(process.cwd(), 'packages', 'llm', 'domains'),
    join('/app', 'packages', 'llm', 'domains'),
    join(import.meta.dirname ?? '.', 'domains'),
    join(import.meta.dirname ?? '.', '..', 'domains'),
  ];
  for (const dir of candidates) {
    if (existsSync(dir)) return dir;
  }
  return candidates[0]!;
}

const DOMAINS_DIR = resolveDomainsDir();

let _domainsCache: DomainExamples[] | null = null;

export function loadAllDomains(): DomainExamples[] {
  if (_domainsCache) return _domainsCache;
  try {
    const files = readdirSync(DOMAINS_DIR).filter(f => f.endsWith('.xml'));
    _domainsCache = files.map(file => {
      const xml = readFileSync(join(DOMAINS_DIR, file), 'utf-8');
      const root = parseXml(xml);
      const obj = xmlToObjects(root) as Record<string, unknown>;
      const principlesContainer = obj['principles'] as Record<string, unknown> | undefined;
      const rawPrinciples = (principlesContainer?.['principle'] ?? []) as string[];
      const principles = Array.isArray(rawPrinciples) ? rawPrinciples : [];
      return {
        id: (obj['id'] as string) ?? file.replace('.xml', ''),
        name: (obj['name'] as string) ?? file.replace('.xml', ''),
        description: (obj['description'] as string) ?? '',
        powerWords: ((obj['powerWords'] as string) ?? '').split(',').map(w => w.trim()).filter(Boolean),
        principles,
        fewShotId: (obj['fewShotId'] as string) ?? undefined,
      };
    });
    return _domainsCache;
  } catch {
    _domainsCache = [];
    return [];
  }
}

export function classifyDomainPrompt(briefXml: string, domains: DomainExamples[]): { system: string; user: string } {
  const domainList = domains.map(d => `- **${d.id}**: ${d.description}`).join('\n');
  const system = renderPrompt('classification', { domains: domainList });
  return { system, user: briefXml };
}

export function parseDomainClassification(xml: string, domains: DomainExamples[]): DomainExamples {
  try {
    const obj = xmlToObjects(parseXml(xml)) as Record<string, unknown>;
    const domainId = (obj['domainId'] as string) ?? 'general';
    return domains.find(d => d.id === domainId) ?? domains.find(d => d.id === 'general') ?? domains[0]!;
  } catch {
    return domains.find(d => d.id === 'general') ?? domains[0]!;
  }
}

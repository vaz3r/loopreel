import type { LLMClient } from '../client.js';

export interface TemplateInfo {
  id: string;
  name: string;
  aesthetics: string;
  schemaText: string;
  schemaTextConcise: string;
  toneKeywords: string[];
}

export interface DomainExamples {
  id: string;
  name: string;
  description: string;
  powerWords: string[];
  principles: string[];
  fewShotId?: string;
}

export interface PhaseUsage {
  phase: string;
  promptTokens: number;
  completionTokens: number;
  latencyMs: number;
}

export interface BrainResult {
  slides: Record<string, unknown>[];
  briefXml: string;
  selectionXml: string;
  planXml: string;
  rawGenerationXml: string;
  extractionLatencyMs: number;
  selectionLatencyMs: number;
  planLatencyMs: number;
  generationLatencyMs: number;
  creativeDirectorLatencyMs: number;
  totalLatencyMs: number;
  totalTokens: { input: number; output: number };
  phaseUsages: PhaseUsage[];
  selectedTemplateId: string;
  slidePlan: string[];
  domainId: string;
  domainClassificationMs: number;
  needsReview: boolean;
}

export interface BrainOptions {
  llm: LLMClient;
  brandKit?: Record<string, string | undefined>;
  onProgress?: (phase: string, detail: string) => void;
  onDebug?: (filename: string, content: string) => void;
  checkpoint?: { phase: string; data: Record<string, unknown> };
  retriesUsed?: Record<string, number>;
  onSaveCheckpoint?: (phase: string, data: Record<string, unknown>) => Promise<void>;
}

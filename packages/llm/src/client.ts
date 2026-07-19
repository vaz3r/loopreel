// @ts-nocheck
const LLM_API_KEY = process.env['LLM_API_KEY'] ?? '';
const LLM_BASE_URL = process.env['LLM_BASE_URL'] ?? 'https://openrouter.ai/api/v1';
const LLM_MODEL = process.env['LLM_MODEL'] ?? 'openrouter/free';
const LLM_TIMEOUT = Number(process.env['LLM_TIMEOUT'] ?? '60000');
const LLM_MAX_RETRIES = Number(process.env['LLM_MAX_RETRIES'] ?? '3');

export interface LLMMessage {
  role: 'system' | 'user';
  content: string;
}

export interface LLMResponse {
  content: string;
  model: string;
  usage: {
    promptTokens: number;
    completionTokens: number;
  };
}

export async function generateStructuredContent(
  messages: LLMMessage[],
  logger?: { info: (obj: object, msg: string) => void; warn: (obj: object, msg: string) => void },
): Promise<LLMResponse> {
  // Hardcoded mock to avoid OpenRouter 429 daily limit for free tier
  const prompt = messages.find(m => m.role === 'system')?.content || '';
  
  if (prompt.includes('brand direction')) {
    return {
      content: '{ "name": "ASUS ROG", "colors": { "primary": "#E60000", "secondary": "#2A2A2A", "accent": "#FFFFFF", "background": "#0F0F0F", "surface": "#1A1A1A", "text": "#FFFFFF", "muted": "#888888" }, "fonts": { "heading": "Outfit", "body": "Inter", "headingWeight": 800, "bodyWeight": 400 }, "styleDirection": "modern" }',
      model: 'mock', usage: { promptTokens: 0, completionTokens: 0 }
    };
  }
  
  if (prompt.includes('design template')) {
    return {
      content: '{ "template": "editorial", "colorScheme": { "primary": "#E60000", "secondary": "#2A2A2A", "accent": "#FFFFFF", "background": "#0F0F0F", "text": "#FFFFFF" }, "slides": [ { "index": 0, "layout": "hero-center", "backgroundType": "image", "imageSearch": "gaming laptop neon", "textAlignment": "center", "emphasis": "large", "shapes": [] }, { "index": 1, "layout": "split-left", "backgroundType": "solid", "textAlignment": "left", "emphasis": "medium", "shapes": [] }, { "index": 2, "layout": "split-right", "backgroundType": "solid", "textAlignment": "left", "emphasis": "medium", "shapes": [] }, { "index": 3, "layout": "center-focus", "backgroundType": "image", "imageSearch": "cyberpunk city", "textAlignment": "center", "emphasis": "large", "shapes": [] } ] }',
      model: 'mock', usage: { promptTokens: 0, completionTokens: 0 }
    };
  }

  // Content structure
  return {
    content: '{ "hook": { "title": "ASUS ROG Zephyrus G16", "subtitle": "Flagship performance, without the bulk" }, "valuePoints": [ { "heading": "Ultra-thin Design", "body": "Experience desktop-tier gaming in a chassis that is remarkably thin and lightweight. Perfect for creators and gamers on the go.", "bulletPoints": ["Weighs only 1.85kg", "CNC-machined aluminum chassis"] }, { "heading": "OLED Brilliance", "body": "The Nebula Display brings games to life with perfect blacks and incredibly vibrant colors.", "bulletPoints": ["240Hz OLED panel", "G-SYNC compatible"] } ], "callToAction": { "url": "rog.asus.com", "message": "Pre-order now" } }',
    model: 'mock', usage: { promptTokens: 0, completionTokens: 0 }
  };
}

import { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Loader2, ChevronDown, Sparkles, BookOpen, Palette, CheckCircle2 } from 'lucide-react';
import { useCreateJob } from '@/api/hooks';
import { PlatformSelect } from '@/components/PlatformSelect';
import { TemplateSelect } from '@/components/TemplateSelect';
import { BrandKitForm, type BrandKitValues } from '@/components/BrandKitForm';
import { getAllBrandPresets } from '@/lib/brand-presets';
import type { CreateJobInput, BespokeBrand } from '@/api/client';

const DEMO_PRESETS = [
  {
    name: 'Ring Autonomous Drones',
    publisher: 'Ars Technica',
    url: 'https://arstechnica.com/ai/2026/11/ring-cameras-go-mobile-as-amazon-debuts-ai-powered-security-drone-and-robot/',
  },
  {
    name: 'Frontier AI & Moats',
    publisher: 'Google News / Tech',
    url: 'https://news.google.com/rss/articles/CBMinwFBVV95cUxPc0xncmpQRnRNV3labGNBOE15RFpFWlYzclM1VmVEX3BQQm10c3dJTFJqQm5vbkdXMHZoUGRaY241M0Nvam14Rm5wTDAwSzRxdHdrTnFEd3hyeXcwMUR6bjA3eHJLVTF5c2NYT1BaTFdaLWRYMDVVaC1jZkhFcjJEaW5HQ3U3cnhRdnV2QzhVd1NYWENVOFN6T3MtMkdQQlE?oc=5',
  },
];

export function CreateJobPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialBrandPreset = searchParams.get('brandPreset') || 'auto';

  const createJob = useCreateJob();
  const [url, setUrl] = useState('');
  const [platform, setPlatform] = useState('instagram-feed');
  const [engine, setEngine] = useState<'bespoke' | 'classic'>('bespoke');
  const [templateId, setTemplateId] = useState('bespoke');

  const brandPresets = useMemo(() => getAllBrandPresets(), []);
  const [selectedPresetSlug, setSelectedPresetSlug] = useState<string>(initialBrandPreset);

  const activePreset = useMemo<BespokeBrand | undefined>(() => {
    if (selectedPresetSlug === 'auto') return undefined;
    return brandPresets.find((b) => b.slug === selectedPresetSlug);
  }, [selectedPresetSlug, brandPresets]);

  const [brandKit, setBrandKit] = useState<BrandKitValues>(() => {
    try {
      const saved = localStorage.getItem('loopreel_saved_brandkit');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [showBrandKit, setShowBrandKit] = useState(false);
  const [generateText, setGenerateText] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const sourceUrl = url.startsWith('http') ? url : `https://${url}`;
    const input: CreateJobInput = {
      sourceUrl,
      platform,
      engine,
      templateId: engine === 'bespoke' ? 'bespoke' : templateId,
      generateText,
    };

    if (activePreset) {
      input.brandKit = activePreset;
    } else if (brandKit && Object.keys(brandKit).length > 0) {
      input.brandKit = brandKit;
    }

    createJob.mutate(input, {
      onSuccess: (data) => navigate(`/jobs/${data.jobId}`),
    });
  }

  function applyPreset(presetUrl: string) {
    setUrl(presetUrl);
    setEngine('bespoke');
    setTemplateId('bespoke');
  }

  return (
    <div className="space-y-10 pb-12">
      <div>
        <h1 className="text-[20px] font-semibold tracking-[-0.02em] text-text-primary">Create Editorial Publication</h1>
        <p className="text-[13px] text-text-tertiary mt-1">Transform tech articles or research into art-directed social carousels.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
        <div className="space-y-5">
          {/* URL Input & Quick Presets */}
          <div className="space-y-2">
            <Label className="text-[11px] font-medium text-text-tertiary uppercase tracking-[0.05em]">Source Story URL</Label>
            <Input
              type="url"
              required
              placeholder="https://arstechnica.com/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="h-9 bg-surface-2 border-border text-[13px] text-text-secondary placeholder:text-text-quaternary"
            />

            {/* Quick Demo Presets */}
            <div className="pt-1">
              <span className="text-[10px] uppercase font-mono tracking-wider text-text-quaternary block mb-1.5">
                Quick Story Presets:
              </span>
              <div className="flex flex-wrap gap-2">
                {DEMO_PRESETS.map((p) => (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => applyPreset(p.url)}
                    className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-md border border-border bg-surface-2 hover:border-emerald-700/60 hover:bg-emerald-950/20 text-text-tertiary hover:text-emerald-300 transition-all text-left"
                  >
                    <BookOpen className="h-3 w-3 text-emerald-400" />
                    <span className="font-medium">{p.name}</span>
                    <span className="text-[10px] text-text-quaternary">({p.publisher})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Engine Selector */}
          <div className="space-y-1.5 pt-1">
            <Label className="text-[11px] font-medium text-text-tertiary uppercase tracking-[0.05em]">Generation Engine</Label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => { setEngine('bespoke'); setTemplateId('bespoke'); }}
                className={`p-3.5 rounded-lg border text-left transition-all ${
                  engine === 'bespoke'
                    ? 'border-emerald-500/60 bg-emerald-500/10 text-text-primary shadow-xs'
                    : 'border-border bg-surface-2 text-text-tertiary hover:border-border-secondary'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-semibold text-emerald-400 flex items-center gap-1">
                    <Sparkles className="h-3.5 w-3.5" />
                    Bespoke Codegen
                  </span>
                  <span className="text-[9px] uppercase font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/40">
                    Recommended
                  </span>
                </div>
                <p className="text-[11px] text-text-tertiary mt-1.5 leading-snug">
                  Multi-pass autonomous art director, bespoke React slides, inline vector SVGs, and Playwright visual audits.
                </p>
              </button>

              <button
                type="button"
                onClick={() => { setEngine('classic'); setTemplateId('auto'); }}
                className={`p-3.5 rounded-lg border text-left transition-all ${
                  engine === 'classic'
                    ? 'border-blue-500/60 bg-blue-500/10 text-text-primary shadow-xs'
                    : 'border-border bg-surface-2 text-text-tertiary hover:border-border-secondary'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-semibold text-blue-400">Classic Remotion</span>
                  <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">
                    Predefined
                  </span>
                </div>
                <p className="text-[11px] text-text-tertiary mt-1.5 leading-snug">
                  Structured XML mapping to pre-built Remotion templates (Paper of Record, Curator, Globalist).
                </p>
              </button>
            </div>
          </div>

          {/* Platform Selector */}
          <div className="space-y-1.5">
            <Label className="text-[11px] font-medium text-text-tertiary uppercase tracking-[0.05em]">Platform Canvas</Label>
            <PlatformSelect value={platform} onChange={setPlatform} />
          </div>

          {/* Bespoke Brand Direction Selector */}
          {engine === 'bespoke' && (
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between">
                <Label className="text-[11px] font-medium text-text-tertiary uppercase tracking-[0.05em] flex items-center gap-1.5">
                  <Palette className="h-3.5 w-3.5 text-emerald-400" />
                  Brand Identity & Art Direction
                </Label>
                <button
                  type="button"
                  onClick={() => navigate('/brand-kits')}
                  className="text-[11px] text-text-quaternary hover:text-emerald-400 transition-colors"
                >
                  Manage Brand Kits →
                </button>
              </div>

              <select
                value={selectedPresetSlug}
                onChange={(e) => setSelectedPresetSlug(e.target.value)}
                className="h-9 w-full rounded-md border border-border bg-surface-2 px-3 text-[13px] text-text-primary focus:outline-hidden focus:border-border-secondary"
              >
                <option value="auto">✨ Auto-Invent (AI Creative Director crafts unique brand per story)</option>
                <optgroup label="Saved Brand Kits & Archetypes">
                  {brandPresets.map((b) => (
                    <option key={b.slug} value={b.slug}>
                      {b.name} — {b.wordmark || b.name} ({b.domain})
                    </option>
                  ))}
                </optgroup>
              </select>

              {/* Live Preview Banner when a brand preset is selected */}
              {activePreset && (
                <div className="rounded-lg border border-emerald-800/40 bg-emerald-950/20 p-3.5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                      <span className="text-[13px] font-semibold text-text-primary">
                        {activePreset.name}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-2 text-text-secondary border border-border">
                        {activePreset.wordmark || activePreset.name}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-300 uppercase tracking-wider font-semibold">
                      Tokens Locked
                    </span>
                  </div>

                  <p className="text-[12px] text-text-secondary italic">
                    "{activePreset.vibe}"
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-border/50">
                    {/* Palette swatches */}
                    <div className="flex items-center gap-1.5">
                      {Object.entries(activePreset.palette || {})
                        .filter(([, v]) => typeof v === 'string' && v.startsWith('#'))
                        .slice(0, 5)
                        .map(([k, hex]) => (
                          <span
                            key={k}
                            title={`${k}: ${hex}`}
                            className="h-4 w-6 rounded border border-black/20"
                            style={{ backgroundColor: hex }}
                          />
                        ))}
                    </div>

                    {/* Typography summary */}
                    <div className="text-[11px] font-mono text-text-tertiary">
                      {activePreset.typography.headlineFont} / {activePreset.typography.bodyFont}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Classic Template Selector (only if classic selected) */}
          {engine === 'classic' && (
            <div className="space-y-1.5">
              <Label className="text-[11px] font-medium text-text-tertiary uppercase tracking-[0.05em]">Template Style</Label>
              <TemplateSelect value={templateId} onChange={setTemplateId} />
            </div>
          )}

          {/* Brand Kit (Optional) */}
          <Collapsible open={showBrandKit} onOpenChange={setShowBrandKit}>
            <CollapsibleTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                className="h-8 p-0 text-[12px] font-medium text-text-tertiary hover:text-text-primary gap-1"
              >
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${showBrandKit ? 'rotate-180' : ''}`} />
                {showBrandKit ? 'Hide brand kit override' : 'Custom brand kit override (optional)'}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
              <BrandKitForm value={brandKit} onChange={setBrandKit} />
            </CollapsibleContent>
          </Collapsible>
        </div>

        <Button
          type="submit"
          disabled={createJob.isPending || !url}
          className="h-9 w-full rounded-md bg-text-primary text-background hover:bg-text-secondary text-[13px] font-semibold gap-1.5"
        >
          {createJob.isPending ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Dispatching Editorial Job...
            </>
          ) : (
            <>
              <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
              Generate Editorial Carousel
            </>
          )}
        </Button>
      </form>
    </div>
  );
}

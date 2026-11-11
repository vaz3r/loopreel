import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Loader2, ChevronDown, Sparkles } from 'lucide-react';
import { useCreateJob } from '@/api/hooks';
import { PlatformSelect } from '@/components/PlatformSelect';
import { TemplateSelect } from '@/components/TemplateSelect';
import { BrandKitForm, type BrandKitValues } from '@/components/BrandKitForm';
import type { CreateJobInput } from '@/api/client';

export function CreateJobPage() {
  const navigate = useNavigate();
  const createJob = useCreateJob();
  const [url, setUrl] = useState('');
  const [platform, setPlatform] = useState('instagram-feed');
  const [engine, setEngine] = useState<'bespoke' | 'classic'>('bespoke');
  const [templateId, setTemplateId] = useState('bespoke');
  const [brandKit, setBrandKit] = useState<BrandKitValues>(() => {
    try {
      const saved = localStorage.getItem('loopreel_saved_brandkit');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [showBrandKit, setShowBrandKit] = useState(() => {
    try {
      return Boolean(localStorage.getItem('loopreel_saved_brandkit'));
    } catch {
      return false;
    }
  });
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
    if (brandKit && Object.keys(brandKit).length > 0) {
      input.brandKit = brandKit;
    }
    createJob.mutate(input, {
      onSuccess: (data) => navigate(`/jobs/${data.jobId}`),
    });
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-[20px] font-semibold tracking-[-0.02em] text-text-primary">New Job</h1>
        <p className="text-[13px] text-text-tertiary mt-1">Generate social media content from any URL.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-[11px] font-medium text-text-tertiary uppercase tracking-[0.05em]">URL</Label>
            <Input
              type="url"
              required
              placeholder="https://example.com/article"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="h-9 bg-surface-2 border-border text-[13px] text-text-secondary placeholder:text-text-quaternary"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-[11px] font-medium text-text-tertiary uppercase tracking-[0.05em]">Generation Engine</Label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => { setEngine('bespoke'); setTemplateId('bespoke'); }}
                className={`p-3 rounded-lg border text-left transition-all ${
                  engine === 'bespoke'
                    ? 'border-emerald-500/50 bg-emerald-500/10 text-text-primary'
                    : 'border-border bg-surface-2 text-text-tertiary hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-medium text-emerald-400">Bespoke Codegen</span>
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/40">New</span>
                </div>
                <p className="text-[11px] text-text-tertiary mt-1 leading-snug">
                  Autonomous brand design, custom layout topologies, and inline vector SVGs.
                </p>
              </button>

              <button
                type="button"
                onClick={() => { setEngine('classic'); setTemplateId('auto'); }}
                className={`p-3 rounded-lg border text-left transition-all ${
                  engine === 'classic'
                    ? 'border-blue-500/50 bg-blue-500/10 text-text-primary'
                    : 'border-border bg-surface-2 text-text-tertiary hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-medium text-blue-400">Classic Remotion</span>
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">Preset</span>
                </div>
                <p className="text-[11px] text-text-tertiary mt-1 leading-snug">
                  Strict layout templates (The Paper of Record, The Globalist, etc.).
                </p>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-[11px] font-medium text-text-tertiary uppercase tracking-[0.05em]">Platform</Label>
              <PlatformSelect value={platform} onChange={setPlatform} />
            </div>

            {engine === 'classic' ? (
              <div className="space-y-1.5">
                <Label className="text-[11px] font-medium text-text-tertiary uppercase tracking-[0.05em]">Classic Template</Label>
                <TemplateSelect value={templateId} onChange={setTemplateId} />
                <p className="text-[10px] text-text-tertiary">
                  {templateId === 'auto' ? 'AI classifier auto-selects' : 'Fixed template locked'}
                </p>
              </div>
            ) : (
              <div className="space-y-1.5">
                <Label className="text-[11px] font-medium text-text-tertiary uppercase tracking-[0.05em]">Design Mode</Label>
                <div className="h-9 px-3 rounded-md border border-emerald-900/40 bg-emerald-950/20 flex items-center gap-1.5 text-[12px] text-emerald-300">
                  <Sparkles className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>Autonomous Art Direction</span>
                </div>
                <p className="text-[10px] text-text-tertiary">100% tailored React + Tailwind</p>
              </div>
            )}
          </div>
        </div>

        <Collapsible open={showBrandKit} onOpenChange={setShowBrandKit}>
          <CollapsibleTrigger className="flex items-center gap-2 text-[12px] text-text-quaternary hover:text-text-tertiary transition-colors">
            <ChevronDown className={`h-3 w-3 transition-transform ${showBrandKit ? 'rotate-180' : ''}`} />
            Brand Kit
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-3">
            <div className="rounded-md border border-border bg-surface-1 p-4">
              <BrandKitForm value={brandKit ?? {}} onChange={setBrandKit} />
            </div>
          </CollapsibleContent>
        </Collapsible>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="generateText"
            checked={generateText}
            onChange={(e) => setGenerateText(e.target.checked)}
            className="h-4 w-4 rounded border-border bg-surface-2 accent-text-primary"
          />
          <Label htmlFor="generateText" className="text-[13px] text-text-tertiary cursor-pointer">
            Generate LinkedIn &amp; Twitter text
          </Label>
        </div>

        <Button
          type="submit"
          className="h-9 rounded-md bg-text-primary text-background hover:bg-text-secondary px-4 text-[13px] font-medium"
          disabled={createJob.isPending || !url}
        >
          {createJob.isPending && <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />}
          Generate
        </Button>
      </form>
    </div>
  );
}

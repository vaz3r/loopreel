import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Loader2, ChevronDown } from 'lucide-react';
import { useCreateJob } from '@/api/hooks';
import { PlatformSelect } from '@/components/PlatformSelect';
import { TemplateSelect } from '@/components/TemplateSelect';
import { BrandKitForm } from '@/components/BrandKitForm';
import type { CreateJobInput } from '@/api/client';

export function CreateJobPage() {
  const navigate = useNavigate();
  const createJob = useCreateJob();
  const [url, setUrl] = useState('');
  const [platform, setPlatform] = useState('instagram-feed');
  const [templateId, setTemplateId] = useState('auto');
  const [brandKit, setBrandKit] = useState<CreateJobInput['brandKit']>({});
  const [showBrandKit, setShowBrandKit] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const sourceUrl = url.startsWith('http') ? url : `https://${url}`;
    const input: CreateJobInput = { sourceUrl, platform, templateId };
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

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-[11px] font-medium text-text-tertiary uppercase tracking-[0.05em]">Platform</Label>
              <PlatformSelect value={platform} onChange={setPlatform} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[11px] font-medium text-text-tertiary uppercase tracking-[0.05em]">Template</Label>
              <TemplateSelect value={templateId} onChange={setTemplateId} />
            </div>
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

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Loader2, ChevronDown, Sparkles } from 'lucide-react';
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
    const input: CreateJobInput = {
      sourceUrl,
      platform,
      templateId,
    };
    if (brandKit && Object.keys(brandKit).length > 0) {
      input.brandKit = brandKit;
    }
    createJob.mutate(input, {
      onSuccess: (data) => navigate(`/jobs/${data.jobId}`),
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">New Job</h1>
        <p className="text-muted-foreground">Generate social media content from any URL.</p>
      </div>

      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>Source Content</CardTitle>
          <CardDescription>Paste a URL to any article, video, or podcast.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                type="url"
                required
                placeholder="https://example.com/article"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Platform</Label>
                <PlatformSelect value={platform} onChange={setPlatform} />
              </div>
              <div className="space-y-2">
                <Label>Template</Label>
                <TemplateSelect value={templateId} onChange={setTemplateId} />
              </div>
            </div>

            <Collapsible open={showBrandKit} onOpenChange={setShowBrandKit}>
              <CollapsibleTrigger asChild>
                <Button variant="outline" type="button" className="w-full justify-between">
                  Brand Kit
                  <ChevronDown className={`h-4 w-4 transition-transform ${showBrandKit ? 'rotate-180' : ''}`} />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-4">
                <div className="rounded-lg border p-4">
                  <BrandKitForm value={brandKit ?? {}} onChange={setBrandKit} />
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Button type="submit" className="w-full" disabled={createJob.isPending || !url}>
              {createJob.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Generate Content
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

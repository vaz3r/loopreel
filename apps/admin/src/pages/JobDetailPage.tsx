import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Download, ClipboardCopy, Check } from 'lucide-react';
import { useJob } from '@/api/hooks';
import { StatusTimeline } from '@/components/StatusTimeline';
import { SlidePreview } from '@/components/SlidePreview';
import { PLATFORM_LABELS } from '@/lib/constants';

export function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: job, isLoading, error } = useJob(id!);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  function copyToClipboard(text: string, label: string) {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive text-lg">Failed to load job</p>
        <p className="text-muted-foreground text-sm mt-1">{error?.message ?? 'Not found'}</p>
        <Button variant="ghost" asChild className="mt-4">
          <Link to="/jobs"><ArrowLeft className="mr-2 h-4 w-4" />Back to jobs</Link>
        </Button>
      </div>
    );
  }

  const linkedinPost = job.assets.find(
    (a) => a.formatType === 'linkedin_post' && a.contentText,
  );
  const twitterThread = job.assets.find(
    (a) => a.formatType === 'twitter_thread' && a.contentText,
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/jobs"><ArrowLeft className="h-4 w-4" /></Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold tracking-tight">Job Details</h1>
          <p className="text-xs text-muted-foreground font-mono">{job.id}</p>
        </div>
        {job.status === 'complete' && (
          <Button asChild>
            <a href={`/api/jobs/${job.id}/download?format=all`}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </a>
          </Button>
        )}
      </div>

      <StatusTimeline job={job} />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="p-3">
            <p className="text-xs text-muted-foreground">Source</p>
            <p className="text-sm font-medium truncate mt-1">{job.sourceUrl}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3">
            <p className="text-xs text-muted-foreground">Platform</p>
            <p className="text-sm font-medium mt-1">{PLATFORM_LABELS[job.platform] ?? job.platform}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3">
            <p className="text-xs text-muted-foreground">Template</p>
            <p className="text-sm font-medium mt-1">{job.templateId}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3">
            <p className="text-xs text-muted-foreground">Slides</p>
            <p className="text-sm font-medium mt-1">{job.slideCount ?? '—'}</p>
          </CardContent>
        </Card>
      </div>

      <SlidePreview job={job} />

      {linkedinPost && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">LinkedIn Post</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(linkedinPost.contentText!, 'linkedin')}
              >
                {copiedText === 'linkedin' ? (
                  <Check className="h-4 w-4 text-emerald-500" />
                ) : (
                  <ClipboardCopy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-sans">
              {linkedinPost.contentText}
            </pre>
          </CardContent>
        </Card>
      )}

      {twitterThread && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Twitter Thread</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(twitterThread.contentText!, 'twitter')}
              >
                {copiedText === 'twitter' ? (
                  <Check className="h-4 w-4 text-emerald-500" />
                ) : (
                  <ClipboardCopy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-sans">
              {twitterThread.contentText}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

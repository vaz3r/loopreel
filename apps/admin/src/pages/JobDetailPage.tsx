import { useParams, Link } from 'react-router-dom';
import { useJob } from '../api/hooks';
import { StatusTimeline } from '../components/StatusTimeline';
import { SlidePreview } from '../components/SlidePreview';
import { PLATFORM_LABELS } from '../lib/constants';
import { ArrowLeft, Download, Copy, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: job, isLoading, error } = useJob(id!);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-500">Loading…</div>
    );
  }

  if (error || !job) {
    return (
      <div className="py-20 text-center text-red-400">
        {error?.message ?? 'Job not found'}
      </div>
    );
  }

  const linkedinPost = job.assets.find((a) => a.formatType === 'linkedin_post');
  const twitterThread = job.assets.find((a) => a.formatType === 'twitter_thread');

  return (
    <div>
      <Link to="/jobs" className="mb-4 inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-200">
        <ArrowLeft className="h-4 w-4" /> Back to jobs
      </Link>

      <div className="mt-2 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">Job Details</h1>
          <p className="mt-1 font-mono text-xs text-gray-500">{job.id}</p>
        </div>
        {job.status === 'complete' && (
          <a
            href={`/api/jobs/${job.id}/download?format=all`}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500"
          >
            <Download className="h-4 w-4" />
            Download All
          </a>
        )}
      </div>

      <div className="mt-6 space-y-6">
        <div className="rounded-lg border border-gray-800 bg-gray-900 p-4">
          <h2 className="mb-3 text-sm font-medium text-gray-300">Pipeline Progress</h2>
          <StatusTimeline job={job} />
          {job.errorPayload && (
            <div className="mt-3 rounded bg-red-900/30 p-3 text-xs text-red-300">
              <p className="font-medium">Error at {job.errorPayload.stage}: {job.errorPayload.reason}</p>
              {job.errorPayload.details && <p className="mt-1 text-red-400/70">{job.errorPayload.details}</p>}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-lg border border-gray-800 bg-gray-900 p-3">
            <p className="text-xs text-gray-500">Source</p>
            <p className="mt-1 truncate text-sm text-gray-300" title={job.sourceUrl}>{job.sourceUrl}</p>
          </div>
          <div className="rounded-lg border border-gray-800 bg-gray-900 p-3">
            <p className="text-xs text-gray-500">Platform</p>
            <p className="mt-1 text-sm text-gray-300">{PLATFORM_LABELS[job.platform] ?? job.platform}</p>
          </div>
          <div className="rounded-lg border border-gray-800 bg-gray-900 p-3">
            <p className="text-xs text-gray-500">Template</p>
            <p className="mt-1 text-sm text-gray-300">{job.templateId}</p>
          </div>
          <div className="rounded-lg border border-gray-800 bg-gray-900 p-3">
            <p className="text-xs text-gray-500">Slides</p>
            <p className="mt-1 text-sm text-gray-300">{job.slideCount ?? '—'}</p>
          </div>
        </div>

        <div>
          <h2 className="mb-3 text-sm font-medium text-gray-300">Slides</h2>
          <SlidePreview job={job} />
        </div>

        {linkedinPost?.contentText && (
          <div className="rounded-lg border border-gray-800 bg-gray-900 p-4">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-sm font-medium text-gray-300">LinkedIn Post</h2>
              <button
                onClick={() => copyToClipboard(linkedinPost.contentText!, 'linkedin')}
                className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-gray-200"
              >
                {copiedText === 'linkedin' ? <CheckCircle className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                Copy
              </button>
            </div>
            <pre className="whitespace-pre-wrap rounded bg-gray-800/50 p-3 text-xs text-gray-300">
              {linkedinPost.contentText}
            </pre>
          </div>
        )}

        {twitterThread?.contentText && (
          <div className="rounded-lg border border-gray-800 bg-gray-900 p-4">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-sm font-medium text-gray-300">Twitter Thread</h2>
              <button
                onClick={() => copyToClipboard(twitterThread.contentText!, 'twitter')}
                className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-gray-200"
              >
                {copiedText === 'twitter' ? <CheckCircle className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                Copy
              </button>
            </div>
            <pre className="whitespace-pre-wrap rounded bg-gray-800/50 p-3 text-xs text-gray-300">
              {twitterThread.contentText}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

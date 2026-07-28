import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateJob } from '../api/hooks';
import { PlatformSelect } from '../components/PlatformSelect';
import { TemplateSelect } from '../components/TemplateSelect';
import { BrandKitForm } from '../components/BrandKitForm';
import { ChevronDown, ChevronUp, Loader2 } from 'lucide-react';

export function CreateJobPage() {
  const navigate = useNavigate();
  const createJob = useCreateJob();

  const [url, setUrl] = useState('');
  const [platform, setPlatform] = useState('instagram-feed');
  const [templateId, setTemplateId] = useState('auto');
  const [brandKit, setBrandKit] = useState({});
  const [showBrandKit, setShowBrandKit] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createJob.mutate(
      { sourceUrl: url, platform, templateId, brandKit: Object.keys(brandKit).length > 0 ? brandKit : undefined },
      { onSuccess: (data) => navigate(`/jobs/${data.jobId}`) },
    );
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-100">New Content Job</h1>
      <p className="mt-1 text-sm text-gray-400">
        Submit a URL to generate a multi-format social carousel.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-300">Source URL</label>
          <input
            type="url"
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/article or YouTube URL"
            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-300">Platform</label>
            <PlatformSelect value={platform} onChange={setPlatform} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-300">Template</label>
            <TemplateSelect value={templateId} onChange={setTemplateId} />
          </div>
        </div>

        <div>
          <button
            type="button"
            onClick={() => setShowBrandKit(!showBrandKit)}
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-200"
          >
            {showBrandKit ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            Brand Kit (optional)
          </button>
          {showBrandKit && (
            <div className="mt-3 rounded-lg border border-gray-800 bg-gray-900/50 p-4">
              <BrandKitForm value={brandKit} onChange={setBrandKit as never} />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={createJob.isPending || !url}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {createJob.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          {createJob.isPending ? 'Creating…' : 'Generate Content'}
        </button>
      </form>
    </div>
  );
}

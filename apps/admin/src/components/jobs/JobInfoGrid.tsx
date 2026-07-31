import { PLATFORM_LABELS } from '@/lib/constants';

interface JobInfoGridProps {
  sourceUrl: string;
  platform: string;
  templateId: string;
  slideCount: number | null;
}

export function JobInfoGrid({ sourceUrl, platform, templateId, slideCount }: JobInfoGridProps) {
  return (
    <div className="grid grid-cols-2 gap-px bg-border rounded-lg overflow-hidden sm:grid-cols-4">
      {[
        { label: 'Source', value: sourceUrl, truncate: true },
        { label: 'Platform', value: PLATFORM_LABELS[platform] ?? platform },
        { label: 'Template', value: templateId },
        { label: 'Slides', value: String(slideCount ?? '—') },
      ].map((item) => (
        <div key={item.label} className="bg-card p-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.05em] text-text-quaternary">{item.label}</p>
          <p className={`text-[13px] text-text-secondary mt-1 ${item.truncate ? 'truncate' : ''}`}>{item.value}</p>
        </div>
      ))}
    </div>
  );
}

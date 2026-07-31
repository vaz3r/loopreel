import { useState } from 'react';
import { ClipboardCopy, Check } from 'lucide-react';

interface SocialPostCardProps {
  title: string;
  content: string;
  copyLabel: string;
}

export function SocialPostCard({ title, content, copyLabel }: SocialPostCardProps) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[13px] font-medium text-text-secondary">{title}</h3>
        <button
          onClick={handleCopy}
          className="text-[12px] text-text-quaternary hover:text-text-tertiary transition-colors flex items-center gap-1"
        >
          {copied ? (
            <><Check className="h-3 w-3" /> Copied</>
          ) : (
            <><ClipboardCopy className="h-3 w-3" /> Copy</>
          )}
        </button>
      </div>
      <pre className="text-[13px] text-text-tertiary whitespace-pre-wrap font-sans leading-relaxed bg-surface-1 rounded-md p-3 max-h-64 overflow-y-auto border border-border">
        {content}
      </pre>
    </div>
  );
}

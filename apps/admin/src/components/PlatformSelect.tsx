import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PLATFORM_LABELS } from '@/lib/constants';

export function PlatformSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-9 bg-surface-2 border-border text-[13px] text-text-secondary">
        <SelectValue placeholder="Select platform" />
      </SelectTrigger>
      <SelectContent className="bg-surface-2 border-border">
        {Object.entries(PLATFORM_LABELS).map(([key, label]) => (
          <SelectItem key={key} value={key} className="text-[13px] text-text-secondary focus:bg-surface-hover focus:text-text-primary">
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

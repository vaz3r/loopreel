interface BrandKitValues {
  bg?: string;
  text?: string;
  accent?: string;
  fontSerif?: string;
  fontSans?: string;
  logoUrl?: string;
}

export function BrandKitForm({
  value,
  onChange,
}: {
  value: BrandKitValues;
  onChange: (v: BrandKitValues) => void;
}) {
  const update = (key: keyof BrandKitValues, val: string) => {
    onChange({ ...value, [key]: val || undefined });
  };

  return (
    <div className="space-y-3">
      <p className="text-xs text-gray-500">Optional brand customization</p>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-xs text-gray-400">Background Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={value.bg ?? '#000000'}
              onChange={(e) => update('bg', e.target.value)}
              className="h-8 w-8 cursor-pointer rounded border border-gray-700 bg-transparent"
            />
            <input
              type="text"
              value={value.bg ?? ''}
              onChange={(e) => update('bg', e.target.value)}
              placeholder="#000000"
              className="flex-1 rounded border border-gray-700 bg-gray-800 px-2 py-1 text-xs text-gray-100 focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-xs text-gray-400">Text Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={value.text ?? '#ffffff'}
              onChange={(e) => update('text', e.target.value)}
              className="h-8 w-8 cursor-pointer rounded border border-gray-700 bg-transparent"
            />
            <input
              type="text"
              value={value.text ?? ''}
              onChange={(e) => update('text', e.target.value)}
              placeholder="#ffffff"
              className="flex-1 rounded border border-gray-700 bg-gray-800 px-2 py-1 text-xs text-gray-100 focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-xs text-gray-400">Accent Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={value.accent ?? '#6366f1'}
              onChange={(e) => update('accent', e.target.value)}
              className="h-8 w-8 cursor-pointer rounded border border-gray-700 bg-transparent"
            />
            <input
              type="text"
              value={value.accent ?? ''}
              onChange={(e) => update('accent', e.target.value)}
              placeholder="#6366f1"
              className="flex-1 rounded border border-gray-700 bg-gray-800 px-2 py-1 text-xs text-gray-100 focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-xs text-gray-400">Serif Font</label>
          <input
            type="text"
            value={value.fontSerif ?? ''}
            onChange={(e) => update('fontSerif', e.target.value)}
            placeholder="e.g. Playfair Display"
            className="w-full rounded border border-gray-700 bg-gray-800 px-2 py-1 text-xs text-gray-100 focus:border-indigo-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-gray-400">Sans Font</label>
          <input
            type="text"
            value={value.fontSans ?? ''}
            onChange={(e) => update('fontSans', e.target.value)}
            placeholder="e.g. Inter"
            className="w-full rounded border border-gray-700 bg-gray-800 px-2 py-1 text-xs text-gray-100 focus:border-indigo-500 focus:outline-none"
          />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-xs text-gray-400">Logo URL</label>
        <input
          type="url"
          value={value.logoUrl ?? ''}
          onChange={(e) => update('logoUrl', e.target.value)}
          placeholder="https://example.com/logo.png"
          className="w-full rounded border border-gray-700 bg-gray-800 px-2 py-1 text-xs text-gray-100 focus:border-indigo-500 focus:outline-none"
        />
      </div>
    </div>
  );
}

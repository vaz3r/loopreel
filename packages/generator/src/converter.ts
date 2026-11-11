import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATES_ROOT = path.resolve(__dirname, '../templates');
const LOOP_ROOT = path.resolve(__dirname, '../../loop');
const SCHEMAS_ROOT = path.resolve(__dirname, '../../schemas');

function toPascalCase(str: string): string {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase())
    .replace(/[\s-_]+/g, '');
}

export function convertTemplateToLoop(templateSlug: string): void {
  const sourceDir = path.join(TEMPLATES_ROOT, templateSlug);
  if (!fs.existsSync(sourceDir)) {
    console.error(`[Error] Template directory not found at: ${sourceDir}`);
    process.exit(1);
  }

  const brandPath = path.join(sourceDir, 'brand.json');
  const deckPath = path.join(sourceDir, 'deck.json');
  if (!fs.existsSync(brandPath) || !fs.existsSync(deckPath)) {
    console.error(`[Error] brand.json or deck.json missing in ${sourceDir}`);
    process.exit(1);
  }

  const brand = JSON.parse(fs.readFileSync(brandPath, 'utf-8'));
  const deck = JSON.parse(fs.readFileSync(deckPath, 'utf-8'));
  const targetDir = path.join(LOOP_ROOT, 'src/layouts', templateSlug);
  const pascalName = toPascalCase(templateSlug);

  console.log(`\nConverting "${brand.name}" (${templateSlug}) to production Loopreel layout...`);
  console.log(`Target: ${targetDir}`);

  // Create isolated layout folder
  fs.mkdirSync(targetDir, { recursive: true });

  // 1. brandkit.ts
  const brandkitContent = `export interface ${pascalName}BrandKit {
  bg?: string;
  text?: string;
  accent?: string;
  surface?: string;
  border?: string;
  fontHeadline?: string;
  fontSans?: string;
  wordmark?: string;
  handle?: string;
}

export const defaultBrandKit: ${pascalName}BrandKit = {
  bg: '${brand.palette.paper}',
  text: '${brand.palette.ink}',
  accent: '${brand.palette.accent}',
  surface: '${brand.palette.surface}',
  border: '${brand.palette.border}',
  fontHeadline: '${brand.typography.headlineFont}',
  fontSans: '${brand.typography.bodyFont}',
  wordmark: '${brand.wordmark}',
  handle: '${brand.handle}',
};
`;
  fs.writeFileSync(path.join(targetDir, 'brandkit.ts'), brandkitContent, 'utf-8');

  // 2. sample-slides.ts
  const sampleSlidesContent = `export default ${JSON.stringify(deck, null, 2)};\n`;
  fs.writeFileSync(path.join(targetDir, 'sample-slides.ts'), sampleSlidesContent, 'utf-8');

  // 3. schema.ts
  const schemaContent = `import { z } from 'zod';

export const ${pascalName}SlideSchema = z.object({
  id: z.string(),
  type: z.string(),
  headline: z.string().optional(),
  title: z.string().optional(),
  subheadline: z.string().optional(),
  tag: z.string().optional(),
  metrics: z.array(z.any()).optional(),
  steps: z.array(z.any()).optional(),
  quote: z.string().optional(),
  attribution: z.string().optional(),
});

export const ${pascalName}Contract = z.object({
  slides: z.array(${pascalName}SlideSchema),
});
`;
  fs.writeFileSync(path.join(targetDir, 'schema.ts'), schemaContent, 'utf-8');

  // 4. frame.module.css
  const frameCssContent = `.frame {
  width: 1080px;
  height: 1350px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 64px;
  box-sizing: border-box;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 32px;
  border-bottom: 1px solid var(--border-color, rgba(0, 0, 0, 0.1));
}

.wordmark {
  font-family: var(--font-headline);
  font-weight: 800;
  font-size: 24px;
  letter-spacing: -0.02em;
}

.tag {
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  opacity: 0.75;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  margin: 40px 0;
}

.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 32px;
  border-top: 1px solid var(--border-color, rgba(0, 0, 0, 0.1));
  font-size: 14px;
}
`;
  fs.writeFileSync(path.join(targetDir, 'frame.module.css'), frameCssContent, 'utf-8');

  // 5. frame.tsx
  const frameTsxContent = `import React from 'react';
import type { FrameProps } from '../shared/types';
import { AutoFit } from '../shared/AutoFit';
import type { ${pascalName}BrandKit } from './brandkit';
import styles from './frame.module.css';

export default function ${pascalName}Frame({ slide, children, brandKit, density }: FrameProps) {
  const s = slide as any;
  const tag = s.tag || '${brand.domain}';
  const bk = brandKit as ${pascalName}BrandKit | undefined;

  const bg = bk?.bg || '${brand.palette.paper}';
  const text = bk?.text || '${brand.palette.ink}';
  const accent = bk?.accent || '${brand.palette.accent}';
  const surface = bk?.surface || '${brand.palette.surface}';
  const border = bk?.border || '${brand.palette.border}';
  const fontHeadline = bk?.fontHeadline || '${brand.typography.headlineFont}';
  const fontSans = bk?.fontSans || '${brand.typography.bodyFont}';
  const wordmark = bk?.wordmark || '${brand.wordmark}';
  const handle = bk?.handle || '${brand.handle}';

  return (
    <div
      className={styles.frame}
      style={{
        background: bg,
        color: text,
        '--font-headline': \`'\${fontHeadline}', serif\`,
        '--font-sans': \`'\${fontSans}', sans-serif\`,
        '--accent-color': accent,
        '--surface-color': surface,
        '--border-color': border,
        '--k': density?.k ?? 1.0,
        ...(density?.cssVariables || {}),
      } as React.CSSProperties}
    >
      <div className={styles.header}>
        <span className={styles.wordmark}>{wordmark}</span>
        <span className={styles.tag}>{tag}</span>
      </div>

      <div className={styles.content}>
        <AutoFit verticalAlign={density?.mode === 'compact' ? 'flex-start' : 'center'}>
          {children}
        </AutoFit>
      </div>

      <div className={styles.footer}>
        <span style={{ color: accent, fontWeight: 700 }}>{s.index !== undefined ? String(s.index + 1).padStart(2, '0') : '01'}</span>
        <span style={{ opacity: 0.65 }}>{handle}</span>
      </div>
    </div>
  );
}
`;
  fs.writeFileSync(path.join(targetDir, 'frame.tsx'), frameTsxContent, 'utf-8');

  // 6. layout.tsx
  const layoutContent = `import Frame from './frame';
import sampleSlides from './sample-slides';

export const templateMeta = {
  id: '${templateSlug}',
  name: '${brand.name}',
  schemeId: 'custom_brand',
  visualDescription: '${brand.vibe}',
};

export { default as frame } from './frame';

// Map archetype slide renderers
export const slides: Record<string, any> = {};

export function getLayout(type: string) {
  return slides[type] ?? slides.cover;
}
`;
  fs.writeFileSync(path.join(targetDir, 'layout.tsx'), layoutContent, 'utf-8');

  // 7. index.ts
  fs.writeFileSync(path.join(targetDir, 'index.ts'), `export * from './layout';\n`, 'utf-8');

  console.log(`[Success] Template converted and placed in packages/loop/src/layouts/${templateSlug}`);
}

// CLI entry
const args = process.argv.slice(2);
if (args[0]) {
  convertTemplateToLoop(args[0]);
}

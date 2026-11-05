import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const templateId = args[0];
const templateName = args[1] || templateId;

if (!templateId) {
  console.error('Usage: pnpm run create-template <template-id> [Template Name]');
  console.error('Example: pnpm run create-template the-signal "The Signal"');
  process.exit(1);
}

const rootDir = process.cwd();
const starterDir = path.join(rootDir, 'packages/loop/src/layouts/_starter');
const targetDir = path.join(rootDir, `packages/loop/src/layouts/${templateId}`);

if (fs.existsSync(targetDir)) {
  console.error(`Error: Template directory already exists at ${targetDir}`);
  process.exit(1);
}

console.log(`Creating new isolated template: "${templateName}" (${templateId})...`);

// 1. Copy starter folder
fs.cpSync(starterDir, targetDir, { recursive: true });

// 2. Customize layout.tsx
const layoutPath = path.join(targetDir, 'layout.tsx');
let layoutContent = fs.readFileSync(layoutPath, 'utf8');
layoutContent = layoutContent
  .replace(/id: 'starter'/g, `id: '${templateId}'`)
  .replace(/name: 'Starter Template'/g, `name: '${templateName}'`);
fs.writeFileSync(layoutPath, layoutContent, 'utf8');

// 3. Customize brandkit.ts
const brandkitPath = path.join(targetDir, 'brandkit.ts');
let brandkitContent = fs.readFileSync(brandkitPath, 'utf8');
brandkitContent = brandkitContent
  .replace(/wordmark: 'THE SIGNAL'/g, `wordmark: '${templateName.toUpperCase()}'`)
  .replace(/handle: '@thesignal'/g, `handle: '@${templateId.replace(/-/g, '')}'`);
fs.writeFileSync(brandkitPath, brandkitContent, 'utf8');

// 3b. Customize schema.ts
const contractName = `${toPascalCase(templateId)}Contract`;
const schemaPath = path.join(targetDir, 'schema.ts');
if (fs.existsSync(schemaPath)) {
  let schemaContent = fs.readFileSync(schemaPath, 'utf8');
  schemaContent = schemaContent
    .replace(/StarterSlideSchema/g, `${toPascalCase(templateId)}SlideSchema`)
    .replace(/StarterContract/g, contractName)
    .replace(/StarterSlide/g, `${toPascalCase(templateId)}Slide`);
  fs.writeFileSync(schemaPath, schemaContent, 'utf8');
}

// 3c. Register contract in packages/loop/src/contracts.ts
const contractsPath = path.join(rootDir, 'packages/loop/src/contracts.ts');
let contractsContent = fs.readFileSync(contractsPath, 'utf8');
const contractExport = `export { ${contractName} } from './layouts/${templateId}/schema.js';\n`;
if (!contractsContent.includes(contractExport)) {
  contractsContent += contractExport;
  fs.writeFileSync(contractsPath, contractsContent, 'utf8');
}

// 3d. Register contract in packages/loop/src/bridge/schemas.ts
const bridgeSchemasPath = path.join(rootDir, 'packages/loop/src/bridge/schemas.ts');
let bridgeSchemasContent = fs.readFileSync(bridgeSchemasPath, 'utf8');
const bridgeContractExport = `export { ${contractName} } from '../contracts.js';\n`;
if (!bridgeSchemasContent.includes(bridgeContractExport)) {
  bridgeSchemasContent += bridgeContractExport;
  fs.writeFileSync(bridgeSchemasPath, bridgeContractExport, 'utf8');
}

// 4. Update packages/loop/src/layouts/index.ts
const loopIndexPath = path.join(rootDir, 'packages/loop/src/layouts/index.ts');
let loopIndexContent = fs.readFileSync(loopIndexPath, 'utf8');

const importStatement = `import * as ${toPascalCase(templateId)} from './${templateId}/layout.js';\n`;
if (!loopIndexContent.includes(importStatement)) {
  const lastImportIndex = loopIndexContent.lastIndexOf('import * as');
  const endOfLine = loopIndexContent.indexOf('\n', lastImportIndex);
  loopIndexContent = loopIndexContent.slice(0, endOfLine + 1) + importStatement + loopIndexContent.slice(endOfLine + 1);

  loopIndexContent = loopIndexContent.replace(
    /const templateIndex: Record<string, typeof PaperOfRecord> = \{([\s\S]*?)\};/,
    (match, p1) => {
      if (!p1.includes(`'${templateId}':`)) {
        return `const templateIndex: Record<string, typeof PaperOfRecord> = {${p1}  '${templateId}': ${toPascalCase(templateId)},\n};`;
      }
      return match;
    }
  );

  fs.writeFileSync(loopIndexPath, loopIndexContent, 'utf8');
  console.log(`Registered template in packages/loop/src/layouts/index.ts`);
}

// 5. Update packages/schemas/src/index.ts
const schemasIndexPath = path.join(rootDir, 'packages/schemas/src/index.ts');
let schemasContent = fs.readFileSync(schemasIndexPath, 'utf8');
if (!schemasContent.includes(`'${templateId}',`)) {
  schemasContent = schemasContent.replace(
    /'the-academic',\n\] as const;/,
    `'the-academic',\n  '${templateId}',\n] as const;`
  );
  fs.writeFileSync(schemasIndexPath, schemasContent, 'utf8');
  console.log(`Registered template key in packages/schemas/src/index.ts`);
}

// 6. Update packages/loop/src/bridge/registry.ts
const registryPath = path.join(rootDir, 'packages/loop/src/bridge/registry.ts');
let registryContent = fs.readFileSync(registryPath, 'utf8');
if (!registryContent.includes(`'${templateId}':`)) {
  const importRegex = /(import \{ [^}]+ \} from '\.\/schemas\.js';)/;
  if (!registryContent.includes(`import { ${contractName} }`)) {
    registryContent = registryContent.replace(
      importRegex,
      `$1\nimport { ${contractName} } from './schemas.js';`
    );
  }

  const newEntry = `  '${templateId}': {
    id: '${templateId}',
    name: '${templateName}',
    schemeId: 'custom_brand',
    schema: ${contractName},
    defaultPlatform: 'instagram-feed',
    toneKeywords: ['${templateId.replace(/-/g, ' ')}', 'modern', 'editorial'],
    cluster: 'modern',
  },\n`;
  registryContent = registryContent.replace(
    /export const TEMPLATES: Record<string, TemplateEntry> = \{([\s\S]*?)\};/,
    (match, p1) => `export const TEMPLATES: Record<string, TemplateEntry> = {${p1}${newEntry}};`
  );
  fs.writeFileSync(registryPath, registryContent, 'utf8');
  console.log(`Registered template in packages/loop/src/bridge/registry.ts`);
}

// 7. Update packages/loop/src/bridge/classifier.ts
const classifierPath = path.join(rootDir, 'packages/loop/src/bridge/classifier.ts');
let classifierContent = fs.readFileSync(classifierPath, 'utf8');
if (!classifierContent.includes(`'${templateId}':`)) {
  const charEntry = `  '${templateId}': {
    name: '${templateName}',
    keywords: ['${templateId.replace(/-/g, ' ')}'],
    description: '${templateName} aesthetic.',
  },\n};\n`;
  classifierContent = classifierContent.replace(/};\n\n\/\*\*\n \* Fast pre-flight/, `${charEntry}\n/**\n * Fast pre-flight`);

  const scoreEntry = `    '${templateId}': 0,\n  };`;
  classifierContent = classifierContent.replace(/  };\n\n  for \(const \[tid, char\]/, `${scoreEntry}\n\n  for (const [tid, char]`);
  fs.writeFileSync(classifierPath, classifierContent, 'utf8');
  console.log(`Registered template in packages/loop/src/bridge/classifier.ts`);
}

console.log(`\nSUCCESS: Isolated template "${templateName}" created at:`);
console.log(`packages/loop/src/layouts/${templateId}/\n`);
console.log(`You can now customize its frame.tsx, slides.tsx, or brandkit.ts with 100% isolation!`);

function toPascalCase(str: string) {
  return str.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
}

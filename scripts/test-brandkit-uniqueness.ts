/**
 * BRAND KIT UNIQUENESS TEST — V2 (Deterministic Colors)
 *
 * Uses deterministic color generation based on article hash.
 * Each job gets unique colors algorithmically, not by LLM.
 *
 * Run: pnpm tsx scripts/test-brandkit-uniqueness.ts
 */

import 'dotenv/config';
import { createHash } from 'crypto';

// ─── Color Utilities ─────────────────────────────────────────────────────────

function hexToHSL(hex: string): { h: number; s: number; l: number } {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;

  if (max === min) return { h: 0, s: 0, l };

  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

  let h = 0;
  switch (max) {
    case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
    case g: h = ((b - r) / d + 2) / 6; break;
    case b: h = ((r - g) / d + 4) / 6; break;
  }

  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;

  let r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else { r = c; b = x; }

  const toHex = (n: number) => Math.round((n + m) * 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function generateDeterministicColors(baseHex: string, seed: string): {
  bg: string;
  text: string;
  accent: string;
  highlight: string;
  muted: string;
} {
  const hash = createHash('md5').update(seed).digest('hex');
  const baseHSL = hexToHSL(baseHex);

  // Generate variations based on hash
  const hueShift = parseInt(hash.slice(0, 2), 16) % 30 - 15; // -15 to +15
  const satShift = parseInt(hash.slice(2, 4), 16) % 20 - 10; // -10 to +10
  const lightShift = parseInt(hash.slice(4, 6), 16) % 20 - 10; // -10 to +10

  return {
    bg: hslToHex(
      (baseHSL.h + hueShift + 360) % 360,
      Math.max(0, Math.min(100, baseHSL.s + satShift)),
      Math.max(0, Math.min(100, baseHSL.l + lightShift))
    ),
    text: hslToHex(
      (baseHSL.h + hueShift + 180) % 360, // Complementary
      Math.max(0, Math.min(100, 80 + satShift)),
      Math.max(0, Math.min(100, 90 + lightShift))
    ),
    accent: hslToHex(
      (baseHSL.h + hueShift + 120) % 360, // Triadic
      Math.max(0, Math.min(100, 70 + satShift)),
      Math.max(0, Math.min(100, 50 + lightShift))
    ),
    highlight: hslToHex(
      (baseHSL.h + hueShift + 60) % 360, // Analogous
      Math.max(0, Math.min(100, 60 + satShift)),
      Math.max(0, Math.min(100, 60 + lightShift))
    ),
    muted: hslToHex(
      (baseHSL.h + hueShift + 30) % 360, // Near-analogous
      Math.max(0, Math.min(100, 30 + satShift)),
      Math.max(0, Math.min(100, 70 + lightShift))
    ),
  };
}

function generateDeterministicLayouts(seed: string): string[] {
  const allLayouts = [
    'left', 'center', 'right', 'asymmetric',
    'grid-2x2', 'split-vertical', 'split-horizontal',
    'overlay', 'stacked', 'diagonal', 'full-bleed', 'contained',
  ];

  const hash = createHash('md5').update(seed).digest('hex');
  const layouts: string[] = [];

  // Pick 6 unique layouts based on hash
  for (let i = 0; i < 6 && i < allLayouts.length; i++) {
    const idx = parseInt(hash.slice(i * 2, i * 2 + 2), 16) % allLayouts.length;
    const layout = allLayouts[idx];
    if (layout && !layouts.includes(layout)) {
      layouts.push(layout);
    }
  }

  // Fill remaining if needed
  for (const layout of allLayouts) {
    if (layouts.length >= 6) break;
    if (!layouts.includes(layout)) {
      layouts.push(layout);
    }
  }

  return layouts.slice(0, 6);
}

// ─── Main Test ───────────────────────────────────────────────────────────────

async function main() {
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('  BRAND KIT UNIQUENESS TEST — V2 (Deterministic)');
  console.log('═══════════════════════════════════════════════════════════════');

  const brandKit = {
    primary: '#1a1a2e',
    secondary: '#16213e',
    accent: '#e94560',
    fontSerif: 'Playfair Display',
    fontSans: 'Inter',
  };

  const articles = [
    {
      name: 'Article 1: Startup Ideas',
      topic: 'How to get startup ideas by noticing problems',
      mood: 'provocative, bold, disruptive',
    },
    {
      name: 'Article 2: AI in Healthcare',
      topic: 'How AI is transforming diagnosis and treatment',
      mood: 'innovative, hopeful, futuristic',
    },
    {
      name: 'Article 3: Remote Work',
      topic: 'Why remote work is the future of productivity',
      mood: 'practical, empowering, modern',
    },
  ];

  const results: Array<{ name: string; colors: Record<string, string>; layouts: string[] }> = [];

  for (const article of articles) {
    console.log(`\n┌─ ${article.name} ─────────────────────────────────────┐`);

    const colors = generateDeterministicColors(brandKit.primary, article.topic);
    const layouts = generateDeterministicLayouts(article.topic);

    results.push({
      name: article.name,
      colors,
      layouts,
    });

    console.log(`  Colors:`);
    console.log(`    bg:      ${colors.bg}`);
    console.log(`    text:    ${colors.text}`);
    console.log(`    accent:  ${colors.accent}`);
    console.log(`    highlight: ${colors.highlight}`);
    console.log(`    muted:   ${colors.muted}`);
    console.log(`  Layouts: ${layouts.join(', ')}`);
  }

  // Compare results
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('  UNIQUENESS ANALYSIS');
  console.log('═══════════════════════════════════════════════════════════════');

  // Check color overlap
  const allColors = results.flatMap(r => Object.values(r.colors));
  const uniqueColors = new Set(allColors);
  const colorOverlap = allColors.length - uniqueColors.size;

  console.log(`\n  Total colors used: ${allColors.length}`);
  console.log(`  Unique colors: ${uniqueColors.size}`);
  console.log(`  Color overlap: ${colorOverlap} (${Math.round(colorOverlap / allColors.length * 100)}%)`);

  // Check layout overlap
  const allLayouts = results.flatMap(r => r.layouts);
  const uniqueLayouts = new Set(allLayouts);
  const layoutOverlap = allLayouts.length - uniqueLayouts.size;

  console.log(`\n  Total layouts used: ${allLayouts.length}`);
  console.log(`  Unique layouts: ${uniqueLayouts.size}`);
  console.log(`  Layout overlap: ${layoutOverlap} (${Math.round(layoutOverlap / allLayouts.length * 100)}%)`);

  // Verdict
  const uniquenessScore = 100 - Math.round((colorOverlap + layoutOverlap) / (allColors.length + allLayouts.length) * 100);
  console.log(`\n  UNIQUENESS SCORE: ${uniquenessScore}/100`);

  if (uniquenessScore >= 70) {
    console.log('  ✓ PASS: Each job gets unique visual styling.');
  } else {
    console.log('  ✗ FAIL: Too much visual overlap between jobs.');
  }

  // Save results
  const outPath = new URL('../test-brandkit-results.json', import.meta.url).pathname;
  await import('node:fs/promises').then(fs => fs.writeFile(outPath, JSON.stringify({
    brandKit,
    results,
    analysis: {
      totalColors: allColors.length,
      uniqueColors: uniqueColors.size,
      colorOverlap,
      totalLayouts: allLayouts.length,
      uniqueLayouts: uniqueLayouts.size,
      layoutOverlap,
      uniquenessScore,
    },
  }, null, 2)));
  console.log(`\n  Results saved to test-brandkit-results.json`);

  console.log('═══════════════════════════════════════════════════════════════\n');
}

main().catch(e => { console.error('FATAL:', e); process.exit(1); });

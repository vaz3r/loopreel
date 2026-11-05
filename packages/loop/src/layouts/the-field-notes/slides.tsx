/**
 * The Field Notes - Slide Components Barrel Re-Export
 *
 * Each slide component is isolated in its own folder matching Loopreel conventions:
 * - cover/index.tsx
 * - statement/index.tsx
 * - list/index.tsx
 * - specimen/index.tsx
 * - measure/index.tsx
 * - tally/index.tsx
 * - route/index.tsx
 * - log/index.tsx
 * - compare/index.tsx
 * - table/index.tsx
 * - chart/index.tsx
 * - map/index.tsx
 * - quote/index.tsx
 * - entry/index.tsx
 * - qa/index.tsx
 * - kit/index.tsx
 * - cta/index.tsx
 */

export { default as Cover } from './cover/index.js';
export { default as Statement } from './statement/index.js';
export { default as List, Sequence } from './list/index.js';
export { default as Specimen } from './specimen/index.js';
export { default as Measure } from './measure/index.js';
export { default as Tally, Telemetry } from './tally/index.js';
export { default as Route } from './route/index.js';
export { default as Log } from './log/index.js';
export { default as Compare } from './compare/index.js';
export { default as Table } from './table/index.js';
export { default as Chart } from './chart/index.js';
export { default as MapSlide } from './map/index.js';
export { default as Quote } from './quote/index.js';
export { default as Entry } from './entry/index.js';
export { default as Qa } from './qa/index.js';
export { default as Kit } from './kit/index.js';
export { default as Cta } from './cta/index.js';

export * from './primitives.js';

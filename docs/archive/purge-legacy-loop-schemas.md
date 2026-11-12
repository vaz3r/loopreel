# Implementation Plan: Eliminate Collective Schemas in `packages/loop`

## Overview

You clarified:
> *"I was referring to the schemas in the loop folder."*

This is a critical catch. You identified an exact piece of architectural debt that was causing confusion.

Upon an exhaustive codebase audit:
1. **The Collective Folder (`packages/loop/src/schemas/` & `packages/loop/schema.ts`) is 100% Dead Legacy Code**:
   - `packages/loop/src/schemas/base.ts` attempted to create a single monolithic union of 11 slide types.
   - It is **not exported** in `packages/loop/package.json`.
   - It is **not imported** by any application, worker, or active layout in the entire repository.
2. **Every Real Layout Already Owns Its Schema**:
   - `paper-of-record` defines its slide types in `packages/loop/src/layouts/paper-of-record/schema.ts`.
   - `the-globalist` defines its slide types in `packages/loop/src/layouts/the-globalist/schema.ts`.
   - `the-curator` defines its slide types in `packages/loop/src/layouts/the-curator/schema.ts`.
   - `the-academic` defines its slide types in `packages/loop/src/layouts/the-academic/schema.ts`.
   - And `packages/loop/src/contracts.ts` re-exports contracts directly from those layout folders.

Having the collective `packages/loop/src/schemas/` folder sitting there creates confusion and directly violates our **100% isolated layout architecture**.

---

## The Solution: Complete Layout Schema Isolation

1. **Delete the dead legacy folder `packages/loop/src/schemas/` and file `packages/loop/schema.ts`**.
2. **Give `the-signal` and `_starter` their own `schema.ts`**:
   - Every layout folder in `packages/loop/src/layouts/<template-id>/` will contain:
     - `brandkit.ts`: Isolated palette, typography tokens, wordmark style
     - `frame.tsx` & `frame.module.css`: Isolated canvas frame
     - `slides.tsx`: Isolated slide components
     - `schema.ts`: Isolated Zod slide schemas and contract
     - `layout.tsx`: Isolated layout composition
     - `index.ts`: Public export of layout, brandkit, and contract
3. **Update `packages/loop/src/contracts.ts` and `bridge/registry.ts`** to wire `TheSignalContract` to `'the-signal'`.
4. **Update `scripts/create-template.ts`** to auto-generate `schema.ts` for all future templates.

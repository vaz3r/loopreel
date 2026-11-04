# Template Conversion Pre-Flight & Post-Flight Checklist

Use this checklist during every template conversion to guarantee zero regressions.

---

## Pre-Flight Checklist
- [ ] Target HTML file exists in `packages/loop/design-references/`.
- [ ] Google Fonts are identified and verified to be public and functional.
- [ ] Core color palette is extracted (`paper`, `ink`, `accent`, `border`, `surface`).
- [ ] Kebab-case template ID is unique and doesn't conflict with existing keys (`paper-of-record`, `the-globalist`, `the-curator`, `the-academic`, `the-signal`).

---

## Scaffolding & Isolation Checklist
- [ ] Ran `pnpm run create-template <template-id> "<Template Name>"`.
- [ ] Verified template directory created in `packages/loop/src/layouts/<template-id>/`.
- [ ] All layout styles are contained in `<template-id>/frame.module.css` or scoped inline styles.
- [ ] No cross-template imports from other layout folders (only `shared/TypographicWordmark` is allowed).

---

## Functional & Design Integrity Checklist
- [ ] Canvas dimensions adhere to 1080x1350 flex container.
- [ ] `frame.tsx` integrates `TypographicWordmark` for high-DPI text wordmark and footer handle.
- [ ] `slides.tsx` correctly handles all standard slide types:
  - [ ] `CoverSlide`
  - [ ] `SequenceSlide`
  - [ ] `TelemetrySlide`
  - [ ] `QuoteSlide`
  - [ ] `CtaSlide`
- [ ] Fallbacks exist for missing optional props (e.g., empty steps, missing quote attribution).

---

## Registration Checklist
- [ ] `packages/schemas/src/index.ts`: ID added to `ALL_TEMPLATE_KEYS` and `TEMPLATE_INFO`.
- [ ] `packages/loop/src/bridge/registry.ts`: Exported in `TEMPLATES` map.
- [ ] `packages/loop/src/bridge/classifier.ts`: Profile added to `TEMPLATE_CHARACTERISTICS` with suitability scores.
- [ ] `apps/admin/src/lib/constants.ts`: Registered in admin dropdown constants.

---

## Post-Flight Audit Checklist
- [ ] `pnpm turbo run build typecheck` passes with 0 errors.
- [ ] `pnpm tsx scripts/test-all-templates-visual.ts` runs cleanly and generates PNGs in `output/template-audit/<template-id>/`.
- [ ] Visual inspection: Rendered PNGs match the HTML mock layout, typography hierarchy, and spacing.
- [ ] Present rendered slides to the user.

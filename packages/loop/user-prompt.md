# Layout Template Creation Prompt

Use this prompt to instruct an AI agent to create a new layout template for the Loop Engine. Fill in each section with your specific requirements.

---

## The Prompt

```
Create a new layout template called "[TEMPLATE_NAME]" for the Loop Engine.

## 1. Visual Reference

[Attach 1-3 screenshots of the design you want to recreate, or link to a public URL]

If no screenshot: describe the visual style in concrete terms:
- Overall aesthetic: [e.g., "brutalist", "glassmorphism", "neo-brutal", "swiss design"]
- Mood: [e.g., "high-contrast", "muted and editorial", "playful and colorful"]
- Reference brands/sites: [e.g., "Stripe docs", "Linear app", "Apple HIG"]

## 2. Canvas & Frame

- Dimensions: 1080×1350px (4:5 portrait)
- Outer border radius: [e.g., 24px]
- Background: [hex color]
- Frame layout: [e.g., "CSS Grid, 3 rows: header (auto) / content (1fr) / footer (auto)"]

### Header
- Left element: [e.g., step counter, logo, section label]
- Right element: [e.g., page number, subtle CTA]
- Styling: [font size, color, weight, spacing]

### Footer (persistent across all slides)
- Left: [e.g., profile badge with avatar + name + role]
- Right: [e.g., pill button with "Swipe →"]
- Styling: [exact specs]

## 3. Color Palette

| Role | Hex | Usage |
|------|-----|-------|
| Primary background | #[hex] | Frame background |
| Card background | #[hex] | Nested cards, containers |
| Primary text | #[hex] | Headlines, titles |
| Secondary text | #[hex] | Body text, descriptions |
| Muted text | #[hex] | Labels, metadata, timestamps |
| Accent primary | #[hex] | Buttons, highlights, active states |
| Accent secondary | #[hex] | Decorative elements, secondary highlights |
| Accent tertiary | #[hex] | Badges, alerts, additional accents |
| Border | #[hex] | Card borders, dividers |
| Surface hover | #[hex] | Interactive hover states |

## 4. Typography

- Font family: [e.g., "Inter", "Space Grotesk", "Satoshi"]
- Import from Google Fonts? [yes/no]

| Element | Size | Weight | Line-height | Color | Tracking | Case |
|---------|------|--------|-------------|-------|----------|------|
| Slide headline | [px] | [weight] | [value] | [role] | [em] | [normal/uppercase] |
| Slide subheadline | [px] | [weight] | [value] | [role] | [em] | [normal/uppercase] |
| Card title | [px] | [weight] | [value] | [role] | [em] | [normal/uppercase] |
| Body text | [px] | [weight] | [value] | [role] | [em] | [normal/uppercase] |
| Label / tag | [px] | [weight] | [value] | [role] | [em] | [normal/uppercase] |
| Small / caption | [px] | [weight] | [value] | [role] | [em] | [normal/uppercase] |

## 5. Spacing System

- Outer padding (frame to content): [px] [px] [px] [px] (top right bottom left)
- Card padding: [px]
- Gap between cards/elements: [px]
- Section spacing (between headline and content): [px]
- Element internal spacing: [px]

## 6. Slide Types

Define each slide type this template will support. Use the base types below, or create new ones.

### Base Types Available (can be used as-is or extended)
cover, definition, dichotomy, timeline, quote, sequence, telemetry, table, image-split, image-cover, cta

### Template-Specific Slide Types
[If you need NEW slide types not in the base list, define them here:]

#### [new-type-name]
Description: [what this slide shows]
Fields:
  - [fieldName]: [type] — [description and constraints]
  - [fieldName]: [type] — [description and constraints]

### Per-Base-Type Customization
[For each base type you're using, describe any visual differences from the default:]

#### cover
Layout: [e.g., "left-aligned", "centered", "split with image on right"]
Elements:
  - tag: [position, styling]
  - headline: [position, styling, max lines]
  - subheadline: [position, styling]
Extra fields: [any fields beyond the base schema, or "none"]

#### definition
Layout: [description]
Elements:
  - term: [styling]
  - definition: [styling, borders, backgrounds]
  - example: [styling]

[Repeat for each slide type you're using]

## 7. Component Patterns

Describe any recurring visual patterns:

### Cards
- Background: [hex or rgba]
- Border: [width style color]
- Border radius: [px]
- Padding: [px]
- Shadow: [if any]

### Dividers
- Type: [line, dot, gradient, spacing]
- Color: [hex]
- Width: [px]

### Buttons / Pills
- Background: [hex]
- Text color: [hex]
- Border radius: [px]
- Padding: [px] [px]
- Font: [size weight]

### Icons
- Style: [filled, outline, duotone]
- Size: [px]
- Color: [hex or "inherits from parent"]

## 8. Special Behaviors

[Describe any non-standard rendering behaviors:]

- [ ] Text overflow handling: [e.g., "clamp to 3 lines with ellipsis"]
- [ ] Image handling: [e.g., "cover fit, rounded corners, gradient overlay"]
- [ ] Auto-pagination: [which slide types chunk, and how]
- [ ] Responsive scaling: [any special considerations]
- [ ] Animations: [if any, describe]

## 9. Sample Content

Provide 3-5 sample slides with realistic content for this template:

```json
{
  "slides": [
    {
      "id": "sample-1",
      "type": "[slide-type]",
      "[field]": "[value]",
      ...
    }
  ]
}
```

## 10. Files to Create

Create the following files in src/layouts/[template-name]/:

- schema.ts (import base schemas from ../../schemas/base, define Contract)
- slides.ts (sample data matching the schema)
- layout.tsx (barrel: exports templateMeta, frame, slides record, getLayout())
- frame.tsx (frame component)
- frame.module.css (frame styles)
- [type]/index.tsx (for each slide type)
- [type]/styles.module.css (for each slide type)

Also update:
- src/layouts/registry.ts (add entry with id, name, schemeId, templateId, description, sampleSlides, schema)
- src/engine-utils.ts (add scheme to SCHEMES if new colors/fonts needed)

## 11. Validation

After creating all files, run:
  npx tsx src/pipeline.ts

Verify the new template exports PNGs without errors.
```

---

## Tips for Best Results

### Do
- Attach screenshots — they're worth 1000 words
- Use exact hex values, not color names
- Use exact pixel values, not "large" or "small"
- Specify font-weight as a number (400, 600, 800), not "bold"
- Describe spatial relationships: "centered", "left-aligned", "16px gap"
- Show the AI a real example of the data your slides will contain

### Don't
- Say "make it look premium" — define what premium means in hex/px
- Say "like Apple" — Apple has 50 different styles
- Skip the color palette — the AI will guess and you won't like its guess
- Forget edge cases — what happens with long text? Missing images?
- Mix structure and style — describe the layout grid separately from the colors

### The Golden Rule
Write the prompt like a **design handoff to a developer** who has never seen the design. If you were handing this off to a human frontend developer who had to implement it blind, what would they need?

# Loopreel Agent Guidelines

## Quality Standard & Testing Principle
1. **Always Test With Live Jobs in Admin**:
   Whenever making changes to templates, components, prompts, schemas, or workers, always submit a real live job via `POST http://localhost:3000/api/jobs`. Track it through all worker phases until `complete`, and provide the clickable Admin URL `http://localhost:5175/jobs/<JOB_ID>` so the user can visually review the result.

2. **Handcrafted Editorial Excellence**:
   - Every slide must feel like an art-directed editorial publication (The New York Times, Monocle, HBR, MoMA, Wired).
   - Never allow robotic phrasing, rhetorical question cover headlines, or qualifier-cluttered telemetry values.
   - Telemetry `<value>` must be strictly numerical or signed badge (`+12%`, `-17%`, `$1.2T`). Qualifiers go in `<label>`.

3. **Space Balance Rule**:
   - Zero top-heavy clumping: Content must fill 75%–95% of the frame or be optically centered vertically (`Ratio ~ 1.0`).
   - AutoFit is a safety net only (`scale = 1.000` for normal content, unscaled full-height pass-through).

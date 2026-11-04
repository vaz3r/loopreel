/**
 * Adapts a slide from loopreel's content_payload to the format expected
 * by the loop engine's __SLIDE_DATA global.
 *
 * In practice, the slide data is already in the correct format since
 * worker-structure validates against the loop engine's Zod schemas.
 * This adapter exists as a safety net for any field name differences.
 */
export function adaptSlideForEngine(slide: Record<string, unknown>): Record<string, unknown> {
  // The loop engine's Slide type is a discriminated union on `type`.
  // loopreel's content_payload stores slides in this same format after
  // validation against the template's Zod contract.
  // No transformation needed — pass through as-is.
  return slide;
}

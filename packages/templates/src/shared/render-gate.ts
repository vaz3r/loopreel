/**
 * Render-correctness gate (§4 of RENDERING_ENGINE_SPECS.md).
 *
 * This script is injected into the HTML returned by the API render route.
 * It waits for document.fonts.ready, then sets data-render-complete="true"
 * on the body. The render worker waits for this attribute before screenshotting.
 */
export const RENDER_GATE_SCRIPT = `
<script>
  (function() {
    document.fonts.ready.then(function() {
      document.body.setAttribute('data-render-complete', 'true');
    });
  })();
</script>
`;

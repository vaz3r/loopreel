/**
 * Measure-and-shrink utility (§5 of RENDERING_ENGINE_SPECS.md).
 *
 * This function is designed to be injected into the worker via page.evaluate().
 * It does NOT run in the templates package — it runs in Playwright's browser context.
 */
export const FIT_TEXT_TO_CONTAINER_SCRIPT = `
  (function fitTextToContainers() {
    const elements = document.querySelectorAll('[data-smart-fit]');
    elements.forEach(function(el) {
      var htmlEl = el;
      var parent = htmlEl.parentElement;
      if (!parent) return;
      var size = parseFloat(getComputedStyle(htmlEl).fontSize);
      while (htmlEl.scrollHeight > parent.clientHeight && size > 14) {
        size -= 1;
        htmlEl.style.fontSize = size + 'px';
      }
    });
  })();
`;

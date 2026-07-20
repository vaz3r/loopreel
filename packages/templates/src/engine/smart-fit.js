/**
 * Smart Fit — Client-side text measurement and auto-sizing
 * Runs in the browser after DOM + fonts are loaded.
 *
 * Data attributes:
 *   data-smart-fit            — mark element for auto-sizing
 *   data-smart-fit-mode       — "width" (single-line fit) | "box" (multiline fit) | "shrink" (reduce until fits)
 *   data-smart-fit-min        — minimum font-size in px (default: 16)
 *   data-smart-fit-max        — maximum font-size in px (default: 200)
 *   data-smart-fit-max-lines  — max lines before shrinking (used with mode=box)
 *   data-smart-fit-container  — CSS selector for the container to fit within (default: parent)
 *
 *   data-smart-distribute     — mark container for vertical space distribution (space-evenly)
 *   data-smart-distribute-gap — fixed gap between items in px (default: auto-evenly)
 *
 *   data-smart-center         — mark container for vertical centering of its children
 *
 *   data-smart-grid           — mark container for grid auto-sizing
 *   data-smart-grid-cols      — number of columns (default: auto-detect)
 *   data-smart-grid-gap       — gap in px (default: 40)
 */
;(function () {
  'use strict'

  /* ── Helpers ── */

  const MAX_ITERATIONS = 12
  const PRECISION = 0.5

  function parseNum (el, attr, fallback) {
    const v = el.getAttribute(attr)
    return v != null ? Number(v) : fallback
  }

  /**
   * Binary search for the largest font-size that makes text fit within maxWidth.
   * For single-line text only.
   */
  function fitToWidth (el, containerWidth, minSize, maxSize) {
    const saved = {
      whiteSpace: el.style.whiteSpace,
      overflow: el.style.overflow,
      width: el.style.width,
    }
    el.style.whiteSpace = 'nowrap'
    el.style.overflow = 'visible'
    el.style.width = 'auto'

    let lo = minSize
    let hi = maxSize

    // Fast check: does it already fit at max?
    el.style.fontSize = hi + 'px'
    if (el.scrollWidth <= containerWidth) {
      restore(el, saved)
      return hi
    }

    // Fast check: does it overflow even at min?
    el.style.fontSize = lo + 'px'
    if (el.scrollWidth > containerWidth) {
      restore(el, saved)
      return lo
    }

    // Binary search
    for (let i = 0; i < MAX_ITERATIONS; i++) {
      const mid = (lo + hi) / 2
      el.style.fontSize = mid + 'px'
      if (el.scrollWidth <= containerWidth) {
        lo = mid
      } else {
        hi = mid
      }
      if (hi - lo < PRECISION) break
    }

    restore(el, saved)
    return Math.floor(lo)
  }

  /**
   * Binary search for the largest font-size that makes text fit within a box
   * (maxWidth × maxHeight). Wraps text naturally.
   */
  function fitToBox (el, containerWidth, containerHeight, minSize, maxSize, maxLines) {
    const saved = {
      overflow: el.style.overflow,
      width: el.style.width,
      maxHeight: el.style.maxHeight,
      display: el.style.display,
    }
    el.style.overflow = 'visible'
    el.style.width = containerWidth + 'px'
    el.style.maxHeight = 'none'
    el.style.display = 'block'

    let lo = minSize
    let hi = maxSize

    // Fast check at min
    el.style.fontSize = lo + 'px'
    const minH = el.scrollHeight
    if (minH > containerHeight) {
      restore(el, saved)
      return lo
    }

    // Fast check at max
    el.style.fontSize = hi + 'px'
    if (el.scrollHeight <= containerHeight) {
      restore(el, saved)
      return hi
    }

    // Binary search
    for (let i = 0; i < MAX_ITERATIONS; i++) {
      const mid = (lo + hi) / 2
      el.style.fontSize = mid + 'px'
      if (el.scrollHeight <= containerHeight) {
        lo = mid
      } else {
        hi = mid
      }
      if (hi - lo < PRECISION) break
    }

    restore(el, saved)
    return Math.floor(lo)
  }

  function restore (el, saved) {
    el.style.whiteSpace = saved.whiteSpace
    el.style.overflow = saved.overflow
    el.style.width = saved.width
    if (saved.maxHeight != null) el.style.maxHeight = saved.maxHeight
    if (saved.display != null) el.style.display = saved.display
  }

  /* ── Core processors ── */

  function processSmartFit () {
    const els = document.querySelectorAll('[data-smart-fit]')
    els.forEach(function (el) {
      const mode = el.getAttribute('data-smart-fit-mode') || 'box'
      const minSize = parseNum(el, 'data-smart-fit-min', 16)
      const maxSize = parseNum(el, 'data-smart-fit-max', 200)
      const maxLines = parseNum(el, 'data-smart-fit-max-lines', 0)

      // Determine container
      const containerSel = el.getAttribute('data-smart-fit-container')
      let container
      if (containerSel) {
        container = el.closest(containerSel)
      }
      if (!container) {
        container = el.parentElement
      }
      if (!container) return

      const containerRect = container.getBoundingClientRect()
      const cw = containerRect.width
      const ch = containerRect.height

      if (cw <= 0 || ch <= 0) return

      let fontSize
      if (mode === 'width') {
        fontSize = fitToWidth(el, cw, minSize, maxSize)
      } else if (mode === 'box') {
        fontSize = fitToBox(el, cw, ch, minSize, maxSize, maxLines)
      } else {
        // mode === 'shrink' — shrink until fits
        fontSize = fitToBox(el, cw, ch, minSize, maxSize, maxLines)
      }

      el.style.fontSize = fontSize + 'px'

      // Apply line clamping if maxLines specified
      if (maxLines > 0) {
        el.style.overflow = 'hidden'
        el.style.display = '-webkit-box'
        el.style.webkitLineClamp = maxLines
        el.style.webkitBoxOrient = 'vertical'
      }
    })
  }

  function processSmartDistribute () {
    const containers = document.querySelectorAll('[data-smart-distribute]')
    containers.forEach(function (container) {
      const children = Array.from(container.children).filter(function (c) {
        return c.getAttribute('data-smart-distribute-item') !== 'false'
      })
      if (children.length === 0) return

      const containerHeight = container.getBoundingClientRect().height
      const fixedGap = container.getAttribute('data-smart-distribute-gap')
      const totalChildHeight = children.reduce(function (sum, c) {
        return sum + c.getBoundingClientRect().height
      }, 0)

      let gap
      if (fixedGap != null) {
        gap = Number(fixedGap)
      } else {
        // space-evenly: gap = (available) / (count + 1)
        gap = Math.max(0, (containerHeight - totalChildHeight) / (children.length + 1))
      }

      // Apply gaps
      children.forEach(function (child, i) {
        const marginTop = i === 0 && fixedGap == null ? gap : (fixedGap != null ? gap : gap)
        const marginBottom = fixedGap != null ? 0 : (i === children.length - 1 ? gap : 0)
        child.style.marginTop = marginTop + 'px'
        if (fixedGap != null && i < children.length - 1) {
          child.style.marginBottom = gap + 'px'
        } else if (fixedGap == null) {
          child.style.marginBottom = marginBottom + 'px'
        }
      })
    })
  }

  function processSmartCenter () {
    const containers = document.querySelectorAll('[data-smart-center]')
    containers.forEach(function (container) {
      const children = Array.from(container.children)
      if (children.length === 0) return

      const containerHeight = container.getBoundingClientRect().height
      const totalChildHeight = children.reduce(function (sum, c) {
        return sum + c.getBoundingClientRect().height
      }, 0)

      if (totalChildHeight < containerHeight) {
        const offset = (containerHeight - totalChildHeight) / 2
        container.style.paddingTop = offset + 'px'
      }
    })
  }

  function processSmartGrid () {
    const grids = document.querySelectorAll('[data-smart-grid]')
    grids.forEach(function (grid) {
      const cols = parseNum(grid, 'data-smart-grid-cols', 2)
      const gap = parseNum(grid, 'data-smart-grid-gap', 40)
      const children = Array.from(grid.children)

      // Calculate column widths
      const gridWidth = grid.getBoundingClientRect().width
      const colWidth = (gridWidth - gap * (cols - 1)) / cols

      // Measure rows
      const rows = []
      let currentRow = []
      children.forEach(function (child, i) {
        currentRow.push(child)
        if (currentRow.length === cols || i === children.length - 1) {
          rows.push(currentRow)
          currentRow = []
        }
      })

      // Auto-size rows: find tallest cell in each row
      rows.forEach(function (row) {
        let maxH = 0
        row.forEach(function (cell) {
          // Reset to natural size to measure
          const saved = cell.style.height
          cell.style.height = 'auto'
          const h = cell.getBoundingClientRect().height
          if (h > maxH) maxH = h
          cell.style.height = saved || ''
        })
        // Apply uniform row height
        row.forEach(function (cell) {
          cell.style.height = maxH + 'px'
        })
      })

      // Apply grid layout
      grid.style.display = 'grid'
      grid.style.gridTemplateColumns = 'repeat(' + cols + ', 1fr)'
      grid.style.gap = gap + 'px'
    })
  }

  /* ── Stat value fitting ── */

  function processStatValues () {
    const els = document.querySelectorAll('[data-smart-stat]')
    els.forEach(function (el) {
      const container = el.parentElement
      if (!container) return
      const containerWidth = container.getBoundingClientRect().width
      const minSize = parseNum(el, 'data-smart-stat-min', 20)
      const maxSize = parseNum(el, 'data-smart-stat-max', 200)

      const fontSize = fitToWidth(el, containerWidth, minSize, maxSize)
      el.style.fontSize = fontSize + 'px'
    })
  }

  /* ── Timeline / Sequence item fitting ── */

  function processTimelineItems () {
    const containers = document.querySelectorAll('[data-smart-timeline]')
    containers.forEach(function (container) {
      const items = Array.from(container.querySelectorAll('[data-smart-timeline-item]'))
      if (items.length === 0) return

      const containerHeight = container.getBoundingClientRect().height
      const totalItemHeight = items.reduce(function (sum, item) {
        return sum + item.getBoundingClientRect().height
      }, 0)

      // If items overflow, reduce font sizes proportionally
      if (totalItemHeight > containerHeight) {
        const scale = containerHeight / totalItemHeight
        items.forEach(function (item) {
          const texts = item.querySelectorAll('h3, p, span')
          texts.forEach(function (t) {
            const current = parseFloat(getComputedStyle(t).fontSize)
            t.style.fontSize = Math.max(16, Math.floor(current * scale)) + 'px'
          })
        })
      }

      // Distribute remaining space
      const newTotal = items.reduce(function (sum, item) {
        return sum + item.getBoundingClientRect().height
      }, 0)
      if (newTotal < containerHeight) {
        const gap = (containerHeight - newTotal) / (items.length + 1)
        items.forEach(function (item, i) {
          item.style.marginTop = (i === 0 ? gap : gap / 2) + 'px'
          item.style.marginBottom = (i === items.length - 1 ? gap : gap / 2) + 'px'
        })
      }
    })
  }

  /* ── Table fitting ── */

  function processTables () {
    const tables = document.querySelectorAll('[data-smart-table]')
    tables.forEach(function (table) {
      const container = table.closest('[data-smart-table-container]') || table.parentElement
      if (!container) return

      const containerHeight = container.getBoundingClientRect().height
      const headerRow = table.querySelector('thead tr')
      const bodyRows = table.querySelectorAll('tbody tr')
      if (!headerRow || bodyRows.length === 0) return

      // Measure header height
      const headerHeight = headerRow.getBoundingClientRect().height
      const availableForBody = containerHeight - headerHeight

      // Measure natural body row heights
      let totalBodyHeight = 0
      const rowHeights = []
      bodyRows.forEach(function (row) {
        const h = row.getBoundingClientRect().height
        rowHeights.push(h)
        totalBodyHeight += h
      })

      // If body overflows, reduce font size
      if (totalBodyHeight > availableForBody) {
        const scale = availableForBody / totalBodyHeight
        bodyRows.forEach(function (row) {
          const cells = row.querySelectorAll('td')
          cells.forEach(function (cell) {
            const current = parseFloat(getComputedStyle(cell).fontSize)
            cell.style.fontSize = Math.max(16, Math.floor(current * scale)) + 'px'
          })
        })
      }
    })
  }

  /* ── Image-text split fitting ── */

  function processImageSplits () {
    const splits = document.querySelectorAll('[data-smart-image-split]')
    splits.forEach(function (split) {
      const textPanel = split.querySelector('[data-smart-image-split-text]')
      const imagePanel = split.querySelector('[data-smart-image-split-image]')
      if (!textPanel || !imagePanel) return

      const splitHeight = split.getBoundingClientRect().height
      const splitWidth = split.getBoundingClientRect().width
      const isRow = split.getAttribute('data-smart-image-split-direction') === 'row'

      if (isRow) {
        // Side-by-side: text gets remaining width after image
        const imageWidth = imagePanel.getBoundingClientRect().width
        const textWidth = splitWidth - imageWidth - 40 // gap
        if (textWidth > 0) {
          textPanel.style.width = textWidth + 'px'
        }
      } else {
        // Stacked: text gets remaining height after image
        const imageHeight = imagePanel.getBoundingClientRect().height
        const textHeight = splitHeight - imageHeight - 48 // gap
        if (textHeight > 0) {
          textPanel.style.height = textHeight + 'px'
          textPanel.style.overflow = 'hidden'
        }
      }
    })
  }

  /* ── Main ── */

  function run () {
    // Process in order: grids first (affect layout), then text fitting, then distribution
    processSmartGrid()
    processSmartFit()
    processStatValues()
    processTimelineItems()
    processTables()
    processImageSplits()
    processSmartDistribute()
    processSmartCenter()
  }

  // Wait for fonts and DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      document.fonts.ready.then(function () {
        run()
        window.__smartFitDone = true
      })
    })
  } else {
    document.fonts.ready.then(function () {
      run()
      window.__smartFitDone = true
    })
  }
})()

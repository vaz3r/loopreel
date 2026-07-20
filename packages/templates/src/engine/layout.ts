export const CANVAS = { width: 1080, height: 1350 } as const;

export interface SafeAreaConfig {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export const SAFE_AREAS: Record<string, SafeAreaConfig> = {
  default: { top: 160, bottom: 140, left: 80, right: 80 },
  compact: { top: 120, bottom: 100, left: 60, right: 60 },
};

export const HEADER_ZONE = { top: 0, height: 120 } as const;
export const FOOTER_ZONE = { bottom: 0, height: 100 } as const;

const DEFAULT_SAFE_AREA: SafeAreaConfig = { top: 160, bottom: 140, left: 80, right: 80 };

export function getContentArea(safeArea?: Partial<SafeAreaConfig>) {
  const sa = { ...DEFAULT_SAFE_AREA, ...safeArea };
  return {
    width: CANVAS.width - sa.left - sa.right,
    height: CANVAS.height - sa.top - sa.bottom,
    top: sa.top,
    bottom: CANVAS.height - sa.bottom,
    left: sa.left,
    right: sa.right,
  };
}

export function getSafeAreaStyle(safeArea?: Partial<SafeAreaConfig>): React.CSSProperties {
  const sa = { ...DEFAULT_SAFE_AREA, ...safeArea };
  return {
    position: 'absolute',
    top: sa.top,
    bottom: sa.bottom,
    left: sa.left,
    right: sa.right,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  };
}

export function getCompactSafeAreaStyle(): React.CSSProperties {
  return {
    position: 'absolute',
    top: 100,
    bottom: 100,
    left: 80,
    right: 80,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  };
}

export function getMicroHeaderStyle(opts?: {
  top?: number;
  left?: number;
  right?: number;
}): React.CSSProperties {
  return {
    position: 'absolute',
    top: opts?.top ?? 70,
    left: opts?.left ?? 80,
    right: opts?.right ?? 80,
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    zIndex: 10,
  };
}

export function getMicroFooterStyle(opts?: {
  bottom?: number;
  left?: number;
  right?: number;
}): React.CSSProperties {
  return {
    position: 'absolute',
    bottom: opts?.bottom ?? 60,
    left: opts?.left ?? 80,
    right: opts?.right ?? 80,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    zIndex: 10,
  };
}

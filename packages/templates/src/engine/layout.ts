export const CANVAS = { width: 1080, height: 1350 } as const;

export interface SafeAreaConfig {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface RegMarksConfig {
  inset: number;
  bracketSize: number;
}

export interface ZoneConfig {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  height?: number;
  width?: number;
}

export const REGMARKS: RegMarksConfig = {
  inset: 20,
  bracketSize: 30,
};

// Regmark zone extends from inset to inset + bracketSize
// Content must stay INSIDE this zone with clearance
const REGMARK_BOTTOM = REGMARKS.inset + REGMARKS.bracketSize; // 50
const CLEARANCE = 30; // min px between regmark and content

export const SAFE_AREAS = {
  default: {
    top: REGMARK_BOTTOM + CLEARANCE + 30,  // 110
    bottom: REGMARK_BOTTOM + CLEARANCE + 30, // 110
    left: 80,
    right: 80,
  } as SafeAreaConfig,
  compact: {
    top: REGMARK_BOTTOM + CLEARANCE,  // 80
    bottom: REGMARK_BOTTOM + CLEARANCE, // 80
    left: 80,
    right: 80,
  } as SafeAreaConfig,
};

// Header sits between regmark zone and content zone
export const HEADER_ZONE: ZoneConfig = {
  top: REGMARK_BOTTOM + CLEARANCE, // 80
  height: 40,
};

// Footer sits between content zone and regmark zone
export const FOOTER_ZONE: ZoneConfig = {
  bottom: REGMARK_BOTTOM + CLEARANCE, // 80
  height: 40,
};

const DEFAULT_SAFE_AREA: SafeAreaConfig = SAFE_AREAS.default;

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
  const sa = SAFE_AREAS.compact as SafeAreaConfig;
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

export function getMicroHeaderStyle(opts?: {
  top?: number;
  left?: number;
  right?: number;
}): React.CSSProperties {
  return {
    position: 'absolute',
    top: opts?.top ?? HEADER_ZONE.top!,
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
    bottom: opts?.bottom ?? FOOTER_ZONE.bottom!,
    left: opts?.left ?? 80,
    right: opts?.right ?? 80,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    zIndex: 10,
  };
}

import { apcach, calcContrast, crToBg, maxChroma } from 'apcach';
import { converter, formatHex } from 'culori';

export type MindMathHueKey =
  | 'neutral'
  | 'cyan'
  | 'azure'
  | 'violet'
  | 'amber'
  | 'emerald'
  | 'rose';

export type MindMathLevelKey =
  | 'tint'
  | 'border'
  | 'fill'
  | 'accent'
  | 'brightFill'
  | 'text'
  | 'bright';

export interface OklchApcaSwatch {
  oklch: string;
  hex: string;
  lightness: number;
  chroma: number;
  hue: number;
  apcaLc: number;
}

const toOklch = converter('oklch');

export const MINDMATH_COSMIC_SURFACES = {
  canvas: {
    oklch: 'oklch(13.5% 0.036 262)',
    hex: '#05081d',
  },
  canvasMid: {
    oklch: 'oklch(16.5% 0.044 264)',
    hex: '#090f2f',
  },
  surface1: {
    oklch: 'oklch(18.5% 0.044 264)',
    hex: '#0b1130',
  },
  surface2: {
    oklch: 'oklch(22.5% 0.048 264)',
    hex: '#121a43',
  },
  surfaceInset: {
    oklch: 'oklch(12.0% 0.032 262)',
    hex: '#04071a',
  },
} as const;

export const MINDMATH_HUE_ANGLES: Record<MindMathHueKey, number> = {
  neutral: 262,
  cyan: 205,
  azure: 245,
  violet: 312,
  amber: 78,
  emerald: 158,
  rose: 18,
};

interface LevelSpec {
  key: MindMathLevelKey;
  apcaLc: number;
  chromaCap: number;
}

const LEVEL_SPECS: LevelSpec[] = [
  { key: 'tint', apcaLc: 16, chromaCap: 0.07 },
  { key: 'border', apcaLc: 26, chromaCap: 0.09 },
  // Calibrated so white (#ffffff) text inside solid bars/badges reaches APCA Lc >= 73
  { key: 'fill', apcaLc: 32, chromaCap: 0.14 },
  { key: 'accent', apcaLc: 64, chromaCap: 0.15 },
  // Calibrated so dark cosmic (#05081d) text on bright CTA buttons reaches APCA Lc >= 67
  { key: 'brightFill', apcaLc: 66, chromaCap: 0.14 },
  { key: 'text', apcaLc: 82, chromaCap: 0.12 },
  { key: 'bright', apcaLc: 94, chromaCap: 0.07 },
];

const BRAND_HUE_KEYS: Exclude<MindMathHueKey, 'neutral'>[] = [
  'cyan',
  'azure',
  'violet',
  'amber',
  'emerald',
  'rose',
];

function computeCommonChroma(apcaLc: number, chromaCap: number): number {
  let minChroma = chromaCap;
  for (const hueKey of BRAND_HUE_KEYS) {
    const hue = MINDMATH_HUE_ANGLES[hueKey];
    const candidate = apcach(
      crToBg(MINDMATH_COSMIC_SURFACES.canvas.hex, apcaLc, 'apca', 'lighter'),
      maxChroma(chromaCap),
      hue,
      100,
      'srgb'
    );
    if (candidate.chroma < minChroma) {
      minChroma = candidate.chroma;
    }
  }
  return Number(minChroma.toFixed(4));
}

function buildSwatch(hue: number, apcaLc: number, chroma: number): OklchApcaSwatch {
  const col = apcach(
    crToBg(MINDMATH_COSMIC_SURFACES.canvas.hex, apcaLc, 'apca', 'lighter'),
    chroma,
    hue,
    100,
    'srgb'
  );
  const hex =
    formatHex({
      mode: 'oklch',
      l: col.lightness,
      c: col.chroma,
      h: hue,
    }) || '#ffffff';

  return {
    oklch: `oklch(${(col.lightness * 100).toFixed(2)}% ${col.chroma.toFixed(4)} ${hue})`,
    hex,
    lightness: col.lightness,
    chroma: col.chroma,
    hue,
    apcaLc,
  };
}

function buildHarmonizedPalette(): {
  scales: Record<MindMathHueKey, Record<MindMathLevelKey, OklchApcaSwatch>>;
  commonChromaByLevel: Record<MindMathLevelKey, number>;
  inks: {
    primary: OklchApcaSwatch;
    secondary: OklchApcaSwatch;
    muted: OklchApcaSwatch;
  };
} {
  const commonChromaByLevel = {} as Record<MindMathLevelKey, number>;
  for (const spec of LEVEL_SPECS) {
    commonChromaByLevel[spec.key] = computeCommonChroma(spec.apcaLc, spec.chromaCap);
  }

  const scales = {} as Record<MindMathHueKey, Record<MindMathLevelKey, OklchApcaSwatch>>;
  for (const hueKey of Object.keys(MINDMATH_HUE_ANGLES) as MindMathHueKey[]) {
    const hueAngle = MINDMATH_HUE_ANGLES[hueKey];
    const levelMap = {} as Record<MindMathLevelKey, OklchApcaSwatch>;
    for (const spec of LEVEL_SPECS) {
      const commonC = commonChromaByLevel[spec.key];
      const chroma = hueKey === 'neutral' ? Math.min(0.032, commonC) : commonC;
      levelMap[spec.key] = buildSwatch(hueAngle, spec.apcaLc, chroma);
    }
    scales[hueKey] = levelMap;
  }

  return {
    scales,
    commonChromaByLevel,
    inks: {
      primary: buildSwatch(250, 102, 0.008),
      secondary: buildSwatch(256, 84, 0.024),
      muted: buildSwatch(258, 64, 0.032),
    },
  };
}

export const MINDMATH_OKLCH_PALETTE = buildHarmonizedPalette();

/**
 * Calibrated colors for the 4 MindMath K12 skill pillars.
 * Each pillar shares the exact same APCA contrast & perceptual chroma band.
 */
export const MINDMATH_PILLAR_COLORS = {
  bar_model: {
    fill: MINDMATH_OKLCH_PALETTE.scales.azure.fill.hex,
    accent: MINDMATH_OKLCH_PALETTE.scales.azure.accent.hex,
    text: MINDMATH_OKLCH_PALETTE.scales.azure.text.hex,
  },
  remainder: {
    fill: MINDMATH_OKLCH_PALETTE.scales.cyan.fill.hex,
    accent: MINDMATH_OKLCH_PALETTE.scales.cyan.accent.hex,
    text: MINDMATH_OKLCH_PALETTE.scales.cyan.text.hex,
  },
  interval: {
    fill: MINDMATH_OKLCH_PALETTE.scales.emerald.fill.hex,
    accent: MINDMATH_OKLCH_PALETTE.scales.emerald.accent.hex,
    text: MINDMATH_OKLCH_PALETTE.scales.emerald.text.hex,
  },
  measurement: {
    fill: MINDMATH_OKLCH_PALETTE.scales.violet.fill.hex,
    accent: MINDMATH_OKLCH_PALETTE.scales.violet.accent.hex,
    text: MINDMATH_OKLCH_PALETTE.scales.violet.text.hex,
  },
} as const;

const harmonizedFillCache = new Map<string, string>();

/**
 * Normalizes any legacy bar/chart hex color onto the OKLCH/APCA `fill` band
 * (APCA Lc=32 vs dark cosmic canvas, matched common chroma so all bars look balanced
 * and white unit labels inside the bar maintain APCA Lc >= 73).
 */
export function harmonizeCpaFillColor(rawColor?: string): string {
  const fallback = MINDMATH_OKLCH_PALETTE.scales.cyan.fill.hex;
  if (!rawColor) return fallback;

  const cached = harmonizedFillCache.get(rawColor);
  if (cached) return cached;

  try {
    const parsed = toOklch(rawColor);
    if (!parsed) return fallback;
    const hue = Number.isFinite(parsed.h) ? (parsed.h as number) : MINDMATH_HUE_ANGLES.cyan;
    const commonC = MINDMATH_OKLCH_PALETTE.commonChromaByLevel.fill;
    const swatch = buildSwatch(hue, 32, commonC);
    harmonizedFillCache.set(rawColor, swatch.hex);
    return swatch.hex;
  } catch {
    return fallback;
  }
}

const inkCache = new Map<string, '#FFFFFF' | '#05081D'>();

/**
 * Picks crisp white or dark cosmic ink against any surface hex using APCA Lc contrast.
 */
export function getApcaReadableInk(bgHex: string): '#FFFFFF' | '#05081D' {
  const cached = inkCache.get(bgHex);
  if (cached) return cached;

  try {
    const lightContrast = Math.abs(calcContrast('#ffffff', bgHex, 'apca'));
    const darkContrast = Math.abs(calcContrast('#05081d', bgHex, 'apca'));
    const chosen = lightContrast >= darkContrast ? '#FFFFFF' : '#05081D';
    inkCache.set(bgHex, chosen);
    return chosen;
  } catch {
    return '#FFFFFF';
  }
}

/**
 * Synchronizes the apcach/culori OKLCH-APCA token values onto `:root` CSS variables.
 */
export function injectMindMathOklchCssVars(): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement.style;

  root.setProperty('--mm-canvas', MINDMATH_COSMIC_SURFACES.canvas.oklch);
  root.setProperty('--mm-canvas-mid', MINDMATH_COSMIC_SURFACES.canvasMid.oklch);
  root.setProperty('--mm-surface-1', MINDMATH_COSMIC_SURFACES.surface1.oklch);
  root.setProperty('--mm-surface-2', MINDMATH_COSMIC_SURFACES.surface2.oklch);
  root.setProperty('--mm-surface-inset', MINDMATH_COSMIC_SURFACES.surfaceInset.oklch);

  root.setProperty('--mm-ink-primary', MINDMATH_OKLCH_PALETTE.inks.primary.oklch);
  root.setProperty('--mm-ink-secondary', MINDMATH_OKLCH_PALETTE.inks.secondary.oklch);
  root.setProperty('--mm-ink-muted', MINDMATH_OKLCH_PALETTE.inks.muted.oklch);

  for (const hueKey of Object.keys(MINDMATH_OKLCH_PALETTE.scales) as MindMathHueKey[]) {
    const levels = MINDMATH_OKLCH_PALETTE.scales[hueKey];
    for (const lvlKey of Object.keys(levels) as MindMathLevelKey[]) {
      root.setProperty(`--mm-${hueKey}-${lvlKey}`, levels[lvlKey].oklch);
    }
  }

  // Sync top-level semantic theme variables with calibrated OKLCH tokens
  root.setProperty('--color-primary', MINDMATH_OKLCH_PALETTE.scales.cyan.brightFill.oklch);
  root.setProperty('--color-secondary', MINDMATH_OKLCH_PALETTE.scales.amber.brightFill.oklch);
  root.setProperty('--color-accent', MINDMATH_OKLCH_PALETTE.scales.violet.brightFill.oklch);
  root.setProperty('--color-cosmic-bg', MINDMATH_COSMIC_SURFACES.canvas.oklch);
  root.setProperty('--color-cosmic-surface', MINDMATH_COSMIC_SURFACES.surface1.oklch);
  root.setProperty('--color-ring', MINDMATH_OKLCH_PALETTE.scales.cyan.accent.oklch);
}

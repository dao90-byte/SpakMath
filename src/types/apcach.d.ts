declare module 'apcach' {
  export type ContrastModel = 'apca' | 'wcag';
  export type SearchDirection = 'auto' | 'lighter' | 'darker';
  export type ApcachColorSpace = 'p3' | 'srgb';

  export interface ContrastConfig {
    bgColor?: string;
    fgColor?: string;
    contrastModel: ContrastModel;
    cr: number;
    searchDirection: SearchDirection;
  }

  export interface ApcachColor {
    alpha: number;
    chroma: number;
    colorSpace: ApcachColorSpace;
    contrastConfig: ContrastConfig;
    hue: number;
    lightness: number;
  }

  export type MaxChromaFn = (
    contrastConfig: ContrastConfig,
    hue: number,
    alpha?: number,
    colorSpace?: ApcachColorSpace
  ) => ApcachColor;

  export function crToBg(
    bgColor: string,
    cr: number,
    contrastModel?: ContrastModel,
    searchDirection?: SearchDirection
  ): ContrastConfig;

  export function crToFg(
    fgColor: string,
    cr: number,
    contrastModel?: ContrastModel,
    searchDirection?: SearchDirection
  ): ContrastConfig;

  export function maxChroma(cap?: number): MaxChromaFn;

  export function apcach(
    contrast: ContrastConfig | number,
    chroma: number | MaxChromaFn,
    hue?: number | null,
    alpha?: number,
    colorSpace?: ApcachColorSpace
  ): ApcachColor;

  export function calcContrast(
    fgColor: string,
    bgColor: string,
    contrastModel?: ContrastModel,
    colorSpace?: ApcachColorSpace
  ): number;
}

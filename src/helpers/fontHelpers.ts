/*
 * Interfaces.
 */

interface FontSizes {
  readonly veryTiny: string;
  readonly tiny: string;
  readonly verySmall: string;
  readonly small: string;
  readonly medium: string;
  readonly large: string;
  readonly veryLarge: string;
}

interface FontWeights {
  readonly thin: number;
  readonly light: number;
  readonly normal: number;
  readonly medium: number;
  readonly semibold: number;
  readonly bold: number;
  readonly black: number;
}

interface Fonts {
  readonly system: string;
  readonly monospace: string;
}

/*
 * Constants.
 */

export const fontSizes: FontSizes = {
  veryTiny: '10px',
  tiny: '11px',
  verySmall: '12px',
  small: '13px',
  medium: '14px',
  large: '16px',
  veryLarge: '18px'
};

export const fontWeights: FontWeights = {
  thin: 100,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  black: 800
};

export enum VisualSizesEnum {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  EXTRA_LARGE = 'extra-large'
}

export const fonts: Fonts = {
  system: `
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    "Helvetica Neue",
    Helvetica,
    Arial,
    sans-serif,
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol"
  `,
  monospace: `
    monaco,
    Consolas,
    "Lucida Console",
    monospace
  `
};

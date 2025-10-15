// Ref: https://www.figma.com/design/cL1cMol2CdJirlTQIo1kVc/%F0%9F%9F%A3-Global-UI-Kit

import {transparentize} from 'polished';

/*
 * Interfaces.
 */

interface ColorPalette {
  readonly shade10: string;
  readonly shade20: string;
  readonly shade30: string;
  readonly shade40: string;
  readonly shade50: string;
  readonly shade60: string;
  readonly shade70: string;
  readonly shade80: string;
  readonly shade90: string;
}

interface FullColorPalette extends ColorPalette {
  readonly white: string;
  readonly black: string;
}

export interface AlphasPalette {
  readonly transparent: string;
  readonly gray10: string;
  readonly gray20: string;
  readonly gray90: string;
  readonly black10: string;
  readonly black20: string;
  readonly black30: string;
  readonly black40: string;
  readonly black50: string;
  readonly black60: string;
  readonly white10: string;
  readonly white20: string;
  readonly white30: string;
  readonly white40: string;
  readonly white50: string;
  readonly white60: string;
}

type Palette = {readonly [T in PaletteColorsEnum]: ColorPalette};

/*
 * Constants.
 */

export enum PaletteColorsEnum {
  GREY = 'grey',
  PINK = 'pink',
  RED = 'red',
  ORANGE = 'orange',
  YELLOW = 'yellow',
  GREEN = 'green',
  TEAL = 'teal',
  BLUE = 'blue',
  PURPLE = 'purple'
}

export const greys: Readonly<FullColorPalette> = {
  white: '#ffffff',
  shade10: '#f4f2f8',
  shade20: '#eceaf1',
  shade30: '#d8d6db',
  shade40: '#a9abb2',
  shade50: '#8d919b',
  shade60: '#727683',
  shade70: '#656972',
  shade80: '#504c57',
  shade90: '#332c3a',
  black: '#15131b'
};

export const alphas: Readonly<AlphasPalette> = {
  transparent: 'transparent',
  gray10: transparentize(0.9, '#5d6985'),
  gray20: transparentize(0.82, '#5d6985'), // "selected state Gray 18%" in Figma.
  gray90: transparentize(0.1, '#5d6985'),
  black10: alphaBlack(0.04),
  black20: alphaBlack(0.08),
  black30: alphaBlack(0.1),
  black40: alphaBlack(0.15),
  black50: alphaBlack(0.3),
  black60: alphaBlack(0.6),
  white10: alphaWhite(0.08),
  white20: alphaWhite(0.15),
  white30: alphaWhite(0.3),
  white40: alphaWhite(0.6),
  white50: alphaWhite(0.8),
  white60: alphaWhite(0.95)
};

export const palette: Palette = {
  [PaletteColorsEnum.GREY]: {
    shade10: greys.shade10,
    shade20: greys.shade20,
    shade30: greys.shade30,
    shade40: greys.shade40,
    shade50: greys.shade50,
    shade60: greys.shade60,
    shade70: greys.shade70,
    shade80: greys.shade80,
    shade90: greys.shade90
  },
  [PaletteColorsEnum.PINK]: {
    shade10: '#fdf6fc',
    shade20: '#fbeaf6',
    shade30: '#f3c9e7',
    shade40: '#edb0df',
    shade50: '#f561c8',
    shade60: '#e231b6',
    shade70: '#c01695',
    shade80: '#8e1a71',
    shade90: '#561a45'
  },
  [PaletteColorsEnum.RED]: {
    shade10: '#fef7f5',
    shade20: '#ffe7e6',
    shade30: '#fdcac3',
    shade40: '#ff7c75',
    shade50: '#fc4f4a',
    shade60: '#eb150f',
    shade70: '#d01501',
    shade80: '#9e0f00',
    shade90: '#660c05'
  },
  [PaletteColorsEnum.ORANGE]: {
    shade10: '#fff7f5',
    shade20: '#ffe9e0',
    shade30: '#ffcab2',
    shade40: '#f6844c',
    shade50: '#f36416',
    shade60: '#d14900',
    shade70: '#b84300',
    shade80: '#8a3000',
    shade90: '#572300'
  },
  [PaletteColorsEnum.YELLOW]: {
    shade10: '#fefbf1',
    shade20: '#f8eec3',
    shade30: '#face47',
    shade40: '#d5a401',
    shade50: '#bd8728',
    shade60: '#9d6c01',
    shade70: '#906213',
    shade80: '#65470b',
    shade90: '#422e00'
  },
  [PaletteColorsEnum.GREEN]: {
    shade10: '#f3fcf8',
    shade20: '#d7f4e7',
    shade30: '#ade1c0',
    shade40: '#5bb97d',
    shade50: '#3ba554',
    shade60: '#2d8643',
    shade70: '#25793a',
    shade80: '#245632',
    shade90: '#153722'
  },
  [PaletteColorsEnum.TEAL]: {
    shade10: '#f0fdff',
    shade20: '#cdf3f9',
    shade30: '#99dfea',
    shade40: '#22b6d3',
    shade50: '#1f9fb2',
    shade60: '#007f8f',
    shade70: '#00758a',
    shade80: '#005661',
    shade90: '#003a42'
  },
  [PaletteColorsEnum.BLUE]: {
    shade10: '#f5f6fe',
    shade20: '#e6e9fe',
    shade30: '#cad1fc',
    shade40: '#94a2ff',
    shade50: '#7989f7',
    shade60: '#6257f4',
    shade70: '#584def',
    shade80: '#3c3faa',
    shade90: '#20224b'
  },
  [PaletteColorsEnum.PURPLE]: {
    shade10: '#fbf5ff',
    shade20: '#f4e8fd',
    shade30: '#dacbf1',
    shade40: '#cfb6ec',
    shade50: '#b679f2',
    shade60: '#a53eef',
    shade70: '#9820ee',
    shade80: '#7322a5',
    shade90: '#492858'
  }
};

/*
 * Helpers.
 */

/**
 * Convenience helper to get a rgba(black, N) equivalent
 * @param n opacity (from 0 to 1)
 */
function alphaBlack(n: number) {
  return `rgba(0, 0, 0, ${n})`;
}

/**
 * Convenience helper to get a rgba(white, N) equivalent
 * @param n opacity (from 0 to 1)
 */
function alphaWhite(n: number) {
  return `rgba(255, 255, 255, ${n})`;
}

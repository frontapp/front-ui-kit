import {transparentize} from 'polished';

/*
 * Interfaces.
 */

interface FullColorPalette {
  readonly white: string;
  readonly shade10: string;
  readonly shade20: string;
  readonly shade30: string;
  readonly shade40: string;
  readonly shade50: string;
  readonly shade60: string;
  readonly shade70: string;
  readonly shade80: string;
  readonly shade90: string;
  readonly black: string;
}

export interface PaletteColor {
  readonly shade10: string;
  readonly shade20: string;
  readonly shade30: string;
  readonly shade40: string;
  readonly shade50: string;
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

type Palette = {readonly [T in PaletteColorsEnum]: PaletteColor};

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

// color-primitive/gray
export const greys: Readonly<FullColorPalette> = {
  white: '#FFFFFF',
  shade10: '#F4F2F8',
  shade20: '#ECEAF1',
  shade30: '#D8D6DB',
  shade40: '#A9ABB2',
  shade50: '#8D919B',
  shade60: '#727683',
  shade70: '#656972',
  shade80: '#656972',
  shade90: '#332C3A',
  black: '#15131B'
};

export const alphas: Readonly<AlphasPalette> = {
  transparent: 'transparent',
  gray10: transparentize(0.9, '#727683'), // color-primitive/gray/600 in Figma.
  gray20: transparentize(0.82, '#727683'),
  gray90: transparentize(0.1, '#727683'),
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

// Figma color primitives:
// https://www.figma.com/design/cL1cMol2CdJirlTQIo1kVc/%F0%9F%9F%A3-Global-UI-Kit

export const palette: Palette = {
  [PaletteColorsEnum.GREY]: {
    shade10: greys.shade10,
    shade20: greys.shade30,
    shade30: greys.shade50,
    shade40: greys.shade70,
    shade50: greys.shade80
  },
  [PaletteColorsEnum.PINK]: {
    shade10: '#FBEAF6',
    shade20: '#F3C9E7',
    shade30: '#EDB0DF',
    shade40: '#F561C8',
    shade50: '#E231B6'
  },
  [PaletteColorsEnum.RED]: {
    shade10: '#FFE7E6',
    shade20: '#FDCAC3',
    shade30: '#FF7C75',
    shade40: '#FC4F4A',
    shade50: '#EB150F'
  },
  [PaletteColorsEnum.ORANGE]: {
    shade10: '#FFE9E0',
    shade20: '#FFCAB2',
    shade30: '#F6844C',
    shade40: '#F36416',
    shade50: '#D14900'
  },
  [PaletteColorsEnum.YELLOW]: {
    shade10: '#F8EEC3',
    shade20: '#FACE47',
    shade30: '#D5A401',
    shade40: '#BD8728',
    shade50: '#9D6C01'
  },
  [PaletteColorsEnum.GREEN]: {
    shade10: '#D7F4E7',
    shade20: '#ADE1C0',
    shade30: '#5BB97D',
    shade40: '#3BA554',
    shade50: '#2D8643'
  },
  [PaletteColorsEnum.TEAL]: {
    shade10: '#CDF3F9',
    shade20: '#99DFEA',
    shade30: '#22B6D3',
    shade40: '#1F9FB2',
    shade50: '#007F8F'
  },
  [PaletteColorsEnum.BLUE]: {
    shade10: '#E6E9FE',
    shade20: '#CAD1FC',
    shade30: '#94A2FF',
    shade40: '#7989F7',
    shade50: '#6257F4'
  },
  [PaletteColorsEnum.PURPLE]: {
    shade10: '#F4E8FD',
    shade20: '#DACBF1',
    shade30: '#CFB6EC',
    shade40: '#B679F2',
    shade50: '#A53EEF'
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

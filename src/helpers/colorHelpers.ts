// Ref: https://www.figma.com/design/cL1cMol2CdJirlTQIo1kVc/%F0%9F%9F%A3-Global-UI-Kit

import { transparentize } from 'polished';

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

type Palette = { readonly [T in PaletteColorsEnum]: ColorPalette };

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
  shade10: '#F4F2F8',
  shade20: '#ECEAF1',
  shade30: '#D8D6DB',
  shade40: '#A9ABB2',
  shade50: '#8D919B',
  shade60: '#727683',
  shade70: '#656972',
  shade80: '#504C57',
  shade90: '#332C3A',
  black: '#15131B'
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
    shade90: greys.shade90,
  },
  [PaletteColorsEnum.PINK]: {
    shade10: '#FDF6FC',
    shade20: '#FBEAF6',
    shade30: '#F3C9E7',
    shade40: '#EDB0DF',
    shade50: '#F561C8',
    shade60: '#E231B6',
    shade70: '#C01695',
    shade80: '#8E1A71',
    shade90: '#561A45'
  },
  [PaletteColorsEnum.RED]: {
    shade10: '#FEF7F5',
    shade20: '#FFE7E6',
    shade30: '#FDCAC3',
    shade40: '#FF7C75',
    shade50: '#FC4F4A',
    shade60: '#EB150F',
    shade70: '#D01501',
    shade80: '#9E0F00',
    shade90: '#660C05'
  },
  [PaletteColorsEnum.ORANGE]: {
    shade10: '#FFF7F5',
    shade20: '#FFE9E0',
    shade30: '#FFCAB2',
    shade40: '#F6844C',
    shade50: '#F36416',
    shade60: '#D14900',
    shade70: '#B84300',
    shade80: '#8A3000',
    shade90: '#572300'
  },
  [PaletteColorsEnum.YELLOW]: {
    shade10: '#FEFBF1',
    shade20: '#F8EEC3',
    shade30: '#FACE47',
    shade40: '#D5A401',
    shade50: '#BD8728',
    shade60: '#9D6C01',
    shade70: '#906213',
    shade80: '#65470B',
    shade90: '#422E00'
  },
  [PaletteColorsEnum.GREEN]: {
    shade10: '#F3FCF8',
    shade20: '#D7F4E7',
    shade30: '#ADE1C0',
    shade40: '#5BB97D',
    shade50: '#3BA554',
    shade60: '#2D8643',
    shade70: '#25793A',
    shade80: '#245632',
    shade90: '#153722'
  },
  [PaletteColorsEnum.TEAL]: {
    shade10: '#F0FDFF',
    shade20: '#CDF3F9',
    shade30: '#99DFEA',
    shade40: '#22B6D3',
    shade50: '#1F9FB2',
    shade60: '#007F8F',
    shade70: '#00758A',
    shade80: '#005661',
    shade90: '#003A42'
  },
  [PaletteColorsEnum.BLUE]: {
    shade10: '#F5F6FE',
    shade20: '#E6E9FE',
    shade30: '#CAD1FC',
    shade40: '#94A2FF',
    shade50: '#7989F7',
    shade60: '#6257F4',
    shade70: '#584DEF',
    shade80: '#3C3FAA',
    shade90: '#20224B'
  },
  [PaletteColorsEnum.PURPLE]: {
    shade10: '#FBF5FF',
    shade20: '#F4E8FD',
    shade30: '#DACBF1',
    shade40: '#CFB6EC',
    shade50: '#B679F2',
    shade60: '#A53EEF',
    shade70: '#9820EE',
    shade80: '#7322A5',
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

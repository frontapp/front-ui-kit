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

export const greys: Readonly<FullColorPalette> = {
  white: '#ffffff',
  shade10: '#f7f8fa',
  shade20: '#f3f4f6',
  shade30: '#e8eaed',
  shade40: '#d4d6d9',
  shade50: '#bbbdbf',
  shade60: '#9b9c9e',
  shade70: '#77787a',
  shade80: '#3e3e40',
  shade90: '#19191a',
  black: '#001B38'
};

export const palette: Palette = {
  [PaletteColorsEnum.GREY]: {
    shade10: greys.shade10,
    shade20: greys.shade30,
    shade30: greys.shade50,
    shade40: greys.shade70,
    shade50: greys.shade80
  },
  [PaletteColorsEnum.PINK]: {
    shade10: '#fdf0f8',
    shade20: '#fbe1f2',
    shade30: '#f8cae8',
    shade40: '#ca3e99',
    shade50: '#9f3079'
  },
  [PaletteColorsEnum.RED]: {
    shade10: '#fff1f1',
    shade20: '#ffe1de',
    shade30: '#fac1bb',
    shade40: '#e9483a',
    shade50: '#b72215'
  },
  [PaletteColorsEnum.ORANGE]: {
    shade10: '#fff7f0',
    shade20: '#ffe9d1',
    shade30: '#fadab9',
    shade40: '#f2830b',
    shade50: '#cc6000'
  },
  [PaletteColorsEnum.YELLOW]: {
    shade10: '#fefbef',
    shade20: '#fef6dc',
    shade30: '#faebbb',
    shade40: '#e3b51e',
    shade50: '#91691b'
  },
  [PaletteColorsEnum.GREEN]: {
    shade10: '#eefbf3',
    shade20: '#d9f6e3',
    shade30: '#b6f0ca',
    shade40: '#10aa40',
    shade50: '#0c8331'
  },
  [PaletteColorsEnum.TEAL]: {
    shade10: '#f0fdff',
    shade20: '#dcfbff',
    shade30: '#b9f2fa',
    shade40: '#15acc0',
    shade50: '#0d7482'
  },
  [PaletteColorsEnum.BLUE]: {
    shade10: '#f1f6fd',
    shade20: '#e0edff',
    shade30: '#bed7fa',
    shade40: '#367fee',
    shade50: '#2356b3'
  },
  [PaletteColorsEnum.PURPLE]: {
    shade10: '#f8f1ff',
    shade20: '#f0dfff',
    shade30: '#ddbbfa',
    shade40: '#9235e4',
    shade50: '#681aad'
  }
};

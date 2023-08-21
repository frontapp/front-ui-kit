import {VisualSizesEnum} from './fontHelpers';

/*
 * Interfaces.
 */

export interface SelectableComponentColors {
  textColor: string;
  hoverTextColor?: string;
  selectedTextColor?: string;
  disabledTextColor?: string;
  backgroundColor: string;
  hoverBackgroundColor?: string;
  selectedBackgroundColor?: string;
  disabledBackgroundColor?: string;
}

/*
 * Helpers.
 */

/**
 * Wrapper to easily assign constant values to the different VisualSizesEnums.
 */
export type VisualSizeConstants<T> = {readonly [K in VisualSizesEnum]: T};
export function makeSizeConstants<T>(smallVariant: T, ...variants: T[]): VisualSizeConstants<T> {
  return {
    [VisualSizesEnum.SMALL]: smallVariant,
    [VisualSizesEnum.MEDIUM]: variants[0] || smallVariant,
    [VisualSizesEnum.LARGE]: variants[1] || variants[0] || smallVariant,
    [VisualSizesEnum.EXTRA_LARGE]: variants[2] || variants[1] || variants[0] || smallVariant
  };
}

/**
 * Get the color for the specified text type. If the type is not defined, it will fallback to the textColor.
 */
export function getTextColorFromStyles(
  styles: SelectableComponentColors,
  type?: 'hover' | 'selected' | 'disabled'
) {
  if (!type) return styles.textColor;

  if (type === 'hover') return styles.hoverTextColor ?? styles.textColor;
  if (type === 'selected') return styles.selectedTextColor ?? styles.textColor;
  if (type === 'disabled') return styles.disabledTextColor ?? styles.textColor;
  return styles.textColor;
}

/**
 * Get the color for the specified background type. If the type is not defined, it will fallback to the backgroundColor.
 */
export function getBackgroundColorFromStyles(
  styles: SelectableComponentColors,
  type?: 'hover' | 'selected' | 'disabled'
) {
  if (!type) return styles.backgroundColor;

  if (type === 'hover') return styles.hoverBackgroundColor ?? styles.backgroundColor;
  if (type === 'selected') return styles.selectedBackgroundColor ?? styles.backgroundColor;
  if (type === 'disabled') return styles.disabledBackgroundColor ?? styles.backgroundColor;
  return styles.backgroundColor;
}

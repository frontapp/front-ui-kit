// Generated metadata for original SVG viewBox values
// Only stores exceptions - most icons use the default "0 0 16 16"
// This ensures we can preserve the original viewBox from SVG files
// when no viewBox prop is explicitly provided

import type { IconName } from './icon';

const ICON_VIEW_BOX_EXCEPTIONS: Partial<Record<IconName, string>> = {
  Export: '0 0 16 17',
  Info20: '0 0 20 20',
  CaretExpand: '0 0 20 20',
  EditSquare: '0 0 20 20',
  GearRounded: '0 0 18 20'
};

const DEFAULT_VIEW_BOX = '0 0 16 16';

/**
 * Gets the original viewBox for an icon name.
 * Returns the exception viewBox if one exists, otherwise returns the default.
 */
export function getIconViewBox(iconName: IconName): string {
  return ICON_VIEW_BOX_EXCEPTIONS[iconName] || DEFAULT_VIEW_BOX;
}

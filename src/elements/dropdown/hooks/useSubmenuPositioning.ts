import {Placement} from '@popperjs/core';
import {useCallback, useMemo} from 'react';

import {SubmenuPositioning} from '../types/nestedDropdown';

/**
 * Hook for calculating submenu positioning, z-index, and layer management.
 * 
 * This hook provides utilities for:
 * - Calculating appropriate z-index values based on nesting level
 * - Generating unique layer IDs for portal rendering
 * - Creating positioning data for Popper.js integration
 * 
 * The z-index calculation ensures that deeper submenus always appear above
 * their parents, preventing visual overlap issues.
 */

/**
 * Configuration options for submenu positioning.
 */
interface UseSubmenuPositioningProps {
  /** Unique ID for this submenu - used for generating layer IDs */
  submenuId: string;
  /** Current nesting level (0 = top level, 1 = first nested, etc.) */
  level: number;
  /** Preferred Popper.js placement for the submenu */
  placement?: Placement;
  /** Prefix for generating unique layer IDs */
  layerIdPrefix?: string;
}

/**
 * Return type for the useSubmenuPositioning hook.
 */
interface UseSubmenuPositioningReturn {
  /** 
   * Creates positioning data for a submenu relative to its anchor element.
   * @param anchorElement - The DOM element to position the submenu relative to
   * @returns Complete positioning configuration for Popper.js
   */
  getPositioning: (anchorElement: HTMLElement) => SubmenuPositioning;
  /** 
   * Calculates the appropriate z-index for this submenu level.
   * @param baseZIndex - Optional base z-index (defaults to 1000)
   * @returns Calculated z-index value
   */
  calculateZIndex: (baseZIndex?: number) => number;
  /** 
   * Generates a unique layer ID for portal rendering.
   * @returns Deterministic layer ID string
   */
  getLayerId: () => string;
}

/** Base z-index for top-level submenus */
const BASE_Z_INDEX = 1000;
/** Z-index increment per nesting level to ensure proper stacking */
const Z_INDEX_INCREMENT = 10;

/**
 * Hook for managing submenu positioning and z-index calculations.
 * 
 * @param props - Configuration options for positioning
 * @returns Object containing positioning utilities
 * 
 * @example
 * ```tsx
 * const { getPositioning, calculateZIndex, getLayerId } = useSubmenuPositioning({
 *   submenuId: 'my-submenu',
 *   level: 1,
 *   placement: 'right-start',
 *   layerIdPrefix: 'dropdown'
 * });
 * 
 * // Get positioning for a specific anchor element
 * const positioning = getPositioning(triggerElement);
 * 
 * // Calculate z-index for this level
 * const zIndex = calculateZIndex(); // Returns 1010 for level 1
 * 
 * // Get unique layer ID
 * const layerId = getLayerId(); // Returns 'dropdown-1-my-submenu'
 * ```
 */
export const useSubmenuPositioning = ({
  submenuId,
  level,
  placement = 'right-start',
  layerIdPrefix = 'nested-dropdown'
}: UseSubmenuPositioningProps): UseSubmenuPositioningReturn => {
  
  /**
   * Calculates z-index based on nesting level to ensure proper stacking order.
   * Each level gets a higher z-index to appear above its parent.
   */
  const calculateZIndex = useCallback((baseZIndex = BASE_Z_INDEX): number => 
    baseZIndex + (level * Z_INDEX_INCREMENT), [level]);

  /**
   * Generates a deterministic layer ID for consistent portal rendering.
   * Format: {prefix}-{level}-{submenuId}
   */
  const getLayerId = useCallback((): string => 
    `${layerIdPrefix}-${level}-${submenuId}`, [layerIdPrefix, level, submenuId]);

  /**
   * Creates complete positioning configuration for a submenu.
   * Combines anchor element, placement, z-index, and layer ID.
   */
  const getPositioning = useCallback((anchorElement: HTMLElement): SubmenuPositioning => ({
      anchorElement,
      placement,
      zIndex: calculateZIndex(),
      layerId: getLayerId()
    }), [placement, calculateZIndex, getLayerId]);

  return useMemo(() => ({
    getPositioning,
    calculateZIndex,
    getLayerId
  }), [getPositioning, calculateZIndex, getLayerId]);
};


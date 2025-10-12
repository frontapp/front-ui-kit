import {Placement} from '@popperjs/core';
import {ReactNode} from 'react';

/**
 * Configuration for nested dropdown behavior
 */
export interface NestedDropdownConfig {
  /** Delay before opening submenu on hover (ms) */
  openDelay: number;
  /** Delay before closing submenu when mouse leaves (ms) */
  closeDelay: number;
  /** Maximum nesting depth allowed */
  maxDepth: number;
  /** Placement preference for submenus */
  placement: Placement;
  /** Whether to use keyboard navigation */
  enableKeyboardNavigation: boolean;
  /** Custom layer root ID prefix */
  layerIdPrefix: string;
}

/**
 * Default configuration for nested dropdowns
 */
export const DEFAULT_NESTED_CONFIG: NestedDropdownConfig = {
  openDelay: 150,
  closeDelay: 300,
  maxDepth: 3,
  placement: 'right-start',
  enableKeyboardNavigation: true,
  layerIdPrefix: 'nested-dropdown'
};

/**
 * State for a single submenu
 */
export interface SubmenuState {
  /** Whether the submenu is currently open */
  isOpen: boolean;
  /** Whether the mouse is currently over the submenu area */
  isHovered: boolean;
  /** Unique identifier for this submenu */
  id: string;
  /** Current nesting level (0 = root) */
  level: number;
  /** Parent submenu ID (if any) */
  parentId?: string;
}

/**
 * Context for managing nested dropdown state
 */
export interface NestedDropdownContextValue {
  /** Current configuration */
  config: NestedDropdownConfig;
  /** Map of all submenu states */
  submenus: Map<string, SubmenuState>;
  /** Open a submenu */
  openSubmenu: (id: string, parentId?: string) => void;
  /** Close a submenu */
  closeSubmenu: (id: string) => void;
  /** Close all submenus at or below a certain level */
  closeSubmenusFromLevel: (level: number) => void;
  /** Set hover state for a submenu */
  setSubmenuHover: (id: string, isHovered: boolean) => void;
  /** Get the current nesting level for a submenu */
  getSubmenuLevel: (id: string) => number;
  /** Check if maximum depth would be exceeded */
  canOpenSubmenu: (parentId?: string) => boolean;
}

/**
 * Props for components that can have submenus
 */
export interface SubmenuCapableProps {
  /** Unique identifier for this item */
  submenuId?: string;
  /** Content to render in the submenu */
  submenu?: ReactNode;
  /** Custom configuration for this submenu */
  submenuConfig?: Partial<NestedDropdownConfig>;
  /** Called when submenu opens */
  onSubmenuOpen?: (id: string) => void;
  /** Called when submenu closes */
  onSubmenuClose?: (id: string) => void;
}

/**
 * Positioning data for a submenu
 */
export interface SubmenuPositioning {
  /** Reference element for positioning */
  anchorElement: HTMLElement;
  /** Preferred placement */
  placement: Placement;
  /** Z-index for layering */
  zIndex: number;
  /** Layer root ID */
  layerId: string;
}

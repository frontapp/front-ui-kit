import {createContext, useContext} from 'react';

/*
 * Props.
 */

export interface PopoverContextProps {
  anchor: HTMLElement;
}

/*
 * Context.
 */

export const PopoverContext = createContext<PopoverContextProps | undefined>(undefined);

/*
 * Hook.
 */

export function usePopoverContext() {
  return useContext(PopoverContext);
}

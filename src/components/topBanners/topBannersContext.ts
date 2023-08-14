import {createContext, ReactNode, useContext} from 'react';

/*
 * Props.
 */

export enum TopBannersEnum {
  INFO = 'INFO',
  ERROR = 'ERROR',
  WARNING = 'WARNING',
  SUCCESS = 'SUCCESS',
  LOADING = 'LOADING'
}

export interface TopBannerDefinition {
  type: TopBannersEnum;
  message: ReactNode;
  dismissAfter?: number;
}

export interface TopBannerContextProps {
  showBanner(options: TopBannerDefinition): void;
  currentBanner?: TopBannerDefinition;
  dismissBanner: () => void;
}

/*
 * Context.
 */

export const TopBannerContext = createContext<TopBannerContextProps>({
  showBanner: () => {},
  currentBanner: undefined,
  dismissBanner: () => {}
});

export function useTopBanners() {
  return useContext(TopBannerContext);
}

export const TopBannerProvider = TopBannerContext.Provider;

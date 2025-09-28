import { FC, PropsWithChildren, useCallback, useMemo, useState } from 'react';

import { useTimeout } from '../../helpers/hookHelpers';
import { TopBannerContextProps, TopBannerDefinition, TopBannerProvider } from './topBannersContext';

/*
 * Props.
 */

interface TopBannersProviderProps { }

/*
 * Component.
 */

export const TopBannersProvider: FC<PropsWithChildren<TopBannersProviderProps>> = (props) => {
  const [banner, setBanner] = useState<TopBannerDefinition | undefined>();

  const [localSetTimeout, localClearTimeout] = useTimeout();

  const resetState = useCallback(() => {
    setBanner(undefined);
  }, []);

  const onShowBanner = useCallback(
    (bannerDefinition: TopBannerDefinition | undefined) => {
      localClearTimeout();

      setBanner(bannerDefinition);

      localSetTimeout(resetState, bannerDefinition?.dismissAfter ?? 5000);
    },
    [localClearTimeout, localSetTimeout, resetState]
  );

  const contextValue: TopBannerContextProps = useMemo(
    () => ({
      showBanner: onShowBanner,
      currentBanner: banner,
      dismissBanner: () => setBanner(undefined)
    }),
    [banner, onShowBanner]
  );

  return <TopBannerProvider value={contextValue}>{props.children}</TopBannerProvider>;
};

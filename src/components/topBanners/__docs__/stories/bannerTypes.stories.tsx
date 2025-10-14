import React from 'react';

import {Button} from '../../../button/button';
import {TopBannersEnum, useTopBanners} from '../../topBannersContext';
import {TopBannersHost} from '../../topBannersHost';
import {TopBannersProvider} from '../../topBannersProvider';

const BannerTypesContent = () => {
  const {showBanner} = useTopBanners();

  const showInfoBanner = () => {
    showBanner({
      message: 'This is an informational banner with some useful details.',
      type: TopBannersEnum.INFO,
      dismissAfter: 5000
    });
  };

  const showSuccessBanner = () => {
    showBanner({
      message: 'Operation completed successfully! Your changes have been saved.',
      type: TopBannersEnum.SUCCESS,
      dismissAfter: 5000
    });
  };

  const showWarningBanner = () => {
    showBanner({
      message: 'Warning: This action cannot be undone. Please proceed with caution.',
      type: TopBannersEnum.WARNING,
      dismissAfter: 5000
    });
  };

  const showErrorBanner = () => {
    showBanner({
      message: 'Error: Something went wrong. Please try again or contact support.',
      type: TopBannersEnum.ERROR,
      dismissAfter: 5000
    });
  };

  const showLoadingBanner = () => {
    showBanner({
      message: 'Loading your data, please wait...',
      type: TopBannersEnum.LOADING,
      dismissAfter: 5000
    });
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '12px', padding: '20px'}}>
      <h3>Banner Types</h3>
      <p>Click any button below to see different banner types with their unique styling:</p>

      <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px'}}>
        <Button onClick={showInfoBanner} type="secondary">
          Show Info Banner
        </Button>
        <Button onClick={showSuccessBanner} type="secondary">
          Show Success Banner
        </Button>
        <Button onClick={showWarningBanner} type="secondary">
          Show Warning Banner
        </Button>
        <Button onClick={showErrorBanner} type="secondary">
          Show Error Banner
        </Button>
        <Button onClick={showLoadingBanner} type="secondary">
          Show Loading Banner
        </Button>
      </div>
    </div>
  );
};

export const BannerTypes = () => (
  <TopBannersProvider>
    <TopBannersHost />
    <BannerTypesContent />
  </TopBannersProvider>
);

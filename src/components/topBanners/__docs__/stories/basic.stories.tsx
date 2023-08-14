import React from 'react';

import {Button} from '../../../button/button';
import {TopBannersEnum, useTopBanners} from '../../topBannersContext';
import {TopBannersHost} from '../../topBannersHost';
import {TopBannersProvider} from '../../topBannersProvider';

const BasicContent = () => {
  const {showBanner} = useTopBanners();
  return (
    <div>
      <Button
        onClick={() => {
          showBanner({
            message: 'This is a banner',
            type: TopBannersEnum.INFO,
            dismissAfter: 10_000
          });
        }}>
        Show banner
      </Button>
    </div>
  );
};

export const Basic = () => (
  <TopBannersProvider>
    <TopBannersHost />
    <BasicContent />
  </TopBannersProvider>
);

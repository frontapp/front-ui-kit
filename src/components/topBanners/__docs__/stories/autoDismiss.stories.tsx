import React from 'react';

import {Button} from '../../../button/button';
import {TopBannersEnum, useTopBanners} from '../../topBannersContext';
import {TopBannersHost} from '../../topBannersHost';
import {TopBannersProvider} from '../../topBannersProvider';

const AutoDismissContent = () => {
  const {showBanner} = useTopBanners();

  const showQuickDismiss = () => {
    showBanner({
      message: 'This banner will auto-dismiss in 2 seconds',
      type: TopBannersEnum.INFO,
      dismissAfter: 2000
    });
  };

  const showMediumDismiss = () => {
    showBanner({
      message: 'This banner will auto-dismiss in 5 seconds',
      type: TopBannersEnum.SUCCESS,
      dismissAfter: 5000
    });
  };

  const showSlowDismiss = () => {
    showBanner({
      message: 'This banner will auto-dismiss in 10 seconds',
      type: TopBannersEnum.WARNING,
      dismissAfter: 10000
    });
  };

  const showNoAutoDismiss = () => {
    showBanner({
      message: 'This banner will stay until manually dismissed',
      type: TopBannersEnum.ERROR
      // No dismissAfter property - banner stays until manually closed
    });
  };

  const showMultipleBanners = () => {
    // Show multiple banners with different timings
    showBanner({
      message: 'First banner - dismisses in 3 seconds',
      type: TopBannersEnum.INFO,
      dismissAfter: 3000
    });

    setTimeout(() => {
      showBanner({
        message: 'Second banner - dismisses in 4 seconds',
        type: TopBannersEnum.SUCCESS,
        dismissAfter: 4000
      });
    }, 1000);

    setTimeout(() => {
      showBanner({
        message: 'Third banner - dismisses in 5 seconds',
        type: TopBannersEnum.WARNING,
        dismissAfter: 5000
      });
    }, 2000);
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '12px', padding: '20px'}}>
      <h3>Auto-Dismiss Examples</h3>
      <p>Examples showing different auto-dismiss timings and behaviors:</p>

      <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
        <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px'}}>
          <Button onClick={showQuickDismiss} type="secondary">
            Quick Dismiss (2s)
          </Button>
          <Button onClick={showMediumDismiss} type="secondary">
            Medium Dismiss (5s)
          </Button>
          <Button onClick={showSlowDismiss} type="secondary">
            Slow Dismiss (10s)
          </Button>
        </div>

        <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px'}}>
          <Button onClick={showNoAutoDismiss} type="secondary">
            No Auto-Dismiss
          </Button>
          <Button onClick={showMultipleBanners} type="secondary">
            Multiple Banners
          </Button>
        </div>
      </div>

      <div
        style={{
          marginTop: '16px',
          padding: '12px',
          backgroundColor: '#f8f9fa',
          borderRadius: '4px',
          fontSize: '14px'
        }}>
        <strong>Note:</strong> The "Multiple Banners" example shows how banners queue up when multiple are
        triggered in sequence.
      </div>
    </div>
  );
};

export const AutoDismiss = () => (
  <TopBannersProvider>
    <TopBannersHost />
    <AutoDismissContent />
  </TopBannersProvider>
);

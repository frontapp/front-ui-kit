import React from 'react';

import {Button} from '../../../button/button';
import {TopBannersEnum, useTopBanners} from '../../topBannersContext';
import {TopBannersHost} from '../../topBannersHost';
import {TopBannersProvider} from '../../topBannersProvider';
import {VisualSizesEnum} from '../../../../helpers/fontHelpers';

const CustomMessagesContent = () => {
  const {showBanner} = useTopBanners();

  const showShortMessage = () => {
    showBanner({
      message: 'Short message',
      type: TopBannersEnum.INFO,
      dismissAfter: 3000
    });
  };

  const showLongMessage = () => {
    showBanner({
      message:
        'This is a much longer message that demonstrates how the banner handles extended text content. It should wrap nicely and maintain proper spacing and readability.',
      type: TopBannersEnum.WARNING,
      dismissAfter: 3000
    });
  };

  const showMultilineMessage = () => {
    showBanner({
      message: (
        <div>
          <div>Multi-line message example:</div>
          <div>• First important point</div>
          <div>• Second important point</div>
          <div>• Third important point</div>
        </div>
      ),
      type: TopBannersEnum.SUCCESS,
      dismissAfter: 3000
    });
  };

  const showRichContent = () => {
    showBanner({
      message: (
        <div>
          <strong>Rich Content Example</strong>
          <br />
          This banner contains <em>formatted text</em> with{' '}
          <span style={{color: '#007bff'}}>custom styling</span>.
        </div>
      ),
      type: TopBannersEnum.INFO,
      dismissAfter: 3000
    });
  };

  const showActionMessage = () => {
    showBanner({
      message: (
        <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
          <span>Your session will expire in 5 minutes.</span>
          <Button size={VisualSizesEnum.SMALL} type="secondary">
            Extend Session
          </Button>
        </div>
      ),
      type: TopBannersEnum.WARNING,
      dismissAfter: 3000
    });
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '12px', padding: '20px'}}>
      <h3>Custom Messages</h3>
      <p>Examples of different message types and content lengths:</p>

      <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
        <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px'}}>
          <Button onClick={showShortMessage} type="secondary">
            Short Message
          </Button>
          <Button onClick={showLongMessage} type="secondary">
            Long Message
          </Button>
          <Button onClick={showMultilineMessage} type="secondary">
            Multi-line Message
          </Button>
        </div>

        <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px'}}>
          <Button onClick={showRichContent} type="secondary">
            Rich Content
          </Button>
          <Button onClick={showActionMessage} type="secondary">
            Message with Action
          </Button>
        </div>
      </div>
    </div>
  );
};

export const CustomMessages = () => (
  <TopBannersProvider>
    <TopBannersHost />
    <CustomMessagesContent />
  </TopBannersProvider>
);

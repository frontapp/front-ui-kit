import {ComponentStory} from '@storybook/react';
import React from 'react';

import {VisualSizesEnum} from '../../../../helpers/fontHelpers';
import {InlineBanner} from '../../inlineBanner';

export const Success: ComponentStory<typeof InlineBanner> = () => (
  <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
    <InlineBanner
      size={VisualSizesEnum.MEDIUM}
      type="success"
      title="Everything went well"
      onClose={console.log}
    />
    <InlineBanner
      size={VisualSizesEnum.SMALL}
      type="success"
      title="Everything went well"
      onClose={console.log}
    />
  </div>
);

export const Error: ComponentStory<typeof InlineBanner> = () => (
  <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
    <InlineBanner
      size={VisualSizesEnum.MEDIUM}
      type="error"
      title="Something went wrong"
      onClose={console.log}
    />
    <InlineBanner
      size={VisualSizesEnum.SMALL}
      type="error"
      title="Something went wrong"
      onClose={console.log}
    />
  </div>
);

export const Warning: ComponentStory<typeof InlineBanner> = () => (
  <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
    <InlineBanner
      size={VisualSizesEnum.MEDIUM}
      type="warning"
      title="Keep this in mind"
      onClose={console.log}
    />
    <InlineBanner
      size={VisualSizesEnum.SMALL}
      type="warning"
      title="Keep this in mind"
      onClose={console.log}
    />
  </div>
);

export const Info: ComponentStory<typeof InlineBanner> = () => (
  <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
    <InlineBanner
      size={VisualSizesEnum.MEDIUM}
      type="info"
      title="Something good to know"
      onClose={console.log}
    />
    <InlineBanner
      size={VisualSizesEnum.SMALL}
      type="info"
      title="Something good to know"
      onClose={console.log}
    />
  </div>
);

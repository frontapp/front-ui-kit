import {ComponentStory} from '@storybook/react';
import React from 'react';

import {VisualSizesEnum} from '../../../../helpers/fontHelpers';
import {Loader, LoaderColorVariantsEnum} from '../../loader';

export const Basic: ComponentStory<typeof Loader> = (args) => (
  <div style={{display: 'flex', gap: 10}}>
    <Loader {...args} size={VisualSizesEnum.SMALL} color={LoaderColorVariantsEnum.BLUE} />
    <Loader {...args} size={VisualSizesEnum.SMALL} color={LoaderColorVariantsEnum.GREY} />
  </div>
);

export const Big: ComponentStory<typeof Loader> = (args) => (
  <div style={{display: 'flex', gap: 20}}>
    <Loader {...args} size={VisualSizesEnum.LARGE} color={LoaderColorVariantsEnum.BLUE} />
    <Loader {...args} size={VisualSizesEnum.LARGE} color={LoaderColorVariantsEnum.GREY} />
  </div>
);

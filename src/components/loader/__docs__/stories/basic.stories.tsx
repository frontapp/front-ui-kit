import {ComponentStory} from '@storybook/react';
import React from 'react';

import {PaletteColorsEnum} from '../../../../helpers/colorHelpers';
import {VisualSizesEnum} from '../../../../helpers/fontHelpers';
import {Loader} from '../../loader';

export const Basic: ComponentStory<typeof Loader> = (args) => (
  <div style={{display: 'flex', gap: 10}}>
    <Loader {...args} size={VisualSizesEnum.SMALL} color={PaletteColorsEnum.BLUE} />
    <Loader {...args} size={VisualSizesEnum.SMALL} color={PaletteColorsEnum.GREY} />
  </div>
);

export const Big: ComponentStory<typeof Loader> = (args) => (
  <div style={{display: 'flex', gap: 20}}>
    <Loader {...args} size={VisualSizesEnum.LARGE} color={PaletteColorsEnum.BLUE} />
    <Loader {...args} size={VisualSizesEnum.LARGE} color={PaletteColorsEnum.GREY} />
  </div>
);

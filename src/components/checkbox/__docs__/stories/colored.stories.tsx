import {StoryObj} from '@storybook/react';
import React, {useState} from 'react';

import {Checkbox} from '../../checkbox';
import {PaletteColorsEnum} from '../../../../helpers/colorHelpers';

const Template = ({color}: {color: PaletteColorsEnum}) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <Checkbox isChecked={isChecked} onChange={setIsChecked} color={color}>
      {color.charAt(0).toUpperCase() + color.slice(1)} Checkbox
    </Checkbox>
  );
};

export const Colored: StoryObj<typeof Checkbox> = {
  render: () => (
    <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
      <Template color={PaletteColorsEnum.BLUE} />
      <Template color={PaletteColorsEnum.GREEN} />
      <Template color={PaletteColorsEnum.RED} />
      <Template color={PaletteColorsEnum.ORANGE} />
      <Template color={PaletteColorsEnum.PURPLE} />
      <Template color={PaletteColorsEnum.TEAL} />
      <Template color={PaletteColorsEnum.PINK} />
      <Template color={PaletteColorsEnum.YELLOW} />
    </div>
  )
};

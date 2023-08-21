import {ComponentStory} from '@storybook/react';
import React, {useState} from 'react';

import {Checkbox} from '../../checkbox';

const Template: ComponentStory<typeof Checkbox> = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <Checkbox isChecked={isChecked} onChange={setIsChecked}>
      Example Checkbox
    </Checkbox>
  );
};

export const Basic = Template.bind({});

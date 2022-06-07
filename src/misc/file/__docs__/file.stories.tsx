import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';
import styled from 'styled-components';
import { greys } from '../../../helpers/colorHelpers';
import { DefaultStyleProvider } from '../../../utils/defaultStyleProvider';

import {File} from '../file';

/*
 * Style.
 */

const StyledShowcaseDiv = styled.div`
  background: ${greys.shade50};
  border-radius: 8px;
  padding: 16px;
  width: 300px;
`;

export default {
  title: 'Misc/File',
  component: File
} as ComponentMeta<typeof File>;

const Template: ComponentStory<typeof File> = args => (
  <DefaultStyleProvider>
    <StyledShowcaseDiv>
      <File {...args}>
        Label
      </File>
    </StyledShowcaseDiv>
  </DefaultStyleProvider>
);

export const Basic = Template.bind({});
Basic.args = {
  fileName: 'filename.csv',
  fileSize: 30,
  onClear: () => console.log("Clicking the clear button.")
};

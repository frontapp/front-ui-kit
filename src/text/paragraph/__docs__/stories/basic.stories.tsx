import {StoryObj} from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import {Paragraph} from '../../paragraph';

const StyledCenteredDiv = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
`;

export const Basic: StoryObj<typeof Paragraph> = {
  render: () => (
    <StyledCenteredDiv>
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at mattis lorem, id varius sem.
        Praesent commodo eu ex sit amet cursus. Sed condimentum tortor urna, ut dapibus odio vehicula a.
        Quisque nec odio lorem. In hac habitasse platea dictumst. Mauris dictum varius ultrices. Morbi sed
        lacus auctor, blandit enim ac, dignissim libero. Praesent a massa augue. Sed turpis dui, accumsan sed
        tristique in, tincidunt nec metus. In nec vehicula est. Maecenas venenatis tincidunt congue. Ut at
        fermentum urna. Sed vestibulum mattis dapibus.
      </Paragraph>
    </StyledCenteredDiv>
  )
};

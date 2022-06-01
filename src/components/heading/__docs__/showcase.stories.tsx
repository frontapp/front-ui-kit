import {ComponentMeta, ComponentStory} from '@storybook/react';
import React, {FC} from 'react';
import styled from 'styled-components';

import {VisualSizesEnum} from '../../../helpers/fontHelpers';
import {DefaultStyleProvider} from '../../../utils/defaultStyleProvider';
import {Heading} from '../heading';

/*
 * Style
 */

const StyledContainerDiv = styled.div`
  display: flex;
  flex-flow: column;
  gap: 32px;
`;

/*
 * Component
 */

const ShowcaseComponent: FC = props => (
  <DefaultStyleProvider>
    <StyledContainerDiv>
      <Heading size={VisualSizesEnum.SMALL}>Small Heading</Heading>
      <Heading size={VisualSizesEnum.MEDIUM}>Medium Heading</Heading>
      <Heading size={VisualSizesEnum.LARGE}>Large Heading</Heading>
      <Heading size={VisualSizesEnum.EXTRA_LARGE}>Extra Large Heading</Heading>
    </StyledContainerDiv>
  </DefaultStyleProvider>
);

/*
 * Storybook
 */

export default {
  title: 'Components/Heading',
  component: ShowcaseComponent
} as ComponentMeta<typeof ShowcaseComponent>;

const ShowcaseTemplate: ComponentStory<typeof ShowcaseComponent> = () => <ShowcaseComponent />;
export const Showcase = ShowcaseTemplate.bind({});
Showcase.parameters = {
  controls: {hideNoControlsWarning: true}
};

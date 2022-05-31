import {ComponentMeta, ComponentStory} from '@storybook/react';
import React, {FC} from 'react';
import styled from 'styled-components';

import {greys} from '../../../helpers/colorHelpers';
import {fontSizes, fontWeights, VisualSizesEnum} from '../../../helpers/fontHelpers';
import {DefaultStyleProvider} from '../../../utils/defaultStyleProvider';
import {Heading} from '../heading';

/*
 * Component.
 */

const StyledContainerDiv = styled.div`
  display: flex;
  flex-flow: column;
  gap: 32px;
`;

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
   * Storybook.
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
import {ComponentMeta, ComponentStory} from '@storybook/react';
import React, {FC} from 'react';
import styled from 'styled-components';

import {Skeleton} from '../skeleton';

/*
 * Component.
 */

const StyledCardComponentDiv = styled.div`
  display: flex;
  flex-flow: row;
  max-width: 576px;
  height: 80px;
  padding: 16px;
  margin: auto;
  width: 100%;
  margin: 16px;
  border-radius: 8px;
  background: #FFFFFF;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1), 0px 0px 1px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  gap: 16px;
`;

const StyledLoadingNameDiv = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column;
  gap: 16px;
`;

const ShowcaseComponent: FC = props => (
  <StyledCardComponentDiv>
    <Skeleton width={80} height={80} borderRadius="50%" variant="dark" />
    <StyledLoadingNameDiv>
      <Skeleton height={40} variant="dark" />
      <Skeleton height={20} width={250} variant="light" />
    </StyledLoadingNameDiv>
  </StyledCardComponentDiv>
);

/*
 * Storybook.
 */

export default {
  title: 'Front UI Kit/Skeleton',
  component: ShowcaseComponent
} as ComponentMeta<typeof ShowcaseComponent>;

const ShowcaseTemplate: ComponentStory<typeof ShowcaseComponent> = () => <ShowcaseComponent />;
export const Showcase = ShowcaseTemplate.bind({});
Showcase.parameters = {
  controls: {hideNoControlsWarning: true}
};

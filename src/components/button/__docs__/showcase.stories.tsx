import {ComponentMeta, ComponentStory} from '@storybook/react';
import React, {FC} from 'react';
import styled from 'styled-components';

import {greys, palette} from '../../../helpers/colorHelpers';
import {fontSizes, fontWeights, VisualSizesEnum} from '../../../helpers/fontHelpers';
import {DefaultStyleProvider} from '../../../utils/defaultStyleProvider';
import {Icon} from '../../icon/icon';
import {Button} from '../button';
import {ButtonContent} from '../buttonContent';
import {ButtonContentIcon} from '../buttonContentIcon';
import {ButtonGroup} from '../buttonGroup';

/*
 * Component.
 */

const StyledContainerDiv = styled.div`
  display: flex;
  flex-flow: column;
  gap: 32px;
`;

const StyledButtonsContainerDiv = styled.div`
  display: flex;
  flex-flow: column;
  gap: 16px;
`;

const StyledTitleDiv = styled.div`
  color: ${greys.shade80};
  font-size: ${fontSizes.veryLarge};
  font-weight: ${fontWeights.semibold};
`;

const StyledCustomButtom = styled(Button)`
  background: ${greys.black};
  color: ${greys.white};
  &:hover {
    background: ${palette.blue.shade40};
    color: ${greys.white};
  }
  border-radius: 50%;
`;

const ShowcaseComponent: FC = props => (
  <DefaultStyleProvider>
    <StyledContainerDiv>
      <StyledButtonsContainerDiv>
        <StyledTitleDiv>Primary Buttons</StyledTitleDiv>
        <ButtonGroup>
          <Button type="primary" size={VisualSizesEnum.SMALL} isDisabled>Disabled Primary</Button>
          <Button type="primary" size={VisualSizesEnum.SMALL}>Primary</Button>
          <Button type="primary">Primary</Button>
          <Button type="primary" size={VisualSizesEnum.LARGE}>Primary</Button>
        </ButtonGroup>
      </StyledButtonsContainerDiv>
      <StyledButtonsContainerDiv>
        <StyledTitleDiv>Primary Danger Buttons</StyledTitleDiv>
        <ButtonGroup>
          <Button type="primary-danger" size={VisualSizesEnum.SMALL} isDisabled>Disabled Primary Danger</Button>
          <Button type="primary-danger" size={VisualSizesEnum.SMALL}>Primary Danger</Button>
          <Button type="primary-danger">Primary Danger</Button>
          <Button type="primary-danger" size={VisualSizesEnum.LARGE}>Primary Danger</Button>
        </ButtonGroup>
      </StyledButtonsContainerDiv>
      <StyledButtonsContainerDiv>
        <StyledTitleDiv>Secondary Buttons</StyledTitleDiv>
        <ButtonGroup>
          <Button type="secondary" size={VisualSizesEnum.SMALL} isDisabled>Disabled Secondary</Button>
          <Button type="secondary" size={VisualSizesEnum.SMALL}>Secondary</Button>
          <Button type="secondary">Secondary</Button>
          <Button type="secondary" size={VisualSizesEnum.LARGE}>Secondary</Button>
        </ButtonGroup>
      </StyledButtonsContainerDiv>
      <StyledButtonsContainerDiv>
        <StyledTitleDiv>Secondary Danger Buttons</StyledTitleDiv>
        <ButtonGroup>
          <Button type="secondary-danger" size={VisualSizesEnum.SMALL} isDisabled>Disabled Secondary Danger</Button>
          <Button type="secondary-danger" size={VisualSizesEnum.SMALL}>Secondary Danger</Button>
          <Button type="secondary-danger">Secondary Danger</Button>
          <Button type="secondary-danger" size={VisualSizesEnum.LARGE}>Secondary Danger</Button>
        </ButtonGroup>
      </StyledButtonsContainerDiv>
      <StyledButtonsContainerDiv>
        <StyledTitleDiv>Tertiary Buttons</StyledTitleDiv>
        <ButtonGroup>
          <Button type="tertiary" size={VisualSizesEnum.SMALL} isDisabled>Disabled Tertiary</Button>
          <Button type="tertiary" size={VisualSizesEnum.SMALL}>Tertiary</Button>
          <Button type="tertiary">Tertiary</Button>
          <Button type="tertiary" size={VisualSizesEnum.LARGE}>Tertiary</Button>
        </ButtonGroup>
      </StyledButtonsContainerDiv>
      <StyledButtonsContainerDiv>
        <StyledTitleDiv>Icon Buttons</StyledTitleDiv>
        <ButtonGroup>
          <Button type="icon" isDisabled><Icon name="CheckmarkCircle" /></Button>
          <Button type="icon"><Icon name="CheckmarkCircle" /></Button>
          <Button type="icon"><Icon name="Close" /></Button>
          <Button type="icon"><Icon name="Search" /></Button>
        </ButtonGroup>
      </StyledButtonsContainerDiv>
      <StyledButtonsContainerDiv>
        <StyledTitleDiv>Custom Icon Buttons</StyledTitleDiv>
        <ButtonGroup>
          <StyledCustomButtom type="icon"><Icon name="CheckmarkCircle" /></StyledCustomButtom>
          <StyledCustomButtom type="icon"><Icon name="Close" /></StyledCustomButtom>
          <StyledCustomButtom type="icon"><Icon name="Search" /></StyledCustomButtom>
        </ButtonGroup>
      </StyledButtonsContainerDiv>
      <StyledButtonsContainerDiv>
        <StyledTitleDiv>Icon Danger Buttons</StyledTitleDiv>
        <ButtonGroup>
          <Button type="icon-danger" isDisabled><Icon name="CheckmarkCircle" /></Button>
          <Button type="icon-danger"><Icon name="CheckmarkCircle" /></Button>
          <Button type="icon-danger"><Icon name="Close" /></Button>
          <Button type="icon-danger"><Icon name="Search" /></Button>
        </ButtonGroup>
      </StyledButtonsContainerDiv>
      <StyledButtonsContainerDiv>
        <StyledTitleDiv>Buttons with Icons</StyledTitleDiv>
        <ButtonGroup>
          <Button type="primary" isDisabled>
            <ButtonContent>Primary</ButtonContent>
            <ButtonContentIcon><Icon name="ExternalLink" /></ButtonContentIcon>
          </Button>
          <Button type="primary">
            <ButtonContent>Primary</ButtonContent>
            <ButtonContentIcon><Icon name="ExternalLink" /></ButtonContentIcon>
          </Button>
          <Button type="secondary">
            <ButtonContent>Secondary</ButtonContent>
            <ButtonContentIcon><Icon name="ExternalLink" /></ButtonContentIcon>
          </Button>
          <Button type="primary">
            <ButtonContent>Primary</ButtonContent>
            <ButtonContentIcon position="right"><Icon name="ExternalLink" /></ButtonContentIcon>
          </Button>
          <Button type="secondary">
            <ButtonContent>Secondary</ButtonContent>
            <ButtonContentIcon position="right"><Icon name="ExternalLink" /></ButtonContentIcon>
          </Button>
          <Button type="secondary">
            <ButtonContent>
              <Icon name="PlusCircle" color={greys.shade80} />
            </ButtonContent>
            <ButtonContentIcon position="right"><Icon name="ChevronDown" /></ButtonContentIcon>
          </Button>
        </ButtonGroup>
      </StyledButtonsContainerDiv>
    </StyledContainerDiv>
  </DefaultStyleProvider>
);

/*
 * Storybook.
 */

export default {
  title: 'Components/Buttons',
  component: ShowcaseComponent
} as ComponentMeta<typeof ShowcaseComponent>;

const ShowcaseTemplate: ComponentStory<typeof ShowcaseComponent> = () => <ShowcaseComponent />;
export const Showcase = ShowcaseTemplate.bind({});
Showcase.parameters = {
  controls: {hideNoControlsWarning: true}
};

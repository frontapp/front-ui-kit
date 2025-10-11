import {StoryFn} from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import {Button} from '../../button';
import {PaletteColorsEnum} from '../../../../helpers/colorHelpers';
import {Icon} from '../../../../elements/icon/icon';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

const StyledSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledRow = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
`;

const StyledLabel = styled.span`
  font-weight: 600;
  min-width: 120px;
`;

const Template: StoryFn<typeof Button> = () => (
  <StyledContainer>
    <StyledSection>
      <h3>Custom Colors</h3>
      <StyledRow>
        <StyledLabel>Primary Green:</StyledLabel>
        <Button type="primary" color={PaletteColorsEnum.GREEN}>
          Green Primary
        </Button>
      </StyledRow>
      <StyledRow>
        <StyledLabel>Primary Purple:</StyledLabel>
        <Button type="primary" color={PaletteColorsEnum.PURPLE}>
          Purple Primary
        </Button>
      </StyledRow>
      <StyledRow>
        <StyledLabel>Secondary Orange:</StyledLabel>
        <Button type="secondary" color={PaletteColorsEnum.ORANGE}>
          Orange Secondary
        </Button>
      </StyledRow>
      <StyledRow>
        <StyledLabel>Tertiary Teal:</StyledLabel>
        <Button type="tertiary" color={PaletteColorsEnum.TEAL}>
          Teal Tertiary
        </Button>
      </StyledRow>
      <StyledRow>
        <StyledLabel>Primary Front Purple:</StyledLabel>
        <Button type="primary" color={PaletteColorsEnum.FRONT_PURPLE}>
          Front Purple Primary
        </Button>
      </StyledRow>
    </StyledSection>

    <StyledSection>
      <h3>Custom Border Radius</h3>
      <StyledRow>
        <StyledLabel>Default (100px):</StyledLabel>
        <Button type="primary">Default Rounded</Button>
      </StyledRow>
      <StyledRow>
        <StyledLabel>8px:</StyledLabel>
        <Button type="primary" borderRadius="8px">
          Slightly Rounded
        </Button>
      </StyledRow>
      <StyledRow>
        <StyledLabel>4px:</StyledLabel>
        <Button type="primary" borderRadius="4px">
          Less Rounded
        </Button>
      </StyledRow>
      <StyledRow>
        <StyledLabel>0px:</StyledLabel>
        <Button type="primary" borderRadius="0px">
          Square
        </Button>
      </StyledRow>
    </StyledSection>

    <StyledSection>
      <h3>Combined Customizations</h3>
      <StyledRow>
        <StyledLabel>Green + 8px:</StyledLabel>
        <Button type="primary" color={PaletteColorsEnum.GREEN} borderRadius="8px">
          Custom Green
        </Button>
      </StyledRow>
      <StyledRow>
        <StyledLabel>Purple + Square:</StyledLabel>
        <Button type="secondary" color={PaletteColorsEnum.PURPLE} borderRadius="0px">
          Purple Square
        </Button>
      </StyledRow>
      <StyledRow>
        <StyledLabel>Pink + 12px:</StyledLabel>
        <Button type="tertiary" color={PaletteColorsEnum.PINK} borderRadius="12px">
          Pink Rounded
        </Button>
      </StyledRow>
      <StyledRow>
        <StyledLabel>Front Purple + 6px:</StyledLabel>
        <Button type="primary" color={PaletteColorsEnum.FRONT_PURPLE} borderRadius="6px">
          Front Purple Rounded
        </Button>
      </StyledRow>
    </StyledSection>

    <StyledSection>
      <h3>Icon Buttons with Custom Colors</h3>
      <StyledRow>
        <StyledLabel>Green Icon:</StyledLabel>
        <Button type="icon" color={PaletteColorsEnum.GREEN} onClick={() => console.log('Green icon clicked')}>
          <Icon name="CheckmarkCircle" />
        </Button>
      </StyledRow>
      <StyledRow>
        <StyledLabel>Purple Icon + Custom Radius:</StyledLabel>
        <Button
          type="icon"
          color={PaletteColorsEnum.PURPLE}
          borderRadius="12px"
          onClick={() => console.log('Purple icon clicked')}>
          <Icon name="Star" />
        </Button>
      </StyledRow>
      <StyledRow>
        <StyledLabel>Front Icon:</StyledLabel>
        <Button type="icon" onClick={() => console.log('Front icon clicked')}>
          <Icon name="Gear" />
        </Button>
      </StyledRow>
      <StyledRow>
        <StyledLabel>Front Icon + Custom Radius:</StyledLabel>
        <Button type="icon" borderRadius="16px" onClick={() => console.log('Front icon with radius clicked')}>
          <Icon name="Gear" />
        </Button>
      </StyledRow>
      <StyledRow>
        <StyledLabel>Front Purple Icon:</StyledLabel>
        <Button
          type="icon"
          color={PaletteColorsEnum.FRONT_PURPLE}
          onClick={() => console.log('Front Purple icon clicked')}>
          <Icon name="StarFilled" />
        </Button>
      </StyledRow>
    </StyledSection>
  </StyledContainer>
);

export const Customization = Template.bind({});

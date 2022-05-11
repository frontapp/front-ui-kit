import {ComponentMeta, ComponentStory} from '@storybook/react';
import React, {FC, useState} from 'react';
import styled from 'styled-components';

import {IconName} from '../../..';
import {greys, palette} from '../../../helpers/colorHelpers';
import {Input, InputTypesEnum} from '../input';

/*
 * Props.
 */

interface ShowcaseInputProps {
  /** The content of the input field */
  value?: string | number;
  /** Type of input: number, text, email, url, password. Default to text. */
  type: InputTypesEnum;
  /** Whether the input is disabled. */
  isDisabled?: boolean;
  /** The icon to render at the beginning of the input field */
  iconName?: IconName;
}

/*
 * Style.
 */
interface StyledTextProps {
  /** Whether the input corresponding to the text is focused. */
  $isFocused : boolean;
}

const StyledShowcaseDiv = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
  background: ${greys.shade30};
  width: 450px;
  height: 60px;
  align-items: center;
  padding-left: 10px;
  padding-right: 20px;
  gap: 20px;
  display: flex;
  align-items: center;
`;

const StyledText = styled.div<StyledTextProps>`
  line-height: 17px;
  text-overflow: ellipsis;
  width: 121px;
  height: 30px;
  align-items: center;
  display: flex;
  overflow: hidden;
  white-space: nowrap;
  color: ${p => (p.$isFocused ? `${palette.blue.shade40}` : `${greys.black}`)};
`;

/*
 * Component.
 */

const ShowcaseComponent: FC = props => (
  <div>
    <ShowcaseInputComponent isDisabled value="Disabled Input" type={InputTypesEnum.TEXT} />
    <ShowcaseInputComponent type={InputTypesEnum.TEXT} />
    <ShowcaseInputComponent value="Hello World" type={InputTypesEnum.TEXT} />
    <ShowcaseInputComponent value="Hello World" type={InputTypesEnum.TEXT} iconName="Close" />
    <ShowcaseInputComponent value={10} type={InputTypesEnum.NUMBER} />
  </div>
);

const ShowcaseInputComponent: FC<ShowcaseInputProps> = props => {
  const {isDisabled, value, type, iconName} = props;
  const [inputValue, setInputValue] = useState(value);
  const [isErred, setIsErred] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const onChange = newValue => {
    setInputValue(newValue);
    if (newValue === "Error")
      setIsErred(true);
    else
      setIsErred(false);
  };
  const onFocus = () => {
    setIsFocused(true);
  };
  const onBlur = () => {
    setIsFocused(false);
  };

  return (
    <StyledShowcaseDiv>
      <Input id="input" value={inputValue} type={type} isDisabled={isDisabled} iconName={iconName} isErred={isErred} onChange={onChange} onBlur={onBlur} onFocus={onFocus} />
      <StyledText $isFocused={isFocused}>{inputValue}</StyledText>
    </StyledShowcaseDiv>
  );
};

/*
 * Storybook.
 */

export default {
  title: 'Front UI Kit/Input',
  component: ShowcaseComponent
} as ComponentMeta<typeof ShowcaseComponent>;

const ShowcaseTemplate: ComponentStory<typeof ShowcaseComponent> = () => <ShowcaseComponent />;
export const Showcase = ShowcaseTemplate.bind({});
Showcase.parameters = {
  controls: {hideNoControlsWarning: true}
};

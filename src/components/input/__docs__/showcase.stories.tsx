import {ComponentMeta, ComponentStory} from '@storybook/react';
import React, {FC, useState} from 'react';
import styled from 'styled-components';

import {Input, InputTypesEnum} from '../input';
import {IconName} from '../../..';
import {greys} from '../../../helpers/colorHelpers';

/*
 * Props.
 */

interface ShowcaseInputProps {
  /** The content of the input field */
  value: string | number;
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

const StyledShowcaseDiv = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
  background: ${greys.shade80}
`;

/*
 * Component.
 */

const ShowcaseComponent: FC = props => (
  <div>
    <ShowcaseInputComponent isDisabled value="Disabled Input" type={InputTypesEnum.TEXT} />
    <ShowcaseInputComponent value={10} type={InputTypesEnum.NUMBER} />
  </div>
);

const ShowcaseInputComponent: FC<ShowcaseInputProps> = props => {
  const {isDisabled, value, type, iconName} = props;
  const [inputValue, setInputValue] = useState(value);
  const onChange = newValue => {
    setInputValue(inputValue);
  };


  return (
    <StyledShowcaseDiv>
      <Input value={value} type={type} isDisabled={isDisabled} iconName={iconName} onChange={onChange}/>
      {inputValue}
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

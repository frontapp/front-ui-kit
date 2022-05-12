import {ComponentMeta, ComponentStory} from '@storybook/react';
import React, {FC, useState} from 'react';
import styled from 'styled-components';

import {greys, palette} from '../../../helpers/colorHelpers';
import {Textarea} from '../textarea';

/*
 * Props.
 */

interface ShowcaseTextareaProps {
  /** The content of the textarea field */
  value?: string | number;
  /** Whether the textarea is disabled. */
  isDisabled?: boolean;
  /** The number of lines in the textarea field */
  rows: number;
  /** Whether the textarea is resizable */
  shouldAllowResize?: boolean;
}

/*
 * Style.
 */

interface StyledTextProps {
  /** Whether the textarea corresponding to the text is focused. */
  $isFocused : boolean;
}

const StyledShowcaseDiv = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;
  width: 400px;
  border: 2px solid ${greys.black};
  align-items: center;
  padding-left: 10px;
  padding-right: 20px;
  gap: 20px;
  display: flex;
  align-items: center;
`;

const StyledTextareaDiv = styled.div`
`;

const StyledText = styled.div<StyledTextProps>`
  line-height: 17px;
  align-items: center;
  display: flex;
  overflow: hidden;
  color: ${p => (p.$isFocused ? `${palette.blue.shade40}` : `${greys.black}`)};
`;

/*
 * Component.
 */

const ShowcaseComponent: FC = props => (
  <div>
    <ShowcaseTextareaComponent isDisabled value="Disabled Textarea" rows={5} />
    <ShowcaseTextareaComponent value="Hello World" rows={3} />
    <ShowcaseTextareaComponent value={10} rows={2} shouldAllowResize={false} />
  </div>
);

const ShowcaseTextareaComponent: FC<ShowcaseTextareaProps> = props => {
  const {isDisabled, value, rows, shouldAllowResize = true} = props;
  const [textareaValue, setTextareaValue] = useState(value);
  const [isErred, setIsErred] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const onChange = newValue => {
    setTextareaValue(newValue);
    if (newValue.startsWith("Error"))
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
      <StyledTextareaDiv>
        <Textarea
          id="Textarea"
          rows={rows}
          value={textareaValue.toString()}
          isDisabled={isDisabled}
          isErred={isErred}
          shouldAllowResize={shouldAllowResize}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
        />
      </StyledTextareaDiv>
      <StyledText $isFocused={isFocused}>{textareaValue}</StyledText>
    </StyledShowcaseDiv>
  );
};

/*
 * Storybook.
 */

export default {
  title: 'Front UI Kit/Textarea',
  component: ShowcaseComponent
} as ComponentMeta<typeof ShowcaseComponent>;

const ShowcaseTemplate: ComponentStory<typeof ShowcaseComponent> = () => <ShowcaseComponent />;
export const Showcase = ShowcaseTemplate.bind({});
Showcase.parameters = {
  controls: {hideNoControlsWarning: true}
};

import {ComponentMeta, ComponentStory} from '@storybook/react';
import React, {FC, useState} from 'react';
import styled from 'styled-components';

import {greys, palette} from '../../../helpers/colorHelpers';
import {TextArea} from '../textarea';

/*
 * Props.
 */

interface ShowcaseTextAreaProps {
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

const StyledTextAreaDiv = styled.div`
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
    <ShowcaseTextAreaComponent isDisabled value="Disabled TextArea" rows={5} />
    <ShowcaseTextAreaComponent value="Hello World" rows={3} />
    <ShowcaseTextAreaComponent value={10} rows={2} shouldAllowResize={false} />
  </div>
);

const ShowcaseTextAreaComponent: FC<ShowcaseTextAreaProps> = props => {
  const {isDisabled, value, rows, shouldAllowResize = true} = props;
  const [TextAreaValue, setTextAreaValue] = useState(value);
  const [isErred, setIsErred] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const onChange = newValue => {
    setTextAreaValue(newValue);
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
      <StyledTextAreaDiv>
        <TextArea
          id="TextArea"
          rows={rows}
          value={TextAreaValue}
          isDisabled={isDisabled}
          isErred={isErred}
          shouldAllowResize={shouldAllowResize}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
        />
      </StyledTextAreaDiv>
      <StyledText $isFocused={isFocused}>{TextAreaValue}</StyledText>
    </StyledShowcaseDiv>
  );
};

/*
 * Storybook.
 */

export default {
  title: 'Front UI Kit/TextArea',
  component: ShowcaseComponent
} as ComponentMeta<typeof ShowcaseComponent>;

const ShowcaseTemplate: ComponentStory<typeof ShowcaseComponent> = () => <ShowcaseComponent />;
export const Showcase = ShowcaseTemplate.bind({});
Showcase.parameters = {
  controls: {hideNoControlsWarning: true}
};

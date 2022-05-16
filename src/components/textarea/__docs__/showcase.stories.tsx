import {ComponentMeta, ComponentStory} from '@storybook/react';
import React, {FC, useState} from 'react';
import styled from 'styled-components';

import {greys, palette} from '../../../helpers/colorHelpers';
import {fontSizes} from '../../../helpers/fontHelpers';
import {DefaultStyleProvider} from '../../../utils/defaultStyleProvider';
import {Textarea} from '../textarea';

/*
 * Props.
 */

interface ShowcaseTextareaProps {
  value?: string | number;
  isDisabled?: boolean;
  rows: number;
  shouldAllowResize?: boolean;
  description?: string;
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
  background: ${greys.white};
  border-radius: 8px;
  padding: 16px;
  align-items: center;
  padding-left: 10px;
  padding-right: 20px;
  gap: 20px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const StyledTextareaDiv = styled.div`
  flex: 1;
`;

const StyledText = styled.div<StyledTextProps>`
  flex: 1;
  line-height: 17px;
  align-items: center;
  display: flex;
  overflow: hidden;
  color: ${p => (p.$isFocused ? `${palette.blue.shade40}` : `${greys.black}`)};
`;

const StyledDescriptionDiv = styled.div`
  font-size: ${fontSizes.small};
  color: ${greys.shade60};
  flex: 0 0 100%;
  text-align: center;
`;

/*
 * Component.
 */

const ShowcaseComponent: FC = props => (
  <DefaultStyleProvider>
    <ShowcaseTextareaComponent value="Hello World" rows={3} />
    <ShowcaseTextareaComponent value={10} rows={2} shouldAllowResize={false} description="Resize is disabled." />
    <ShowcaseTextareaComponent isDisabled value="Disabled Textarea" rows={5} description="Textarea is disabled, can still resize." />
  </DefaultStyleProvider>
);

const ShowcaseTextareaComponent: FC<ShowcaseTextareaProps> = props => {
  const {isDisabled, value, rows, shouldAllowResize = true, description} = props;
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
      {description && <StyledDescriptionDiv>{description}</StyledDescriptionDiv>}
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
  title: 'Components/Textarea',
  component: ShowcaseComponent
} as ComponentMeta<typeof ShowcaseComponent>;

const ShowcaseTemplate: ComponentStory<typeof ShowcaseComponent> = () => <ShowcaseComponent />;
export const Showcase = ShowcaseTemplate.bind({});
Showcase.parameters = {
  controls: {hideNoControlsWarning: true}
};

import React, {ChangeEventHandler, FC, FocusEventHandler} from 'react';
import styled, {css} from 'styled-components';

import {greys, palette} from '../../helpers/colorHelpers';
import {fonts, fontSizes, fontWeights} from '../../helpers/fontHelpers';

/*
 * Props
 */

interface TextareaProps {
  /** The id of the textarea field */
  id: string
  /** The content of the textarea field */
  value?: string;
  /** The number of lines in the textarea field */
  rows: number;
  /** The name of the textarea field */
  name?: string;
  /** Whether the textarea is resizable */
  shouldAllowResize?: boolean;
  /** Placeholder value */
  placeholder?: string;
  /** Whether the textarea is disabled */
  isDisabled?: boolean;
  /** Whether the textarea is erred */
  isErred?: boolean;
  /** Whether we should focus on the textarea when it is mounted */
  shouldFocus?: boolean;
  /** Max width of the textarea. Default is 100%. */
  maxWidth?: number;
  /** The handler for when the content of the textarea field changes */
  onChange?: (value?: string) => void;
  /** The handler for when the textarea field is unfocused */
  onBlur?: () => void;
  /** The handler for when the textarea field is focused */
  onFocus?: () => void;
}

/*
 * Style.
 */

interface StyledTextareaDivProps {
  $maxWidth?: number;
}

const StyledTextareaDiv = styled.div<StyledTextareaDivProps>`
  position: relative;
  display: flex;
  flex-flow: row;
  width: 100%;

  ${p => p.$maxWidth && css`max-width: ${p.$maxWidth}px;`};
`;

interface StyledTextareaProps {
  $isDisabled: boolean;
  $isErred: boolean;
  $shouldAllowResize: boolean;
}

const StyledTextarea = styled.textarea<StyledTextareaProps>`
  width: inherit;
  height: inherit;
  background: ${greys.shade20};
  font-family: ${fonts.system};
  font-size: ${fontSizes.medium};
  font-weight: ${fontWeights.normal};
  line-height: 17px;
  text-overflow: ellipsis;
  border-radius: 6px;
  box-sizing: border-box;
  appearance: none;
  padding: 4.5px 8px;
  outline: none;
  color: ${greys.shade90};

  &::placeholder {
    color: ${greys.shade60};
  }

  &:hover {
    background: ${greys.shade30};
  }

  &:focus {
    border: 2px solid ${palette.blue.shade40};
    background: ${greys.white};
  }

  resize: ${p => (!p.$shouldAllowResize ? `none` : `auto`)};

  ${p => addTextareaStyles(p)};
`;

function addTextareaStyles(props: StyledTextareaProps) {
  if (props.$isDisabled)
    return css`
      border: 2px solid ${greys.shade30};
      background: ${greys.white};
      &:hover {
        background: ${greys.white};
      }
      opacity: 0.5;
    `;

  if (props.$isErred)
    return css`
      background: ${palette.red.shade10};
      border: 2px solid transparent;
      &:hover {
        background: ${palette.red.shade20};
      }
      &:focus {
        border: 2px solid ${palette.red.shade40};
        background: ${greys.white};
      }
    `;

  return css`
    border: 2px solid transparent;
  `;
}

/*
 * Component.
 */

export const Textarea: FC<TextareaProps> = props => {
  const {
    id,
    value,
    rows,
    shouldAllowResize = true,
    placeholder,
    name = "",
    isDisabled = false,
    isErred = false,
    maxWidth,
    onChange,
    onFocus,
    onBlur,
    shouldFocus = false
  } = props;
  const onTextareaChange: ChangeEventHandler<HTMLTextAreaElement> = event => {
    if (isDisabled || !onChange)
      return;
    const textAreaValue = event.currentTarget.value;
    onChange(textAreaValue);
  };

  const onTextareaFocus: FocusEventHandler<HTMLTextAreaElement> = event => {
    if (isDisabled || !onFocus)
      return;
    onFocus();
  };

  const onTextareaBlur: FocusEventHandler<HTMLTextAreaElement> = event => {
    if (isDisabled || !onBlur)
      return;
    onBlur();
  };

  return (
    <StyledTextareaDiv $maxWidth={maxWidth}>
      <StyledTextarea
        id={id}
        rows={rows}
        $isDisabled={isDisabled}
        $shouldAllowResize={shouldAllowResize}
        disabled={isDisabled}
        $isErred={isErred}
        placeholder={placeholder}
        autoFocus={shouldFocus}
        name={name}
        value={value}
        onChange={onTextareaChange}
        onFocus={onTextareaFocus}
        onBlur={onTextareaBlur}
      >
        {value}
      </StyledTextarea>
    </StyledTextareaDiv>
  );
};

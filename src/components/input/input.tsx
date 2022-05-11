import React, {ChangeEventHandler, FC, FocusEventHandler, useRef} from 'react';
import styled, {css} from 'styled-components';

import {Icon, IconName} from '../..';
import {greys, palette} from '../../helpers/colorHelpers';
import {fonts, fontSizes, fontWeights} from '../../helpers/fontHelpers';

/*
 * Props
 */

interface InputProps {
  /** The id of the input field */
  id: string
  /** The content of the input field */
  value?: string | number;
  /** Type of input: number, text, email, url, password. Default to text. */
  type?: 'text' |'email' | 'password' | 'url' |'number';
  /** The name of the input field */
  name?: string;
  /** Placeholder value */
  placeholder?: string;
  /** Whether the input is disabled */
  isDisabled?: boolean;
  /** The icon to render at the beginning of the input field */
  iconName?: IconName;
  /** Whether the input is erred */
  isErred?: boolean;
  /** Whether we should focus on the input when it is mounted */
  shouldFocus?: boolean;
  /** The handler for when the content of the input field changes */
  onChange?: (value?: string | number) => void;
  /** The handler for when the input field is unfocused */
  onBlur?: () => void;
  /** The handler for when the input field is focused */
  onFocus?: () => void;
}

/*
 * Style.
 */

interface StyledInputProps {
  $isDisabled: boolean;
  $hasIcon: boolean;
  $isErred: boolean;
}

const StyledInputDiv = styled.div`
  position: relative;
  width: inherit;
  height: 30px;
  display: flex;
  flex-flow: row;
`;

const StyledInput = styled.input<StyledInputProps>`
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
  padding: 7px 8px 7px 8px;
  padding-left: ${p => (p.$hasIcon ? `25px` : `8px`)};
  border: none;
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

  ${p => addInputStyles(p)};
`;

const StyledIconDiv = styled.div`
  position: absolute;
  top: 7px;
  left: 5px;
`;

function addInputStyles(props: StyledInputProps) {
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
      &:hover {
        background: ${palette.red.shade20};
      }
      &:focus {
        border: 2px solid ${palette.red.shade40};
        background: ${greys.white};
      }
    `;

  return css`
    border: none;
  `;
}

/*
 * Component.
 */

export const Input: FC<InputProps> = props => {
  const {id, value, placeholder, type = 'text', name = "", isDisabled = false,
    iconName, isErred = false, onChange, onFocus, onBlur, shouldFocus = false} = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const onInputChange: ChangeEventHandler<HTMLInputElement> = event => {
    if (isDisabled || !onChange)
      return;
    const inputValue = event.currentTarget.value;
    onChange(inputValue);
  };

  const onInputFocus: FocusEventHandler<HTMLInputElement> = event => {
    if (isDisabled)
      return;
    if (onFocus)
      onFocus();
  };

  const onInputBlur: FocusEventHandler<HTMLInputElement> = event => {
    if (isDisabled)
      return;
    if (onBlur)
      onBlur();
  };

  return (
    <StyledInputDiv>
      <StyledIconDiv>{getInputIcon(iconName)}</StyledIconDiv>
      <StyledInput
        id={id}
        ref={inputRef}
        $isDisabled={isDisabled}
        disabled={isDisabled}
        $isErred={isErred}
        $hasIcon={Boolean(iconName)}
        placeholder={placeholder}
        autoFocus={shouldFocus}
        type={type}
        name={name}
        value={value}
        onChange={onInputChange}
        onFocus={onInputFocus}
        onBlur={onInputBlur}
      />
    </StyledInputDiv>
  );
};

/*
 * Helpers.
 */

function getInputIcon(iconName?: IconName) {
  if (iconName)
    return <Icon name={iconName} />;
  return null;
}

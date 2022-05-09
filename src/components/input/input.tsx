
import React, {FC, useLayoutEffect, useRef, ChangeEventHandler, FocusEventHandler, useState} from 'react';
import styled, {css} from 'styled-components';

import {Icon, IconName} from '../..';
import {greys, palette} from '../../helpers/colorHelpers';
import {fonts, fontSizes, fontWeights} from '../../helpers/fontHelpers';

/*
 * Constants.
 */

export enum InputTypesEnum {
  TEXT = 'text',
  NUMBER = 'number',
  EMAIL = 'email',
  PASSWORD = 'password'
}

/**
 * Props
 */

interface InputProps {
  /** The content of the input field */
  value: string | number;
  /** Type of input: number, text, email, url, password. Default to text. */
  type?: InputTypesEnum;
  /** The name of the input field */
  name?: string;
  /** Placeholder value */
  placeholder?: string;
  /** Whether the input is disabled */
  isDisabled?: boolean;
  /** The icon to render at the beginning of the input field */
  iconName?: IconName;
  /** Whether we should focus on the input when it is mounted */
  shouldFocus?: boolean;
  /** The handler for when the content of the input field changes */
  onChange: (value?: string | number) => void
  /** The handler for when the input field is unfocused */
  onBlur?: () => void
  /** The handler for when the input field is focused */
  onFocus?: () => void
}

/*
 * Style.
 */

interface StyledInputProps {
  $isDisabled: boolean;
  $isActive: boolean;
  $hasIcon: boolean;
}

const StyledInputDiv = styled.div`
  position: relative;
  width: 121px;
  height: 30px;
  display: flex;
  flex-flow: row;
`;

const StyledInput = styled.input<StyledInputProps>`
  width: inherit;
  height: inherit;
  background: ${greys.white};
  font-family: ${fonts.system};
  font-size: ${fontSizes.medium};
  font-weight: ${fontWeights.normal};
  line-height: 17px;
  text-overflow: ellipsis;
  border-radius: 8px;
  box-sizing: border-box;
  appearance: none;
  padding-left: ${p => p.$hasIcon ? `26px` : `5px`};
  border: none;
  outline: none;

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
      color: ${greys.shade70};
    `;

  if (props.$isActive)
    return css`
      border: 2px solid ${palette.blue.shade40};
      color: ${greys.shade90};
    `;

  return css`
    border: 2px solid ${greys.shade10};
    color: ${greys.shade90};
  `;
}

export const Input: FC<InputProps> = props => {
  const {value, type = InputTypesEnum.TEXT, name = "", isDisabled = false, iconName, onChange, onFocus, onBlur, shouldFocus = false} = props;
  const [isActive, setIsActive] = useState(shouldFocus);
  const inputRef = useRef<HTMLInputElement>(null);
  const onInputChange: ChangeEventHandler<HTMLInputElement> = event => {
    if (isDisabled || !onChange)
      return;
    const inputValue = event.currentTarget.value || '';
    onChange(inputValue);
  };

  const onInputFocus: FocusEventHandler<HTMLInputElement> = event => {
    if (isDisabled)
      return;
    const input = inputRef.current;
    if (!input)
      return;
    input.focus();
    setIsActive(true);
    if (onFocus)
      onFocus();
  };

  const onInputBlur: FocusEventHandler<HTMLInputElement> = event => {
    if (isDisabled)
      return;
    const input = inputRef.current;
    if (!input)
      return;
    input.blur();
    setIsActive(false);
    if (onBlur)
      onBlur();
  };

  // Set the attributes of the input on every render.
  useLayoutEffect(() => {
    const input = inputRef.current;
    if (!input)
      return;

    if (isDisabled)
      input.disabled = true;
    else
      input.disabled = false;
  }, [isDisabled]);

  return (
    <StyledInputDiv>
      <StyledIconDiv>{getInputIcon(iconName)}</StyledIconDiv>
      <StyledInput
        ref={inputRef}
        $isDisabled={isDisabled}
        $isActive={isActive}
        $hasIcon={Boolean(iconName)}
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
    return <Icon name={iconName}/>;
  return null;

}
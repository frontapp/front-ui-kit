/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react/function-component-definition */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { ChangeEventHandler, FocusEventHandler } from 'react';
import styled, { css } from 'styled-components';

import { greys, palette } from '../../helpers/colorHelpers';
import { fonts, fontSizes, fontWeights } from '../../helpers/fontHelpers';
import { Icon, IconName } from '../icon/icon';

/*
 * Props
 */

interface InputProps<T> {
  /** The id of the input field */
  id?: string;
  /** The content of the input field */
  value?: T;
  /** Type of input: number, text, email, url, password. Default to text. */
  type?: 'text' | 'email' | 'password' | 'url' | 'number';
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
  /** Max width of the input. Default is 100%. */
  maxWidth?: number;
  /** The handler for when the content of the input field changes */
  onChange?: (value: T) => void;
  /** The handler for when the input field is unfocused */
  onBlur?: FocusEventHandler;
  /** The handler for when the input field is focused */
  onFocus?: FocusEventHandler;
}

/*
 * Style.
 */

interface StyledInputDivProps {
  $maxWidth?: number;
}

const StyledInputDiv = styled.div<StyledInputDivProps>`
  position: relative;
  width: 100%;
  display: flex;
  flex-flow: row;

  ${(p) =>
    p.$maxWidth &&
    css`
      max-width: ${p.$maxWidth}px;
    `};
`;

interface StyledInputProps {
  $isDisabled: boolean;
  $hasIcon: boolean;
  $isErred: boolean;
}

const StyledInput = styled.input<StyledInputProps>`
  width: inherit;
  height: inherit;
  background: ${greys.shade20};
  font-family: ${fonts.system};
  font-size: ${fontSizes.medium};
  font-weight: ${fontWeights.normal};
  line-height: 17px;
  border-radius: 6px;
  box-sizing: border-box;
  appearance: none;
  padding: 4.5px 8px 4.5px 8px;
  padding-left: ${(p) => (p.$hasIcon ? `25px` : `8px`)};
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

  ${(p) => addInputStyles(p)};
`;

const StyledIconDiv = styled.div`
  position: absolute;
  display: flex;
  flex-flow: column;
  top: 0;
  bottom: 0;
  left: 5px;
  justify-content: center;
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
      background: ${palette.red.shade20};
      border: 2px solid transparent;
      &:hover {
        background: ${palette.red.shade30};
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

export function Input<T = string>(props: InputProps<T>) {
  const {
    id,
    value,
    placeholder,
    type = 'text',
    name = '',
    isDisabled = false,
    iconName,
    isErred = false,
    maxWidth,
    onChange,
    onFocus,
    onBlur,
    shouldFocus = false
  } = props;
  const onInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (isDisabled || !onChange) return;
    const inputValue = event.currentTarget.value;
    onChange(inputValue as T);
  };

  const onInputFocus: FocusEventHandler<HTMLInputElement> = (event) => {
    if (isDisabled || !onFocus) return;
    onFocus(event);
  };

  const onInputBlur: FocusEventHandler<HTMLInputElement> = (event) => {
    if (isDisabled || !onBlur) return;
    onBlur(event);
  };

  return (
    <StyledInputDiv $maxWidth={maxWidth}>
      <StyledIconDiv>{getInputIcon(iconName)}</StyledIconDiv>
      <StyledInput
        id={id}
        $isDisabled={isDisabled}
        disabled={isDisabled}
        $isErred={isErred}
        $hasIcon={Boolean(iconName)}
        placeholder={placeholder}
        autoFocus={shouldFocus}
        type={type}
        name={name}
        value={value as unknown as string | number}
        onChange={onInputChange}
        onFocus={onInputFocus}
        onBlur={onInputBlur}
        aria-invalid={isErred}
      />
    </StyledInputDiv>
  );
}

/*
 * Helpers.
 */

function getInputIcon(iconName?: IconName) {
  if (iconName) return <Icon name={iconName} />;
  return null;
}

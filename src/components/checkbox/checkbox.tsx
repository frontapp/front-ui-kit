import React, {FC, useLayoutEffect, useRef} from 'react';
import styled, {css} from 'styled-components';

import {Icon} from '../../elements/icon/icon';
import {greys, palette} from '../../helpers/colorHelpers';
import {fonts, fontSizes, fontWeights} from '../../helpers/fontHelpers';

/*
 * Props.
 */

interface CheckboxProps {
  /** Whether the checkbox is checked. */
  isChecked: boolean;
  /** The label of the checkbox. */
  children?: React.ReactNode;
  /** Whether the checkbox is disabled. If disabled, clicking it won't check/uncheck it. */
  isDisabled?: boolean;
  /** Whether the checkbox is in an indeterminate state. */
  isIndeterminate?: boolean;
  /** The side to render the label on. */
  labelSide?: 'left' | 'right';
  /** Handler to check or uncheck the checkbox */
  onChange: (isChecked: boolean) => void;
}

/*
 * Style.
 */

interface StyledCheckboxInputProps {
  $isChecked: boolean;
  $isIndeterminate: boolean;
  $isDisabled: boolean;
}

interface StyledWrapperDivProps {
  $labelSide: 'left' | 'right';
}

const StyledWrapperDiv = styled.div<StyledWrapperDivProps>`
  display: flex;
  flex-flow: row;
  align-items: center;

  ${p =>
    p.$labelSide === 'left' &&
    css`
      flex-flow: row-reverse;
    `};
`;

const StyledCheckboxDiv = styled.div`
  position: relative;
  width: 16px;
  height: 16px;
`;

const StyledIconDiv = styled.div`
  position: absolute;
  pointer-events: none;
  top: 0px;
`;

const StyledInput = styled.input<StyledCheckboxInputProps>`
  width: inherit;
  height: inherit;
  border-radius: 3px;
  box-sizing: border-box;
  appearance: none;
  margin: 0px;

  ${p => addCheckboxStyles(p)};
`;

const StyledChildrenDiv = styled.div`
  font-family: ${fonts.system};
  font-size: ${fontSizes.medium};
  font-weight: ${fontWeights.normal};
  line-height: 17px;
  color: ${greys.shade80};
  margin-left: 8px;
  cursor: default;
  user-select: none;
  flex: 1;

  &:empty {
    margin-left: 0;
    display: none;
  }
`;

function addCheckboxStyles(props: StyledCheckboxInputProps) {
  if (props.$isDisabled && (props.$isChecked || props.$isIndeterminate))
    return css`
      background-color: ${greys.shade40};
      border: 1.5px solid ${greys.shade40};
    `;

  if (props.$isDisabled)
    return css`
      background-color: ${greys.shade20};
      border: 1.5px solid ${greys.shade40};
    `;

  if (props.$isChecked || props.$isIndeterminate)
    return css`
      background: ${palette.blue.shade40};
      border: none;
    `;

  return css`
    border: 1.5px solid ${greys.shade60};
  `;
}

/*
 * Component.
 */

export const Checkbox: FC<CheckboxProps> = ({
  isChecked,
  children,
  isDisabled = false,
  isIndeterminate = false,
  labelSide = 'right',
  onChange
}) => {
  const onInputChange = () => {
    if (isDisabled)
      return;
    onChange(!isChecked);
  };
  const inputRef = useRef<HTMLInputElement>(null);

  // Set the attributes of the input on every render.
  useLayoutEffect(() => {
    const input = inputRef.current;
    if (!input)
      return;

    if (isDisabled)
      input.disabled = true;
    else
      input.disabled = false;

    if (isChecked) {
      input.indeterminate = false;
      input.checked = true;
    } else if (isIndeterminate) {
      input.indeterminate = true;
      input.checked = false;
    }
  }, [isDisabled, isChecked, isIndeterminate]);

  return (
    <StyledWrapperDiv $labelSide={labelSide}>
      <StyledCheckboxDiv>
        <StyledInput
          ref={inputRef}
          type="checkbox"
          $isChecked={isChecked}
          $isDisabled={isDisabled}
          $isIndeterminate={isIndeterminate}
          onChange={onInputChange}
        />
        <StyledIconDiv>{getCheckboxIcon(isDisabled, isChecked, isIndeterminate)}</StyledIconDiv>
      </StyledCheckboxDiv>
      <StyledChildrenDiv onClick={onInputChange}>{children}</StyledChildrenDiv>
    </StyledWrapperDiv>
  );
};

/*
 * Helpers.
 */

function getCheckboxIcon(isDisabled: boolean, isChecked: boolean, isIndeterminate: boolean) {
  if (isChecked)
    return <Icon name="CheckmarkBox" color={isDisabled ? greys.shade60 : greys.white} />;
  if (isIndeterminate)
    return <Icon name="Minus" color={isDisabled ? greys.shade60 : greys.white} />;
  return null;
}

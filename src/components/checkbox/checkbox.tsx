import React, {FC, useLayoutEffect, useRef} from 'react';
import styled, {css} from 'styled-components';

import {Icon} from '../..';
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
  /** Handler to check or uncheck the checkbox */
  onChange: (isChecked: boolean) => void
}

/*
 * Style.
 */

interface StyledCheckboxInputProps {
  $isChecked: boolean;
  $isIndeterminate: boolean;
  $isDisabled?: boolean;
  $iconUrl?: string;
}

const StyledWrapperDiv = styled.div`
  display: flex;
  flex-flow: row;
`;

const StyledCheckboxDiv = styled.div`
  position: relative;
`;

const StyledIconDiv = styled.div`
  position: absolute;
  top: 3px;
  left: 4px;
  pointer-events:none
`;

const StyledInput = styled.input<StyledCheckboxInputProps>`
  width: 16px;
  height: 16px;
  border-radius: 3px;
  box-sizing: border-box;
  -moz-appearance: none;
  -webkit-appearance: none;
  -ms-progress-appearance: none;

  ${p => addCheckboxStyles(p)};
`;

const StyledChildrenDiv = styled.div`
  font-family: ${fonts.system};
  font-size: ${fontSizes.medium};
  font-weight: ${fontWeights.normal};
  line-height: 26px;
  letter-spacing: -0.154px;
  color: ${greys.shade80};
  margin-left: 8px;
`;

function addCheckboxStyles(props: StyledCheckboxInputProps) {
  if (props.$isDisabled && (props.$isChecked|| props.$isIndeterminate))
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
    border: 1.5px solid ${greys.shade60}
  `;
}

function getCheckboxImage(props: CheckboxProps) {
  if (props.isChecked)
    return <Icon name="CheckmarkBox" color={props.isDisabled? greys.shade60 : greys.white} />;
  if (props.isIndeterminate)
    return <Icon name="Minus" size={16} color={props.isDisabled? greys.shade60 : greys.white} />;
  return null;
}

export const Checkbox: FC<CheckboxProps> = props => {
  const {isChecked, children, isDisabled = false, isIndeterminate = false, onChange} = props;
  const onInputChange = () => {
    if (isDisabled)
      return;
    onChange(!isChecked);
  };
  const inputRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    const input = inputRef.current;
    if (!input)
      return;

    if (isChecked) {
      input.indeterminate = false;
      input.checked = true;
    } else if (isIndeterminate) {
      input.indeterminate = true;
      input.checked = false;
    }
  }, [isChecked, isIndeterminate]);

  return (
    <StyledWrapperDiv>
      <StyledCheckboxDiv>
        <StyledInput
          ref={inputRef}
          type="checkbox"
          $isChecked={isChecked}
          $isDisabled={isDisabled}
          $isIndeterminate={isIndeterminate}
          onChange={onInputChange}
        />
        <StyledIconDiv>{getCheckboxImage(props)}</StyledIconDiv>
      </StyledCheckboxDiv>
      <StyledChildrenDiv>{children}</StyledChildrenDiv>
    </StyledWrapperDiv>
  );
};

import React, {FC, useCallback, useLayoutEffect, useRef} from 'react';
import styled from 'styled-components';

import {fonts, fontSizes} from '../../helpers/fontHelpers';

/*
 * Props.
 */

interface CheckboxProps {
  /** Whether the checkbox is checked. */
  isChecked: boolean;
  /** The content of the checkbox. */
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

const StyledWrapperDiv = styled.div`
  display: flex;
  flex-flow: row;
  gap: 5px;
  font-family: ${fonts.system};
  font-size: ${fontSizes.medium};
`;

const StyledInput = styled.input`
  display: grid;
`;

export const Checkbox: FC<CheckboxProps> = props => {
  const {isChecked, children, isDisabled = false, isIndeterminate = false, onChange} = props;
  const onInputChange = useCallback(() => {
    if (isDisabled)
      return;
    onChange(!isChecked);
  }, [isChecked, isDisabled, onChange]);
  const inputRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    const input = inputRef.current;
    if (!input)
      return;

    if (isIndeterminate) {
      input.indeterminate = true;
      input.checked = false;
    } else if (isChecked) {
      input.indeterminate = false;
      input.checked = true;
    }
  }, [isChecked, isIndeterminate]);

  return (
    <StyledWrapperDiv>
      <StyledInput
        ref={inputRef}
        type="checkbox"
        checked={isChecked}
        disabled={isDisabled}
        onChange={onInputChange}
      />
      {children}
    </StyledWrapperDiv>
  );
};

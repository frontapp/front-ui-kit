import {ellipsis} from 'polished';
import React, {FC} from 'react';
import styled, {css} from 'styled-components';

import {greys, palette} from '../../helpers/colorHelpers';
import {fonts, fontSizes, fontWeights} from '../../helpers/fontHelpers';

/*
 * Props.
 */

export interface FormFieldProps {
  /** The label for the form field. */
  label: string;
  /** A hint for the form field. If an error message is supplied, this will not be displayed. */
  hint?: string;
  /** An error message for the form field. If supplied this will automatically set isErred for the children. */
  errorMessage?: string;
  /** Whether we should show the "*". */
  isRequired?: boolean;
  /** Content to render. */
  children: React.ReactElement;
}

/*
 * Style.
 */

const StyledFormFieldWrapperDiv = styled.div`
  font-family: ${fonts.system};
  display: flex;
  flex-flow: column;
  gap: 6px;

  &:not(:first-of-type) {
    margin-top: 8px;
  }
`;

const StyledFormFieldLabelDiv = styled.div`
  display: flex;
  flex-flow: row;
  font-weight: ${fontWeights.semibold};
  font-size: ${fontSizes.small};
  color: ${greys.shade70};
`;

const StyledLabelWrapperDiv = styled.div`
  ${ellipsis()};
`;

const StyledRequiredTagDiv = styled.div`
  color: ${palette.red.shade40};
  margin-left: 4px;
`;

interface StyledFormFieldHelperTextDivProps {
  $isErred: boolean;
}

const StyledFormFieldHelperTextDiv = styled.div<StyledFormFieldHelperTextDivProps>`
  height: 14px;
  line-height: 14px;
  margin-top: -4px; // Minor offset to bring the hint and error closed to the input.

  ${p => css`
    font-size: ${fontSizes.verySmall};
    color: ${p.$isErred ? palette.red.shade40 : greys.shade60};
    font-weight: ${p.$isErred ? fontWeights.medium : fontWeights.normal};
  `}
`;

/*
 * Component.
 */

export const FormField: FC<FormFieldProps> = props => {
  const {label, children, errorMessage, hint, isRequired} = props;
  const isErred = Boolean(errorMessage);

  return (
    <StyledFormFieldWrapperDiv>
      <StyledFormFieldLabelDiv>
        <StyledLabelWrapperDiv>{label}</StyledLabelWrapperDiv>
        {isRequired && <StyledRequiredTagDiv>*</StyledRequiredTagDiv>}
      </StyledFormFieldLabelDiv>
      {React.cloneElement(children, {isErred})}
      {(errorMessage || hint) && (
        <StyledFormFieldHelperTextDiv $isErred={isErred}>{errorMessage || hint}</StyledFormFieldHelperTextDiv>
      )}
    </StyledFormFieldWrapperDiv>
  );
};


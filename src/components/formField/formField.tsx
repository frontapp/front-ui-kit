import React, {FC} from 'react';
import styled, {css} from 'styled-components';

import {greys, palette} from '../../helpers/colorHelpers';
import {fonts, fontSizes, fontWeights} from '../../helpers/fontHelpers';

/*
 * Props.
 */

interface FormFieldProps {
  /** The label for the form field. */
  label: string;
  /** A hint for the form field. If an error message is supplied, this will not be displayed. */
  hint?: string;
  /** An error message for the form field. If supplied this will automatically set isErred for the children. */
  errorMessage?: string;
  /** Children to render. */
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
`;

const StyledFormFieldLabelDiv = styled.div`
  font-weight: ${fontWeights.semibold};
  font-size: ${fontSizes.small};
  color: ${greys.shade70};
`;

interface StyledFormFieldHelperTextDivProps {
  $isErred: boolean;
}

const StyledFormFieldHelperTextDiv = styled.div<StyledFormFieldHelperTextDivProps>`
  height: 14px;
  line-height: 14px;

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
  const {label, children, errorMessage, hint} = props;
  const isErred = Boolean(errorMessage);

  return (
    <StyledFormFieldWrapperDiv>
      <StyledFormFieldLabelDiv>{label}</StyledFormFieldLabelDiv>
      {React.cloneElement(children, {isErred})}
      <StyledFormFieldHelperTextDiv $isErred={isErred}>{errorMessage || hint}</StyledFormFieldHelperTextDiv>
    </StyledFormFieldWrapperDiv>
  );
};


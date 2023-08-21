/* eslint-disable react/jsx-props-no-spreading */
import React, {FC} from 'react';
import styled from 'styled-components';

import {FormField, FormFieldProps} from '../../components/formField/formField';

/*
 * Style.
 */

const StyledDropdownItemFormFieldWrapperDiv = styled.div`
  padding: 0 8px;

  &:not(:first-of-type) {
    margin-top: 8px;
  }
`;

/*
 * Component.
 */

export const DropdownItemFormField: FC<FormFieldProps> = (props) => (
  <StyledDropdownItemFormFieldWrapperDiv onClick={(event) => event.preventDefault()}>
    <FormField {...props}>{props.children}</FormField>
  </StyledDropdownItemFormFieldWrapperDiv>
);

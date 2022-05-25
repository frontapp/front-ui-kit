/* eslint-disable react/jsx-props-no-spreading */
import React, {FC} from 'react';
import styled from 'styled-components';

import {FormField, FormFieldProps} from '../formField/formField';

/*
 * Style.
 */

const StyledDropdownItemInputWrapperDiv = styled.div`
  padding: 0 8px;
`;

/*
 * Component.
 */

export const DropdownItemInput: FC<FormFieldProps> = props => (
  <StyledDropdownItemInputWrapperDiv onClick={event => event.preventDefault()}>
    <FormField {...props}>{props.children}</FormField>
  </StyledDropdownItemInputWrapperDiv>
);

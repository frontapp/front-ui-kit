import React, {FC} from 'react';
import styled from 'styled-components';

import {Skeleton} from '../../skeleton/skeleton';

/*
 * Style.
 */

const StyledDropdownItemSkeletonDiv = styled.div`
  padding: 7px 12px;
`;

/*
 * Component.
 */

export const DropdownItemSkeleton: FC = () => (
  <StyledDropdownItemSkeletonDiv>
    <Skeleton borderRadius="4px" />
  </StyledDropdownItemSkeletonDiv>
);

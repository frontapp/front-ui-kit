import React, {FC} from 'react';
import styled from 'styled-components';

import {Skeleton} from '../../skeleton/skeleton';

/*
 * Props.
 */

// TODO: Add support for multi-line (description), Avatar, icon.
interface DropdownItemSkeletonProps {}

/*
 * Style.
 */

const StyledDropdownItemSkeletonDiv = styled.div`
  padding: 7px 12px;
`;

/*
 * Component.
 */

export const DropdownItemSkeleton: FC<DropdownItemSkeletonProps> = () => (
  <StyledDropdownItemSkeletonDiv>
    <Skeleton borderRadius="4px" />
  </StyledDropdownItemSkeletonDiv>
);

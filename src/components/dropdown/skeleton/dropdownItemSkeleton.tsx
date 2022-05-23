import React, {FC} from 'react';
import styled from 'styled-components';

import {Skeleton} from '../../skeleton/skeleton';

/*
 * Props.
 */

// TODO: Add support for multi-line (description).
interface DropdownItemSkeletonProps {
  hasAvatar?: boolean;
}

/*
 * Style.
 */

const StyledDropdownItemSkeletonDiv = styled.div`
  display: flex;
  flex-flow: row;
  gap: 10px;
  padding: 7px 12px;
`;

/*
 * Component.
 */

export const DropdownItemSkeleton: FC<DropdownItemSkeletonProps> = ({hasAvatar}) => (
  <StyledDropdownItemSkeletonDiv>
    {hasAvatar && <Skeleton borderRadius="100px" width={20} height={20} />}
    <Skeleton borderRadius="4px" />
  </StyledDropdownItemSkeletonDiv>
);

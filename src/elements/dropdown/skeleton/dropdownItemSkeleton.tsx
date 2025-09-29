import {FC} from 'react';
import styled, {css} from 'styled-components';

import {Skeleton} from '../../../components/skeleton/skeleton';
import {VisualSizesEnum} from '../../../helpers/fontHelpers';
import {makeSizeConstants} from '../../../helpers/styleHelpers';

/*
 * Constants.
 */

const avatarSizes = makeSizeConstants(16, 20, 30, 48);

/*
 * Props.
 */

interface DropdownItemSkeletonProps {
  /** Whether we should render the avatar. */
  hasAvatar?: boolean;
  /** The size of the avatar to render a skeleton for. Default is MEDIUM. */
  avatarSize?: VisualSizesEnum;
  /** Whether the this is a multi-line skeleton. */
  hasDescription?: boolean;
}

/*
 * Style.
 */

const StyledDropdownRightContentWrapperDiv = styled.div`
  display: grid;
  align-items: center;
`;

const StyledDropdownItemSkeletonDiv = styled.div`
  display: flex;
  flex-flow: row;
  gap: 10px;
  padding: 7px 12px;
`;

const StyledDropdownContentWrapperDiv = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column;
  gap: 4px;
`;

interface StyledTitleWrapperDivProps {
  $hasDescription?: boolean;
}

const StyledTitleWrapperDiv = styled.div<StyledTitleWrapperDivProps>`
  ${(p) => css`
    max-width: ${p.$hasDescription ? '60%' : 'unset'};
  `};
`;

/*
 * Component.
 */

export const DropdownItemSkeleton: FC<DropdownItemSkeletonProps> = ({
  hasAvatar,
  hasDescription,
  avatarSize = VisualSizesEnum.MEDIUM
}) => (
  <StyledDropdownItemSkeletonDiv>
    {hasAvatar && (
      <StyledDropdownRightContentWrapperDiv>
        <Skeleton
          borderRadius="100px"
          width={avatarSizes[avatarSize]}
          height={avatarSizes[avatarSize]}
          variant="dark"
        />
      </StyledDropdownRightContentWrapperDiv>
    )}
    <StyledDropdownContentWrapperDiv>
      <StyledTitleWrapperDiv $hasDescription={hasDescription}>
        <Skeleton borderRadius="4px" variant="dark" />
      </StyledTitleWrapperDiv>
      {hasDescription && <Skeleton borderRadius="4px" />}
    </StyledDropdownContentWrapperDiv>
  </StyledDropdownItemSkeletonDiv>
);

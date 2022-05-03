import React, {FC} from 'react';
import styled from 'styled-components';

import CheckmarkCircle from '../../assets/icons/checkmarkCircle.svg';
import CheckmarkSelected from '../../assets/icons/checkmarkSelected.svg';
import ChevronDown from '../../assets/icons/chevronDown.svg';
import ChevronLeft from '../../assets/icons/chevronLeft.svg';
import ChevronRight from '../../assets/icons/chevronRight.svg';
import ChevronUp from '../../assets/icons/chevronUp.svg';
import Close from '../../assets/icons/close.svg';
import ExternalLink from '../../assets/icons/externalLink.svg';
import Minus from '../../assets/icons/minus.svg';
import MoreHorizontal from '../../assets/icons/moreHorizontal.svg';
import MoreVertical from '../../assets/icons/moreVertical.svg';
import New from '../../assets/icons/new.svg';
import PlusCircle from '../../assets/icons/plusCircle.svg';
import Search from '../../assets/icons/search.svg';
import {greys} from '../../helpers/colorHelpers';

/*
 * Constants.
 */

const defaultWidth = 16;
const defaultHeight = 16;
const defaultColor = greys.shade50;

const importedIcons = {
  CheckmarkCircle,
  CheckmarkSelected,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Close,
  ExternalLink,
  Minus,
  MoreHorizontal,
  MoreVertical,
  New,
  PlusCircle,
  Search
};
export type IconName = keyof typeof importedIcons;
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const icons = importedIcons as {[name in IconName]: (props: React.SVGAttributes<SVGElement>) => React.ReactElement};

/*
 * Props.
 */

interface IconProps {
  name: IconName;
  color?: string;
  width?: number;
  height?: number;
}

/*
 * Style.
 */

interface StyledIconDivProps {
  $width: number;
  $height: number;
}

const StyledIconDiv = styled.div<StyledIconDivProps>`
  width: ${p => `${p.$width}px`};
  height: ${p => `${p.$height}px`};
`;

/*
 * Component.
 */

export const Icon: FC<IconProps> = props => {
  const {name, width = defaultWidth, height = defaultHeight, color = defaultColor} = props;

  // Pull the icon from the list of available icons.
  // The svg file is converted to a function that is called.
  const icon = icons[name];
  if (!icon)
    return null;

  return (
    <StyledIconDiv $width={width} $height={height}>
      {icon({
        width,
        height,
        color,
        preserveAspectRatio: "none"
      })}
    </StyledIconDiv>
  );
};

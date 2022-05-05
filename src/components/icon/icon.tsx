import React, {FC} from 'react';
import styled from 'styled-components';

import CheckmarkBox from '../../assets/icons/checkmarkBox.svg';
import CheckmarkCircle from '../../assets/icons/checkmarkCircle.svg';
import Checkmark from '../../assets/icons/checkmarkSelected.svg';
import ChevronDown from '../../assets/icons/chevronDown.svg';
import ChevronLeft from '../../assets/icons/chevronLeft.svg';
import ChevronRight from '../../assets/icons/chevronRight.svg';
import ChevronUp from '../../assets/icons/chevronUp.svg';
import Close from '../../assets/icons/close.svg';
import ExternalLink from '../../assets/icons/externalLink.svg';
import Minus from '../../assets/icons/minus.svg';
import EllipsisHorizontal from '../../assets/icons/moreHorizontal.svg';
import EllipsisVertical from '../../assets/icons/moreVertical.svg';
import Plus from '../../assets/icons/new.svg';
import PlusCircle from '../../assets/icons/plusCircle.svg';
import Search from '../../assets/icons/search.svg';
import {greys} from '../../helpers/colorHelpers';

/*
 * Constants.
 */

const defaultSize = 16;
const defaultColor = greys.shade50;

const importedIcons = {
  CheckmarkCircle,
  CheckmarkSelected: Checkmark,
  CheckmarkBox,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Close,
  ExternalLink,
  Minus,
  EllipsisHorizontal,
  EllipsisVertical,
  Plus,
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
  /** The icon to display. */
  name: IconName;
  /** The color of the icon. */
  color?: string;
  /** Controls the width and height of the icon. */
  size?: number;
  /** If set, no color for the icon will be set. This enables inheriting the parents color. */
  shouldDisableColor?: boolean;
}

/*
 * Style.
 */

interface StyledIconDivProps {
  $size: number;
}

const StyledIconDiv = styled.div<StyledIconDivProps>`
  width: ${p => `${p.$size}px`};
  height: ${p => `${p.$size}px`};
`;

/*
 * Component.
 */

export const Icon: FC<IconProps> = props => {
  const {name, size = defaultSize, color = defaultColor, shouldDisableColor} = props;

  // Pull the icon from the list of available icons.
  // The svg file is converted to a function that is called.
  const icon = icons[name];
  if (!icon)
    return null;

  return (
    <StyledIconDiv $size={size}>
      {icon({
        width: size,
        height: size,
        color: shouldDisableColor ? '' : color,
        preserveAspectRatio: "none"
      })}
    </StyledIconDiv>
  );
};

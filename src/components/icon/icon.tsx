import React, {FC} from 'react';
import styled from 'styled-components';

import Archive from '../../assets/icons/archive.svg';
import AttachmentArchive from '../../assets/icons/attachmentArchive.svg';
import AttachmentCalendar from '../../assets/icons/attachmentCalendar.svg';
import AttachmentCode from '../../assets/icons/attachmentCode.svg';
import AttachmentExcel from '../../assets/icons/attachmentExcel.svg';
import AttachmentGeneric from '../../assets/icons/attachmentGeneric.svg';
import AttachmentImage from '../../assets/icons/attachmentImage.svg';
import AttachmentPdf from '../../assets/icons/attachmentPdf.svg';
import AttachmentPowerpoint from '../../assets/icons/attachmentPowerpoint.svg';
import AttachmentVideo from '../../assets/icons/attachmentVideo.svg';
import AttachmentWord from '../../assets/icons/attachmentWord.svg';
import Calendar from '../../assets/icons/calendar.svg';
import CheckmarkBox from '../../assets/icons/checkmarkBox.svg';
import CheckmarkCircle from '../../assets/icons/checkmarkCircle.svg';
import Checkmark from '../../assets/icons/checkmarkSelected.svg';
import ChevronDown from '../../assets/icons/chevronDown.svg';
import ChevronLeft from '../../assets/icons/chevronLeft.svg';
import ChevronRight from '../../assets/icons/chevronRight.svg';
import ChevronUp from '../../assets/icons/chevronUp.svg';
import Close from '../../assets/icons/close.svg';
import Edit from '../../assets/icons/edit.svg';
import Export from '../../assets/icons/export.svg';
import ExternalLink from '../../assets/icons/externalLink.svg';
import Gear from '../../assets/icons/gear.svg';
import Import from '../../assets/icons/import.svg';
import Minus from '../../assets/icons/minus.svg';
import EllipsisHorizontal from '../../assets/icons/moreHorizontal.svg';
import EllipsisVertical from '../../assets/icons/moreVertical.svg';
import Plus from '../../assets/icons/new.svg';
import PlusCircle from '../../assets/icons/plusCircle.svg';
import Preferences from '../../assets/icons/preferences.svg';
import Search from '../../assets/icons/search.svg';
import Trash from '../../assets/icons/trash.svg';
import {greys} from '../../helpers/colorHelpers';

/*
 * Constants.
 */

const defaultSize = 16;
const defaultColor = greys.shade50;

const importedIcons = {
  Archive,
  AttachmentArchive,
  AttachmentCalendar,
  AttachmentCode,
  AttachmentExcel,
  AttachmentGeneric,
  AttachmentImage,
  AttachmentPdf,
  AttachmentPowerpoint,
  AttachmentVideo,
  AttachmentWord,
  Calendar,
  CheckmarkCircle,
  CheckmarkBox,
  Checkmark,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Close,
  Edit,
  EllipsisHorizontal,
  EllipsisVertical,
  Export,
  ExternalLink,
  Gear,
  Import,
  Minus,
  Plus,
  PlusCircle,
  Preferences,
  Search,
  Trash
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
        name,
        width: size,
        height: size,
        color: shouldDisableColor ? '' : color,
        preserveAspectRatio: "none"
      })}
    </StyledIconDiv>
  );
};

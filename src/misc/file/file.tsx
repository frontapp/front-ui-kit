import React, {FC} from 'react';
import styled from 'styled-components';

import {Icon, IconName} from '../../components/icon/icon';
import {greys} from '../../helpers/colorHelpers';
import {fonts, fontSizes, fontWeights} from '../../helpers/fontHelpers';

/*
 * Constants.
 */

export enum AttachmentTypesEnum {
  ARCHIVE = 'ARCHIVE',
  AUDIO = 'AUDIO',
  CALENDAR = 'CALENDAR',
  CODE = 'CODE',
  EXCEL = 'EXCEL',
  GENERIC = 'GENERIC',
  IMAGE = 'IMAGE',
  PDF = 'PDF',
  POWERPOINT = 'POWERPOINT',
  TEXT = 'TEXT',
  VIDEO = 'VIDEO',
  WORD = 'WORD'
}

type FileTypeIcons = {[T in AttachmentTypesEnum]: IconName};

export const fileTypeIcons: FileTypeIcons = {
  [AttachmentTypesEnum.ARCHIVE]: 'AttachmentArchive',
  [AttachmentTypesEnum.CALENDAR]: 'AttachmentCalendar',
  [AttachmentTypesEnum.CODE]: 'AttachmentCode',
  [AttachmentTypesEnum.EXCEL]: 'AttachmentExcel',
  [AttachmentTypesEnum.GENERIC]: 'AttachmentGeneric',
  [AttachmentTypesEnum.IMAGE]: 'AttachmentImage',
  [AttachmentTypesEnum.AUDIO]: 'AttachmentMusic',
  [AttachmentTypesEnum.PDF]: 'AttachmentPdf',
  [AttachmentTypesEnum.POWERPOINT]: 'AttachmentPowerpoint',
  [AttachmentTypesEnum.TEXT]: 'AttachmentGeneric',
  [AttachmentTypesEnum.VIDEO]: 'AttachmentVideo',
  [AttachmentTypesEnum.WORD]: 'AttachmentWord'
};

/*
 * Props.
 */

interface FileProps {
  /** The name of the file. */
  fileName: string;
  /** The type of file. Default will be GENERIC. */
  fileType?: AttachmentTypesEnum;
  /** The size of the file in Kbs */
  fileSize: number;
  /** Whether to render the error state of the file. */
  isErred?: boolean;
  /** Whether a clear button should be displayed when hovering over the file. */
  onClear?: () => void;
}

/*
 * Style.
 */

const StyledFileWrapperDiv = styled.div`
  width: inherit;
  position: relative;
  padding: 7px;
  border: 1px solid ${greys.shade40};
  border-radius: 8px;
  background: ${greys.white};

  display: flex;
  flex-direction: row;
  gap: 9px;
  font-family: ${fonts.system};
  font-weight: ${fontWeights.semibold};
`;

const StyledFileIconDiv = styled.div`
  pointer-events: none;
  top: 0px;
`;

const StyledFileDetailsDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledFileNameDiv = styled.div`
  font-size: ${fontSizes.medium};
  line-height: 17px;
  color: ${greys.shade90};
`;

const StyledFileSizeDiv = styled.div`
  font-size: ${fontSizes.tiny};
  line-height: 16px;
  color: ${greys.shade70};
`;

/*
 * Component.
 */

export const File: FC<FileProps> = props => {
  const {fileName, fileType = AttachmentTypesEnum.GENERIC, fileSize} = props;
  const iconName = fileTypeIcons[fileType];

  return (
    <StyledFileWrapperDiv>
      <StyledFileIconDiv>
        <Icon name={iconName} />
      </StyledFileIconDiv>
      <StyledFileDetailsDiv>
        <StyledFileNameDiv>
          {fileName}
        </StyledFileNameDiv>
        <StyledFileSizeDiv>
          {bytesToSize(fileSize * 1024)}
        </StyledFileSizeDiv>
      </StyledFileDetailsDiv>
    </StyledFileWrapperDiv>
  );
};

/*
 * Helpers
 */

function bytesToSize(bytes: number) {
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0)
    return '0B';
  const index = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / 1024**index) + sizes[index];
}

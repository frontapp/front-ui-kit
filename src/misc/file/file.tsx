import React, {FC} from 'react';
import styled, {css} from 'styled-components';

import {Button} from '../../components/button/button';
import {Icon, IconName} from '../../components/icon/icon';
import {greys, palette} from '../../helpers/colorHelpers';
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

interface StyledFileProps {
  $isErred: boolean;
}

const StyledFileWrapperDiv = styled.div<StyledFileProps>`
  width: inherit;
  position: relative;
  padding: 7px 9px 7px 7px;
  border: 1px solid ${greys.shade40};
  border-radius: 8px;

  display: flex;
  flex-direction: row;
  gap: 9px;
  font-family: ${fonts.system};
  font-weight: ${fontWeights.semibold};
  font-size: ${fontSizes.medium};
  line-height: 17px;

  ${p => addFileStyles(p)};
`;

const StyledFileIconDiv = styled.div`
  pointer-events: none;
  margin-top: 2px;
`;

const StyledFileDetailsDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledFileSizeDiv = styled.div`
  font-size: ${fontSizes.tiny};
  line-height: 16px;
  color: ${greys.shade70};
`;

const StyledFileClearDiv = styled.div`
  margin-left: auto;
  margin-top: 5px;

  button {
    background: unset;
    &:hover {
      background: unset;
      color: ${greys.white};
    }
    padding: 3px;
    color: ${greys.white};
  }
`;

const StyledFileClearIconDiv = styled.div`
  background: ${greys.black};
  &:hover {
    background: ${palette.blue.shade40};
  }
  border-radius: 50%;
`;

function addFileStyles(props: StyledFileProps) {
  if (props.$isErred)
    return css`
      background: ${palette.red.shade10};
      color: ${palette.red.shade50};
    `;
  return css`
    background: ${greys.white};
    color: ${greys.shade90};
    &:hover {
      background: ${greys.shade20};
    }
  `;
}

/*
 * Component.
 */

export const File: FC<FileProps> = props => {
  const {fileName, fileType = AttachmentTypesEnum.GENERIC, fileSize, isErred = false, onClear} = props;
  const iconName = fileTypeIcons[fileType];

  return (
    <StyledFileWrapperDiv $isErred={isErred}>
      <StyledFileIconDiv>
        <Icon name={iconName} />
      </StyledFileIconDiv>
      <StyledFileDetailsDiv>
        {fileName}
        <StyledFileSizeDiv>
          {bytesToSize(fileSize * 1024)}
        </StyledFileSizeDiv>
      </StyledFileDetailsDiv>
      {maybeRenderFileClearButton(onClear)}
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

function maybeRenderFileClearButton(onClear?: () => void) {
  if (!onClear)
    return null;
  return (
    <StyledFileClearDiv>
      <StyledFileClearIconDiv>
        <Button type="icon" onClick={onClear}><Icon name="Close" color={greys.white} /></Button>
      </StyledFileClearIconDiv>
    </StyledFileClearDiv>
  );
}

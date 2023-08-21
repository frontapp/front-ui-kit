import React, {FC} from 'react';
import styled from 'styled-components';

import {Icon, IconName} from '../../../elements/icon/icon';
import {greys, palette} from '../../../helpers/colorHelpers';
import {fonts, fontSizes, fontWeights} from '../../../helpers/fontHelpers';
import {buildHoverParentClassName, hoverSelector} from '../../../helpers/hoverHelpers';
import {Button} from '../../button/button';
import {Tooltip} from '../../tooltip/tooltip';
import {TooltipCoordinator} from '../../tooltip/tooltipCoordinator';

/*
 * Constants.
 */

const BASE_BYTES_SIZE = 1024;

export enum FileTypesEnum {
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

type FileTypeIcons = {[T in FileTypesEnum]: IconName};

const fileTypeIcons: FileTypeIcons = {
  [FileTypesEnum.ARCHIVE]: 'AttachmentArchive',
  [FileTypesEnum.CALENDAR]: 'AttachmentCalendar',
  [FileTypesEnum.CODE]: 'AttachmentCode',
  [FileTypesEnum.EXCEL]: 'AttachmentExcel',
  [FileTypesEnum.GENERIC]: 'AttachmentGeneric',
  [FileTypesEnum.IMAGE]: 'AttachmentImage',
  [FileTypesEnum.AUDIO]: 'AttachmentMusic',
  [FileTypesEnum.PDF]: 'AttachmentPdf',
  [FileTypesEnum.POWERPOINT]: 'AttachmentPowerpoint',
  [FileTypesEnum.TEXT]: 'AttachmentGeneric',
  [FileTypesEnum.VIDEO]: 'AttachmentVideo',
  [FileTypesEnum.WORD]: 'AttachmentWord'
};

/*
 * Props.
 */

export interface FileProps {
  /** The name of the file. */
  fileName: string;
  /** The type of file. Default will be GENERIC. */
  fileType?: FileTypesEnum;
  /** The size of the file in Kbs */
  fileSize: number;
  /** Whether to render the error state of the file. */
  isErred?: boolean;
  /** The reason why the file is in an isErred state. */
  errorMessage?: string;
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
  color: ${greys.shade90};

  background: ${(p) => (p.$isErred ? palette.red.shade10 : greys.white)};
  &:hover {
    background: ${(p) => (p.$isErred ? palette.red.shade20 : greys.shade20)};
  }
`;

const StyledFileIconDiv = styled.div`
  pointer-events: none;
  margin-top: 1px;
`;

const StyledFileDetailsDiv = styled.div`
  overflow: hidden;
  cursor: default;
`;

const StyledNoFileNameSpan = styled.span`
  font-style: italic;
`;

const StyledErrorLabelDiv = styled.div`
  color: ${palette.red.shade50};
  float: left;
  padding-right: 3px;
`;

const StyledFileSizeDiv = styled.div`
  font-size: ${fontSizes.tiny};
  line-height: 16px;
  color: ${greys.shade70};
`;

const StyledFileClearIconDiv = styled.div`
  margin-left: auto;
  margin-top: 5px;
  display: none;

  ${hoverSelector} {
    display: block;
  }
`;

const StyledButton = styled(Button)<StyledFileProps>`
  background: ${(p) => (p.$isErred ? palette.red.shade40 : greys.black)};
  color: ${greys.white};
  &:hover {
    background: ${(p) => (p.$isErred ? palette.red.shade50 : palette.blue.shade40)};
    color: ${greys.white};
  }
  padding: 3px;
  border-radius: 50%;
`;

/*
 * Component.
 */

export const File: FC<FileProps> = ({
  fileName,
  fileType = FileTypesEnum.GENERIC,
  fileSize,
  isErred = false,
  errorMessage: passedInErrorMessage = 'Failed to upload',
  onClear
}) => {
  const iconName = fileTypeIcons[fileType];
  const errorMessage = `[${passedInErrorMessage}]`;
  const fileLabel = fileName || 'Untitled file';
  const fileTooltipLabel = isErred ? `${errorMessage} ${fileLabel}` : fileLabel;

  return (
    <StyledFileWrapperDiv className={buildHoverParentClassName()} $isErred={isErred}>
      <StyledFileIconDiv>
        <Icon name={iconName} />
      </StyledFileIconDiv>
      <StyledFileDetailsDiv>
        <TooltipCoordinator
          condition={{
            type: 'overflow'
          }}
          renderTooltip={() => (
            <Tooltip placement="top" maxWidth={240}>
              {fileTooltipLabel}
            </Tooltip>
          )}>
          {isErred && <StyledErrorLabelDiv>{errorMessage}</StyledErrorLabelDiv>}
          {fileName || <StyledNoFileNameSpan>Untitled file</StyledNoFileNameSpan>}
        </TooltipCoordinator>
        <StyledFileSizeDiv>{bytesToSize(fileSize * BASE_BYTES_SIZE)}</StyledFileSizeDiv>
      </StyledFileDetailsDiv>
      {maybeRenderFileClearButton(isErred, onClear)}
    </StyledFileWrapperDiv>
  );
};

/*
 * Helpers
 */

function bytesToSize(bytes: number) {
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0B';
  const index = Math.floor(Math.log(bytes) / Math.log(BASE_BYTES_SIZE));
  if (index >= sizes.length) return 'Extremely large file';
  return Math.round(bytes / BASE_BYTES_SIZE ** index) + sizes[index];
}

function maybeRenderFileClearButton(isErred: boolean, onClear?: () => void) {
  if (!onClear) return null;
  return (
    <StyledFileClearIconDiv>
      <StyledButton $isErred={isErred} type="icon" onClick={onClear}>
        <Icon name="Close" color={greys.white} />
      </StyledButton>
    </StyledFileClearIconDiv>
  );
}

import React, {FC, useState} from 'react';
import styled from 'styled-components';

import {Button} from '../../components/button/button';
import {Icon, IconName} from '../../components/icon/icon';
import {Tooltip} from '../../components/tooltip/tooltip';
import {TooltipCoordinator} from '../../components/tooltip/tooltipCoordinator';
import {greys, palette} from '../../helpers/colorHelpers';
import {fonts, fontSizes, fontWeights} from '../../helpers/fontHelpers';
import {useTimeout} from '../../helpers/hookHelpers';

/*
 * Constants.
 */

const BYTE_SIZE = 1024;

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

const fileTypeIcons: FileTypeIcons = {
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

  background: ${p => (p.$isErred ? palette.red.shade10 : greys.white)};
  &:hover {
    background: ${p => (p.$isErred ? palette.red.shade20 : greys.shade20)};
  }
`;

const StyledFileIconDiv = styled.div`
  pointer-events: none;
  margin-top: 2px;
`;

const StyledFileDetailsDiv = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  pointer-events: none;
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

const StyledFileClearIconDiv = styled.div<StyledFileProps>`
  margin-left: auto;
  margin-top: 5px;

  button {
    background: ${p => (p.$isErred ? palette.red.shade40 : greys.black)};
    color: ${greys.white};
    &:hover {
      background: ${p => (p.$isErred ? palette.red.shade50 : palette.blue.shade40)};
      color: ${greys.white};
    }
    padding: 3px;
    border-radius: 50%;
  }
`;

/*
 * Component.
 */

export const File: FC<FileProps> = props => {
  const {fileName, fileType = AttachmentTypesEnum.GENERIC, fileSize, isErred = false, onClear} = props;
  const iconName = fileTypeIcons[fileType];
  const errorMessage = "[Failed to upload]";
  const fileLabel = isErred ? `${errorMessage} ${fileName}` : fileName;
  const [shouldRenderClearButton, setShouldRenderClearButton] = useState(false);

  const [setSafeTimeout, clearSafeTimeout] = useTimeout();

  const onMouseEnter = () => {
    setSafeTimeout(() => {
      setShouldRenderClearButton(true);
    }, 1);
  };

  const onMouseLeave = () => {
    clearSafeTimeout();
    setShouldRenderClearButton(false);
  };

  return (
    <StyledFileWrapperDiv $isErred={isErred} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
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
              {fileLabel}
            </Tooltip>
          )}
        >
          {isErred && <StyledErrorLabelDiv>{errorMessage}</StyledErrorLabelDiv>}
          {fileName}
        </TooltipCoordinator>
        <StyledFileSizeDiv>
          {bytesToSize(fileSize * BYTE_SIZE)}
        </StyledFileSizeDiv>
      </StyledFileDetailsDiv>
      {maybeRenderFileClearButton(shouldRenderClearButton, isErred, onClear)}
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
  const index = Math.floor(Math.log(bytes) / Math.log(BYTE_SIZE));
  return Math.round(bytes / BYTE_SIZE**index) + sizes[index];
}

function maybeRenderFileClearButton(shouldRenderClearButton: boolean, isErred: boolean, onClear?: () => void) {
  if (!shouldRenderClearButton || !onClear)
    return null;
  return (
    <StyledFileClearIconDiv $isErred={isErred}>
      <Button type="icon" onClick={onClear}>
        <Icon name="Close" color={greys.white} />
      </Button>
    </StyledFileClearIconDiv>
  );
}

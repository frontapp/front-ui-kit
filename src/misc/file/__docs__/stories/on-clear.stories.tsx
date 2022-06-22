import {ComponentStory} from '@storybook/react';
import React, {useState} from 'react';
import styled from 'styled-components';

import {Button} from '../../../../components/button/button';
import {greys} from '../../../../helpers/colorHelpers';
import {File, FileTypesEnum} from '../../file';

interface FileObj {
  name: string;
  size: number;
  type: FileTypesEnum;
}

const fileObj: FileObj = {
  name: "Test File.csv",
  size: 23410,
  type: FileTypesEnum.EXCEL
};

const StyledWrapperDiv = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
`;

const StyledFileWrapperDiv = styled.div`
  width: 300px;
`;

const StyledRestoreWrapperDiv = styled.div`
  border: 1px dashed ${greys.shade40};
  background: ${greys.shade20};
  border-radius: 8px;
  text-align: center;
  padding: 7.5px;
`;

const Template: ComponentStory<typeof File> = () => {
  const [file, setFile] = useState<FileObj | undefined>(fileObj);
  return (
    <StyledWrapperDiv>
      <StyledFileWrapperDiv>
        {file && <File
          fileName={file.name}
          fileSize={file.size}
          fileType={file.type}
          onClear={() => setFile(undefined)}
        />}
        {!file && (
          <StyledRestoreWrapperDiv>
            <Button type="tertiary" onClick={() => setFile(fileObj)}>Undo clear</Button>
          </StyledRestoreWrapperDiv>
        )}
      </StyledFileWrapperDiv>
    </StyledWrapperDiv>
  );
};
export const OnClear = Template.bind({});

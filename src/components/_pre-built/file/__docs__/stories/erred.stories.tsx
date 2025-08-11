import { StoryObj } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import { File } from '../../file';

const StyledWrapperDiv = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
`;

const StyledFileWrapperDiv = styled.div`
  width: 300px;
`;

export const Erred: StoryObj<typeof File> = {
  render: () => (
    <StyledWrapperDiv>
      <StyledFileWrapperDiv>
        <File fileName="Test File.txt" fileSize={12330} errorMessage="Invalid File" isErred />
      </StyledFileWrapperDiv>
    </StyledWrapperDiv>
  ),
};

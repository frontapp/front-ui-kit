import {ComponentMeta, ComponentStory} from '@storybook/react';
import React, {FC, useState} from 'react';
import styled from 'styled-components';

import {greys} from '../../../helpers/colorHelpers';
import {fontSizes} from '../../../helpers/fontHelpers';
import {DefaultStyleProvider} from '../../../utils/defaultStyleProvider';
import {AttachmentTypesEnum, File, FileProps} from '../file';

/*
 * Style.
 */

const StyledShowcaseDiv = styled.div`
  border-radius: 8px;
  padding: 10px;
  width: 300px;
`;

const StyledDescriptionDiv = styled.div`
  font-size: ${fontSizes.medium};
  color: ${greys.black};
  text-align: center;
  padding: 10px 10px;
`;

/*
 * Component.
 */

const ShowcaseFileComponent: FC<FileProps> = props => {
  const {fileName = 'fileName.csv', fileSize = 30, fileType = AttachmentTypesEnum.GENERIC, isErred} = props;
  const [isVisible, setIsVisible] = useState(true);
  const [description, setDescription] = useState("");

  const onClear = () => {
    setIsVisible(false);
    setDescription("Please refresh to view the file.");
  };

  return (
    <DefaultStyleProvider>
      <StyledShowcaseDiv>
        {description && <StyledDescriptionDiv>{description}</StyledDescriptionDiv>}
        {isVisible && <File fileName={fileName} fileSize={fileSize} fileType={fileType} isErred={isErred} onClear={onClear} />}
      </StyledShowcaseDiv>
    </DefaultStyleProvider>
  );
};

export default {
  title: 'Misc/File',
  component: File
} as ComponentMeta<typeof File>;

const Template: ComponentStory<typeof File> = args => <ShowcaseFileComponent {...args} />;
export const BasicFile = Template.bind({});

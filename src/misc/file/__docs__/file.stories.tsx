import {ComponentMeta, ComponentStory} from '@storybook/react';
import React, {FC, useEffect, useState} from 'react';
import styled from 'styled-components';

import {greys} from '../../../helpers/colorHelpers';
import {fontSizes} from '../../../helpers/fontHelpers';
import {DefaultStyleProvider} from '../../../utils/defaultStyleProvider';
import {AttachmentTypesEnum, File} from '../file';

/*
 * Props.
 */

interface ShowcaseFileProps {
  fileName: string;
  fileType?: AttachmentTypesEnum;
  fileSize: number;
}

/*
 * Style.
 */

const StyledShowcaseDiv = styled.div`
  background: ${greys.shade50};
  border-radius: 8px;
  padding: 16px;
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

const ShowcaseFileComponent: FC<ShowcaseFileProps> = props => {
  const [isErred, setIsErred] = useState(false);
  const {fileName = 'fileName.csv', fileSize = 30, fileType = AttachmentTypesEnum.GENERIC} = props;
  const [isVisible, setIsVisible] = useState(true);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!fileName || fileName.startsWith("Error"))
      setIsErred(true);
    else
      setIsErred(false);
  }, [fileName]);

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
  component: ShowcaseFileComponent,
  argTypes: {
    fileName: {control: 'text'},
    fileSize: {control: 'number'},
    fileType: {control: 'radio', options: AttachmentTypesEnum}
  }
} as ComponentMeta<typeof ShowcaseFileComponent>;

const Template: ComponentStory<typeof ShowcaseFileComponent> = (props: ShowcaseFileProps) => <ShowcaseFileComponent
  fileName={props.fileName}
  fileType={props.fileType}
  fileSize={props.fileSize}
/>;
export const BasicFile = Template.bind({});

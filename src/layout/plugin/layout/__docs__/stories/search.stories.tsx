import {StoryObj} from '@storybook/react';
import React, {useState} from 'react';
import styled from 'styled-components';

import {Button} from '../../../../../components/button/button';
import {greys} from '../../../../../helpers/colorHelpers';
import {PluginFooter} from '../../pluginFooter';
import {PluginHeader} from '../../pluginHeader';
import {PluginLayout} from '../../pluginLayout';

const StyledCenteredDiv = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
`;

const StyledLayoutDiv = styled.div`
  width: 400px;
  height: 600px;
  background: ${greys.shade20};
`;

const StyledContentDiv = styled.div`
  padding: 16px;
  white-space: pre-wrap;
`;

const Template = () => {
  const [value, setValue] = useState('');
  return (
    <StyledLayoutDiv>
      <PluginLayout>
        <PluginHeader
          onBack={() => alert('onBack fired!')}
          onSearchChange={(event) => setValue(event.target.value)}
        />
        <StyledContentDiv>
          <div>Search value: {value}</div>
          <br />
          <div>Body</div>
        </StyledContentDiv>
        <PluginFooter>
          <Button>Cancel</Button>
          <Button type="primary">Submit</Button>
        </PluginFooter>
      </PluginLayout>
    </StyledLayoutDiv>
  );
};

export const Search: StoryObj<typeof PluginLayout> = {
  render: () => <Template />
};

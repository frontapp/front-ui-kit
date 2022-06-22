import {ComponentStory} from '@storybook/react';
import React, {useState} from 'react';
import styled from 'styled-components';

import {Checkbox} from '../../checkbox';

const StyledSpacerDiv = styled.div`
  display: flex;
  flex-flow: column;
  gap: 4px;
`;

const Template: ComponentStory<typeof Checkbox> = () => {
  const [isChecked, setIsChecked] = useState({
    1: false,
    2: true,
    3: false
  });

  return (
    <StyledSpacerDiv>
      <Checkbox
        isChecked={isChecked['1'] && isChecked['2'] && isChecked['3']}
        isIndeterminate={isChecked['1'] || isChecked['2'] || isChecked['3']}
        onChange={isAllChecked => {
          if (isAllChecked)
            setIsChecked({1: true, 2: true, 3: true});
          else
            setIsChecked({1: false, 2: false, 3: false});
        }}
      >
        All options
      </Checkbox>
      <Checkbox isChecked={isChecked['1']} onChange={isOptionChecked => setIsChecked(checked => ({...checked, 1: isOptionChecked}))}>
        Option 1
      </Checkbox>
      <Checkbox isChecked={isChecked['2']} onChange={isOptionChecked => setIsChecked(checked => ({...checked, 2: isOptionChecked}))}>
        Option 2
      </Checkbox>
      <Checkbox isChecked={isChecked['3']} onChange={isOptionChecked => setIsChecked(checked => ({...checked, 3: isOptionChecked}))}>
        Option 3
      </Checkbox>
    </StyledSpacerDiv>
  );
};

export const Indeterminate = Template.bind({});

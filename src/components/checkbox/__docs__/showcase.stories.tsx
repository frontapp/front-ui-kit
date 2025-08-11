import { Meta, StoryObj } from '@storybook/react';
import React, { FC, useState } from 'react';
import styled from 'styled-components';

import { Checkbox } from '../checkbox';

/*
 * Props.
 */

interface ShowcaseCheckboxProps {
  /** Whether the checkbox is disabled. */
  isDisabled?: boolean;
  /** Whether the checkbox is in an indeterminate state. */
  isIndeterminate?: boolean;
}

/*
 * Style.
 */

const StyledShowcaseDiv = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
`;

/*
 * Component.
 */

const ShowcaseComponent: FC = (props) => (
  <div>
    <ShowcaseCheckboxComponent isDisabled />
    <ShowcaseCheckboxComponent isIndeterminate />
    <ShowcaseCheckboxComponent isIndeterminate isDisabled />
    <ShowcaseCheckboxComponent />
  </div>
);

const ShowcaseCheckboxComponent: FC<ShowcaseCheckboxProps> = (props) => {
  const { isDisabled } = props;
  const [isChecked, setIsChecked] = useState(false);
  const [isIndeterminate, setIsIndeterminate] = useState(props.isIndeterminate);
  const onToggleCheckbox = (checked) => {
    setIsChecked(!checked);
    setIsIndeterminate(false);
  };

  const getCheckBoxLabel = () => {
    let label = '';
    if (isDisabled) label = 'Disabled ';
    if (isIndeterminate) label += 'Indeterminate ';
    if (isChecked) label += 'Checked';
    if (label) return label;
    return 'Unchecked';
  };

  return (
    <StyledShowcaseDiv>
      <Checkbox
        isDisabled={isDisabled}
        isIndeterminate={isIndeterminate}
        isChecked={isChecked}
        onChange={() => onToggleCheckbox(isChecked)}
      >
        {getCheckBoxLabel()}
      </Checkbox>
    </StyledShowcaseDiv>
  );
};

/*
 * Storybook.
 */

export default {
  title: 'Components/Checkbox',
  component: ShowcaseComponent,
} as Meta<typeof ShowcaseComponent>;

export const Showcase: StoryObj<typeof ShowcaseComponent> = {
  render: () => <ShowcaseComponent />,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

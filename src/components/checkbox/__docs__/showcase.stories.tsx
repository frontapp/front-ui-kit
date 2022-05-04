import {ComponentMeta, ComponentStory} from '@storybook/react';
import React, {FC, useState} from 'react';
import {Checkbox} from '../checkbox';

interface ShowcaseCheckboxProps {
  /** Whether the checkbox is disabled. */
  isDisabled?: boolean;
  /** Whether the checkbox is in an indeterminate state. */
  isIndeterminate?: boolean;
}

/*
 * Component.
 */

const ShowcaseComponent: FC = props =>  <div>
  <ShowcaseCheckboxComponent isDisabled/>
  <ShowcaseCheckboxComponent isIndeterminate/>
  <ShowcaseCheckboxComponent/>
</div>;


const ShowcaseCheckboxComponent: FC<ShowcaseCheckboxProps> = props => {
  const {isDisabled, isIndeterminate} = props;
  const [isChecked, setIsChecked] = useState(false);
  const onToggleCheckbox = (isChecked: boolean) => {
    setIsChecked(!isChecked);
  };

  return (
    <Checkbox isDisabled={isDisabled} isIndeterminate={isIndeterminate} isChecked={isChecked} onChange={() => onToggleCheckbox(isChecked)}>
        {isDisabled ? "Disabled" : (isIndeterminate ?  "isIndeterminate" : (isChecked ? "Checked" : "Unchecked"))}
    </Checkbox>
  );
}

/*
 * Storybook.
 */

export default {
  title: 'Front UI Kit/Checkbox',
  component: ShowcaseComponent
} as ComponentMeta<typeof ShowcaseComponent>;
  
const ShowcaseTemplate: ComponentStory<typeof ShowcaseComponent> = () => <ShowcaseComponent />;
export const Showcase = ShowcaseTemplate.bind({});
Showcase.parameters = {
  controls: {hideNoControlsWarning: true}
};



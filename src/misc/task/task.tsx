import React, {FC, ReactNode} from 'react';
import styled, {css} from 'styled-components';

import {Button} from '../../components/button/button';
import { Dropdown } from '../../components/dropdown/dropdown';
import { DropdownCoordinator } from '../../components/dropdown/dropdownCoordinator';
import {Icon, IconName} from '../../components/icon/icon';
import {alphas, greys, palette} from '../../helpers/colorHelpers';
import {fonts, fontSizes, fontWeights} from '../../helpers/fontHelpers';

/*
 * Constants.
 */

/*
 * Props.
 */

interface TaskProps {
  /** How the task is rendered. */
  type?: 'icon' | 'checkbox';
  /** The content of the dropdown. If there is not content we will not render the triple dot dropdown button. */
  children?: ReactNode;
  /** The label for the task. */
  label: string;
  /** Whether to render the loading state. */
  isLoading?: boolean;
  /** The icon to render on the left hand side */
  icon?: IconName;
  /** Whether the checkbox is checked. */
  isChecked?: boolean;
  /** Handler when the checkbox is clicked. */
  onChange?: (isChecked: boolean) => void
}

/*
 * Style.
 */

interface StyledTaskProps {
  $isLoading?: boolean;
  $isChecked?: boolean;
}

const StyledTaskWrapperDiv = styled.div<StyledTaskProps>`
  padding: 4px 6px;
  border: 1px solid ${alphas.black30};
  border-radius: 8px;
  background: ${greys.white};

  display: flex;
  flex-direction: row;
  gap: 2px;
  font-family: ${fonts.system};
  font-weight: ${fontWeights.medium};
  font-size: ${fontSizes.medium};
  line-height: 15px;

  &:hover {
    background: ${greys.shade10};
  }
`;

const StyledTaskIconCheckboxDiv = styled.div`
`;

const StyledTaskIconDiv = styled.div`
  padding: 7px;
`;

const StyledTaskCheckboxDiv = styled.div<StyledTaskProps>`
  button {
    ${addTaskCheckboxStyles}
  }
`;

const StyledTaskLabelDiv = styled.div`
  color: ${greys.shade80};
  display: flex;
  justify-content: center;
  align-items: center
`;

function addTaskCheckboxStyles(props: StyledTaskProps) {
  if (props.$isChecked)
    return css`
      color: ${palette.green.shade40};
      &:hover {
        color: ${palette.green.shade40};
      }
    `;
  return css``;
}

/*
 * Component.
 */

export const Task: FC<TaskProps> = props => {
  const {type, children, label, isLoading = false, icon, isChecked = false, onChange} = props;

  return (
    <StyledTaskWrapperDiv $isLoading={isLoading}>
      <StyledTaskIconCheckboxDiv>
        {maybeRenderTaskIconOrCheckbox(type, icon, isChecked, onChange)}
      </StyledTaskIconCheckboxDiv>
      <StyledTaskLabelDiv>
        {label}
      </StyledTaskLabelDiv>
      {maybeRenderDropdown(children)}
    </StyledTaskWrapperDiv>
  );
};

/*
 * Helpers
 */

function maybeRenderTaskIconOrCheckbox(
  type?: 'icon' | 'checkbox',
  iconName?: IconName,
  isChecked?: boolean,
  onChange?: (isChecked: boolean) => void) {
  if (!type)
    return null;
  if (type === 'icon' && iconName)
    return (
      <StyledTaskIconDiv>
        <Icon name={iconName} />
      </StyledTaskIconDiv>
    );

  const checkboxIcon = isChecked ? "CheckmarkCircle" : "CheckmarkCircleEmpty";
  const onCheckboxChange = () => {
    if (onChange)
      onChange(!isChecked);
  };
  return (
    <StyledTaskCheckboxDiv $isChecked={isChecked}>
      <Button type="icon" onClick={onCheckboxChange}><Icon name={checkboxIcon} /></Button>
    </StyledTaskCheckboxDiv>
  );
}

function maybeRenderDropdown(children?: ReactNode) {
  if (!children)
    return null;
  return (
    <DropdownCoordinator
      placement="bottom-start"
      renderButton={isDropdownOpen => <Button type="icon" isActive={isDropdownOpen}><Icon name="EllipsisVertical" /></Button>}
      renderDropdown={onCloseDropdown => (
        <Dropdown>
          {children}
        </Dropdown>
      )}/>
  );

}


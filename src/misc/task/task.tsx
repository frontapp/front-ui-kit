import React, {FC, ReactNode} from 'react';
import styled from 'styled-components';

import {Button} from '../../components/button/button';
import {Dropdown} from '../../components/dropdown/dropdown';
import {DropdownCoordinator} from '../../components/dropdown/dropdownCoordinator';
import {Icon, IconName} from '../../components/icon/icon';
import {Skeleton} from '../../components/skeleton/skeleton';
import {Tooltip} from '../../components/tooltip/tooltip';
import {TooltipCoordinator} from '../../components/tooltip/tooltipCoordinator';
import {alphas, greys, palette} from '../../helpers/colorHelpers';
import {fonts, fontSizes, fontWeights} from '../../helpers/fontHelpers';

/*
 * Constants.
 */

const dropdownWidth = 150; // px.

/*
 * Props.
 */

interface TaskProps {
  /** Whether to render an icon or a checkbox on the left side of the task. */
  type?: 'icon' | 'checkbox';
  /** The content of the dropdown. If there is no content we will not render the triple dot dropdown button. */
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

const StyledLoadingWrapperDiv = styled.div`
  width: 100%;
  border-radius: 8px;
`;

const StyledTaskWrapperDiv = styled.div`
  padding: 4px 6px;
  border: 1px solid ${alphas.black30};
  border-radius: 8px;
  background: ${greys.white};

  display: flex;
  flex-direction: row;
  font-family: ${fonts.system};
  font-weight: ${fontWeights.medium};
  font-size: ${fontSizes.medium};
  line-height: 15px;

  &:hover {
    background: ${greys.shade10};
  }
`;

const StyledTaskIconDiv = styled.div`
  padding: 7px;
`;

const StyledTaskLabelDiv = styled.div`
  color: ${greys.shade80};
  padding: 7px 4px;
  overflow: hidden;
`;

const StyledTaskChildrenDiv = styled.div`
  margin-left: auto;
`;

/*
 * Component.
 */

export const Task: FC<TaskProps> = props => {
  const {type, children, label, isLoading = false, icon, isChecked = false, onChange} = props;
  if (isLoading)
    return (
      <StyledLoadingWrapperDiv>
        <Skeleton height={40} variant="dark" />
      </StyledLoadingWrapperDiv>
    );

  return (
    <StyledTaskWrapperDiv>
      {maybeRenderTaskIconOrCheckbox(type, icon, isChecked, onChange)}
      <StyledTaskLabelDiv>
        <TooltipCoordinator
          condition={{
            type: 'overflow'
          }}
          renderTooltip={() => (
            <Tooltip placement="top" maxWidth={240}>
              {label}
            </Tooltip>
          )}
        >
          {label}
        </TooltipCoordinator>
      </StyledTaskLabelDiv>
      <StyledTaskChildrenDiv>
        {maybeRenderDropdown(children)}
      </StyledTaskChildrenDiv>
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
  onChange?: (isChecked: boolean) => void
) {
  if (!type)
    return null;
  if (type === 'icon' && iconName)
    return (
      <StyledTaskIconDiv>
        <Icon name={iconName} />
      </StyledTaskIconDiv>
    );

  const checkboxIcon = isChecked ? "CheckmarkCircle" : "CheckmarkCircleEmpty";
  const iconColor = isChecked ? palette.green.shade40 : greys.shade50;

  const onCheckboxChange = (type === 'checkbox' && onChange) ? (() => {
    if (onChange)
      onChange(!isChecked);
  }) : undefined;

  return (
    <Button type="icon" onClick={onCheckboxChange} iconColor={iconColor}>
      <Icon name={checkboxIcon} />
    </Button>
  );
}

function maybeRenderDropdown(children?: ReactNode) {
  if (!children)
    return null;
  return (
    <DropdownCoordinator
      placement="bottom-start"
      renderButton={isDropdownOpen => (
        <Button type="icon" isActive={isDropdownOpen}>
          <Icon name="EllipsisVertical" />
        </Button>
      )}
      renderDropdown={() => (
        <Dropdown shouldUseItemsHeight maxWidth={dropdownWidth}>
          {children}
        </Dropdown>
      )}
    />
  );
}


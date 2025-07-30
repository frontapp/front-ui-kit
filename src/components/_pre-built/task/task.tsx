import React, { FC, MouseEvent, MouseEventHandler, ReactNode } from 'react';
import styled from 'styled-components';

import { Dropdown } from '../../../elements/dropdown/dropdown';
import { DropdownCoordinator } from '../../../elements/dropdown/dropdownCoordinator';
import { Icon, IconName } from '../../../elements/icon/icon';
import { alphas, greys, palette } from '../../../helpers/colorHelpers';
import { fonts, fontSizes, fontWeights } from '../../../helpers/fontHelpers';
import { Button } from '../../button/button';
import { Skeleton } from '../../skeleton/skeleton';
import { Tooltip } from '../../tooltip/tooltip';
import { TooltipCoordinator } from '../../tooltip/tooltipCoordinator';

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
  /** Specify a different layer id to tie the select to. */
  layerRootId?: string;
  /** Handler when the checkbox is clicked. */
  onChange?: (isChecked: boolean) => void;
  /** Handler when the task it clicked. */
  onClick?: MouseEventHandler;
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
  user-select: none;
`;

const StyledTaskChildrenDiv = styled.div`
  margin-left: auto;
`;

/*
 * Component.
 */

export const Task: FC<TaskProps> = ({
  type,
  children,
  label,
  isLoading = false,
  icon,
  isChecked = false,
  layerRootId,
  onChange,
  onClick
}) => {
  if (isLoading)
    return (
      <StyledLoadingWrapperDiv>
        <Skeleton height={40} variant="dark" />
      </StyledLoadingWrapperDiv>
    );

  const onClickWrapper = (event: MouseEvent) => {
    if (event.defaultPrevented || !onClick) return;
    onClick(event);
  };

  return (
    <StyledTaskWrapperDiv onClick={onClickWrapper}>
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
          )}>
          {label}
        </TooltipCoordinator>
      </StyledTaskLabelDiv>
      <StyledTaskChildrenDiv>{maybeRenderDropdown(children, layerRootId)}</StyledTaskChildrenDiv>
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
  if (!type) return null;
  if (type === 'icon' && iconName)
    return (
      <StyledTaskIconDiv>
        <Icon name={iconName} />
      </StyledTaskIconDiv>
    );
  if (!onChange) return null;

  const checkboxIcon = isChecked ? 'CheckmarkCircle' : 'CheckmarkCircleEmpty';
  const iconColor = isChecked ? palette.green.shade40 : greys.shade50;

  const onCheckboxChange = (event: MouseEvent) => {
    event.preventDefault();
    onChange(!isChecked);
  };

  return (
    <Button type="icon" onClick={onCheckboxChange} iconColor={iconColor}>
      <Icon name={checkboxIcon} />
    </Button>
  );
}

function maybeRenderDropdown(children?: ReactNode, layerRootId?: string) {
  if (!children) return null;
  return (
    <DropdownCoordinator
      layerRootId={layerRootId}
      placement="bottom-end"
      renderButton={(isDropdownOpen) => (
        <Button type="icon" isActive={isDropdownOpen}>
          <Icon name="EllipsisVertical" />
        </Button>
      )}
      renderDropdown={() => (
        <Dropdown shouldUseItemsHeight maxWidth={dropdownWidth} minWidth={dropdownWidth}>
          {children}
        </Dropdown>
      )}
    />
  );
}

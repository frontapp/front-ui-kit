import React, { FC, useState } from 'react';
import styled from 'styled-components';

import { Icon } from '../../elements/icon/icon';
import { greys } from '../../helpers/colorHelpers';
import { fonts, fontSizes, fontWeights } from '../../helpers/fontHelpers';

/*
 * Props
 */
interface ExpandableSectionProps {
    /** Contents of the section to be rendered. */
    children: React.ReactNode;
    /** The title to render for the expandable section. */
    title: React.ReactNode;
    /** Controls whether the section is expanded or not. */
    isOpen?: boolean;
    /** Called when the section is opened/closed. */
    onToggle?: (isOpen: boolean) => void;
    /** Optional actions to display on the right side of the header. */
    actions?: React.ReactNode;
    /** Whether to show the text before the icon (default: false) */
    showTextBeforeIcon?: boolean;
    /** Custom icon name to use instead of the default CaretExpand */
    iconName?: 'CaretExpand' | 'ChevronDown';
    /** Border radius for the expandable section (default: 8px) */
    borderRadius?: string;
    /** Background color for the header on hover (default: greys.shade10) */
    hoverBackgroundColor?: string;
    /** Whether to show the border around the expandable section (default: true) */
    showBorder?: boolean;
    /** Whether to show the border between header and content when expanded (default: true) */
    showContentBorder?: boolean;
}

/*
 * Styles
 */

const StyledExpandableSectionDiv = styled.div<{ borderRadius?: string; showBorder?: boolean }>`
  display: flex;
  flex-direction: column;
  border: ${({ showBorder = true }) => (showBorder ? `1px solid ${greys.shade30}` : 'none')};
  border-radius: ${({ borderRadius }) => borderRadius || '8px'};
  background: ${greys.white};
  overflow: hidden;
`;

const StyledHeaderDiv = styled.div<{ hoverBackgroundColor?: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  cursor: pointer;
  background: ${greys.white};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ hoverBackgroundColor }) => hoverBackgroundColor || greys.shade10};
  }
`;

const StyledTitleContainerDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
`;

const StyledTitleDiv = styled.div`
  font-family: ${fonts.system};
  font-size: ${fontSizes.large};
  font-weight: ${fontWeights.medium};
  line-height: 24px;
  color: ${greys.shade80};
`;

const StyledCaretIconDiv = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  transition: transform 0.2s ease;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

const StyledActionsDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 16px;
`;

const StyledContentDiv = styled.div<{ isOpen: boolean; showContentBorder?: boolean }>`
  border-top: ${({ showContentBorder = true }) => (showContentBorder ? `1px solid ${greys.shade20}` : 'none')};
  overflow: hidden;
  max-height: ${({ isOpen }) => (isOpen ? '1000px' : '0')};
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
`;

/*
 * Component
 */

export const ExpandableSection: FC<ExpandableSectionProps> = (props) => {
    const {
        children,
        title,
        isOpen: controlledIsOpen,
        onToggle,
        actions,
        showTextBeforeIcon = false,
        iconName = 'CaretExpand',
        borderRadius,
        hoverBackgroundColor,
        showBorder = true,
        showContentBorder = true
    } = props;
    const [internalIsOpen, setInternalIsOpen] = useState(false);

    const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

    const handleToggle = () => {
        const newIsOpen = !isOpen;
        if (controlledIsOpen === undefined) setInternalIsOpen(newIsOpen);
        if (onToggle) onToggle(newIsOpen);
    };

    const titleElement = typeof title === 'string' ? <StyledTitleDiv>{title}</StyledTitleDiv> : title;
    const iconElement = (
        <StyledCaretIconDiv isOpen={isOpen}>
            <Icon name={iconName} size={16} />
        </StyledCaretIconDiv>
    );

    return (
        <StyledExpandableSectionDiv borderRadius={borderRadius} showBorder={showBorder}>
            <StyledHeaderDiv onClick={handleToggle} hoverBackgroundColor={hoverBackgroundColor}>
                <StyledTitleContainerDiv>
                    {showTextBeforeIcon ? (
                        <>
                            {titleElement}
                            {iconElement}
                        </>
                    ) : (
                        <>
                            {iconElement}
                            {titleElement}
                        </>
                    )}
                </StyledTitleContainerDiv>
                {actions && <StyledActionsDiv onClick={(e) => e.stopPropagation()}>{actions}</StyledActionsDiv>}
            </StyledHeaderDiv>
            <StyledContentDiv isOpen={isOpen} showContentBorder={showContentBorder}>
                {children}
            </StyledContentDiv>
        </StyledExpandableSectionDiv>
    );
};

ExpandableSection.displayName = 'ExpandableSection';

import { StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import styled from 'styled-components';

import { Icon } from '../../../../elements/icon/icon';
import { greys, palette } from '../../../../helpers/colorHelpers';
import { VisualSizesEnum } from '../../../../helpers/fontHelpers';
import { DefaultStyleProvider } from '../../../../utils/defaultStyleProvider';
import { Button } from '../../../button/button';
import { ExpandableSection } from '../../expandableSection';

const StyledCenteredDiv = styled.div`
  display: flex;
  flex-flow: column;
  gap: 16px;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const StyledContentDiv = styled.div`
  padding: 16px;
  background: ${greys.shade10};
  border-radius: 4px;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: ${greys.shade70};
`;

const StyledActionsContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const StyledHoverWrapper = styled.div`
  position: relative;

  &:hover .hover-actions {
    opacity: 1;
  }
`;

const StyledHoverActionsContainer = styled.div`
  display: flex;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;

  &.hover-actions {
    opacity: 0;
  }
`;

export const Basic: StoryObj<typeof ExpandableSection> = {
    render: () => (
        <DefaultStyleProvider>
            <StyledCenteredDiv>
                <ExpandableSection title="Basic Expandable Section">
                    <StyledContentDiv>
                        This is the content of the expandable section. It can contain any React elements that you want to
                        display when the section is expanded.
                    </StyledContentDiv>
                </ExpandableSection>

                <ExpandableSection
                    title="With Actions"
                    actions={
                        <StyledActionsContainer>
                            <Button type="icon" size={VisualSizesEnum.SMALL}>
                                <Icon name="Edit" />
                            </Button>
                            <Button type="icon" size={VisualSizesEnum.SMALL}>
                                <Icon name="Close" />
                            </Button>
                        </StyledActionsContainer>
                    }>
                    <StyledContentDiv>
                        This expandable section includes action buttons in the header. The actions are positioned on the
                        right side and don&apos;t trigger the expand/collapse behavior.
                    </StyledContentDiv>
                </ExpandableSection>

                <ExpandableSection title="Complex Content">
                    <StyledContentDiv>
                        <h4>Complex Content Example</h4>
                        <p>This section demonstrates that you can include any type of content:</p>
                        <ul>
                            <li>Lists</li>
                            <li>Forms</li>
                            <li>Other components</li>
                            <li>Images</li>
                        </ul>
                        <p>The content area will expand and contract smoothly when toggling the section.</p>
                    </StyledContentDiv>
                </ExpandableSection>
            </StyledCenteredDiv>
        </DefaultStyleProvider>
    )
};

const ControlledComponent = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <DefaultStyleProvider>
            <StyledCenteredDiv>
                <div>
                    <Button onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? 'Close' : 'Open'} Section Programmatically
                    </Button>
                </div>

                <ExpandableSection
                    title="Controlled Expandable Section"
                    isOpen={isOpen}
                    onToggle={setIsOpen}
                    actions={
                        <Button type="icon" size={VisualSizesEnum.SMALL}>
                            <Icon name="Gear" />
                        </Button>
                    }>
                    <StyledContentDiv>
                        This section&apos;s open/closed state is controlled externally. You can toggle it using the button
                        above or by clicking on the section header.
                    </StyledContentDiv>
                </ExpandableSection>
            </StyledCenteredDiv>
        </DefaultStyleProvider>
    );
};

export const Controlled: StoryObj<typeof ExpandableSection> = {
    render: () => <ControlledComponent />
};

export const MultipleSections: StoryObj<typeof ExpandableSection> = {
    render: () => (
        <DefaultStyleProvider>
            <StyledCenteredDiv>
                <ExpandableSection title="Section 1">
                    <StyledContentDiv>Content for section 1. Each section operates independently.</StyledContentDiv>
                </ExpandableSection>

                <ExpandableSection title="Section 2">
                    <StyledContentDiv>
                        Content for section 2. Multiple sections can be open at the same time.
                    </StyledContentDiv>
                </ExpandableSection>

                <ExpandableSection title="Section 3">
                    <StyledContentDiv>
                        Content for section 3. The sections have a square, card-like appearance with proper spacing and
                        borders.
                    </StyledContentDiv>
                </ExpandableSection>
            </StyledCenteredDiv>
        </DefaultStyleProvider>
    )
};

export const Customized: StoryObj<typeof ExpandableSection> = {
    render: () => (
        <DefaultStyleProvider>
            <StyledCenteredDiv>
                <ExpandableSection
                    title="Text Before Icon"
                    showTextBeforeIcon
                    actions={
                        <Button type="icon" size={VisualSizesEnum.SMALL}>
                            <Icon name="EditSquare" />
                        </Button>
                    }
                    borderRadius="0px"
                    showBorder={false}
                    showContentBorder={false}
                    hoverBackgroundColor="transparent">
                    <StyledContentDiv>
                        This section shows the title text before the expand/collapse icon.
                    </StyledContentDiv>
                </ExpandableSection>

                <ExpandableSection title="Text First + Custom Icon" showTextBeforeIcon iconName="ChevronDown">
                    <StyledContentDiv>
                        This section combines both customizations: text before icon and a custom chevron icon.
                    </StyledContentDiv>
                </ExpandableSection>

                <ExpandableSection title="Custom Hover Color" hoverBackgroundColor="#e3f2fd">
                    <StyledContentDiv>
                        This section has a custom light blue hover background color instead of the default grey.
                    </StyledContentDiv>
                </ExpandableSection>
            </StyledCenteredDiv>
        </DefaultStyleProvider>
    )
};

export const ActionsOnHover: StoryObj<typeof ExpandableSection> = {
    render: () => (
        <DefaultStyleProvider>
            <StyledCenteredDiv>
                <StyledHoverWrapper>
                    <ExpandableSection
                        title="Actions Show on Hover"
                        actions={
                            <StyledHoverActionsContainer className="hover-actions">
                                <Button type="icon" size={VisualSizesEnum.SMALL}>
                                    <Icon name="Edit" />
                                </Button>
                                <Button type="icon" size={VisualSizesEnum.SMALL}>
                                    <Icon name="Copy" />
                                </Button>
                                <Button type="icon" size={VisualSizesEnum.SMALL}>
                                    <Icon name="Trash" />
                                </Button>
                            </StyledHoverActionsContainer>
                        }>
                        <StyledContentDiv>
                            Hover over this section to see the action buttons appear. The actions are hidden by default and
                            smoothly fade in when you hover over the section header. This provides a clean interface while
                            keeping actions easily accessible.
                        </StyledContentDiv>
                    </ExpandableSection>
                </StyledHoverWrapper>
            </StyledCenteredDiv>
        </DefaultStyleProvider>
    )
};

const StyledCustomTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: ${palette.blue.shade40};
`;

const StyledBadge = styled.span`
  background: #fef3c7;
  color: #92400e;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
`;

export const CustomTitleComponent: StoryObj<typeof ExpandableSection> = {
    render: () => (
        <DefaultStyleProvider>
            <StyledCenteredDiv>
                <ExpandableSection
                    title={
                        <StyledCustomTitle>
                            Custom Title with Icon
                            <StyledBadge>New</StyledBadge>
                        </StyledCustomTitle>
                    }>
                    <StyledContentDiv>
                        This expandable section demonstrates using a custom React component as the title. The title
                        includes an icon, styled text, and a badge component. This provides much more flexibility than
                        just using a plain string.
                    </StyledContentDiv>
                </ExpandableSection>

                <ExpandableSection
                    title={
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontWeight: 'bold', color: '#dc2626' }}>⚠️</span>
                            <span>Important Notice</span>
                        </div>
                    }>
                    <StyledContentDiv>
                        You can also use inline styles or any other React elements as the title. This example shows a
                        warning icon with styled text.
                    </StyledContentDiv>
                </ExpandableSection>
            </StyledCenteredDiv>
        </DefaultStyleProvider>
    )
};

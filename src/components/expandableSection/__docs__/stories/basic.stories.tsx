import {StoryObj} from '@storybook/react';
import React, {useState} from 'react';
import styled from 'styled-components';

import {greys, palette} from '../../../../helpers/colorHelpers';
import {DefaultStyleProvider} from '../../../../utils/defaultStyleProvider';
import {Button} from '../../../button/button';
import {ExpandableSection} from '../../expandableSection';

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
          actions={[
            {
              label: 'Edit',
              icon: 'Edit',
              tooltip: 'Edit this section',
              onClick: () => console.log('Edit clicked')
            },
            {
              label: 'Delete',
              icon: 'Close',
              tooltip: 'Delete this section',
              onClick: () => console.log('Delete clicked')
            }
          ]}>
          <StyledContentDiv>
            This expandable section includes action buttons in the header. The actions are positioned on the
            right side and don&apos;t trigger the expand/collapse behavior. Multiple actions will show as a
            dropdown menu.
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
          actions={[
            {
              label: 'Settings',
              icon: 'Gear',
              tooltip: 'Open settings',
              onClick: () => console.log('Settings clicked')
            }
          ]}>
          <StyledContentDiv>
            This section&apos;s open/closed state is controlled externally. You can toggle it using the button
            above or by clicking on the section header. Single actions show as icon buttons with tooltips.
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
          actions={[
            {
              label: 'Edit',
              icon: 'EditSquare',
              tooltip: 'Edit this section',
              onClick: () => console.log('Edit clicked')
            }
          ]}
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
        <ExpandableSection
          title="Actions Always Visible (Default)"
          actions={[
            {
              label: 'Edit',
              icon: 'Edit',
              tooltip: 'Edit this section',
              onClick: () => console.log('Edit clicked')
            },
            {
              label: 'Copy',
              icon: 'Copy',
              tooltip: 'Copy this section',
              onClick: () => console.log('Copy clicked')
            },
            {
              label: 'Delete',
              icon: 'Trash',
              tooltip: 'Delete this section',
              onClick: () => console.log('Delete clicked')
            }
          ]}>
          <StyledContentDiv>
            By default, actions are always visible. This provides immediate access to all available actions.
            Multiple actions will show as a dropdown menu.
          </StyledContentDiv>
        </ExpandableSection>

        <ExpandableSection
          title="Actions Show on Hover"
          showActionsOnHover
          actions={[
            {
              label: 'Edit',
              icon: 'Edit',
              tooltip: 'Edit this section',
              onClick: () => console.log('Edit clicked')
            },
            {
              label: 'Copy',
              icon: 'Copy',
              tooltip: 'Copy this section',
              onClick: () => console.log('Copy clicked')
            },
            {
              label: 'Delete',
              icon: 'Trash',
              tooltip: 'Delete this section',
              onClick: () => console.log('Delete clicked')
            }
          ]}>
          <StyledContentDiv>
            Hover over this section to see the action buttons appear. The actions are hidden by default and
            smoothly fade in when you hover over the section header. This provides a clean interface while
            keeping actions easily accessible.
          </StyledContentDiv>
        </ExpandableSection>
      </StyledCenteredDiv>
    </DefaultStyleProvider>
  )
};

export const GroupActions: StoryObj<typeof ExpandableSection> = {
  render: () => (
    <DefaultStyleProvider>
      <StyledCenteredDiv>
        <ExpandableSection
          title="Individual Actions (groupActions=false - Default)"
          actions={[
            {
              label: 'Edit',
              icon: 'Edit',
              tooltip: 'Edit this section',
              onClick: () => console.log('Edit clicked')
            },
            {
              label: 'Copy',
              icon: 'Copy',
              tooltip: 'Copy this section',
              onClick: () => console.log('Copy clicked')
            },
            {
              label: 'Share',
              icon: 'ExternalLink',
              tooltip: 'Share this section',
              onClick: () => console.log('Share clicked')
            }
          ]}>
          <StyledContentDiv>
            By default, actions are displayed as individual icon buttons. Each action has its own tooltip and
            is immediately accessible. This provides quick access to all actions but may take up more space.
          </StyledContentDiv>
        </ExpandableSection>

        <ExpandableSection
          title="Grouped Actions (groupActions=true)"
          groupActions
          actions={[
            {
              label: 'Edit',
              icon: 'Edit',
              tooltip: 'Edit this section',
              onClick: () => console.log('Edit clicked')
            },
            {
              label: 'Copy',
              icon: 'Copy',
              tooltip: 'Copy this section',
              onClick: () => console.log('Copy clicked')
            },
            {
              label: 'Share',
              icon: 'ExternalLink',
              tooltip: 'Share this section',
              onClick: () => console.log('Share clicked')
            }
          ]}>
          <StyledContentDiv>
            When groupActions=true, all actions are grouped into a single dropdown menu. This keeps the
            interface clean and compact, especially useful when you have many actions or limited space.
          </StyledContentDiv>
        </ExpandableSection>
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
            <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
              <span style={{fontWeight: 'bold', color: '#dc2626'}}>⚠️</span>
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

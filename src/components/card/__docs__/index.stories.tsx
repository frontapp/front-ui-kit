import type {Meta, StoryObj} from '@storybook/react';
import React, {useState} from 'react';

import {greys, palette} from '../../../helpers/colorHelpers';
import {fontSizes, fontWeights, VisualSizesEnum} from '../../../helpers/fontHelpers';
import {DefaultStyleProvider} from '../../../utils/defaultStyleProvider';
import {Button} from '../../button/button';
import {Checkbox} from '../../checkbox/checkbox';
import {Card} from '../card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'padded'
  },
  argTypes: {
    size: {
      control: {type: 'select'},
      options: ['SMALL', 'MEDIUM', 'LARGE']
    },
    hasShadow: {
      control: {type: 'boolean'}
    },
    hasBorder: {
      control: {type: 'boolean'}
    },
    isClickable: {
      control: {type: 'boolean'}
    }
  }
};

export default meta;
type Story = StoryObj<typeof Card>;

export const WithButtons: Story = {
  render: (args) => (
    <DefaultStyleProvider>
      <Card {...args}>
        <Card.Header>Card with Buttons</Card.Header>
        <Card.Body>This card contains buttons in the footer.</Card.Body>
        <Card.Footer>
          <div style={{display: 'flex', gap: '8px', justifyContent: 'flex-end'}}>
            <Button type="secondary" size={VisualSizesEnum.SMALL}>
              Cancel
            </Button>
            <Button type="primary" size={VisualSizesEnum.SMALL}>
              Save
            </Button>
          </div>
        </Card.Footer>
      </Card>
    </DefaultStyleProvider>
  ),
  decorators: [
    (Story) => (
      <div style={{width: '400px'}}>
        <Story />
      </div>
    )
  ]
};

const WithCheckboxAndBodyComponent = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <DefaultStyleProvider>
      <Card>
        <Card.Header>
          <Checkbox isChecked={isChecked} onChange={setIsChecked}>
            <span
              style={{
                color: palette.blue.shade60,
                fontSize: fontSizes.large,
                fontWeight: fontWeights.medium
              }}>
              Customer Feedback
            </span>
          </Checkbox>
        </Card.Header>
        <Card.Body>
          <div
            style={{
              paddingLeft: '24px',
              color: greys.shade60,
              fontSize: fontSizes.medium,
              fontWeight: fontWeights.normal
            }}>
            Problem - 30 Sep, 2025
          </div>
        </Card.Body>
      </Card>
    </DefaultStyleProvider>
  );
};

export const WithCheckboxAndBody: Story = {
  render: () => <WithCheckboxAndBodyComponent />,
  decorators: [
    (Story) => (
      <div style={{width: '400px'}}>
        <Story />
      </div>
    )
  ]
};

const WithCheckboxBodyAndFooterComponent = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <DefaultStyleProvider>
      <Card
        groupActions
        actions={[
          {
            label: 'Edit',
            icon: 'Edit',
            tooltip: 'Edit this card',
            onClick: () => console.log('Edit clicked!')
          },
          {
            label: 'Log content',
            icon: 'AttachmentGeneric',
            tooltip: 'Log content',
            onClick: () => console.log('Log content clicked!')
          }
        ]}>
        <Card.Header>
          <Checkbox isChecked={isChecked} onChange={setIsChecked}>
            <span
              style={{
                color: palette.blue.shade60,
                fontSize: fontSizes.large,
                fontWeight: fontWeights.medium
              }}>
              Customer Feedback
            </span>
          </Checkbox>
        </Card.Header>
        <Card.Body>
          <div
            style={{
              paddingLeft: '24px',
              color: greys.shade80,
              fontSize: fontSizes.medium,
              fontWeight: fontWeights.normal
            }}>
            Speak with Lance about pricing proposal
          </div>
        </Card.Body>
        <Card.Footer>
          <div
            style={{
              paddingLeft: '24px',
              color: greys.shade60,
              fontSize: fontSizes.small,
              fontWeight: fontWeights.normal
            }}>
            Call - 30 Sep, 2025
          </div>
        </Card.Footer>
      </Card>
    </DefaultStyleProvider>
  );
};

export const WithCheckboxBodyAndFooter: Story = {
  args: {
    size: VisualSizesEnum.MEDIUM
  },
  render: () => <WithCheckboxBodyAndFooterComponent />,

  decorators: [
    (Story) => (
      <div style={{width: '400px'}}>
        <Story />
      </div>
    )
  ]
};

export const CardWithActions: Story = {
  render: (args) => (
    <DefaultStyleProvider>
      <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
        <Card
          {...args}
          showActionsOnHover
          actions={[
            {
              label: 'Edit',
              icon: 'Edit',
              tooltip: 'Edit this card',
              onClick: () => console.log('Edit clicked!')
            }
          ]}>
          <Card.Header>Card with Single Action</Card.Header>
          <Card.Body>Hover over this card to see the edit action in the top right corner.</Card.Body>
          <Card.Footer>Card footer content</Card.Footer>
        </Card>
        <Card
          {...args}
          actions={[
            {
              label: 'Edit',
              icon: 'Edit',
              tooltip: 'Edit this card',
              onClick: () => console.log('Edit clicked!')
            },
            {
              label: 'Duplicate',
              icon: 'Copy',
              tooltip: 'Duplicate this card',
              onClick: () => console.log('Duplicate clicked!')
            },
            {
              label: 'Delete',
              icon: 'Trash',
              tooltip: 'Delete this card',
              onClick: () => console.log('Delete clicked!')
            }
          ]}>
          <Card.Header>Always Visible Actions</Card.Header>
          <Card.Body>The action menu is always visible in the top right corner, no hover needed.</Card.Body>
          <Card.Footer>Card footer content</Card.Footer>
        </Card>
        <Card
          {...args}
          showActionsOnHover
          actions={[
            {
              label: 'Edit',
              icon: 'Edit',
              tooltip: 'Edit this card',
              onClick: () => console.log('Edit clicked!')
            },
            {
              label: 'Duplicate',
              icon: 'Copy',
              tooltip: 'Duplicate this card',
              onClick: () => console.log('Duplicate clicked!')
            },
            {
              label: 'Delete',
              icon: 'Trash',
              tooltip: 'Delete this card',
              onClick: () => console.log('Delete clicked!')
            }
          ]}>
          <Card.Header>Actions Show on Hover</Card.Header>
          <Card.Body>
            Hover over this card to see the action menu (three dots) in the top right corner.
          </Card.Body>
          <Card.Footer>Card footer content</Card.Footer>
        </Card>
        <Card
          {...args}
          groupActions
          actions={[
            {
              label: 'Edit',
              icon: 'Edit',
              tooltip: 'Edit this card',
              onClick: () => console.log('Edit clicked!')
            },
            {
              label: 'Copy',
              icon: 'Copy',
              tooltip: 'Copy this card',
              onClick: () => console.log('Copy clicked!')
            },
            {
              label: 'Share',
              icon: 'ExternalLink',
              tooltip: 'Share this card',
              onClick: () => console.log('Share clicked!')
            }
          ]}>
          <Card.Header>Grouped Actions (groupActions=true)</Card.Header>
          <Card.Body>
            When groupActions=true, all actions are grouped into a single dropdown menu. This keeps the
            interface clean and compact, especially useful when you have many actions or limited space.
          </Card.Body>
          <Card.Footer>Card footer content</Card.Footer>
        </Card>
      </div>
    </DefaultStyleProvider>
  ),
  decorators: [
    (Story) => (
      <div style={{width: '400px'}}>
        <Story />
      </div>
    )
  ]
};

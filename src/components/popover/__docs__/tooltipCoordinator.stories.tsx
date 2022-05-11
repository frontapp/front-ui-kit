/* eslint-disable @typescript-eslint/no-explicit-any */
import {ComponentMeta, ComponentStory} from '@storybook/react';
import React, {useState} from 'react';
import styled from 'styled-components';

import {VisualSizesEnum} from '../../../helpers/fontHelpers';
import {Avatar} from '../../avatar/avatar';
import {Button} from '../../button/button';
import {Tooltip} from '../../tooltip/tooltip';
import {TooltipCoordinator} from '../tooltipCoordinator';

const StyledExampleWrapperDiv = styled.div`
  transform: translateX(50%) translateY(100%);
`;

export default {
  title: 'Front UI Kit/Tooltip',
  component: TooltipCoordinator,
  argTypes: {
    placement: {
      control: {type: 'select'},
      defaultValue: 'bottom',
      options: ['auto', 'auto-end', 'auto-start', 'bottom', 'bottom-end', 'bottom-start', 'left', 'left-end', 'left-start', 'right', 'right-end', 'right-start', 'top', 'top-end', 'top-start']
    },
    renderTooltip: {
      table: {
        disable: true
      }
    },
    condition: {
      table: {
        disable: true
      }
    },
    children: {
      table: {
        disable: true
      }
    }
  }
} as ComponentMeta<typeof TooltipCoordinator>;

const Template: ComponentStory<typeof TooltipCoordinator> = args => (
  <StyledExampleWrapperDiv>
    <TooltipCoordinator
      {...args}
      renderTooltip={() => (
        <Tooltip placement={(args as any).placement} maxWidth={200}>
          This is an example tooltip for Doug the Pug
        </Tooltip>
      )}
    >
      <Avatar name="Doug the Pug" imgSrc="https://picsum.photos/id/1062/200/200" size={VisualSizesEnum.EXTRA_LARGE} />
    </TooltipCoordinator>
  </StyledExampleWrapperDiv>
);

export const Simple = Template.bind({});

/*
 * Overflow tooltips.
 */

const ExplicitTemplate: ComponentStory<typeof TooltipCoordinator> = args => {
  const [isEnabled, setIsEnabled] = useState(true);
  return (
    <>
      <Button onClick={() => setIsEnabled(!isEnabled)}>Toggle Tooltip Enabled: {isEnabled.toString()}</Button>
      <br /><br />
      <TooltipCoordinator
        {...args}
        condition={{
          type: 'explicit',
          isEnabled
        }}
        renderTooltip={() => (
          <Tooltip placement={(args as any).placement}>
            This is not overflowing text.
          </Tooltip>
        )}
      >
        This is not overflowing text.
      </TooltipCoordinator>
    </>
  );
};

export const ExplicitCondition = ExplicitTemplate.bind({});

/*
 * Overflow tooltips.
 */

const OverflowTemplate: ComponentStory<typeof TooltipCoordinator> = args => {
  const exampleText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ornare feugiat elit. ' +
  'Suspendisse dapibus placerat nunc, quis convallis eros tempor vel. Nullam hendrerit semper mollis. Maecenas quis sollicitudin urna.';

  return (
    <>
      <h2>No tooltip - Text is not overflowing</h2>
      <div style={{maxWidth: "400px", overflow: 'hidden'}}>
        <TooltipCoordinator
          {...args}
          condition={{
            type: 'overflow'
          }}
          renderTooltip={() => (
            <Tooltip placement={(args as any).placement}>
              This is not overflowing text.
            </Tooltip>
          )}
        >
          This is not overflowing text.
        </TooltipCoordinator>
      </div>

      <h2>Tooltip - Text is overflowing</h2>
      <div style={{maxWidth: "400px", overflow: 'hidden'}}>
        <TooltipCoordinator
          {...args}
          condition={{
            type: 'overflow'
          }}
          renderTooltip={() => (
            <Tooltip placement={(args as any).placement}>
              {exampleText}
            </Tooltip>
          )}
        >
          {exampleText}
        </TooltipCoordinator>
      </div>
    </>
  );
};

export const OverflowCondition = OverflowTemplate.bind({});

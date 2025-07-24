import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { Tooltip } from '../tooltip';
import { TooltipCoordinator } from '../tooltipCoordinator';

describe('<Tooltip /> Spec', () => {
  it('should show tooltip when hovered', async () => {
    render(
      <TooltipCoordinator renderTooltip={() => <Tooltip>Example Tooltip</Tooltip>}>
        <div>anchor</div>
      </TooltipCoordinator>
    );

    // Hover over the anchor.
    await act(async () => {
      await userEvent.hover(screen.getByText('anchor'));
    });

    // Make sure the tooltip is visible.
    await waitFor(() => {
      const tooltip = screen.queryByText('Example Tooltip');
      expect(tooltip).not.toBeNull();
    });
  });

  it('should not render tooltip when hovered when explicit condition is not enabled.', async () => {
    render(
      <TooltipCoordinator
        renderTooltip={() => <Tooltip>Example Tooltip</Tooltip>}
        condition={{ type: 'explicit', isEnabled: false }}>
        <div>anchor</div>
      </TooltipCoordinator>
    );

    // Hover over the anchor.
    await act(async () => {
      await userEvent.hover(screen.getByText('anchor'));
    });

    // Make sure the tooltip is not visible.
    const tooltip = screen.queryByText('Example Tooltip');
    expect(tooltip).toBeNull();
  });

  it('should render tooltip when hovered when explicit condition is enabled.', async () => {
    render(
      <TooltipCoordinator
        renderTooltip={() => <Tooltip>Example Tooltip</Tooltip>}
        condition={{ type: 'explicit', isEnabled: true }}>
        <div>anchor</div>
      </TooltipCoordinator>
    );

    // Hover over the anchor.
    await act(async () => {
      await userEvent.hover(screen.getByText('anchor'));
    });

    // Make sure the tooltip is visible.
    await waitFor(() => {
      const tooltip = screen.queryByText('Example Tooltip');
      expect(tooltip).not.toBeNull();
    });
  });
});

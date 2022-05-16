import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import {VisualSizesEnum} from '../../../helpers/fontHelpers';
import {Avatar} from '../avatar';

describe('<Avatar /> Spec', () => {
  describe('Snapshots', () => {
    it('should render avatar with name and color should always be the same', () => {
      const view = render(<Avatar name="John Doe" />);
      expect(view.container).toMatchSnapshot();
    });

    it('should render small avatar with a single initial', () => {
      const view = render(<Avatar name="John Doe" size={VisualSizesEnum.SMALL} />);
      expect(view.container).toMatchSnapshot();
    });

    it('should render large avatar', () => {
      const view = render(<Avatar name="John Doe" size={VisualSizesEnum.LARGE} />);
      expect(view.container).toMatchSnapshot();
    });

    it('should render an image avatar', () => {
      const view = render(<Avatar name="John Doe" imgSrc="https://picsum.photos/id/1062/200/200" />);
      expect(view.container).toMatchSnapshot();
    });
  });

  it('should render tooltip when moused over', async () => {
    const user = userEvent.setup();
    const view = render(<Avatar name="John Doe" shouldRenderTooltip />);

    // Hover over the avatar.
    await user.hover(screen.getByText('JD'));

    // Wait until we see the tooltip.
    await waitFor(() =>
      screen.getByText('John Doe')
    );
  });
});

import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import {Tab} from '../tab';
import {TabGroup} from '../tabGroup';

describe('<Button /> Spec', () => {
  describe('Snapshots', () => {
    it('should render tab', () => {
      const view = render(<Tab name="Example Tab" />);
      expect(view.container).toMatchSnapshot();
    });

    it('should render selected tab', () => {
      const view = render(<Tab name="Example Tab" isSelected />);
      expect(view.container).toMatchSnapshot();
    });

    it('should render tab group', () => {
      const view = render(
        <TabGroup>
          <Tab name="Example Tab 1" isSelected />
          <Tab name="Example Tab 2" />
          <Tab name="Example Tab 3" />
        </TabGroup>
      );
      expect(view.container).toMatchSnapshot();
    });
  });

  it('should issue onClick events when clicked', async () => {
    const user = userEvent.setup();
    const onClickMock = jest.fn();
    const view = render(<Tab name="Example Tab" onClick={onClickMock} />);

    await user.click(view.getByText('Example Tab'));

    expect(onClickMock).toBeCalled();
  });
});

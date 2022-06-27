import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import {Icon} from '../../../elements/icon/icon';
import {Pill} from '../pill';
import {PillContent} from '../pillContent';
import {PillContentIcon} from '../pillContentIcon';

describe('<Pill /> Spec', () => {
  describe('Snapshots', () => {
    it('should render using defaults', () => {
      const view = render(<Pill>Pill</Pill>);
      expect(view.container).toMatchSnapshot();
    });

    it('should render selected state', () => {
      const view = render(<Pill isSelected>Pill</Pill>);
      expect(view.container).toMatchSnapshot();
    });

    it('should support rendering a pill with icon', () => {
      const view = render(
        <Pill>
          <PillContent>Pill</PillContent>
          <PillContentIcon>
            <Icon name="Checkmark" />
          </PillContentIcon>
        </Pill>
      );
      expect(view.container).toMatchSnapshot();
    });
  });

  it('should issue onClick events when clicked', async () => {
    const user = userEvent.setup();
    const onClickMock = jest.fn();
    const view = render(<Pill onClick={onClickMock}>Pill</Pill>);

    await user.click(view.getByText('Pill'));

    expect(onClickMock).toBeCalled();
  });
});

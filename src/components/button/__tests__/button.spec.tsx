import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import {VisualSizesEnum} from '../../../helpers/fontHelpers';
import {Icon} from '../../icon/icon';
import {Button} from '../button';
import {ButtonGroup} from '../buttonGroup';

describe('<Button /> Spec', () => {
  describe('Snapshots', () => {
    it('should render button using defaults', () => {
      const view = render(<Button>Button</Button>);
      expect(view.container).toMatchSnapshot();
    });

    it('should render primary button', () => {
      const view = render(<Button type="primary">Button</Button>);
      expect(view.container).toMatchSnapshot();
    });

    it('should render primary-danger button', () => {
      const view = render(<Button type="primary-danger">Button</Button>);
      expect(view.container).toMatchSnapshot();
    });

    it('should render secondary button', () => {
      const view = render(<Button type="secondary">Button</Button>);
      expect(view.container).toMatchSnapshot();
    });

    it('should render secondary-danger button', () => {
      const view = render(<Button type="secondary-danger">Button</Button>);
      expect(view.container).toMatchSnapshot();
    });

    it('should render tertiary button', () => {
      const view = render(<Button type="tertiary">Button</Button>);
      expect(view.container).toMatchSnapshot();
    });

    it('should render different sized button', () => {
      const view = render(
        <ButtonGroup>
          <Button size={VisualSizesEnum.LARGE}>Button</Button>
          <Button size={VisualSizesEnum.MEDIUM}>Button</Button>
          <Button size={VisualSizesEnum.SMALL}>Button</Button>
        </ButtonGroup>
      );
      expect(view.container).toMatchSnapshot();
    });

    it('should render icon button', () => {
      const view = render(
        <Button type="icon">
          <Icon name="Close" />
        </Button>
      );
      expect(view.container).toMatchSnapshot();
    });

    it('should render icon-danger button', () => {
      const view = render(
        <Button type="icon-danger">
          <Icon name="Close" />
        </Button>
      );
      expect(view.container).toMatchSnapshot();
    });
  });

  it('should issue onClick events when clicked', async () => {
    const user = userEvent.setup();
    const onClickMock = jest.fn();
    const view = render(<Button onClick={onClickMock}>Button</Button>);

    await user.click(view.getByRole('button', {name: /Button/i}));

    expect(onClickMock).toBeCalled();
  });

  it('should not issue onClick events when clicked when isDisabled', async () => {
    const user = userEvent.setup();
    const onClickMock = jest.fn();
    const view = render(<Button onClick={onClickMock} isDisabled>Button</Button>);

    await user.click(view.getByRole('button', {name: /Button/i}));

    expect(onClickMock).not.toBeCalled();
  });
});

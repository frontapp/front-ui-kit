import {render} from '@testing-library/react';
import React from 'react';

import {Icon} from '../../icon/icon';
import {Button} from '../button';

describe('<Button /> Spec', () => {
  describe('Snapshots', () => {
    it('should render button using defaults', () => {
      const component = render(<Button>Button</Button>
      );
      expect(component.container).toMatchSnapshot();
    });

    it('should render primary button', () => {
      const component = render(<Button type="primary">Button</Button>
      );
      expect(component.container).toMatchSnapshot();
    });

    it('should render primary-danger button', () => {
      const component = render(<Button type="primary-danger">Button</Button>
      );
      expect(component.container).toMatchSnapshot();
    });

    it('should render secondary button', () => {
      const component = render(<Button type="secondary">Button</Button>
      );
      expect(component.container).toMatchSnapshot();
    });

    it('should render secondary-danger button', () => {
      const component = render(<Button type="secondary-danger">Button</Button>
      );
      expect(component.container).toMatchSnapshot();
    });

    it('should render tertiary button', () => {
      const component = render(<Button type="tertiary">Button</Button>
      );
      expect(component.container).toMatchSnapshot();
    });

    it('should render icon button', () => {
      const component = render(
        <Button type="icon">
          <Icon name="Close" />
        </Button>
      );
      expect(component.container).toMatchSnapshot();
    });

    it('should render icon-danger button', () => {
      const component = render(
        <Button type="icon-danger">
          <Icon name="Close" />
        </Button>
      );
      expect(component.container).toMatchSnapshot();
    });
  });
});

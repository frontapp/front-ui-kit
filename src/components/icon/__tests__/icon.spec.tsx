import {render} from '@testing-library/react';
import React from 'react';

import {palette} from '../../../helpers/colorHelpers';
import {Icon} from '../../icon/icon';

describe('<Icon /> Spec', () => {
  describe('Snapshots', () => {
    it('should render with defaults', () => {
      const view = render(<Icon name="Checkmark" />);
      expect(view.container).toMatchSnapshot();
    });

    it('should support different sizes', () => {
      const view = render(<Icon name="Checkmark" size={32} />);
      expect(view.container).toMatchSnapshot();
    });

    it('should support different colors', () => {
      const view = render(<Icon name="Checkmark" color={palette.blue.shade40} />);
      expect(view.container).toMatchSnapshot();
    });
  });
});

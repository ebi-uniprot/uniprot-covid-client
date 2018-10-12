import React from 'react';
import renderer from 'react-test-renderer';

import AdvancedSearch from '../../../src/ui/search/AdvancedSearch';

describe('AdvancedSearch component', () => {
  test('should render', () => {
    const component = renderer.create(<AdvancedSearch />).toJSON();

    expect(component).toMatchSnapshot();
  });
});

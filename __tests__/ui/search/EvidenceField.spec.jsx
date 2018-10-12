import React from 'react';
import renderer from 'react-test-renderer';

import EvidenceField from '../../../src/ui/search/EvidenceField';

describe('EvidenceField component', () => {
  test('should render', () => {
    const component = renderer.create(<EvidenceField />).toJSON();

    expect(component).toMatchSnapshot();
  });
});

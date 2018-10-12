import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import EvidenceField from '../../../src/ui/search/EvidenceField';

describe('EvidenceField component', () => {
  test('should render', () => {
    const component = renderer.create(<EvidenceField url="/some/url" />).toJSON();

    expect(component).toMatchSnapshot();
  });
});

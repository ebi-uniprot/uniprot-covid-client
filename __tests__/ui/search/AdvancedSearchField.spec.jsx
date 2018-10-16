import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import withData from '../../../src/ui/hoc/withData';
// import fetchData from '../../../src/ui/hoc/fetchData';

import AdvancedSearchField from '../../../src/ui/search/AdvancedSearchField';

const field = {
  label: 'Any',
  term: 'All',
  example: 'a4_human, P05067, cdc7 human',
  itemType: 'single',
  dataType: 'string',
};

describe('AdvancedSearchField component', () => {
  beforeAll(() => {
    jest.mock('../../../src/ui/hoc/fetchData');
  });

  test('should render', () => {
    const component = renderer.create(<AdvancedSearchField field={field} />).toJSON();

    expect(component).toMatchSnapshot();
  });
});

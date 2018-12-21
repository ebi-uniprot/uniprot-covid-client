import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ResultsTable from '../ResultsTable';

configure({ adapter: new Adapter() });

let wrapper;
let props;

describe('ResultsRow component', () => {
  beforeEach(() => {
    props = {
      results: [{ accession: '1234' }, { accession: '5678' }],
    };
    wrapper = shallow(<ResultsTable {...props} />);
  });

  test('should render', () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });
});

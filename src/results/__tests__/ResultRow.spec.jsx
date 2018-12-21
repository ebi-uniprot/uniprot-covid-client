import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ResultRow from '../ResultRow';

configure({ adapter: new Adapter() });

let wrapper;
let props;

describe('ResultsRow component', () => {
  beforeEach(() => {
    props = {
      accession: 'ABCD',
    };
    wrapper = shallow(<ResultRow {...props} />);
  });

  test('should render', () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });
});

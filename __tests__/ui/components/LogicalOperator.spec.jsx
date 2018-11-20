import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LogicalOperator from '../../../src/ui/components/LogicalOperator';

configure({ adapter: new Adapter() });

let wrapper;
let props;

describe('LogicalOperator component', () => {
  beforeEach(() => {
    props = {
      value: 'AND',
      handleChange: jest.fn(),
    };

    wrapper = shallow(<LogicalOperator {...props} />);
  });

  test('should change evidence', () => {
    wrapper.find('.advanced-search__logic').simulate('change', { target: { value: 'OR' } });
    expect(props.handleChange).toBeCalled();
  });

  test('should render', () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });
});

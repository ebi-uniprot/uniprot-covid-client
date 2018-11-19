import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import RangeField from '../../../src/ui/components/RangeField';

configure({ adapter: new Adapter() });
let props;
let wrapper;

describe('Range field', () => {
  beforeEach(() => {
    props = {
      field: {
        id: 'range_field',
        field: {
          label: 'Any',
          itemType: 'feature',
          term: 'sites',
          dataType: 'string',
          hasRange: true,
          description: 'Search by feature sites',
          example: 'translocation',
        },
        queryInput: {},
      },
      handleChange: jest.fn(),
    };
    wrapper = shallow(<RangeField {...props} />);
  });

  test('should render a range field', () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });

  test('should handle from/to change', () => {
    wrapper.find(`#from_input_${props.field.id}`).simulate('change', { target: { value: 'val1' } });
    wrapper.find(`#to_input_${props.field.id}`).simulate('change', { target: { value: 'val1' } });
    expect(props.handleChange).toHaveBeenCalledTimes(2);
  });
});

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TextField from '../../../src/ui/components/TextField';

configure({ adapter: new Adapter() });
let props;
let wrapper;

describe('Range field', () => {
  beforeEach(() => {
    props = {
      field: {
        label: 'UniProtKB AC',
        itemType: 'single',
        term: 'accession',
        description: 'Search by UniProtKB Accession',
        example: 'P12345',
      },
      type: 'string',
      queryInput: {},
      handleChange: jest.fn(),
    };
    wrapper = shallow(<TextField {...props} />);
  });

  test('should render a text field', () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });

  test('should handle change', () => {
    wrapper.find(`#input_${props.field.term}`).simulate('change', { target: { value: 'val1' } });
    expect(props.handleChange).toHaveBeenCalled();
  });
});

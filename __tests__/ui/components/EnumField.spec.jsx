import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EnumField from '../../../src/ui/components/EnumField';

configure({ adapter: new Adapter() });
let props;
let wrapper;

describe('Enum field', () => {
  beforeEach(() => {
    props = {
      field: {
        label: 'Protein Existence [PE]',
        itemType: 'single',
        term: 'existence',
        dataType: 'enum',
        values: [
          {
            name: 'Evidence at protein level',
            value: '1',
          },
          {
            name: 'Evidence at transcript level',
            value: '2',
          },
        ],
        description: 'Search by protein existence',
        example: '1',
      },
      handleChange: jest.fn(),
    };
    wrapper = shallow(<EnumField {...props} />);
  });

  test('should render an enum field', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should render handle change', () => {
    wrapper.find(`#select_${props.field.term}`).simulate('change', { target: { value: 'val1' } });
    expect(props.handleChange).toBeCalled();
  });
});

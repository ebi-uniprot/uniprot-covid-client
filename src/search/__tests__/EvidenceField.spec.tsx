import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EvidenceField from '../EvidenceField';

configure({ adapter: new Adapter() });

let wrapper;
let props;

describe('EvidenceField component', () => {
  beforeEach(() => {
    props = {
      value: '',
      handleChange: jest.fn(),
      data: [
        {
          groupName: 'foo',
          items: [
            {
              code: 0,
              name: 'bar',
            },
            {
              code: 1,
              name: 'baz',
            },
          ],
        },
      ],
    };

    wrapper = shallow(<EvidenceField {...props} />);
  });

  test('should change evidence', () => {
    wrapper
      .find('#evidence_select')
      .simulate('change', { target: { value: props.data[0].items[0].code } });
    expect(props.handleChange).toBeCalled();
  });

  test('should render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

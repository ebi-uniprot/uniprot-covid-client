import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SimpleView from '../SimpleView';

configure({ adapter: new Adapter() });

describe('SimpleView component', () => {
  test('should render', () => {
    const wrapper = shallow(<SimpleView termValue="blah" />);
    expect(wrapper.debug()).toMatchSnapshot();
  });
});

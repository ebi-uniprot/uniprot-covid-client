import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Induction from '../Induction';
import data from './modelData.json';

configure({ adapter: new Adapter() });

describe('Induction', () => {
  test('should render', () => {
    const wrapper = shallow(<Induction data={data} />);
    expect(wrapper).toMatchSnapshot();
  });
});

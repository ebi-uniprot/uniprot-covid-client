import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Organism } from '../Organism';
import data from './modelData.json';

configure({ adapter: new Adapter() });

describe('Organism', () => {
  test('should render organism', () => {
    const wrapper = shallow(<Organism data={data} />);
    expect(wrapper.debug()).toMatchSnapshot();
  });
});

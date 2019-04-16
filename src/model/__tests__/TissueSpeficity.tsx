import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TissueSpeficity from '../TissueSpeficity';
import data from './modelData.json';

configure({ adapter: new Adapter() });

describe('TissueSpeficity', () => {
  test('should render', () => {
    const wrapper = shallow(<TissueSpeficity data={data} />);
    expect(wrapper).toMatchSnapshot();
  });
});

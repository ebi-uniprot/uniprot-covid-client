import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ProteinOverview from '../ProteinOverview';
import data from './modelData.json';

configure({ adapter: new Adapter() });

describe('ProteinOverview component', () => {
  test('should render', () => {
    const wrapper = shallow(<ProteinOverview data={data} />);
    expect(wrapper.debug()).toMatchSnapshot();
  });
});

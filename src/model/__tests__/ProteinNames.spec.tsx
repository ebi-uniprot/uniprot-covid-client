import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ProteinNames } from '../ProteinNames';
import data from './modelData.json';

configure({ adapter: new Adapter() });

describe('ProteinNames', () => {
  test('should render protein_name', () => {
    const wrapper = shallow(<ProteinNames data={data} />);
    expect(wrapper).toMatchSnapshot();
  });
});

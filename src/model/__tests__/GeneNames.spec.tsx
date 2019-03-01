import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { GeneNames } from '../GeneNames';
import data from './modelData.json';

configure({ adapter: new Adapter() });

describe('GeneNames', () => {
  test('should render gene_names', () => {
    const wrapper = shallow(<GeneNames data={data} />);
    expect(wrapper.debug()).toMatchSnapshot();
  });
});

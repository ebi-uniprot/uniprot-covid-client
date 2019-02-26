import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FieldToViewMappings from '../FieldToViewMappings';
import data from './modelData.json';

configure({ adapter: new Adapter() });

describe('FieldToViewMappings component', () => {
  test('should render accession', () => {
    const wrapper = shallow(FieldToViewMappings.accession(data));
    expect(wrapper.debug()).toMatchSnapshot();
  });

  test('should render id', () => {
    const wrapper = shallow(FieldToViewMappings.id(data));
    expect(wrapper.debug()).toMatchSnapshot();
  });

  test('should render protein_name', () => {
    const wrapper = shallow(FieldToViewMappings.protein_name(data));
    expect(wrapper.debug()).toMatchSnapshot();
  });

  test('should render gene_names', () => {
    const wrapper = shallow(FieldToViewMappings.gene_names(data));
    expect(wrapper.debug()).toMatchSnapshot();
  });

  test('should render organism', () => {
    const wrapper = shallow(FieldToViewMappings.organism(data));
    expect(wrapper.debug()).toMatchSnapshot();
  });
});

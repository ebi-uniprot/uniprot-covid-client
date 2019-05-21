import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ColumnConfiguration from '../ColumnConfiguration';
import data from '../__mocks__/modelData.json';

configure({ adapter: new Adapter() });

describe('ColumnConfiguration component', () => {
  test('should render accession', () => {
    const wrapper = shallow(ColumnConfiguration.accession.render(data));
    expect(wrapper).toMatchSnapshot();
  });

  test('should render id', () => {
    const wrapper = shallow(ColumnConfiguration.id.render(data));
    expect(wrapper).toMatchSnapshot();
  });

  test('should render protein_name', () => {
    const wrapper = shallow(ColumnConfiguration.protein_name.render(data));
    expect(wrapper).toMatchSnapshot();
  });

  test('should render gene_names', () => {
    const wrapper = shallow(ColumnConfiguration.gene_names.render(data));
    expect(wrapper).toMatchSnapshot();
  });

  test('should render organism', () => {
    const wrapper = shallow(ColumnConfiguration.organism.render(data));
    expect(wrapper).toMatchSnapshot();
  });
});

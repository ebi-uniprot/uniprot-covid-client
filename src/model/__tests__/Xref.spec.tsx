import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import XRef from '../XRef';
import data from './modelData.json';
import EntrySectionType from '../../data/EntrySection';

configure({ adapter: new Adapter() });

describe('XRef', () => {
  test('should render cross reference database for NamesAndTaxonomy section', () => {
    const wrapper = shallow(
      <XRef data={data} section={EntrySectionType.Expression} />
    );
    expect(wrapper.debug()).toMatchSnapshot();
  });
  test('should render cross reference database for FamilyAndDomains section', () => {
    const wrapper = shallow(
      <XRef data={data} section={EntrySectionType.FamilyAndDomains} />
    );
    expect(wrapper.debug()).toMatchSnapshot();
  });
  test('should render cross reference database for Function section', () => {
    const wrapper = shallow(
      <XRef data={data} section={EntrySectionType.Function} />
    );
    expect(wrapper.debug()).toMatchSnapshot();
  });
  test('should render cross reference database for Interaction section', () => {
    const wrapper = shallow(
      <XRef data={data} section={EntrySectionType.Interaction} />
    );
    expect(wrapper.debug()).toMatchSnapshot();
  });
  test('should render cross reference database for NamesAndTaxonomy section', () => {
    const wrapper = shallow(
      <XRef data={data} section={EntrySectionType.NamesAndTaxonomy} />
    );
    expect(wrapper.debug()).toMatchSnapshot();
  });
  test('should render cross reference database for PathologyOrBioTech section', () => {
    const wrapper = shallow(
      <XRef data={data} section={EntrySectionType.PathologyOrBioTech} />
    );
    expect(wrapper.debug()).toMatchSnapshot();
  });
  test('should render cross reference database for ProteinProcessing section', () => {
    const wrapper = shallow(
      <XRef data={data} section={EntrySectionType.ProteinProcessing} />
    );
    expect(wrapper.debug()).toMatchSnapshot();
  });
  test('should render cross reference database for Sequence section', () => {
    const wrapper = shallow(
      <XRef data={data} section={EntrySectionType.Sequence} />
    );
    expect(wrapper.debug()).toMatchSnapshot();
  });
  test('should render cross reference database for Structure section', () => {
    const wrapper = shallow(
      <XRef data={data} section={EntrySectionType.Structure} />
    );
    expect(wrapper.debug()).toMatchSnapshot();
  });
});

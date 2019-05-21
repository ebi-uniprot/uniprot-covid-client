import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { KeywordItem, KeywordList, Keyword } from '../Keyword';
import data from './modelData.json';
import EntrySectionType from '../types/EntrySection';

configure({ adapter: new Adapter() });

describe('Keyword', () => {
  for (const section in EntrySectionType) {
    test(`should render for ${section} section`, () => {
      const wrapper = shallow(
        <Keyword data={data} section={section as EntrySectionType} />
      );
      expect(wrapper.debug()).toMatchSnapshot();
    });
  }
});

describe('KeywordList', () => {
  test('should render for database category GENOME and Ensembl', () => {
    const { keywords } = data;
    const wrapper = shallow(<KeywordList keywords={keywords} />);
    expect(wrapper.debug()).toMatchSnapshot();
  });
});

describe('KeywordItem', () => {
  const { keywords } = data;
  for (const keyword of keywords) {
    test('should render for database Ensembl', () => {
      const wrapper = shallow(
        <KeywordItem id={keyword.id} value={keyword.value} />
      );
      expect(wrapper.debug()).toMatchSnapshot();
    });
  }
});

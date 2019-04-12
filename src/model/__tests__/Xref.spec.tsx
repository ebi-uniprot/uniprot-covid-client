import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { XRef, XRefItem, XRefList, XRefCategoryTable } from '../XRef';
import data from './modelData.json';
import EntrySectionType from '../../model/types/EntrySection';
import { Database, DatabaseCategory } from '../types/databaseTypes';

configure({ adapter: new Adapter() });

describe('XRef', () => {
  for (const section in EntrySectionType) {
    test(`should render for ${section} section`, () => {
      const wrapper = shallow(
        <XRef data={data} section={section as EntrySectionType} />
      );
      expect(wrapper.debug()).toMatchSnapshot();
    });
  }
});

describe('XRefCategoryTable', () => {
  test('should render for database category GENOME and Ensembl', () => {
    const { databaseCrossReferences, primaryAccession } = data;
    const wrapper = shallow(
      <XRefCategoryTable
        key={1}
        databaseCategory={DatabaseCategory.GENOME}
        databases={[Database.Ensembl]}
        xRefData={databaseCrossReferences}
        accession={primaryAccession}
      />
    );
    expect(wrapper.debug()).toMatchSnapshot();
  });
});

describe('XRefList', () => {
  test('should render for database Ensembl', () => {
    const { databaseCrossReferences, primaryAccession } = data;
    const wrapper = shallow(
      <XRefList
        key={1}
        database={Database.Ensembl}
        xRefData={databaseCrossReferences}
        accession={primaryAccession}
      />
    );
    expect(wrapper.debug()).toMatchSnapshot();
  });
});

describe('XRefItem', () => {
  test('should render', () => {
    const { databaseCrossReferences, primaryAccession } = data;
    const wrapper = shallow(
      <XRefItem
        xRefEntry={databaseCrossReferences[0]}
        accession={primaryAccession}
      />
    );
    expect(wrapper.debug()).toMatchSnapshot();
  });
});

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import XRef from '../XRef';
import data from './modelData.json';
import EntrySectionType from '../../model/types/EntrySection';

configure({ adapter: new Adapter() });

describe('XRef', () => {
  for (const section in EntrySectionType) {
    test(`should render cross reference database for ${section} section`, () => {
      const wrapper = shallow(
        <XRef data={data} section={section as EntrySectionType} />
      );
      expect(wrapper.debug()).toMatchSnapshot();
    });
  }
});

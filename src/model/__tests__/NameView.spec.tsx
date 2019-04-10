import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NameView from '../NameView';

configure({ adapter: new Adapter() });

describe('NameView component', () => {
  test('should render', () => {
    const alternativeNames = ['name1', 'name2', 'name3'];
    const wrapper = shallow(
      <NameView
        name="Name"
        shortName="Short Name"
        alternativeNames={alternativeNames}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});

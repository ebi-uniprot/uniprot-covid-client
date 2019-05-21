import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { CatalyticActivityView } from '../CatalyticActivityView';
import data from './modelData.json';

configure({ adapter: new Adapter() });

describe('Catalytic activity', () => {
  test('should render catalytic activity', () => {
    const wrapper = shallow(<CatalyticActivityView data={data} />);
    expect(wrapper).toMatchSnapshot();
  });
});

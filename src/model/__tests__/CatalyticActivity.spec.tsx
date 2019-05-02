import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { CatalyticActivity } from '../CatalyticActivity';
import data from './modelData.json';

jest.mock('uuid/v1', () => () => 0);
configure({ adapter: new Adapter() });

describe('Catalytic activity', () => {
  test('should render catalytic activity', () => {
    const wrapper = shallow(<CatalyticActivity data={data} />);
    expect(wrapper).toMatchSnapshot();
  });
});

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { FreeText, FreeTextType } from '../FreeText';
import data from './modelData.json';

jest.mock('uuid/v1', () => () => 0);
configure({ adapter: new Adapter() });

describe('FreeText component', () => {
  test('should render free text CC', () => {
    const wrapper = shallow(
      <FreeText data={data} type={FreeTextType.DISRUPTION_PHENOTYPE} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});

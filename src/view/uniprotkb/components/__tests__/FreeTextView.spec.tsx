import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { FreeText } from '../FreeText';
import { CommentType } from '../../../../model/types/commentType';
import data from './modelData.json';

configure({ adapter: new Adapter() });

describe('FreeText component', () => {
  test('should render free text CC', () => {
    const wrapper = shallow(
      <FreeText data={data} type={CommentType.DISRUPTION_PHENOTYPE} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});

import React from 'react';
import { shallow, configure } from 'enzyme';
// import { v1 } from 'uuid';
import Adapter from 'enzyme-adapter-react-16';
import CommentType from '../types/commentType';
import data from './modelData.json';
import {
  DiseaseInvolvement,
  DiseaseInvolvementEntry,
  DiseaseCommentType,
} from '../DiseaseInvolvement';

configure({ adapter: new Adapter() });

describe('DiseaseInvolvement', () => {
  test('should render DiseaseInvolvement', () => {
    const wrapper = shallow(<DiseaseInvolvement data={data} />);
    expect(wrapper).toMatchSnapshot();
  });
  test('should render DiseaseInvolvementEntry', () => {
    const { comments } = data;
    const diseaseComments = comments.filter(
      (comment: DiseaseCommentType) =>
        comment.commentType === CommentType.DISEASE
    );
    diseaseComments.forEach(comment => {
      const wrapper = shallow(
        <DiseaseInvolvementEntry key={0} comment={comment} />
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});

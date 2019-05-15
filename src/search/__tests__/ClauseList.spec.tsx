import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ClauseList from '../ClauseList';
import { createEmptyClause } from '../utils/clause';

configure({ adapter: new Adapter() });

let wrapper;
let props;

describe('ClauseList component', () => {
  beforeEach(() => {
    props = {
      clauses: [createEmptyClause()],
      searchTerms: {
        data: [],
      },
      evidences: {
        go: {
          data: [],
          isFetching: false,
        },
        annotation: {
          data: [],
          isFetching: false,
        },
      },
      handleRemoveClause: jest.fn(),
    };

    wrapper = shallow(<ClauseList {...props} />);
  });

  test('should remove a clause', () => {
    wrapper.find('.button-remove').simulate('click');
    expect(props.handleRemoveClause).toHaveBeenCalled();
  });

  test('should render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

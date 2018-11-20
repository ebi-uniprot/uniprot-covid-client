import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ClauseList from '../../../src/ui/components/ClauseList';
import { createEmptyClause } from '../../../src/ui/utils';

jest.mock('uuid/v1', () => {
  let value = 0;
  return () => {
    value += 1;
    return value;
  };
});

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

  test('should submit a query', () => {
    wrapper.find('.button-remove').simulate('click');
    expect(props.handleRemoveClause).toHaveBeenCalled();
  });

  test('should render', () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });
});

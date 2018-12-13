import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createEmptyClause } from '../utils/clause';
import { Search } from '../SearchContainer';

configure({ adapter: new Adapter() });

let wrapper;
let props;

describe('Search shallow components', () => {
  beforeEach(() => {
    props = {
      dispatchAddClause: jest.fn(),
      dispatchSubmitQuery: jest.fn(),
      dispatchFetchSearchTerms: jest.fn(),
      dispatchfetchEvidencesIfNeeded: jest.fn(),
      dispatchCopyQueryClausesToSearch: jest.fn(),
      history: {
        push: jest.fn(),
      },
      clauses: [...Array(4)].map(() => createEmptyClause()),
      namespace: 'UniProtKB',
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
    };
    wrapper = shallow(<Search {...props} />);
  });

  test('should call to get search terms', () => {
    expect(props.dispatchFetchSearchTerms).toHaveBeenCalled();
  });

  test('should call to get evidences', () => {
    expect(props.dispatchfetchEvidencesIfNeeded).toHaveBeenCalledWith('go');
    expect(props.dispatchfetchEvidencesIfNeeded).toHaveBeenCalledWith('annotation');
  });
});

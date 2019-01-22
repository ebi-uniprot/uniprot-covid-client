import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createEmptyClause } from '../utils/clause';
import AdvancedSearch from '../AdvancedSearch';

configure({ adapter: new Adapter() });

let wrapper;
let props;

describe('AdvancedSearch shallow components', () => {
  beforeEach(() => {
    props = {
      dispatchAddClause: jest.fn(),
      handleAdvancedSubmitClick: jest.fn(),
      dispatchFetchSearchTermsIfNeeded: jest.fn(),
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
    wrapper = shallow(<AdvancedSearch {...props} />);
  });

  test('should render', () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });

  test('should call to get search terms', () => {
    expect(props.dispatchFetchSearchTermsIfNeeded).toHaveBeenCalled();
  });

  test('should call to get evidences', () => {
    expect(props.dispatchfetchEvidencesIfNeeded).toHaveBeenCalledWith('go');
    expect(props.dispatchfetchEvidencesIfNeeded).toHaveBeenCalledWith('annotation');
  });

  test('should add field rows', () => {
    wrapper.find('#add-field').simulate('click');
    expect(props.dispatchAddClause).toHaveBeenCalled();
  });

  test('should submit a query', () => {
    wrapper.find('#submit-query').simulate('click');
    expect(props.handleAdvancedSubmitClick).toHaveBeenCalled();
  });
});

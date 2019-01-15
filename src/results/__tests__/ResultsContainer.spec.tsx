import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Results } from '../ResultsContainer';

configure({ adapter: new Adapter() });

let wrapper;
let props;

describe('Results component', () => {
  beforeEach(() => {
    props = {
      queryString: '',
      columns: [],
      selectedFacets: {},
      results: [],
      facets: [],
      isFetching: false,
      dispatchFetchResults: jest.fn(),
      dispatchAddFacetToQuery: jest.fn(),
      location: {
        search: '',
      },
      history: {
        push: jest.fn(),
        replace: jest.fn(),
      },
    };
    wrapper = shallow(<Results {...props} />);
  });

  test('should call to get results', () => {
    expect(props.dispatchFetchResults).toHaveBeenCalled();
  });

  test('should call to get results when query is changed', () => {
    wrapper.setProps({ queryString: 'query' });
    expect(props.dispatchFetchResults).toHaveBeenCalledTimes(2);
  });
});

import React from 'react';
import '@babel/polyfill';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Results } from '../ResultsContainer';
import { Namespace } from '../../search/types/searchTypes';

configure({ adapter: new Adapter() });

let wrapper;
let props;

const facetString = 'f1:v1,f2:v2';
const facetArray = [{ name: 'f1', value: 'v1' }, { name: 'f2', value: 'v2' }];

describe('Results component', () => {
  beforeEach(() => {
    props = {
      columns: [],
      results: [],
      isFetching: false,
      namespace: Namespace.uniprotkb,
      dispatchFetchBatchOfResultsIfNeeded: jest.fn(),
      dispatchClearResults: jest.fn(),
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
    expect(props.dispatchFetchBatchOfResultsIfNeeded).toHaveBeenCalled();
  });

  test('should fetch query', () => {
    wrapper.setProps({ location: { search: 'query=cdc8' } });
    expect(props.dispatchFetchBatchOfResultsIfNeeded).toHaveBeenCalledTimes(2);
  });

  test('should get the facets as a string', () => {
    expect(wrapper.instance().facetsAsString(facetArray)).toBe(
      `&facets=${facetString}`
    );
  });

  test('should get the facets as an array', () => {
    expect(wrapper.instance().facetsAsArray(facetString)).toEqual(facetArray);
  });

  test('should add facet', () => {
    wrapper.instance().addFacet('blah', 'blah');
    expect(props.history.push).toHaveBeenCalledWith({
      pathname: '/uniprotkb',
      search: 'query=&facets=blah:blah',
    });
  });

  test('should remove a facet', () => {
    wrapper.setProps({
      location: { search: 'query=cdc8&facets=blah:blah,blah2:blah2' },
    });
    wrapper.instance().removeFacet('blah', 'blah');
    expect(props.history.push).toHaveBeenCalledWith({
      pathname: '/uniprotkb',
      search: 'query=cdc8&facets=blah2:blah2',
    });
  });

  test('should remove last facet', () => {
    wrapper.setProps({ location: { search: 'query=cdc8&facets=blah:blah' } });
    wrapper.instance().removeFacet('blah', 'blah');
    expect(props.history.push).toHaveBeenCalledWith({
      pathname: '/uniprotkb',
      search: 'query=cdc8',
    });
  });
});

import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { cleanup, fireEvent } from '@testing-library/react';
import ResultsContainer from '../ResultsContainer';
import { act } from 'react-dom/test-utils';
import results from '../../__mockData__/results.json';
import noResults from '../../__mockData__/noResults.json';
import entry from '../../__mockData__/swissprot_entry.json';
import searchInitialState from '../../search/state/searchInitialState';
import resultsInitialState, { ViewMode } from '../state/resultsInitialState';
import renderWithRedux from '../../__testHelpers__/renderWithRedux';

const mock = new MockAdapter(axios);

mock.onGet(/.+noresult/).reply(200, noResults, { 'x-total-records': 25 });
mock
  .onGet(/\/uniprotkb\/search/)
  .reply(200, results, { 'x-total-records': 25 });
mock.onGet(/\/uniprotkb\//).reply(200, entry);

describe('Results component', () => {
  afterEach(cleanup);

  test('should call to get results', async () => {
    const getSpy = jest.spyOn(axios, 'get');
    await act(async () =>
      renderWithRedux(<ResultsContainer />, { route: '/uniprotkb?query=blah' })
    );
    expect(getSpy).toHaveBeenCalled();
  });

  test('should select/deselect a facet', async () => {
    await act(async () => {
      const { findByText, history } = renderWithRedux(<ResultsContainer />, {
        route: '/uniprotkb?query=blah',
      });
      let unreviewedButton = await findByText('Unreviewed (TrEMBL) (455)');
      fireEvent.click(unreviewedButton);
      expect(history.location.search).toEqual(
        '?query=blah&facets=reviewed:false'
      );
      unreviewedButton = await findByText('Unreviewed (TrEMBL) (455)');
      fireEvent.click(unreviewedButton);
      expect(history.location.search).toEqual('?query=blah');
    });
  });

  test('should toggle card view to table', async () => {
    await act(async () => {
      const state = {
        query: searchInitialState,
        results: {
          ...resultsInitialState,
          viewMode: ViewMode.TABLE,
          results: {
            data: [{}],
          },
        },
      };
      const { container, findByTestId, findByText } = renderWithRedux(
        <ResultsContainer />,
        {
          initialState: state,
          route: '/uniprotkb?query=blah',
        }
      );
      const toggle = await findByTestId('table-card-toggle');
      expect(container.querySelector('div')).toBeNull;
      fireEvent.click(toggle);
      const table = await findByText('Entry');
      expect(table).toBeTruthy;
    });
  });

  test('should set sorting', async () => {
    const state = {
      query: searchInitialState,
      results: { ...resultsInitialState, viewMode: ViewMode.TABLE },
    };
    const { getByText, history, findByText } = renderWithRedux(
      <ResultsContainer />,
      {
        initialState: state,
        route: '/uniprotkb?query=blah',
      }
    );
    let columnHeader = await findByText('Entry');
    fireEvent.click(columnHeader);
    expect(history.location.search).toBe('?query=blah&sort=accession');
    columnHeader = await findByText('Entry');
    fireEvent.click(columnHeader);
    expect(history.location.search).toBe(
      '?query=blah&sort=accession&dir=ascend'
    );
    columnHeader = await findByText('Entry');
    fireEvent.click(columnHeader);
    expect(history.location.search).toBe(
      '?query=blah&sort=accession&dir=descend'
    );
  });

  test('should display no results page', async () => {
    const state = {
      query: searchInitialState,
      results: { ...resultsInitialState },
    };

    const { findByTestId } = renderWithRedux(<ResultsContainer />, {
      initialState: state,
      route: '/uniprotkb?query=noresult',
    });

    const page = await findByTestId('no-results-page');
    expect(page).toBeTruthy();
  });
});

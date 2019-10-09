import React from 'react';
import axios from 'axios';
import 'core-js/stable';
import { cleanup, waitForElement, fireEvent } from '@testing-library/react';
import ResultsContainer from '../ResultsContainer';
import searchInitialState from '../../search/state/searchInitialState';
import resultsInitialState, { ViewMode } from '../state/resultsInitialState';
import renderWithRedux from '../../__tests__/renderWithRedux.spec';

jest.mock('axios');

axios.get.mockResolvedValue({
  headers: {
    'x-totalrecords': 1,
  },
  data: {
    facets: [
      {
        label: 'Status',
        name: 'reviewed',
        allowMultipleSelection: false,
        values: [
          {
            label: 'Unreviewed (TrEMBL)',
            value: 'false',
            count: 68526,
          },
          {
            label: 'Reviewed (Swiss-Prot)',
            value: 'true',
            count: 4631,
          },
        ],
      },
    ],
    results: [
      {
        entryType: 'Swiss-Prot',
        primaryAccession: 'O00311',
        uniProtId: 'CDC7_HUMAN',
        annotationScore: 12.45,
        proteinDescription: {
          recommendedName: {
            fullName: {
              value: 'Full protein name',
            },
          },
        },
        sequence: ['A', 'B', 'C'],
      },
    ],
  },
});

describe('Results component', () => {
  afterEach(cleanup);

  test('should call to get results', () => {
    renderWithRedux(<ResultsContainer />, { route: '/uniprotkb?query=blah' });
    expect(axios.get).toHaveBeenCalled();
  });

  test('should select a facet', async () => {
    const { getByText, history } = renderWithRedux(<ResultsContainer />, {
      route: '/uniprotkb?query=blah',
    });
    const unreviewedButton = await waitForElement(() =>
      getByText('Unreviewed (TrEMBL) (68,526)')
    );
    fireEvent.click(unreviewedButton);
    expect(history.location.search).toEqual(
      '?query=blah&facets=reviewed:false'
    );
  });

  test('should deselect a facet', async () => {
    const { getByText, history } = renderWithRedux(<ResultsContainer />, {
      route: '/uniprotkb?query=blah',
    });
    let unreviewedButton = await waitForElement(() =>
      getByText('Unreviewed (TrEMBL) (68,526)')
    );
    fireEvent.click(unreviewedButton);
    unreviewedButton = await waitForElement(() =>
      getByText('Unreviewed (TrEMBL) (68,526)')
    );
    fireEvent.click(unreviewedButton);
    expect(history.location.search).toEqual('?query=blah');
  });

  test('should toggle card view to table', async () => {
    const { container, getByTestId, getByText } = renderWithRedux(
      <ResultsContainer />,
      { route: '/uniprotkb?query=blah' }
    );
    const toggle = await waitForElement(() => getByTestId('table-card-toggle'));
    expect(container.querySelector('div')).toBeNull;
    fireEvent.click(toggle);
    const table = await waitForElement(() => getByText('Entry'));
    expect(table).toBeTruthy;
  });

  test('should handle selection', async () => {
    const state = {
      query: searchInitialState,
      results: { ...resultsInitialState, viewMode: ViewMode.TABLE },
    };
    const { container, debug, getByText } = renderWithRedux(
      <ResultsContainer />,
      { initialState: state, route: '/uniprotkb?query=blah' }
    );
    const checkbox = await waitForElement(() =>
      container.querySelector('input[type=checkbox]')
    );
    // As the checkbox selection currently has no effect on the
    // UI we can't test much at the moment
    expect(checkbox.checked).toBeFalsy;
    fireEvent.click(checkbox); // de-select
    expect(checkbox.checked).toBeTruthy;
  });

  test('should set sorting', async () => {
    const state = {
      query: searchInitialState,
      results: { ...resultsInitialState, viewMode: ViewMode.TABLE },
    };
    const { getByText, history } = renderWithRedux(<ResultsContainer />, {
      initialState: state,
      route: '/uniprotkb?query=blah',
    });
    let columnHeader = await waitForElement(() => getByText('Entry'));
    fireEvent.click(columnHeader);
    expect(history.location.search).toBe('?query=blah&sort=accession');
    columnHeader = await waitForElement(() => getByText('Entry'));
    fireEvent.click(columnHeader);
    expect(history.location.search).toBe(
      '?query=blah&sort=accession&dir=ascend'
    );
    columnHeader = await waitForElement(() => getByText('Entry'));
    fireEvent.click(columnHeader);
    expect(history.location.search).toBe(
      '?query=blah&sort=accession&dir=descend'
    );
  });
});

import React from 'react';
import axios from 'axios';
import DownloadContainer, {
  replaceExcelWithTsv,
  compareDownloadUrlsDisregardSize,
} from '../DownloadContainer';
import { createMemoryHistory } from 'history';
import { waitForElement } from '@testing-library/react';
import initialState from '../../state/initialState';
import { fireEvent } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import renderWithRedux from '../../__testHelpers__/renderWithRedux';
import mockDownloadApi from '../../__mockData__/DownloadData';
import * as resultsActions from '../state/resultsActions';
import { FileFormat } from '../types/resultsTypes';
import apiUrls from '../../utils/apiUrls';

const mock = new MockAdapter(axios);
mock.onGet(mockDownloadApi.request).reply(200, mockDownloadApi.response);

describe('replaceExcelWithTsv', () => {
  test('should replace excel file format with tsv', () => {
    expect(replaceExcelWithTsv(FileFormat.excel)).toEqual(FileFormat.tsv);
  });

  test('should not replace text file format with tsv', () => {
    expect(replaceExcelWithTsv(FileFormat.text)).toEqual(FileFormat.text);
  });
});

describe('compareDownloadUrlsDisregardSize', () => {
  test('should return true for urls which are equal with the exception of the size parameter', () => {
    const url = size => `https://some/resource?parameter=value&size=${size}`;
    expect(compareDownloadUrlsDisregardSize(url(1), url(1000))).toEqual(true);
  });
});

describe('DownloadContainer component', () => {
  let renderedWithRedux, goBack, history, windowSpy;
  const location = {
    pathname: '/download',
    state: {
      query: 'nod2',
      selectedFacets: [],
      selectedEntries: ['Q9HC29', 'O43353', 'Q3KP66'],
    },
  };
  beforeEach(() => {
    history = createMemoryHistory();
    history.replace(location);
    renderedWithRedux = renderWithRedux(
      <DownloadContainer totalNumberResults={1000} />,
      {
        initialState: {
          ...initialState,
          results: {
            ...initialState.results,
            totalNumberResults: 1000,
          },
        },
        history,
      }
    );
    goBack = jest.spyOn(history, 'goBack');
    windowSpy = jest.spyOn(global, 'window', 'get');
  });

  test('should go back and not call updateTableColumns action when cancel button is pressed', () => {
    const { getByText } = renderedWithRedux;
    const cancelButton = getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(goBack).toHaveBeenCalled();
  });

  test('should handle download button by calling download endpoint and then going back', () => {
    const { getAllByText } = renderedWithRedux;
    const downloadButton = getAllByText('Download')[1];
    fireEvent.click(downloadButton);
    // A new tab should have been opened to start the download
    expect(windowSpy).toHaveBeenCalled();
    expect(goBack).toHaveBeenCalled();
  });

  // test('should handle preview button click by calling endpoint with a limit of 10', async () => {
  //   console.log(initialState);
  //   const { getByTestId, getByText } = renderedWithRedux;
  //   const previewButton = getByText('Preview 10');
  //   fireEvent.click(previewButton);
  //   const preview = await waitForElement(() => getByTestId('download-preview'));
  //   expect(preview.textContent).toEqual(mockDownloadApi.response);
  // });

  // test('should handle preview button click by calling endpoint with a limit pf', () => {
  //   const { getByText } = renderedWithRedux;
  //   const cancelButton = getByText('Cancel');
  //   fireEvent.click(cancelButton);
  //   expect(goBack).toHaveBeenCalled();
  // });

  // test('should go back and call updateTableColumns action when customise table form is submitted', () => {
  //   const { getByTestId, history } = renderedWithRedux;
  //   const form = getByTestId('customise-table-form');
  //   fireEvent.submit(form);
  //   expect(goBack).toHaveBeenCalled();
  //   expect(updateTableColumns).toHaveBeenCalled();
  // });
});

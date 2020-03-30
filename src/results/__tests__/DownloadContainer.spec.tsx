import React from 'react';
import axios from 'axios';
import DownloadContainer, { getPreviewFileFormat } from '../DownloadContainer';
import { createMemoryHistory } from 'history';
import { waitForElement } from '@testing-library/react';
import initialState from '../../state/initialState';
import { fireEvent } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import renderWithRedux from '../../__testHelpers__/renderWithRedux';
import mockDownloadApi from '../../__mockData__/DownloadData';
import mockResultFieldsApi from '../../__mockData__/ResultFieldsData';
import * as resultsActions from '../state/resultsActions';
import '@testing-library/jest-dom/extend-expect';
import { FileFormat } from '../types/resultsTypes';

const mock = new MockAdapter(axios);
mock
  .onGet(mockDownloadApi.request)
  .reply(200, mockDownloadApi.response, mockDownloadApi.headers);
mock
  .onGet(mockResultFieldsApi.request)
  .reply(200, mockResultFieldsApi.response);

describe('getPreviewFileFormat', () => {
  test('should replace excel file format with tsv', () => {
    expect(getPreviewFileFormat(FileFormat.excel)).toEqual(FileFormat.tsv);
  });

  test('should not replace text file format with tsv', () => {
    expect(getPreviewFileFormat(FileFormat.text)).toEqual(FileFormat.text);
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
    renderedWithRedux = renderWithRedux(<DownloadContainer />, {
      initialState: {
        ...initialState,
        results: {
          ...initialState.results,
          totalNumberResults: 1000,
        },
      },
      history,
    });
    goBack = jest.spyOn(history, 'goBack');
    windowSpy = jest.spyOn(global, 'window', 'get');
  });

  test('should go back and not call updateTableColumns action when cancel button is pressed', () => {
    const { getByText } = renderedWithRedux;
    const cancelButton = getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(goBack).toHaveBeenCalled();
  });

  test('should handle download button by opening new tab and then going back', () => {
    const { getAllByText } = renderedWithRedux;
    const downloadButton = getAllByText('Download')[1];
    fireEvent.click(downloadButton);
    expect(windowSpy).toHaveBeenCalled();
    expect(goBack).toHaveBeenCalled();
  });

  test('should handle preview button click', async () => {
    const { getByTestId, getByText } = renderedWithRedux;
    const previewButton = getByText('Preview 10');
    fireEvent.click(previewButton);
    const preview = await waitForElement(() => getByTestId('download-preview'));
    expect(preview.textContent).toEqual(mockDownloadApi.response);
  });

  test('should  show column selection component when excel or tsv file type is selected and otherwise hide it', async () => {
    const { getByTestId, queryByText } = renderedWithRedux;
    const formatSelect = getByTestId('file-format-select');
    [
      [FileFormat.excel, true],
      [FileFormat.xml, false],
      [FileFormat.tsv, true],
    ].forEach(async (value, columnSelect) => {
      fireEvent.change(formatSelect, { target: { value } });
      const customise = await waitForElement(() =>
        queryByText('Customize data')
      );
      const expectCustomise = expect(customise);
      columnSelect
        ? expectCustomise.toBeInTheDocument()
        : expectCustomise.not.toBeInTheDocument();
    });
  });
});

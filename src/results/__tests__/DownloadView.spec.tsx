import React from 'react';
import { fireEvent } from '@testing-library/react';
import DownloadView from '../DownloadView';
import { defaultTableColumns } from '../../results/state/resultsInitialState';
import { FileFormat } from '../types/resultsTypes';
import renderWithRedux from '../../__testHelpers__/renderWithRedux';
import initialState from '../../state/initialState';

describe('DownloadView component', () => {
  let props, renderedWithRedux;
  beforeEach(() => {
    props = {
      onSubmit: jest.fn(),
      onCancel: jest.fn(),
      onPreview: jest.fn(),
      selectedColumns: defaultTableColumns,
      downloadAll: true,
      fileFormat: FileFormat.tsv,
      compressed: true,
      preview: '',
      loadingPreview: false,
      onSelectedColumnsChange: jest.fn(),
      onDownloadAllChange: jest.fn(),
      onFileFormatChange: jest.fn(),
      onCompressedChange: jest.fn(),
      nSelectedEntries: 10,
      totalNumberResults: 100,
    };
    renderedWithRedux = renderWithRedux(<DownloadView {...props} />, {
      initialState,
      location: '/download',
    });
  });

  test('should render', () => {
    const { asFragment } = renderedWithRedux;
    expect(asFragment()).toMatchSnapshot();
  });

  test('should call onSubmit when submit button is clicked', () => {
    const { getByTestId } = renderedWithRedux;
    const form = getByTestId('download-form');
    fireEvent.submit(form);
    expect(props.onSubmit).toHaveBeenCalled();
  });

  test('should call onCancel when cancel button is clicked', () => {
    const { getByText } = renderedWithRedux;
    const cancelButton = getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(props.onCancel).toHaveBeenCalled();
  });

  test('should call onPreview when preview button is clicked', () => {
    const { getByText } = renderedWithRedux;
    const previewButton = getByText('Preview 10');
    fireEvent.click(previewButton);
    expect(props.onPreview).toHaveBeenCalled();
  });
  test('should call onDownloadAllChange when download selected radio is selected', () => {
    const { getByLabelText } = renderedWithRedux;
    const radio = getByLabelText(/Download selected/);
    fireEvent.click(radio);
    expect(props.onDownloadAllChange).toHaveBeenCalled();
  });

  test('should call onFileFormatChange when file format select is changed', () => {
    const { getByTestId, queryByText } = renderedWithRedux;
    const formatSelect = getByTestId('file-format-select');
    fireEvent.change(formatSelect, { target: { value: FileFormat.gff } });
    expect(props.onFileFormatChange).toHaveBeenCalled();
  });

  test('should call onCompressedChange when no choice is clicked', () => {
    const { getByText } = renderedWithRedux;
    const radio = getByText(/No/);
    fireEvent.click(radio);
    expect(props.onCompressedChange).toHaveBeenCalled();
  });
});

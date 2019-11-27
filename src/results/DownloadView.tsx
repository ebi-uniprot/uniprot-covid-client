import React, { Fragment } from 'react';
import { Loader } from 'franklin-sites';
import ColumnSelectContainer from './ColumnSelectContainer';
import { FileFormat, fileFormatsWithColumns } from './types/resultsTypes';
import { Column } from '../model/types/ColumnTypes';
import './styles/Download.scss';

type DownloadViewProps = {
  selectedColumns: Column[];
  onChange: (columndIds: Column[]) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
};

const DownloadView: React.FC<DownloadViewProps> = ({
  onSubmit,
  onCancel,
  onPreview,
  selectedColumns,
  downloadAll,
  fileFormat,
  compressed,
  preview,
  loadingPreview,
  onSelectedColumnsChange,
  onDownloadAllChange,
  onFileFormatChange,
  onCompressedChange,
}) => {
  const fileFormatHasColumns = fileFormatsWithColumns.includes(fileFormat);
  let previewNode;
  if (fileFormatHasColumns) {
    if (loadingPreview) {
      previewNode = <Loader />;
    }
    if (preview && preview.length) {
      previewNode = (
        <div style={{ margin: '1rem' }}>
          <h4>Preview</h4>
          <div
            style={{
              overflow: 'hidden',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              border: '1px solid black',
              padding: '0.5rem',
            }}
          >
            <pre
              style={{
                overflowY: 'auto',
              }}
            >
              {preview}
            </pre>
          </div>
        </div>
      );
    }
  }

  return (
    <Fragment>
      <form
        onSubmit={onSubmit}
        className="download"
        data-testid="customise-table-form"
      >
        <h3>Download</h3>
        <label>
          <input
            type="radio"
            name="data-selection"
            value="false"
            checked={!downloadAll}
            onChange={onDownloadAllChange}
          />
          Download selected
        </label>
        <label>
          <input
            type="radio"
            name="data-selection"
            value="true"
            checked={downloadAll}
            onChange={onDownloadAllChange}
          />
          Download all
        </label>
        <fieldset>
          <legend>Format</legend>
          <select
            id="file-format-select"
            value={fileFormat}
            onChange={onFileFormatChange}
          >
            {Object.values(FileFormat).map(format => (
              <option value={format} key={format}>
                {format}
              </option>
            ))}
          </select>
        </fieldset>
        <fieldset>
          <legend>Compressed</legend>
          <label>
            <input
              type="radio"
              name="compressed"
              value="true"
              checked={compressed}
              onChange={onCompressedChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="compressed"
              value="false"
              checked={!compressed}
              onChange={onCompressedChange}
            />
            No
          </label>
        </fieldset>
        {fileFormatHasColumns && (
          <ColumnSelectContainer
            onChange={onSelectedColumnsChange}
            selectedColumns={selectedColumns}
          />
        )}
        <div className="button-group customise-table--cancel-submit-buttons">
          <button
            className="button secondary"
            type="button"
            onClick={onCancel}
            data-testid="customise-table-cancel-button"
          >
            Cancel
          </button>
          {fileFormatHasColumns && (
            <button
              className="button secondary"
              type="button"
              onClick={onPreview}
              data-testid="customise-table-cancel-button"
            >
              Preview
            </button>
          )}
          <button className="button" type="submit">
            Download
          </button>
        </div>
      </form>
      {previewNode}
    </Fragment>
  );
};

export default DownloadView;

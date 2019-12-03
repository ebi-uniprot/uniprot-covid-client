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
  nSelectedEntries,
  nResults,
}) => {
  let previewNode;
  if (loadingPreview) {
    previewNode = <Loader />;
  } else if (preview && preview.length) {
    previewNode = (
      <div style={{ margin: '1rem' }}>
        <h4>Preview</h4>
        <div
          style={{
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            border: '1px solid black',
            overflowX: 'auto',
            overflowY: 'auto',
          }}
        >
          <pre
            style={{
              padding: '0.5rem',
              height: '17.5rem',
            }}
          >
            {preview}
          </pre>
        </div>
      </div>
    );
  }

  const nPreview = Math.min(10, downloadAll ? nResults : nSelectedEntries);

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
            disabled={nSelectedEntries === 0}
          />
          Download selected ({nSelectedEntries})
        </label>
        <label>
          <input
            type="radio"
            name="data-selection"
            value="true"
            checked={downloadAll}
            onChange={onDownloadAllChange}
          />
          Download all ({nResults})
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
        {fileFormatsWithColumns.includes(fileFormat) && (
          <fieldset>
            <legend>Customise data</legend>
            <ColumnSelectContainer
              onChange={onSelectedColumnsChange}
              selectedColumns={selectedColumns}
            />
          </fieldset>
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
          <button
            className="button secondary"
            type="button"
            onClick={() => onPreview(nPreview)}
            data-testid="customise-table-cancel-button"
          >
            Preview {nPreview}
          </button>
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

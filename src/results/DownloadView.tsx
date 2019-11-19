import React from 'react';
import ColumnSelectContainer from './ColumnSelectContainer';
import { FileFormat } from './types/resultsTypes';
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
  selectedColumns,
  downloadAll,
  fileFormat,
  compressed,
  onSelectedColumnsChange,
  onDownloadAllChange,
  onFileFormatChange,
  onCompressedChange,
}) => (
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
    {[FileFormat.tsv, FileFormat.excel].includes(fileFormat) && (
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
      <button
        className="button secondary"
        type="button"
        onClick={onCancel}
        data-testid="customise-table-cancel-button"
      >
        Preview
      </button>
      <button className="button" type="submit">
        Save
      </button>
    </div>
  </form>
);

export default DownloadView;

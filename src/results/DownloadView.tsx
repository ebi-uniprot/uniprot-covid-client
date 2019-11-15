import React from 'react';
import ColumnSelectContainer from './ColumnSelectContainer';
import { Column } from '../model/types/ColumnTypes';
import './styles/CustomiseTable.scss';

type DownloadViewProps = {
  selectedColumns: Column[];
  onChange: (columndIds: Column[]) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
};

const DownloadView: React.FC<DownloadViewProps> = ({
  selectedColumns,
  onChange,
  onSubmit,
  onCancel,
}) => (
  <form
    onSubmit={onSubmit}
    className="customise-table"
    data-testid="customise-table-form"
  >
    <h1>Download</h1>
    <ColumnSelectContainer
      onChange={onChange}
      selectedColumns={selectedColumns}
    />
    <div className="button-group customise-table--cancel-submit-buttons">
      <button
        className="button secondary"
        type="button"
        onClick={onCancel}
        data-testid="customise-table-cancel-button"
      >
        Cancel
      </button>
      <button className="button" type="submit">
        Save
      </button>
    </div>
  </form>
);

export default DownloadView;

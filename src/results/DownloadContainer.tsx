import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { RootState, RootAction } from '../state/state-types';
import * as resultsActions from './state/resultsActions';
import DownloadView from './DownloadView';
import { Column } from '../model/types/ColumnTypes';

type DownloadTableProps = {
  tableColumns: Column[];
  updateTableColumns: (columnIds: Column[]) => void;
} & RouteComponentProps;

const Download: React.FC<DownloadTableProps> = ({
  tableColumns,
  updateTableColumns,
  history,
}) => {
  const [selectedColumns, setSelectedColumns] = useState(tableColumns);

  const handleChange = (columnIds: Column[]) => {
    setSelectedColumns(columnIds);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateTableColumns(selectedColumns);
    history.goBack();
  };

  const handleCancel = () => {
    history.goBack();
  };

  return (
    <DownloadView
      selectedColumns={selectedColumns}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
};

const mapStateToProps = (state: RootState) => ({
  tableColumns: state.results.tableColumns,
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      updateTableColumns: (tableColumns: Column[]) =>
        resultsActions.updateTableColumns(tableColumns),
    },
    dispatch
  );

const DownloadContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Download)
);

export default DownloadContainer;

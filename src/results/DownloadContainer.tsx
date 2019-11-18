import React, { useState, useReducer } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { RootState, RootAction } from '../state/state-types';
import * as resultsActions from './state/resultsActions';
import DownloadView from './DownloadView';
import { Column } from '../model/types/ColumnTypes';

export enum FileFormat {
  fastaCanonical = 'FASTA (canonical)',
  fastaCanonicalIsoform = 'FASTA (canonical & isoform)',
  tsv = 'TSV',
  excel = 'Excel',
  xml = 'XML',
  rdfXml = 'RDF/XML',
  text = 'Text',
  gff = 'GFF',
  list = 'List',
  json = 'JSON',
}

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
  const [downloadAll, setDownloadAll] = useState(true);
  const [fileFormat, setFileFormat] = useState(FileFormat.fastaCanonical);
  const [compressed, setCompressed] = useState(true);

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
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      selectedColumns={selectedColumns}
      downloadAll={downloadAll}
      fileFormat={fileFormat}
      compressed={compressed}
      onSelectedColumnsChange={setSelectedColumns}
      onDownloadAllChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setDownloadAll(e.target.value === 'true')
      }
      onFileFormatChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setFileFormat(e.target.value as FileFormat)
      }
      onCompressedChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setCompressed(e.target.value === 'true')
      }
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

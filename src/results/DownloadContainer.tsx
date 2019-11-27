import React, { useState, useReducer } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
import { RootState, RootAction } from '../state/state-types';
import DownloadView from './DownloadView';
import { Column } from '../model/types/ColumnTypes';
import { FileFormat, fileFormatToAcceptHeader } from './types/resultsTypes';
import { getDownloadUrl } from '../utils/apiUrls';

type DownloadTableProps = {
  tableColumns: Column[];
  updateTableColumns: (columnIds: Column[]) => void;
} & RouteComponentProps;

const Download: React.FC<DownloadTableProps> = ({
  tableColumns,
  history,
  location: {
    state: { query, selectedFacets, sortColumn, sortDirection },
  },
}) => {
  console.log(query, selectedFacets, sortColumn, sortDirection);
  const [selectedColumns, setSelectedColumns] = useState(tableColumns);
  const [downloadAll, setDownloadAll] = useState(true);
  const [fileFormat, setFileFormat] = useState(FileFormat.fastaCanonical);
  const [compressed, setCompressed] = useState(true);
  const [preview, setPreview] = useState({
    loading: false,
    query: '',
    selectedColumns: [],
    data: [],
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const url = getDownloadUrl(
      query,
      selectedColumns,
      selectedFacets,
      sortColumn,
      sortDirection,
      downloadAll,
      fileFormat,
      compressed
    );
    console.log(url);
    // // getQueryUrl(query, columns, selectedFacets, sortColumn, sortDirection)
    // e.preventDefault();
    // // history.goBack();
    // // curl -s -H 'accept:text/flatfile'
    // axios
    //   .get(
    //     'https://wwwdev.ebi.ac.uk/uniprot/api/uniprotkb/download?query=a4&size=1',
    //     {
    //       headers: {
    //         Accept: fileFormatToAcceptHeader.get(fileFormat),
    //       },
    //     }
    //   )
    //   .then(response => {
    //     setPreview(response.data);
    //   });
  };

  const handleCancel = () => {
    history.goBack();
  };

  const handlePreview = () => {
    const url = getDownloadUrl(
      query,
      selectedColumns,
      selectedFacets,
      sortColumn,
      sortDirection,
      downloadAll,
      FileFormat.tsv,
      compressed,
      10
    );
    setPreview({ ...preview, loading: true });
    axios
      .get(url, {
        headers: {
          Accept: fileFormatToAcceptHeader.get(FileFormat.tsv),
        },
      })
      .then(response => {
        setPreview({
          query,
          selectedColumns,
          data: response.data,
          loaded: true,
        });
      })
      .catch(() => {
        setPreview({ ...preview, loading: false });
      });
  };

  return (
    <DownloadView
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onPreview={handlePreview}
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
      preview={
        preview.query === query && preview.selectedColumns === selectedColumns
          ? preview.data
          : []
      }
      loadingPreview={preview.loading}
    />
  );
};

const mapStateToProps = (state: RootState) => ({
  tableColumns: state.results.tableColumns,
});

const DownloadContainer = withRouter(connect(mapStateToProps)(Download));

export default DownloadContainer;

import React, { useState, useEffect } from 'react';
import { DataTable, DataList, Loader } from 'franklin-sites';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import ColumnConfiguration from '../../config/ColumnConfiguration';
import { SortDirection } from '../../types/resultsTypes';
import UniProtKBCard from './UniProtKBCard';
import uniProtKbConverter, {
  UniProtkbUIModel,
  UniProtkbAPIModel,
} from '../../adapters/uniProtkbConverter';
import { ViewMode } from '../../state/resultsInitialState';
import { SortableColumn, Column } from '../../types/columnTypes';
import './styles/warning.scss';
import './styles/results-view.scss';
import {
  getParamsFromURL,
  getLocationObjForParams,
  getSortableColumnToSortColumn,
} from '../../utils/resultsUtils';
import apiUrls, { getAPIQueryUrl } from '../../config/apiUrls';
import useDataApi from '../../../shared/hooks/useDataApi';
import getNextUrlFromResponse from '../../utils/queryUtils';

type ResultsTableProps = {
  selectedEntries: string[];
  columns: Column[];
  viewMode: ViewMode;
  handleEntrySelection: (rowId: string) => void;
} & RouteComponentProps;

const ResultsView: React.FC<ResultsTableProps> = ({
  selectedEntries,
  columns,
  viewMode,
  handleEntrySelection,
  history,
  location,
}) => {
  const { search: queryParamFromUrl } = location;
  const { query, selectedFacets, sortColumn, sortDirection } = getParamsFromURL(
    queryParamFromUrl
  );

  const initialApiUrl = getAPIQueryUrl(
    query,
    columns,
    selectedFacets,
    sortColumn,
    sortDirection
  );

  const [url, setUrl] = useState(initialApiUrl);
  const [metaData, setMetaData] = useState<{
    total: number;
    nextUrl: string | undefined;
  }>({ total: 0, nextUrl: undefined });
  const [allResults, setAllResults] = useState<UniProtkbAPIModel[]>([]);
  const [sortableColumnToSortColumn, setSortableColumnToSortColumn] = useState<
    Map<Column, string>
  >();

  const { data, headers } = useDataApi(url);
  const { data: dataResultFields } = useDataApi(apiUrls.resultsFields);
  // TODO handle error

  useEffect(() => {
    if (!data) return;
    const { results } = data;
    setAllResults(allRes => [...allRes, ...results]);
    setMetaData(() => ({
      total: headers['x-totalrecords'],
      nextUrl: getNextUrlFromResponse(headers.link),
    }));
  }, [data, headers]);

  useEffect(() => {
    if (!dataResultFields) return;
    setSortableColumnToSortColumn(
      getSortableColumnToSortColumn(dataResultFields)
    );
  }, [dataResultFields]);

  if (
    allResults.length === 0 ||
    !sortableColumnToSortColumn ||
    sortableColumnToSortColumn.size === 0
  ) {
    return <Loader />;
  }

  const { total, nextUrl } = metaData;

  const handleLoadMoreRows = () => nextUrl && setUrl(nextUrl);

  const updateColumnSort = (column: SortableColumn) => {
    const sortableColumn = sortableColumnToSortColumn.get(column);
    if (!sortableColumn) return;

    // Change sort direction
    const updatedSortDirection =
      !sortDirection || sortDirection === SortDirection.descend
        ? SortDirection.ascend
        : SortDirection.descend;

    history.push(
      getLocationObjForParams(
        '/uniprotkb',
        query,
        selectedFacets,
        sortableColumn,
        updatedSortDirection
      )
    );
  };

  const hasMoreData = total > allResults.length;
  if (viewMode === ViewMode.CARD) {
    return (
      <div className="datalist">
        <DataList
          getIdKey={({ primaryAccession }: { primaryAccession: string }) =>
            primaryAccession
          }
          data={allResults}
          dataRenderer={(dataItem: UniProtkbAPIModel) => (
            <UniProtKBCard
              data={dataItem}
              selected={selectedEntries.includes(dataItem.primaryAccession)}
              handleEntrySelection={handleEntrySelection}
            />
          )}
          onLoadMoreItems={handleLoadMoreRows}
          hasMoreData={hasMoreData}
          loaderComponent={<Loader />}
        />
      </div>
    );
  } // viewMode === ViewMode.TABLE
  const columnsToDisplay = columns.map(columnName => {
    const columnConfig = ColumnConfiguration.get(columnName);
    if (columnConfig) {
      return {
        label: columnConfig.label,
        name: columnName,
        render: (row: UniProtkbAPIModel) =>
          columnConfig.render(uniProtKbConverter(row) as UniProtkbUIModel),
        sortable: sortableColumnToSortColumn.has(columnName),
        sorted: columnName === sortColumn && sortDirection, // TODO this doesn't seem to update the view
      };
    }
    return {
      label: columnName,
      name: columnName,
      render: () => (
        <div className="warning">{`${columnName} has no config`}</div>
      ),
      sortable: false,
      sorted: false,
    };
  });
  return (
    <DataTable
      getIdKey={({ primaryAccession }: { primaryAccession: string }) =>
        primaryAccession
      }
      columns={columnsToDisplay}
      data={allResults}
      selectable
      selected={selectedEntries}
      onSelect={handleEntrySelection}
      onHeaderClick={updateColumnSort}
      onLoadMoreItems={handleLoadMoreRows}
      hasMoreData={hasMoreData}
      loaderComponent={<Loader />}
    />
  );
};

export default withRouter(ResultsView);

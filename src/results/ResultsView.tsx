import React, { useState, useEffect } from 'react';
import { DataTable, DataList, Loader } from 'franklin-sites';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import ColumnConfiguration from '../model/ColumnConfiguration';
import { SelectedEntries, SortDirection } from './types/resultsTypes';
import UniProtCard from '../view/uniprotkb/components/UniProtCard';
import uniProtKbConverter, {
  UniProtkbUIModel,
  UniProtkbAPIModel,
} from '../model/uniprotkb/UniProtkbConverter';
import { ViewMode, defaultTableColumns } from './state/resultsInitialState';
import getNextUrlFromResponse from '../utils/queryUtils';
import useDataApi from '../hooks/useDataApi';
import BaseLayout from '../layout/BaseLayout';
import NoResultsPage from '../pages/errors/NoResultsPage';
import '../styles/alert.scss';
import '../styles/ResultsView.scss';
import { getParamsFromURL, getLocationForParams } from './utils';
import { SortableColumn, Column } from '../model/types/ColumnTypes';
import { getAPIQueryUrl } from '../utils/apiUrls';

type ResultsTableProps = {
  selectedEntries: SelectedEntries;
  columns: Column[];
  handleEntrySelection: (rowId: string) => void;
  viewMode: ViewMode;
} & RouteComponentProps;

const ResultsView: React.FC<ResultsTableProps> = ({
  selectedEntries,
  columns,
  handleEntrySelection,
  viewMode,
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

  const { data, error, headers } = useDataApi(url);

  useEffect(() => {
    if (!data) {
      return;
    }
    const { results } = data;
    setAllResults((allRes) => [...allRes, ...results]);
    setMetaData(() => ({
      total: headers['x-totalrecords'],
      nextUrl: getNextUrlFromResponse(headers.link),
    }));
  }, [data, headers]);

  if (allResults.length === 0) {
    return <Loader />;
  }

  if (allResults.length === 0) {
    return (
      <BaseLayout>
        <NoResultsPage />
      </BaseLayout>
    );
  }

  const { total, nextUrl } = metaData;

  const handleLoadMoreRows = () => nextUrl && setUrl(nextUrl);

  const updateColumnSort = (column: SortableColumn) => {
    /**
     * NOTE: temporary fix until backend provide
     * the correct name for sort fields
     * https://www.ebi.ac.uk/panda/jira/browse/TRM-23753
     */
    const fieldNameMap = new Map([
      [Column.accession, 'accession'],
      [Column.id, 'mnemonic'],
      [Column.proteinName, 'name'],
      [Column.geneNames, 'gene'],
      [Column.organism, 'organism_name'],
      [Column.mass, 'mass'],
      [Column.length, 'length'],
    ]);
    const apiColumn = fieldNameMap.get(column);

    // Change sort direction
    const updatedSortDirection =
      !sortDirection || sortDirection === SortDirection.descend
        ? SortDirection.ascend
        : SortDirection.descend;

    history.push(
      getLocationForParams(
        query,
        selectedFacets,
        apiColumn,
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
            <UniProtCard
              data={dataItem}
              selectedEntries={selectedEntries}
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
  const columnsToDisplay = defaultTableColumns.map((columnName) => {
    const columnConfig = ColumnConfiguration.get(columnName);
    if (columnConfig) {
      return {
        label: columnConfig.label,
        name: columnName,
        render: (row: UniProtkbAPIModel) =>
          columnConfig.render(uniProtKbConverter(row) as UniProtkbUIModel),
        sortable: columnConfig.sortable,
        sorted: columnName === sortColumn && sortDirection,
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

import React, { useState, useEffect } from 'react';
import { DataTable, DataList, Loader } from 'franklin-sites';
import ColumnConfiguration from '../model/ColumnConfiguration';
import { SelectedEntries } from './types/resultsTypes';
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
import { getURLParams } from './utils';

type ResultsTableProps = {
  initialUrl: string;
  selectedEntries: SelectedEntries;
  handleEntrySelection: (rowId: string) => void;
  viewMode: ViewMode;
};

const ResultsView: React.FC<ResultsTableProps> = ({
  initialUrl,
  selectedEntries,
  handleEntrySelection,
  viewMode,
}) => {
  const [url, setUrl] = useState(initialUrl);
  const [metaData, setMetaData] = useState<{
    total: number;
    nextUrl: string | undefined;
  }>({ total: 0, nextUrl: undefined });
  const [allResults, setAllResults] = useState<UniProtkbAPIModel[]>([]);

  const { data, error, headers } = useDataApi(url);
  const { sortColumn, sortDirection } = getURLParams(initialUrl);

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
      onHeaderClick={() => null}
      onLoadMoreItems={handleLoadMoreRows}
      hasMoreData={hasMoreData}
      loaderComponent={<Loader />}
    />
  );
};

export default ResultsView;

import React from 'react';
import { DataTable, DataList } from 'franklin-sites';
import ColumnConfiguration from '../model/ColumnConfiguration';
import '../styles/alert.scss';
import '../styles/ResultsView.scss';
import { SelectedEntries, SortDirection } from './types/resultsTypes';
import UniProtCard from '../view/uniprotkb/components/UniProtCard';
import uniProtKbConverter, {
  UniProtkbUIModel,
  UniProtkbAPIModel,
} from '../model/uniprotkb/UniProtkbConverter';
import { ViewMode } from './state/resultsInitialState';
import { SortableColumn, Column } from '../model/types/ColumnTypes';

type ResultsTableProps = {
  results: UniProtkbAPIModel[];
  tableColumns: (Column | SortableColumn)[];
  selectedEntries: SelectedEntries;
  handleEntrySelection: (rowId: string) => void;
  handleHeaderClick: (column: SortableColumn) => void;
  handleLoadMoreRows: () => void;
  totalNumberResults: number;
  sortColumn: SortableColumn;
  sortDirection: SortDirection;
  viewMode: ViewMode;
};

const ResultsView: React.FC<ResultsTableProps> = ({
  results = [],
  totalNumberResults,
  tableColumns,
  selectedEntries,
  handleEntrySelection,
  handleLoadMoreRows,
  handleHeaderClick,
  sortColumn,
  sortDirection,
  viewMode,
}) => {
  const hasMoreData = totalNumberResults > results.length;
  if (viewMode === ViewMode.CARD) {
    return (
      <div className="datalist">
        <DataList
          getIdKey={({ primaryAccession }: { primaryAccession: string }) =>
            primaryAccession
          }
          data={results}
          dataRenderer={(dataItem: UniProtkbAPIModel) => (
            <UniProtCard
              data={dataItem}
              selectedEntries={selectedEntries}
              handleEntrySelection={handleEntrySelection}
            />
          )}
          onLoadMoreItems={handleLoadMoreRows}
          hasMoreData={hasMoreData}
        />
      </div>
    );
  } // viewMode === ViewMode.TABLE
  const columns = tableColumns.map((columnName) => {
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
      columns={columns}
      data={results}
      selectable
      selected={selectedEntries}
      onSelect={handleEntrySelection}
      onHeaderClick={handleHeaderClick}
      onLoadMoreItems={handleLoadMoreRows}
      hasMoreData={hasMoreData}
    />
  );
};

export default ResultsView;

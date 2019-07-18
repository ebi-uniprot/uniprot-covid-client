import React from 'react';
import { DataTable, DataList } from 'franklin-sites';
import ColumnConfiguration from '../model/ColumnConfiguration';
import '../styles/alert.scss';
import {
  SelectedEntries,
  SortableColumn,
  SortDirection,
} from './types/resultsTypes';
import UniProtCard from '../view/uniprotkb/components/UniProtCard';
import { UniProtkbAPIModel } from '../model/uniprotkb/UniProtkbConverter';
import { ViewMode } from './state/resultsInitialState';

type ResultsTableProps = {
  results: UniProtkbAPIModel[];
  tableColumns: string[];
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
  const columns = tableColumns.map(columnName => {
    let render;
    if (columnName in ColumnConfiguration) {
      render = (row: UniProtkbAPIModel) =>
        ColumnConfiguration[columnName].render(row);
    } else {
      render = () => (
        <div className="warning">{`${columnName} has no render method`}</div>
      );
    }
    const attributes = ColumnConfiguration[columnName];
    return {
      label: attributes.label,
      name: columnName,
      render,
      sortable: columnName in SortableColumn,
      sorted: columnName === sortColumn ? sortDirection : null,
    };
  });
  const hasMoreData = totalNumberResults > results.length;
  if (viewMode === ViewMode.CARD) {
    return (
      <DataList
        idKey="primaryAccession"
        data={results}
        selectable
        selected={selectedEntries}
        onSelect={handleEntrySelection}
        dataRenderer={(dataItem: UniProtkbAPIModel) => (
          <UniProtCard data={dataItem} />
        )}
        onLoadMoreItems={handleLoadMoreRows}
        hasMoreData={hasMoreData}
      />
    );
  } // viewMode === ViewMode.TABLE
  return (
    <DataTable
      idKey="primaryAccession"
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

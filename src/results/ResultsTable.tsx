import React from 'react';
import { DataTable, DataList } from 'franklin-sites';
import ColumnConfiguration from '../model/ColumnConfiguration';
import '../styles/alert.scss';
import {
  SelectedRows,
  SortableColumn,
  SortDirection,
} from './types/resultsTypes';
import UniProtCard from '../view/uniprotkb/components/UniProtCard';
import { UniProtkbAPIModel } from '../model/uniprotkb/UniProtkbConverter';
import { ViewMode } from './state/resultsInitialState';

type ResultsTableProps = {
  results: any[];
  tableColumns: string[];
  selectedRows: SelectedRows;
  handleRowSelect: (rowId: string) => void;
  handleHeaderClick: (column: SortableColumn) => void;
  handleLoadMoreRows: any;
  totalNumberResults: number;
  sortColumn: SortableColumn;
  sortDirection: SortDirection;
  viewMode: ViewMode;
};

const ResultsTable: React.FC<ResultsTableProps> = ({
  results = [],
  totalNumberResults,
  tableColumns,
  selectedRows,
  handleRowSelect,
  handleLoadMoreRows,
  handleHeaderClick,
  sortColumn,
  sortDirection,
  viewMode,
}) => {
  const columns = tableColumns.map(columnName => {
    let render;
    if (columnName in ColumnConfiguration) {
      render = (row: any) => ColumnConfiguration[columnName].render(row);
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
  let displayComponent = null;
  switch (viewMode) {
    case ViewMode.CARD:
      displayComponent = (
        <DataList
          idKey="primaryAccession"
          data={results}
          selectable={true}
          selected={selectedRows}
          onSelect={handleRowSelect}
          dataRenderer={(dataItem: UniProtkbAPIModel) => (
            <UniProtCard data={dataItem} />
          )}
          onLoadMoreItems={handleLoadMoreRows}
          hasMoreData={hasMoreData}
        />
      );
      break;
    case ViewMode.TABLE:
      displayComponent = (
        <DataTable
          idKey="primaryAccession"
          columns={columns}
          data={results}
          selectable={true}
          selected={selectedRows}
          onSelect={handleRowSelect}
          onHeaderClick={handleHeaderClick}
          onLoadMoreItems={handleLoadMoreRows}
          hasMoreData={hasMoreData}
        />
      );
      break;
  }

  return displayComponent;
};

export default ResultsTable;

import React from 'react';
import { DataTable } from 'franklin-sites';
import ColumnConfiguration from '../model/ColumnConfiguration';
import '../styles/alert.scss';
import {
  SelectedRows,
  SortableColumn,
  SortDirection,
} from './types/resultsTypes';

type ResultsTableProps = {
  results: any[];
  columnNames: string[];
  selectedRows: SelectedRows;
  handleRowSelect: (rowId: string) => void;
  handleHeaderClick: (column: SortableColumn) => void;
  handleLoadMoreRows: any;
  totalNumberResults: number;
  sortColumn: SortableColumn;
  sortDirection: SortDirection;
};

const ResultsTable: React.FC<ResultsTableProps> = ({
  results = [],
  columnNames,
  selectedRows,
  handleRowSelect,
  handleHeaderClick,
  handleLoadMoreRows,
  sortColumn,
  sortDirection,
  totalNumberResults,
}) => {
  const columns = columnNames.map(columnName => {
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
  return (
    <DataTable
      idKey="primaryAccession"
      columns={columns}
      data={results}
      selectable={true}
      selected={selectedRows}
      onSelect={handleRowSelect}
      onHeaderClick={handleHeaderClick}
      onLoadMoreItems={handleLoadMoreRows}
      hasMoreData={true}
    />
  );
};
export default ResultsTable;
